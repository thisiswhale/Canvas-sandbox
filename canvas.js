var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//SET SIZE OF CANVAS
canvas.width = 578;
canvas.height = 200;

//SET SIZE to WINDOW BROWSER
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

//MAKE A LINE
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(578, 200);
ctx.stroke();

//TO CLEAR CANVAS (x,y,width,height) ========================================-
// x,y : starting position
// width, height: area to clear
//ctx.clearRect(30, 15, 100, 100);

// save canvas image as data url (png format by default)======================
var dataURL = canvas.toDataURL();

// set canvasImg image src to dataURL
// so it can be saved as an image
//document.getElementById('canvasImg').src = dataURL;


// GET MOUSE COORDINATES=====================================================
var canvasMouse = document.getElementById("mouse");
var ctxMouse = canvasMouse.getContext("2d");

canvasMouse.width = 578;
canvasMouse.height = 200;

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
canvasDraw.width = 578;
canvasDraw.height = 200;

//Choose color
ctxDraw.strokeStyle = '#BADA55';
ctxDraw.lineJoin = 'round';
ctxDraw.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let direction = true;

function draw(e){
  if(!isDrawing) return; //stop the fn from running when they are not moused down
  console.log(e);

// PIXEL By PIXEL===============
  ctxDraw.beginPath();
  ctxDraw.moveTo(e.offsetX, e.offsetY);
  ctxDraw.lineTo(e.offsetX, e.offsetY);
  ctxDraw.stroke();

// MORE PENCIL-LIKE DRAWING FEEL===============
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
var ctxGrid = canvas.getContext("2d");
canvasGrid.width = 578;
canvasGrid.height = 200;
