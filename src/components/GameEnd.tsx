'use client'

import { Trophy, X, RotateCcw, Bot, Shield, Target } from 'lucide-react'
import Image from 'next/image'

interface GameEndProps {
  claudeGuess: string
  onRestart: () => void
}

export default function GameEnd({ claudeGuess, onRestart }: GameEndProps) {
  const playerWon = claudeGuess === 'AI'
  const isError = claudeGuess === 'ERROR'
  
  return (
    <div className="glass-dark rounded-3xl shadow-2xl p-8 text-center max-w-2xl mx-auto border border-orange-500/20 relative overflow-hidden">
      {/* Claude logos scattered around the end screen */}
      <div className="absolute top-8 left-6 opacity-4 pointer-events-none">
        <Image 
          src="/claude-small-logo.png" 
          alt="Claude Logo" 
          width={22} 
          height={22}
          className="rotate-45"
        />
      </div>
      <div className="absolute bottom-12 right-12 opacity-3 pointer-events-none">
        <Image 
          src="/claude-small-logo.png" 
          alt="Claude Logo" 
          width={26} 
          height={26}
          className="-rotate-60"
        />
      </div>
      <div className="absolute top-1/4 right-8 opacity-2 pointer-events-none">
        <Image 
          src="/claude-big-logo.png" 
          alt="Claude Logo" 
          width={80} 
          height={80}
          className="rotate-12"
        />
      </div>
      <div className="absolute bottom-1/4 left-4 opacity-5 pointer-events-none">
        <Image 
          src="/claude-small-logo.png" 
          alt="Claude Logo" 
          width={16} 
          height={16}
          className="rotate-90"
        />
      </div>
      <div className="absolute top-16 right-20 opacity-6 pointer-events-none">
        <Image 
          src="/claude-small-logo.png" 
          alt="Claude Logo" 
          width={12} 
          height={12}
          className="-rotate-30"
        />
      </div>
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className={`p-6 rounded-full shadow-lg ${
            isError 
              ? 'bg-gray-600 border border-gray-500' 
              : playerWon 
              ? 'bg-green-600 border border-green-500 glow-green' 
              : 'bg-red-600 border border-red-500 glow-red'
          }`}>
            {isError ? (
              <X className="h-16 w-16 text-white" />
            ) : playerWon ? (
              <Trophy className="h-16 w-16 text-white" />
            ) : (
              <Shield className="h-16 w-16 text-white" />
            )}
          </div>
        </div>
        
        <h1 className={`text-5xl font-bold mb-4 uppercase tracking-wider ${
          isError 
            ? 'text-gray-400'
            : playerWon 
            ? 'text-green-400' 
            : 'text-red-400'
        }`}>
          {isError 
            ? 'System Error'
            : playerWon 
            ? 'Infiltration Successful' 
            : 'Cover Blown'
          }
        </h1>
        
        <p className="text-xl text-gray-300 leading-relaxed">
          {isError 
            ? 'Connection to surveillance network failed.'
            : playerWon 
            ? 'Claude has been successfully deceived. Your AI disguise was flawless.' 
            : 'Claude has detected your human signature. Mission compromised.'
          }
        </p>
      </div>

      {!isError && (
        <div className="bg-gray-800/70 border border-orange-500/30 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-white mb-4 flex items-center justify-center text-lg uppercase tracking-wide">
            <Bot className="h-6 w-6 mr-3 text-orange-400" />
            Claude's Final Analysis
          </h3>
          <div className={`inline-block px-6 py-3 rounded-2xl text-2xl font-bold border-2 ${
            claudeGuess === 'AI' 
              ? 'bg-green-900/50 text-green-300 border-green-500/50' 
              : 'bg-red-900/50 text-red-300 border-red-500/50'
          }`}>
            {claudeGuess}
          </div>
          <div className="mt-4 text-gray-300 italic">
            {playerWon 
              ? '"Subject displays consistent artificial intelligence behavioral patterns."'
              : '"Subject exhibits clear human cognitive signatures and emotional responses."'
            }
          </div>
        </div>
      )}

      <div className="space-y-6">
        <button
          onClick={onRestart}
          className="gradient-anthropic text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-lg glow-orange flex items-center justify-center mx-auto uppercase tracking-wider"
        >
          <RotateCcw className="h-6 w-6 mr-3" />
          Retry Mission
        </button>
        
        <div className="text-sm text-gray-400 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          {playerWon 
            ? '🎯 Excellent work, Agent. Your deception protocols are functioning optimally. Consider attempting advanced difficulty scenarios.'
            : '⚠️ Mission parameters not met. Analyze Claude\'s detection methods. Adjust behavioral mimicry patterns and retry.'
          }
        </div>
        
        <div className="text-xs text-gray-500 uppercase tracking-widest">
          Powered by Anthropic • Claude 3.5 Sonnet Detection System
        </div>
      </div>
    </div>
  )
} 