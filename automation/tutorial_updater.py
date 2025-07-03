#!/usr/bin/env python3
"""
Automated Tutorial Update System for ChurchApps Support
Test implementation for chums/adding-people tutorial
"""

import asyncio
import os
import xml.etree.ElementTree as ET
from playwright.async_api import async_playwright
import time

class TutorialUpdater:
    def __init__(self, base_url="https://chumsdemo.churchapps.org/", 
                 username="demo@chums.org", password="password"):
        self.base_url = base_url
        self.username = username
        self.password = password
        self.browser = None
        self.page = None
        self.tutorial_dir = None
        
    async def init_browser(self):
        """Initialize browser and create page instance"""
        playwright = await async_playwright().start()
        self.browser = await playwright.chromium.launch(headless=False)  # Set to True for production
        context = await self.browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        )
        self.page = await context.new_page()
        
    async def login_to_chums(self):
        """Login to CHUMS demo and select Grace church"""
        print("Navigating to CHUMS demo...")
        await self.page.goto(self.base_url)
        
        # Wait for login form
        await self.page.wait_for_selector('input[type="email"], input[name="email"]', timeout=10000)
        
        # Fill login credentials
        print("Entering login credentials...")
        await self.page.fill('input[type="email"], input[name="email"]', self.username)
        await self.page.fill('input[type="password"], input[name="password"]', self.password)
        
        # Click login button
        await self.page.click('button[type="submit"], input[type="submit"], .btn-primary')
        
        # Wait for church selection (if appears)
        try:
            print("Waiting for church selection...")
            await self.page.wait_for_selector('text=Grace', timeout=5000)
            await self.page.click('text=Grace')
        except:
            print("No church selection required or Grace not found")
        
        # Wait for dashboard to load
        await self.page.wait_for_load_state('networkidle')
        print("Successfully logged into CHUMS")
        
    async def capture_screenshot(self, step_number, description):
        """Capture screenshot for a specific tutorial step"""
        filename = f"{step_number}.png"
        filepath = os.path.join(self.tutorial_dir, filename)
        
        print(f"Capturing screenshot {step_number}: {description}")
        
        # Wait a moment for UI to settle
        await asyncio.sleep(1)
        
        # Take full page screenshot
        await self.page.screenshot(path=filepath, full_page=True)
        print(f"Screenshot saved: {filepath}")
        
    async def update_adding_people_tutorial(self):
        """Execute the adding-people tutorial steps and capture screenshots"""
        self.tutorial_dir = "/mnt/e/LCS/ChurchApps/ChurchAppsSupport/videos/chums/adding-people-new"
        os.makedirs(self.tutorial_dir, exist_ok=True)
        
        print("Starting adding-people tutorial update...")
        
        # Step 1: Navigate to people section
        print("Step 1: Navigating to people section")
        
        # Look for people icon/menu item
        people_selectors = [
            'a[href*="people"]',
            '.nav-link:has-text("People")',
            '.sidebar a:has-text("People")',
            '[data-testid="people"]',
            'text=People'
        ]
        
        clicked = False
        for selector in people_selectors:
            try:
                await self.page.click(selector, timeout=2000)
                clicked = True
                break
            except:
                continue
                
        if not clicked:
            print("Could not find people navigation - trying alternative approaches")
            # Try clicking any visible people-related element
            await self.page.click('text=People')
        
        await self.page.wait_for_load_state('networkidle')
        await self.capture_screenshot(1, "Navigate to people section")
        
        # Step 2: Look for "Add a New Person" functionality
        print("Step 2: Looking for Add Person functionality")
        
        add_person_selectors = [
            'text=Add a New Person',
            'button:has-text("Add")',
            '.btn:has-text("Add")',
            '[data-testid="add-person"]',
            '.fa-plus',
            'text=Add Person'
        ]
        
        for selector in add_person_selectors:
            try:
                element = await self.page.wait_for_selector(selector, timeout=2000)
                if element:
                    # Wait for element to be visible
                    await element.scroll_into_view_if_needed()
                    break
            except:
                continue
        
        await self.capture_screenshot(2, "Add a New Person section")
        
        # Step 3: Show search functionality
        print("Step 3: Demonstrating search functionality")
        
        search_selectors = [
            'input[placeholder*="Search"]',
            'input[type="search"]',
            '.search-input',
            'input[name="search"]'
        ]
        
        for selector in search_selectors:
            try:
                search_input = await self.page.wait_for_selector(selector, timeout=2000)
                if search_input:
                    # Clear and show empty search
                    await search_input.fill("")
                    break
            except:
                continue
        
        await self.capture_screenshot(3, "Search functionality - empty search")
        
        # Step 4: Perform a search
        print("Step 4: Performing a sample search")
        
        if search_input:
            await search_input.fill("John")
            # Look for search button or trigger search
            try:
                await self.page.click('button:has-text("Search")', timeout=2000)
            except:
                # Search might be triggered automatically
                await self.page.keyboard.press('Enter')
            
            await self.page.wait_for_load_state('networkidle')
        
        await self.capture_screenshot(4, "Search results")
        
        # Step 5: Navigate back to home or show home search
        print("Step 5: Showing home page search option")
        
        try:
            # Try to navigate to home/dashboard
            await self.page.click('text=Home', timeout=2000)
            await self.page.wait_for_load_state('networkidle')
        except:
            print("Could not navigate to home - staying on current page")
        
        await self.capture_screenshot(5, "Home page search option")
        
        # Step 6: Show view customization options
        print("Step 6: Looking for view customization")
        
        # Look for settings or view options
        view_option_selectors = [
            '.fa-cog',
            '.fa-gear',
            '.settings',
            'button[title*="settings"]',
            'text=View Options',
            '.view-settings'
        ]
        
        for selector in view_option_selectors:
            try:
                await self.page.click(selector, timeout=2000)
                await asyncio.sleep(1)  # Wait for menu to appear
                break
            except:
                continue
        
        await self.capture_screenshot(6, "View customization options")
        
        # Step 7: Show delete option (if available)
        print("Step 7: Looking for delete functionality")
        
        # This step might require being in edit mode or having specific permissions
        delete_selectors = [
            'text=Delete Option',
            '.delete-option',
            '.fa-trash',
            'button:has-text("Delete")'
        ]
        
        for selector in delete_selectors:
            try:
                element = await self.page.wait_for_selector(selector, timeout=2000)
                if element:
                    await element.scroll_into_view_if_needed()
                    break
            except:
                continue
        
        await self.capture_screenshot(7, "Delete option")
        
        print("Tutorial screenshots completed!")
        
    async def generate_updated_script(self):
        """Generate updated script.xml based on new UI"""
        script_content = '''<?xml version="1.0" encoding="UTF-8"?>
<tutorial>
    <speak>
    <mark name="1" />
    In the CHUMS dashboard, navigate to the People section using the navigation menu.
    <break time="1s"/>
    <mark name="2" />
    To add a new person, look for the "Add Person" button or "Add a New Person" section on the page.
    <break time="1s"/>
    <mark name="3" />
    To view all people in your database, you can use the search functionality. Leave the search field empty and click "Search" to see all entries.
    <break time="1s"/>
    <mark name="4" />
    To find a specific person, type their name in the search field and click "Search". You can search by first name, last name, or full name.
    <break time="1s"/>
    <mark name="5" />
    You can also search for and add new people from the main dashboard or home page.
    <break time="1s"/>
    <mark name="6" />
    Customize your view by accessing the settings or view options. This allows you to choose which fields are displayed in the people list.
    <break time="1s"/>
    <mark name="7" />
    Additional options like delete functionality may be available through the settings menu or individual record actions.
    <break time="2s"/>
    <mark name="end"/>
    </speak>
</tutorial>'''

        script_path = os.path.join(self.tutorial_dir, "script.xml")
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(script_content)
        
        print(f"Updated script saved to: {script_path}")
        
    async def cleanup(self):
        """Close browser and cleanup resources"""
        if self.browser:
            await self.browser.close()
            
    async def run_tutorial_update(self):
        """Main execution method"""
        try:
            await self.init_browser()
            await self.login_to_chums()
            await self.update_adding_people_tutorial()
            await self.generate_updated_script()
            print("Tutorial update completed successfully!")
            
        except Exception as e:
            print(f"Error during tutorial update: {str(e)}")
            raise
        finally:
            await self.cleanup()

async def main():
    updater = TutorialUpdater()
    await updater.run_tutorial_update()

if __name__ == "__main__":
    asyncio.run(main())