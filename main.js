var i = 0;
var n = 0;
var sheep = 0;
var hunting = false;
var building = false;
var huntWidth = 1
var nestWidth = 1
function startHunting(){
	hunting = true;
	building = false;
	var elem = document.getElementById("huntBar");
    var id = setInterval(frame, 10);
    function frame() {
	    if (hunting == false) {
			clearInterval(id);
		} else if (huntWidth >= 100) {
			huntWidth = 0;
			elem.style.huntWidth = huntWidth + "%";
			sheep += 1;
			document.getElementById("sheep").innerHTML = sheep;
		} else {
			huntWidth++;
			elem.style.width = huntWidth + "%";
		}
		//document.getElementById("test").innerHTML = huntWidth;
    }
}
function startBuilding(){
	hunting = false;
	building = true;
	var elem = document.getElementById("nestBar");
    var id = setInterval(frame, 80);
    function frame() {
	    if (building == false || nestWidth >= 100) {
			clearInterval(id);
		} else if (sheep > 0) {
			nestWidth++;
			elem.style.width = nestWidth + "%";
		}
		//document.getElementById("test").innerHTML = nestWidth;
    }
}
function pecksheep(interval) {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("huntBar");
    var width = 1;
    var id = setInterval(frame, interval);
    function frame() {
      if (width >= 100 || hunting == false) {
        clearInterval(id);
        i = 0;
		sheep += 1;
		document.getElementById("sheep").innerHTML = sheep;
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
	sheep -= 1;
	document.getElementById("sheep").innerHTML = sheep;
	if (sheep <= 0) {
		document.getElementById("tips").innerHTML = ("You are low on sheep. You're" +
		 																						 " not going to be able to do " +
																								 "much else until you get something to eat.");
	} else if (nestWidth >= 100) {
	  document.getElementById("tips").innerHTML = "You've built a nest! Now you have somewhere to sleep.";
	} else {
		document.getElementById("tips").innerHTML = "Every dragon needs a nest.";
	}
	/*if (hunting) {
		pecksheep(20);
	}
	if (building) {
		buildNest(80);
	}*/
}, 3000);

function save(){
	var save = {
		sheep: sheep,
		nestWidth: nestWidth
	};
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));

	if (typeof savegame.sheep !== "undefined") sheep = savegame.sheep;
  if (typeof savegame.nestWidth !== "undefined") nestWidth = savegame.nestWidth;

	document.getElementById("sheep").innerHTML = sheep;
	document.getElementById("nestBar").style.width = nestWidth + "%";
};

function deleteSave(){
	localStorage.removeItem("save");
};
