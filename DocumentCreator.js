const path=require('path');
const fs=require('fs');
const V=require(path.join(__dirname,'Validators'));
const BORG=require(path.join(__dirname,'BORG'));
let b=new BORG('Document Creator');
function FtD(Raw){
	let Data;
	try{Data=JSON.parse(Data)}catch{Data={}}
	if(typeof Data.Meta=='object'&&Data.Meta!==null)this.Meta=Data.Meta;
	else this.Meta={};
	if(Array.isArray(Data.Data))this.Data=Data.Data;
	else this.Data={}[];
}
function DtF(){
	return JSON.stringify({Meta:this.Meta,Data:this.Data});
}
function StringV(S){
	if(typeof S!='string')throw false;
	S=S.trim();
	if(S.length==0)throw false;
	return S;
}
function SAV(A){
	if(!Array.isArray(A))throw false;
	for(let i=0,l=A.length;i<l;i++)if(typeof A!='string'){throw false}else{A[i]=A[i].trim()}
	A=A.filter(E=>E.length>0);
	if(A.length==0)throw false;
	return A;
}
async function Variables(Value){
	if(typeof Value!='object'||Value===null)return null;
	for(let i=0,o=Object.keys(Value),l=o.length;i<l;i++){
		if(!Array.isArray(Value[o[i]]))Value[o[i]]=null;
		else for(let i2=0,l2=Value[o[i]].length;i2<l2;i2++){
			if(typeof Value[o[i]][i2]!='string')throw false;
			Value[o[i]][i2]=Value[o[i]][i2].trim();
			if(Value[o[i]][i2].length==0)throw false;
		}
	}
	if(Value===null)return Value;
	Object.keys(Value).every(E=>{
		if(Value[E]===null)delete Value[E];
		else Value[E]=Value[E].filter(E2=>E2!==null);
	});
	return Value;
}
async function Text(Value){
	if(!Array.isArray(Value)||Value.length==0)return null;
	var Invalid=Code=>{for(let i=0,l=Code.length;i<l;i++)if(/[^0-9a-z]/.test(Code[i]))return true};
	for(let i=0,l=Value.length;i<l;i++)if(typeof Value[i]!='string'||Invalid(Value[i].substring(0,3)))throw false;
	return Value;
}
async function Table(Value){
	if(!Array.isArray(Value)||Value.length==0)throw false;
	for(let i=0,l=Value.length;i<l;i++){
		if(!Array.isArray(Value[i]))throw false;
		for(let i2=0,l2=Value[i].length;i2<l2;i2++){
			if(Value[i][i2]!==null&&typeof Value[i][i2]!='string')throw false;
			if(typeof Value[i][i2]=='string')Value[i][i2]=Value[i][i2].trim();
		}
	}
	return Value;
}
async function Conditions(Value){
	if(!Array.isArray(Value)||Value.length==0)throw false;
	for(let i=0,l=Value.length;i<l;i++){
		if(typeof Value[i]!='object'||Value===null)throw false;
		/*for(let i2=0,o=Object.keys(Value[i]),l2=o.length;i2<l2;i2++){
			if(!(o[i2] in Meta.Variables))Value[i]=null;
			else if(!Meta.Variables[o[i2]].includes(Value[i][o[i2]]))delete Value[i][o[i2]];
		}
		functionality to check against Meta
		*/
	}
	Value=Value.filter(E=>E!==null);
	return Value;
}
function Level(L){
	if(L==1||L==2||L==3)return L;
	else throw false;
}
function DrawMeta(){
	let html='<div class="Element-Box"><div class="Element-Number">0.0.0</div><table class="Element">';
	if(this.Options.Title.Value)html+=`<tr><td class="Element-Cell"><div class="Element-Meta-Title">${this.Title.Value}</div></td></tr>`;
	if(this.Options.Description.Value||this.Options.Authors.Value||this.Options.Signatures.Value){
		html+='<tr><td class="Element-Cell">';
		if(this.Options.Description.Value)html+=`<div class="Element-Meta-Description">${this.Options.Description.Value}</div>`;
		if(this.Options.Authors.Value)for(let i=0,l=this.Options.Authors.length;i<l;i++)html+=`<div class="Element-Meta-Author">${this.Options.Authors.Value[i]}</div>`;
		if(this.Options.Signatures.Value)for(let i=0,l=this.Options.Signatures.length;i<l;i++)html+=`<div class="Element-Meta-Signature">${this.Options.Signatures.Value[i]}</div>`;
		html+='</td></tr>';
	}
	if(this.Options.Variables.Value){
		let vars=this.Options.Variables.Value;
		for(let i=0,o=Object.keys(vars),l=o.length;i<l;i++){
			html+=`<div class="m-Document-Type-1-Variables-Box"><table class="Element-Meta-Variable" border="1" cellpadding="0" cellspacing="0"><tr><th class="Element-Meta-Variable-Name">${o[i]}</th></tr><tr><td class="Element-Meta-Variable-Value"><input onchange="" type="radio" name="${o[i]}" value="${vars[o[i]][Object.keys(vars[o[i]])[0]]}" checked><label for="Var${i}Val0">${vars[o[i]][Object.keys(vars[o[i]])[0]]}</label></td></tr>`;
			for(let i2=1,o2=Object.keys(vars[o[i]]),l2=o2.length;i2<l2;i2++){
				html+=`<tr><td class="Element-Meta-Variable-Value"><input onchange="" class="Element-Meta-Variable-Input" type="radio" name="${o[i]}" value="${vars[o[i]][o2[i2]]}"><label for="Var${i}Val${i2}">${vars[o[i]][o2[i2]]}</label></td></tr>`;
			}
			html+='</table></div>';
		}
	}
	html+='</table></div>';
	return html;
}
function DrawStep(Num){
	let html=`<div class="Element-Box"><div class="Element-Number" colspan="2">${Num?`${Num[0]}.${Num[1]}.${Num[2]}`:'?.?.?'}</div><table class="Element">`;
	if(this.Options.Title.Value)html+=`<tr><td class="Element-Cell" colspan="2"><div class="Element-Step-Title">${this.Title.Value}</div></td></tr>`;
	if(this.Options.Text.Value||this.Options.Image.Value){
		html+='<tr>';
		if(this.Options.Text.Value){
			// copy to description rendering
			html+=`<td class="Element-Cell"  colspan="${this.Options.Image.Value?1:2}"><div class="Element-Text">`;
			for(let i=0,l=this.Options.Text.length;i<l;i++)html+=
			html+=`</div></td>`;
		}
		if(this.Options.Image.Value)html+=`<td class="Element-Cell" colspan="${this.Options.Text.Value?1:2}"><image class="Element-Image" onclick="Active.Tools.OpenImage(this)" src="${this.Options.Image.Value}"><span class="Element-Text-Number">${Num[0]}.${Num[1]}.${Num[2]}.Image</span>${this.Options.Footnote.Value?`<span class="Element-Image-Footnote">${this.Parent.Tools.HTMLSanitize(this.Options.Footnote.Value)}</span>`:''}</td>`;
	}
	if(this.Options.Table.Value){
		html+='<tr><td class="Element-Cell"  colspan="2"><table class="Element-Table"><tr>';
		if(this.Options.Table.Value.length>0)for(let i=0,l=this.Options.Table.Value[0].length;i<l;i++)html+=`<td class="Element-Table-Header">${this.Parent.Tools.HTMLSanitize(this.Options.Table.Value[0][i])}</td>`;
		for(let i=1,l=Element.Table.length;i<l;i++){
			html+='<tr>';
			for(let i2=0,l2=Element.Table[i].length;i2<l2;i2++)html+=`<td class="Element-Table-Cell">${this.Parent.Tools.HTMLSanitize(this.Options.Table.Value[i][i2])}</td>`;
			html+='</tr>';
		}
		html+='</table></td></tr>';
	}
	
}
function DrawSection(Num){
	switch(this.Options.Layer.Value){
		case 3:
			return `<div class="Element-Box"><div class="Element-Number" colspan="2">${Num?`${Num[0]}.${Num[1]}.${Num[2]}`:'?.?.?'}</div><table class="Element"><tr><td class="Element-Cell"><div class="Element-Section"></div></td></tr></table></div>`;
		case 2:
			return `<div class="Element-Box"><div class="Element-Number" colspan="2">${Num?`${Num[0]}.${Num[1]}.${Num[2]}`:'?.?.?'}</div><table class="Element"><tr><td class="Element-Cell"><div class="Element-Subsection"></div></td></tr></table></div>`;
		default:
			return `<div class="Element-Box"><div class="Element-Number" colspan="2">${Num?`${Num[0]}.${Num[1]}.${Num[2]}`:'?.?.?'}</div><div class="Element-Break"></div></div>`;
	}
}

b.Store(FtD,DtF);

b.Input('String',StringV);
b.Input('String Array',SAV);
b.Input('Text',Text);
b.Input('Table',Table);
b.Input('Conditions',Conditions);
b.Input('Variables',Variables);
b.Input('Level',Level);

b.Type({Title:'String',Description:'Text',Authors:'String Array',Signatures:'String Array',Variables:'Variables'},['Title'],null,()=>{}); // draw func
b.Type({Title:'String',Text:'Text',Image:'String',Footnote:'String',Table:'Table',Conditions:'Conditions'},[],'Step',()=>{}); // draw func
b.Type({Text:'Section',Type:'Level'},['Level'],'Step',()=>{}); // draw func

b.Draw(()=>{}); // draw func
b.Tool('Name',1); // tools
b.Tool('OpenImage',(Element)=>{});
b.Tool('HTMLSanitize',(String)=>{});
b.CSS(``);

// move functions to Validators module ?

module.exports=b;