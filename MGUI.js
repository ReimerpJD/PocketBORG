function MGUI(Element){
	this.Element=Element;
	this.States={};
	this.Actions={};
	this.Active=[];
	this.Locked=[];
}
MGUI.prototype.Draw=function(){
	this.Element.innerHTML='';
	for(let i=0,l=this.Active.length;i<l;i++)this.Element.appendChild(this.Active[i].Draw());
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
		for(let i=0,l=this.Keybind.length;i<l;i++)html+=`<div class="Action-Keybind-Key">${this.Keybind[i]}</div>`;
		html+='</div>';
		// load keybind into document here?? or later??
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
	for(let i=0,l=this.Active.length;i<l;i++)this.UnloadAction(this.Active[i],Force);
	this.Draw();
}

MGUI.prototype.LoadAction=function(Action,Lock){
	if(!this.Active.includes(Action))this.Active.push(Action);
	if(Lock&&!this.Locked.includes(Action))this.Locked.push(Action);
	this.Draw();
}
MGUI.prototype.UnloadAction=function(Action,Force){
	if(Force&&this.Locked.includes(Action))this.Locked=this.Locked.filter(E=>E!=Action);
	if(this.Locked.includes(Action))this.Active=this.Active.filter(E=>E!=Action);
	this.Draw();
}

MGUI.prototype.CreateState=function(Name){
	if(!(Name in this.States))this.States[Name]=[];
}
MGUI.prototype.StateAction=function(State,Action){
	if(this.States[State]&&!this.State.includes(Action))this.States[State].push(Action);
}
MGUI.prototype.RemoveState=function(State){
	delete this.States[State];
}
MGUI.prototype.LoadState=function(State){
	for(let i=0,l=this.States[State].length;i<l;i++)this.LoadAction(this.States[State]);
	this.Draw();
}
MGUI.prototype.UnloadState=function(State){
	for(let i=0,l=this.States[State].length;i<l;i++)this.UnloadAction(this.States[State]);
	this.Draw();
}

MGUI.prototype.Lock=function(Action){
	if(!this.Active.includes(Action))return;
	if(!this.Locked.includes(Action))this.Locked.push(Action);
}
MGUI.prototype.Elements={}
// check inputs (strings, Actions, ...)
// optimize using variables rather than evaluating positions/..., optimize all
// redefine to accomodate multiple languages in Names and Descriptions