const container = document.querySelector("main");
const playerDiv = document.createElement("div");


const prototypeMap = [
        "  WWWWW ",
        "WWW   W ",
        "WOSB  W ",
        "WWW BOW ",
        "WOWWB W ",
        "W W O WW",
        "WB XBBOW",
        "W   O  W",
        "WWWWWWWW"
      ];

const legend = {
    wall: "W",
    empty: " ",
    start: "S",
    box: "B",
    occupiedStorage: "X",
    emptyStorage: "O",

    "W": "wall",
    " ": "empty",
    "S": "start",
    "B": "box",
    "X": "occupiedStorage",
    "O": "emptyStorage",

};

const map = [];


function movePlayer(rowOffset, columnOffset) {
    const targetRowIndex = Number(playerDiv.parentElement.dataset.rowIndex) + rowOffset
    const targetColumnIndex = Number(playerDiv.parentElement.dataset.columnIndex) + columnOffset

    // if (map.length > targetRowIndex && targetRowIndex >= 0) {
    //     if (map[0].length > targetColumnIndex && targetColumnIndex >= 0) {
    const rowExists = map[targetRowIndex] !== undefined
    const columnExists = map[targetRowIndex][targetColumnIndex] !== undefined

    if (rowExists && columnExists) {
        const targetCell = map[targetRowIndex][targetColumnIndex];
        if (targetCell.dataset.cellType !== "wall") {
            targetCell.appendChild(playerDiv);
        }
        if (targetCell.dataset.cellType === "finish"){
            console.log("winner winner chicken dinner");
        }
    }
}

// const arrowActions = {
//     ArrowDown: () => movePlayer(+1, 0),
//     ArrowUp: () => movePlayer(-1, 0),
//     ArrowRight: () => movePlayer(0, +1),
//     ArrowLeft: () => movePlayer(0, -1),
// }

document.addEventListener('keydown', (event) => {
    console.log("key pressed: " + event.key);

    // arrowActions[event.key]();
    switch (event.key) {
        case "ArrowDown":
            movePlayer(+1, 0);
            break;
        case "ArrowUp":
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
            movePlayer(0, +1);
            break;
        case "ArrowLeft":
            movePlayer(0, -1);
            break;
    }
})

function createMap() {
    playerDiv.id = "player"
    playerDiv.className = "cell"

    for (let rowIndex = 0; rowIndex < prototypeMap.length; rowIndex++) {
        rowDiv = document.createElement("div");
        rowDiv.className = "row";
        container.appendChild(rowDiv);
        map[rowIndex] = [];
        // Give it a classname row
        // Style row class
        for (let columnIndex = 0; columnIndex < prototypeMap[rowIndex].length; columnIndex++) {
            const cellType = prototypeMap[rowIndex][columnIndex];
            const cellDiv = document.createElement("div");
            rowDiv.appendChild(cellDiv);
            map[rowIndex][columnIndex] = cellDiv;
            cellDiv.dataset.rowIndex = rowIndex;
            cellDiv.dataset.columnIndex = columnIndex;
            cellDiv.dataset.cellType = legend[cellType];
            cellDiv.classList.add(legend[cellType]);
            cellDiv.classList.add("cell");

            if (cellType === legend.start) {
                cellDiv.appendChild(playerDiv)
            }
        }
    }
}

createMap();