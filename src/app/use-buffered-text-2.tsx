// eslint-disable
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useEffect, useRef } from 'react'

import { useState } from 'react'

const delimiter = ' '

/**
 * Ease-out cubic function.
 * @param t - Linear progress between 0 and 1
 */
function easeOut(t: number): number {
  return t //1 - Math.pow(1 - t, 3)
}

/**
 * Animates a value from start to end over a duration
 */
function animateValue(
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void,
) {
  let rafId: number
  const startTime = performance.now()

  function update(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const currentValue = start + (end - start) * easeOut(progress)
    onUpdate(currentValue)

    if (progress < 1) {
      rafId = requestAnimationFrame(update)
    } else {
      onComplete?.()
    }
  }

  rafId = requestAnimationFrame(update)
  return () => cancelAnimationFrame(rafId)
}

// Helper: Checks whether the diff chunk ends with a complete Markdown link.
// A complete link should follow the syntax: [link text](link URL)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isLinkChunkComplete(chunk: string): boolean {
  // Find the last occurrence of "["
  const lastOpenSquare = chunk.lastIndexOf('[')
  // If there's no "[", nothing to wait for.
  if (lastOpenSquare === -1) return true

  // Look for a corresponding closing bracket.
  const correspondingClose = chunk.indexOf(']', lastOpenSquare)
  if (correspondingClose === -1) return false

  // After the closing bracket, a link should have a parenthesized URL.
  const linkStart = chunk.indexOf('(', correspondingClose)
  if (linkStart === -1) return false

  const linkEnd = chunk.indexOf(')', linkStart)
  return linkEnd !== -1
}

export function useBufferedText(text: string) {
  const [cursor, setCursor] = useState(0)
  const [prevText, setPrevText] = useState(text)
  // const [isSameText, setIsSameText] = useState(true)
  const currentValue = useRef(0)
  const cleanup = useRef<(() => void) | null>(null)

  if (prevText !== text) {
    // setIsSameText(text.startsWith(prevText))
    setPrevText(text)
    const appendedDiff = text.slice(prevText.length)
    // const isLinkChunk = isLinkChunkComplete(appendedDiff)
    console.log({ appendedDiff })

    // if (isLinkChunk) {
    // }
    // if (!text.startsWith(prevText)) {
    //   // currentValue.current = 0
    //   setCursor(0)
    // }
  }

  useEffect(() => {
    // Clean up previous animation if exists
    // cleanup.current?.()

    // if (!isSameText) {
    //   currentValue.current = 0
    // }

    const targetLength = text.split(delimiter).length

    // Start new animation from current value
    cleanup.current = animateValue(
      currentValue.current,
      targetLength,
      3000, // 3 seconds duration
      (value) => {
        currentValue.current = value
        setCursor(Math.floor(value))
      },
    )

    return () => cleanup.current?.()
  }, [text])

  return text.split(delimiter).slice(0, cursor).join(delimiter)
}
