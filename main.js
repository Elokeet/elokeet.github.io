var sheep = 0;
var huntWidth = 0;
var nestWidth = 0;
var searchWidth = 0;
var currBar;
var activity;
var found = 0;
huntLevel = new Skill(7);
buildLevel = new Skill(0.2);
searchLevel = new Skill(0.5);

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

function mate() {
	if (searchWidth >= 100 && found == 1) {
		sheep = 0;
		huntWidth = 0;
		nestWidth = 0;
		searchWidth = 0;
		activity = "";
		found = 0;
		huntLevel = new Skill(7, 0, 0, 100, 1.1);
		buildLevel = new Skill(0.2, 0, 0, 100, 1.1);
		searchLevel = new Skill(0.5, 0, 0, 100, 1.1);
		document.getElementById("sheep").innerHTML = sheep;
		document.getElementById("huntBar").style.width = huntWidth + "%";
		document.getElementById("searchBar").style.width = searchWidth + "%";
		document.getElementById("nestBar").style.width = nestWidth + "%";
		document.getElementById("huntLevel").innerHTML = huntLevel.level;
		document.getElementById("searchLevel").innerHTML = searchLevel.level;
		document.getElementById("buildLevel").innerHTML = buildLevel.level;
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
	if (activity == "searching" && searchWidth < 100 && sheep > 0) {
		searchLevel.incExp();
		currLevel.innerHTML = searchLevel.level;
		searchWidth += searchLevel.speed;
		currBar.style.width = Math.min(searchWidth, 100) + "%";
	}
	if (activity == "building" && nestWidth < 100 && sheep > 0) {
		buildLevel.incExp();
		currLevel.innerHTML = buildLevel.level;
		nestWidth += buildLevel.speed;
		currBar.style.width = Math.min(nestWidth, 100) + "%";
	}
};

function update(){
	updateBar();
	sheep -= 1/20;
	if (sheep <= 0) {
		document.getElementById("sheep").innerHTML = 0;
		document.getElementById("tips").innerHTML = ("You're starving. You're" +
		" not going to be able to do " +
		"much else until you get something to eat.");
	} else {
		document.getElementById("sheep").innerHTML = Math.round(sheep);
		if (searchWidth < 100 && found == 0) {
			document.getElementById("tips").innerHTML = ("Every dragon needs a " +
			"nest. Let's start by looking for a good spot.");
		} else if (nestWidth < 100) {
			document.getElementById("tips").innerHTML = ("You've found a good " +
			"spot for the nest. Now let's build it.");
		}
		else if (nestWidth >= 100 && searchWidth >= 100 && found == 0) {
			document.getElementById("tips").innerHTML = ("You've built a nest! " +
			"Now you have somewhere to sleep. Now let's search for a mate.");
			searchWidth = 0;
			document.getElementById("searchBar").style.width = searchWidth + "%";
			found += 1;
		}
		else if (searchWidth >= 100 && found == 1) {
			document.getElementById("tips").innerHTML = ("You found a mate! " +
			"Mate to move on to a new generation.");
			document.getElementById("mate").style.display = "block";
		}
	}
};

window.setInterval(update, 50);
window.setInterval(save, 3000)

function save(){
	var save = {
		sheep: sheep,
		nestWidth: nestWidth,
		searchWidth: searchWidth,
		huntLevel: huntLevel,
		searchLevel: searchLevel,
		buildLevel: buildLevel,
		found: found
	};
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));

	if (typeof savegame.sheep !== "undefined") sheep = savegame.sheep;
	if (typeof savegame.nestWidth !== "undefined") nestWidth = savegame.nestWidth;
	if (typeof savegame.searchWidth !== "undefined") searchWidth = savegame.searchWidth;
	if (typeof savegame.huntLevel !== "undefined") huntLevel =
		Skill.fromJSON(savegame.huntLevel);
	if (typeof savegame.searchLevel !== "undefined") searchLevel =
		Skill.fromJSON(savegame.searchLevel);
	if (typeof savegame.buildLevel !== "undefined") buildLevel =
		Skill.fromJSON(savegame.buildLevel);
	if (typeof savegame.found !== "undefined") found = savegame.found;

	document.getElementById("sheep").innerHTML = sheep;
	document.getElementById("nestBar").style.width = nestWidth + "%";
	document.getElementById("searchBar").style.width = searchWidth + "%";
	document.getElementById("huntLevel").innerHTML = huntLevel.level;
	document.getElementById("searchLevel").innerHTML = searchLevel.level;
	document.getElementById("buildLevel").innerHTML = buildLevel.level;

};

function deleteSave(){
	localStorage.removeItem("save");
};
