# LinguaLeap - AI-Powered Language Learning Platform

Welcome to LinguaLeap, a Next.js application designed to make learning new languages an engaging and personalized experience. This application is built with modern web technologies and leverages the power of AI to create dynamic and effective lessons.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Google's Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Charts:** [Recharts](https://recharts.org/)

## Features

- **Personalized Dashboard:** A central hub for learners to track their progress, including daily goals, streaks, and weekly activity.
- **Interactive Lessons:** Engaging exercises including multiple-choice, fill-in-the-blank, and pronunciation practice.
- **AI-Powered Grammar Tool:** Get instant grammatical explanations for any sentence, tailored to your proficiency level.
- **AI-Powered Review Sessions:** Genkit analyzes your performance and suggests exercises to review, helping you focus on areas that need improvement.
- **Personalized Learning Paths:** AI generates a custom learning path based on your skill level, pace, and interests.
- **Leaderboard:** Compete with other learners and stay motivated.
- **User Profiles:** View your stats and achievements.

## Getting Started

To get this project up and running on your local machine, follow these steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/lingualea.git
    cd lingualea
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```

### Running the Development Server

To start the Next.js development server, run:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

The Genkit flows are also started with the dev server, allowing you to inspect them at `http://localhost:4000/`.

## Project Structure

The project is organized as follows:

- `/src/app`: Contains the pages and layouts for the Next.js App Router.
  - `/(app)`: Route group for the main application pages (dashboard, lessons, etc.).
  - `/(auth)`: Route group for authentication pages.
- `/src/components`: Shared React components, including UI components from ShadCN.
- `/src/ai`: Houses the Genkit implementation.
  - `/flows`: Contains all the Genkit flows for AI-powered features.
- `/src/lib`: Utility functions, data definitions, and other shared code.
- `/public`: Static assets like images and fonts.

## AI Integration with Genkit

This project heavily utilizes Google's Genkit to provide its intelligent features. The flows are defined in the `/src/ai/flows` directory:

- **`personalized-learning-path.ts`**: Generates a custom learning path.
- **`grammar-explanation-tool.ts`**: Provides grammatical explanations.
- **`exercise-review-presenter.ts`**: Determines which exercises a user should review.

These server-side flows are called from client components via Next.js Server Actions.
