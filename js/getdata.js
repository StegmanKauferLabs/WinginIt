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
	loadURL(xyURL, function(xy){
		if(xy === null){
			console.log("ERROR");
			return;
		}
		console.log(xy);
		returnedCount += 1;
		if(returnedCount == 2){
			callback();
		}
	});
	loadURL(elURL, function(el){
		if(xy === null){
			console.log("ERROR");
			return;
		}
		console.log(el);
		returnedCount += 1;
		if(returnedCount == 2){
			callback();
		}
	});
}
