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
	var xyURL = "/WinginIt/res/xy00009.txt";
	var elURL = "/WinginIt/res/el00009.txt";
	var xyList = [];
	var elList = [];
	var error = false;
	loadURL(xyURL, function(xy){
		if(xy === null){
			error = true;
			return;
		}
		xy = xy.split("\n");
		var coords;
		for(var i=1; i<xy.length; i++){
			coords = xy[i].trim().split(/\s*/g);
			xyList.push([coords[1], coords[2]])
		}
		console.log(xyList);
		returnedCount += 1;
		if(returnedCount == 2){
			callback(xyList, elList, error);
		}
	});
	loadURL(elURL, function(el){
		if(xy === null){
			error = true;
			return;
		}
		el = el.split("\n");
		var coords;
		for(var i=1; i<el.length; i++){
			coords = el[i].trim().split(/\s*/g);
			xyList.push(coords)
		}
		console.log(elList);
		returnedCount += 1;
		if(returnedCount == 2){
			callback(xyList, elList, error);
		}
	});
}
