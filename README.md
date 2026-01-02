'''
# AI Life Agent (ALA) - MVP Phase 1

This repository contains the source code for the AI Life Agent, a mobile-first application that helps you manage your tasks using natural language.

## Project Overview

The goal of this MVP is to create a simple application that allows a user to:
1.  Enter tasks in natural language (e.g., "remind me to go to the bank tomorrow at 3pm").
2.  Have the text parsed by an AI (OpenAI) into a structured task.
3.  Store and view tasks for the current day.

## Project Structure

This project uses a monorepo structure to manage the mobile client and the backend server in a single repository.

```
/
├── mobile/      # Expo (React Native) mobile application
├── server/      # Node.js + Express backend API
├── shared/      # (Optional) Shared code/types between client and server
└── README.md    # This file
```

## Requirements

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device

## Backend Setup (Server)

Follow these steps to get the backend server running:

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file and fill in your details.
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and add your OpenAI API key:
    ```
    DATABASE_URL="file:./dev.db"
    OPENAI_API_KEY="sk-..."
    PORT=3000
    ```

4.  **Run database migrations:**
    This will create the SQLite database and the `Task` table.
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000` by default.

## Mobile App Setup (Client)

Follow these steps to get the mobile app running:

1.  **Navigate to the mobile directory:**
    ```bash
    cd mobile
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the API Server URL:**
    Your mobile app needs to know the address of your backend server. Find your computer's local network IP address.

    Open the `mobile/config.ts` file and replace `localhost` with your computer's IP address.

    **Example:**
    ```typescript
    // Before
    export const API_BASE_URL = 'http://localhost:3000';

    // After
    export const API_BASE_URL = 'http://192.168.1.101:3000';
    ```

4.  **Start the Expo development server:**
    ```bash
    npm start
    ```

5.  **Run the app on your phone:**
    - A QR code will appear in your terminal.
    - Open the Expo Go app on your phone and scan the QR code.
    - The AI Life Agent app will load on your device.

## Troubleshooting

- **Connection Errors:** Ensure your computer and your mobile phone are connected to the **same Wi-Fi network**.
- **Firewall Issues:** If the app cannot connect to the server, your computer's firewall might be blocking the connection. Temporarily disable it to check if that resolves the issue.
- **Invalid IP Address:** Double-check that the IP address in `mobile/config.ts` is correct and that the backend server is running.
'''
