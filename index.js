const fs=require('fs');
const path=require('path');
const electron=require('electron');
const version=require(path.join(__dirname,'version'));
process.env.VERSION=version;
function init(){
	let w=new electron.BrowserWindow({webPreferences:{nodeIntegration:true,contextIsolation:false,enableRemoteModule:true/*,preload:path.join(__dirname,'pocket.js')*/}});
	w.setMenuBarVisibility(false);
	w.loadFile('index.html');
}
electron.ipcMain.handle("Files",(Event)=>{
	electron.dialog.showOpenDialog({properties:['openFile','multiSelections'],filters:[{name:'PocketBORG file',extensions:['pborg']}]}).then(R=>{electron.BrowserWindow.fromId(Event.frameId).webContents.send('Files',R.filePaths)});
});
electron.ipcMain.handle("SaveAs",(Event)=>{
	electron.dialog.showSaveDialog().then(R=>{electron.BrowserWindow.fromId(Event.frameId).webContents.send('SaveAs',R)});
});
/*electron.ipcMain.handle("version",(Event)=>{
	electron.BrowserWindow.fromId(Event.frameId).webContents.send('version',version);
});*/
electron.ipcMain.handle("Help",()=>{
	let w=new electron.BrowserWindow({frame:false,width:300,height:160,webPreferences:{preload:path.join(__dirname,'preloadversions.js')}});
	w.loadFile('version.html');
});
electron.app.on('window-all-closed',()=>{if(process.platform!=='darwin')electron.app.quit()});
electron.app.whenReady().then(init);