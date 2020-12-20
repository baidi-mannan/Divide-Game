// Declartion
let grid = [];
var n = 3;
var h = 0;

for (var i = 0; i < n; i++) {
  grid[i] = [];
  for (var j = 0; j < n; j++) {
    grid[i][j] = document.querySelectorAll(".c")[h];
    h++;
  }
}

// the 9 box
let extra = Array.from(document.querySelectorAll(".f div")); // 4 box 3 dv 1 drag
const e1 = extra[0];

extra.shift(); // 2 div 1 drag

let numbers = [
  [2, 3, 4, 5, 6, 7],
  [18, 20, 8, 9, 10, 11],
  [11, 12, 13, 14, 15, 16],
  [21, 22, 24, 25, 26, 27],
  [32, 33, 35, 36, 39, 40],
  [42, 44, 45, 48, 49, 50],
  [52, 54, 55, 56, 60, 28],
  [63, 64, 65, 66, 70, 30],
  [72, 75, 78, 80, 81, 84],
  [91, 99, 98, 88, 90, 2],
  //  [18,18,3,18,3,18],[18,3,18,3,18,18]
];
// let randomnum = [8, 2, 4];
let randomnum = [];
randomnum[0] =
  numbers[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 6)];
randomnum[1] =
  numbers[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 6)];
randomnum[2] =
  numbers[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 6)];

let score = parseInt(document.querySelector("#score").innerHTML);

//_________________________________________________

// Box Section

grid.forEach((element) => {
  element.forEach((x) => {
    x.addEventListener("dragover", Over);
    x.addEventListener("dragenter", Enter);
    x.addEventListener("dragleave", Leave);
    x.addEventListener("drop", Drop);
  });
});

function Over(e) {
  e.preventDefault();
}

function Enter(e) {
  if (this.className == "drop") {
    this.className = "drop";
    return;
  }
  this.className += " hover";
}

function Leave() {
  if (this.className == "drop") {
    this.className = "drop";
    return;
  }
  this.className = "c";
}

function Drop() {
  if (this.className == "drop")
    // If the box is filled
    return;
  if (currentDrag == 1) {
    // to diffrentiate between the box and extra numbers
    this.innerHTML = extra[0].innerHTML;
    randomShift(score);
  }
  if (currentDrag == 0) {
    this.innerHTML = fill.innerHTML;
    validDrag = 1; // isse check hoga ki grid m gra ki nhi
  }

  this.className = "drop";
  var index = findIndex(this); // TO find the location of the box
  var value = parseInt(this.innerHTML);
  adjacent(index[0], index[1], value);
  score = score + Math.floor(value / 10);
  document.querySelector("#score").innerHTML = score;
  start = 1;
}

function findIndex(t) {
  for (var i = 0; i < 3; i++) {
    var x = grid[i].indexOf(t);
    if (x != -1) {
      break;
    }
  }

  return [i, x];
}

let time = 1000;
let start = 0;
function checkGameOver() {
  var n = 0;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (grid[i][j].classList.contains("drop")) {
        n++;
      }
    }
  }

  if (n == 9)
    setTimeout(
      () => (
        (document.querySelector(".gameover").style.display = "flex"),
        (document.querySelector(".display").innerHTML = score)
      ),
      500
    );
  if (n == 0 && start == 1) {
    score = score + 40;
  }
}

// ---------------------------------LOGIC--------------------------------------//
function adjacent(i, j, value) {

  // fval stores the value of current cell after reduction from adjacent cell
  var fval = value;  
  if (j - 1 >= 0) {
    //For left cell
    fval = leftCell(i, j, value, fval); // Update the value of fval after each function call
  }

  if (j + 1 < n) {
    fval = rightCell(i, j, value, fval);
  }

  if (i - 1 >= 0) {
    fval = aboveCell(i, j, value, fval);
  }

  if (i + 1 < n) {
    fval = belowCell(i, j, value, fval);
  }

  checkGameOver();
}

function leftCell(i, j, value, fval) {
  var x = parseInt(grid[i][j - 1].innerHTML);

  if (x % value == 0) {
    // yahna pe x ki value change kane se niche wale if m be chale ja rha hai...  ex x=48 value=24 baad m x=2 value=24
    score = score + 10;
    grid[i][j - 1].innerHTML = x / value;
    grid[i][j].innerHTML = "";
    grid[i][j].className = "c";
    document.querySelector("#score").innerHTML = score;

    setTimeout(() => adjacent(i, j - 1, x / value), time);
  }
  if (value % x == 0) {
    score = score + 10;
    value = value / x;

    if(fval % x == 0) fval = fval/x;
    if(value>fval) value = fval;

    grid[i][j].innerHTML = value;
    grid[i][j - 1].innerHTML = "";
    grid[i][j - 1].className = "c";

    document.querySelector("#score").innerHTML = score;
    if (value == 1) {
      grid[i][j].innerHTML = "";
      grid[i][j].className = "c";
      value = "";
      score = score - 10;

      return fval;
    }
    setTimeout(() => adjacent(i, j, value), time);
  }
  return fval;
}

