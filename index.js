const fs=require('fs');
const path=require('path');
const electron=require('electron');
//const HTML=require(path.join(__dirname,'HTML'));
var B;
var configuration={};
function PocketBORG(Module,File){
	this.Windows=[];
}




const { ipcMain, dialog } = require("electron");
electron.ipcMain.handle("Files",()=>{
	electron.dialog.showOpenDialog({properties:['openFile','multiSelections']}).then(R=>{B.Windows[0].webContents.send('Files',R.filePaths)});
});

/*PocketBORG.prototype.LoadConfiguration=function(File){
	// FINISH WRITING
	if(fs.existsSync(electron.app.getPath('userData')))try{configuration=JSON.parse(fs.readFileSync(electron.app.getPath('userData')))}catch{return false}
}*/
PocketBORG.prototype.NewWindow=function(Module,File){
	let window=new electron.BrowserWindow({webPreferences:{nodeIntegration:true,contextIsolation:false,enableRemoteModule:true,/*,preload:path.join(__dirname,'pocket.js')*/}});
	window.setMenuBarVisibility(false)
	window.loadFile('index.html');
	this.Windows.push(window);
}
PocketBORG.prototype.CloseWindow=function(Index){
	
}
PocketBORG.prototype.HelpWindow=function(Module,File){
	// MAKE HELP WINDOW BUTTON
	let W2=new electron.BrowserWindow({frame:false,width:300,height:160,webPreferences:{preload:path.join(__dirname,'preloadversions.js')}});
	W2.loadFile('version.html');
}
function Launch(){
	B=new PocketBORG();
	B.NewWindow();
}
electron.app.whenReady().then(Launch);
electron.app.on('window-all-closed',()=>{if(process.platform!=='darwin')electron.app.quit()});

// sweep: async functionality