# Automated Tutorial Update Plan

## Overview
Create an automated system to update the 86 tutorial scripts and screenshots by navigating the updated ChurchApps UI and generating new content.

## Current Tutorial System Analysis
- **Total Tutorials**: 86 script.xml files across 5 product categories
- **Structure**: Each tutorial has script.xml with SSML markup and numbered PNG screenshots
- **Products**: CHUMS (39), B1 (36), Lessons (7), FreeShow (4), Tutorial Maker (4)
- **Variations**: Some tutorials have multiple screenshot variants (5a.png, 5b.png)

## Implementation Strategy

### 1. Browser Automation Framework
**Technology Stack:**
- Playwright for browser automation (better than Selenium for modern SPAs)
- Python for scripting and coordination
- Pillow for image processing and comparison

**Core Components:**
- Browser session management with login persistence
- Intelligent wait conditions for dynamic UI loading
- Screenshot capture with consistent viewport settings
- Element detection with fallback strategies

### 2. Script Analysis Engine
**Functionality:**
- Parse existing script.xml files to extract navigation steps
- Map SSML text descriptions to actionable UI commands
- Identify UI elements and user interactions from narrative text
- Extract timing information from `<break>` tags

**Text-to-Action Mapping Examples:**
- "go to the people icon" → click element with people icon
- "click the plus sign in the top right corner" → locate and click add button
- "type in the name" → find input field and enter text
- "choose from the drop-down menu" → select dropdown option

### 3. UI Navigation Engine
**Navigation Commands:**
- **Click**: Buttons, links, icons, menu items
- **Type**: Text inputs, search fields, form data
- **Select**: Dropdown menus, radio buttons, checkboxes
- **Navigate**: URL changes, page transitions
- **Wait**: Dynamic content loading, animations

**Element Detection Strategy:**
- Primary: CSS selectors and data attributes
- Fallback: XPath expressions
- Backup: Text content matching
- Final: Image recognition for icons

### 4. Content Generation Pipeline
**Screenshot Capture:**
- Full page screenshots at each `<mark>` point
- Consistent browser viewport (1920x1080)
- Crop to relevant UI sections
- Highlight interactive elements with subtle overlays

**Script Generation:**
- Preserve original SSML structure and timing
- Update UI terminology and element names
- Maintain educational flow and narrative tone
- Add new steps for UI changes while preserving tutorial goals

**File Management:**
- Backup original files before updating
- Generate new numbered screenshots (1.png, 2.png, etc.)
- Create updated script.xml with new content
- Maintain directory structure and naming conventions

### 5. Quality Assurance System
**Validation Steps:**
- Visual diff comparison between old and new screenshots
- Script accuracy verification against actual UI behavior
- Tutorial completeness testing (all steps executable)
- Cross-browser compatibility checks

**Error Handling:**
- Graceful failure with detailed logging
- Retry mechanisms for transient issues
- Manual intervention points for complex scenarios
- Rollback capabilities for failed updates

## Test Implementation Plan

### Phase 1: Single Tutorial Test (chums/adding-people)
**Test Environment:**
- URL: https://chumsdemo.churchapps.org/
- Credentials: demo@chums.org / password
- Church: Grace church
- Target: 7 screenshots and script update

**Success Criteria:**
- Successfully navigate through all 7 tutorial steps
- Capture accurate screenshots of current UI
- Generate updated script.xml with new terminology
- Validate tutorial completeness

### Phase 2: Category Rollout
**Order of Implementation:**
1. CHUMS tutorials (39 total) - most complex, good test case
2. B1 tutorials (36 total) - different UI patterns
3. Lessons tutorials (7 total) - simpler workflows
4. FreeShow tutorials (4 total) - desktop app integration
5. Tutorial Maker (4 total) - meta-tooling

### Phase 3: Full System Deployment
**Production Considerations:**
- Batch processing with rate limiting
- Progress tracking and reporting
- Error recovery and manual intervention
- Final validation and approval workflow

## Technical Requirements

### Browser Environment
- Headless Chrome/Chromium for consistency
- Configurable viewport sizes
- Screenshot quality settings
- Network condition simulation

### Data Management
- Version control for tutorial updates
- Backup and restore capabilities
- Diff tracking for changes
- Metadata preservation

### Integration Points
- Jekyll site rebuild after updates
- Video regeneration pipeline
- MP3 audio file processing
- Documentation update workflows

## Risk Mitigation
- Comprehensive backup before any changes
- Staged rollout with validation checkpoints
- Manual review process for critical tutorials
- Rollback procedures for failed updates
- Monitoring and alerting for system health

## Success Metrics
- **Accuracy**: 95%+ screenshot relevance to script content
- **Completeness**: 100% tutorial steps executable
- **Consistency**: Uniform styling and quality across all tutorials
- **Efficiency**: 80%+ time savings vs manual updates
- **Reliability**: <5% failure rate requiring manual intervention