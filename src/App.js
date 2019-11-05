import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, UPDATE_USER } from './UserContext';
import { GameContext } from './GameContext';
import { BubbleContext } from './BubbleContext';

function App() {
  const { user, user_dispatch } = useContext(UserContext)
  const { bubblez, bubbles_dispatch } = useContext(BubbleContext)
  const { score } = useContext(GameContext)
  const canvasRef = useRef()

  const bubbles = useRef([
    { x: 100, y: 0, size: 50, velocity: 5 },
    { x: 200, y: 0, size: 50, velocity: 3 }
  ])

  const drawBubbles = (ctx) => {
    const movedBubbles = bubbles.current.map(b => {
      ctx.beginPath();
      ctx.ellipse(b.x, b.y + b.velocity, 50, 50, Math.PI / 4, 0, 2 * Math.PI);
      ctx.stroke();
      return { ...b, y: b.y + b.velocity }
    })
    bubbles.current = movedBubbles
  }

  useEffect(() => {

    const ctx = canvasRef.current.getContext('2d')
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, 500, 500)
    canvasRef.current.addEventListener('click', (e) => {
      const x = e.layerX
      const y = e.layerY
      // loop bubbles and check collision, then dispatch destroy
      if (Math.pow(x - 50, 2) + Math.pow(y - 50, 2) < Math.pow(50, 2)) console.log('hi')
    })

    ctx.beginPath();
    ctx.ellipse(50, 50, 50, 50, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();

    const animate = () => {
      requestAnimationFrame(animate)
      // ctx.clearRect(0, 0, 500, 500)
      console.log(bubbles.current)
      drawBubbles(ctx)
    }

    animate()

    setInterval(() => bubbles_dispatch({ type: 'ADD_BUBBLE' }), 1000)
  }, [])

  const getBubbles = () => bubbles
  useEffect(() => {
    bubbles.current = bubblez.bubbles
  }, [bubblez])

  const handleUserChange = (e) => user_dispatch({ type: UPDATE_USER, name: e.target.value })

  return (
    <div>
      user: {user.name}

      <input name="user" onChange={handleUserChange} />

      <canvas ref={canvasRef} width="500px" height="500px" />
    </div>
  );
}

export default App;
