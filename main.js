var numClicks = 0;
var automatics = 0;
var autoCost = 2;

function clicked(number){
	numClicks = numClicks + number;
	document.getElementById("clicks").innerHTML = numClicks;
};

function automate(){
	if (numClicks >= autoCost){
		automatics = automatics + 1;
		numClicks = numClicks - autoCost;
		autoCost = autoCost + 1;
		document.getElementById("clicks").innerHTML = numClicks;
		document.getElementById("automatics").innerHTML = automatics;
		document.getElementById("autoCost").innerHTML = autoCost;
	};
};

window.setInterval(function(){
	clicked(automatics)
}, 1000);