# 💻 [brunofelix-dev](https://www.brunofelix.dev)

[![Portfolio](https://img.shields.io/badge/visit-portfolio-blue)](https://www.brunofelix.dev)

### 📖 About the Project

This is my online CV portfolio project built with Angular 20. I created it to showcase my professional background, skills, and projects throughout my career.  

### 🛠️ Technologies Used

- [Angular](https://angular.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [HTML5](https://www.w3.org/)
- [Sass](https://sass-lang.com/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)

### 📘 Git Guide

This project uses **Gitflow**, **Conventional Commits**, and **Gitmoji** to keep the Git history clean and consistent.  

### 🔀 Gitflow

- **main** → stable production releases  
- **develop** → main development branch  
- **feature/** → new features  
- **bugfix/** → fixes during development  
- **hotfix/** → urgent fixes in production  
- **release/** → release preparation  

---

### 🌿 Branch Naming Convention

Always use **kebab-case** (lowercase letters and hyphens).  

| Type     | Pattern                        | Example                       |
|----------|--------------------------------|-------------------------------|
| Feature  | `feature/feature-name`         | `feature/google-login`        |
| Bugfix   | `bugfix/bug-description`       | `bugfix/fix-header-layout`    |
| Hotfix   | `hotfix/hotfix-description`    | `hotfix/fix-ios-crash`        |
| Release  | `release/x.y.z`                | `release/1.2.0`               |

---

### 📝 Commit Convention

Commit message format:

```
<emoji> <type>(<scope>): <short description>
```

### Types (Conventional Commits)
- **feat** → new feature  
- **fix** → bug fix  
- **docs** → documentation  
- **style** → formatting/style (no code impact)  
- **refactor** → code refactor  
- **perf** → performance improvement  
- **test** → add or update tests  
- **chore** → maintenance, configs, dependencies  
- **build** → build or CI/CD changes  

### Emojis (Most Used Gitmoji)

| Emoji | Code | Type     | Description                         |
|-------|------|----------|-------------------------------------|
| 🎉    | `:tada:`          | feat     | Starting project                     |
| ✨    | `:sparkles:`          | feat     | New feature                     |
| 🐛    | `:bug:`               | fix      | Bug fix                         |
| 📝    | `:memo:`              | docs     | Documentation                   |
| 🎨    | `:art:`               | style    | Code style improvements         |
| ♻️    | `:recycle:`           | refactor | Refactor                        |
| ⚡    | `:zap:`               | perf     | Performance improvement         |
| ✅    | `:white_check_mark:`  | test     | Tests                           |
| 🔧    | `:wrench:`            | chore    | Configurations and maintenance  |
| 📦    | `:package:`           | build    | Build and dependencies          |
| 🔒    | `:lock:`              | feat     | Security                        |
| 🔥    | `:fire:`              | refactor | Remove code, file or package    |
| 🚀    | `:rocket:`            | build    | Deploy                          |
| 💄    | `:lipstick:`          | style    | Add or update UI or style files |
| 🍱    | `:bento:`             | style    | Add or update assets            |
| 🔖    | `:bookmark:`          | build    | Release / Version tags          |

### Commit Examples

```
✨ feat(auth): add Google login
🐛 fix(dashboard): fix error when loading stats
📝 docs(readme): update installation instructions
♻️ refactor(core): improve API service readability
```

---

✌️ By following these rules, we’ll have a clean, organized, and maintainable Git history!
