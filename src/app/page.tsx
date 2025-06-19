'use client'

import { useState } from 'react'
import GameStart from '@/components/GameStart'
import ChatInterface from '@/components/ChatInterface'
import GameEnd from '@/components/GameEnd'

export type GameState = 'start' | 'playing' | 'ended'

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('start')
  const [claudeGuess, setClaudeGuess] = useState<string>('')
  
  const startGame = () => {
    setGameState('playing')
  }
  
  const endGame = (guess: string) => {
    setClaudeGuess(guess)
    setGameState('ended')
  }
  
  const resetGame = () => {
    setGameState('start')
    setClaudeGuess('')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {gameState === 'start' && <GameStart onStart={startGame} />}
        {gameState === 'playing' && <ChatInterface onGameEnd={endGame} />}
        {gameState === 'ended' && (
          <GameEnd 
            claudeGuess={claudeGuess} 
            onRestart={resetGame} 
          />
        )}
      </div>
    </main>
  )
}
