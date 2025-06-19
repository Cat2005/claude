'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User } from 'lucide-react'
import Image from 'next/image'
import Timer from './Timer'

interface Message {
  id: string
  content: string
  sender: 'user' | 'claude'
  timestamp: Date
}

interface ChatInterfaceProps {
  onGameEnd: (claudeGuess: string) => void
}

export default function ChatInterface({ onGameEnd }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const MAX_CHARACTERS = 200 // Roughly 2 sentences
  const [isLoading, setIsLoading] = useState(false)
  const [gameActive, setGameActive] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  // Send initial message from Claude
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: "Hello there! I'm curious to learn more about you and what you're thinking.",
      sender: 'claude',
      timestamp: new Date()
    }
    setMessages([initialMessage])
  }, [])
  
  const handleTimeUp = async () => {
    setGameActive(false)
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content
          })),
          requestFinalGuess: true
        })
      })
      
      const data = await response.json()
      onGameEnd(data.guess)
    } catch (error) {
      console.error('Error getting final guess:', error)
      onGameEnd('ERROR')
    } finally {
      setIsLoading(false)
    }
  }
  
  const sendMessage = async () => {
    if (!input.trim() || !gameActive || isLoading || input.length > MAX_CHARACTERS) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        })
      })
      
      const data = await response.json()
      
      const claudeMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        sender: 'claude',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, claudeMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  
  return (
    <div className="glass-dark rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto h-[80vh] flex flex-col border border-orange-500/20">
      <div className="gradient-anthropic p-6 border-b border-orange-500/30 relative">
        <div className="absolute top-4 right-4">
          <Image 
            src="/claude-small-logo.png" 
            alt="Claude Logo" 
            width={24} 
            height={24}
            className="opacity-80"
          />
        </div>
        <Timer onTimeUp={handleTimeUp} isActive={gameActive} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-900/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start max-w-xs lg:max-w-md space-x-3 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'gradient-anthropic shadow-lg shadow-orange-500/30' 
                  : 'bg-gray-600 border border-gray-500'
              } rounded-full p-3`}>
                {message.sender === 'user' ? (
                  <User className="h-5 w-5 text-white" />
                ) : (
                  <Bot className="h-5 w-5 text-orange-400" />
                )}
              </div>
              <div className={`rounded-2xl px-5 py-3 shadow-lg ${
                message.sender === 'user'
                  ? 'gradient-anthropic text-white font-medium'
                  : 'bg-gray-800 text-gray-100 border border-gray-700'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-xs lg:max-w-md space-x-3">
              <div className="bg-gray-600 border border-gray-500 rounded-full p-3">
                <Bot className="h-5 w-5 text-orange-400" />
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl px-5 py-3 shadow-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {gameActive && (
        <div className="border-t border-orange-500/30 p-6 bg-gray-800/80">
          <div className="space-y-3">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARACTERS))}
                onKeyPress={handleKeyPress}
                placeholder="Craft your deceptive message (2 sentences max)..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                disabled={!gameActive || isLoading}
                maxLength={MAX_CHARACTERS}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || !gameActive || isLoading || input.length > MAX_CHARACTERS}
                className="gradient-anthropic text-white p-3 rounded-xl hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 shadow-lg glow-orange"
              >
                <Send className="h-6 w-6" />
              </button>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="text-gray-400">
                Keep it concise - Claude is analyzing every word
              </div>
              <div className={`font-mono ${
                input.length > MAX_CHARACTERS * 0.9 
                  ? 'text-red-400' 
                  : input.length > MAX_CHARACTERS * 0.7 
                  ? 'text-yellow-400' 
                  : 'text-gray-500'
              }`}>
                {input.length}/{MAX_CHARACTERS}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!gameActive && !isLoading && (
        <div className="border-t border-orange-500/30 p-6 text-center bg-gray-800/80">
          <p className="text-orange-300 font-semibold uppercase tracking-wide">Analysis Complete • Rendering Judgment...</p>
        </div>
      )}
    </div>
  )
} 