var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//set size of canvas
canvas.width = 578;
canvas.height = 200;

//MAKE A LINE
ctx.moveTo(0, 0);
ctx.lineTo(578, 200);
ctx.stroke();

//TO CLEAR THINGS (x,y,height,width)
//ctx.clearRect(30, 15, 100, 100);

// save canvas image as data url (png format by default)
var dataURL = canvas.toDataURL();

// set canvasImg image src to dataURL
// so it can be saved as an image
//document.getElementById('canvasImg').src = dataURL;


// GET MOUSE COORDINATES
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
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

canvasMouse.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvasMouse, evt);
	var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
	writeMessage(canvasMouse, message);
}, false);
