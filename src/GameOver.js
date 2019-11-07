import React from "react";
import styled from "styled-components";
const Container = styled.div`
  text-align: center;
  font-size: 60px;
  padding: 80px;
  font-family: sans-serif;
`;

const GameOver = ({ name, score }) => {
  return (
    <Container>
      Nice job {name}!<p>You got {score}!</p>
    </Container>
  );
};

export default GameOver;
