#  Noobify Quiz - React Quiz App
## Link : noobify-quiz-3z9ogedyn-muhammadaliminhas66s-projects.vercel.app
A beautiful and interactive quiz application built with React and Tailwind CSS that fetches questions from Open Trivia Database API.

![Quiz App](https://img.shields.io/badge/React-18+-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan.svg)
![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)

##  Features

-  **Real-time Quiz** - Fetches fresh questions from Open Trivia DB
-  **Beautiful UI** - Stunning gradients and smooth animations
-  **Progress Tracking** - Visual progress bar and score display
-  **Instant Feedback** - Get results immediately after completion
-  **Fully Responsive** - Works perfectly on all devices
-  **Lightning Fast** - Built with Vite for optimal performance

##  Tech Stack

- **React 18+** - Modern React with Hooks
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling
- **Open Trivia DB API** - Free quiz questions database

##  Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MuhammadAliMinhas66/Frag--Web--development.git
cd quiz-app
```
### Install dependencies
```
npm install
```
### Start development server
```
npm run dev
```
### Open your browser
```
http://localhost:5173
📁 Project Structure
quiz-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind imports
├── public/
├── package.json
└── vite.config.js
```

### How to Use
```
Click "Quiz Shuru Karo" on the home page
Select your answer from the options
Click "Agla Sawal" to move to next question
View your final score at the end
Click "Dobara Try Karo" to restart
```

###  Features Breakdown
Home Page

Clean and inviting interface
Eye-catching gradient background
Animated hover effects

### Quiz Interface

Question counter
Progress bar
10 multiple choice questions
Visual feedback on selection
Current score display

### Results Page

Final score with percentage
Emoji feedback based on performance
Option to retry quiz

###  Color Scheme
```
Home: Cyan → Blue → Indigo gradient
Quiz: Orange → Red → Pink gradient
Results: Green → Teal → Blue gradient
Accent: Purple → Pink gradient
```

###  Configuration
To modify quiz settings, edit the API call in App.jsx:
```
javascriptconst api_ka_response = await fetch(
  'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
);
```
### Parameters:
```
amount - Number of questions (1-50)
category - Category ID (9 = General Knowledge)
difficulty - easy, medium, or hard
type - multiple (multiple choice)
```
###  Build for Production
```
npm run build
```
This creates an optimized production build in the dist/ folder.
###  Deploy
Deploy easily to:
```
Vercel: vercel deploy
Netlify: Drag & drop dist folder
GitHub Pages: Use gh-pages branch
```
###  Contributing
Contributions are welcome! Feel free to:

Fork the repository
Create a feature branch
Commit your changes
Push to the branch
Open a Pull Request


### License
MIT License - feel free to use this project for learning or personal use!
### Author
Muhammad Ali Minhas

```
GitHub: @MuhammadAliMinhas66
```

###  Acknowledgments

Open Trivia Database for free quiz API
Tailwind CSS for styling
React for the framework


### Star this repo if you found it helpful!
Made with ❤️ and React
