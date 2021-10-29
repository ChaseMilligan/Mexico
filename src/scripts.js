//TIES ARE NOT HANDLED!!!

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let D1 = getRandomInt(6) + 1;
let D2 = getRandomInt(6) + 1;
let lowRoll = null;
let playerList = [];
let currentPlayerIndex = 0;
let tequilaCount = 1;
let currentAttemptCount = 0;
let totalAttemptCount;

const trigger = document.getElementById("trigger");
const playersTrigger = document.getElementById("players-trigger");
const playersView = document.getElementById("players-view");
const addPlayerTrigger = document.getElementById("player-add-trigger");
const playerInput = document.getElementById("player-input");
const playerListEl = document.getElementById("player-list");
const playerForm = document.getElementById("player-form");
const Dice1 = document.getElementById("d1");
const Dice2 = document.getElementById("d2");
const lowDice1 = document.getElementById("lowd1");
const lowDice2 = document.getElementById("lowd2");
const diceBox = document.getElementById("dice-box");
let removePlayerTriggers = document.querySelectorAll(".player-remove-trigger");

window.addEventListener("load", () => {
  Dice1.querySelector(".dot1").setAttribute("style", "");
  Dice2.querySelector(".dot1").setAttribute("style", "");
  const dots1 = Dice1.querySelectorAll(`.dot${D1}`);
  const dots2 = Dice2.querySelectorAll(`.dot${D2}`);
  dots1.forEach((el) => {
    el.classList.add("active");
  });
  dots2.forEach((el) => {
    el.classList.add("active");
  });

  if (D2 > D1) {
    diceBox.setAttribute("style", "flex-direction: row-reverse;");
  } else {
    diceBox.setAttribute("style", "flex-direction: row;");
  }

  if (D1 === 6) {
    Dice1.querySelector(".dot1").setAttribute("style", "width: 50%");
  }
  if (D2 === 6) {
    Dice2.querySelector(".dot1").setAttribute("style", "width: 50%");
  }
  document.getElementById("tequila-count").append(tequilaCount);
});

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const currentValue = playerInput.value.toUpperCase();
  playerList.push(currentValue);
  playerListEl.insertAdjacentHTML(
    "beforeend",
    `<div id="player-item-${playerList.length}" class="player-item"><p data-index="${playerList.length}">${currentValue}</p><button data-index="${playerList.length}" class="player-remove-trigger">Delete</button></div>`
  );

  playerInput.value = "";

  document
    .getElementById(`player-item-${playerList.length}`)
    .querySelector(".player-remove-trigger")
    .addEventListener("click", (e) => handleRemovePlayer(e.currentTarget));
  if (
    playerList.length > 1 &&
    !document.getElementById("next-player-name").innerHTML
  ) {
    document
      .getElementById("next-player-name")
      .append(playerList[currentPlayerIndex + 1]);
  }
  if (!document.getElementById("current-player-name").innerHTML) {
    if (!currentPlayerIndex) {
      document
        .getElementById("current-player-name")
        .append(playerList[currentPlayerIndex]);
    } else {
      document
        .getElementById("current-player-name")
        .append(playerList[currentPlayerIndex - 1]);
    }
  }

  if (playerList.length > 0) {
    trigger.disabled = false;
  } else {
    trigger.disabled = true;
  }
});

playersTrigger.addEventListener("click", () => {
  if (playersView.classList.contains("open")) {
    playersView.classList.remove("open");
    playersTrigger.classList.remove("trigger-open");
  } else {
    playersView.classList.add("open");
    playersTrigger.classList.add("trigger-open");
  }
});

