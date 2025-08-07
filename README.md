# React Task Manager App 🚀 | Everyday DevOps Series – Day 20+

This project kicks off a new phase of the **Everyday DevOps Challenge**, where we explore hands-on implementations of GitOps, containerization, observability, CI/CD, and security—one day at a time. The focus here is a lightweight yet production-ready **React Task Manager** application, which we will iteratively evolve through this DevOps series.

---

## 📌 Project Overview

This is a simple task manager web app built with **React**, styled using **Tailwind CSS**, and enhanced with **Lucide icons**. The app is containerized using Docker and served with **Nginx**, ready for production deployment in cloud-native or Kubernetes environments.

> ✅ This is **Day 20** of the Everyday DevOps series — our starting point for a fully GitOps-ready application pipeline.

## ⚙️ Tech Stack

- **Frontend:** React + Tailwind CSS + Lucide Icons
- **Containerization:** Docker (multi-stage build)
- **Web Server:** Nginx
- **Ready For:** CI/CD · GitOps · Kubernetes · Observability

---

## 📁 Project Structure

```bash
react-task-manager/
├── public/
│   └── index.html
├── src/
│   └── App.js
│   └── App.css
├── Dockerfile
├── nginx.conf
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

### Installing Node.js & npm

To run the React app, you need Node.js and npm installed. If you don't have them yet, follow these instructions:

**npm is included with your Node.js installation. Choose your operating system below to install both.**

macOS (using Homebrew):

```bash
brew install node
```

Windows (using Chocolatey):

```bash
choco install nodejs-lts
```

Ubuntu/Debian:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 1️⃣ Project Files

- Replace the content of the following files with the code below.

```bash
public/index.html
```

- This is the main HTML file where your React app will be mounted. Ensure it has a `<div id="root"></div>`.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React Task Manager</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

```bash
src/App.js
```

- This is the core logic and UI for the task manager.

```javascript
import React, { useState } from 'react';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';
import './App.css'; // Assuming App.css will be used for any custom CSS if needed

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Plan the DevOps challenge articles', completed: true },
    { id: 2, text: 'Review project READMEs', completed: false },
    { id: 3, text: 'Prepare for Day 20 content', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;
    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    const newTask = { id: newId, text: newTaskText.trim(), completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Task Manager</h1>
        
        <form onSubmit={addTask} className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Add Task
          </button>
        </form>

        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 flex-grow">
                  <button onClick={() => toggleComplete(task.id)} aria-label="Toggle task completion">
                    {task.completed ? (<CheckCircle2 className="text-green-500 h-6 w-6" />) : (<Circle className="text-gray-400 h-6 w-6" />)}
                  </button>
                  <span className={`text-lg flex-grow text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete task"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
```

This is the core logic and UI for the task manager.

- The entry point of the app. Ensure it looks like this.

`src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This imports your Tailwind CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`src/App.css`

- Create this file if it doesn't exist, or leave it empty. We're primarily using Tailwind for styling, so this file might not be strictly necessary unless you have custom CSS not handled by Tailwind.

```css
/* src/App.css */
/* Any custom CSS for your App component can go here */
```

`src/index.css`

- This file imports Tailwind CSS to be used in the app.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`tailwind.config.js`

- This file configures Tailwind CSS to scan your source files for classes.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`package.json`

- This file lists the dependencies for your React application and defines scripts.

```json
{
  "name": "react-task-manager",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.3.3",
    "lucide-react": "^0.284.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### 2️⃣ Clone and Setup the App

- Create a repo on GitHub and clone repo toyour local environment
- Replace `<your-username>` and `<repo-name>` with your GitHub username and the name of your repository.

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npx tailwindcss init -p
npm install
npm start
```

- Run the following commands if you encounter any errors with npm.
- First make sure you're in the right project directory.

```bash
 npm start
 npm install
 npm audit fix --force   #To take care of any vlnerabilities
 npm run             #to check if the scripts are available
```

`npm run`
![Npm Run](images/image1.png)

- Start by:

```bash
rm -rf node_modules package-lock.json    #to delete the ode_modules package-lock.json 
npm install       #to re-install the  node_modules package-lock.json
npm run
npm start
```

![NPM START](images/image3.png)

Access the app at [http://localhost:3000](http://localhost:3000)

![App in local browser](images/image4.png)

---

## 🐳 Containerizing the App (Production Build)

### 3️⃣ Build the Docker Image

- Create or update the `Dockerfile` in the root:

```dockerfile
# Stage 1: Build React app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build output to Nginx public directory
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- Create `nginx.conf` in the project root:

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  error_page 404 /index.html;
}
```

- Build & Run the Container Locally

```bash
docker build -t task-manager-app .
```

![Docker Build](images/image5.png)

### 4️⃣ Run the Container

```bash
docker run -p 8080:80 task-manager-app
```

Visit [http://localhost:8085](http://localhost:8085) to view the live app.

![Running Container](images/image6.png)

---

## 🧠 What You’ll Learn in This Series

As we progress through the series, this project will serve as the base for exploring:

- 🔁 GitOps workflows (Flux CD, Argo CD)
- 🔍 Observability tools (Prometheus, Grafana, Loki)
- 🔐 DevSecOps integrations (Snyk, Trivy, Aqua)
- ⚙️ CI/CD pipelines (GitHub Actions, Jenkins, GitLab CI)
- ☁️ Kubernetes Deployments (with Helm/Kustomize)
- 📦 Docker image hardening and registry automation
- 📈 Metrics, logs, and alerts for frontend apps

---

## 📅 Progress Tracker: Everyday DevOps

| Day | Topic                                         |
|-----|-----------------------------------------------|
| 21  | 🟢 React App Setup + Dockerized              |
| 22+ | 🔜 GitOps, Monitoring, Security, CI/CD, etc. |

---

## Day 22 – Everyday DevOps Challenge 🚀

## PART-2: CI/CD with GitHub Actions for React Task Manager App

This guide will walk you through setting up a CI/CD pipeline using GitHub Actions to automatically build, containerize, and optionally push your React app to Docker Hub. It's beginner-friendly, no prior experience needed!

---

## 🛠 Prerequisites

✅ A GitHub repo with your React Task Manager app  
✅ Dockerfile already working locally  
✅ Docker Hub account

---

## 📁 PART 2 - Project Structure

```bash
react-task-manager/
├── public/
├── src/
├── Dockerfile
├── nginx.conf
├── package.json
├── .github/
│   └── workflows/
│       └── docker-build.yml
└── README.md
```

---

## 1️⃣ Step 1: Create GitHub Actions Workflow

📄 Path: `.github/workflows/docker-build.yml`

![Workflow Structure](images/image7.png)

```yaml
name: Build and Dockerize React App

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: 18

    - name: Install dependencies
      run: npm ci

    - name: Build the React app
      run: npm run build

    - name: Set up Docker
      uses: docker/setup-buildx-action@v3

    - name: Log in to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/task-manager-app:latest
```

---

## 2️⃣ Step 2: Add GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions → **New repository secret**

Add:

- `DOCKER_USERNAME` → your Docker Hub username
- `DOCKER_PASSWORD` → your Docker Hub password or token(more secure)

![GitHub Secrets](images/image8.png)

---

## 3️⃣ Step 3: Test Your Workflow

✅ Git add, commit and push to the `main` branch  
✅ Watch the Actions tab for your build to run

![Actions](images/image9.png)

✅ Make a small change to your `README.md` or any file if there is a build fail

![Build Fail](images/image11.png)

If successful, your Docker image will be available on Docker Hub!

![DockerHub Image](images/image10.png)

---

## 💡 Troubleshooting Tips

- Make sure `Dockerfile` is at the root of your repo
- Ensure your app builds successfully locally (`npm run build`)
- If your image isn't showing up, double-check your Docker tag or secrets
- Also make sure the naming of the secret matches the one in the local file.

---

## 🚀 Next Steps

In the next stage, we’ll prepare Kubernetes deployment configs so this containerized app can run in a real cluster!

## 👥 Contributing

This is a solo DevOps learning project for now, but contributions or ideas are welcome as I grow the scope of the challenge.

---

## 📄 License

MIT

---

## 🙋‍♀️ Author

**Rashida Mohammed** — Everyday DevOps Challenge | GitOps Series  
[LinkedIn](https://www.linkedin.com/in/rashida-mohammed-cloud) • [GitHub](https://github.com/Rashkerry-newversion)

---

## 🌐 Join the Journey

Follow the [Everyday DevOps Challenge](https://www.linkedin.com/in/rashida-mohammed-cloud) on LinkedIn for daily updates, lessons learned, and behind-the-scenes progress
