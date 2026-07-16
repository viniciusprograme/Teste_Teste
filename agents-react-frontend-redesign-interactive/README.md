Front-end React (Vite + TS + Tailwind) scaffold.

Run these commands in ./frontend to install dependencies and start locally:

  npm install
  npm run dev

Deploy instructions:

- From repository root (recommended, runs workspace build + sitemap generation):

```bash
npm install
npm run build
firebase deploy --only hosting --project <your-project-id>
```

- Or from the app folder:

```bash
cd agents-react-frontend-redesign-interactive
npm install
npm run build
firebase deploy --only hosting --project <your-project-id>
```

Note: If PowerShell blocks script execution in this environment, run the commands locally in a terminal where you can approve script execution or adjust ExecutionPolicy.