function rightCell(i, j, value, fval) {
  var x = parseInt(grid[i][j + 1].innerHTML);

  if (x % value == 0) {
    score = score + 10;
    grid[i][j + 1].innerHTML = x / value;
    grid[i][j].innerHTML = "";
    grid[i][j].className = "c";

    document.querySelector("#score").innerHTML = score;

    setTimeout(() => adjacent(i, j + 1, x / value), time);
  }
  if (value % x == 0) {
    score = score + 10;
    value = value / x;

    if(fval % x == 0) fval = fval/x;
    if(value>fval) value = fval;

    grid[i][j].innerHTML = value;
    grid[i][j + 1].innerHTML = "";
    grid[i][j + 1].className = "c";

    document.querySelector("#score").innerHTML = score;
    if (value == 1) {
      grid[i][j].innerHTML = "";
      grid[i][j].className = "c";
      value = "";

      score = score - 10;
      return fval;
    }
    setTimeout(() => adjacent(i, j, value), time);
  }
  return fval;
}

function aboveCell(i, j, value, fval) {
  var x = parseInt(grid[i - 1][j].innerHTML);

  if (x % value == 0) {
    score = score + 10;
    grid[i - 1][j].innerHTML = x / value;
    grid[i][j].innerHTML = "";
    grid[i][j].className = "c";
    document.querySelector("#score").innerHTML = score;

    setTimeout(() => adjacent(i - 1, j, x / value), time);
  }

  if (value % x == 0) {
    score = score + 10;
    value = value / x;

    if(fval % x == 0) fval = fval/x;
    if(value>fval) value = fval;

    grid[i][j].innerHTML = value;
    grid[i - 1][j].innerHTML = "";
    grid[i - 1][j].className = "c";
    document.querySelector("#score").innerHTML = score;

    if (value == 1) {
      grid[i][j].innerHTML = "";
      grid[i][j].className = "c";
      value = "";

      score = score - 10;
      return fval;
    }
    setTimeout(() => adjacent(i, j, value), time);
  }
  return fval;
}

function belowCell(i, j, value, fval) {
  var x = parseInt(grid[i + 1][j].innerHTML);

  if (x % value == 0) {
    score = score + 10;
    grid[i + 1][j].innerHTML = x / value;
    grid[i][j].innerHTML = "";
    grid[i][j].className = "c";
    document.querySelector("#score").innerHTML = score;

    setTimeout(() => adjacent(i + 1, j, x / value), time);
  }

  if (value % x == 0) {
    score = score + 10;
    value = value / x;

    if(fval % x == 0) fval = fval/x;
    if(value>fval) value = fval;

    grid[i][j].innerHTML = value;
    grid[i + 1][j].innerHTML = "";
    grid[i + 1][j].className = "c";
    document.querySelector("#score").innerHTML = score;

    if (value == 1) {
      grid[i][j].innerHTML = "";
      grid[i][j].className = "c";
      value = "";
      score = score - 10;

      return fval;
    }
    setTimeout(() => adjacent(i, j, value), time);
  }
  return fval;
}

// -------------------------------------------------------------//

// Extra Section

const blank = document.querySelector(".blank");
const fill = document.querySelector(".fill");
let currentDrag = -1;
let validDrag = -1; // Isse check hoga ki blank drop m git=ra ki nahi
function randomShift(score) {
  var k = 1;
  if (score < 100 && score > 0) k = 4;
  if (score >= 100 && score <= 250) k = 8;
  if (score > 250) k = numbers.length;
  for (var i = 0; i < extra.length; i++) {
    extra[i].innerHTML = randomnum[i];
  }
  randomnum.shift();
  randomnum.push(
    numbers[Math.floor(Math.random() * k)][Math.floor(Math.random() * 6)]
  );
  // randomnum.push(randomnum[Math.floor(Math.random() * randomnum.length)]);
}

randomShift(score);
extra[0].addEventListener("dragstart", dragStart); // on drag
extra[0].addEventListener("dragend", dragEnd);

function dragStart() {
  currentDrag = 1;
  setTimeout(() => (this.className = "none"), 0);
}

function dragEnd() {
  this.className = "drag";
}

blank.addEventListener("dragover", bOver);
blank.addEventListener("dragenter", bEnter);
blank.addEventListener("dragleave", bLeave);
blank.addEventListener("drop", bDrop);

function bOver(e) {
  e.preventDefault();
}

function bEnter(e) {
  this.className += " hover";
}

function bLeave() {
  this.className = "blank";
}

function bDrop() {
  fill.style.display = "flex";
  this.style.display = "none";

  if (currentDrag) {
    fill.innerHTML = extra[0].innerHTML;
    randomShift(score);
  }
}

fill.addEventListener("dragstart", bdragStart); // on drag
fill.addEventListener("dragend", bdragEnd);

function bdragStart() {
  currentDrag = 0;
  setTimeout(
    () => ((this.style.display = "none"), (blank.style.display = "flex")),
    0
  );
  validDrag = 0;
}

function bdragEnd(e) {
  if (validDrag == 1) {
    blank.style.display = "flex";
    this.style.display = "none"; // agr box m drop toh blank dikhega
  } else {
    this.style.display = "flex";
    blank.style.display = "none"; // nahi  TOH kuch nahi
  }
}
function xyz() {
  location.reload(true);
}
function play() {
  document.querySelector(".gamestart").style.display = "none";
}

