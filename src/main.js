(function(window) {
	var data;
	var clipboard;
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		Utensil.URLLoader.load("resource/data/numeric_html_entities.json", onDataLoadComplete);

	}

	function textFile() {
		Utensil.URLLoader.load("resource/data/data.txt", onTextFileLoad);
	}

	function onTextFileLoad(t, x) {
		var lines = t.split("\n");
		var codes = [];
		for (var a = 0; a < lines.length; a++) {
			var line = lines[a];
			var arr = line.split("\t");
			var char = arr[0];
			var num = arr[2];
			codes.push([char, num]);
		}

	}

	function onDataLoadComplete(t, x) {

		data = eval("(" + t + ")");

		init();
		// textFile();
	}

	function init() {
		Utensil.addListener(document.getElementById('submit'), "click", onClick);
		Utensil.addListener(document.getElementById('clear'), "click", onClearClick);
		Utensil.addListener(document.getElementById('copy'), "click", ClipBoard);
		
	}
	
	function onClearClick(event) {
		document.getElementById("output").value = "";
		document.getElementById("input").value = "";
		document.getElementById("test").innerHTML = "";
	}

	function onClick() {
		var input = document.getElementById("input").value;
		input = replaceCopy(input);
		document.getElementById("output").value = input;
		document.getElementById("test").innerHTML = input;
		document.getElementById("output").setAttribute("data-clipboard-text", document.getElementById("output").value);
	}

	function ClipBoard() {
		document.getElementById("output").focus();
		document.getElementById("output").select();

		if (window.clipboardData && clipboardData.setData) {
			clipboardData.setData("Text", document.getElementById("output").value);
		}
	}

	function replaceCopy(input) {
		for (var a = 0; a < data.codes.length; a++) {
			var char = data.codes[a][0];
			var num = data.codes[a][1];
			input = input.split(char).join(num);
		}
		return input;
	}

	Main();
}
)(window);
