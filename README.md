# Thashmini Naleesha Jayasooriya — Portfolio

A clean, dark-themed personal portfolio built with **React + Vite**.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

---

## 📁 Folder Structure

```
thashmini-portfolio/
├── index.html                  # Vite HTML entry point
├── vite.config.js              # Vite configuration
├── package.json
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # Root component — composes all sections
    │
    ├── components/             # One file per UI section / reusable component
    │   ├── Navbar.jsx          # Fixed top navigation + mobile hamburger menu
    │   ├── Hero.jsx            # Landing hero with spinning avatar
    │   ├── About.jsx           # Bio text + stats grid
    │   ├── Skills.jsx          # Skill cards grid
    │   ├── Projects.jsx        # Project cards grid
    │   ├── Education.jsx       # Timeline of academic history
    │   ├── Contact.jsx         # Contact links, certifications, references
    │   ├── Footer.jsx          # Simple footer
    │   └── FadeIn.jsx          # Reusable scroll-triggered fade-in wrapper
    │
    ├── hooks/                  # Custom React hooks
    │   ├── useInView.js        # IntersectionObserver — triggers on scroll
    │   └── useActiveSection.js # Tracks which nav section is in view
    │
    ├── data/                   # Static content — edit here to update the site
    │   └── portfolioData.js    # NAV_LINKS, SKILLS, PROJECTS, EDUCATION, etc.
    │
    └── styles/                 # Design tokens and global CSS
        ├── theme.js            # Colour palette & border constants
        └── global.css          # CSS reset + responsive nav breakpoints
```

---

## ✏️ Customising Content

All text content lives in **`src/data/portfolioData.js`** — update your name,
projects, skills, education entries, and contact details there without touching
any component files.

Colours and spacing tokens are centralised in **`src/styles/theme.js`**.
