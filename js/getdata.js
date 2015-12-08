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

function getBorderCount(list1, list2){
	var count = 0;
	for(var i=0; i<list1.length; i++){
		if(list2.indexOf(list1[i]) != -1){
			count += 1;
		}
	}
	return count;
}

function isLine(list){
	for(var i=0; i<list.length; i++){
		if(list[i] < 0){
			return true;
		}
	}
	return false;
}

function getBordering(elList, a, b, c, d){
	var current = 0;
	var bordering = [];
	for(var i=0; i<elList.length; i++){
		var isShape = !isLine(elList[i]);
		var borderCount = getBorderCount([a, b, c, d], elList[i]);
		if(isShape && borderCount >= 2 && borderCount < 4){
			bordering.push(current);
		}
		if(isShape){
			current += 1;
		}
	}
	return bordering;
}
