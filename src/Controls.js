import React from 'react'
import styled from 'styled-components'

const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 250px;
  grid-template-rows: 70px 40px;
  width: 500px;
  height: 117px;
  background: white;
`
const Score = styled.div`
  text-align: center;
  font-size: 44px;
  font-family: monospace;
  line-height: 70px;
`

const PlayButton = styled.button`
  background: white;
  font-size: 44px;
  font-weight: solid;
  font-family: sans-serif;
  border: 3px solid black;
`
const SliderContainer = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;

  input[type='range'] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: white;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type='range']::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 30px;
    width: 20px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -11px;
  }
  input[type='range']:focus::-webkit-slider-runnable-track {
    background: red;
  }
`

const Controls = ({ setPlay, play, bubblez, user, handleUserChange }) => {
  return (
    <ControlsContainer>
      <Score>{bubblez.poppedBubbles.length}</Score>
      <PlayButton onClick={() => setPlay(!play)}>
        {play ? 'PAUSE' : 'PLAY'}
      </PlayButton>

      {/* user: {user.name}
      <input name="user" onChange={handleUserChange} /> */}
      <SliderContainer>
        <input
          onChange={e => console.log(e.target.value)}
          type="range"
          name="points"
          min="10"
          max="100"
        ></input>
      </SliderContainer>
    </ControlsContainer>
  )
}

export default Controls
