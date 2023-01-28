const roundCountdownElement = document.getElementById("round-countdown-timer");
const breakCountdownElement = document.getElementById("break");
const roundNumberElement = document.getElementById("round-number");
const startButtonElement = document.getElementById("start-button");

const countdowns = {
  blind: {
    initial: 30 * 60,
    current: 30 * 60,
    interval: 4,
  },
  break: {
    initial: 30 * 60,
    current: 30 * 60,
    interval: 0,
  },
  elapsed: {
    current: 0,
  },
};

const BLINDS = [
  "50/100",
  "100/200",
  "150/300",
  "200/400",
  "300/600",
  "400/800",
  "500/1K",
  "600/1200",
  "800/1600",
  "1K/2K",
  "1500/3K",
  "2K/4K",
  "3K/6K",
  "4K/8K",
  "5K/10K",
  "6K/12K",
  "8K/16K",
  "10K/20K",
  "12K/24K",
  "15K/30K",
  "20K/40K",
  "25K/50K",
  "30K/60K",
  "40K/80K",
  "50K/100K",
];

function countdown(label, element, callback) {
  let hours = Math.floor(countdowns[label].current / 1200);
  let minutes = Math.floor(countdowns[label].current / 60);
  let secondes = Math.floor(countdowns[label].current % 60);

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  secondes = secondes < 10 ? `0${secondes}` : secondes;
  element.innerText = `${hours}:${minutes}:${secondes}`;

  if (countdowns[label].current <= 0) {
    countdowns[label].current = countdowns[label].initial;
    return callback?.();
  }

  countdowns[label].current--;
}

