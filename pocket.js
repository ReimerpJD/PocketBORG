const path=require('path');
const electron=require('electron')
const documentcreator=require(path.join(__dirname,'DocumentCreator'));
electron.contextBridge.exposeInMainWorld('Modules',[documentcreator]);