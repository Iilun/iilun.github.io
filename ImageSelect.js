Math.gcd= function(a, b){
    if(b) return Math.gcd(b, a%b);
    return Math.abs(a);
}
Math.fraction= function(n, max_denominator, up){
    var s= String(n),
    p= s.indexOf('.');
    const results = [];

    for (m = 2 ; m<= max_denominator; m++){
      if(p== -1) return s;
      var i= Math.floor(n) || '', 
      dec= s.substring(p), 
      num= up=== 1? Math.ceil(dec*m): Math.round(dec*m), 
      den= m, 
      g= Math.gcd(num, den),
      approximateValue= num/den;
      results[m-2] = approximateValue
    }
    //console.log(results)
    var correctResults = results.map((e) => Math.abs(e - n))
    var min = Math.min.apply(null, correctResults)
    const indexBonDeno = correctResults.indexOf(min)
    //console.log(indexBonDeno)

    if(p== -1) return s;
      var i= Math.floor(n) || '',
      m = indexBonDeno+2,
      dec= s.substring(p), 
      num= up=== 1? Math.ceil(dec*m): Math.round(dec*m), 
      den= m, 
      g= Math.gcd(num, den);

    if(den/g==1) return String(i+(num/g));

    if(i) i= i+' and  ';
    return i+ String(num/g)+'/'+String(den/g);
}

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

var offset = 0


var togetherDate = new Date(Date.UTC(2022, 6, 8, 22, 0, 0));
var todayDate = new Date()
const todayDateAnna =convertTZ(todayDate, "Europe/Paris")// new Date(Date.UTC(2022, 3, 6, 10, 0, 0));// 
var departureDate = new Date(Date.UTC(2022, 1, 14, 22, 0, 0));


// To calculate the time difference of two dates
var beforeTogetherTime = - todayDate.getTime() + togetherDate.getTime();
  
// To calculate the no. of days between two dates
var beforeTogether = Math.trunc(beforeTogetherTime / (1000 * 3600 * 24)) - offset;

var alreadyDoneTime = - departureDate.getTime() + todayDate.getTime();
  
// To calculate the no. of days between two dates
var alreadyDone = Math.trunc(alreadyDoneTime / (1000 * 3600 * 24)) + offset;

var totalToDoTime = - departureDate.getTime() + togetherDate.getTime();
// To calculate the no. of days between two dates
var totalToDo = 142;

//calcul du pourcentage
var alreadyDonePercent = alreadyDone/totalToDo

//creation du message
var toDisplayFirst =""
//debut du message
toDisplayFirst = toDisplayFirst + "Plus que " 
toDisplaySecond = " jours avant d'être ensemble. " 

//suite du message
toDisplayThird = ""
toDisplayFourth =""
//messages conditionnels
if (alreadyDone >= beforeTogether) {
	toDisplayThird = "On en a déja fait "
	toDisplayFourth = ". "
}

endDisplay =  Math.fraction(alreadyDonePercent,10) + " a déjà été fait, ca passe vite en vrai"
if (beforeTogether.days <= 10){
	endDisplay = endDisplay + " AAAAAAAAAAAAH SI PROCHE\nClique ici : http://testanna.getenjoyment.net "
}

var j= 0;
function display() {
  if(j==0){
    

    j = 1;
    var elem2 = document.getElementById("myText");
    var days = 143;
	var done = 0;
    var id1 = setInterval(textIteration, 50);
    function textIteration() {
      if (days < beforeTogether ) {
        clearInterval(id1);
        j = 0;
      } else {
		addedDisplay = ""
		done ++;
		if (toDisplayThird != "") {
			addedDisplay =  toDisplayThird + done + toDisplayFourth
		}
        elem2.innerHTML = toDisplayFirst + days + toDisplaySecond + addedDisplay + endDisplay;
        days--;
		
      }
    }
  }
}
display()

//barre de progression
var i = 0;
function move(percentageValue) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 70);
    function frame() {
      if (width >= Math.round(percentageValue*100)) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}

//Gestion du random : 


//Random generator

function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

//Seed Generator : 

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}


// Create xmur3 state:

function displayPhoto(imgOffset){
    var seed = xmur3(todayDateAnna.toDateString() + imgOffset);

    var rand = sfc32(seed(), seed(), seed(), seed());

    var img = document.getElementById("myImg");
	var nbImages = 57
    //choix de l'image
    var imgURL = randImage(rand(), nbImages);
    while (img.src.split('images/')[1] == imgURL) {
      imgURL = randImage(rand(), nbImages)
      console.log("redo")
    }
    imgURL = "images/" + imgURL
    img.src = imgURL;
    console.log(imgURL)
}

