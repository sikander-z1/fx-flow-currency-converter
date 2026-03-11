# 💱 FX Flow - Currency Converter

A modern, full-stack currency conversion application built with React and Node.js. This tool provides real-time exchange rates and a seamless user experience for global currency tracking.

---

## 🚀 Features

* **Real-time Conversion:** Get up-to-the-minute exchange rates.
* **Clean UI:** Built with a responsive "Client" interface for desktop and mobile.
* **Modular Architecture:** Uses a `shared` folder for consistent logic between the frontend and backend.
* **Express Backend:** A robust server handling data fetching and API logic.

---

## 🛠️ Project Structure

```text
fx-flow-currency-converter/
├── client/          # Frontend (React / Vite)
├── server/          # Backend (Node.js / Express)
└── shared/          # Shared types and utility logic

💻 Local Setup (Windows)
1. Prerequisites
Ensure you have Node.js (LTS version) installed.

2. Installation
Open your terminal in the root directory and install dependencies:

Bash
npm install
3. Running the App
You will need two terminal windows open:

Window 1: Start the Backend

Bash
cd server
npm install
npm run dev
Window 2: Start the Frontend

Bash
cd client
npm install
npm run dev
The app will typically be available at http://localhost:5173.

☁️ Running on GitHub Codespaces
If you are using the Cloud Computer method:

Open the Codespace.

In the terminal, run cd server && npm install && npm run dev.

Open a second terminal tab and run cd client && npm install && npm run dev.

Click the "Open in Browser" popup that appears for Port 5173.

🛡️ Troubleshooting
ENOTEMPTY Error: If you see a "directory not empty" error during install, run:
rm -rf node_modules package-lock.json and try again.

Module Not Found: Ensure you have run npm install inside both the client and server folders.

Environment Variables: Check server/.env to ensure your API keys for currency data are correctly set.

👨‍💻 Author
Sikander-z1


---

### How to add this to your GitHub:
1.  On your main GitHub page, click **Add file** > **Create new file**.
2.  Name the file `README.md`.
3.  Paste the code block above into the box.
4.  Click **Commit changes...** at the top right.

**Would you like me to help you write the "About" description for the sidebar of
