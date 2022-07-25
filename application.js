const path=require('path');
const electron=require('electron')
const DC=require(path.join(__dirname,'DocumentCreator'));
var Modules=[DC];
var GUI;
function init(){
	GUI=new MGUI(document.getElementById('ActionPanel'));
	GUI.CreateState('Main');
	GUI.StateAction('Main','NewFile',new MGUI.Action({Name:'New File',Keybind:['ctrl','n'],Function:NewFile}));
	GUI.StateAction('Main','OpenFile',new MGUI.Action({Name:'Open File',Keybind:['ctrl','o'],Function:OpenFile}));
	GUI.StateAction('Main','Bookmarks',new MGUI.Action({Name:'Bookmarks',Function:Bookmarks}));
	GUI.StateAction('Main','SaveFile',new MGUI.Action({Name:'Save',Keybind:['ctrl','s'],Function:SaveFile}));
	GUI.StateAction('Main','BookmarkFile',new MGUI.Action({Name:'Bookmark',Function:BookmarkFile}));
	GUI.StateAction('Main','DeleteFile',new MGUI.Action({Name:'Delete',Keybind:['ctrl','d'],Function:DeleteFile}));
	GUI.StateAction('Main','Files',new MGUI.Action({Name:'Opened Files',Function:Files}));
	GUI.StateAction('Main','Configuration',new MGUI.Action({Name:'Configuration',Function:Configuration}));
	GUI.StateAction('Main','Modules',new MGUI.Action({Name:'Modules',Function:Mods}));
	GUI.StateAction('Main','Fullscreen',new MGUI.Action({Name:'Fullscreen',Keybind:['ctrl','f'],Function:Fullscreen}));
	GUI.LoadState('Main');
	GUI.LockState('Main');
}

function NewFile(){}; // submit name/location, pick module and init
function OpenFile(){}; // open gui, on select pick module ?
function Bookmarks(){}; // open bookmarks in MGUI

function SaveFile(){}; // from DtF to OS/FS
function BookmarkFile(){}; // save to user configuration file (if present)
function CloseFile(){}; // remove instance from modules list
function DeleteFile(){}; // path to OS list

function Files(){}; // list open files in MGUI

function Configuration(){};
function Mods(){};
function Fullscreen(){};