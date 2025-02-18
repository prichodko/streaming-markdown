import { useEffect } from 'react'

import { animate } from 'framer-motion'

import { useMotionValue } from 'framer-motion'
import { useState } from 'react'

export function useBufferedText(
  text: string,
  delimiter: string = '',
  duration: number,
) {
  const animatedCursor = useMotionValue(0)
  const [cursor, setCursor] = useState(0)
  const [prevText, setPrevText] = useState(text)
  const [isSameText, setIsSameText] = useState(true)

  if (prevText !== text) {
    setPrevText(text)
    setIsSameText(text.startsWith(prevText))

    if (!text.startsWith(prevText)) {
      setCursor(0)
    }
  }

  useEffect(() => {
    if (!isSameText) {
      animatedCursor.jump(0)
    }

    const elements = text.split(delimiter)
    const controls = animate(animatedCursor, elements.length, {
      duration,
      ease: 'linear',
      onUpdate(latest) {
        setCursor(Math.floor(latest))
      },
    })

    return () => controls.stop()
  }, [animatedCursor, isSameText, text, delimiter, duration])

  // Join only the complete elements to preserve markdown structure
  return text.split(delimiter).slice(0, cursor).join(delimiter)
}
