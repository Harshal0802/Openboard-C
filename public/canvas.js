let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElement = document.querySelector(".pencil-width");
let eraserWidthElement = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElement.value;
let eraserWidth = eraserWidthElement.value;

let undoRedoTracker = [];
let track = 0;

let mouseDown = false;

//API
let tool = canvas.getContext("2d");

//By default style is red and line width is 3
tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  beginPath({
    x: e.clientX,
    y: e.clientY,
  });
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    drawStroke({
      color: eraserFlag ? eraserColor : penColor,
      width: eraserFlag ? eraserWidth : penWidth,
      x: e.clientX,
      y: e.clientY,
    });
  }
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;

  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

undo.addEventListener("click", (e) => {
  if (track > 0) {
    track--;
  }
  let trackObj = {
    trackValue: track,
    undoRedoTracker,
  };
  undoRedoCanvas(trackObj);
});

redo.addEventListener("click", (e) => {
  if (track < undoRedoTracker.length - 1) {
    track++;
  }
  let trackObj = {
    trackValue: track,
    undoRedoTracker,
  };
  undoRedoCanvas(trackObj);
});

function undoRedoCanvas(trackObject) {
  track = trackObject.trackValue;
  undoRedoTracker = trackObject.undoRedoTracker;

  let url = undoRedoTracker[track];
  let img = new Image();
  img.src = url;
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

function beginPath(strokeObject) {
  tool.beginPath();
  tool.moveTo(strokeObject.x, strokeObject.y);
}

function drawStroke(strokeObject) {
  tool.strokeStyle = strokeObject.color;
  tool.lineWidth = strokeObject.width;
  tool.lineTo(strokeObject.x, strokeObject.y);
  tool.stroke();
}

pencilColor.forEach((colorElement) => {
  colorElement.addEventListener("click", (e) => {
    let color = colorElement.classList[0];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});

pencilWidthElement.addEventListener("change", (e) => {
  penWidth = pencilWidthElement.value;
  tool.lineWidth = penWidth;
});

eraserWidthElement.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElement.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = penColor;
    tool.lineWidth = penWidth;
  }
});

download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();

  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});
