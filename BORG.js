const Version=[0,0,1];
function B(MID,Name,V1,V2,V3){
	this.MID=MID;
	this.Name=Name;
	this.Mitose.prototype.MID=MID;
	this.Mitose.prototype.Name=Name;
	if(!Number.isInteger(V1))V1=0;
	if(!Number.isInteger(V2))V2=0;
	if(!Number.isInteger(V3))V3=0;
	this.Version=[V1,V2,V3];
	this.Mitose.prototype.Version=[V1,V2,V3];
}
B.prototype.PocketBORG=Version;
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
	if('Type' in Options)throw new Error('required input [Options] cannot contain a property named [Type]');
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
B.prototype.Mitose=function(Path,File){
	if(Path)this.File=Path;
	if(File)this.Open(File);
	this.Error=false;
}
B.prototype.Mitose.prototype.PocketBORG=Version;
B.prototype.Mitose.prototype.Open=function(File){
	try{
		this.Metadata=new this.Meta(this,File[1]);
		this.Data=[];
		for(let i=2,l=File.length;i<l;i++)this.Data.push(new this.Type[File[i].Type](this,File[i]));
	}catch(e){
		console.log(e);
		this.Error=true; // log reason for error?
		this.Metadata=new this.Meta(this,{});
		this.Data=[];
	}
}
B.prototype.Mitose.prototype.DtF=function(){
	let v=process.env.VERSION.split(',');
	let File=`{"PocketBORG":[${v[0]},${v[1]},${v[2]}],"Module":"${this.Name}","Version":[${this.Version[0]},${this.Version[1]},${this.Version[2]}],"MID":"${this.MID}"}\n`; // remove {}\n once BORG data is being inserted
	File+=JSON.stringify(this.TtJ(this.Metadata))+'\n'; // add BORG data before here
	for(let i=0,l=this.Data.length;i<l;i++)File+=JSON.stringify(this.TtJ(this.Data[i]))+'\n';
	return File;
}
B.prototype.Mitose.prototype.TtJ=function(Type){
	let Shell={};
	for(let i=0,o=Object.keys(Type.Options),l=o.length;i<l;i++){
		if(Type.Options[o[i]].Value!==null)Shell[o[i]]=Type.Options[o[i]].Value;
	}
	Shell.Type=Type.Name;
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