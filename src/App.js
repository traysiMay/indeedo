import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext, UPDATE_USER } from './UserContext'
import { GameContext } from './GameContext'
import { BubbleContext } from './BubbleContext'
let wtf = false
function App() {
  const { user, user_dispatch } = useContext(UserContext)
  const { bubblez, bubbles_dispatch } = useContext(BubbleContext)
  const { score } = useContext(GameContext)
  const canvasRef = useRef()

  const bubbles = useRef(bubblez.bubbles)

  const drawBubbles = ctx => {
    const movedBubbles = bubbles.current.map(b => {
      const velocity = b.y > 400 ? 0 : 3
      ctx.beginPath()
      ctx.ellipse(
        b.x,
        b.y + bubblez.velocity,
        50,
        50,
        Math.PI / 4,
        0,
        2 * Math.PI,
      )
      ctx.stroke()
      return { ...b, y: b.y + bubblez.velocity }
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
      if (Math.pow(x - 50, 2) + Math.pow(y - 50, 2) < Math.pow(50, 2))
        console.log('hi')
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

    setInterval(() => bubbles_dispatch({ type: 'ADD_BUBBLE' }), 5000)
  }, [bubbles_dispatch, drawBubbles])

  useEffect(() => {
    const newBubbles = bubblez.bubbles.filter(b => {
      console.log(!Object.keys(bubbles.current).includes(b.id.toString()))
      return !Object.keys(bubbles.current).includes(b.id.toString())
    })
    console.log(newBubbles)
    const meepo = bubbles.current.concat(newBubbles)
    bubbles.current = meepo
    // console.log(bubbles.current)
  }, [bubblez.bubbles])

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
