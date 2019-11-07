import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { UserContext } from "./UserContext";
import { BubbleContext } from "./BubbleContext";
import {
  POP_BUBBLE,
  ADD_BUBBLE,
  UPDATE_USER,
  TIMER_TICK,
  BEGIN_GAME
} from "./actions";
import Controls from "./Controls";
import GameOver from "./GameOver";
import {
  BeginButton,
  UserInput,
  Timer,
  Nametainer,
  Hey,
  FooterName
} from "./styles";
import { getRandomInt } from "./utils";

function App() {
  const { userState, user_dispatch } = useContext(UserContext);
  const { bubblesState, bubbles_dispatch } = useContext(BubbleContext);
  const [play, setPlay] = useState(false);
  const canvasRef = useRef();
  const ctxRef = useRef();
  const intervalRef = useRef();
  const playRef = useRef();
  const velocityRef = useRef();

  const bubbles = useRef(bubblesState.bubbles);

  const drawBubbles = ctx => {
    const movedBubbles = bubbles.current.map((b, i) => {
      const velocity = b.y > 500 + b.y ? 0 : velocityRef.current / 30;
      const size = b.popped ? 0 : b.size;

      if (i === bubbles.current.length - 1 && b.y > b.size + 100) {
        bubbles_dispatch({ type: ADD_BUBBLE });
      }

      ctx.beginPath();
      ctx.ellipse(b.x, b.y + velocity, size, size, Math.PI / 4, 0, 2 * Math.PI);
      ctx.stroke();
      return { ...b, y: b.y + velocity };
    });
    bubbles.current = movedBubbles;
  };

  const animate = () => {
    if (playRef.current) {
      requestAnimationFrame(animate);
      ctxRef.current.clearRect(0, 0, 500, 500);
      drawBubbles(ctxRef.current);
    }
  };

  const introAnimate = () => {
    requestAnimationFrame(introAnimate);
    const size = getRandomInt(0, 500);
    ctxRef.current.lineWidth = getRandomInt(1, 10);
    ctxRef.current.strokeStyle = getRandomInt(1, 10) > 5 ? "black" : "white";
    ctxRef.current.beginPath();
    ctxRef.current.ellipse(250, 250, size, size, Math.PI / 4, 0, 2 * Math.PI);
    ctxRef.current.stroke();
  };

  const handleClick = e => {
    const x = e.layerX;
    const y = e.layerY;
    for (let i = 0; i < bubbles.current.length; i++) {
      const b = bubbles.current[i];
      if (Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2) < Math.pow(b.size, 2)) {
        bubbles_dispatch({
          type: POP_BUBBLE,
          id: b.id,
          points: Math.floor(100 / b.size)
        });
      }
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctxRef.current = ctx;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 500, 500);
    canvasRef.current.addEventListener("click", handleClick, true);
    introAnimate();
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        setPlay(false);
      }
    });
  }, []);

  useEffect(() => {
    if (play) {
      playRef.current = true;
      bubbles_dispatch({ type: ADD_BUBBLE });

      animate();
      intervalRef.current = setInterval(
        () => bubbles_dispatch({ type: TIMER_TICK }),
        1000
      );
    } else {
      canvasRef.current.style.pointerEvents = "none";
      playRef.current = false;
      clearInterval(intervalRef.current);
    }
  }, [play]);

  useEffect(() => {
    velocityRef.current = bubblesState.velocity;
  }, [bubblesState.velocity]);

  useEffect(() => {
    const newBubbles = bubblesState.bubbles.filter(b => {
      return !Object.keys(bubbles.current).includes(b.id.toString());
    });
    const mergedBubbles = bubbles.current.concat(newBubbles);

    bubbles.current = mergedBubbles;
  }, [bubblesState.bubbles]);

  useEffect(() => {
    const newBubbles = bubbles.current.map(b => {
      if (bubblesState.poppedBubbles.includes(b.id)) {
        b.popped = true;
        return b;
      }
      return b;
    });
    bubbles.current = newBubbles;
  }, [bubblesState.poppedBubbles]);

  useEffect(() => {
    if (bubblesState.gameOver) {
      clearInterval(intervalRef.current);
    }
  }, [bubblesState.gameOver]);

  const handleUserChange = e =>
    user_dispatch({ type: UPDATE_USER, name: e.target.value });

  return (
    <div>
      {!bubblesState.gameOver && (
        <Fragment>
          {!bubblesState.begin && (
            <Nametainer>
              <Hey>Hey there! what may I call you?</Hey>
              <UserInput
                onChange={handleUserChange}
                placeholder="name"
              ></UserInput>
              <BeginButton
                onClick={() => bubbles_dispatch({ type: BEGIN_GAME })}
              >
                CONTINUE
              </BeginButton>
            </Nametainer>
          )}
          {bubblesState.begin && (
            <Fragment>
              <Timer>{bubblesState.timer}</Timer>
              <Controls
                setPlay={setPlay}
                play={play}
                bubblesState={bubblesState}
                handleUserChange={handleUserChange}
              />
            </Fragment>
          )}
          <canvas
            style={{ touchAction: "none" }}
            ref={canvasRef}
            style={{ pointerEvents: play ? "auto" : "none" }}
            width="500px"
            height="500px"
          />
          {userState.name && (
            <FooterName>Good luck {userState.name}!</FooterName>
          )}
        </Fragment>
      )}
      {bubblesState.gameOver && (
        <GameOver name={userState.name} score={bubblesState.score} />
      )}
    </div>
  );
}

export default App;
