#!/usr/bin/env node
/**
 * Automated Tutorial Update System for ChurchApps Support
 * Test implementation for chums/adding-people tutorial
 */

const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

class TutorialUpdater {
    constructor() {
        this.baseUrl = 'https://chumsdemo.churchapps.org/';
        this.username = 'demo@chums.org';
        this.password = 'password';
        this.browser = null;
        this.page = null;
        this.tutorialDir = null;
    }

    async initBrowser() {
        console.log('Initializing browser...');
        this.browser = await chromium.launch({ 
            headless: false, // Visible browser for debugging
            slowMo: 1000,    // Slow down actions for debugging
            viewport: { width: 1920, height: 1080 }
        });
        
        const context = await this.browser.newContext({
            viewport: { width: 1920, height: 1080 },
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        });
        
        this.page = await context.newPage();
    }

    async loginToChums() {
        console.log('Navigating to CHUMS demo...');
        await this.page.goto(this.baseUrl);
        
        // Wait for login form
        await this.page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 });
        
        // Fill login credentials
        console.log('Entering login credentials...');
        await this.page.fill('input[type="email"], input[name="email"]', this.username);
        await this.page.fill('input[type="password"], input[name="password"]', this.password);
        
        // Click login button
        await this.page.click('button[type="submit"], input[type="submit"], .btn-primary');
        
        // Wait for church selection (if appears)
        try {
            console.log('Waiting for church selection...');
            
            // Try multiple selectors for church selection
            const churchSelectors = [
                'text=Grace Community Church',
                'a:has-text("Grace Community Church")',
                'text=Grace',
                '[data-testid*="grace"]',
                'button:has-text("Grace")',
                '.church-item:has-text("Grace")',
                'li:has-text("Grace")',
                '[title*="Grace"]',
                '.dropdown-item:has-text("Grace")'
            ];
            
            let churchSelected = false;
            
            // Wait a bit for the page to load after login
            await this.page.waitForTimeout(2000);
            
            // Take a screenshot to see what's on the page
            await this.page.screenshot({ path: 'debug_after_login.png', fullPage: true });
            console.log('Debug screenshot saved: debug_after_login.png');
            
            // Try each church selector
            for (const selector of churchSelectors) {
                try {
                    console.log(`Trying church selector: ${selector}`);
                    await this.page.waitForSelector(selector, { timeout: 3000 });
                    await this.page.click(selector);
                    churchSelected = true;
                    console.log(`Successfully clicked church with selector: ${selector}`);
                    break;
                } catch (e) {
                    console.log(`Church selector ${selector} failed: ${e.message}`);
                    continue;
                }
            }
            
            // If no specific Grace church found, try to click the first available church
            if (!churchSelected) {
                console.log('Grace church not found, trying to select first available church...');
                const genericSelectors = [
                    '.church-item:first-child',
                    '.dropdown-item:first-child',
                    'button[role="option"]:first-child',
                    '.list-group-item:first-child'
                ];
                
                for (const selector of genericSelectors) {
                    try {
                        await this.page.waitForSelector(selector, { timeout: 2000 });
                        await this.page.click(selector);
                        churchSelected = true;
                        console.log(`Selected first church with selector: ${selector}`);
                        break;
                    } catch (e) {
                        continue;
                    }
                }
            }
            
            if (!churchSelected) {
                console.log('No church selection found - may already be on dashboard or different UI');
            }
            
        } catch (e) {
            console.log(`Church selection error: ${e.message}`);
            console.log('Continuing anyway - may already be logged in');
        }
        
        // Wait for dashboard to load (be more patient)
        try {
            await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (e) {
            console.log('Network idle timeout, continuing anyway');
        }
        await this.page.waitForTimeout(3000);
        
        // Take another screenshot to see the final state
        await this.page.screenshot({ path: 'debug_dashboard.png', fullPage: true });
        console.log('Dashboard screenshot saved: debug_dashboard.png');
        
        console.log('Login process completed');
    }

    async captureScreenshot(stepNumber, description) {
        const filename = `${stepNumber}.png`;
        const filepath = path.join(this.tutorialDir, filename);
        
        console.log(`Capturing screenshot ${stepNumber}: ${description}`);
        
        // Wait a moment for UI to settle
        await this.page.waitForTimeout(1500);
        
        // Take screenshot with exact viewport size (1920x1080)
        await this.page.screenshot({ 
            path: filepath, 
            fullPage: false,  // Don't take full page - use exact viewport
            clip: { x: 0, y: 0, width: 1920, height: 1080 }
        });
        console.log(`Screenshot saved: ${filepath} (1920x1080)`);
    }

    async updateAddingPeopleTutorial() {
        this.tutorialDir = path.join(__dirname, 'videos', 'chums', 'adding-people-new');
        await fs.mkdir(this.tutorialDir, { recursive: true });
        
        console.log('Starting adding-people tutorial update...');
        
        // Step 1: Navigate to people section
        console.log('Step 1: Navigating to people section');
        
        // Wait for dashboard to fully load
        await this.page.waitForTimeout(2000);
        
        // Try to navigate directly to the people URL
        const currentUrl = this.page.url();
        const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
        const peopleUrl = baseUrl + '/people';
        
        console.log(`Navigating directly to people page: ${peopleUrl}`);
        await this.page.goto(peopleUrl);
        try {
            await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (e) {
            console.log('People page load timeout, continuing anyway');
        }
        await this.page.waitForTimeout(3000);
        
        console.log(`Current page URL: ${this.page.url()}`);
        
        // Scroll to top to ensure consistent view
        await this.page.evaluate(() => window.scrollTo(0, 0));
        await this.captureScreenshot(1, 'Navigate to people section');
        
        // Step 2: Highlight the "Add Person" button by hovering over it
        console.log('Step 2: Highlighting Add Person button');
        
        // Wait for page to fully load
        await this.page.waitForTimeout(2000);
        
        // Scroll to and hover over the Add Person button to highlight it
        try {
            await this.page.locator('button:has-text("Add Person")').scrollIntoViewIfNeeded();
            await this.page.hover('button:has-text("Add Person")');
            console.log('Hovering over Add Person button to highlight it');
        } catch (e) {
            await this.page.evaluate(() => window.scrollTo(0, 0));
        }
        await this.captureScreenshot(2, 'Add Person button highlighted');
        
        // Step 3: Click the Add Person button to open the form
        console.log('Step 3: Clicking Add Person button to show form');
        
        // Click the "Add Person" button (we know from debug it exists)
        try {
            await this.page.click('button:has-text("Add Person")', { timeout: 3000 });
            await this.page.waitForTimeout(2000); // Wait for form to appear
            console.log('Successfully clicked Add Person button');
        } catch (e) {
            console.log('Could not click Add Person button, trying alternative');
            await this.page.click('button:has-text("Add")', { timeout: 3000 });
            await this.page.waitForTimeout(2000);
        }
        
        // Scroll to show the form that just opened
        try {
            await this.page.locator('input[name="first"]').scrollIntoViewIfNeeded();
        } catch (e) {
            await this.page.evaluate(() => window.scrollTo(0, 200));
        }
        await this.captureScreenshot(3, 'Add Person form opened');
        
        // Step 4: Fill in person details step by step
        console.log('Step 4: Filling in person details');
        
        // Fill first name first
        try {
            await this.page.fill('input[name="first"]', '');  // Clear first
            await this.page.type('input[name="first"]', 'John', { delay: 100 });
            console.log('Typed first name: John');
        } catch (e) {
            console.log('Could not fill first name');
        }
        
        // Take screenshot with just first name filled to show typing in progress
        await this.page.waitForTimeout(500);
        await this.captureScreenshot(4, 'First name typed in form');
        
        // Step 5: Complete the form and navigate to person details
        console.log('Step 5: Completing form and viewing person details');
        
        // Complete filling the remaining fields
        try {
            await this.page.fill('input[name="last"]', 'Doe');
            await this.page.fill('input[name="email"]', 'john.doe@example.com');
            console.log('Completed filling last name and email');
        } catch (e) {
            console.log('Could not fill remaining fields');
        }
        
        // Click the submit button to save
        try {
            await this.page.click('button[type="submit"]', { timeout: 3000 });
            await this.page.waitForTimeout(3000); // Wait for save to complete
            console.log('Clicked submit button to save person');
        } catch (e) {
            console.log('Could not click submit button');
        }
        
        // Now click on the person we just created to view their details
        try {
            // Try to find and click on John Doe in the people list
            await this.page.click('text=John Doe', { timeout: 5000 });
            await this.page.waitForTimeout(2000);
            console.log('Clicked on John Doe to view details page');
        } catch (e) {
            // If we can't find John Doe, try clicking on the first person in the list
            try {
                const personLinks = await this.page.$$('a[href*="/people/"], .person-row a, tr td:first-child a');
                if (personLinks.length > 0) {
                    await personLinks[0].click();
                    await this.page.waitForTimeout(2000);
                    console.log('Clicked on first person to view details');
                }
            } catch (e2) {
                console.log('Could not navigate to person details');
            }
        }
        
        await this.captureScreenshot(5, 'Person details page');
        
        console.log('Tutorial screenshots completed!');
    }

    async generateUpdatedScript() {
        const scriptContent = `<?xml version="1.0" encoding="UTF-8"?>
<tutorial>
    <speak>
    <mark name="1" />
    In the CHUMS dashboard, navigate to the People section to manage your church members.
    <break time="1s"/>
    <mark name="2" />
    To add a new person, look for the "Add Person" button on the People page.
    <break time="1s"/>
    <mark name="3" />
    Click the "Add Person" button to open the new person form.
    <break time="1s"/>
    <mark name="4" />
    Fill in the person's details including their first name, last name, and email address.
    <break time="1s"/>
    <mark name="5" />
    Click "Submit" to save the person to your database.
    <break time="2s"/>
    <mark name="end"/>
    </speak>
</tutorial>`;

        const scriptPath = path.join(this.tutorialDir, 'script.xml');
        await fs.writeFile(scriptPath, scriptContent, 'utf-8');
        console.log(`Updated script saved to: ${scriptPath}`);
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    async runTutorialUpdate() {
        try {
            await this.initBrowser();
            await this.loginToChums();
            await this.updateAddingPeopleTutorial();
            await this.generateUpdatedScript();
            console.log('Tutorial update completed successfully!');
        } catch (error) {
            console.error(`Error during tutorial update: ${error.message}`);
            throw error;
        } finally {
            await this.cleanup();
        }
    }
}

async function main() {
    const updater = new TutorialUpdater();
    await updater.runTutorialUpdate();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = TutorialUpdater;