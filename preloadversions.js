window.addEventListener('DOMContentLoaded',()=>{
	let replace=(selector,text)=>{
		let element=document.getElementById(selector);
		if(element)element.innerText=text;
	}
	for(let attribute of ['chrome','node','electron'])replace(`${attribute}-version`,process.versions[attribute]);
});