function randImage(value, nbImages) {
  
  return  (Math.floor(value * (nbImages+1)) + 1) +".jpg"
}

var imgOffset = 0
displayPhoto(imgOffset)

$(window).on('load', function() {
    move(alreadyDonePercent)
});

$(document).on("click", "a", function(e){
    //e.preventDefault();
    imgOffset = imgOffset + 1
	if (todayDateAnna.getDate() == 6 && todayDateAnna.getMonth() == 3) {
		displayPhoto604(imgOffset)
	} else {
		displayPhoto(imgOffset)
	}
    
});

function getRndInteger(min, max, mult) {
  return Math.floor((Math.floor(Math.random() * (max - min) ) + min)/mult)*mult ;
}

$('#myHeart').hover(function(){
  window.mytimeout = setTimeout(function() {
    heartAnimation()
  }, 700);
}, function(){
  clearTimeout(window.mytimeout);    
});

function generateChild(i){
  heart = $("#myHeart")
  basFontSize = Math.floor(parseFloat(heart.css("font-size")))

  heartType = getRndInteger(0,4,1)
  if (i != 0) {
    fontSize = getRndInteger(10,basFontSize+10,1)
    zIndex = ""
  } else {
    fontSize = basFontSize
    heartType = 0
    zIndex = "z-index:1500;"
  }
  switch(heartType) {
    case 0 :
      heartString = "🤍"
      break;
    case 1 :
      heartString = "💛"
      break;
    case 2 :
      heartString = "💚"
      break;
    case 3 :
      heartString = "❤️"
      break;
  }
  base ='<div class="text hearts '
  position = "p" + getRndInteger(20,70,5) + getRndInteger(20,70,5)
  
  base += position + '" style="font-size:' + fontSize + "px;" + zIndex + '">' + heartString + '</div>'
  return base
}

function heartAnimation() {
  nbOfHearts = getRndInteger(5,15,1)
  for (i=0; i< nbOfHearts; i++){

    childString = generateChild(i)
    $("#overlayHearts").append(childString)
    console.log(childString)
  }
  
  $(".container").addClass("FakeHover");
  setTimeout(function() {
    $(".hearts").addClass("Animate");
    },500);
  
  
  
  
  //reset
  setTimeout(function() {
    $("#overlayHearts").css("transition","0s")
    $(".container").removeClass("FakeHover");
    $(".hearts").remove()
    setTimeout(function() {
      $("#overlayHearts").css("transition","6s ease")
    },500);
  }, 6000);
}


// when animating on canvas, it is best to use requestAnimationFrame instead of setTimeout or setInterval
// not supported in all browsers though and sometimes needs a prefix, so we need a shim
window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();

// now we will setup our basic variables for the demo
var canvas = document.getElementById( 'myCanvas' ),
		ctx = canvas.getContext( '2d' ),
		// full screen dimensions
		cw = window.innerWidth,
		ch = window.innerHeight,
		// firework collection
		fireworks = [],
		// particle collection
		particles = [],
		// starting hue
		hue = 120,
		// when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
		limiterTotal = 5,
		limiterTick = 0,
		// this will time the auto launches of fireworks, one launch per 80 loop ticks
		timerTotal = 120,
		timerTick = 0,
		mousedown = false,
		// mouse x coordinate,
		mx,
		// mouse y coordinate
		my;
		
// set canvas dimensions
canvas.width = cw;
canvas.height = ch;
// now we are going to setup our function placeholders for the entire demo

// get a random number within a range
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create firework
function Firework( sx, sy, tx, ty ) {
	// actual coordinates
	this.x = sx;
	this.y = sy;
	// starting coordinates
	this.sx = sx;
	this.sy = sy;
	// target coordinates
	this.tx = tx;
	this.ty = ty;
	// distance from starting point to target
	this.distanceToTarget = calculateDistance( sx, sy, tx, ty );
	this.distanceTraveled = 0;
	// track the past coordinates of each firework to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 3;
	// populate initial coordinate collection with the current coordinates
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	this.angle = Math.atan2( ty - sy, tx - sx );
	this.speed = 2;
	this.acceleration = 1.05;
	this.brightness = random( 50, 70 );
	// circle target indicator radius
	this.targetRadius = 1;
}

