var copies = 1;
var strand = "";
var growthCost = 2;
var copyRate = 1;

var showCopiesText = false;
var showStrandText = false;

function addBase(){
	if (showStrandText == false) {
		showStrandText = true;
		document.getElementById("state").innerHTML = "You are a strand of RNA.";
		document.getElementById("strandText").style.display="block";
	}
	rand = Math.floor(Math.random() * 4);
	if (rand == 0) {
		strand += "C";
	} else if (rand == 1) {
		strand += "G";
	} else if (rand == 2) {
		strand += "A";
	} else {
		strand += "U";
	};
	document.getElementById("strand").innerHTML = strand;
};

function clicked(number){
	if (showCopiesText == false) {
		showCopiesText = true;
		document.getElementById("copiesText").style.display="block";
		document.getElementById("growthText").style.display="block";
	};
	copies = copies + number;
	document.getElementById("copies").innerHTML = copies;
};

function grow(){
	if (copies >= growthCost){
		addBase();
		copies = 1;
		growthCost = growthCost + 1;
		document.getElementById("copies").innerHTML = copies;
		document.getElementById("growthCost").innerHTML = growthCost;
	};
};

function save(){
	var save = {
		copies: copies,
		strand: strand,
		growthCost: growthCost,
		copyRate: copyRate,
		showCopiesText: showCopiesText,
		showStrandText: showStrandText
	};
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	if (typeof savegame.copies !== "undefined") copies = savegame.copies;
	if (typeof savegame.strand !== "undefined") strand = savegame.strand;
	if (typeof savegame.growthCost !== "undefined") growthCost = savegame.growthCost;
	if (typeof savegame.copyRate !== "undefined") copyRate = savegame.copyRate;
	if (typeof savegame.showCopiesText !== "undefined") showCopiesText = savegame.showCopiesText;
	if (typeof savegame.showStrandText !== "undefined") showStrandText = savegame.showStrandText;
	
	document.getElementById("copies").innerHTML = copies;
	document.getElementById("strand").innerHTML = strand;
	document.getElementById("growthCost").innerHTML = growthCost;
	
	if (showCopiesText == false) {
		document.getElementById("copiesText").style.display="none";
		document.getElementById("growthText").style.display="none";
	} else {
		document.getElementById("copiesText").style.display="block";
		document.getElementById("growthText").style.display="block";
	};
	if (showStrandText == false) {
		document.getElementById("strandText").style.display="none";
		document.getElementById("state").innerHTML = "You are a single nucleotide.";
	} else {
		document.getElementById("strandText").style.display="block";
		document.getElementById("state").innerHTML = "You are a strand of RNA.";
	};
	
};

function deleteSave(){
	localStorage.removeItem("save");
};

window.setInterval(function(){
	if (copyRate > 0) {
		clicked(copyRate);
	};
}, 1000);