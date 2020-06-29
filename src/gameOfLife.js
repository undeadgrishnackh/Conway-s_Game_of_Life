/* eslint-disable no-unused-expressions */
function emptyMatrix(cells) {
  if (cells === null || cells === undefined || cells.length == 0) {
    return [];
  }
  let rows = cells.length;
  let columns = cells[0].length;
  let arr = [];
  // Creates all lines:
  for (let i = 0; i < rows; i++) {
    // Creates an empty line
    arr.push([]);
    // Adds cols to the empty line:
    arr[i].push(new Array(columns));
    for (let j = 0; j < columns; j++) {
      // Initializes:
      arr[i][j] = '';
    }
  }
  return arr;
}

function Universe() {
  this.cells = [
    []
  ];
  this.next = null;

  this.inizialize = (cells) => {
    this.cells = cells;
    this.next = emptyMatrix(cells);
  };

  this.isDeathCell = (row, column) => {
    if (this.cells[row] === undefined || this.cells[row][column] === undefined) {
      return true;
    }
    return this.cells[row][column] === 0;
  };

  this.isAliveCell = (row, column) => {
    if (this.cells[row] === undefined || this.cells[row][column] === undefined) {
      return false;
    }
    return this.cells[row][column] === 1;
  };

  this.lookAround = (row, column) => {
    let resultAlive = 0;
    let resultDeath = 0;
    this.isDeathCell(row - 1, column - 1) ? resultDeath += 1 : resultAlive += 1;
    this.isDeathCell(row - 1, column + 0) ? resultDeath += 1 : resultAlive += 1;
    this.isDeathCell(row - 1, column + 1) ? resultDeath += 1 : resultAlive += 1;
    this.isDeathCell(row + 0, column - 1) ? resultDeath += 1 : resultAlive += 1;
    // the cell itself.
    this.isDeathCell(row + 0, column + 1) ? resultDeath += 1 : resultAlive += 1;
    this.isDeathCell(row + 1, column - 1) ? resultDeath += 1 : resultAlive += 1;
    this.isDeathCell(row + 1, column + 0) ? resultDeath += 1 : resultAlive += 1;
    this.isDeathCell(row + 1, column + 1) ? resultDeath += 1 : resultAlive += 1;

    return {
      alive: resultAlive,
      death: resultDeath
    };
  };

  this.evolveCell = (row, column) => {
    if (this.isAliveCell(row, column)) { // ALIVE
      // underpopulation
      if ((this.lookAround(row, column)).alive < 2) {
        return false;
      }
      // good environment
      if ((this.lookAround(row, column)).alive == 2 ||
        (this.lookAround(row, column)).alive == 3) {
        return true;
      }
      // overcrowding
      if ((this.lookAround(row, column)).alive > 3) {
        return false;
      }
    } else if (this.isDeathCell(row, column)) { // DEATH
      // regenerate
      if ((this.lookAround(row, column)).alive == 3) {
        return true;
      }
    }
    return false;
  };

  this.tick = () => {
    if (this.cells == null) {
      return [
        []
      ];
    }
    for (let row = 0; row < this.cells.length; row++) {
      for (let column = 0; column < this.cells[row].length; column++) {
        this.evolveCell(row, column) ? this.next[row][column] = 1 : this.next[row][column] = 0;
      }
    }
    return this.next;
  };
}

const universe = new Universe();


function nextGen(cells) {
  console.log(cells);
  universe.inizialize(cells);
  universe.tick();
  console.log(universe.next);
  return universe.next;
}

module.exports.universe = universe;
module.exports.nextGen = nextGen;
