import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { UserContext } from './UserContext'
import { BubbleContext } from './BubbleContext'
import { POP_BUBBLE, ADD_BUBBLE, UPDATE_USER } from './actions'
import Controls from './Controls'

let wtf = false

function App() {
  const { user, user_dispatch } = useContext(UserContext)
  const { bubblez, bubbles_dispatch } = useContext(BubbleContext)
  const [play, setPlay] = useState(false)
  const canvasRef = useRef()
  const ctxRef = useRef()
  const intervalRef = useRef()
  const playRef = useRef()

  const bubbles = useRef(bubblez.bubbles)

  const drawBubbles = ctx => {
    const movedBubbles = bubbles.current.map(b => {
      const velocity = b.y > 500 + b.y || b.popped ? 0 : bubblez.velocity
      const size = b.popped ? 0 : b.size
      ctx.beginPath()
      ctx.ellipse(b.x, b.y + velocity, size, size, Math.PI / 4, 0, 2 * Math.PI)
      ctx.stroke()
      return { ...b, y: b.y + velocity }
    })
    bubbles.current = movedBubbles
  }

  const animate = useCallback(() => {
    if (playRef.current) {
      requestAnimationFrame(animate)
      ctxRef.current.clearRect(0, 0, 500, 500)
      drawBubbles(ctxRef.current)
    }
  })

  function handleClick(e) {
    const x = e.layerX
    const y = e.layerY
    for (let i = 0; i < bubbles.current.length; i++) {
      const b = bubbles.current[i]
      if (Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2) < Math.pow(b.size, 2))
        bubbles_dispatch({ type: POP_BUBBLE, id: b.id })
    }
  }

  useEffect(() => {
    if (wtf) return
    wtf = true
    const ctx = canvasRef.current.getContext('2d')
    ctxRef.current = ctx
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 500, 500)
    canvasRef.current.addEventListener('click', handleClick, true)

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        setPlay(false)
      }
    })
  }, [handleClick])

  useEffect(() => {
    if (play) {
      playRef.current = true
      animate()
      intervalRef.current = setInterval(
        () => bubbles_dispatch({ type: ADD_BUBBLE }),
        1000,
      )
    } else {
      canvasRef.current.style.pointerEvents = 'none'
      playRef.current = false
      clearInterval(intervalRef.current)
    }
  }, [animate, bubbles_dispatch, play])

  useEffect(() => {
    const newBubbles = bubblez.bubbles.filter(b => {
      return !Object.keys(bubbles.current).includes(b.id.toString())
    })
    const mergedBubbles = bubbles.current.concat(newBubbles)

    bubbles.current = mergedBubbles
  }, [bubblez, bubblez.bubbles])

  useEffect(() => {
    const newBubbles = bubbles.current.map(b => {
      if (bubblez.poppedBubbles.includes(b.id)) {
        b.popped = true
        return b
      }
      return b
    })
    bubbles.current = newBubbles
  }, [bubblez.poppedBubbles])

  const handleUserChange = e =>
    user_dispatch({ type: UPDATE_USER, name: e.target.value })

  return (
    <div>
      <Controls
        setPlay={setPlay}
        play={play}
        bubblez={bubblez}
        user={user}
        handleUserChange={handleUserChange}
      />
      <canvas
        ref={canvasRef}
        style={{ pointerEvents: play ? 'auto' : 'none' }}
        width="500px"
        height="500px"
      />
    </div>
  )
}

export default App
