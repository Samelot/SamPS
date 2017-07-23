var doc = app.activeDocument;
var myWidth = app.activeDocument.width;
var myHeight = app.activeDocument.height;

function saveForWeb(width, height, fileSuffix) {

          // Start point for single history item - so can undo whole script (to remove resizing)
          savedState = doc.activeHistoryState;

          // Resize   (work around as can't see how to do this in the ExportOptionsSaveForWeb option below?)
          doc.resizeImage(UnitValue(width,"px"),UnitValue(height,"px"),null,ResampleMethod.BICUBICSHARPER);


          // Save as Web
          // ISSUE: No Resolution/SizeOption here?
          var options = new ExportOptionsSaveForWeb();

          /* Read-write. Indicates the number of bits; true = 8, false = 24 (default: true).Valid only when format = SaveDocumentType.PNG. */

          options.format = SaveDocumentType.PNG;
          options.PNG8 = false;
          options.optimized = true;
          options.transparency = false;
          //options.dither = Dither.DIFFUSION;
          //options.ditherAmount = 88 //default: 100

          doc.exportDocument(File(doc.path+'/'+doc.name + fileSuffix + '.png'),  ExportType.SAVEFORWEB,  options);

          // Undo
          doc.activeHistoryState = savedState;

}

saveForWeb(myWidth,  myHeight,  "_web"  )
saveForWeb((myWidth/2), (myHeight/2),  "_webSmall")
