function B(MID,Name,V1,V2,V3){
	this.MID=MID;
	this.Name=Name;
	if(!Number.isInteger(V1))V1=0;
	if(!Number.isInteger(V2))V2=0;
	if(!Number.isInteger(V3))V3=0;
	this.Version=[V1,V2,V3];
}
B.prototype.Input=function(Name,Validator,Draw){
	if(typeof Name!='string')throw new Error('required input [Name] must be a string');
	if(typeof Validator!='function')throw new Error('required input [Validator] must be a function');
	if(Draw&&typeof Draw!='function')throw new Error('optional input [Draw] must be a function');
	this.Mitose.prototype.Input[Name]=function(Parent,Value){Parent.Parent.Input.call(this,Parent,Value)}
	this.Mitose.prototype.Input[Name].prototype=Object.create(this.Mitose.prototype.Input.prototype);
	this.Mitose.prototype.Input[Name].prototype.constructor=this.Mitose.prototype.Input[Name];
	this.Mitose.prototype.Input[Name].prototype.Name=Name;
	this.Mitose.prototype.Input[Name].prototype.Validate=Validator;
	this.Mitose.prototype.Input[Name].prototype.Draw=Draw;
}
B.prototype.Type=function(Options,Required,Name,Draw){
	if((typeof Options!='object'||Options===null)||!Object.keys(Options).every(E=>Options[E]in this.Mitose.prototype.Input))throw new Error('required input [Options] must be an object containing unique names (keys) and strings (values) referencing registered Inputs');
	if(!Array.isArray(Required)||!Required.every(E=>E in Options))throw new Error('required input [Required] must be an array containing the names of keys in the [Options] input (it can be an empty array)');
	if(Draw&&typeof Draw!='function')throw new Error('optional input [Draw] must be a function');
	if(Name){
		this.Mitose.prototype.Type[Name]=function(Parent,Options){Parent.Type.call(this,Parent,Options)}
		this.Mitose.prototype.Type[Name].prototype=Object.create(this.Mitose.prototype.Type.prototype);
		this.Mitose.prototype.Type[Name].prototype.constructor=this.Mitose.prototype.Type[Name];
		this.Mitose.prototype.Type[Name].prototype.Name=Name;
		this.Mitose.prototype.Type[Name].prototype.Required=Required;
		if(Draw)this.Mitose.prototype.Type[Name].prototype.Draw=Draw;
		this.Mitose.prototype.Type[Name].prototype.Inputs={};
		for(let i=0,o=Object.keys(Options),l=o.length;i<l;i++)this.Mitose.prototype.Type[Name].prototype.Inputs[o[i]]=this.Mitose.prototype.Input[Options[o[i]]];
	}else{
		this.Mitose.prototype.Meta=function(Parent,Options){Parent.Type.call(this,Parent,Options)}
		this.Mitose.prototype.Meta.prototype=Object.create(this.Mitose.prototype.Type.prototype);
		this.Mitose.prototype.Meta.prototype.constructor=this.Mitose.prototype.Meta;
		this.Mitose.prototype.Meta.prototype.Required=Required;
		if(Draw)this.Mitose.prototype.Meta.prototype.Draw=Draw;
		this.Mitose.prototype.Meta.prototype.Inputs={};
		for(let i=0,o=Object.keys(Options),l=o.length;i<l;i++)this.Mitose.prototype.Meta.prototype.Inputs[o[i]]=this.Mitose.prototype.Input[Options[o[i]]];
	}
}
B.prototype.Draw=function(Function){
	if(typeof Function!='function')throw new Error('required input [Function] must be a function');
	this.Mitose.prototype.Draw=Function;
};
B.prototype.Tool=function(Name,Tool){
	if(typeof Name!='string')throw new Error('required input [Name] must be a string');
	this.Mitose.prototype.Tools[Name]=Tool;
};
B.prototype.CSS=function(CSS){
	this.Mitose.prototype.CSS+=CSS;
}
B.prototype.Mitose=function(API,Path){
	this.API=API;
	if(Path)this.Path=Path;
	this.Metadata=new this.Meta(this);
	this.Data=[]
}
B.prototype.Mitose.prototype.FtD=function(File){
	if(!File){ // remove once finished developing ? maybe leave for fun, and finish AoW doc
		this.Metadata=new this.Meta(this,{Title:'The Art of War',Description:'An overview of The Art of War by Sun Tzu',Authors:['CJ Macbeth'],Signatures:['Ian Archibald'],Variables:{Notes:['Show','Hide'],Text:['Show','Hide','Footnotes']}});
		this.Data=[new this.Type.Section(this,{Text:'Contents',Layer:2}),new this.Type.Step(this,{Title:'Chapters',Text:['000Laying Plans','zzz','000Waging War','zzz','000Attack by Stratagem']}),new this.Type.Section(this,{Layer:3}),new this.Type.Section(this,{Text:'Laying Plans',Layer:1})];
	}else{
		let Data=File.split('\n');
		// check matching BORG version and module
		try{this.Metadata=JSON.parse(Data[1])}catch{this.Metadata={};this.Error=true;} // this.Error, to say the document is in an error state
		for(let i=2,l=Data.length-2;i<l;i++)try{this.Data.push(JSON.parse(Data[i]))}catch{this.Error=true;}	
	}
}
B.prototype.Mitose.prototype.DtF=function(){
	let File='{}\n'; // remove {}\n once BORG data is being inserted
	File+=JSON.stringify(this.TtJ(this.Metadata)); // add BORG data before here
	for(let i=0,l=this.Data.length;i<l;i++)File+=JSON.stringify(this.TtJ(this.Data[i]));
}
B.prototype.Mitose.prototype.TtJ=function(Type){
	let Shell={};
	for(let i=0,o=Object.keys(Type.Options),l=o.length;i<l;i++)if(Type.Options[o[i]].Value!==null)Shell[o[i]]=Type.Options[o[i]].Value;
	return Shell;
}
B.prototype.Mitose.prototype.Add=function(Type,Options,Index){
	if(!Number.isInteger(Index)||Index>this.Data.length)Index=Data.length;
	else if(Index>0)Index=0;
	Data.splice(Index,0,new this.Types[Type](this,Options));
};
B.prototype.Mitose.prototype.Copy=function(Index,Target){
	this.Data[Target]=structuredClone(this.Data[Index]);
};
B.prototype.Mitose.prototype.Update=function(Index,Options){
	this.Data[Index].Update(Options);
};
B.prototype.Mitose.prototype.Remove=function(Index){
	this.Data.splice(Index,1);
};
B.prototype.Mitose.prototype.Scrub=function(Options,Type,Partial){}
B.prototype.Mitose.prototype.Tools=[];
B.prototype.Mitose.prototype.Input=function(Parent,Value){
	this.Parent=Parent;
	if(Value)this.Update(Value);
}
B.prototype.Mitose.prototype.Input.prototype.Update=function(Value){
	if(Value===null)return this.Value=null;
	try{Value=this.Validate(Value)}catch{Value=null}
	if(Value!==null)this.Value=Value;
}
B.prototype.Mitose.prototype.Input.prototype.Value=null;
B.prototype.Mitose.prototype.Type=function(Parent,Options){
	this.Parent=Parent;
	this.Options={};
	let Ops=typeof Options=='object'&&Options!==null;
	for(let i=0,o=Object.keys(this.Inputs),l=o.length;i<l;i++)this.Options[o[i]]=new this.Inputs[o[i]](this,Ops&&o[i]in Options?Options[o[i]]:null);
}
B.prototype.Mitose.prototype.Type.prototype.Update=function(Options){
	for(let i=0,o=Object.keys(Options),l=o.length;i<l;i++)this.Options[o[i]].Update(Options[o[i]]);
};
B.prototype.Mitose.prototype.CSS='';

// error handling in input validation
// optimize
// robust error handling scheme
// add function to lock objects once finished defining

module.exports=B;