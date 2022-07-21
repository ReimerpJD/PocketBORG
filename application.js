var GUI;
function init(){
	GUI=new MGUI(document.getElementById('ActionPanel'));
	GUI.StoreAction('NewFile',new MGUI.Action({Name:'New File',Keybind:['ctrl','n'],Function:NewFile}));
	GUI.StoreAction('OpenFile',new MGUI.Action({Name:'Open File',Keybind:['ctrl','o'],Function:OpenFile}));
	GUI.StoreAction('Bookmarks',new MGUI.Action({Name:'Bookmarks',Function:Bookmarks}));
	GUI.StoreAction('SaveFile',new MGUI.Action({Name:'Save',Keybind:['ctrl','s'],Function:SaveFile}));
	GUI.StoreAction('BookmarkFile',new MGUI.Action({Name:'Bookmark',Function:BookmarkFile}));
	GUI.StoreAction('DeleteFile',new MGUI.Action({Name:'Delete',Keybind:['ctrl','d'],Function:DeleteFile}));
	GUI.StoreAction('Files',new MGUI.Action({Name:'Opened Files',Function:Files}));
	GUI.StoreAction('Configuration',new MGUI.Action({Name:'Configuration',Function:Configuration}));
	GUI.StoreAction('Modules',new MGUI.Action({Name:'Modules',Function:Modules}));
	GUI.StoreAction('Fullscreen',new MGUI.Action({Name:'Fullscreen',Keybind:['ctrl','f'],Function:Fullscreen}));
	GUI.LoadAction('NewFile');
	GUI.LoadAction('OpenFile');
	GUI.LoadAction('Bookmarks');
	GUI.LoadAction('SaveFile');
	GUI.LoadAction('BookmarkFile');
	GUI.LoadAction('DeleteFile');
	GUI.LoadAction('Files');
	GUI.LoadAction('Configuration');
	GUI.LoadAction('Modules');
	GUI.LoadAction('Fullscreen');
}

function NewFile(){};
function OpenFile(){};
function Bookmarks(){};

function SaveFile(){};
function BookmarkFile(){};
function CloseFile(){};
function DeleteFile(){};

function Files(){};

function Configuration(){};
function Modules(){};
function Fullscreen(){};