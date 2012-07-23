window.onload = function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, W, H);

	var particles = [];
	for (var i = 0; i < 20; i++) {
		particles.push(new particle());
	}

	function particle() {
		this.location = {x: Math.random()*W, y: Math.random()*H};
		this.radius = 3;
		this.speed = 3;
		this.angle = Math.random() * 360;
	}

	function draw() {
		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];
			ctx.fillStyle = "white";
			ctx.fillRect(p.location.x, p.location.y, p.radius, p.radius);

			for (var n = 0; n < particles.length; n++) {
				var p2 = particles[n];
				var yd = p2.location.y - p.location.y;
				var xd = p2.location.x - p.location.x;
				var distance = Math.sqrt(xd*xd + yd*yd);
				if (distance < 200) {
					ctx.beginPath();
					ctx.loneWidth = 1;
					ctx.moveTo(p.location.x, p.location.y);
					ctx.lineTo(p2.location.x, p2.location.y);
					ctx.strokeStyle = "white";
					ctx.stroke();
				}
			}

			p.location.x = p.location.x + p.speed * Math.cos(p.angle*Math.PI/180);
			p.location.y = p.location.y + p.speed * Math.sin(p.angle*Math.PI/180);

			if (p.location.x < 0) p.location.x = W;
			if (p.location.x > W) p.location.x = 0;
			if (p.location.y < 0) p.location.y = H;
			if (p.location.y > H) p.location.y = 0;
			
		}
	}

	setInterval(draw, 30);
}