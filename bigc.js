//generates bamboo image
var b = new Image();
b.src = "bigc.jpg";
stars = [];
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
	//orion
	stars.push(new star(50, 50, 2, 1, 1));
	stars.push(new star(80, 40, 2, 0.35, 1.5));
	stars.push(new star(110, 30, 2, 0, 3));
	
	//dipper
	stars.push(new star(100, 110, 2, 0.4, 1.5));
	stars.push(new star(127, 137, 2, 0.5, 2));
	stars.push(new star(160, 90, 2, 0.75, 1.35));
	stars.push(new star(165, 120, 2, 0.2, 1));
	stars.push(new star(190, 65, 2, 0.1, 1.25));
	stars.push(new star(210, 45, 2, 0.42, 2));
	stars.push(new star(250, 30, 2, 0.9, 1));
}

function update() {
	//if star image
	if (!visible) {
		requestAnimationFrame(update);
	} else  {
		return;
	}
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(b,0,0, canvas.width, canvas.height);
	//update star twinkle
	for (s of stars) {
		s.draw();
		s.a = Math.abs(Math.cos(s.state * Math.PI / 200));
		s.state += s.speed;
		s.draw();
	}
}
