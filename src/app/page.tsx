'use client'

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useControls, button } from 'leva'

import { useBufferedText } from './use-buffered-text'

type ContentType = 'simple' | 'commits' | 'files' | 'issues'

const content: Record<ContentType, string> = {
  simple:
    '# The Birth of React\n\nIn the realm of web, where code does dance,\nA library arose, by fate and chance.\nReact, the name, a beacon so bright,\nTo guide developers through the darkest night.\n\nComponents crafted with care and grace,\nReusable pieces, each in its place.\nState and props, a dynamic duo,\nBinding the data, making it flow.\n\n# The Symphony of React\n\nWith JSX, a syntax so clear,\nHTML in JavaScript, we hold dear.\nVirtual DOM, the secret behind,\nEfficient updates, so well-defined.\n\nHooks brought power, simplicity too,\nStateful logic, without the class view.\nIn the world of web, React does reign,\nA framework of choice, in sunshine and rain.',
  commits:
    'Here are some of the recent commits in the `primer/react` repository:\n\n1. **Commit [947b59d](https://github.com/primer/react/commit/947b59d43079003f5be6eea60b7dc2025fb21a4e)** by [Marie Lucca](https://github.com/francinelucca)\n   - **Message:** fix(SelectPanel): Correctly recalculate position on overflow (#5562)\n   - **Date:** Not provided\n\n2. **Commit [37a91b5](https://github.com/primer/react/commit/37a91b51569bc4be92c6994ec6fe433584328911)** by [Jon Rohan](https://github.com/jonrohan)\n   - **Message:** chore(Header): Remove CSS modules feature flag from Header (#5510)\n   - **Date:** Not provided\n\n3. **Commit [56baa0a](https://github.com/primer/react/commit/56baa0a791ba8a714fec28e3794e471358ddfde3)** by [Hector Garcia](https://github.com/hectahertz)\n   - **Message:** Fix LinkButton types (#5655)\n   - **Date:** Not provided\n\n4. **Commit [1262f5a](https://github.com/primer/react/commit/1262f5affa84330c917b964fa0cd8d907b398afc)** by [Tyler Jones](https://github.com/TylerJDev)\n   - **Message:** SubNav: Add `aria-current` to `SubNav` (#5661)\n   - **Date:** Not provided\n\n5. **Commit [102b523](https://github.com/primer/react/commit/102b523dfe274997fb56e7fc41123ee922c8ff46)** by [Tyler Jones](https://github.com/TylerJDev)\n   - **Message:** Add `preventOverflow` prop to `ActionMenu` example; add newline to docs for `Overlay` (#5654)\n   - **Date:** Not provided\n\nTo view more commits, please check the [GitHub commits page for primer/react](https://github.com/primer/react/commits?per_page=5&sort=updated&order=desc).',
  files:
    'Sure, here is a basic implementation of the Snake game in TypeScript. The game will be created using HTML5 Canvas for rendering.\n\n```html name=index.html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Snake Game</title>\n    <style>\n        body {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            height: 100vh;\n            margin: 0;\n            background-color: #000;\n        }\n        canvas {\n            border: 1px solid #fff;\n        }\n    </style>\n</head>\n<body>\n    <canvas id="gameCanvas" width="400" height="400"></canvas>\n    \x3Cscript src="game.js">\x3C/script>\n</body>\n</html>\n```\n\n```typescript name=game.ts\nclass SnakeGame {\n    private canvas: HTMLCanvasElement;\n    private ctx: CanvasRenderingContext2D;\n    private snake: { x: number, y: number }[];\n    private direction: { x: number, y: number };\n    private food: { x: number, y: number };\n    private gridSize: number;\n    private tileCount: number;\n    private gameOver: boolean;\n\n    constructor(canvasId: string) {\n        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;\n        this.ctx = this.canvas.getContext("2d")!;\n        this.gridSize = 20;\n        this.tileCount = this.canvas.width / this.gridSize;\n        this.resetGame();\n        this.gameLoop();\n        document.addEventListener("keydown", this.handleKeyPress.bind(this));\n    }\n\n    private resetGame() {\n        this.snake = [{ x: 10, y: 10 }];\n        this.direction = { x: 0, y: 0 };\n        this.placeFood();\n        this.gameOver = false;\n    }\n\n    private placeFood() {\n        this.food = {\n            x: Math.floor(Math.random() * this.tileCount),\n            y: Math.floor(Math.random() * this.tileCount)\n        };\n    }\n\n    private handleKeyPress(event: KeyboardEvent) {\n        switch (event.key) {\n            case "ArrowUp":\n                if (this.direction.y === 0) this.direction = { x: 0, y: -1 };\n                break;\n            case "ArrowDown":\n                if (this.direction.y === 0) this.direction = { x: 0, y: 1 };\n                break;\n            case "ArrowLeft":\n                if (this.direction.x === 0) this.direction = { x: -1, y: 0 };\n                break;\n            case "ArrowRight":\n                if (this.direction.x === 0) this.direction = { x: 1, y: 0 };\n                break;\n        }\n    }\n\n    private gameLoop() {\n        if (this.gameOver) {\n            this.ctx.fillStyle = "red";\n            this.ctx.font = "50px Arial";\n            this.ctx.fillText("Game Over", 50, 200);\n            return;\n        }\n\n        this.update();\n        this.draw();\n        setTimeout(() => this.gameLoop(), 1000 / 10);\n    }\n\n    private update() {\n        const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };\n\n        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount || this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {\n            this.gameOver = true;\n            return;\n        }\n\n        this.snake.unshift(head);\n\n        if (head.x === this.food.x && head.y === this.food.y) {\n            this.placeFood();\n        } else {\n            this.snake.pop();\n        }\n    }\n\n    private draw() {\n        this.ctx.fillStyle = "black";\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n\n        this.ctx.fillStyle = "lime";\n        this.snake.forEach(segment => this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize));\n\n        this.ctx.fillStyle = "red";\n        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);\n    }\n}\n\nnew SnakeGame("gameCanvas");\n```\n\nTo compile the TypeScript file to JavaScript, you need to run the TypeScript compiler:\n\n```sh\ntsc game.ts\n```\n\nAfter compiling, the `game.js` file will be generated, which you can include in your HTML file. Now you can open the `index.html` file in a browser to play the Snake game.',
  issues:
    'Here are the latest open issues in the facebook/react repository, including all their labels. Please note that these results are incomplete, and there are a total of 775 open issues. You can view more results [here](https://github.com/facebook/react/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).\n\n```list type="issue"\ndata:\n- url: "https://github.com/facebook/react/issues/32406"\n  state: "open"\n  draft: false\n  title: "Bug: JSX SVG Typescript type error: missing \'slot\' attribute"\n  number: 32406\n  labels:\n  - "Status: Unconfirmed"\n  updated: "2025-02-17T10:02:10Z"\n  author: "apprat"\n  comments: 0\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/19991"\n  state: "open"\n  draft: false\n  title: "Bug: Infinite rendering resulting in freezing of tab/browser"\n  number: 19991\n  labels: []\n  updated: "2025-02-17T08:02:10Z"\n  author: "palerdot"\n  comments: 13\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/23301"\n  state: "open"\n  draft: false\n  title: "Bug: autoFocus broken inside <dialog />"\n  number: 23301\n  labels:\n  - "Type: Bug"\n  updated: "2025-02-17T04:02:10Z"\n  author: "jantimon"\n  comments: 16\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/32380"\n  state: "open"\n  draft: false\n  title: "Bug: Console Logs Disappear in Chromium-Based Browsers When Rendering Incorrectly Encoded Image URLs in a React Application"\n  number: 32380\n  labels:\n  - "Status: Unconfirmed"\n  updated: "2025-02-16T23:02:10Z"\n  author: "hanurii"\n  comments: 2\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/32392"\n  state: "open"\n  draft: false\n  title: "[React 19] Bug: `cloneElement` in client component with async server component as children not working"\n  number: 32392\n  labels:\n  - "React 19"\n  updated: "2025-02-16T20:02:10Z"\n  author: "darthmaim"\n  comments: 2\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/28938"\n  state: "open"\n  draft: false\n  title: "[React 19] Support scoped custom element registries (i.e, react with Custom Elements being rendered in a shadow root)"\n  number: 28938\n  labels:\n  - "React 19"\n  updated: "2025-02-16T16:02:10Z"\n  author: "michaelwarren1106"\n  comments: 9\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/32369"\n  state: "open"\n  draft: false\n  title: "Feature proposal: Give `useEffect` cleanup an option to run on page unload"\n  number: 32369\n  labels: []\n  updated: "2025-02-16T12:02:10Z"\n  author: "TimurTimergalin"\n  comments: 4\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/31281"\n  state: "open"\n  draft: false\n  title: "Bug: Uncaught runtime error with \'removeChild\' and long lists"\n  number: 31281\n  labels:\n  - "Status: Unconfirmed"\n  - "Resolution: Stale"\n  updated: "2025-02-15T23:02:10Z"\n  author: "Kevlanche"\n  comments: 4\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/30739"\n  state: "open"\n  draft: false\n  title: "[React 19] style using precedence can produce many additional style elements after initial render"\n  number: 30739\n  labels:\n  - "Resolution: Needs More Information"\n  - "React 19"\n  updated: "2025-02-15T20:02:10Z"\n  author: "souporserious"\n  comments: 10\n  assignees_avatar_urls: []\n\n- url: "https://github.com/facebook/react/issues/32016"\n  state: "open"\n  draft: false\n  title: "[React 19] Error when use create-react-app"\n  number: 32016\n  labels:\n  - "React 19"\n  updated: "2025-02-15T16:02:10Z"\n  author: "manueljesus00"\n  comments: 26\n  assignees_avatar_urls: []\n```',
}

