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
			$('#message').fadeTo("slow", 1);
			console.log('done');
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
	} else {
		//resets star drawing
		$('#message').css('opacity', 0);
		$('#birthday').fadeTo("slow", 1);
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.drawImage(b, 0,0, canvas.width, canvas.height);
		update();
	}
	//fade back in
	$('#bCanvas').fadeTo("slow", 1);
}