import React, { useContext } from "react";
import { BubbleContext } from "./BubbleContext";
import { UPDATE_VELOCITY } from "./actions";
import {
  ControlsContainer,
  Score,
  PlayButton,
  SliderContainer
} from "./styles";

const Controls = ({ setPlay, play }) => {
  const {
    bubbles_dispatch,
    bubblesState: { score }
  } = useContext(BubbleContext);
  return (
    <ControlsContainer>
      <Score>{score}</Score>
      <PlayButton onClick={() => setPlay(!play)}>
        {play ? "PAUSE" : "PLAY"}
      </PlayButton>
      <SliderContainer>
        <input
          onChange={e =>
            bubbles_dispatch({
              type: UPDATE_VELOCITY,
              velocity: e.target.value
            })
          }
          type="range"
          name="points"
          min="10"
          max="100"
        ></input>
      </SliderContainer>
    </ControlsContainer>
  );
};

export default Controls;
