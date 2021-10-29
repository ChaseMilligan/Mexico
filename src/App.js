import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  //TIES ARE NOT HANDLED!!!

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const [D1, setD1] = useState(getRandomInt(6) + 1);
  const [D2, setD2] = useState(getRandomInt(6) + 1);
  const [lowRoll, setLowRoll] = useState(null);
  const [playerList, setPlayerList] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [tequilaCount, setTequilaCount] = useState(1);
  const [currentAttemptCount, setCurrentAttemptCount] = useState(0);
  const [totalAttemptCount, setTotalAttemptCount] = useState(null);
  const [i, setI] = useState(0);
  const [gringo, setGringo] = useState("");
  const [rolling, setRolling] = useState(false);

  const trigger = useRef(null);
  const playersTrigger = useRef(null);
  const playersView = useRef(null);
  const playerInput = useRef(null);
  const playerListEl = useRef(null);
  const Dice1 = useRef(null);
  const Dice2 = useRef(null);
  const lowDice1 = useRef(null);
  const lowDice2 = useRef(null);
  const diceBox = useRef(null);

  function playerFormSubmit(e) {
    e.preventDefault();
    const currentValue = playerInput.current.value.toUpperCase();

    setPlayerList([...playerList, currentValue]);

    console.log(playerList);

    playerInput.current.value = "";
  }

  function playersTriggerClick() {
    if (playersView.current.classList.contains("open")) {
      playersView.current.classList.remove("open");
      playersTrigger.current.classList.remove("trigger-open");
    } else {
      playersView.current.classList.add("open");
      playersTrigger.current.classList.add("trigger-open");
    }
  }

  function handleRoll() {
    console.log(D1, D2);
    setRolling(true);

    setTimeout(() => {
      const newD1 = getRandomInt(6) + 1;
      const newD2 = getRandomInt(6) + 1;
      setD1(newD1);
      setD2(newD2);
      console.log(newD1, newD2);
      if (newD2 > newD1) {
        if (!totalAttemptCount) {
          if (i === 2) {
            setI(i + 1);
            handleNextPlayer(i);
            handleLowRoll([newD2, newD1]);
          } else {
            setI(i + 1);
            setCurrentAttemptCount(currentAttemptCount + 1);
          }
        } else {
          if (i < totalAttemptCount) {
            if (i === totalAttemptCount - 1) {
              setI(i + 1);
              handleNextPlayer(i);
              handleLowRoll([newD2, newD1]);
            } else {
              setI(i + 1);
              setCurrentAttemptCount(currentAttemptCount + 1);
            }
          }
        }
      } else {
        if (!totalAttemptCount) {
          if (i === 2) {
            setI(i + 1);
            handleNextPlayer(i);
            handleLowRoll([newD1, newD2]);
          } else {
            setI(i + 1);
            setCurrentAttemptCount(currentAttemptCount + 1);
          }
        } else {
          if (i < totalAttemptCount) {
            if (i === totalAttemptCount - 1) {
              setI(i + 1);
              handleNextPlayer(i);
              handleLowRoll([newD1, newD2]);
            } else {
              setI(i + 1);
              setCurrentAttemptCount(currentAttemptCount + 1);
            }
          }
        }
      }
      setRolling(false);
    }, 1500);
  }

  function handlePass() {
    console.log(D1, D2);
    if (!totalAttemptCount) {
      setTotalAttemptCount(i);
    }
    handleNextPlayer(i);

    if (D2 > D1) {
      handleLowRoll([D2, D1]);
    } else {
      handleLowRoll([D1, D2]);
    }
  }

  function handleNextPlayer(i) {
    if (currentAttemptCount === 2 && !totalAttemptCount) {
      setTotalAttemptCount(i + 1);
    }
    setI(0);
    setCurrentAttemptCount(0);
    if (currentPlayerIndex < playerList.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      //FINISH
      setCurrentPlayerIndex(currentPlayerIndex + 1);

      setTimeout(() => {
        document.getElementById("over-mask").classList.add("active");
      }, 1200);
    }
  }

  function handleRemovePlayer(player) {
    const newArray = playerList.filter((item) => item !== player);
    setPlayerList(newArray);
  }

  function newLowRoll(newRoll) {
    console.log(newRoll);
    setGringo(playerList[currentPlayerIndex]);
    setLowRoll(newRoll);
  }

  function handleLowRoll(newRoll) {
    if (!lowRoll) {
      newLowRoll(newRoll);
      return;
    }
    if (newRoll[0] === 2 && newRoll[1] === 1) {
      handleMexico();
      return;
    }

    if (lowRoll[0] === 2 && lowRoll[1] === 1) {
      handleMexico();
      newLowRoll(newRoll);
      return;
    }

    if (newRoll[0] <= lowRoll[0]) {
      if (newRoll[0] === newRoll[1]) {
        if (lowRoll[0] !== lowRoll[1]) {
          handleSafeRoll();
          return;
        } else {
          if (newRoll[1] > lowRoll[1]) {
            handleSafeRoll();
            return;
          }
          handleGringoRoll();
          newLowRoll(newRoll);
          return;
        }
      }
      if (newRoll[0] === lowRoll[0] && newRoll[1] > lowRoll[1]) {
        handleSafeRoll();
        return;
      }
      handleGringoRoll();
      newLowRoll(newRoll);
      return;
    } else {
      if (lowRoll[0] === lowRoll[1]) {
        if (newRoll[0] === newRoll[1]) {
          handleSafeRoll();
          return;
        } else {
          handleGringoRoll();
          newLowRoll(newRoll);
          return;
        }
      }
      handleSafeRoll();
      return;
    }
  }

  function handleMexico() {
    setTequilaCount(tequilaCount * 2);
    document.getElementById("mexico-mask").classList.add("active");

    setTimeout(() => {
      document.getElementById("mexico-mask").classList.remove("active");
    }, 1800);
  }

  function handleSafeRoll() {
    document.getElementById("safe-mask").classList.add("active");

    setTimeout(() => {
      document.getElementById("safe-mask").classList.remove("active");
    }, 600);
  }

  function handleGringoRoll() {
    document.getElementById("gringo-mask").classList.add("active");

    setTimeout(() => {
      document.getElementById("gringo-mask").classList.remove("active");
    }, 600);
  }

  useEffect(() => {
    console.log("changed?: ", lowRoll);
  }, [lowRoll]);

  console.log(totalAttemptCount);

  return (
    <div className="App">
      <div id="mexico-mask" className="game-mask">
        <h1>MEXICO!</h1>
        <p>
          <b>Tequila:</b> x<span id="tequila-count-mask">{tequilaCount}</span>
        </p>
      </div>
      <div id="safe-mask" className="game-mask">
        <h1>Seguro!</h1>
      </div>
      <div id="gringo-mask" className="game-mask">
        <h1>GRINGO!</h1>
      </div>
      <div id="over-mask" className="game-mask">
        <h1>
          TEQUILA X<span id="end-tequila-count">{tequilaCount}</span>
        </h1>
        <p id="game-loser">{gringo}</p>
        <div
          style={
            !!lowRoll && lowRoll[1] > lowRoll[0]
              ? { flexDirection: "row-reverse" }
              : { flexDirection: "row" }
          }
          id="low-dice-box"
          draggable
        >
          <div className="dice" id="lowd1" ref={lowDice1}>
            {!!lowRoll && (
              <>
                <div
                  className={lowRoll[0] !== 1 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  className={lowRoll[0] > 3 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  style={
                    lowRoll[0] % 2 === 0 ? { width: "50%" } : { width: "100%" }
                  }
                  className={
                    lowRoll[0] % 2 !== 0 || lowRoll[0] === 6
                      ? "dice-dot active"
                      : "dice-dot"
                  }
                ></div>
                <div
                  style={
                    lowRoll[0] % 2 !== 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  className={lowRoll[0] === 6 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  className={lowRoll[0] > 3 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  className={lowRoll[0] !== 1 ? "dice-dot active" : "dice-dot"}
                ></div>
              </>
            )}
          </div>
          <div className="dice" id="lowd2" ref={lowDice2}>
            {!!lowRoll && (
              <>
                <div
                  className={lowRoll[1] !== 1 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  className={lowRoll[1] > 3 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  style={
                    lowRoll[1] % 2 === 0 ? { width: "50%" } : { width: "100%" }
                  }
                  className={
                    lowRoll[1] % 2 !== 0 || lowRoll[1] === 6
                      ? "dice-dot active"
                      : "dice-dot"
                  }
                ></div>
                <div
                  style={
                    lowRoll[1] % 2 !== 0
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  className={lowRoll[1] === 6 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  className={lowRoll[1] > 3 ? "dice-dot active" : "dice-dot"}
                ></div>
                <div
                  className={lowRoll[1] !== 1 ? "dice-dot active" : "dice-dot"}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="game-container">
        <div className="game">
          <p id="current-player-name"><b>Rolling: </b>{playerList[currentPlayerIndex]}</p>
          <div className="game-header">
            <p>
              <b>NEXT:</b>{" "}
              <span id="next-player-name">
                {playerList[currentPlayerIndex + 1]}
              </span>
            </p>
            <p>
              <b>Attempts:</b> (
              <span id="attempt-count">{currentAttemptCount}</span>/
              <span id="total-attempt-count">
                {!totalAttemptCount ? "X" : totalAttemptCount}
              </span>
              )
            </p>
            <p>
              <b>Tequila:</b> x<span id="tequila-count">{tequilaCount}</span>
            </p>
            <div className="low-roll">
              <p>
                <b>Gringo ROll:</b>
              </p>
              <p id="low-roll-player">{gringo}</p>
              <div
                style={
                  !!lowRoll && lowRoll[1] > lowRoll[0]
                    ? { flexDirection: "row-reverse" }
                    : { flexDirection: "row" }
                }
                id="low-dice-box"
                draggable
              >
                <div className="dice" id="lowd1" ref={lowDice1}>
                  {!!lowRoll && (
                    <>
                      <div
                        className={
                          lowRoll[0] !== 1 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        className={
                          lowRoll[0] > 3 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        style={
                          lowRoll[0] % 2 === 0
                            ? { width: "50%" }
                            : { width: "100%" }
                        }
                        className={
                          lowRoll[0] % 2 !== 0 || lowRoll[0] === 6
                            ? "dice-dot active"
                            : "dice-dot"
                        }
                      ></div>
                      <div
                        style={
                          lowRoll[0] % 2 !== 0
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        className={
                          lowRoll[0] === 6 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        className={
                          lowRoll[0] > 3 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        className={
                          lowRoll[0] !== 1 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                    </>
                  )}
                </div>
                <div className="dice" id="lowd2" ref={lowDice2}>
                  {!!lowRoll && (
                    <>
                      <div
                        className={
                          lowRoll[1] !== 1 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        className={
                          lowRoll[1] > 3 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        style={
                          lowRoll[1] % 2 === 0
                            ? { width: "50%" }
                            : { width: "100%" }
                        }
                        className={
                          lowRoll[1] % 2 !== 0 || lowRoll[1] === 6
                            ? "dice-dot active"
                            : "dice-dot"
                        }
                      ></div>
                      <div
                        style={
                          lowRoll[1] % 2 !== 0
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        className={
                          lowRoll[1] === 6 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        className={
                          lowRoll[1] > 3 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                      <div
                        className={
                          lowRoll[1] !== 1 ? "dice-dot active" : "dice-dot"
                        }
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            ref={diceBox}
            id="dice-box"
            style={
              D2 > D1
                ? { flexDirection: "row-reverse" }
                : { flexDirection: "row" }
            }
            draggable
          >
            <div
              className={rolling ? "dice rolling" : "dice"}
              id="d1"
              ref={Dice1}
            >
              <div className={D1 !== 1 ? "dice-dot active" : "dice-dot"}></div>
              <div className={D1 > 3 ? "dice-dot active" : "dice-dot"}></div>
              <div
                style={D1 % 2 === 0 ? { width: "50%" } : { width: "100%" }}
                className={
                  D1 % 2 !== 0 || D1 === 6 ? "dice-dot active" : "dice-dot"
                }
              ></div>
              <div
                style={
                  D1 % 2 !== 0 ? { display: "none" } : { display: "block" }
                }
                className={D1 === 6 ? "dice-dot active" : "dice-dot"}
              ></div>
              <div className={D1 > 3 ? "dice-dot active" : "dice-dot"}></div>
              <div className={D1 !== 1 ? "dice-dot active" : "dice-dot"}></div>
            </div>
            <div
              className={rolling ? "dice rolling" : "dice"}
              id="d2"
              ref={Dice2}
            >
              <div className={D2 !== 1 ? "dice-dot active" : "dice-dot"}></div>
              <div className={D2 > 3 ? "dice-dot active" : "dice-dot"}></div>
              <div
                style={D2 % 2 === 0 ? { width: "50%" } : { width: "100%" }}
                className={
                  D2 % 2 !== 0 || D2 === 6 ? "dice-dot active" : "dice-dot"
                }
              ></div>
              <div
                style={
                  D2 % 2 !== 0 ? { display: "none" } : { display: "block" }
                }
                className={D2 === 6 ? "dice-dot active" : "dice-dot"}
              ></div>
              <div className={D2 > 3 ? "dice-dot active" : "dice-dot"}></div>
              <div className={D2 !== 1 ? "dice-dot active" : "dice-dot"}></div>
            </div>
          </div>
          <button
            disabled={playerList.length > 0 ? false : true}
            id="trigger"
            ref={trigger}
            onClick={handleRoll}
          >
            Roll
          </button>
          <button
            className="pass"
            id="pass-trigger"
            onClick={handlePass}
            disabled={currentAttemptCount > 0 ? false : true}
          >
            Pass
          </button>
        </div>
      </div>

      <div
        id="players-trigger"
        ref={playersTrigger}
        onClick={playersTriggerClick}
        className="trigger-open"
      >
        <div className="patty"></div>
      </div>

      <div id="players-view" ref={playersView} className="players-view open">
        <div className="view-container">
          <h1>Players</h1>

          <div className="input-container">
            <form onSubmit={(e) => playerFormSubmit(e)} id="player-form">
              <input id="player-input" ref={playerInput} type="text" />
              <button type="submit" id="player-add-trigger">
                Add
              </button>
            </form>
          </div>
          <div className="list-container">
            <div id="player-list" ref={playerListEl} className="player-list">
              {playerList.map((player, index) => (
                <div
                  key={index}
                  id={`player-item-${index}`}
                  className="player-item"
                >
                  <p data-index={`${index + 1}`}>{player}</p>
                  <button
                    className="player-remove-trigger"
                    onClick={() => handleRemovePlayer(player)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
