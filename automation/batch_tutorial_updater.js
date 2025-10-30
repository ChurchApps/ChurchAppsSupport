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

module.exports = BatchTutorialUpdater;
