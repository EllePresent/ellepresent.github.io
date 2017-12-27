canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
//generates bamboo image
var b = new Image();
b.src = "bigc.jpg";
stars = [];
var l = [];
function star(x,y, r, a, speed) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.a = a;
	this.state = 100 * a;
	this.speed = speed;
	this.draw = function() {
		ctx.beginPath();
		ctx.globalAlpha = this.a;
		ctx.shadowColor="white";
		ctx.shadowBlur= 20;
		ctx.fillStyle = "white";
		ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
		ctx.globalAlpha = 1;
	}
}
b.onload = function(){
    ctx.drawImage(b,0,0, canvas.width, canvas.height); 
	linear(100);
	console.log(l);
	stars.push(new star(50, 50, 2, 1, 1));
	stars.push(new star(80, 40, 2, 0.35, 1.5));
	stars.push(new star(110, 30, 2, 0, 3));
	stars.push(new star(100, 120, 2, 0.4, 1.5));
	stars.push(new star(127, 147, 2, 0.5, 2));
	stars.push(new star(160, 90, 2, 0.75, 1.35));
	stars.push(new star(170, 125, 2, 0.2, 1));
	stars.push(new star(190, 65, 2, 0.3, 1.25));
	stars.push(new star(210, 45, 2, 0.3, 1.25));
	stars.push(new star(210, 45, 2, 0.3, 1.25));
	update();
	
}

function update() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(b,0,0, canvas.width, canvas.height);  
	requestAnimationFrame(update);
	for (s of stars) {
		s.draw();
		s.a = Math.abs(Math.cos(s.state * Math.PI / 200));
		s.state += s.speed;
		s.draw();
	}
}

function linear(width) {
	for (var i = 0; i < width; i++) {
		l.push(i);
	}
	for(var i = width; i>0; i--) {
		l.push(i);
	}
}
