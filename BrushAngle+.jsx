/*
Brush Features(Diameter,Hardness,Angle,Roundness,Spacing,Flipy,Flipx) 
      Diameter  range 1 to 5000
      Hardness  range 0 to 100
      Angle     range 0 to + or - 180
      Roundness range 1 to 100
      Spacing   range 1 to 1000
      Flipy     range 0 or 1 false or true 
      Flipx     range 0 or 1 false or true
*/
try {
    var features = getBrushFeatures ();
/*  var Diameter = features[0];
    var Hardness = features[1];
    var Angle = features[2];
    var Roundness = features[3];
    var Spacing = features[4];
    var Flipy = features[5];
    var Flipx = features[6]; */
    
    var Angle = features[2];
    Angle = Angle+5;
    if (Angle >= 180) Angle = -180;
    features[2] = Angle;

    //setBrushFeatures (Diameter,Hardness,Angle,Roundness,Spacing,Flipy,Flipx)
    setBrushFeatures ( features[0], features[1], features[2], features[3], features[4], features[5], features[6] );
    }
catch(e) { alert(" set Brush features failed make sure you have a round tip brush active"); }

//==============================================================================================//
function getBrushFeatures (){
    //A Brush tool must be the current tool
    if (!app.toolSupportsBrushes(app.currentTool)) selectBrush();  //CC 2014
    var ref = new ActionReference();  
    ref.putEnumerated( charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );  
    var appDesc = executeActionGet(ref);  
    var toolDesc = appDesc.getObjectValue(stringIDToTypeID('currentToolOptions'));  
    var brushDesc = toolDesc.getObjectValue(stringIDToTypeID('brush'));
    var currDiameter = brushDesc.getDouble(stringIDToTypeID('diameter'));  
    var currHardness = brushDesc.getDouble(stringIDToTypeID('hardness'));  
    var currAngle = brushDesc.getDouble(stringIDToTypeID('angle'));  
    var currRoundness = brushDesc.getDouble(stringIDToTypeID('roundness'));  
    var currSpacing = brushDesc.getDouble(stringIDToTypeID('spacing'));  
    var currFlipy = brushDesc.getBoolean(stringIDToTypeID('flipY'));  
    var currFlipx = brushDesc.getBoolean(stringIDToTypeID('flipX'));    
    var currentFeatures = new Array( currDiameter, currHardness, currAngle, currRoundness, currSpacing, currFlipy, currFlipx );
    return currentFeatures
}

function setBrushFeatures (Diameter,Hardness,Angle,Roundness,Spacing,Flipy,Flipx) {  
    var desc = new ActionDescriptor();  
    var ref = new ActionReference();  
    ref.putEnumerated( charIDToTypeID( "Brsh" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );  
    desc.putReference( charIDToTypeID( "null" ), ref );  
    var desc1 = new ActionDescriptor();  
    desc1.putDouble(stringIDToTypeID('diameter'), Diameter);  
    desc1.putDouble(stringIDToTypeID('hardness'), Hardness);  
    desc1.putDouble(stringIDToTypeID('angle'), Angle);  
    desc1.putDouble(stringIDToTypeID('roundness'), Roundness);  
    desc1.putUnitDouble( stringIDToTypeID('spacing'), charIDToTypeID('#Prc'), Spacing);  
    desc1.putBoolean(stringIDToTypeID('flipY'), Flipy);  
    desc1.putBoolean(stringIDToTypeID('flipX'), Flipx);  
    desc.putObject( stringIDToTypeID('to'), charIDToTypeID( "Brsh" ), desc1 );  
    executeAction( charIDToTypeID( "setd" ), desc, DialogModes.NO );  
}
 
function selectBrush() {
    //select brush scriptlistener code
    var idslct = charIDToTypeID( "slct" );
        var desc12 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref8 = new ActionReference();
            var idPbTl = charIDToTypeID( "PbTl" );
            ref8.putClass( idPbTl );
        desc12.putReference( idnull, ref8 );
    executeAction( idslct, desc12, DialogModes.NO );
}
   