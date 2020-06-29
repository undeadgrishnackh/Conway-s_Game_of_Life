const { assert } = require('chai');
const {universe} = require('../src/gameOfLife');

describe("Test suite Conway's Game of Life", () => {
  it('Universe is an Array [][]', () => {
    universe.cells[0][0] = ' ';
    assert.equal(universe.cells instanceof Array, true);
    assert.equal(universe.cells[0] instanceof Array, true);
    assert.equal(universe.cells[0][0], ' ');
  });

  it('Is 0 a die cell?', () => {
    const cells = [[0, 1]];
    universe.inizialize(cells);

    assert.equal(universe.isDeathCell(0, 0), true, "Ops this cell isn't death as expected.");
    assert.equal(universe.isDeathCell(0, 1), false, 'Ops this cell is alive but seems death.');
  });

  it('Is 1 an alive cell?', () => {
    const cells = [[0, 1]];
    universe.inizialize(cells);

    assert.equal(universe.isAliveCell(0, 0), false, 'Ops this cell is death but seems alive.');
    assert.equal(universe.isAliveCell(0, 1), true, 'Ops this cell isn\'t alive as expected.');
  });

  it('Is the cell able to look around with 8 death cells? ', () => {
    const cells = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    universe.inizialize(cells);

    assert.equal(JSON.stringify(universe.lookAround(1, 1)), JSON.stringify({ alive: 0, death: 8 }), "ONLY DEATH AROUND - Seems the cell isn't able to look around correctly.");
  });


  it('Is the cell able to look around with 8 alive cells? ', () => {
    const cells = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    universe.inizialize(cells);

    assert.equal(JSON.stringify(universe.lookAround(1, 1)), JSON.stringify({ alive: 8, death: 0 }), "ONLY ALIVE AROUND - Seems the cell isn't able to look around correctly.");
  });

  it('Is the cell able to look around with 8 unsorted cells - 3 die, 5 alive? ', () => {
    const cells = [
      [0, 1, 1],
      [1, 0, 0],
      [0, 1, 1],
    ];
    universe.inizialize(cells);

    assert.equal(JSON.stringify(universe.lookAround(1, 1)), JSON.stringify({ alive: 5, death: 3 }), "ONLY ALIVE AROUND - Seems the cell isn't able to look around correctly.");
  });

  it('Is the cell able to look around with the BLINKER pattern on different POV? ', () => {
    const cells = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    universe.inizialize(cells);

    assert.equal(JSON.stringify(universe.lookAround(1, 0)), JSON.stringify({ alive: 3, death: 5 }), "BLINKER PATTERN - Seems the cell isn't able to look around correctly.");
    assert.equal(JSON.stringify(universe.lookAround(0, 1)), JSON.stringify({ alive: 1, death: 7 }), "BLINKER PATTERN - Seems the cell isn't able to look around correctly.");
    assert.equal(JSON.stringify(universe.lookAround(1, 1)), JSON.stringify({ alive: 2, death: 6 }), "BLINKER PATTERN - Seems the cell isn't able to look around correctly.");
  });

  it('Is the cell able to look around on the edge? ', () => {
    const cells = [
      [0, 0, 1],
      [1, 0, 0],
      [0, 1, 1],
    ];
    universe.inizialize(cells);

    assert.equal(JSON.stringify(universe.lookAround(0, 1)), JSON.stringify({ alive: 2, death: 6 }), "ON THE EDGE - Seems the cell isn't able to look around correctly.");
  });

  it('Is the cell able to look around on the corner? ', () => {
    const cells = [
      [0, 0, 1],
      [1, 0, 0],
      [0, 1, 1],
    ];
    universe.inizialize(cells);

    assert.equal(JSON.stringify(universe.lookAround(0, 0)), JSON.stringify({ alive: 1, death: 7 }), "IN THE CORNER - Seems the cell isn't able to look around correctly.");
  });

  it('Is a live cell with fewer than two live neighbours dies (<2)?', () => {
    const cells = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    universe.inizialize(cells);
    assert.equal(universe.evolveCell(1, 1), false, 'Cell has to die due to under-population');
  });

  it('Is a live cell with two or three live neighbours still living on the next generation (2)?', () => {
    const cells = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    universe.inizialize(cells);
    assert.equal(universe.evolveCell(1, 1), true, 'Cell has to survive!');
  });

  it('Is a live cell with two or three live neighbours still living on the next generation (3)?', () => {
    const cells = [
      [0, 1, 0],
      [0, 1, 0],
      [1, 0, 1],
    ];
    universe.inizialize(cells);
    assert.equal(universe.evolveCell(1, 1), true, 'Cell has to survive!');
  });

  it('Is a live cell with more than three live neighbours dead on the next generation (>3)?', () => {
    const cells = [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 1],
    ];
    universe.inizialize(cells);
    assert.equal(universe.evolveCell(1, 1), false, 'Cell has to die due to overcrowding!');
  });

  it('Is a dead cell with exactly three live neighbours became a live cell on the next generation (3)?', () => {
    const cells = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    universe.inizialize(cells);
    // console.log('DEATH cell to life: '+universe.evolveCell(1, 0))
    assert.equal(universe.evolveCell(1, 0), true, 'Cell has to regenerate helped by the neighbours!');
  });
});

describe('E2E Test', () => {
  it('EMPTY', () => {
    const result = [[]];
    const cells = null;

    universe.inizialize(cells);

    assert.equal(universe.tick().toString(), result.toString(), "The universe tick on EMPTY shape isn't correct!");
  });

  it('BLOCK', () => {
    const result = [
      [1, 1],
      [1, 1],
    ];
    const cells = [
      [1, 1],
      [1, 1],
    ];
    universe.inizialize(cells);

    assert.equal(universe.tick().toString(), result.toString(), "The universe tick on BLOCK shape isn't correct!");
  });


  it('BLINKER', () => {
    const result = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];

    const cells = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    universe.inizialize(cells);

    assert.equal(universe.tick().toString(), result.toString(), "The universe tick on BLINKER shape isn't correct!");
  });
});
