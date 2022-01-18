////////////////////Constructors/////////////////////

//////////Functionnalities missing

//2  Difficulty button (Easy / Hard)
//3  Horizontal display
//4  Cannot click on player's button
//5  Drag and Drop (Need to be in the box)

const matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const battleshipTroops = [
  {
    name: "Porte-avion",
    size: 5,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "player",
  },
  {
    name: "Croiseur",
    size: 4,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "player",
  },
  {
    name: "Sous-marin",
    size: 3,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "player",
  },
  {
    name: "Torpilleur",
    size: 2,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "player",
  },
];

const battleshipTroopsComputer = [
  {
    name: "Porte-avion",
    size: 5,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "computer",
  },
  {
    name: "Croiseur",
    size: 4,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "computer",
  },
  {
    name: "Sous-marin",
    size: 3,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "computer",
  },
  {
    name: "Torpilleur",
    size: 2,
    caseDiscovered: 0,
    discovered: false,
    position: "horizontal",
    ready: false,
    player: "computer",
  },
];

////////////////////Display Matrix/////////////////////

const application = document.querySelector("#app");

function renderItem(item, x = 0, y = 0) {
  return `<div data-value="${item}" data-coordx=${x} data-coordy=${x} class="item grid" onclick = "${(
    e
  ) => this.onClick}"><span>${item === 0 ? "" : "X"}</span></div>`;
}
//

function renderRow(row) {
  return `<div class="row">
    ${row.map((item) => renderItem(item)).join("")}
    </div>`;
}

function render(matrix) {
  return `<div class="container--app">
      ${matrix.map((row) => renderRow(row)).join("")}
    </div>`;
}

function addCoordXY() {
  const rows = Array.from(document.querySelectorAll(".row"));
  for (let i = 0; i < rows.length; i++) {
    const items = Array.from(rows[i].querySelectorAll(".item"));
    for (let j = 0; j < items.length; j++) {
      items[j].dataset.coordy = j + 1;
      items[j].dataset.coordx = i + 1;
    }
  }
}

//Function to Update matrix on Screen
function displayMatrix(mt) {
  application.innerHTML = render(mt);
  addCoordXY();
}
displayMatrix(matrix);

/////////////////Construct Matrix////////////////////

//Selectors
const listOfTroops = Array.from(document.querySelectorAll(".container__ships"));
const itemsTroops = Array.from(document.querySelectorAll(".troops"));
const itemsCells = Array.from(document.querySelectorAll(".item[data-value]"));

//Return the name of the Ship dragged
let shipDragged = "";

//Add drag event listener for troops
listOfTroops.forEach((ship) => {
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("dragend", dragEnd);
});

function dragStart() {
  console.log(this);
  console.log(this.style.color);
  shipDragged = this.dataset.shipname;
}
function dragEnd() {}

