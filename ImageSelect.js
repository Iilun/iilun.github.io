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


var togetherDate = new Date(Date.UTC(2022, 6, 7, 22, 0, 0));
var todayDate = new Date()
const todayDateAnna = convertTZ(todayDate, "Europe/Paris")
var departureDate = new Date(Date.UTC(2022, 1, 14, 21, 0, 0));


// To calculate the time difference of two dates
var beforeTogetherTime = - todayDate.getTime() + togetherDate.getTime();
  
// To calculate the no. of days between two dates
var beforeTogether = Math.trunc(beforeTogetherTime / (1000 * 3600 * 24)) - offset;

var alreadyDoneTime = - departureDate.getTime() + todayDate.getTime();
  
// To calculate the no. of days between two dates
var alreadyDone = Math.trunc(alreadyDoneTime / (1000 * 3600 * 24)) - offset;

var totalToDoTime = - departureDate.getTime() + togetherDate.getTime();
// To calculate the no. of days between two dates
var totalToDo = Math.trunc(totalToDoTime / (1000 * 3600 * 24)) - offset;

//calcul du pourcentage
var alreadyDonePercent = alreadyDone/totalToDo

//creation du message
var toDisplay =""

//debut du message
toDisplay = toDisplay + "Plus que " + beforeTogether + " jours avant d'être ensemble. " 

//messages conditionnels
if (alreadyDone >= beforeTogether) {
    toDisplay = toDisplay + "On en a déja fait " + alreadyDone.days +". "
}
toDisplay = toDisplay + Math.fraction(alreadyDonePercent,10) + " a déjà été fait, ca passe vite en vrai"
if (beforeTogether.days <= 10){
    toDisplay = toDisplay + " AAAAAAAAAAAAH SI PROCHE\nClique ici : http://testanna.getenjoyment.net "
}


//affichage
var text = document.getElementById("myText");
text.innerHTML = toDisplay;
//barre de progression
var i = 0;
function move(percentageValue) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 100);
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

    //choix de l'image - modification de l'image
    var nbImages = 40
    var imageSelectionnee = Math.floor(rand() * (nbImages+1)) + 1;

    //choix de l'image
    var imgURL = "images/" + imageSelectionnee +".jpg"
    console.log(imgURL)

    var img = document.getElementById("myImg");
    img.src = imgURL;
}

var imgOffset =""
displayPhoto(imgOffset)

$(window).on('load', function() {
    move(alreadyDonePercent)
});

$(document).on("click", "a", function(e){
    //e.preventDefault();
    imgOffset = imgOffset + 1
    displayPhoto(imgOffset)
});

