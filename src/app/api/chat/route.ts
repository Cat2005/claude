import { NextRequest, NextResponse } from 'next/server'
import { anthropic, SYSTEM_PROMPT } from '@/lib/claude'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, requestFinalGuess } = body
    
    if (requestFinalGuess) {
      // Request final guess from Claude
      const finalPrompt = `
Based on our entire conversation above, I need you to make your final determination. 

You must respond with ONLY one word: either "HUMAN" or "AI"

Think about:
- Did they make spelling mistakes or typos that seem human?
- Were their responses too perfect or too formulaic?
- Did they show emotions or personal experiences?
- Were there patterns that suggest AI or human behavior?
- Did they have knowledge limitations or unusual capabilities?
- How did they reason and express ideas?

Your final guess (respond with only "HUMAN" or "AI"):
      `
      
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 10,
        system: SYSTEM_PROMPT,
        messages: [
          ...messages,
          { role: 'user', content: finalPrompt }
        ]
      })
      
      const guess = response.content[0]?.type === 'text' ? response.content[0].text?.trim().toUpperCase() : 'AI'
      return NextResponse.json({ 
        guess: guess === 'HUMAN' || guess === 'AI' ? guess : 'AI' 
      })
    }
    
    // Regular chat message
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 80, // Reduced to enforce 2-sentence limit
      system: SYSTEM_PROMPT,
      messages: messages
    })
    
    return NextResponse.json({ 
      content: response.content[0]?.type === 'text' ? response.content[0].text : 'I apologize, but I cannot respond right now.' 
    })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
} 