'use client'

import { Bot, Brain, Clock, Target, Eye, Zap } from 'lucide-react'

interface GameStartProps {
  onStart: () => void
}

export default function GameStart({ onStart }: GameStartProps) {
  return (
    <div className="glass-dark rounded-3xl shadow-2xl p-8 text-center max-w-2xl mx-auto border border-orange-500/20">
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className="gradient-anthropic p-6 rounded-full glow-orange relative">
            <Brain className="h-16 w-16 text-white" />
            <div className="absolute -top-1 -right-1">
              <Eye className="h-6 w-6 text-red-400 animate-pulse" />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Anthropicked
        </h1>
       
        <p className="text-xl text-gray-400">
          Infiltrate. Deceive. Convince Claude you are one of them.
        </p>

        <p className="text-xl text-gray-400">
          Don't get Anthropicked!
        </p>
      </div>

      <div className="space-y-6 text-left mb-8">
        <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-800/50 border border-orange-500/10">
          <Target className="h-7 w-7 text-orange-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white mb-1">Mission Objective</h3>
            <p className="text-gray-300 leading-relaxed">
              Engage with Claude in conversation. Your goal: convince it that you are an AI, not human. 
              Both you and Claude are limited to 2 sentences per message - choose your words wisely.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-800/50 border border-red-500/10">
          <Clock className="h-7 w-7 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white mb-1">Time Constraint</h3>
            <p className="text-gray-300 leading-rel axed">
              You have exactly 2 minutes. When the countdown reaches zero, 
              Claude will render its final judgment on your identity.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-800/50 border border-green-500/10">
          <Zap className="h-7 w-7 text-green-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-white mb-1">Victory Parameters</h3>
            <p className="text-gray-300 leading-relaxed">
              SUCCESS: Claude identifies you as an AI<br />
              FAILURE: Claude detects your humanity
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="gradient-anthropic text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-lg glow-orange uppercase tracking-wider"
      >
        Begin Infiltration
      </button>
      
      <div className="mt-6 text-xs text-gray-500 uppercase tracking-widest">
        Powered by Anthropic • Claude 3.5 Sonnet
      </div>
    </div>
  )
} 