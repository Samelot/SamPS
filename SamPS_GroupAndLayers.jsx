//http://stackoverflow.com/questions/27255364/getting-selected-layer-or-group-layers-array-using-javascript-photoshop-cs4
//http://psscripts.tbitdesign.com/archive/viewtopic15052.php

var selLayers = getSelectedLayersIdx();
alert("finalized selected layers");
for(var l in selLayers) {
    alert(getLayerNameByIndex(selLayers[l]));
}

//duplicateToAll();

function duplicateToAll() {
    var curDoc = app.activeDocument;
    groupLayerset();
    var dupGroup = curDoc.activeLayer.duplicate(curDoc, ElementPlacement.PLACEATEND);
    ungroupLayerset();
    
    var i = 0;
    alert("finalized layers");
    for(var x = 0; x < dupGroup.layers.length; x++) {
        alert(x);
    }
    /*
    for (var x = 0; x < dupGroup.layers.length; x++) {
        dupGroup.layers[x].name = layerNames[i];
        i++;
        if(dupGroup.layers[x].typename == "LayerSet") {
            for(var y = 0; y < dupGroup.layers[x].artLayers.length; y++) {
                dupGroup.layers[x].artLayers[y].name = layerNames[i];
                i++;
            }
        }
    }
    */
    app.activeDocument.activeLayer = dupGroup;
    //dupGroup.name = "1";
    //ungroupLayerset();
/*
    var i = 0;
    for (var x = 0; x < dupGroup.layers.length; x++) {
        //dupGroup.layers[x].name = layerNames[i].name;
        i++;
        for(var y = 0; y < dupGroup.layers[x].artLayers.length; y++) {
            dupGroup.layers[x].artLayers.getByName(layerNames[i].name);
            dupGroup.layers[x].artLayers[y].name = layerNames[i].name;
            i++;
        }
    }
*/
}

function ungroupLayerset() {
    var m_Dsc01 = new ActionDescriptor();
    var m_Ref01 = new ActionReference();
    m_Ref01.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
    m_Dsc01.putReference(cTID("null"), m_Ref01);

    executeAction(sTID("ungroupLayersEvent"), m_Dsc01, DialogModes.NO);
}

function cTID(s) {
    return charIDToTypeID(s)
}

function sTID(s) {
    return stringIDToTypeID(s)
}

function groupLayerset() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(stringIDToTypeID('layerSection'));
    desc.putReference(charIDToTypeID('null'), ref);
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc.putReference(charIDToTypeID('From'), ref);

    executeAction(charIDToTypeID('Mk  '), desc, DialogModes.NO);
};

function getLayerNameByIndex(idx) {
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID("Lyr "), idx);
    return executeActionGet(ref).getString(charIDToTypeID("Nm  "));
}

function getSelectedLayersIdx() { // get the selected layers index( positon in layer editor)
    var selectedLayers = new Array;
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var desc = executeActionGet(ref);
    var add = 1;
    if (hasBackground()) {
        add = 0
    }
    if (desc.hasKey(stringIDToTypeID('targetLayers'))) {
        desc = desc.getList(stringIDToTypeID('targetLayers'));
        var c = desc.count
        var selectedLayers = new Array();

        /* check if LayerSet */
        var layerLength = [];
        for(var j = 0; j < app.activeDocument.layers.length; j++) {
            //alert(app.activeDocument.layers[j].typename + ", " + app.activeDocument.layers[j]);
            if(app.activeDocument.layers[j].typename == "LayerSet") {
                var z = 0;
                for(var x = 0; x < app.activeDocument.layers[j].artLayers.length; x++) {
                    z++;
                }
                //alert([app.activeDocument.layers[j], z]);
                layerLength.push([app.activeDocument.layers[j], z]);
            } else {
                //layerLength.push(app.activeDocument.layers[j]);
                //layerLength++;
            }
        }
        alert(layerLength.join("\n"));

        for (var i = 0; i < c; i++) {
            //alert("i: " + i +" and c: " + c);

            var loop_index = desc.getReference(i).getIndex()+add;
            
            var loop_ref = new ActionReference();
            loop_ref.putIndex(charIDToTypeID('Lyr '), loop_index);
            var loop_desc = executeActionGet(loop_ref);
            var loop_layerName = loop_desc.getString(charIDToTypeID('Nm  '));
            
            // are these needed?
            var loop_ls = loop_desc.getEnumerationValue(stringIDToTypeID("layerSection"));
            loop_ls = typeIDToStringID(loop_ls);
            
            
            var noMatch = true;
            for(var ls in layerLength) {
                //alert(loop_layerName + " , " + layerLength[ls][0]);
                if(layerLength[ls][1] <= 1) {
                    selectedLayers.push(loop_index);
                    noMatch = false;
                }
                if(loop_layerName.match(layerLength[ls][0].name)) {
                    selectedLayers.push(loop_index);
                    loop_index--;
                    for(var p = 0; p < layerLength[ls][1]; p++) {
                        selectedLayers.push(loop_index-p);
                    }
                }
                if(noMatch) {
                    return;
                }
            }
            /*
            if(app.activeDocument.layers[revIndex].typename == "LayerSet") {
                alert(app.activeDocument.layers[revIndex] + " is a LayerSet");
                selectedLayers.push(loop_index)
            } else {
                alert(app.activeDocument.layers[revIndex] + " is a ArtLayer");
                selectedLayers.push(loop_index);
            }
            */
        }
    } else {
        //alert("single layer or group selected");
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID('Prpr'), charIDToTypeID('ItmI'));
        ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
        srs = hasBackground() ? executeActionGet(ref).getInteger(charIDToTypeID('ItmI')) - 1 : executeActionGet(ref).getInteger(charIDToTypeID('ItmI'));
        selectedLayers.push(srs);
    }
    return selectedLayers;
}

function makeVisibleByIDX(idx) {
    var idShw = charIDToTypeID("Shw ");
    var desc34 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var list7 = new ActionList();
    var ref36 = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    ref36.putIndex(idLyr, idx);
    list7.putReference(ref36);
    desc34.putList(idnull, list7);
    executeAction(idShw, desc34, DialogModes.NO);
}

function hasBackground() { // function to check if there is a background layer
    var res = undefined;
    try {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("Nm  "));
        ref.putIndex(charIDToTypeID("Lyr "), 0);
        executeActionGet(ref).getString(charIDToTypeID("Nm  "));
        res = true;
    } catch (e) {
        res = false
    }
    return res;
}

