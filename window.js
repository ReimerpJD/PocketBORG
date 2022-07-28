const fs=require('fs');
const path=require('path');
const electron=require('electron');
var API;
const DC=require(path.join(__dirname,'DocumentCreator')); // remove once complete
function WindowAPI(Workspace,Panel){
	this.Workspace=Workspace;
	this.Modules=[DC];
	this.Opened=[];
	this.Active=false;
	this.GUI=new MGUI(Panel);
	
	this.GUI.CreateState('Main');
	this.GUI.StateAction('Main','File',new MGUI.Action({Name:'File',Keybind:['F','Control','Shift'],Function:()=>{this.GUI.Clear();this.GUI.LoadState('File')}}));
	this.GUI.StateAction('Main','Configuration',new MGUI.Action({Name:'Configuration',Keybind:['C','Control','Shift'],Function:()=>{this.GUI.Clear();this.GUI.LoadState('Configuration')}}));
	this.GUI.LoadState('Main');
	
	this.GUI.CreateState('File');
	this.GUI.StateAction('File','Main',new MGUI.Action({Name:'Previous Menu',Keybind:['Escape'],Function:()=>{this.GUI.Clear();this.GUI.LoadState('Main')}}));
	this.GUI.StateAction('File','NewFile',new MGUI.Action({Name:'New File',Keybind:['n','Control'],Function:()=>this.NewFile()}));
	this.GUI.StateAction('File','OpenFile',new MGUI.Action({Name:'Open File',Keybind:['o','Control'],Function:()=>{electron.ipcRenderer.invoke("Files")}}));
	this.GUI.StateAction('File','Bookmarks',new MGUI.Action({Name:'Bookmarks',Function:()=>this.OpenBookmarks()}));
	
	this.GUI.CreateState('Configuration');
	this.GUI.StateAction('Configuration','Main',new MGUI.Action({Name:'Previous Menu',Keybind:['Escape'],Function:()=>{this.GUI.Clear();this.GUI.LoadState('Main')}}));
	this.GUI.StateAction('Configuration','Modules',new MGUI.Action({Name:'Modules',Function:()=>this.Mods()}));
	this.GUI.StateAction('Configuration','Bookmarks',new MGUI.Action({Name:'Bookmarks',Function:()=>this.EditBookmarks()}));
	
	this.GUI.CreateState('FileOpen');
	this.GUI.StateAction('FileOpen','SaveFile',new MGUI.Action({Name:'Save',Keybind:['s','Control'],Function:()=>this.SaveFile()}));
	
	this.GUI.StateAction('FileOpen','SaveFileAs',new MGUI.Action({Name:'Save As',Keybind:['s','Control','Alt'],Function:()=>{electron.ipcRenderer.invoke("SaveAs")}}));// save as (get new path)
	
	this.GUI.StateAction('FileOpen','BookmarkFile',new MGUI.Action({Name:'Bookmark',Function:()=>this.BookmarkFile()}));
	this.GUI.StateAction('FileOpen','CloseFile',new MGUI.Action({Name:'Close File',Keybind:['x','Control','Alt'],Function:()=>this.CloseFile()}));
	this.GUI.StateAction('FileOpen','DeleteFile',new MGUI.Action({Name:'Delete',Keybind:['d','Control'],Function:()=>this.DeleteFile()}));
}
WindowAPI.prototype.Draw=function(){
	if(!this.Active&&this.Opened.length==0){
		this.Workspace.innerHTML='';
		this.GUI.UnloadState('FileOpen');
		return;
	}
	if(!this.Active&&this.Opened.length>0)this.Active=this.Opened[0];
	this.Workspace.innerHTML=this.Active.Draw();
	this.GUI.UnloadState('FileOpen');
	this.GUI.LoadState('FileOpen');
}
WindowAPI.prototype.NewFile=function(){
	// select module
	// new instance
	// open and draw
}
WindowAPI.prototype.OpenFiles=function(Files){
	if(!Array.isArray(Files))return; // report err
	for(let i=0,l=Files.length;i<l;i++)try{
		if(this.Opened.some(E=>typeof E=='object'&&E!==null&&E.File==Files[i]))continue;
		let Data=fs.readFileSync(Files[i]).toString('utf8').split('\n').filter(E=>E.length>0).map(E=>{return JSON.parse(E)});
		let Matches=this.Modules.filter(E=>E.Name==Data[0].Module&&E.MID==Data[0].MID&&E.Version[0]==Data[0].Version[0]&&E.Version[1]==Data[0].Version[1]);
		let Match=Matches.length>0?Matches.reduce((P,E)=>{return E.Version[2]>P.Version[2]?E:P}):false;
		if(Match)this.Opened.push(new Match.Mitose(Files[i],Data));
		else throw false; // report err
	}catch{continue} // report err
	this.Active=this.Opened.length>0?this.Opened[this.Opened.length-1]:false;
	this.Draw();
}
WindowAPI.prototype.OpenBookmarks=function(){}
WindowAPI.prototype.Mods=function(){}
WindowAPI.prototype.EditBookmarks=function(){}
WindowAPI.prototype.SaveFile=function(){
	if(!this.Active.File)return electron.ipcRenderer.invoke("SaveAs");
	fs.writeFileSync(this.Active.File,this.Active.DtF());
}
WindowAPI.prototype.SaveAs=function(R){
	if(R.canceled)return;
	if(R.filePath.substring(R.filePath.length-6)!='.pborg'&&R.filePath.substring(R.filePath.length-6)!='.PBORG')R.filePath+='.pborg';
	this.Active.File=R.filePath;
	this.SaveFile();
}
WindowAPI.prototype.BookmarkFile=function(){}
WindowAPI.prototype.CloseFile=function(){
	this.Opened=this.Opened.filter(E=>E!=this.Active);
	this.Active=false;
	this.Draw();
}
WindowAPI.prototype.DeleteFile=function(){
	if(window.confirm('Delete current file?')){
		fs.unlinkSync(this.Active.File);
		this.CloseFile();
	}
}
WindowAPI.prototype.ListFiles=function(){}
function init(){
	API=new WindowAPI(document.getElementById('Workspace'),document.getElementById('ActionPanel'));
	electron.ipcRenderer.on("Files",(e,f)=>API.OpenFiles(f));
	electron.ipcRenderer.on("SaveAs",(e,f)=>API.SaveAs(f));
}