var validPts = [
	[
		{ x: 302, y: 273 },
		{ x: 301, y: 255 },
		{ x: 301, y: 232 },
		{ x: 301, y: 214 },
		{ x: 301, y: 193 },
		{ x: 300, y: 172 },
		{ x: 299, y: 150 },
		{ x: 301, y: 131 },
		{ x: 301, y: 108 },
		{ x: 300, y: 87 },
	],
	[
		{ x: 317, y: 280 },
		{ x: 330, y: 263 },
		{ x: 341, y: 248 },
		{ x: 354, y: 231 },
		{ x: 365, y: 215 },
		{ x: 377, y: 197 },
		{ x: 392, y: 179 },
		{ x: 402, y: 165 },
		{ x: 416, y: 146 },
		{ x: 431, y: 128 },
	],
	[
		{ x: 330, y: 296 },
		{ x: 348, y: 291 },
		{ x: 370, y: 285 },
		{ x: 388, y: 279 },
		{ x: 409, y: 271 },
		{ x: 429, y: 264 },
		{ x: 449, y: 258 },
		{ x: 467, y: 252 },
		{ x: 488, y: 246 },
		{ x: 508, y: 239 },
	],
	[
		{ x: 329, y: 317 },
		{ x: 348, y: 322 },
		{ x: 368, y: 329 },
		{ x: 388, y: 335 },
		{ x: 408, y: 341 },
		{ x: 427, y: 348 },
		{ x: 449, y: 355 },
		{ x: 469, y: 359 },
		{ x: 489, y: 367 },
		{ x: 509, y: 373 },
	],
	[
		{ x: 319, y: 331 },
		{ x: 328, y: 350 },
		{ x: 342, y: 367 },
		{ x: 354, y: 383 },
		{ x: 366, y: 401 },
		{ x: 378, y: 417 },
		{ x: 392, y: 435 },
		{ x: 403, y: 450 },
		{ x: 415, y: 469 },
		{ x: 429, y: 485 },
	],
	[
		{ x: 299, y: 337 },
		{ x: 300, y: 357 },
		{ x: 301, y: 379 },
		{ x: 298, y: 398 },
		{ x: 298, y: 420 },
		{ x: 297, y: 440 },
		{ x: 300, y: 464 },
		{ x: 300, y: 483 },
		{ x: 300, y: 504 },
		{ x: 299, y: 525 },
	],
	[
		{ x: 281, y: 329 },
		{ x: 268, y: 349 },
		{ x: 255, y: 366 },
		{ x: 244, y: 383 },
		{ x: 232, y: 397 },
		{ x: 220, y: 416 },
		{ x: 207, y: 432 },
		{ x: 197, y: 448 },
		{ x: 184, y: 466 },
		{ x: 171, y: 484 },
	],
	[
		{ x: 269, y: 315 },
		{ x: 250, y: 322 },
		{ x: 231, y: 327 },
		{ x: 210, y: 334 },
		{ x: 190, y: 341 },
		{ x: 171, y: 347 },
		{ x: 152, y: 354 },
		{ x: 132, y: 359 },
		{ x: 111, y: 365 },
		{ x: 91, y: 372 },
	],
	[
		{ x: 272, y: 294 },
		{ x: 250, y: 289 },
		{ x: 229, y: 282 },
		{ x: 211, y: 276 },
		{ x: 192, y: 267 },
		{ x: 172, y: 262 },
		{ x: 154, y: 257 },
		{ x: 132, y: 250 },
		{ x: 110, y: 244 },
		{ x: 91, y: 237 },
	],
	[
		{ x: 282, y: 281 },
		{ x: 269, y: 264 },
		{ x: 257, y: 247 },
		{ x: 243, y: 230 },
		{ x: 233, y: 212 },
		{ x: 220, y: 198 },
		{ x: 207, y: 179 },
		{ x: 196, y: 164 },
		{ x: 183, y: 146 },
		{ x: 171, y: 127 },
	],
];

var bgImg = new Image();
var shapes = [];
var shapeIndx = 0;
var canvas = document.getElementById("wheel");
var ctx;
const toggle = document.getElementById("shape-toggle");

function reset() {
	shapes = [];
	shapeIndx = 0;
	clear_canvas();

	if (toggle) {
		toggle.disabled = true;
		toggle.checked = false;
	}
}

function save() {
    Canvas2Image.saveAsImage(canvas, 601, 606, "png", "wellbeing-wheel");
}

