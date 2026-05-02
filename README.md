# 💸 Expense Tracker — Personal Finance Dashboard

> A full-featured personal finance tracker built with **React.js** — track expenses, set budgets, visualize spending with charts, and manage your money smarter.

🌐 **Live Demo:** [https://Yogeshmanikanta.github.io/expense-tracker](https://YOUR-GITHUB-USERNAME.github.io/expense-tracker)
> ⚠️ Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username after deploying.

📁 **GitHub Repository:** [https://github.com/Yogeshmanikanta/expense-tracker]

---

## 📸 Screenshots

| Dashboard | Add Expense | Charts |
|-----------|-------------|--------|
| Budget overview, stats, recent transactions | Form to add new expense with category & date | Pie chart by category + monthly bar chart |

---

## ✨ Features

- ✅ Add and delete expenses with name, amount, category, and date
- ✅ Set and update a monthly budget in real time
- ✅ Budget progress bar (changes color when nearing limit)
- ✅ Filter expense history by category
- ✅ Pie chart showing spending by category
- ✅ Bar chart showing monthly spending trends
- ✅ Summary stats — total spent, budget left, transaction count, average spend
- ✅ Data persists across page refreshes using **localStorage**
- ✅ Fully responsive — works on mobile and desktop

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | UI framework |
| Recharts | Charts and data visualization |
| Lucide React | Icons |
| localStorage API | Data persistence (no backend needed) |
| GitHub Pages | Free deployment |

---

## 📂 Project Structure

```
expense-tracker/
├── public/
│   └── index.html          # HTML entry point
├── src/
│   ├── App.js              # Main component (all logic and UI)
│   ├── App.css             # Global styles
│   └── index.js            # React DOM render
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

---

## 🚀 Getting Started — Run Locally

Follow these steps exactly to run the project on your computer.

### Prerequisites

Make sure you have these installed before starting:

- **Node.js** (v16 or higher) → Download from [https://nodejs.org](https://nodejs.org)
- **Git** → Download from [https://git-scm.com](https://git-scm.com)
- **VS Code** (recommended editor) → Download from [https://code.visualstudio.com](https://code.visualstudio.com)

To verify Node.js is installed, open your terminal and run:

```bash
node --version
# Should output something like: v20.x.x

npm --version
# Should output something like: 10.x.x
```

---

### Step 1 — Clone the Repository

```bash
# Clone the project to your computer
git clone https://github.com/YOUR-GITHUB-USERNAME/expense-tracker.git

# Navigate into the project folder
cd expense-tracker
```

---

### Step 2 — Install Dependencies

```bash
# Install all required packages (this may take 1-2 minutes)
npm install
```

This installs everything listed in `package.json` including React, Recharts, and Lucide React.

---

### Step 3 — Start the Development Server

```bash
npm start
```

- The app will automatically open in your browser at **http://localhost:3000**
- The server watches for changes — edit any file and the browser auto-refreshes
- Press `Ctrl + C` in the terminal to stop the server

---

## 📦 Available Scripts

Run these commands from inside the `expense-tracker/` folder:

| Command | Description |
|---------|-------------|
| `npm start` | Start local development server at http://localhost:3000 |
| `npm run build` | Build the app for production into the `/build` folder |
| `npm run deploy` | Deploy the built app to GitHub Pages |
| `npm test` | Run tests (if any are written) |

---

## ☁️ Deployment — GitHub Pages

This project is deployed for free using **GitHub Pages**. Here is exactly how it was done:

### Step 1 — Create a GitHub Repository

1. Go to [https://github.com](https://github.com) and log in (or sign up)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Name it `expense-tracker`
4. Leave it **Public**
5. Do NOT check "Initialize with README" (we already have one)
6. Click **"Create repository"**

---

### Step 2 — Initialize Git and Push Code

Run these commands from inside your project folder:

```bash
# Initialize a new git repository
git init

# Add all files to staging
git add .

# Commit the files with a message
git commit -m "Initial commit: Expense Tracker app"

# Add your GitHub repository as the remote origin
# Replace YOUR-GITHUB-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/expense-tracker.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3 — Install the GitHub Pages Package

```bash
npm install gh-pages --save-dev
```

---

### Step 4 — Update package.json

Open `package.json` in VS Code and make these two changes:

**1. Add `homepage` at the very top of the file (before "name"):**

```json
"homepage": "https://YOUR-GITHUB-USERNAME.github.io/expense-tracker",
```

**2. Add `predeploy` and `deploy` inside the `"scripts"` section:**

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```

Save the file.

---

### Step 5 — Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
1. Build the production version of your app (`npm run build`)
2. Push the built files to a special `gh-pages` branch on GitHub
3. GitHub Pages will serve your app from that branch

Wait 1-2 minutes, then visit:

```
https://YOUR-GITHUB-USERNAME.github.io/expense-tracker
```

Your app is now **live on the internet!** 🎉

---

### Step 6 — Push Final Changes to GitHub

After deploying, make sure all your latest changes are also on GitHub:

```bash
git add .
git commit -m "Add gh-pages deployment config"
git push origin main
```

---

## 🔄 How to Update the App After Making Changes

Whenever you make changes to the code and want to update the live site:

```bash
# 1. Save your changes in VS Code

# 2. Commit the changes to git
git add .
git commit -m "Describe what you changed"

# 3. Push to GitHub
git push origin main

# 4. Redeploy to GitHub Pages
npm run deploy
```

---

## 🧠 How the App Works

### Data Flow

```
User fills form → State updates in React → UI re-renders → localStorage saves data
```

### Key Concepts Used

- **useState** — stores expenses, budget, form values, active tab, and filter
- **useEffect** — syncs state to localStorage every time it changes
- **localStorage** — saves data in the browser so it persists after page refresh
- **Array methods** — `.filter()`, `.reduce()`, `.map()` to process expense data
- **Recharts** — `PieChart` and `BarChart` components for data visualization
- **Conditional rendering** — shows different tabs based on `activeTab` state

---

## 🐛 Common Issues & Fixes

**"npm start" shows an error about missing modules**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

**"npm run deploy" fails with permission error**
```bash
# Make sure gh-pages is installed
npm install gh-pages --save-dev

# Try deploying again
npm run deploy
```

**GitHub Pages shows a blank white page**
- Make sure `homepage` in `package.json` is exactly:
  `"https://YOUR-GITHUB-USERNAME.github.io/expense-tracker"`
- Make sure you ran `npm run deploy` (not just `git push`)
- Wait 2-3 minutes and hard refresh with `Ctrl + Shift + R`

**Changes not showing on live site**
```bash
# Redeploy after any change
npm run deploy
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**
- GitHub: [@YOUR-GITHUB-USERNAME](https://github.com/Yogeshmanikanta/expense-tracker)


---

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub — it helps others find it!

---

*Built with ❤️ using React.js*
