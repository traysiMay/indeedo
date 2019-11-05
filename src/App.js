import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext, UPDATE_USER } from './UserContext'
import { GameContext } from './GameContext'
import { BubbleContext } from './BubbleContext'
let wtf = false
let scorea = 0
function App() {
  const { user, user_dispatch } = useContext(UserContext)
  const { bubblez, bubbles_dispatch } = useContext(BubbleContext)
  const { score } = useContext(GameContext)
  const canvasRef = useRef()

  const bubbles = useRef(bubblez.bubbles)

  const drawBubbles = ctx => {
    const movedBubbles = bubbles.current.map(b => {
      const velocity = b.y > 400 || b.popped ? 0 : 3
      ctx.beginPath()
      ctx.ellipse(
        b.x,
        b.y + velocity,
        b.size,
        b.size,
        Math.PI / 4,
        0,
        2 * Math.PI,
      )
      ctx.stroke()
      return { ...b, y: b.y + velocity }
    })
    bubbles.current = movedBubbles
  }

  useEffect(() => {
    if (wtf) return
    wtf = true
    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 500, 500)
    canvasRef.current.addEventListener('click', e => {
      const x = e.layerX
      const y = e.layerY
      // loop bubbles and check collision, then dispatch destroy
      for (let i = 0; i < bubbles.current.length; i++) {
        const b = bubbles.current[i]
        if (Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2) < Math.pow(b.size, 2))
          bubbles_dispatch({ type: 'POP_BUBBLE', id: b.id })
        scorea += 1
      }
    })

    ctx.beginPath()
    ctx.ellipse(50, 50, 50, 50, Math.PI / 4, 0, 2 * Math.PI)
    ctx.stroke()

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, 500, 500)
      drawBubbles(ctx)
    }

    animate()

    setInterval(() => bubbles_dispatch({ type: 'ADD_BUBBLE' }), 1000)
  }, [bubbles_dispatch, drawBubbles, score])

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
      user: {user.name}
      <input name="user" onChange={handleUserChange} />
      <canvas ref={canvasRef} width="500px" height="500px" />
    </div>
  )
}

export default App