function toggleShape() {
	shapeIndx = shapeIndx ? 0 : 1;
}

function vertex(x, y, color) {
	ctx.fillStyle = color || "black";
    // ctx.strokeStyle = color || "black";
	// ctx.fillRect(x - 3, y - 3, 6, 6);

    ctx.beginPath();
	ctx.arc(x - 1, y - 1, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.moveTo(x, y);
}

function clear_canvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	document.getElementById("coordinates").value = "";
	prep_canvas();
}

function draw() {
	clear_canvas();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "transparent";
	ctx.lineCap = "square";

	// Draw shapes backwords so that the second shape appears beneath the first
	for (let indx = shapes.length - 1; indx >= 0; indx--) {
		const shape = shapes[indx];
		const perimeter = shape.points;
		const path = new Path2D();

		const color = indx % 2 ? ["#8dc63f", "#8dc63f99"] : ["#00a79d", "#00a79d77"];

		for (var i = 0; i < perimeter.length; i++) {
			// Draw point/line only if current point has coordinates
			if (perimeter[i] !== undefined) {
				if (i == 0) {
					path.moveTo(perimeter[i]["x"], perimeter[i]["y"]);
				} else {
					path.lineTo(perimeter[i]["x"], perimeter[i]["y"]);
				}

				shape.isComplete || vertex(perimeter[i]["x"], perimeter[i]["y"], color[0]);
			}
		}

		if (shape.isComplete) {
			path.lineTo(perimeter[0]["x"], perimeter[0]["y"]);
			path.closePath();
			ctx.fillStyle = color[1];
			ctx.fill(path);
		}
		// ctx.strokeStyle = color[0];
		ctx.stroke(path);

		// print coordinates
		if (perimeter.length == 0) {
			document.getElementById("coordinates").value = "";
		} else {
			document.getElementById("coordinates").value = JSON.stringify(perimeter);
			// document.getElementById("coordinates").value = JSON.stringify(rawCoords);
		}
	}
}

let rawCoords = [];

function findSnap(clX, clY) {
	// Exact click coordinates (for debugging, updating coordinates if image changes, etc.)
	rawCoords.push({ x: clX, y: clY });

	let tDistance;
	let snapX = 1;
	let snapY = 1;
	let pGroup;

	// Look through all valid points and find the closest to user's click
	validPts.forEach((group, indx) => {
		group.forEach((pt) => {
			const newTDist = Math.abs(pt.x - clX) + Math.abs(pt.y - clY);
			if (newTDist < tDistance || tDistance === undefined) {
				snapX = pt.x;
				snapY = pt.y;

				tDistance = newTDist;
				pGroup = indx;
			}
		});
	});

	return { x: snapX, y: snapY, index: pGroup };
}

function point_it(event) {
	var rect;

	if (!shapes[shapeIndx]) {
		shapes[shapeIndx] = {
			isComplete: false,
			points: validPts.map(() => undefined), // Begin with array of undefined points
		};
	}

	let shape = shapes[shapeIndx];
	let perimeter = shape.points;

	rect = canvas.getBoundingClientRect();
	const { x, y, index } = findSnap(event.clientX - rect.left, event.clientY - rect.top);

	perimeter[index] = { x: x, y: y };

	if (!shape.isComplete) {
		// Complete if all points have been set
		if (perimeter.every((point) => point !== undefined)) {
			// Final point was created above--move to the first point automatically
			perimeter.push({ x: perimeter[0].x, y: perimeter[0].y });

			shape.isComplete = true;

			if (shapeIndx === 0) {
				// Automatically toggle to second shape after first shape is complete
				shapeIndx = 1;
			} else {
				// Show toggle switch after second shape is complete
				if (toggle) {
					toggle.disabled = false;
					toggle.checked = true;
				}
			}
		}
	} else {
		// When shape is complete, always update the existing first/last point
		// (created automatically) in case it should change based on an update to the shape
		const fIndex = perimeter.length - 1;
		perimeter[fIndex].x = perimeter[0].x;
		perimeter[fIndex].y = perimeter[0].y;
	}

	draw();
	return false;
}

function start() {
    bgImg.src = canvas.getAttribute("data-imgsrc");

    // Need crossorigin attribute to save image on server, 
    // but causes image to not load when running locally.
    bgImg.setAttribute('crossorigin', 'anonymous');

	bgImg.onload = function () {
		prep_canvas();
	};
}

function prep_canvas() {
	if (!ctx) ctx = canvas.getContext("2d");

	ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
}
