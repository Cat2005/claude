'use client'

import { useEffect, useState } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'
import Image from 'next/image'

interface TimerProps {
  onTimeUp: () => void
  isActive: boolean
}

export default function Timer({ onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes in seconds
  
  useEffect(() => {
    if (!isActive) return
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isActive, onTimeUp])
  
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const percentage = (timeLeft / 120) * 100
  
  return (
    <div className="glass-dark rounded-xl p-5 shadow-lg border border-orange-500/30 relative overflow-hidden">
      {/* Tiny Claude logos floating around the timer */}
      <div className="absolute top-1 right-2 opacity-20 pointer-events-none">
        <Image 
          src="/claude-small-logo.png" 
          alt="Claude Logo" 
          width={8} 
          height={8}
          className="rotate-45"
        />
      </div>
      <div className="absolute bottom-2 left-1 opacity-15 pointer-events-none">
        <Image 
          src="/claude-small-logo.png" 
          alt="Claude Logo" 
          width={10} 
          height={10}
          className="-rotate-30"
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Clock className="h-6 w-6 text-orange-400" />
          <span className="font-semibold text-gray-200 uppercase tracking-wide text-sm">
            Infiltration Timer
          </span>
        </div>
        <div className={`text-3xl font-bold font-mono ${
          timeLeft <= 30 
            ? 'text-red-400 impostor-glow' 
            : timeLeft <= 60 
            ? 'text-yellow-400' 
            : 'text-orange-400'
        }`}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div 
          className={`h-3 rounded-full transition-all duration-1000 ${
            timeLeft <= 30 
              ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50' 
              : timeLeft <= 60 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
              : 'bg-gradient-to-r from-orange-400 to-orange-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {timeLeft <= 10 && timeLeft > 0 && (
        <div className="flex items-center justify-center mt-3 space-x-2">
          <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
          <span className="text-red-400 font-bold animate-pulse uppercase tracking-wider text-sm">
            Detection Imminent!
          </span>
          <AlertTriangle className="h-4 w-4 text-red-400 animate-pulse" />
        </div>
      )}
    </div>
  )
} 