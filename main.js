var i = 0;
var n = 0;
var sheep = 0;
var hunting = false;
var building = false;
var huntWidth = 0;
var nestWidth = 0;
var searchWidth = 0;
var currBar;
var activity;
huntLevel = new Skill(7);
buildLevel = new Skill(0.5);
searchLevel = new Skill(1);

function startHunting(){
	activity = "hunting"
	currBar = document.getElementById("huntBar");
	currLevel = document.getElementById("huntLevel");
}

function startSearching(){
	activity = "searching"
	currBar = document.getElementById("searchBar");
	currLevel = document.getElementById("searchLevel");
}

function startBuilding(){
	if (searchWidth >= 100) {
		activity = "building"
		currBar = document.getElementById("nestBar");
		currLevel = document.getElementById("buildLevel");
	}
}

function updateBar() {
	if (activity == "hunting") {
		huntWidth += huntLevel.speed;
		huntLevel.incExp();
		currLevel.innerHTML = huntLevel.level;
		if (huntWidth >= 100) {
			huntWidth -= 100;
			currBar.style.huntWidth = huntWidth + "%";
			sheep += 1;
			document.getElementById("sheep").innerHTML = sheep;
		} else {
			currBar.style.width = huntWidth + "%";
		}
	}
	if (activity == "searching") {
		searchLevel.incExp();
		currLevel.innerHTML = searchLevel.level;
		if (searchWidth < 100 && sheep > 0) {
			searchWidth += searchLevel.speed;
			currBar.style.width = Math.min(searchWidth, 100) + "%";
		}
	}
	if (activity == "building") {
		buildLevel.incExp();
		currLevel.innerHTML = buildLevel.level;
		if (nestWidth < 100 && sheep > 0) {
			nestWidth += buildLevel.speed;
			currBar.style.width = Math.min(nestWidth, 100) + "%";
		}
	}
};

function update(){
	updateBar();
	sheep -= 1/20;
	if (sheep <= 0) {
		document.getElementById("sheep").innerHTML = 0;
		document.getElementById("tips").innerHTML = ("You are low on sheep. You're" +
		" not going to be able to do " +
		"much else until you get something to eat.");
	} else {
		document.getElementById("sheep").innerHTML = Math.round(sheep);
		if (searchWidth < 100) {
			document.getElementById("tips").innerHTML = ("Every dragon needs a " +
			"nest. Let's start by looking for a good spot.");
		} else if (nestWidth < 100) {
			document.getElementById("tips").innerHTML = ("You've found a good " +
			"spot for the nest. Now let's build it.");
		}
		else {
			document.getElementById("tips").innerHTML = ("You've built a nest! " +
			"Now you have somewhere to sleep.");
		}
	}
};

window.setInterval(update, 50);

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
