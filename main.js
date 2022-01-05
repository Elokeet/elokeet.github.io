var i = 0;
var n = 0;
var seeds = 0;
var pecking = false;
var building = false;
var seedWidth = 1
var nestWidth = 1
function startPecking(){
	pecking = true;
	building = false;
	var elem = document.getElementById("seedBar");
    var id = setInterval(frame, 20);
    function frame() {
	    if (pecking == false) {
			clearInterval(id);
		}
		else if (seedWidth >= 100) {
			seedWidth = 0;
			elem.style.seedWidth = seedWidth + "%";
			seeds += 1;
			document.getElementById("seeds").innerHTML = seeds;
		} else {
			seedWidth++;
			elem.style.width = seedWidth + "%";
		}
		document.getElementById("test").innerHTML = seedWidth;
    }
}
function startBuilding(){
	pecking = false;
	building = true;
	var elem = document.getElementById("nestBar");
    var id = setInterval(frame, 80);
    function frame() {
	    if (building == false || nestWidth >= 100) {
			clearInterval(id);
		} else {
			nestWidth++;
			elem.style.width = nestWidth + "%";
		}
		document.getElementById("test").innerHTML = nestWidth;
    }
}
function peckSeeds(interval) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("seedBar");
    var width = 1;
    var id = setInterval(frame, interval);
    function frame() {
      if (width >= 100 || pecking == false) {
        clearInterval(id);
        i = 0;
		seeds += 1;
		document.getElementById("seeds").innerHTML = seeds;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
function buildNest(interval) {
  if (n == 0) {
    n = 1;
    var elem = document.getElementById("nestBar");
    var width = 1;
    var id = setInterval(frame, interval);
    function frame() {
      if (width >= 100 || building == false) {
        clearInterval(id);
      } else {
        width++;
		elem.style.width = width + "%";
      } 
    }
  }
}
window.setInterval(function(){
	/*if (pecking) {
		peckSeeds(20);
	}
	if (building) {
		buildNest(80);
	}*/
}, 1000);

/*var copies = 1;
var strand = "";
var growthCost = 2;
var copyRate = 0;
var ribozymeCost = 3;
var ribozymes = 0;
const round18 = "GGAAAAAGACAAAUCUGCCCUCAGAGCUUGAGAACAUCUUCGGAUGCAGAGGAGGCAGCCUCCGGUGGCGCGAUAGCGCCAACGUUCUCAACAGGCGCCCAAUACUCCCGCUUCGGCGGGUGGGGAUAACACCUGACGAAAAGGCGAUGUUAGACACGCCAAGGUCAUAAUCCCCGGAGCUUCGGCUCC";

var showCopiesText = false;
var showStrandText = false;
var showRibozymeText = false;

function addBase(){
	if (showStrandText == false) {
		showStrandText = true;
		document.getElementById("state").innerHTML = "You are a strand of RNA.";
		document.getElementById("strandText").style.display="block";
	};
	
	if (strand.length < round18.length) {
		strand += round18.charAt(strand.length);
		if (strand.length == round18.length) {
			round18Created();
		};
	};
	/*
	if (strand.length == 2) {
		showRibozymeText = true;
		document.getElementById("ribozymeText").style.display="block";
	};
	
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

function round18Created() {
	document.getElementById("round18Text").style.display="block";
};

function addRibozyme() {
	if (copies >= ribozymeCost) {
		copies = copies - ribozymeCost;
		copyRate = copyRate + 1;
		ribozymes = ribozymes + 1;
		ribozymeCost = ribozymeCost + 3;
		document.getElementById("copies").innerHTML = copies;
		document.getElementById("ribozymeCost").innerHTML = ribozymeCost;
		document.getElementById("ribozymes").innerHTML = ribozymes;
	};
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
*/

function save(){
	var save = {
		seeds: seeds
	};
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));
	
	if (typeof savegame.seeds !== "undefined") seeds = savegame.seeds;
	
	document.getElementById("seeds").innerHTML = seeds;	
};

function deleteSave(){
	localStorage.removeItem("save");
};
