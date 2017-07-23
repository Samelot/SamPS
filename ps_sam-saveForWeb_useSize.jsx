// 2014, use it at your own risk;
#target photoshop;
if (app.documents.length > 0) {
// define sizes;
var theWidths = [1500, 500, 150];
// set to pixels;
var originalRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS
// the doc;
var myDocument = app.activeDocument;
// getting the name and location;
var docName = myDocument.name;
var basename = docName.match(/(.*)\.[^\.]+$/)[1];
//getting the location;
var docPath = myDocument.path;
//////
var theDup = myDocument.duplicate("copy", true);
var theWidth = theDup.width;
// work through array;
for (var m = 0; m < theWidths.length; m++) {
// resize;
theDup.resizeImage(theWidths[m], undefined, 72, ResampleMethod.BICUBIC);
// save png;
savePNG (theDup, docPath, basename, "_"+String(theWidths[m]));
theDup.activeHistoryState = theDup.historyStates[0]
};
theDup.close(SaveOptions.DONOTSAVECHANGES);
// reset;
app.preferences.rulerUnits = originalRulerUnits;
};
////// function to png //////
function savePNG (myDocument, docPath, basename, theSuffix) {
// weboptions;
var webOptions = new ExportOptionsSaveForWeb();
webOptions.format = SaveDocumentType.PNG;
webOptions.PNG8 = false;
webOptions.transparency = true;
webOptions.interlaced = 0;
webOptions.includeProfile = false;
webOptions.optimized = true;
myDocument.exportDocument(new File(docPath+"/"+basename+theSuffix+".png"), ExportType.SAVEFORWEB, webOptions);
};
