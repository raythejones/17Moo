var box = document.getElementById("box");
var boxHeight = box.offsetHeight;
var boxWidth = box.offsetWidth;

var hue = 49;
var sat = 100;
var light = 46; //range 0-46 (dark to light)

//hardcode target as center
//randomize later
var targetX = Math.floor(Math.random() * boxWidth);
var targetY = Math.floor(Math.random() * boxHeight);


console.log( "box height: " + boxHeight );
console.log( "box width: " + boxWidth );

//calculate distance between current mouse pos and target
var distance = function (x0, y0, x1, y1) {
    return ( (((x1-x0)**2) + ((y1-y0)**2) )**0.5);
};


var findIt = function(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var dist = distance(targetX, targetY, mouseX, mouseY);

    var ratio = (farCorner() - dist) / farCorner();
    box.style.backgroundColor = "hsl("+hue+", "+sat+"%, "+(46*ratio**2)+"%)";
};

var foundIt = function(e){
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    var dist = distance(targetX, targetY, mouseX, mouseY);

    if (dist < 20){
	box.style.backgroundColor = "hsl(84, 100%, 43.7%)";
    }
}

var farCorner = function(){
    var nw = [0,0];
    var ne = [0, boxWidth];
    var se = [boxHeight,boxWidth];
    var sw = [boxHeight,0];
    var corners = [nw, ne, se, sw]
    var cornerDist = [0,0,0,0];

    for(var x in corners){
	cornerDist[x] = distance(targetX, targetY, corners[x][0], corners[x][1])
    }
    return Math.max(cornerDist[0], cornerDist[1], cornerDist[2], cornerDist[3]);
}

box.addEventListener("mousemove", findIt);
box.addEventListener("click", foundIt);

