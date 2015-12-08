var el = document.getElementById("content")

var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

var verticesArray


var zui = new ZUI(two);
zui.addLimits(0.5, 400);

two.renderer.domElement.onmousewheel = function(e){
	e.stopPropagation();
	e.preventDefault();

	var dy = (e.wheelDeltaY || - e.deltaY) / 1000;

	zui.zoomBy(dy, e.clientX, e.clientY);

	var newLineWidth = 1 / zui.scale

	for(var i = 0; i < shapes.length; i++){
		shapes[i].linewidth = newLineWidth
	}

	for(var i = 0; i < lines.length; i++){
		shapes[i].linewidth = newLineWidth
	}

	two.update()
}

var mouseDown = false

var widthRatio = two.renderer.domElement.width 

two.renderer.domElement.onmousedown = function(e){
	mouseDown = true
}

two.renderer.domElement.onmouseup = function(e){
	mouseDown = false
}

two.renderer.domElement.onmousemove = function(e){
	if(!mouseDown)
		return

	var dx = e.movementX / zui.scale
	var dy = e.movementY / zui.scale

	shiftScene(dx, dy)
}

two.appendTo(el);
two.update();

var fillColor = "#3498db"
var lineColor = "#34495e"

var innerEdgeLineColor = "#16a085"

var outerEdgeLineColor = "#d35400"


/*


xyArray is an array in the form of
[
	[x1, y1],
	[x2, y2],
	[x3, y3]
]

serializeVertices returns an array of Two.Anchor objects

*/

function serializeVertices(xyArray){

	var vertices = []

	xyArray.forEach(function(e, i){
		vertices.push(new Two.Anchor(e[0] + two.width / 2, e[1] + two.height / 2))
	})

	return vertices

}

var shapes = []
var lines = []

function shiftScene(x, y){
	for(var i = 0; i < two.scene.children.length; i++){
	var el = two.scene.children[i]
		for(var j = 0; j < el.vertices.length; j++){
			el.vertices[j].addSelf(new Two.Anchor(x, y))
		}

	}
}

function drawShapes(xyArray, shapeVerticesArray){
	for(var i = 0; i < shapeVerticesArray.length; i++){
		var vertices = []
		var shapeVerticesIndices = shapeVerticesArray[i]

		var strokeColor = lineColor

		for(var j = 0; j < shapeVerticesIndices.length; j++){

			var index = shapeVerticesIndices[j]
			if(index < 0){
				if(index == -1)
					strokeColor = innerEdgeLineColor
				else
					strokeColor = outerEdgeLineColor
				continue;//weird case, I forget what happens, but we do something weird
			}

			vertices.push(xyArray[index])
		}

		var shapePath

		var pushArray

		if(vertices.length != 4){//it's an edge or something
			shapePath = new Two.Path(vertices, false, false)
			pushArray = lines
		} else {
			shapePath = new Two.Path(vertices, true, false)
			shapePath.fill = fillColor;
			pushArray = shapes
		}
		
		shapePath.stroke = strokeColor;
		shapePath.neighboringShapeIndices = shapeVerticesIndices
		two.add(shapePath)
		pushArray.push(shapePath)
	}
}

getData(function(xyArray, shapeVerticesArray){
	console.log("DEBUG")
	console.log(xyArray)
	verticesArray = serializeVertices(xyArray)

	drawShapes(verticesArray, shapeVerticesArray)
});