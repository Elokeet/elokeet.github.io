var sheep = 0;
var gold = 0;
var huntWidth = 0;
var buildWidth = 0;
var searchWidth = 0;
var hoardWidth = 0;
var currBar;
var activity;
var boost = 1.0;
var found = 0;
var multiplier = 1;
huntLevel = new Skill(7*multiplier);
searchLevel = new Skill(0.5*multiplier);
buildLevel = new Skill(0.2*multiplier);
hoardLevel = new Skill(0.15*multiplier);

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

function startHoarding(){
	if (buildWidth >= 100) {
		activity = "hoarding"
		currBar = document.getElementById("hoardBar");
		currLevel = document.getElementById("hoardLevel");
	}
}

function mate() {
	if (searchWidth >= 100 && found == 1) {
		boost = boost + (0.01*gold);
		sheep = 0;
		gold = 0;
		huntWidth = 0;
		buildWidth = 0;
		searchWidth = 0;
		hoardWidth = 0;
		activity = "";
		found = 0;
		huntLevel = new Skill(7, 0, 0, 100, boost);
		buildLevel = new Skill(0.2, 0, 0, 100, boost);
		searchLevel = new Skill(0.5, 0, 0, 100, boost);
		hoardLevel = new Skill(0.2, 0, 0, 100, boost);
		document.getElementById("sheep").innerHTML = sheep;
		document.getElementById("gold").innerHTML = "";
		document.getElementById("huntBar").style.width = huntWidth + "%";
		document.getElementById("searchBar").style.width = searchWidth + "%";
		document.getElementById("nestBar").style.width = buildWidth + "%";
		document.getElementById("hoardBar").style.width = hoardWidth + "%";
		document.getElementById("huntLevel").innerHTML = huntLevel.level;
		document.getElementById("searchLevel").innerHTML = searchLevel.level;
		document.getElementById("buildLevel").innerHTML = buildLevel.level;
		document.getElementById("hoardLevel").innerHTML = hoardLevel.level;
		document.getElementById("build").style.display = "none";
		document.getElementById("hoard").style.display = "none";
		document.getElementById("mate").style.display = "none";
		document.getElementById("boost").innerHTML = ("Your skills have a " +
		Math.round((boost-1)*100) + "% boost.");
	}
}

function updateBar() {
	if (activity == "hunting") {
		huntWidth += huntLevel.speed;
		huntLevel.incExp();
		currLevel.innerHTML = huntLevel.level;
		if (huntWidth >= 100) {
			huntWidth -= 100;
			sheep += 1;
			document.getElementById("sheep").innerHTML = sheep;
		}
		currBar.style.width = huntWidth + "%";
	} else if (activity == "searching" && searchWidth < 100 && sheep > 0) {
		searchLevel.incExp();
		currLevel.innerHTML = searchLevel.level;
		searchWidth += searchLevel.speed;
		currBar.style.width = Math.min(searchWidth, 100) + "%";
	} else if (activity == "building" && buildWidth < 100 && sheep > 0) {
		buildLevel.incExp();
		currLevel.innerHTML = buildLevel.level;
		buildWidth += buildLevel.speed;
		currBar.style.width = Math.min(buildWidth, 100) + "%";
	} else if (activity == "hoarding" && buildWidth >= 100) {
		hoardLevel.incExp();
		currLevel.innerHTML = hoardLevel.level;
		hoardWidth += hoardLevel.speed*Math.pow(0.9, gold);
		if (hoardWidth >= 100) {
			hoardWidth -= 100
			gold += 1;
			document.getElementById("gold").innerHTML = "and " + gold + " gold";
		}
		currBar.style.width = hoardWidth + "%";
	}
};

function updateMessage() {
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
		} else if (buildWidth < 100) {
			document.getElementById("tips").innerHTML = ("You've found a good " +
			"spot for the nest. Now let's build it.");
			document.getElementById("build").style.display = "flex";
		} else if (buildWidth >= 100 && searchWidth >= 100 && found == 0) {
			searchWidth = 0;
			document.getElementById("searchBar").style.width = searchWidth + "%";
			document.getElementById("hoard").style.display = "flex";
			found += 1;
		} else if (searchWidth < 100 && found == 1) {
			document.getElementById("tips").innerHTML = ("You've built a nest! " +
			"Now you have somewhere to sleep. Now let's search for a mate. " +
			"You can also start gathering gold for your hoard.");
		} else if (searchWidth >= 100 && found == 1) {
			document.getElementById("tips").innerHTML = ("You found a mate! " +
			"Mate to move on to a new generation. Each gold piece you have " +
			"will give your offspring a 1% boost to their skills.");
			document.getElementById("mate").style.display = "flex";
		}
	}
}

function update(){
	updateBar();
	sheep -= 1/20;
	updateMessage();
};

//load();
window.setInterval(update, 50);
window.setInterval(save, 5000);

function save(){
	var save = {
		sheep: sheep,
		gold: gold,
		buildWidth: buildWidth,
		searchWidth: searchWidth,
		huntLevel: huntLevel,
		searchLevel: searchLevel,
		buildLevel: buildLevel,
		hoardLevel: hoardLevel,
		found: found,
		boost:boost
	};
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));

	if (typeof savegame.sheep !== "undefined") sheep = savegame.sheep;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.boost !== "undefined") boost = savegame.boost;
	if (typeof savegame.buildWidth !== "undefined") buildWidth = savegame.buildWidth;
	if (typeof savegame.searchWidth !== "undefined") searchWidth = savegame.searchWidth;
	if (typeof savegame.huntLevel !== "undefined") huntLevel =
		Skill.fromJSON(savegame.huntLevel);
	if (typeof savegame.searchLevel !== "undefined") searchLevel =
		Skill.fromJSON(savegame.searchLevel);
	if (typeof savegame.buildLevel !== "undefined") buildLevel =
		Skill.fromJSON(savegame.buildLevel);
	if (typeof savegame.hoardLevel !== "undefined") hoardLevel =
		Skill.fromJSON(savegame.hoardLevel);
	if (typeof savegame.found !== "undefined") found = savegame.found;

	document.getElementById("sheep").innerHTML = sheep;
	if (gold > 0) {
		document.getElementById("gold").innerHTML = "and " + gold + " gold";
	}
	document.getElementById("nestBar").style.width = buildWidth + "%";
	document.getElementById("searchBar").style.width = searchWidth + "%";
	document.getElementById("huntLevel").innerHTML = huntLevel.level;
	document.getElementById("searchLevel").innerHTML = searchLevel.level;
	document.getElementById("buildLevel").innerHTML = buildLevel.level;
	if (boost > 1) {
		document.getElementById("boost").innerHTML = ("Your skills have a " +
		Math.round((boost-1)*100) + "% boost.");
	}

	updateMessage();
	if (searchWidth >= 100 && found == 1) {
		document.getElementById("build").style.display = "flex";
		document.getElementById("hoard").style.display = "flex";
		document.getElementById("mate").style.display = "flex";
	} else if (found == 1) {
		document.getElementById("build").style.display = "flex";
		document.getElementById("hoard").style.display = "flex";
	} else if (searchWidth >= 100) {
		document.getElementById("build").style.display = "flex";
	}

};

function deleteSave(){
	localStorage.removeItem("save");
};
