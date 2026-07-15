# PitchSide

![Pitchside Banner](https://img.shields.io/badge/Pitchside-Football_Dashboard-1E153A?style=for-the-badge&logo=react)

Pitchside is a sleek, modern, and data-driven web application built to track football fixtures, *real-time match statistics, and tactical setups. Designed with a focus on seamless UI/UX and optimized data fetching, Pitchside brings the stadium experience directly to your screen.

Currently configured to track the intense moments of the **World Cup 2022**.

## ✨ Key Features

* **🏆 Interactive Knockout Bracket:** A visual, draggable tournament bracket showcasing the road to the final.
* **⏱️ Real-Time Match Status:** Dynamic score updates, live minute tracking, and precise goalscorer events (including penalties and own goals).
* **📊 Comparative Match Analytics:** Auto-calculating horizontal bar chart dashboard for team statistics (possession, shots, passes, cards, etc.).
* **🗺️ Dynamic Tactical Setup:** An automated visual football pitch that renders starting XI formations using X/Y grid coordinates directly from the API.

## 🛠️ Tech Stack

This project is built utilizing modern frontend technologies to ensure maintainability, performance, and a great developer experience:

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Library:** [React](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Data Source:** [API-Football v3](https://www.api-football.com/)

## 🚀 Getting Started

Follow these steps to run Pitchside locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
    git clone https://github.com/Daniarthawiku/PitchSide-Match-Schedule.git
2. **Change Directory**
   ```bash
   cd pitchside-web
3. **Install dependencies:**
   ```bash
   npm install
4. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your API-Football key:
   ```bash
   NEXT_PUBLIC_API_FOOTBALL_KEY=your_api_key_here
5. **Run the development server:**
   ```bash
   npm run dev
6. **Open the app**
Navigate to `http://localhost:3000` in your browser to see the result.


## 📂 Project Structure
```
pitchside-web
├─ components.json
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  └─ 404Handler.jpg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ match
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ matches
│  │  │  └─ page.tsx
│  │  ├─ not-found.tsx
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ AppSidebar.tsx
│  │  ├─ atoms
│  │  │  └─ TeamBadge.tsx
│  │  ├─ match-info
│  │  │  ├─ MatchHeroCard.tsx
│  │  │  ├─ MatchLineupTab.tsx
│  │  │  └─ MatchStatsTab.tsx
│  │  ├─ molecules
│  │  │  └─ MatchCard.tsx
│  │  ├─ organism
│  │  │  └─ LiveMatchHero.tsx
│  │  └─ ui
│  │     ├─ button.tsx
│  │     ├─ combobox.tsx
│  │     ├─ command.tsx
│  │     ├─ popover.tsx
│  │     ├─ separator.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     └─ tooltip.tsx
│  ├─ hooks
│  │  ├─ use-mobile.ts
│  │  ├─ useFetchFixtures.ts
│  │  └─ useFetchMatch.ts
│  └─ lib
│     └─ utils.ts
└─ tsconfig.json

```

💡 Developer Note
1. API Rate Limiting: This application relies on the free tier of API-Football (100 requests/day). A custom tracking system has been injected into the data-fetching hooks to monitor x-ratelimit-requests-remaining via the response headers. Check your browser console to monitor your daily quota during development!
2. Real-time match statistics: its only simulation of a real-time match. Why? cause the real-time match for World Cup 2026 only for a pro plan so i use the world cup 2022 data instead
