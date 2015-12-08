var xy = "";
var el = "";

function loadURL(url, doneCallback) {
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", url, true);
    xhr.send();

    function handleStateChange() {
        if (xhr.readyState === 4) {
            doneCallback(xhr.status == 200 ? xhr.responseText : null);
        }
    }
}

function getData(callback){
	var returnedCount = 0;
	var xyURL = "res/xy00009.txt";
	var elURL = "res/el00009.txt";
	xyList = [];
	elList = [];
	var error = false;
	loadURL(xyURL, function(xy){
		if(xy === null){
			error = true;
			return;
		}
		xy = xy.split("\n");
		var coords;
		for(var i=1; i<xy.length; i++){
			coords = xy[i].trim();
			coords = coords.split(/ {1,}/);
			coords = coords.map(Number);
			if(coords.length == 3){
				xyList.push([coords[1], coords[2]]);
			}
		}
		returnedCount += 1;
		if(returnedCount == 2){
			callback(xyList, elList, error);
		}
	});
	loadURL(elURL, function(el){
		if(el === null){
			error = true;
			return;
		}
		el = el.split("\n");
		var coords;
		for(var i=1; i<el.length; i++){
			coords = el[i].trim().split(/ {1,}/);
			coords = coords.map(Number);
			if(coords.length == 4){
				elList.push(coords)
			}
		}
		returnedCount += 1;
		if(returnedCount == 2){
			callback(xyList, elList, error);
		}
	});
}

getData(function(a, b, c){
	console.log(a);
	console.log(b);
	console.log(c);
});
