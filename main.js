var sheep = 0;
var sheepRate = 0.03;
var gold = 0;
var books = 0;
var huntWidth = 0;
var buildWidth = 0;
var searchWidth = 0;
var hoardWidth = 0;
var findWidth = 0;
var currBar;
var activity;
var speedBonus = 2.0;
var expBonus = 1.0;
var hungerBonus = 1.0;
var found = 0;
var hiddenMates = ["purple", "red", "green"];
var foundMates = [];
huntLevel = new Skill(7);
searchLevel = new Skill(0.5);
buildLevel = new Skill(0.2);
hoardLevel = new Skill(0.15);
findLevel = new Skill(0.1);

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

function startFinding(){
	activity = "finding"
	currBar = document.getElementById("findBar");
	currLevel = document.getElementById("findLevel");
}

function mate(color) {
	if (found >= 2 && confirm("Warning: mating will " +
		"reset your game. You get bonuses to your next life based on the " +
		"gold you have collected.") == true) {
		if (color == 'purple') {
			speedBonus += 0.05*gold;
		} else if (color == 'red') {
			expBonus += 0.05*gold;
		} else if (color == 'green') {
			hungerBonus = Math.max(hungerBonus - 0.05*gold, 0.1);
		}
		sheep = 0;
		sheepRate = 0.03;
		gold = 0;
		huntWidth = 0;
		buildWidth = 0;
		searchWidth = 0;
		hoardWidth = 0;
		findWidth = 0;
		activity = "";
		found = 0;
		hiddenMates = ["purple", "red", "green"];
		document.getElementById("matingTab").style.display = "none";
		document.getElementById("purple").style.display = "none";
		document.getElementById("red").style.display = "none";
		document.getElementById("green").style.display = "none";
		huntLevel = new Skill(7, 0, 0, 100);
		buildLevel = new Skill(0.2, 0, 0, 100);
		searchLevel = new Skill(0.5, 0, 0, 100);
		hoardLevel = new Skill(0.15, 0, 0, 100);
		findLevel = new Skill(0.1, 0, 0, 100);
		document.getElementById("sheep").innerHTML = sheep;
		document.getElementById("gold").innerHTML = "";
		document.getElementById("huntBar").style.width = huntWidth + "%";
		document.getElementById("searchBar").style.width = searchWidth + "%";
		document.getElementById("nestBar").style.width = buildWidth + "%";
		document.getElementById("hoardBar").style.width = hoardWidth + "%";
		document.getElementById("findBar").style.width = hoardWidth + "%";
		document.getElementById("huntLevel").innerHTML = huntLevel.level;
		document.getElementById("searchLevel").innerHTML = searchLevel.level;
		document.getElementById("buildLevel").innerHTML = buildLevel.level;
		document.getElementById("hoardLevel").innerHTML = hoardLevel.level;
		document.getElementById("findLevel").innerHTML = hoardLevel.level;
		document.getElementById("build").style.display = "none";
		document.getElementById("hoard").style.display = "none";
		document.getElementById("find").style.display = "none";
		document.getElementById("boost").innerHTML = ("Your skills have a " +
		Math.round((speedBonus-1)*100) + "% speed boost and a " +
		Math.round((expBonus-1)*100) + "% experience boost. Your hunger " +
	 	"increases " + Math.round((1-hungerBonus)*100) + "% slower.");
		document.getElementById("defaultOpen").click();
	}
}

function updateBar() {
	if (activity == "hunting") {
		huntWidth += speedBonus*huntLevel.speed;
		huntLevel.incExp(expBonus);
		currLevel.innerHTML = huntLevel.level;
		if (huntWidth >= 100) {
			huntWidth -= 100;
			sheep += 1;
			document.getElementById("sheep").innerHTML = sheep;
		}
		currBar.style.width = huntWidth + "%";
	} else if (activity == "searching" && searchWidth < 100 && sheep > 0) {
		searchLevel.incExp(expBonus);
		currLevel.innerHTML = searchLevel.level;
		searchWidth += speedBonus*searchLevel.speed;
		currBar.style.width = Math.min(searchWidth, 100) + "%";
	} else if (activity == "building" && buildWidth < 100 && sheep > 0) {
		buildLevel.incExp(expBonus);
		currLevel.innerHTML = buildLevel.level;
		buildWidth += speedBonus*buildLevel.speed;
		currBar.style.width = Math.min(buildWidth, 100) + "%";
	} else if (activity == "hoarding" && buildWidth >= 100) {
		hoardLevel.incExp(expBonus);
		currLevel.innerHTML = hoardLevel.level;
		hoardWidth += speedBonus*hoardLevel.speed*Math.pow(0.9, gold);
		if (hoardWidth >= 100) {
			hoardWidth -= 100
			gold += 1;
			document.getElementById("gold").innerHTML = "and " + gold + " gold";
		}
		currBar.style.width = hoardWidth + "%";
	} else if (activity == "finding") {
		findLevel.incExp(expBonus);
		currLevel = findLevel.level;
		findWidth += speedBonus*findLevel.speed;
		if (findWidth >= 100) {
			findWidth -= 100
			books += 1;
			document.getElementById("books").innerHTML = " and " + books + " books";
		}
		currBar.style.width = Math.min(findWidth, 100) + "%";
	}
};

