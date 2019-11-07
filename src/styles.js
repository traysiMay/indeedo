import styled from "styled-components";

export const Nametainer = styled.div`
  display: grid;
  grid-template-columns: 340px;
  grid-row-gap: 12px;
  margin-left: 20px;
`;
export const Hey = styled.div`
  font-family: sans-serif;
  font-size: 40px;
`;
export const UserInput = styled.input`
  height: 40px;
  border: 2px solid black;
  padding: 10px;
  font-size: 30px;
`;

export const Timer = styled.div`
  border: 2px solid black;
  border-radius: 43rem;
  padding: 15px;

  text-align: center;
  width: 57.2px;
  font-size: 46px;
  font-family: fantasy;
  display: block;
  margin: 30px 210px;
`;

export const ControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 250px;
  grid-template-rows: 70px 40px;
  width: 500px;
  height: 117px;
  background: white;
`;
export const Score = styled.div`
  text-align: center;
  font-size: 44px;
  font-family: monospace;
  line-height: 70px;
`;

export const PlayButton = styled.button`
  background: white;
  font-size: 44px;
  font-weight: solid;
  font-family: sans-serif;
  border: 3px solid black;
  border-radius: 2rem;
`;

export const BeginButton = styled(PlayButton)`
  background: white;
  font-size: 24px;
  font-weight: solid;
  font-family: sans-serif;
  border: 3px solid black;
  border-radius: 2rem;
  margin-top: 1px;
  margin-bottom: 10px;
  width: 170px;
  height: 60px;
`;

export const SliderContainer = styled.div`
  grid-row: 2;
  grid-column: 1 / span 2;

  input[type="range"] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 99%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 99%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: white;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-webkit-slider-thumb {
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
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: red;
  }
`;

export const FooterName = styled.div`
  margin: 20px;
  font-size: 40px;
  font-family: sans-serif;
`;
