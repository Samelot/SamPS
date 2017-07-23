var doc = app.activeDocument;
var targetLayer = doc.activeLayer;

var angles = calcRotationAngles(5);
for(var i = 0; i < angles.length; i++) {

    var dupLayer = targetLayer.duplicate(doc, ElementPlacement.PLACEATEND);
    dupLayer.name = "LayerStyleAngles"+i;
    doc.activeLayer = dupLayer;

    layerStyle(angles[i]);
}

function calcRotationAngles(num) {
    var rotDist = 360 / num;
    var thisRot = 180;
    var sign = 0;
    var angles = [];

    for(var i = 0; i < num; i++) {
        thisRot = thisRot - rotDist;
        /*
        if(Math.abs(thisRot) > 180) {
            var n = Math.abs(thisRot) - 180;
            //rotDist = rotDist*-1;
            if(!sign) {
                thisRot = 180 - n;
                sign = 1;
            } else {
                thisRot = 0 - n;
                sign = 0;
            }
        }
        */
        angles.push(thisRot);
    }
    return angles;
}

function layerStyle(thisRot) {

var idsetd = charIDToTypeID( "setd" );
    var desc38 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref27 = new ActionReference();
        var idPrpr = charIDToTypeID( "Prpr" );
        var idLefx = charIDToTypeID( "Lefx" );
        ref27.putProperty( idPrpr, idLefx );
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref27.putEnumerated( idLyr, idOrdn, idTrgt );
    desc38.putReference( idnull, ref27 );
    var idT = charIDToTypeID( "T   " );
        var desc39 = new ActionDescriptor();
        var idScl = charIDToTypeID( "Scl " );
        var idPrc = charIDToTypeID( "#Prc" );
        desc39.putUnitDouble( idScl, idPrc, 100.000000 );
        var idebbl = charIDToTypeID( "ebbl" );
            var desc40 = new ActionDescriptor();
            var idenab = charIDToTypeID( "enab" );
            desc40.putBoolean( idenab, true );
            var idhglM = charIDToTypeID( "hglM" );
            var idBlnM = charIDToTypeID( "BlnM" );
            var idNrml = charIDToTypeID( "Nrml" );
            desc40.putEnumerated( idhglM, idBlnM, idNrml );
            var idhglC = charIDToTypeID( "hglC" );
                var desc41 = new ActionDescriptor();
                var idRd = charIDToTypeID( "Rd  " );
                desc41.putDouble( idRd, 255.000000 );
                var idGrn = charIDToTypeID( "Grn " );
                desc41.putDouble( idGrn, 255.000000 );
                var idBl = charIDToTypeID( "Bl  " );
                desc41.putDouble( idBl, 255.000000 );
            var idRGBC = charIDToTypeID( "RGBC" );
            desc40.putObject( idhglC, idRGBC, desc41 );
            var idhglO = charIDToTypeID( "hglO" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc40.putUnitDouble( idhglO, idPrc, 0.000000 );
            var idsdwM = charIDToTypeID( "sdwM" );
            var idBlnM = charIDToTypeID( "BlnM" );
            var idSftL = charIDToTypeID( "SftL" );
            desc40.putEnumerated( idsdwM, idBlnM, idSftL );
            var idsdwC = charIDToTypeID( "sdwC" );
                var desc42 = new ActionDescriptor();
                var idRd = charIDToTypeID( "Rd  " );
                desc42.putDouble( idRd, 0.000000 );
                var idGrn = charIDToTypeID( "Grn " );
                desc42.putDouble( idGrn, 0.000000 );
                var idBl = charIDToTypeID( "Bl  " );
                desc42.putDouble( idBl, 0.000000 );
            var idRGBC = charIDToTypeID( "RGBC" );
            desc40.putObject( idsdwC, idRGBC, desc42 );
            var idsdwO = charIDToTypeID( "sdwO" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc40.putUnitDouble( idsdwO, idPrc, 57.000000 );
            var idbvlT = charIDToTypeID( "bvlT" );
            var idbvlT = charIDToTypeID( "bvlT" );
            var idSfBL = charIDToTypeID( "SfBL" );
            desc40.putEnumerated( idbvlT, idbvlT, idSfBL );
            var idbvlS = charIDToTypeID( "bvlS" );
            var idBESl = charIDToTypeID( "BESl" );
            var idOtrB = charIDToTypeID( "OtrB" );
            desc40.putEnumerated( idbvlS, idBESl, idOtrB );
            var iduglg = charIDToTypeID( "uglg" );
            desc40.putBoolean( iduglg, false );
            var idlagl = charIDToTypeID( "lagl" );
            var idAng = charIDToTypeID( "#Ang" );
            desc40.putUnitDouble( idlagl, idAng, thisRot );
            var idLald = charIDToTypeID( "Lald" );
            var idAng = charIDToTypeID( "#Ang" );
            desc40.putUnitDouble( idLald, idAng, 16.000000 );
            var idsrgR = charIDToTypeID( "srgR" );
            var idPrc = charIDToTypeID( "#Prc" );
            desc40.putUnitDouble( idsrgR, idPrc, 438.000000 );
            var idblur = charIDToTypeID( "blur" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc40.putUnitDouble( idblur, idPxl, 57.000000 );
            var idbvlD = charIDToTypeID( "bvlD" );
            var idBESs = charIDToTypeID( "BESs" );
            var idOut = charIDToTypeID( "Out " );
            desc40.putEnumerated( idbvlD, idBESs, idOut );
            var idTrnS = charIDToTypeID( "TrnS" );
                var desc43 = new ActionDescriptor();
                var idNm = charIDToTypeID( "Nm  " );
                desc43.putString( idNm, """Linear""" );
            var idShpC = charIDToTypeID( "ShpC" );
            desc40.putObject( idTrnS, idShpC, desc43 );
            var idantialiasGloss = stringIDToTypeID( "antialiasGloss" );
            desc40.putBoolean( idantialiasGloss, false );
            var idSftn = charIDToTypeID( "Sftn" );
            var idPxl = charIDToTypeID( "#Pxl" );
            desc40.putUnitDouble( idSftn, idPxl, 0.000000 );
            var iduseShape = stringIDToTypeID( "useShape" );
            desc40.putBoolean( iduseShape, false );
            var iduseTexture = stringIDToTypeID( "useTexture" );
            desc40.putBoolean( iduseTexture, false );
        var idebbl = charIDToTypeID( "ebbl" );
        desc39.putObject( idebbl, idebbl, desc40 );
    var idLefx = charIDToTypeID( "Lefx" );
    desc38.putObject( idT, idLefx, desc39 );
executeAction( idsetd, desc38, DialogModes.NO );
}
