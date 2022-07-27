function MGUI(Element){
	this.Element=Element;
	this.States={};
	this.Actions={};
	this.Active=[];
	this.Locked=[];
	this.Keybinds=[{},{},{},{},{},{},{}];
	document.addEventListener('keyup',Event=>this.Ear(Event));
}
MGUI.prototype.Ear=function(Event){
	let i=0+Event.shiftKey?1:0+Event.altKey?2:0+Event.ctrlKey?4:0;
	if(Event.key in this.Keybinds[i])this.Keybinds[i][Event.key](Event);
}
MGUI.prototype.AddKeybind=function(Keybind,Function){
	let i=0+Keybind.includes('Shift')?1:0+Keybind.includes('Alt')?2:0+Keybind.includes('Control')?4:0;
	this.Keybinds[i][Keybind[0]]=Function;
}
MGUI.prototype.ClearKeybinds=function(){
	this.Keybinds=[{},{},{},{},{},{},{}];
}
MGUI.prototype.Draw=function(){
	this.Element.innerHTML='';//'<div id="Drag" class="Action"><div class="Action-Name" style="-webkit-app-region:drag">⮻</div><div class="Action-Name" onclick="window.close()" style="float:right">✕</div></div>';
	this.ClearKeybinds();
	for(let i=0,l=this.Active.length;i<l;i++){
		this.Element.appendChild(this.Active[i].Draw());
		if(this.Active[i].Keybind&&this.Active[i].Function)this.AddKeybind(this.Active[i].Keybind,this.Active[i].Function);
	}
}

MGUI.Action=function(Options){
	this.Name=typeof Options.Name=='string'?Options.Name:null;
	this.Symbol=typeof Options.Symbol=='string'?Options.Symbol:null;
	this.Description=typeof Options.Description=='string'?Options.Description:null;
	this.Keybind=Array.isArray(Options.Keybind)&&Options.Keybind.length>0?Options.Keybind:null;
	this.Function=typeof Options.Function=='function'?Options.Function:null;
	// Elements?
}
MGUI.Action.prototype.Draw=function(State){
	let html=`<div class="Action">`;
	if(this.Symbol)html+=`<img src="${this.Symbol}" class="Action-Symbol" />`;
	if(this.Name)html+=`<div class="Action-Name">${this.Name}</div>`;
	if(this.Keybind){
		html+=`<div class="Action-Keybind">`;
		for(let i=1,l=this.Keybind.length;i<l;i++)html+=`<div class="Action-Keybind-Key Action-Keybind-Control-Key">${this.Keybind[i]}</div>`;
		html+=`<div class="Action-Keybind-Key">${this.Keybind[0]}</div></div>`;
	}
	if(this.Description!==null)html+=`<div class="Action-Description">${this.Description}</>`;
	// Elements?
	html=html.trim();
	let temp=document.createElement('template');
	temp.innerHTML=html;
	let element=temp.content.firstChild;
	if(this.Function){
		element.addEventListener('click',this.Function);
		$(element).addClass('Button');
	}
	return element;
}
MGUI.prototype.Clear=function(Force){
	this.Active.forEach(E=>this.UnloadAction(E,Force));
}

MGUI.prototype.LoadAction=function(Action,Lock){
	if(!this.Active.includes(Action))this.Active.push(Action);
	if(Lock&&!this.Locked.includes(Action))this.Locked.push(Action);
	this.Draw();
}
MGUI.prototype.UnloadAction=function(Action,Force){
	if(Force&&this.Locked.includes(Action))this.Locked=this.Locked.filter(E=>E!=Action);
	if(!this.Locked.includes(Action))this.Active=this.Active.filter(E=>E!=Action);
	this.Draw();
}

MGUI.prototype.CreateState=function(Name){
	if(!(Name in this.States))this.States[Name]={};
}
MGUI.prototype.StateAction=function(State,Name,Action){
	if(State in this.States&&!(Name in this.States[State]))this.States[State][Name]=Action;
}
MGUI.prototype.RemoveState=function(State){
	delete this.States[State];
}
MGUI.prototype.LoadState=function(State){
	for(let i=0,o=Object.keys(this.States[State]),l=o.length;i<l;i++)this.LoadAction(this.States[State][o[i]]);
	this.Draw();
}
MGUI.prototype.UnloadState=function(State){
	for(let i=0,o=Object.keys(this.States[State]),l=o.length;i<l;i++)this.UnloadAction(this.States[State][o[i]]);
	this.Draw();
}
MGUI.prototype.Lock=function(Action){
	if(!this.Locked.includes(Action))this.Locked.push(Action);
}
MGUI.prototype.Unlock=function(Action){
	if(this.Locked.includes(Action))this.Locked=this.Locked.filter(E=>E!=Action);
}
MGUI.prototype.LockState=function(State){
	for(let i=0,o=Object.keys(this.States[State]),l=o.length;i<l;i++)if(!this.Locked.includes(this.States[State][o[i]]))this.Locked.push(this.States[State][o[i]]);
}
MGUI.prototype.UnlockState=function(State){
	let Actions=Object.values(this.States[State]);
	this.Locked=this.Locked.filter(E=>!Actions.includes(E));
}
MGUI.prototype.Elements={}
// check inputs (strings, Actions, ...)
// optimize using variables rather than evaluating positions/..., optimize all
// redefine to accomodate multiple languages in Names and Descriptions