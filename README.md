Simple game of life Kata developed in a double loop way. BDD --> TDD.
------------------------------------------------------------------------------------------------------------
# __E2E Game scenarious TESTs__

## 1) Empty universe
| *IN* | *OUT* |
| --- | --- |
| __Empty__ | __Empty__ |

## 2) Block 
| *IN* | *OUT* |
| --- | --- |  
| ▓▓ | ▓▓ | 
| ▓▓ | ▓▓ | 


## 3) Blinker 
| *IN* | *OUT*|
| --- | --- |
| ░▓░ | ░░░ |
| ░▓░ | ▓▓▓ |
| ░▓░ | ░░░ |

## 4) Pulsar 
| *IN* | *OUT* |
| --- | --- |
| ░░░░░░░░░░░░░░░ | ░░░░▓░░░░░▓░░░░ |
| ░░░▓▓▓░░░▓▓▓░░░ | ░░░░▓░░░░░▓░░░░ |
| ░░░░░░░░░░░░░░░ | ░░░░▓▓░░░▓▓░░░░ |
| ░▓░░░░▓░▓░░░░▓░ | ░░░░░░░░░░░░░░░ |
| ░▓░░░░▓░▓░░░░▓░ | ▓▓▓░░▓▓░▓▓░░▓▓▓ |
| ░▓░░░░▓░▓░░░░▓░ | ░░▓░▓░▓░▓░▓░▓░░ |
| ░░░▓▓▓░░░▓▓▓░░░ | ░░░░▓▓░░░▓▓░░░░ |
| ░░░░░░░░░░░░░░░ | ░░░░░░░░░░░░░░░ |
| ░░░▓▓▓░░░▓▓▓░░░ | ░░░░▓▓░░░▓▓░░░░ |
| ░▓░░░░▓░▓░░░░▓░ | ░░▓░▓░▓░▓░▓░▓░░ |
| ░▓░░░░▓░▓░░░░▓░ | ▓▓▓░░▓▓░▓▓░░▓▓▓ |
| ░▓░░░░▓░▓░░░░▓░ | ░░░░░░░░░░░░░░░ |
| ░░░░░░░░░░░░░░░ | ░░░░▓▓░░░▓▓░░░░ |
| ░░░▓▓▓░░░▓▓▓░░░ | ░░░░▓░░░░░▓░░░░ |
| ░░░░░░░░░░░░░░░ | ░░░░▓░░░░░▓░░░░ |


## 5) Glider 
| *IN* | *OUT*
| --- | --- |
| ▓░░░░░░ | ░▓░░░░░
| ░▓▓░░░░ | ░░▓░░░░
| ▓▓░░░░░ | ▓▓▓░░░░
| ░░░░░░░ | ░░░░░░░
| ░░░░░░░ | ░░░░░░░

------------------------------------------------------------------------------------------------------------ 
# __UNIT TESTs__
## *Define the universe*
1. Is universe a multy array[[]]?
2. Is the universe expanding? [Let it to emerge in the E2E tests...]
3. *Cells types*
- Is dead cell ░?
- Is life cell ▓?
- Are other cells' types rejected? [MAYBE OPTIONAL - let it to emerge]

## *Watching around behaviours*
1. Is your cell able to look around - 3x3 universe?
2.  Is your cell able to look around - corners and borders? [MAYBE OPTIONAL - let it to emerge]

## *Live or die behaviours*
1. Is a live cell with fewer than two live neighbours dies (<2)?
2. Is a live cell with two or three live neighbours still living on the next generation (2 || 3)?
3. Is a live cell with more than three live neighbours dead on the next generation (>3)?
4. Is a dead cell with exactly three live neighbours became a live cell on the next generation (3)?