//Position selected ship on the Matrix
itemsCells.forEach((item) => {
  item.addEventListener("dragover", dragOver);
  item.addEventListener("dragenter", dragEnter);
  item.addEventListener("dragleave ", dragLeave);
  item.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave(e) {
  e.preventDefault();
}

function dragDrop(e) {
  const [ship] = battleshipTroops.filter((ship) => ship.name === shipDragged);
  x = Number(this.dataset.coordx);
  y = Number(this.dataset.coordy);
  const shipSize = Number(ship.size);

  //Update matrix
  for (let i = y; i < y + shipSize; i++) {
    matrix[x - 1][i - 1] = shipSize;
  }

  // for (let i = y; i < y + shipSize; i++) {
  //   matrixPlayer[x - 1][i - 1] = shipSize;
  // }

  // span = document.createElement("span");
  // span.textContent = ship.size;

  //Update Grid displayed
  const cellsToFill = itemsCells.filter(
    (item) =>
      item.dataset.coordx == x &&
      item.dataset.coordy >= y &&
      item.dataset.coordy < y + shipSize
  );

  for (const cell of cellsToFill) {
    cell.dataset.value = shipSize;
    cell.style.backgroundColor = "rgba(236, 166, 66, 0.9)";
    cell.dataset.player = "player";
  }

  const [shipRemove] = listOfTroops.filter(
    (s) => s.dataset.shipname === ship.name
  );
  shipRemove.style.visibility = "hidden";
  ship.ready = true;
}

/////////////////Start Game////////////////////

//Selectors
const btnStart = document.querySelector(".btn-play");
const btnStartDiv = document.querySelector(".button.startgame");
const rows = Array.from(document.querySelectorAll(".row"));
const els = Array.from(document.querySelectorAll(".item[data-value]"));
const playerBox = document.querySelector(".troops.player");
const computerBox = document.querySelector(".troops.computer");
const containerPlayer = document.querySelector(".container__player");
const shipsToDisplay = Array.from(
  document.querySelectorAll(".container__ships")
);
const containerShipsToDisplay = document.querySelector(
  ".battleship__global__troops"
);
const loader = document.querySelector(".loader");
const legendShips = Array.from(document.querySelectorAll("li"));
const victoryContainer = document.querySelector(".victory-container");
const looseContainer = document.querySelector(".loose-container");
const body = document.querySelector("body");
const switchDifficulty = document.querySelector(".checkbox");
const difficultyStatus = document.querySelector(".difficulty");
const btnRotate = document.querySelector(".btn-rotate");
const btnReset = document.querySelector(".btn-reset");

let hardmode = false;
switchDifficulty.addEventListener("click", function () {
  console.log(hardmode);
  if (!hardmode) {
    difficultyStatus.textContent = "ON";
    difficultyStatus.style.color = "red";
    hardmode = true;
  } else if (hardmode) {
    difficultyStatus.textContent = "OFF";
    difficultyStatus.style.color = "white";
    hardmode = false;
  }
});

btnReset.addEventListener("click", reset);
function reset() {
  containerPlayer.style.visibility = "visible";
  btnStartDiv.style.display = "block";
  //Reset troops to display
  listOfTroops.forEach((troop) => (troop.style.visibility = "visible"));
  itemsCells.forEach((cell) => {
    cell.style.backgroundColor = "rgba(92, 90, 88, 0.7)";
    cell.dataset.player = "none";
    cell.dataset.value = 0;
  });
  //Clear computer and player troops
  playerBox.style.visibility = "hidden";
  computerBox.style.visibility = "hidden";
  //Reset available troops of computer and player
  battleshipTroops.map((troop) => {
    troop.caseDiscovered = 0;
    troop.discovered = false;
    troop.ready = false;
  });
  battleshipTroopsComputer.map((troop) => {
    troop.caseDiscovered = 0;
    troop.discovered = false;
    troop.ready = false;
  });
}

btnRotate.addEventListener("click", rotate);
function rotate() {
  shipsToDisplay.forEach((ship) => {
    ship.classList.toggle("horizontal");
    ship.classList.toggle("vertical");
  });
  containerShipsToDisplay.classList.toggle("horizontal");
  containerShipsToDisplay.classList.toggle("vertical");
}

btnStart.addEventListener("click", startGame);
//Function to check empty rows
function rowEmpty(row) {
  if (row.every((el) => !el)) return true;
}

//Function to randomly insert ships on Grid
function displayComputerShips() {
  //Create an array with index of rows with no values
  let i = 0;
  let emptyRows = [];
  matrix.forEach((row) => {
    if (rowEmpty(row)) emptyRows.push(i);
    i++;
  });

  for (let boatSize = 2; boatSize <= 5; boatSize++) {
    let randomY = Math.trunc(Math.random() * boatSize); //Generate a random number between 0 and BoatSize
    let randomNum = Math.trunc(Math.random() * emptyRows.length);
    let randomX = emptyRows[randomNum];
    emptyRows.splice(emptyRows.indexOf(randomX), 1); //Remove selected row from empty rows

    for (let y = randomY; y < randomY + boatSize; y++) {
      //Update matrix values
      matrix[randomX][y] = boatSize;
      const elements = els.filter(
        (el) => el.dataset.coordx == randomX + 1 && el.dataset.coordy == y + 1
      );
      elements.forEach((el) => {
        //el.innerHTML = `<span>${boatSize}</span>`;
        el.dataset.value = boatSize;
        el.dataset.player = "computer";
      });
    }

    [shipComputer] = battleshipTroopsComputer.filter(
      //Update troop of computer with coordinates
      (ship) => ship.size === boatSize
    );
    shipComputer.coordx = randomX;
    shipComputer.coordy = randomY;
  }
}

//Hide items on grid
function hideItems() {
  const items = Array.from(application.querySelectorAll(".item"));
  items.forEach((item) => {
    let [span] = item.childNodes;
    if (span.textContent) {
      item.dataset.value = span.textContent;
      span.textContent = "";
    }
  });
}

//Check if all Ships are positionned before party starts
function checkShipsPositionned() {
  if (battleshipTroops.some((ship) => ship.ready === false)) {
    alert("You need to position the ships");
    return false;
  }

  if (battleshipTroops.every((ship) => ship.ready === true)) {
    alert("Batthleship will begin");
    cleanInterface();
    return true;
  }
}

function swapPlayersTurn() {
  playerBox.classList.toggle("playing");
  computerBox.classList.toggle("playing");
}

function shipsUpdate(arrTroops, el) {
  const cellsApp = Array.from(
    application.querySelectorAll(".item[data-value]")
  );
  let cellsTargeted = cellsApp.filter(
    (cell) =>
      cell.dataset.value === el.dataset.value &&
      cell.dataset.player === el.dataset.player
  );

  arrTroops
    .filter((ship) => ship.size == el.dataset.value)
    .map((ship) => {
      ship.caseDiscovered++;
      ship.caseDiscovered < ship.size
        ? (ship.discovered = false)
        : (ship.discovered = true);
      if (ship.discovered) {
        const [shipDelete] = legendShips.filter(
          (li) =>
            li.dataset.shipname === ship.name &&
            li.dataset.player === ship.player
        );

        shipDelete.style.display = "none";
        cellsTargeted.forEach((cell) => (cell.style.backgroundColor = "black"));
      }
    });
}

function updatebattleshipArr(el) {
  el.dataset.player === "player"
    ? shipsUpdate(battleshipTroops, el)
    : shipsUpdate(battleshipTroopsComputer, el);
}

function revealItem(item) {
  //Remove Effect When pyaer's turn starts
  loader.style.display = "none";
  computerBox.classList.remove("blur-effect");
  playerBox.classList.remove("blur-effect");
  swapPlayersTurn();
  item.dataset.revealed = true;
  //Display units
  if (!item.dataset.player) {
    item.innerHTML = `<span class="span_null" >${item.dataset.value}</span>`;
  }
  if (item.dataset.player === "player") {
    item.innerHTML = `<span class ="span_player">X</span>`;
  }
  if (item.dataset.player === "computer") {
    item.innerHTML = `<span class ="span_computer">X</span>`;
  }
}

// let caseDisplayed = [0, 0];
let caseDisplayed = {
  coordX: 0,
  coordY: 0,
  player: undefined,
};

function updateCaseDisplayed(itemSelected) {
  caseDisplayed.coordX = itemSelected.dataset.coordx;
  caseDisplayed.coordY = itemSelected.dataset.coordy;
  caseDisplayed.player = itemSelected.dataset.player;
}

function revealRandomComputerItem2() {
  const playersGrid = document.querySelector("#playerGrid");
  swapPlayersTurn();
  computerBox.classList.add("blur-effect");
  playerBox.classList.add("blur-effect");
  loader.style.display = "block";
  let itemSelected;

  //If previous case displayed is from player select Adjacent Item and Hard MODE activated
  if (
    caseDisplayed.player === "player" &&
    difficultyStatus.textContent === "ON"
  ) {
    let itemAdjacentCoordY;
    const [itemTargeted] = Array.from(
      application.querySelectorAll(".item")
    ).filter(
      (it) =>
        it.dataset.coordx == caseDisplayed.coordX &&
        it.dataset.coordy == caseDisplayed.coordY
    );

    Number(itemTargeted.dataset.coordx) + 1
      ? (itemAdjacentCoordY = Number(caseDisplayed.coordY) + 1)
      : (itemAdjacentCoordY = Number(caseDisplayed.coordY) - 1);
    console.log(itemAdjacentCoordY);
    [itemSelected] = Array.from(application.querySelectorAll(".item")).filter(
      (it) =>
        it.dataset.coordx == caseDisplayed.coordX &&
        it.dataset.coordy == itemAdjacentCoordY
    );
    updateCaseDisplayed(itemSelected);
  }

  //If previous case displayed is not from player select random Item on grid  and Hard MODE not activated
  else {
    const itemsValid = Array.from(application.querySelectorAll(".item")).filter(
      (it) => it.dataset.player !== "computer" && !it.dataset.revealed
    );
    //Select a random item
    const randomNum = Math.floor(Math.random() * itemsValid.length);
    itemSelected = itemsValid[randomNum];
    updateCaseDisplayed(itemSelected);
  }

  //Update and reveal Item selected by computer on the grid
  setTimeout(function () {
    revealItem(itemSelected);
    updatebattleshipArr(itemSelected);
  }, 1000);
}

function revealRandomComputerItem() {
  //select a random item among Grid(excepted computer's case)
  const playersGrid = document.querySelector("#playerGrid");
  swapPlayersTurn();
  computerBox.classList.add("blur-effect");
  playerBox.classList.add("blur-effect");
  loader.style.display = "block";

  const itemsValid = Array.from(application.querySelectorAll(".item")).filter(
    (it) => it.dataset.player !== "computer" && !it.dataset.revealed
  );
  //Select a random item
  const randomNum = Math.floor(Math.random() * itemsValid.length);
  let itemSelected = itemsValid[randomNum];
  setTimeout(function () {
    revealItem(itemSelected);
    updatebattleshipArr(itemSelected);
  }, 1000);
}

function checkWinner() {
  // //Check if all ships have been revealed
  if (battleshipTroops.every((ship) => ship.discovered === true)) {
    looseContainer.style.display = "block";
    application.classList.add("blur-effect");
    playerBox.style.visibility = "hidden";
    computerBox.style.visibility = "hidden";
  }

  if (battleshipTroopsComputer.every((ship) => ship.discovered === true)) {
    victoryContainer.style.display = "block";
    application.classList.add("blur-effect");
    playerBox.style.visibility = "hidden";
    computerBox.style.visibility = "hidden";
  }
}

function revealItemCliked() {
  els.forEach((el) =>
    el.addEventListener("click", function () {
      revealItem(el);
      revealRandomComputerItem2();
      swapPlayersTurn();
      updatebattleshipArr(el);
      checkWinner();
    })
  );
}

function duplicateGrid() {
  templateDiv = `<div class="container application player" id="playerGrid">${render(
    matrixPlayer
  )}</div>`;
  application.insertAdjacentHTML("beforebegin", templateDiv);
}

function cleanInterface() {
  containerPlayer.style.visibility = "hidden";
  btnStartDiv.style.display = "none";
  playerBox.style.visibility = "visible";
  computerBox.style.visibility = "visible";
}

function startGame() {
  const statusGame = checkShipsPositionned();
  if (statusGame) {
    displayComputerShips();
    hideItems();
    revealItemCliked();
    cleanInterface();
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////Application/////////////////////

const Battleships = class {
  constructor(matrix) {
    this.el = application;
    this.matrix = matrix;
    this.battleshipTroops = battleshipTroops;
    this.troopstoDisplay = troopstoDisplay;
    this.items = Array.from(document.querySelectorAll(".item[data-value]"));
    this.shipClicked = "";
    this.run();
  }

  renderItem(item, x = 0, y = 0) {
    return `<div data-value="${item}" data-coordx=${x} data-coordy=${x} class="item grid" onclick = "${(
      e
    ) => this.onClick}"><span>${item}<span></div>`;
  }

  renderRow(row) {
    return `<div class="row">
    ${row.map((item) => this.renderItem(item)).join("")}
    </div>`;
  }

  render() {
    return `<div class="container--app">
      ${this.matrix.map((row) => this.renderRow(row)).join("")}
    </div>`;
  }

  addCoordXY() {
    const rows = Array.from(document.querySelectorAll(".row"));

    for (let i = 0; i < rows.length; i++) {
      const items = Array.from(rows[i].querySelectorAll(".item"));
      for (let j = 0; j < items.length; j++) {
        items[j].dataset.coordy = j + 1;
        items[j].dataset.coordx = i + 1;
      }
    }
    return this;
  }

  addClickEvent() {
    const els = Array.from(document.querySelectorAll(".item[data-value]"));
    //console.log(els);
    els.forEach((el) =>
      el.addEventListener("click", function () {
        //Reveal value from grid
        const valueRevealed = Number(this.dataset.value);
        const span = document.createElement("span");
        if (this.innerHTML) return;
        span.innerHTML = valueRevealed;
        this.append(span);

        //Add case discovered to battleShipTroops and check if all case oh ship is revelead
        battleshipTroops
          .filter((ship) => ship.size === valueRevealed)
          .map((ship) => {
            ship.caseDiscovered++;
            ship.caseDiscovered < ship.size
              ? (ship.discovered = false)
              : (ship.discovered = true);
          });

        //Check if all ships have been revealed
        if (battleshipTroops.every((ship) => ship.discovered === true))
          console.log("VICTORY");
      })
    );
  }

  returnShipDragged() {
    //Add drag event listener for troops
    troopstoDisplay.forEach((ship) => {
      ship.addEventListener("dragstart", dragStart.bind(this));
      ship.addEventListener("dragend", dragEnd.bind(this));

      function dragStart() {
        this.shipClicked = ship.dataset.ship;
        console.log(this.shipClicked);
      }
      function dragEnd() {}
    });
  }

  returnCoordItemDragleave() {
    // Select all items from Matrix
    this.items = Array.from(document.querySelectorAll(".item[data-value]"));
    console.log(items);
    items.forEach((item) =>
      item.addEventListener("click", clickThis.bind(this))
    );

    // function clickThis() {
    //   console.log(this);
    //   console.log(item);
    // }

    //Drag event for Matrix's items

    // for (let it of itemsGrid) {
    //   it.addEventListener("click", dragEnter.bind(this));
    //   //item.addEventListener("drop", dragDrop);
    // }
    // // itemsGrid.forEach((item) => {
    // //   item.addEventListener("dragover", dragOver);
    // //   item.addEventListener("dragenter", dragEnter.bind(this));
    // //   item.addEventListener("dragleave", dragLeave);
    // //   item.addEventListener("drop", dragDrop.bind(this));
    // // });
    // function dragEnter(e) {
    //   e.preventDefault();
    //   console.log(this);
    //   console.log(it);
    //   //item.classList.add("hovered");
    // }

    // function dragOver(e) {
    //   e.preventDefault();
    // }

    // function dragLeave(e) {
    //   e.preventDefault();
    //   this.classList.remove("hovered");
    // }

    // function dragDrop() {
    //   console.log(item);
    // }

    // function dragDrop(e) {
    //   console.log(this);
    //   e.preventDefault();
    //console.log(this.dataset.coordx, this.dataset.coordy);
    // const gridShip = itemsGrid
    //   .filter((ship) => ship.dataset.coordx === this.dataset.coordx)
    //   .filter(
    //     (ship) =>
    //       ship.dataset.coordy >= this.dataset.coordy &&
    //       ship.dataset.coordy <
    //         Number(shipClicked.size) + Number(this.dataset.coordy)
    //   );

    // gridShip.forEach((grid) => {
    //   matrix[grid.dataset.coordx - 1][grid.dataset.coordy - 1] =
    //     shipClicked.size;
    //   return matrix;
    // });
  }

  run() {
    this.el.innerHTML = this.render();
    this.addClickEvent();
    this.addCoordXY();
    this.testFunction();
    this.returnShipDragged();
    this.returnCoordItemDragleave();
    //this.dragDrop(e);
    //this.el.innerHTML = this.render();
  }
};

//const battleships = new Battleships(matrix);

/////////Initaliszation of Batthleship GRid //////////

// //Event handler
// const battleshipsTroops = Array.from(
//   document.querySelectorAll(".container__ships")
// );
// const itemsGrid = Array.from(document.querySelectorAll(".item[data-value]"));
// const itemsTroops = Array.from(document.querySelectorAll(".troops"));

// //Drag event for ship troops
// battleshipsTroops.forEach((ship) => {
//   ship.addEventListener("dragstart", dragStart);
//   ship.addEventListener("dragend", dragEnd);
// });

// let shipClicked;
// function dragStart(e) {
//   const shipSelected = battleshipTroops.filter(
//     (ship) => ship.name === this.dataset.ship
//   );
//   [shipClicked] = shipSelected;
//   return shipClicked;
// }

// function dragEnd() {}

// //Drag event for items from grid
// itemsGrid.forEach((item) => {
//   item.addEventListener("dragover", dragOver);
//   item.addEventListener("dragenter", dragEnter);
//   item.addEventListener("dragleave", dragLeave);
//   item.addEventListener("drop", dragDrop);
// });

// function dragOver(e) {
//   e.preventDefault();
// }

// function dragEnter(e) {
//   e.preventDefault();
//   this.classList.add("hovered");
// }

// function dragLeave(e) {
//   e.preventDefault();
//   this.classList.remove("hovered");
// }

// function dragDrop(e) {
//   e.preventDefault();
//   const gridShip = itemsGrid
//     .filter((ship) => ship.dataset.coordx === this.dataset.coordx)
//     .filter(
//       (ship) =>
//         ship.dataset.coordy >= this.dataset.coordy &&
//         ship.dataset.coordy <
//           Number(shipClicked.size) + Number(this.dataset.coordy)
//     );
//   console.log(gridShip);
//   console.log(shipClicked);
//   gridShip.forEach((grid) => {
//     console.log(grid.dataset.coordx, grid.dataset.coordy, shipClicked.size);
//     matrix[grid.dataset.coordx - 1][grid.dataset.coordy - 1] = shipClicked.size;
//     return matrix;
//   });
// }

// //Drag Ships
// ship1.addEventListener("dragstart", dragStart);
// ship1.addEventListener("dragend", dragend);

// function dragStart() {
//   console.log("start");
//   this.style.border = "solid 3px black";
// }

// function dragend() {
//   this.style.border = "none";
// }

// itemsGrid.forEach((item) => {
//   item.addEventListener("dragover", dragOver);
//   item.addEventListener("dragenter", dragEnter);
//   item.addEventListener("dragleave", dragLeave);
//   item.addEventListener("drop", dragDrop);
// });

// function dragOver(e) {
//   e.preventDefault();
// }

// function dragEnter(e) {
//   e.preventDefault();
//   this.classList.add("hovered");
// }

// function dragLeave(e) {
//   e.preventDefault();
//   this.classList.remove("hovered");
// }

// function dragDrop(e) {
//   e.preventDefault();
// }

//Create button to rotate ships
// const buttonsRotate = Array.from(document.querySelectorAll(".btn-rotate"));
// const shipsPlacement = Array.from(
//   document.querySelectorAll(".container__ships")
// );
// const ship1 = document.querySelector(".container__ships");
// const itemsGrid = Array.from(document.querySelectorAll(".grid"));

// buttonsRotate.forEach((btn) =>
//   btn.addEventListener("click", function () {
//     let [shipPlacement] = shipsPlacement.filter(
//       (ship) => ship.id === btn.getAttribute("id")
//     );
//     shipPlacement.classList.toggle("rotation");
//   })
// );