function timeElapsed() {
  const timeElapsedElement = document.getElementById("time-elapsed");
  let minutes = Math.floor(countdowns.elapsed.current / 60);
  let secondes = Math.floor(countdowns.elapsed.current % 60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  secondes = secondes < 10 ? `0${secondes}` : secondes;
  timeElapsedElement.innerText = `${minutes}:${secondes}`;

  countdowns.elapsed.current++;
}

function onRoundChange() {
  const roundNumber = +roundNumberElement.textContent + 1;
  roundNumberElement.textContent = roundNumber;

  if (typeof BLINDS[roundNumber - 1] !== "undefined") {
    const blindValueElement = document.querySelector(".blinds-value");
    blindValueElement.textContent = BLINDS[roundNumber - 1];

    const nextBlindValueElement = document.querySelector(".next-blind-value");
    nextBlindValueElement.textContent = BLINDS[roundNumber];

    if (typeof BLINDS[roundNumber] === "undefined")
      document.getElementById("nextblind").remove();
  }

  clearInterval(countdowns.blind.interval);
  setTimeout(() => {
    countdowns.blind.interval = setInterval(onRoundStart, 1000);
  }, 4000);
}

function onRoundStart() {
  return countdown("blind", roundCountdownElement, onRoundChange);
}

function startTimers() {
  countdowns.blind.interval = setInterval(onRoundStart, 1000);

  countdowns.break.interval = setInterval(
    () => countdown("break", breakCountdownElement, () => {}),
    1000
  );
}

let isStarted = false;
let timeElapsedStarted = false;
startButtonElement.addEventListener("click", () => {
  if (!isStarted) {
    startTimers();
    isStarted = true;
    startButtonElement.textContent = "Pause";
    if (!timeElapsedStarted) {
      setInterval(timeElapsed, 1000);
      timeElapsedStarted = true;
    }
    return;
  }

  clearInterval(countdowns.blind.interval);
  clearInterval(countdowns.break.interval);
  isStarted = false;
  startButtonElement.textContent = "Démarrer";
});

const currentTimeElement = document.getElementById("current-time");
setInterval(() => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);

const settingsMenuDialogElement = document.querySelector("dialog#menu");

const menuButtonElement = document.querySelector(".menu-toggle");
menuButtonElement.addEventListener("click", () =>
  settingsMenuDialogElement.showModal()
);

const dialogClosingElement = document.querySelector(".cross");
dialogClosingElement.addEventListener("click", () =>
  settingsMenuDialogElement.close()
);

const tableElements = document.querySelectorAll(".table-container");

for (const tableElement of tableElements) {
  const tableNumber = tableElement.getAttribute("data-table-number");
  tableElement.addEventListener("click", (e) => e.currentTarget.remove());

  const chairElements = Array.from(tableElement.querySelectorAll(".chair"));

  for (let i = 0; i < chairElements.length; i++) {
    chairElements[i].addEventListener("click", (e) => {
      e.stopPropagation();
      const player = e.currentTarget.querySelector(".player");
      console.log("test");
      if (player) {
        const removePlayer = confirm("Voulez vous supprimer ce joueur ?");

        if (removePlayer) {
          player.remove();

          const table = document.querySelector(
            `[data-table-number='${tableNumber}']`
          );
          console.log("table:", table);
          const remainingPlayers = table.querySelectorAll(".player");

          if (remainingPlayers.length < 6) {
            const remainingTables = document.querySelectorAll(
              `.table-container:not([data-table-number='${tableNumber}'])`
            );

            if (remainingTables.length <= 1) return;

            for (let i = 0; i < remainingTables; i++) {
              const currentRemainingTable = remainingTables[i];
              console.log(currentRemainingTable);
              const emptyChairs = Array.from(
                currentRemainingTable.querySelectorAll(".chair")
              ).filter((element) => !element.children.length);

              if (emptyChairs.length > remainingPlayers.length) {
                for (let i = 0; i < emptyChairs.length; i++) {
                  const remainingPlayer = remainingPlayers[i];

                  if (!remainingPlayer) return table.remove();

                  emptyChairs[i].append(remainingPlayer);
                }

                return;
              }
            }
          }
        }

        return;
      }
      const name = prompt("Nom du joueur");
      const playerElement = document.createElement("div");
      playerElement.className = "player";
      playerElement.textContent = name;

      e.currentTarget.appendChild(playerElement);
    });
  }
}

const addTableBtn = document.getElementById("add-table");
const deleteTableBtn = document.getElementById("delete-table");

addTableBtn.addEventListener("click", (e) => {
  const tableTemplateElement = document.getElementById("table-template");
  const templateContent = tableTemplateElement.cloneNode(true).content;

  document.getElementById("delete-table").onclick = function deleteTable(
    tablesContainer
  ) {
    document.getElementById("table-template").remove();
  };

  let tablesContainer = document.querySelector(".tables-container");
  const tableNumber =
    tablesContainer.querySelectorAll(".table-container").length + 1;

  tablesContainer.appendChild(templateContent);

  tablesContainer = document.querySelector(".tables-container");
  const lastAddedTable = Array.from(
    tablesContainer.querySelectorAll(".table-container")
  ).at(-1);

  lastAddedTable.setAttribute("data-table-number", tableNumber);

  lastAddedTable.addEventListener("click", (e) => e.currentTarget.remove());

  const chairElements = Array.from(lastAddedTable.querySelectorAll(".chair"));

  for (let i = 0; i < chairElements.length; i++) {
    chairElements[i].addEventListener("click", (e) => {
      e.stopPropagation();
      const player = e.currentTarget.querySelector(".player");

      if (player) {
        const removePlayer = confirm("Voulez vous supprimer ce joueur ?");

        if (removePlayer) {
          player.remove();

          const table = document.querySelector(
            `[data-table-number='${tableNumber}']`
          );

          const remainingPlayers = Array.from(
            table.querySelectorAll(".player")
          ).filter((element) => element !== player);
          console.log(player);
          console.log(remainingPlayers);
          if (remainingPlayers.length < 6) {
            const remainingTables = document.querySelectorAll(
              `.table-container:not([data-table-number='${tableNumber}'])`
            );

            if (remainingTables.length < 1) return;
            console.log(remainingTables);
            for (let i = 0; i < remainingTables.length; i++) {
              const currentRemainingTable = remainingTables[i];
              console.log(currentRemainingTable);
              const emptyChairs = Array.from(
                currentRemainingTable.querySelectorAll(".chair")
              ).filter((element) => !element.children.length);

              if (emptyChairs.length >= remainingPlayers.length) {
                for (let i = 0; i < emptyChairs.length; i++) {
                  const remainingPlayer = remainingPlayers[i];

                  if (!remainingPlayer) return table.remove();

                  emptyChairs[i].append(remainingPlayer);
                }
              }
            }
          }
        }
        return;
      }
      const name = prompt("Nom du joueur");
      const playerElement = document.createElement("div");
      playerElement.className = "player";
      playerElement.textContent = name;

      e.currentTarget.appendChild(playerElement);
    });
  }
});
