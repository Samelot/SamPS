#target photoshop

// TO DO: prevent execution when layer is hidden
var doc = activeDocument;

var activeLayerName = doc.activeLayer.name;
var activeLayerType = doc.activeLayer.typename;

var frameNumber = null;
var nextFrame = 0;
var frameArrayIndex = 0;

var frames = new Array();
frames[0] = doc.activeLayer.name.split(/(\d+)/);

readLayers(doc);

function readLayers(doc) {
    // why global activeLayerType?
	if(activeLayerType == "ArtLayer") {
		for(var i = 0; i < doc.layers.length; i++) {

				var partsOfName = doc.layers[i].name.split(/(\d+)/);
				
                if(partsOfName.length == frames[0].length) {

                    var keyName = "";
                    var keyNum = null;
                    
                    for(var j = 0; j < partsOfName.length; j++) {
                        if(j != partsOfName.length-1) {
                            if(partsOfName[j] == frames[0][j]) {
                                keyName += partsOfName[j];
                            } 
                        } else {
                            if(partsOfName[j] != frames[0][j]) {
                                keyNum = partsOfName[j];
                                frameNumber = j;
                            }
                        } 
					}
                    
                    if(keyName) {
                        if(keyNum) {
                            frames.push(partsOfName);
                        }
                    } 
				}
		}	
	} else if (activeLayerType == "LayerSet") {
		
	}
}

curFrame = frames[0][frameNumber];
frames = frames.sort();

if(frames.length > 1) {
    for(var i=0; i < frames.length; i++) {
        // current layer
        if(frames[i][frameNumber] == curFrame) {
            doc.artLayers.getByName(frames[i].join("")).opacity = 50;
            frameArrayIndex = i;
        } else {
            doc.artLayers.getByName(frames[i].join("")).visible = 0;
        }
    }
    if(frameArrayIndex < (frames.length-1)) {
        nextFrame = frameArrayIndex + 1;	
    } else {
        nextFrame = 0;
    }
    doc.activeLayer = doc.artLayers.getByName(frames[nextFrame].join(""));
    doc.activeLayer.opacity = 100;
}
