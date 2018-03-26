var GRID = [600, 200]
var [WIDTH , HEIGHT] = GRID;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//SET SIZE OF CANVAS
canvas.width = WIDTH;
canvas.height = HEIGHT;

//SET SIZE to WINDOW BROWSER===================================================
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

//MAKE A LINE
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(WIDTH, HEIGHT);
ctx.stroke();

//TO CLEAR CANVAS (x,y,width,height) ========================================-
// x,y : starting position
// width, height: area to clear
// ctx.clearRect(30, 15, 100, 100);

// SAVE CANVAS TO LOCALSTORAGE (png format by default)======================
//var dataURL = canvas.toDataURL("image/png");
//localStorage.setItem('myPixelArt', JSON.stringify(dataURL));

//LOAD CANVAS FROM LOCALSTORAGE ==============================================
//var toDrawUrl = JSON.parse(localStorage.getItem('url')) || {};
//ctxDraw.putImageData(imgData, canvas.width, canvas.height);

// GET MOUSE COORDINATES=====================================================
var canvasMouse = document.getElementById("mouse");
var ctxMouse = canvasMouse.getContext("2d");

canvasMouse.width = WIDTH;
canvasMouse.height = HEIGHT;

function writeMessage(canvas, message) {
	var context = canvas.getContext('2d');
	ctxMouse.clearRect(0, 0, canvas.width, canvas.height);
	ctxMouse.font = '18pt Calibri';
	ctxMouse.fillStyle = 'black';
	ctxMouse.fillText(message, 10, 25);
}

function getMousePos(canvas, event) {
	return {
		x: event.offsetX,
		y: event.offsetY
	};
}

canvasMouse.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvasMouse, evt);
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	writeMessage(canvasMouse, message);
}, false);

//DRAW A LINE================================================================

var canvasDraw = document.getElementById("draw");
var ctxDraw = canvasDraw.getContext("2d");
canvasDraw.width = WIDTH;
canvasDraw.height = HEIGHT;

//Choose color
ctxDraw.strokeStyle = 'black';
ctxDraw.lineJoin = 'round';
ctxDraw.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e){
  if(!isDrawing) return; //stop the fn from running when they are not moused down
  console.log(e);

// PIXEL By PIXEL====================================
  ctxDraw.beginPath();
  ctxDraw.moveTo(e.offsetX, e.offsetY);
  ctxDraw.lineTo(e.offsetX, e.offsetY);
  ctxDraw.stroke();

// MORE PENCIL-LIKE DRAWING FEEL======================
  // ctxDraw.beginPath();
  // //start from
  // ctxDraw.moveTo(lastX, lastY);
  // //go to
  // ctxDraw.lineTo(e.offsetX, e.offsetY);
  // ctxDraw.stroke();
  // [lastX, lastY] = [e.offsetX, e.offsetY];


}

canvasDraw.addEventListener('mousedown', (e) =>{
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvasDraw.addEventListener('mousemove', draw);

canvasDraw.addEventListener('mouseup', () => isDrawing = false);
canvasDraw.addEventListener('mouseout', () => isDrawing = false);

//ERASE ON CANVAS (SIMILAR TO DRAW) ==========================================

//ctx.clearRect(e.offsetX, e.offsetY, 1, 1);


//GRIDVIEW ON CANVAS =========================================================
var canvasGrid = document.getElementById("grid");
var ctxGrid = canvasGrid.getContext("2d");

canvasGrid.width = WIDTH;
canvasGrid.height = HEIGHT;


//ITERATE OVER WIDTH AND HEIGHT OF THE CANVAS
//Loop for the columns
for (let x = 0; x<= WIDTH; x = x + 10){
	ctxGrid.moveTo(x + 0.5, 0);
	ctxGrid.lineTo(x+ 0.5,HEIGHT);
}

for (let y = 0; y<= HEIGHT; y = y+10){
	ctxGrid.moveTo(0, 0.5+ y);
	ctxGrid.lineTo(WIDTH, 0.5+ y);
}

ctxGrid.strokeStyle = 'grey';
ctxGrid.lineWidth = 2;
ctxGrid.stroke();
//GRIDVIEW ON CANVAS AND FILL================================================

var kBoardWidth = 9;
var kBoardHeight= 9;
var kPieceWidth = 50;
var kPieceHeight= 50;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

var gridDraw = document.getElementById("gridDraw");
var ctxGridDraw = gridDraw.getContext("2d");
gridDraw.width = kPixelWidth;
gridDraw.height = kPixelHeight;

//ITERATE OVER WIDTH AND HEIGHT OF THE CANVAS
//Loop for the columns

ctxGridDraw.beginPath();

/* vertical lines */
for (var x = 0; x <= kPixelWidth; x += kPieceWidth) {
    ctxGridDraw.moveTo(0.5 + x, 0);
    ctxGridDraw.lineTo(0.5 + x, kPixelHeight);
}

/* horizontal lines */
for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
    ctxGridDraw.moveTo(0, 0.5 + y);
    ctxGridDraw.lineTo(kPixelWidth, 0.5 +  y);
}

ctxGridDraw.strokeStyle = 'grey';//"#eee";
ctxGridDraw.lineWidth = 1;
ctxGridDraw.stroke();
function Cell(row, column) {
    this.row = row;
    this.column = column;
}

function getCursorPosition(e) {
    /* returns Cell with .row and .column properties */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
			x = e.pageX;
			y = e.pageY;
    }
    else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= gridDraw.offsetLeft;
    y -= gridDraw.offsetTop;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var cell = new Cell(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
    return cell;
}

// function drawPiece(p, selected) {
//     var column = p.column;
//     var row = p.row;
//     var x = (column * kPieceWidth) + (kPieceWidth/2);
//     var y = (row * kPieceHeight) + (kPieceHeight/2);
//     var radius = (kPieceWidth/2) - (kPieceWidth/10);
//     gDrawingContext.beginPath();
//     gDrawingContext.arc(x, y, radius, 0, Math.PI*2, false);
//     gDrawingContext.closePath();
//     gDrawingContext.strokeStyle = "#000";
//     gDrawingContext.stroke();
//     if (selected) {
// 	gDrawingContext.fillStyle = "#000";
// 	gDrawingContext.fill();
//     }
// }

function fillCell(e){
	var cell = getCursorPosition(e);
	var column = cell.column;
	var row = cell.row;
	var x = (column * kPieceWidth);
	var y = (row * kPieceHeight);
	console.log(x,y)
	ctxGridDraw.beginPath();
	ctxGridDraw.fillRect(x, y,kPieceWidth,kPieceHeight);
	ctxGridDraw.closePath();
	ctxGridDraw.strokeStyle = "#000";
	ctxGridDraw.stroke();
}
gridDraw.addEventListener('click', fillCell ,false);
//2D ARRAY
let dataGrid = new Array(WIDTH).fill(Array(HEIGHT).fill(false))
//console.log(dataGrid[0]);
