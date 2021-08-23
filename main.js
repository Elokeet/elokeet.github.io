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


function save(){
	var save = {
		numClicks: numClicks,
		automatics: automatics,
		autoCost: autoCost
	};
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.numClicks !== "undefined") numClicks = savegame.numClicks;
	if (typeof savegame.automatics !== "undefined") automatics = savegame.automatics;
	if (typeof savegame.autoCost !== "undefined") autoCost = savegame.autoCost;
	document.getElementById("clicks").innerHTML = numClicks;
	document.getElementById("automatics").innerHTML = automatics;
	document.getElementById("autoCost").innerHTML = autoCost;
};

function deleteSave(){
	localStorage.removeItem("save");
};

window.setInterval(function(){
	clicked(automatics)
}, 1000);