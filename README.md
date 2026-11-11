# Suresh Kumar N · AI Portfolio

Generative AI & Full Stack Engineer · LangGraph · RAG · LLM Evaluation · Node.js · Angular · React

One self-contained page (`index.html`) with no build step and no dependencies.

## Features
- **AI Copilot**: an in-browser RAG agent that answers recruiter questions from the resume, with citations and a live agent trace
- **JD Fit Analyser**: paste any job description to get a fit score, matched skills with proof, honest gaps and a copyable pitch
- **Recruiter view**: one toggle that shows only the essentials
- **Interactive case studies**: problem → approach → result, with clickable architecture diagrams
- **Skills with evidence**: click a skill to see where it was used
- **Command menu**: Ctrl/⌘ + K
- Animated LangGraph agent in the hero, before/after impact bars, dark and light themes, mobile friendly

## Run locally (Windows)
```powershell
cd D:\github_projects\suresh-portfolio
python -m http.server 8000
# open http://localhost:8000
```
Or just double-click `index.html`.

## Publish on GitHub Pages
```powershell
cd D:\github_projects\suresh-portfolio
git init
git add .
git commit -m "AI portfolio"
git branch -M main
git remote add origin https://github.com/sureshnarayananankumar/suresh-portfolio.git
git push -u origin main
```
Then go to **Settings → Pages → Deploy from a branch → main / (root) → Save**.
The site goes live at `https://sureshnarayananankumar.github.io/suresh-portfolio/`.