// update firework
Firework.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	
	// cycle the circle target indicator radius
	if( this.targetRadius < 8 ) {
		this.targetRadius += 0.3;
	} else {
		this.targetRadius = 1;
	}
	
	// speed up the firework
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	var vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	// how far will the firework have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.sx, this.sy, this.x + vx, this.y + vy );
	
	// if the distance traveled, including velocities, is greater than the initial distance to the target, then the target has been reached
	if( this.distanceTraveled >= this.distanceToTarget ) {
		createParticles( this.tx, this.ty );
		// remove the firework, use the index passed into the update function to determine which to remove
		fireworks.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.x += vx;
		this.y += vy;
	}
}

// draw firework
Firework.prototype.draw = function() {
	ctx.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1][ 0 ], this.coordinates[ this.coordinates.length - 1][ 1 ] );
	ctx.lineTo( this.x, this.y );
  ctx.lineWidth = 3;
	ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
	ctx.stroke();
	
}

// create particle
function Particle( x, y ) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 8;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 1, 10 );
	// friction will slow the particle down
	this.friction = 0.99;
	// gravity will be applied and pull the particle down
	this.gravity = 0.5;
	// set the hue to a random number +-50 of the overall hue variable
	this.hue = random( hue - 50, hue + 50 );
	this.brightness = random( 50, 80 );
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = random( 0.015, 0.025 );
}

// update particle
Particle.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y ] );
	// slow down the particle
	this.speed *= this.friction;
	// apply velocity
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	// fade out the particle
	this.alpha -= this.decay;
	
	// remove the particle once the alpha is low enough, based on the passed in index
	if( this.alpha <= this.decay ) {
		particles.splice( index, 1 );
	}
}

// draw particle
Particle.prototype.draw = function() {
	ctx. beginPath();
	// move to the last tracked coordinates in the set, then draw a line to the current x and y
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo( this.x, this.y );
  ctx.lineWidth = 2;
	ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.stroke();
}

// create particle group/explosion
function createParticles( x, y ) {
	// increase the particle count for a bigger explosion, beware of the canvas performance hit with the increased particles though
	var particleCount = 50;
	while( particleCount-- ) {
		particles.push( new Particle( x, y ) );
	}
}

// main demo loop
function loop() {
	ch = $(document).height()
	canvas.height = ch
	// this function will run endlessly with requestAnimationFrame
	requestAnimFrame( loop );

	
	// increase the hue to get different colored fireworks over time
	//hue += 0.5;
  
  // create random color
  hue= random(0, 360 );
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, cw, ch );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';
	
	// loop over each firework, draw it, update it
	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw();
		fireworks[ i ].update( i );
	}
	
	// loop over each particle, draw it, update it
	var i = particles.length;
	while( i-- ) {
		particles[ i ].draw();
		particles[ i ].update( i );
	}
	
	// launch fireworks automatically to random coordinates, when the mouse isn't down
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			fireworks.push( new Firework( cw / 2, ch, random( cw/10, 9 * cw/10 ), random( ch/10, ch / 2 ) ) );
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
}


// main demo loop
function year1Loop() {
	timerTotal = 40
	// this function will run endlessly with requestAnimationFrame
	requestAnimFrame( year1Loop );
	
	// increase the hue to get different colored fireworks over time
	//hue += 0.5;
  
  // create random color
  hue= random(0, 360 );
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, cw, ch );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';
	
	// loop over each firework, draw it, update it
	var i = fireworks.length;
	while( i-- ) {
		fireworks[ i ].draw();
		fireworks[ i ].update( i );
	}
	
	// loop over each particle, draw it, update it
	var i = particles.length;
	while( i-- ) {
		particles[ i ].draw();
		particles[ i ].update( i );
	}
	
	// launch fireworks automatically to random coordinates, when the mouse isn't down
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			// start the firework at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			fireworks.push( new Firework( cw / 2, ch, random( cw/10, 9 * cw/10 ), random( ch/10, ch / 2 ) ) );
			timerTick = 0;
		}
	} else {
		timerTick++;
	}
}

function year1Animation() {
	img = $("#my1YearImg")
	img.css("display","block")
	$("#myCanvas").css("position", "sticky")
	$(".container").addClass("FakeHover2");
	year1Loop()
}

function displayPhoto604(imgOffset){
   

    var img = document.getElementById("myImg");
    var imgURL = (imgOffset%5 +1) + ".jpg"
    imgURL = "images604/" + imgURL 
    img.src = imgURL;
    console.log(imgURL)
}



if (todayDateAnna.getDate() == 6 && todayDateAnna.getMonth() == 5) {
	//Faire l'image sticky
	window.onload = year1Animation;
} else if (todayDateAnna.getDate() == 6 && todayDateAnna.getMonth() == 3) {
	//Faire l'image sticky
	window.onload = displayPhoto604(imgOffset);
} if (todayDateAnna.getDate() == 6) {
	window.onload = loop;
}
