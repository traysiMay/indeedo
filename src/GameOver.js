import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  text-align: center;
  font-size: 60px;
  padding: 80px;
  font-family: sans-serif;
  border: 2px black solid;
  margin: 50px;
  box-shadow: 10px 9px black;
`

const GameOver = ({ name, score }) => {
  return (
    <Container>
      Nice job {name}!<p>You got {score}!</p>
    </Container>
  )
}

export default GameOver
