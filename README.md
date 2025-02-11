# Crypto Trading App

## Overview
This project is a simple Crypto Trading App built using **React.js** and **TypeScript**. The application allows users to view cryptocurrency prices, sort assets, and execute buy/sell trades. It features local authentication, real-time conversion rates, and a user-friendly UI without relying on component libraries.

## Features
### ✅ Main Layout
- A **sticky header** with navigation.
- **Home** page displaying a list of cryptocurrencies.
- **Trade** page where users can trade crypto (available only after login).
- A **user info section** with login/logout functionality.

### ✅ Home Page
- Displays a list of crypto assets fetched from an API.
- Allows sorting by **name** or **price**.
- Expandable list to show more assets.
- Each asset has a dropdown with **Buy** and **Sell** options.

### ✅ Trade Page
- Users can trade crypto only after logging in.
- A **crypto amount field** with a dropdown to select assets.
- A **fiat amount field** that updates in real time based on exchange rates.
- A **swap button** to toggle between crypto ↔ fiat.
- Live updates while entering values.

## Tech Stack & Dependencies
### 🛠 Core Technologies
- **React.js + TypeScript** – For building the app with strong typing.
- **React Router** – For handling navigation between pages.
- **React Query** – For API fetching, caching, and state management.
- **Zustand** – For managing authentication state.
- **Axios** – For making API requests.
- **SCSS/TailwindCSS** – For styling the UI.

## Installation & Setup
### 📌 Prerequisites
- Install **Node.js** (LTS version recommended).
- Install **npm** or **yarn**.

### 📌 Steps to Run the Project
1. **Clone the repository:**
  
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173/` in your browser.

## Folder Structure
```plaintext
/src
│── components/         # Reusable UI components (Button, Input, Modal)
│── pages/              # Home and Trade pages
│── store/              # Global state management (Zustand)
│── styles/             # SCSS styles
│── App.tsx             # Main component
│── main.tsx            # Entry point
```

## Challenges & Solutions
### 🔹 Handling Authentication
- Used **Zustand** to persist user session.
- Implemented a simple **mock login system**.

### 🔹 Real-time Crypto Conversion
- Used **React Query** for caching API responses.
- **Debounced API calls** to prevent excessive requests.

### 🔹 UI Design System (Without Component Library)
- Created **custom reusable UI components** (Button, Input, Dropdown).
- Used **SCSS** for styling while ensuring responsiveness.


