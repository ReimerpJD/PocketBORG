const path=require('path');
const electron=require('electron');
const DC=require(path.join(__dirname,'DocumentCreator'));
var Modules=[DC]; // list from import
var GUI;
function init(){
	GUI=new MGUI(document.getElementById('ActionPanel'));
	GUI.CreateState('Main');
	GUI.StateAction('Main','File',new MGUI.Action({Name:'File',Keybind:['F','Control','Shift'],Function:()=>{GUI.Clear();GUI.LoadState('File')}}));
	GUI.StateAction('Main','Configuration',new MGUI.Action({Name:'Configuration',Keybind:['C','Control','Shift'],Function:()=>{GUI.Clear();GUI.LoadState('Configuration')}}));
	GUI.LoadState('Main');
	//GUI.LockState('Main');
	
	GUI.CreateState('File');
	GUI.StateAction('File','Main',new MGUI.Action({Name:'Previous Menu',Keybind:['Escape'],Function:()=>{GUI.Clear();GUI.LoadState('Main')}}));
	GUI.StateAction('File','NewFile',new MGUI.Action({Name:'New File',Keybind:['n','Control'],Function:NewFile}));
	GUI.StateAction('File','OpenFile',new MGUI.Action({Name:'Open File',Keybind:['o','Control'],Function:OpenFile}));
	GUI.StateAction('File','Bookmarks',new MGUI.Action({Name:'Bookmarks',Function:OpenBookmarks}));
	
	GUI.CreateState('Configuration');
	GUI.StateAction('Configuration','Main',new MGUI.Action({Name:'Previous Menu',Keybind:['Escape'],Function:()=>{GUI.Clear();GUI.LoadState('Main')}}));
	GUI.StateAction('Configuration','Modules',new MGUI.Action({Name:'Modules',Function:Mods}));
	GUI.StateAction('Configuration','Bookmarks',new MGUI.Action({Name:'Bookmarks',EditBookmarks}));
	
	GUI.CreateState('FileOpen');
	GUI.StateAction('FileOpen','Main',new MGUI.Action({Name:'Previous Menu',Keybind:['Escape'],Function:()=>{GUI.Clear();GUI.LoadState('Main')}}));
	GUI.StateAction('FileOpen','SaveFile',new MGUI.Action({Name:'Save',Keybind:['s','Control'],Function:SaveFile}));
	GUI.StateAction('FileOpen','BookmarkFile',new MGUI.Action({Name:'Bookmark',Function:BookmarkFile}));
	GUI.StateAction('FileOpen','CloseFile',new MGUI.Action({Name:'Close File',Keybind:['d','Control'],Function:CloseFile}));
	GUI.StateAction('FileOpen','DeleteFile',new MGUI.Action({Name:'Delete',Keybind:['d','Control'],Function:DeleteFile}));
}

function ConfigurationMenu(){};

function NewFile(){}; // submit name/location, pick module and init
async function OpenFile(){
	electron.ipcRenderer.invoke("Files");
}; // open gui, on select pick module ?
electron.ipcRenderer.on("Files",(Event,Files)=>{console.log(Files)});

function OpenBookmarks(){}

function Mods(){};
function EditBookmarks(){}

function SaveFile(){}; // from DtF to OS/FS
function BookmarkFile(){}; // save to user configuration file (if present)
function CloseFile(){}; // remove instance from modules list
function DeleteFile(){}; // path to OS list

function ListFiles(){}; // list open files in MGUI