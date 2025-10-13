# Contributing to LangLink

Thank you for your interest in contributing to LangLink! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm 7+
- Git 2.30+
- Platform SDK (Windows/macOS/Linux for building)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/git-x-ai/langlink.git
   cd langlink/CCC\ Suite\ Rules
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm run electron-dev
   ```

## 📋 Contribution Types

### 1. Adding New .cursorrules Files

This is the most common and valuable contribution!

#### Process
1. **Create Rule Folder** in `rules/` directory
2. **Follow Naming Convention**: `technology-focus-cursorrules-prompt-file`
3. **Add Your Rule File(s)**: `.cursorrules` or `.mdc` format
4. **Test with Cursor AI**: Ensure the rule works as expected
5. **Submit Pull Request**: Use the rule submission issue template

#### Quality Standards
- ✅ **Specific & Actionable**: Provide clear, specific guidance
- ✅ **Well Documented**: Include comments and explanations
- ✅ **Best Practices**: Include framework/language best practices
- ✅ **Security Minded**: Address security considerations when relevant
- ✅ **Performance**: Include optimization tips where applicable
- ✅ **Modern**: Use contemporary patterns and practices
- ✅ **Tested**: Verify the rule works well with Cursor AI

#### Naming Examples
```
react-typescript-cursorrules-prompt-file
nextjs-tailwind-cursorrules-prompt-file
python-fastapi-cursorrules-prompt-file
flutter-riverpod-cursorrules-prompt-file
```

### 2. Improving the Application

#### UI/UX Improvements
- Search functionality enhancements
- Better category organization
- UI animations and transitions
- Accessibility improvements

#### Feature Additions
- Export/import functionality
- Rule version management
- Team sharing features
- Custom rule categories

#### Bug Fixes
- Fix reported issues
- Improve error handling
- Enhance cross-platform compatibility

## 🎯 Development Guidelines

### Code Style
- **React**: Use functional components with hooks
- **TypeScript**: Prefer type safety over any
- **Naming**: Use descriptive, clear variable names
- **Comments**: Document complex logic
- **Formatting**: Follow existing code style

### Commit Messages
Use conventional commits format:

```
type(scope): description

Examples:
feat(ui): add dark mode toggle
fix(search): resolve case sensitivity issue
docs(readme): update installation instructions
rule(react): add React 19 best practices
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `rule`

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b rule/technology-name
   ```

2. **Make Changes**
   - Write clean, documented code
   - Follow existing patterns
   - Test thoroughly

3. **Test Your Changes**
   ```bash
   npm run electron-dev    # Test in development
   npm run electron-pack   # Test build
   ```

4. **Submit Pull Request**
   - Use the PR template
   - Clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## 🏗️ Project Structure

```
langlink/
├── CCC Suite Rules/           # Main application
│   ├── src/                  # React source
│   │   ├── components/       # UI components
│   │   ├── utils/           # Utility functions
│   │   └── App.jsx          # Main app
│   ├── public/              # Static files
│   │   ├── electron.js      # Main process
│   │   └── preload.js       # Preload script
│   ├── assets/              # App assets
│   └── package.json         # Dependencies
├── rules/                   # 174+ .cursorrules files
│   ├── react-typescript-cursorrules-prompt-file/
│   ├── python-fastapi-cursorrules-prompt-file/
│   └── ...
└── LICENSE                  # Dual license
```

## 📜 Rule Guidelines

### File Structure
```
technology-name-cursorrules-prompt-file/
├── .cursorrules          # Main rule file
└── README.md            # Optional: rule documentation
```

or for multi-file rules:
```
technology-name-cursorrules-prompt-file/
├── file1.mdc
├── file2.mdc
└── README.md
```

### Rule Content Template
```
# Technology Name Rules for Cursor AI

## Overview
Brief description of what this rule provides

## Best Practices
- Practice 1
- Practice 2

## Code Patterns
Recommended patterns and anti-patterns

## Security Considerations
Security best practices

## Performance Tips
Optimization recommendations

## Common Pitfalls
What to avoid

## Examples
Code examples demonstrating best practices
```

## 🐛 Bug Reports

When reporting bugs, include:

- **System Info**: OS, LangLink version, Electron version
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Logs**: Console output or error messages

## 💡 Feature Requests

For new features, describe:

- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Impact**: Who will benefit?

## 📞 Getting Help

- **GitHub Issues**: [Report bugs and request features](https://github.com/git-x-ai/langlink/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/git-x-ai/langlink/discussions)
- **Discord**: [Join our community](https://discord.gg/SW83FxMm6J)
- **Website**: [Visit CCC Suite](https://ccc-suite.sellhub.cx/)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same dual license as the project. See [LICENSE](LICENSE) for details.

**Important**: All modifications must be contributed back to the original project as per our dual license terms.

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- Project documentation
- Special mentions for significant rule contributions

---

<div align="center">
  <p><strong>Thank you for contributing to LangLink!</strong></p>
  <p><em>Part of the CCC Suite family</em></p>
  <p>
    <a href="https://ccc-suite.sellhub.cx/">Website</a> •
    <a href="https://discord.gg/SW83FxMm6J">Discord</a> •
    <a href="https://github.com/git-x-ai">GitHub</a>
  </p>
</div>