let i = 0;
trigger.addEventListener("click", () => {
  Dice1.classList.add("rolling");
  Dice2.classList.add("rolling");
  Dice1.querySelector(".dot1").setAttribute("style", "");
  Dice2.querySelector(".dot1").setAttribute("style", "");
  Dice1.querySelectorAll(`.dot${D1}.active`).forEach((el) =>
    el.classList.remove("active")
  );
  Dice2.querySelectorAll(`.dot${D2}.active`).forEach((el) =>
    el.classList.remove("active")
  );
  D1 = getRandomInt(6) + 1;
  D2 = getRandomInt(6) + 1;

  const dots1 = Dice1.querySelectorAll(`.dot${D1}`);
  const dots2 = Dice2.querySelectorAll(`.dot${D2}`);

  setTimeout(() => {
    Dice1.classList.remove("rolling");
    Dice2.classList.remove("rolling");
    dots1.forEach((el) => {
      el.classList.add("active");
    });
    dots2.forEach((el) => {
      el.classList.add("active");
    });
    if (D2 > D1) {
      diceBox.setAttribute("style", "flex-direction: row-reverse;");
      if (!totalAttemptCount) {
        if (i === 2) {
          i++;
          totalAttemptCount = i;
          document.getElementById("total-attempt-count").innerHTML = "";
          document.getElementById("total-attempt-count").append(i);
          document.getElementById("attempt-count").innerHTML = "";
          document.getElementById("attempt-count").append(0);
          handleNextPlayer(i);
          handleLowRoll([D2, D1]);
        } else {
          i++;
          document.getElementById("attempt-count").innerHTML = "";
          document.getElementById("attempt-count").append(i);
          currentAttemptCount = i;
        }
      } else {
        if (i < totalAttemptCount) {
          if (i === totalAttemptCount - 1) {
            i++;
            document.getElementById("attempt-count").innerHTML = "";
            document.getElementById("attempt-count").append(0);
            handleNextPlayer(i);
            handleLowRoll([D2, D1]);
          } else {
            i++;
            document.getElementById("attempt-count").innerHTML = "";
            document.getElementById("attempt-count").append(i);
            currentAttemptCount = i;
          }
        }
      }
    } else {
      diceBox.setAttribute("style", "flex-direction: row;");
      if (!totalAttemptCount) {
        if (i === 2) {
          i++;
          totalAttemptCount = i;
          document.getElementById("total-attempt-count").innerHTML = "";
          document.getElementById("total-attempt-count").append(i);
          document.getElementById("attempt-count").innerHTML = "";
          document.getElementById("attempt-count").append(0);
          handleNextPlayer(i);
          handleLowRoll([D1, D2]);
        } else {
          i++;
          document.getElementById("attempt-count").innerHTML = "";
          document.getElementById("attempt-count").append(i);
          currentAttemptCount = i;
        }
      } else {
        if (i < totalAttemptCount) {
          if (i === totalAttemptCount - 1) {
            i++;
            document.getElementById("attempt-count").innerHTML = "";
            document.getElementById("attempt-count").append(0);
            handleNextPlayer(i);
            handleLowRoll([D1, D2]);
          } else {
            i++;
            document.getElementById("attempt-count").innerHTML = "";
            document.getElementById("attempt-count").append(i);
            currentAttemptCount = i;
          }
        }
      }
    }

    if (currentAttemptCount > 0) {
      document.getElementById("pass-trigger").disabled = false;
    } else {
      document.getElementById("pass-trigger").disabled = true;
    }

    if (D1 === 6) {
      Dice1.querySelector(".dot1").setAttribute("style", "width: 50%");
    }
    if (D2 === 6) {
      Dice2.querySelector(".dot1").setAttribute("style", "width: 50%");
    }
  }, 1500);
});

document.getElementById("pass-trigger").addEventListener("click", () => {
  if (!totalAttemptCount) {
    if (i === 2) {
      totalAttemptCount = currentAttemptCount;
      document.getElementById("total-attempt-count").innerHTML = "";
      document
        .getElementById("total-attempt-count")
        .append(currentAttemptCount);
    } else {
      document.getElementById("total-attempt-count").innerHTML = "";
      document
        .getElementById("total-attempt-count")
        .append(currentAttemptCount);
    }
  }
  handleNextPlayer(currentAttemptCount);

  if (D2 > D1) {
    handleLowRoll([D2, D1]);
  } else {
    handleLowRoll([D1, D2]);
  }

  if (currentAttemptCount > 0) {
    document.getElementById("pass-trigger").disabled = false;
  } else {
    document.getElementById("pass-trigger").disabled = true;
  }
});

