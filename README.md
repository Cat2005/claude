# Don't get Anthropicked!

A fun reverse Turing test game where you try to convince Claude that you are an AI!

## Game Overview

- **Objective**: Chat with Claude for 2 minutes and try to convince it that you are also an AI
- **Win Condition**: You win if Claude guesses that you are an AI
- **Lose Condition**: You lose if Claude correctly identifies you as human
- **Time Limit**: Exactly 2 minutes of conversation

## How It Works

1. Claude is told it's playing a guessing game with either a human or an AI
2. Claude analyzes your responses looking for patterns, inconsistencies, and tells
3. You try to mimic AI-like responses while engaging naturally
4. After 2 minutes, Claude makes its final guess
5. You see if you successfully deceived Claude!

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Claude API key from Anthropic

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Claude API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the game:**
   Navigate to `http://localhost:3000` in your browser

## Getting a Claude API Key

1. Visit [Anthropic's Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the key and paste it into your `.env.local` file

## Game Strategy Tips

**To convince Claude you're an AI:**
- Use precise, structured language
- Avoid typos and casual expressions
- Reference technical concepts naturally
- Be consistent in your responses
- Avoid emotional language or personal anecdotes

**What Claude looks for:**
- Human traits: typos, emotions, personal experiences, inconsistencies
- AI traits: perfect grammar, technical knowledge, structured responses

## Technical Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Claude 3.5 Sonnet via Anthropic API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom animations

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

- ⏱️ Real-time 2-minute countdown timer
- 💬 Live chat interface with Claude
- 🎨 Modern, minimalist UI design
- 🏆 Win/lose results screen
- 🔄 Play again functionality
- 📱 Responsive design

## License

This project is for educational and entertainment purposes.
