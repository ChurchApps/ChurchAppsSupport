# Tutorial Automation System

This system automates the process of updating tutorial scripts and screenshots for the ChurchApps Support documentation after UI changes.

## Overview

The ChurchApps Support site contains **86 tutorials** across 5 product categories:
- **CHUMS** (39 tutorials) - Church management system
- **B1** (36 tutorials) - Church website and portal system  
- **Lessons** (7 tutorials) - Educational content system
- **FreeShow** (4 tutorials) - Presentation software

Each tutorial consists of:
- `script.xml` - SSML markup with narration and timing
- Numbered PNG screenshots (1.png, 2.png, etc.)
- Generated video files (output.mp4, part0.mp3)

## Files Created

### Core System Files
- `automated-tutorial-update-plan.md` - Detailed implementation plan
- `tutorial_updater.js` - Main browser automation script
- `test_tutorial_concept.js` - Proof of concept demonstrator
- `package.json` - Node.js dependencies
- `setup_tutorial_automation.sh` - System setup script

### Test Output
- `videos/chums/adding-people-updated/` - Example updated tutorial
  - `script.xml` - Updated SSML script
  - `*.png.placeholder` - Placeholder files for screenshots
  - `update_report.md` - Analysis and comparison report

## Quick Start

### 1. System Setup (Required)
```bash
# Install system dependencies for browser automation
sudo ./setup_tutorial_automation.sh
```

### 2. Test the Proof of Concept
```bash
# Demonstrates the update process without browser automation
node test_tutorial_concept.js
```

### 3. Run Full Browser Automation
```bash
# Updates chums/adding-people tutorial with real screenshots
node tutorial_updater.js
```

## How It Works

### Analysis Phase
1. **Parse existing script.xml** - Extract tutorial steps and timing
2. **Identify UI elements** - Map script descriptions to UI actions
3. **Analyze screenshot sequence** - Understand flow and structure

### Automation Phase
1. **Browser initialization** - Launch Playwright with consistent settings
2. **Login and navigation** - Access CHUMS demo environment
3. **Step execution** - Navigate through tutorial steps
4. **Screenshot capture** - Take screenshots at each marked point
5. **Script generation** - Create updated SSML with modern terminology

### Validation Phase
1. **Visual comparison** - Compare old vs new screenshots
2. **Script accuracy** - Verify instructions match UI behavior
3. **Completeness check** - Ensure all steps are executable

## Configuration

### Test Environment
- **URL**: https://chumsdemo.churchapps.org/
- **Credentials**: demo@chums.org / password
- **Church Selection**: Grace church

### Browser Settings
- **Viewport**: 1920x1080 (consistent screenshots)
- **Mode**: Headless for production, visible for debugging
- **Screenshots**: Full page capture with consistent quality

### Output Structure
```
videos/chums/adding-people-updated/
├── script.xml              # Updated SSML script
├── 1.png                  # Navigation to People section
├── 2.png                  # Add Person functionality
├── 3.png                  # Search functionality
├── 4.png                  # Search results
├── 5.png                  # Home page options
├── 6.png                  # View customization
├── 7.png                  # Management options
└── update_report.md       # Analysis and validation report
```

## Key Improvements

### Script Updates
- **Modern terminology** - Updated to match current UI
- **Enhanced clarity** - More specific user guidance
- **Improved flow** - Better logical progression
- **Accessibility** - Clearer screen reader descriptions

### Technical Enhancements
- **Robust element detection** - Multiple selector strategies
- **Error handling** - Graceful failure with detailed logging
- **Retry mechanisms** - Handle transient UI issues
- **Quality assurance** - Automated validation checks

## Scaling to All Tutorials

### Batch Processing Plan
1. **Category-by-category** - Start with CHUMS (39 tutorials)
2. **Validation checkpoints** - Review quality at each stage
3. **Error tracking** - Monitor and resolve failure patterns
4. **Progress reporting** - Dashboard for completion status

### Automation Considerations
- **Rate limiting** - Avoid overwhelming demo servers
- **Session management** - Handle login timeouts
- **Dynamic content** - Wait for UI loading states
- **Cross-browser testing** - Verify compatibility

## Troubleshooting

### Common Issues
1. **System dependencies missing** - Run setup script with sudo
2. **Login failures** - Verify demo credentials are current
3. **Element not found** - UI may have changed, update selectors
4. **Screenshot quality** - Check viewport settings and timing

### Debug Mode
```bash
# Run with browser visible for debugging
HEADLESS=false node tutorial_updater.js
```

### Logs and Reports
- All runs generate detailed logs
- Update reports include before/after comparisons
- Failed runs create error reports with screenshots

## Success Metrics

- **Accuracy**: 95%+ screenshot relevance to script content
- **Completeness**: 100% tutorial steps executable  
- **Consistency**: Uniform quality across all tutorials
- **Efficiency**: 80%+ time savings vs manual updates
- **Reliability**: <5% failure rate requiring manual intervention

## Next Steps

1. **Validate single tutorial** - Complete chums/adding-people test
2. **Expand selectors** - Improve UI element detection
3. **Add batch processing** - Scale to category-level updates
4. **Integrate with CI/CD** - Automate on UI releases
5. **Video regeneration** - Update MP4 files from new content

## Support

For issues with the automation system:
1. Check logs in console output
2. Review generated update reports
3. Test with visible browser mode
4. Validate demo environment access

The system is designed to be resilient and provide detailed feedback for troubleshooting and continuous improvement.