function handleNextPlayer(index) {
  if (!totalAttemptCount) {
    totalAttemptCount = currentAttemptCount;
    document.getElementById("total-attempt-count").innerHTML = "";
    document.getElementById("total-attempt-count").append(index);
  }
  i = 0;
  currentAttemptCount = 0;
  document.getElementById("attempt-count").innerHTML = "";
  document.getElementById("attempt-count").append(currentAttemptCount);
  if (currentPlayerIndex < playerList.length - 1) {
    currentPlayerIndex++;
    document.getElementById("current-player-name").innerHTML = "";
    document
      .getElementById("current-player-name")
      .append(playerList[currentPlayerIndex]);
    document.getElementById("next-player-name").innerHTML = "";
    if (!playerList[currentPlayerIndex + 1]) {
      document.getElementById("next-player-name").append("LAST ROLLER");
      document.getElementById("current-player-name").innerHTML = "";
      document
        .getElementById("current-player-name")
        .append(playerList[playerList.length - 1]);
    } else {
      document
        .getElementById("next-player-name")
        .append(playerList[currentPlayerIndex + 1]);
    }
  } else {
    //FINISH
    currentPlayerIndex++;

    setTimeout(() => {
      const gameLoser = document.getElementById("low-roll-player").innerHTML;
      console.log(tequilaCount);
      document.getElementById("end-tequila-count").append(tequilaCount);
      document.getElementById("over-mask").classList.add("active");
      document.getElementById("game-loser").append(gameLoser);
    }, 1200);
  }
}

function handleRemovePlayer(el) {
  const deleteIndex = el.getAttribute("data-index");
  const deleteItem = document.getElementById(`player-item-${deleteIndex}`);
  if (!deleteItem) {
    return;
  }
  deleteItem.remove();
  playerList.splice(deleteIndex - 1, 1);
  playerListEl.innerHTML = "";
  playerList.map((player, index) => {
    playerListEl.insertAdjacentHTML(
      "beforeend",
      `<div id="player-item-${index + 1}" class="player-item"><p data-index="${
        index + 1
      }">${player}</p><button  data-index="${
        index + 1
      }" class="player-remove-trigger">Delete</button></div>`
    );
    document
      .getElementById(`player-item-${index + 1}`)
      .querySelector(".player-remove-trigger")
      .addEventListener("click", (e) => handleRemovePlayer(e.currentTarget));
  });

  if (playerList.length > 0) {
    trigger.disabled = false;
  } else {
    trigger.disabled = true;
  }
}

function newLowRoll(newRoll) {
  lowDice1
    .querySelectorAll(`.active`)
    .forEach((el) => el.classList.remove("active"));
  lowDice2
    .querySelectorAll(`.active`)
    .forEach((el) => el.classList.remove("active"));
  lowDice1.querySelector(".dot1").setAttribute("style", "");
  lowDice2.querySelector(".dot1").setAttribute("style", "");
  const dots1 = lowDice1.querySelectorAll(`.dot${newRoll[0]}`);
  const dots2 = lowDice2.querySelectorAll(`.dot${newRoll[1]}`);

  document.getElementById("low-roll-player").innerHTML = "";
  document
    .getElementById("low-roll-player")
    .append(playerList[currentPlayerIndex - 1]);

  lowRoll = newRoll;

  dots1.forEach((el) => {
    el.classList.add("active");
  });
  dots2.forEach((el) => {
    el.classList.add("active");
  });

  if (newRoll[0] === 6) {
    lowDice1.querySelector(".dot1").setAttribute("style", "width: 50%");
  }
  if (newRoll[1] === 6) {
    lowDice2.querySelector(".dot1").setAttribute("style", "width: 50%");
  }
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
  tequilaCount = tequilaCount * 2;
  document.getElementById("mexico-mask").classList.add("active");
  document.getElementById("tequila-count").innerHTML = "";
  document.getElementById("tequila-count").append(tequilaCount);
  document.getElementById("tequila-count-mask").innerHTML = "";
  document.getElementById("tequila-count-mask").append(tequilaCount);

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