export default function Home() {
  const [position, setPosition] = useState(0)

  const [{ contentType, delay, chunkSize }] = useControls(
    '1 – Content',
    () => ({
      contentType: {
        value: 'simple',
        options: ['simple', 'commits', 'files', 'issues'] as const,
        label: 'Markdown',
        order: 0,
      },
      delay: {
        value: 120,
        min: 10,
        max: 500,
        step: 10,
        label: 'Delay (ms)',
      },
      chunkSize: {
        value: 50,
        min: 1,
        max: 200,
        step: 1,
        label: 'Chunk size',
      },
    }),
  )

  const [{ isPlaying, delimiter, buffering, animate, duration }, set] =
    useControls('2 – Buffering', () => ({
      buffering: {
        value: false,
        label: 'Buffering',
      },
      animate: {
        value: false,
        label: 'Animate',
      },
      duration: {
        value: 1,
        min: 0.1,
        max: 10,
        step: 0.1,
        label: 'Duration (s)',
      },
      delimiter: {
        value: '',
        options: {
          character: '',
          word: ' ',
          line: '\n',
        },
        label: 'Delimiter',
        order: 1,
      },
      isPlaying: {
        value: false,
        render: () => false,
      },
    }))

  useControls('3 – Actions', () => ({
    play: button(() => {
      set({ isPlaying: !isPlaying })
    }),
    pause: button(() => {
      set({ isPlaying: false })
    }),
    reset: button(() => {
      setPosition(0)
      set({ isPlaying: false })
    }),
  }))

  useEffect(() => {
    setPosition(0)
  }, [contentType])

  const source = content[contentType as ContentType]
  const text = source.slice(0, position)
  const isComplete = position >= source.length

  useEffect(() => {
    if (isComplete) {
      set({ isPlaying: false })
    }
  }, [set, isComplete])

  useInterval(
    () => {
      setPosition((p) => p + chunkSize)
    },
    isPlaying && !isComplete ? delay : null,
  )

  const animatedText = useBufferedText(text, delimiter, duration)

  return (
    <div className="p-8 grid grid-cols-2 gap-8">
      <div className="min-h-[calc(100vh-4rem)] overflow-scroll rounded shadow-xl bg-white p-10 border border-gray-200">
        <p className="whitespace-pre-wrap prose prose-sm text-gray-700 reveal-text">
          {text}
        </p>
      </div>
      <div className="min-h-[calc(100vh-4rem)] overflow-scroll rounded shadow-xl p-10 bg-white border border-gray-200">
        <ReactMarkdown
          className={
            '[&>p]:whitespace-pre-wrap prose prose-sm ' +
            (buffering ? (animate ? 'renderer' : '') : '')
          }
        >
          {buffering ? animatedText : text}
        </ReactMarkdown>
      </div>
    </div>
  )
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<(() => void) | null>(null)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval and call the callback immediately.
  useEffect(() => {
    if (delay === null) {
      return
    }

    // Call the callback immediately.
    savedCallback.current?.()

    function tick() {
      savedCallback.current?.()
    }

    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
