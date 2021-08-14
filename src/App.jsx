import { useState } from "react";
import styled from "styled-components";
import { evaluate } from "mathjs";

import buttons from "./buttons.json";

const App = () => {
  const [screen, setScreen] = useState([0]);

  const handleClick = (val) => {
    if (val === "clear") {
      setScreen([0])
    } else if (val === "=") {
      let currentStr = screen.join("")
      let total = evaluate(currentStr)
      setScreen([total])
    } else {
      let newArr = [...screen, val]
      if (newArr[0] === 0) {
        newArr.shift()
      }
      setScreen(newArr)
    }
  }

  return (
    <div>
      <div className="screen-wrapper">
        <h1>{screen}</h1>
      </div>
      <ButtonWrapper>
        {buttons.map((item, index) => (
          <StyledButton
            key={index}
            className={item.style}
            onClick={() => handleClick(item.value)}
          >
            {item.displayValue}
          </StyledButton>
        ))}
      </ButtonWrapper>
    </div>
  );
};

const ButtonWrapper = styled.div`
  height: 250px;
  width: 200px;
  display: grid;
  grid-template-areas:
    "clear clear clear ."
    ". . . ."
    ". . . ."
    ". . . ."
    "zero zero . .";

  .clear {
    grid-area: clear;
  }

  .zero {
    grid-area: zero;
  }
`;

const StyledButton = styled.button`
  /* height: 40px;
  width: 40px;
  margin: 10px */
  /* border-radius: 0; */
`;

export default App;
