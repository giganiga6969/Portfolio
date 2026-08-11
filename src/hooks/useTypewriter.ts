'use client'
import { useState, useEffect, useRef } from 'react'

interface Options {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
}

export function useTypewriter({ words, typeSpeed = 75, deleteSpeed = 38, pause = 2000 }: Options) {
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const word = words[wordIdx]

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeout.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typeSpeed)
      } else {
        timeout.current = setTimeout(() => setPhase('pausing'), pause)
      }
    } else if (phase === 'pausing') {
      timeout.current = setTimeout(() => setPhase('deleting'), 0)
    } else {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed)
      } else {
        setWordIdx((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout.current)
  }, [displayed, phase, wordIdx, words, typeSpeed, deleteSpeed, pause])

  return { text: displayed, isTyping: phase === 'typing' }
}
