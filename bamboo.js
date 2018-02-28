canvas = document.getElementById("bCanvas");
ctx = canvas.getContext("2d");
//generates bamboo image
var bam = new Image();
bam.src = "bamboo.jpg";
var points;
var paths = [];
var done = false;
var visible = true;
//performs action when image is loaded in
var sky = new Audio('sky.mp3');
var one = new Audio('one.mp3');
var songs = [one, sky];
var songIndex = 0;

function playAudio() { 
	songs[songIndex].play();
	
} 


bam.onload = function(){
    ctx.drawImage(bam,0,0, canvas.width, canvas.height);  
	//create all paths for drawing
	var a1 = calcWaypoints({x:444, y: 193}, {x: 468, y: 189});
	var a2 = calcWaypoints({x:456, y: 191}, {x: 460, y: 210});
	var a3 = calcArc({x: 452, y: 210}, 8);
	var a4 = calcWaypoints({x:455, y: 233}, {x: 458, y: 256});
	var a5 = calcWaypoints({x:446, y: 246}, {x: 466, y: 243});
	var a6 = calcWaypoints({x:448, y: 270}, {x: 451, y: 300}); 
	var a7 = calcWaypoints({x:448, y: 270}, {x: 466, y: 266});
	var a8 = calcWaypoints({x:449, y: 285}, {x: 461, y: 282});
	var a9 = calcWaypoints({x:451, y: 300}, {x: 469, y: 296});
	paths = [a1, a2, a3, a4, a5, a6,a7, a8, a9];
	points = paths[0];
	animate();
	swap();
	playAudio();
	setInterval(function(){
		if (songs[songIndex].ended) {
			songIndex = (songIndex + 1) % 2;
			playAudio();
		}
	}, 300)
	
}

//calculates waypoints between vertices
function calcWaypoints(a, b) {
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	var waypoints = [];
	for (var i = 0; i < 50; i++) {
		var x = a.x - (dx * i / 50);
		var y = a.y - (dy * i / 50);
		waypoints.push({x:x, y:y});
	}
	return waypoints;
}

//calculates waypoints for an arc
function calcArc(center, r) {
	var waypoints = [];
	for (var i = 0; i < 50; i++) {
		var x = center.x + Math.cos(Math.PI * i / 50) * r;
		var y = center.y + Math.sin(Math.PI * i / 50) * r;
		waypoints.push({x:x, y:y});
	}
	return waypoints;
}

var t = 1;
var index = 1;
// incrementally draw additional line segments along the path
function animate(){
	done = false;
    if(t<points.length-1 && visible){ 
		requestAnimationFrame(animate); 
	} else {
		if (!visible) {
			return;
		}
		//continues to next lines if avaliable
		if (index < paths.length) {
			points = paths[index];
			index++;
			t = 1;
			animate();
		} else {
			done = true;
		}
	}
    ctx.beginPath();
	ctx.strokeStyle = "white";
	//draws path from prev way point to current
    ctx.moveTo(points[t-1].x,points[t-1].y);
    ctx.lineTo(points[t].x,points[t].y);
    ctx.stroke();
	ctx.closePath();
	//increments paths
    t++;
}

var black = {r:0,g:0,b:0};
var blue = {r:25, g: 25, b: 112};	
var forest = {r:34, g: 139, b:34};
var spring = {r:0, g: 255, b:127};
var curr0 = {r:0,g:0,b:0};
var curr1 = {r:25, g: 25, b: 112};	
var finish0 = false;
var finish1 = false;
var count = 0;
var deg = 45;
function backgroundChange0() {
	console.log('0');
	if (finish0) {
		clearInterval(interval0);
	}
	var dr0 = forest.r - black.r;
	var dg0 = forest.g - black.g;
	var db0 = forest.b - black.g;
	var dr1 = 0;
	var dg1 = 0;
	var db1 = 0;
	var dd = -90 / 20;
	
	
	if (count < 19) {
		curr0.r = Math.min(curr0.r + dr0 / 20, 34);
		curr0.g = Math.min(curr0.g + dg0 / 20, 139);
		curr0.b = Math.min(curr0.b + db0 / 20, 34);
		//curr1.r = (curr1.r + dr1 / 20);
		//curr1.g = (curr1.g + dg1 / 20);
		//curr1.b = (curr1.b + db1 / 20);
		deg = Math.max(-45, deg + dd);
		count++;
		$('body').css('background', 'linear-gradient(' + deg+ 'deg,' + convertrgb(curr0) + ',' + convertrgb(curr1) + ')');
	} else {
		count = 0;
		finish0 = true;
	}

	
}

function backgroundChange1() {
	console.log('1');
	if (finish1) {
		clearInterval(interval1);
	}

	var dr0 = black.r - forest.r;
	var dg0 = black.g - forest.g;
	var db0 = black.b - forest.b;
	var dr1 = 0;
	var dg1 = 0;
	var db1 = 0;
	var dd = 90 / 20;
	
	if (count < 19) {
		curr0.r = Math.max(curr0.r + dr0 / 20, 0);
		curr0.g = Math.max(curr0.g + dg0 / 20, 0);
		curr0.b = Math.max(curr0.b + db0 / 20, 0);
		//curr1.r = (curr1.r + dr1 / 20);
		//curr1.g = (curr1.g + dg1 / 20);
		//curr1.b = (curr1.b + db1 / 20);
		deg = Math.min(45, deg +dd);
		count++;
	} else {
		count = 0;
		finish1 = true;
	}
	//console.log(deg);
	$('body').css('background', 'linear-gradient(' + deg+ 'deg,' + convertrgb(curr0) + ',' + convertrgb(curr1) + ')');
}

function convertrgb(dict) {
	return 'rgb(' + Math.round(dict.r) + ', ' + Math.round(dict.g) + ', ' + Math.round(dict.b) + ')'; 
}

function swap() {
	
	visible = !visible;
	//cut away
	$('#bCanvas').css("opacity", 0);
	
	if (visible) {
		//resets bamboo drawing
		$('#birthday').css('opacity', 0);
		t = 1;
		index= 1;
		points = paths[0];
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.drawImage(bam,0,0, canvas.width, canvas.height);  
		animate();
		if (typeof interval1 != 'undefined') {
			clearInterval(interval1);
			count = 0;
			finish0 = false;
		} 
		interval0 = setInterval(backgroundChange0, 100);
	} else {
		//resets star drawing
		$('#message').css('opacity', 0);
		$('#birthday').fadeTo("slow", 1);
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.drawImage(b, 0,0, canvas.width, canvas.height);
		update();
		
	
		
		if (typeof interval0 != 'undefined') {
			clearInterval(interval0); count = 0; finish1 = false;
		}
		interval1 = setInterval(backgroundChange1, 100);
	}
	//fade back in
	$('#bCanvas').fadeTo("slow", 2);
}