function updateMessage() {
	document.getElementById("sheep").innerHTML = sheep;
	document.getElementById("hunger").innerHTML = sheepRate.toPrecision(3);
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
			"You can also start gathering gold for your hoard. Gold gives " +
			"your next generation bonuses.");
		} else if (searchWidth >= 100 && found >= 1 && hiddenMates.length > 0) {
			document.getElementById("tips").innerHTML = ("You found a mate! " +
			"Mate to move on to a new generation. There are still more mates to be found.");
			document.getElementById("matingTab").style.display = "flex";
			searchWidth = 0;
			found += 1;
			var index = Math.floor(Math.random() * hiddenMates.length);
			var toAdd = hiddenMates.splice(index, 1)[0];
			foundMates.push(toAdd);
			document.getElementById(toAdd).style.display = "flex";
		} else if (found > 1 && hiddenMates.length > 0) {
			document.getElementById("tips").innerHTML = ("You found a mate! " +
			"Mate to move on to a new generation. There are still more mates to be found.");
		} else if (hiddenMates.length == 0) {
			document.getElementById("tips").innerHTML = ("You found a mate! " +
			"Mate to move on to a new generation.");
		}
		if (gold >= 5) {
			document.getElementById("tips").innerHTML = ("Now that you have some " +
			"gold, you start thinking about other things you can collect.");
			document.getElementById("find").style.display = "flex";
		}
	}
}

function update(){
	updateBar();
	sheep -= sheepRate;
	sheepRate += 0.000005*hungerBonus;
	sheep = Math.max(sheep, -10);
	updateMessage();
};

//load();
document.getElementById("defaultOpen").click();
setInterval(update, 50);
//setInterval(save, 5000);

function save(){
	var save = {
		sheep: sheep,
		sheepRate: sheepRate,
		gold: gold,
		books: books,
		huntWidth: huntWidth,
		buildWidth: buildWidth,
		searchWidth: searchWidth,
		hoardWidth: hoardWidth,
		huntLevel: huntLevel,
		searchLevel: searchLevel,
		buildLevel: buildLevel,
		hoardLevel: hoardLevel,
		findLevel: findLevel,
		found: found,
		speedBonus: speedBonus,
		expBonus: expBonus,
		hungerBonus: hungerBonus,
		hiddenMates: hiddenMates,
		foundMates: foundMates
	};
	localStorage.setItem("save",JSON.stringify(save));
};

function load(){
	var savegame = JSON.parse(localStorage.getItem("save"));

	if (typeof savegame.sheep !== "undefined") sheep = savegame.sheep;
	if (typeof savegame.sheepRate !== "undefined") sheepRate = savegame.sheepRate;
	if (typeof savegame.gold !== "undefined") gold = savegame.gold;
	if (typeof savegame.books !== "undefined") books = savegame.books;
	if (typeof savegame.speedBonus !== "undefined") speedBonus = savegame.speedBonus;
	if (typeof savegame.expBonus !== "undefined") expBonus = savegame.expBonus;
	if (typeof savegame.hungerBonus !== "undefined") hungerBonus = savegame.hungerBonus;
	if (typeof savegame.huntWidth !== "undefined") huntWidth = savegame.huntWidth;
	if (typeof savegame.searchWidth !== "undefined") searchWidth = savegame.searchWidth;
	if (typeof savegame.buildWidth !== "undefined") buildWidth = savegame.buildWidth;
	if (typeof savegame.hoardWidth !== "undefined") hoardWidth = savegame.hoardWidth;
	if (typeof savegame.huntLevel !== "undefined") huntLevel =
		Skill.fromJSON(savegame.huntLevel);
	if (typeof savegame.searchLevel !== "undefined") searchLevel =
		Skill.fromJSON(savegame.searchLevel);
	if (typeof savegame.buildLevel !== "undefined") buildLevel =
		Skill.fromJSON(savegame.buildLevel);
	if (typeof savegame.hoardLevel !== "undefined") hoardLevel =
		Skill.fromJSON(savegame.hoardLevel);
	if (typeof savegame.findLevel !== "undefined") findLevel =
		Skill.fromJSON(savegame.findLevel);
	if (typeof savegame.found !== "undefined") found = savegame.found;
	if (typeof savegame.hiddenMates !== "undefined") hiddenMates = savegame.hiddenMates;
	if (typeof savegame.foundMates !== "undefined") foundMates = savegame.foundMates;

	document.getElementById("sheep").innerHTML = sheep;
	if (gold > 0) {
		document.getElementById("gold").innerHTML = "and " + gold + " gold";
	} if (books > 0) {
		document.getElementById("books").innerHTML = " and " + books + " books";
	}

	document.getElementById("huntBar").style.width = huntWidth + "%";
	document.getElementById("searchBar").style.width = searchWidth + "%";
	document.getElementById("nestBar").style.width = buildWidth + "%";
	document.getElementById("hoardBar").style.width = hoardWidth + "%";
	document.getElementById("findBar").style.width = findWidth + "%";
	document.getElementById("huntLevel").innerHTML = huntLevel.level;
	document.getElementById("searchLevel").innerHTML = searchLevel.level;
	document.getElementById("buildLevel").innerHTML = buildLevel.level;
	document.getElementById("hoardLevel").innerHTML = hoardLevel.level;
	document.getElementById("findLevel").innerHTML = findLevel.level;
	if (speedBonus > 1 || expBonus > 1 || hungerBonus < 1) {
		document.getElementById("boost").innerHTML = ("Your skills have a " +
		Math.round((speedBonus-1)*100) + "% speed boost and a " +
		Math.round((expBonus-1)*100) + "% experience boost. Your hunger " +
	 	"increases " + Math.round((1-hungerBonus)*100) + "% slower.");
	}

	updateMessage();
	if (found > 1) {
		document.getElementById("build").style.display = "flex";
		document.getElementById("hoard").style.display = "flex";
		document.getElementById("matingTab").style.display = "flex";
		for (i = 0; i < foundMates.length; i++) {
	      document.getElementById(foundMates[i]).style.display = "flex";
	    }

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

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
