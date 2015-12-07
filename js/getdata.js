var xy = "";
var el = "";

function loadData(done){
	//The function is a bit more complex because JS loads are async, not sync
	var xyURL = "https://raw.githubusercontent.com/StegmanKauferLabs/WinginIt/gh-pages/res/xy00009.txt";
	var elURL = "https://raw.githubusercontent.com/StegmanKauferLabs/WinginIt/gh-pages/res/el00009.txt";
	var xyFile = new XMLHttpRequest();
	var elFile = new XMLHttpRequest();
    xyFile.open("GET", xyURL, false);
    elFile.open("GET", elURL, false);
    loadCount = 0;
    xyFile.onreadystatechange = function (){ //async
		if(xyFile.readyState === 4 && (xyFile.status === 200 || xyFile.status == 0)){
            xy = xyFile.responseText;
            loadCount += 1;
            if(loadCount == 2){ //have both been loaded?
            	done();
            }
        }
    }
    elFile.onreadystatechange = function (){ //async
		if(elFile.readyState === 4 && (elFile.status === 200 || elFile.status == 0)){
            el = elFile.responseText;
            loadCount += 1;
            if(loadCount == 2){ //have both been loaded?
            	done();
            }
        }
    }
    xyFile.send(null);
    elFile.send(null);
}

var onLoad = function(){
	console.log("Loaded", xy, " ", el);
}

loadData(onLoad);
