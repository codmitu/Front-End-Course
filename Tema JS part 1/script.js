const Function = Object.getPrototypeOf(() => {}).constructor;
let code = document.querySelector("#code");
let code2 = document.querySelector("#code2");
let code3 = document.querySelector("#code3");
let code4 = document.querySelector("#code4");
let code5 = document.querySelector("#code5");
let code6 = document.querySelector("#code6");
let code7 = document.querySelector("#code7");
let code8 = document.querySelector("#code8");
let code9 = document.querySelector("#code9");
let code10 = document.querySelector("#code10");
let code11 = document.querySelector("#code11");
let code12 = document.querySelector("#code12");
let code13 = document.querySelector("#code13");
let code14 = document.querySelector("#code14");
let code15 = document.querySelector("#code15");
let result = document.querySelector("#result");



function validate() {
	let str = code.value;
	result.innerHTML="";
str += `addHeader("Ex 1: Equals")`;
str += addCode("equals", [1, 1], true);
str += addCode("equals", [1, 2], false);
str += addCode("equals", [2, 1], false);
str += addCode("equals", [2, 2], true);
str += addCode("equals", [2, "2"], false);
try{
		let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy() {
	let copy = document.getElementById("code");
	copy.select();
	document.execCommand("copy");
}


function validate2() {
	let str = code2.value;
	result.innerHTML="";
str += `addHeader("Ex 2: compare");`;
str += addCode("compare", [1, 2], -1);
str += addCode("compare", [2, 2], 0);
str += addCode("compare", [3,1], 1);
str += addCode("compare", ["a", "A"], 1);
str += addCode("compare", ["aasd", "asd"], -1);
str += addCode("compare", ["10","2"], -1);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy2() {
	let copy = document.getElementById("code2");
	copy.select();
	document.execCommand("copy");
}

function validate3() {
	let str = code3.value;
	result.innerHTML="";
str += `addHeader("Ex 3: max");`;
str += addCode("max", [1, 2], 2);
str += addCode("max", [2, 2], 2);
str += addCode("max", [3,1], 3);
str += addCode("max", ["a", "A"], "a");
str += addCode("max", ["aasd", "asd"], "asd");
str += addCode("max", ["10","2"], "2");
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy3() {
	let copy = document.getElementById("code3");
	copy.select();
	document.execCommand("copy");
}


function validate4() {
	let str = code4.value;
	result.innerHTML="";
str += `addHeader("Ex 4: min");`;
str += addCode("min", [1, 2], 1);
str += addCode("min", [2, 2], 2);
str += addCode("min", [3,1], 1);
str += addCode("min", ["a", "A"], "A");
str += addCode("min", ["aasd", "asd"], "aasd");
str += addCode("min", ["10","2"], "10");
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy4() {
	let copy = document.getElementById("code4");
	copy.select();
	document.execCommand("copy");
}


function validate5() {
	let str = code5.value;
	result.innerHTML="";
str += `addHeader("Ex 5: suma");`;
str += addCode("suma", [3], 6);
str += addCode("suma", [5], 15);
str += addCode("suma", [7], 28);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy5() {
	let copy = document.getElementById("code5");
	copy.select();
	document.execCommand("copy");
}


function validate6() {
	let str = code6.value;
	result.innerHTML="";
str += `addHeader("Ex 6: prim");`;
str += addCode("prim", [3], true);
str += addCode("prim", [5], true);
str += addCode("prim", [7], true);
str += addCode("prim", [12], false);
str += addCode("prim", [89], true);
str += addCode("prim", [91], false);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy6() {
	let copy = document.getElementById("code6");
	copy.select();
	document.execCommand("copy");
}


function validate7() {
	let str = code7.value;
	result.innerHTML="";
str += `addHeader("Ex 7: sumaPrime");`;
str += addCode("sumaPrime", [3], 10);
str += addCode("sumaPrime", [5], 28);
str += addCode("sumaPrime", [7], 58);
str += addCode("sumaPrime", [12], 197);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy7() {
	let copy = document.getElementById("code7");
	copy.select();
	document.execCommand("copy");
}


function validate8() {
	let str = code8.value;
	result.innerHTML="";
str += `addHeader("Ex 8: invers");`;
str += addCode("invers", [123], 321);
str += addCode("invers", [100], 1);
str += addCode("invers", [80], 8);
str += addCode("invers", [123456], 654321);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy8() {
	let copy = document.getElementById("code8");
	copy.select();
	document.execCommand("copy");
}


function validate9() {
	let str = code9.value;
	result.innerHTML="";
str += `addHeader("Ex 9: produsImpare");`;
str += addCode("produsImpare", [2], 3);
str += addCode("produsImpare", [3], 15);
str += addCode("produsImpare", [4], 105);
str += addCode("produsImpare", [10], 654729075);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy9() {
	let copy = document.getElementById("code9");
	copy.select();
	document.execCommand("copy");
}


function validate10() {
	let str = code10.value;
	result.innerHTML="";
str += `addHeader("Ex 10: contains");`;
str += addCode("contains", [[1,2,3,4,5], 5], true);
str += addCode("contains", [[1,2,3,4,5], 1], true);
str += addCode("contains", [[1,2,3,4,5], 2], true);
str += addCode("contains", [[1,2,3,4,5], 3], true);
str += addCode("contains", [[1,2,3,4,5], 6], false);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy10() {
	let copy = document.getElementById("code10");
	copy.select();
	document.execCommand("copy");
}


function validate11() {
	let str = code11.value;
	result.innerHTML="";
str += `addHeader("Ex 11: maxArray");`;
str += addCode("maxArray", [[1,2,3,4,5]], 5);
str += addCode("maxArray", [[5,4,5]], 5);
str += addCode("maxArray", [[-1,-2,-3]], -1);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy11() {
	let copy = document.getElementById("code11");
	copy.select();
	document.execCommand("copy");
}


function validate12() {
	let str = code12.value;
	result.innerHTML="";
str += `addHeader("Ex 12: sumMinMax");`;
str += addCode("sumMinMax", [[1,2,3,4,5]], 6);
str += addCode("sumMinMax", [[5,4,5]], 9);
str += addCode("sumMinMax", [[-1,-2,-3]], -4);
try{
	let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy12() {
	let copy = document.getElementById("code12");
	copy.select();
	document.execCommand("copy");
}


function validate13() {
	let str = code13.value;
	result.innerHTML="";
str += `addHeader("Ex 13: hasDuplicates");`;
str += addCode("hasDuplicates", [[1,2,3,4,5]], false);
str += addCode("hasDuplicates", [[5,4,5]], true);
str += addCode("hasDuplicates", [[-1,-2,-3]], false);
str += addCode("hasDuplicates", [[-1,-2,-3,-3]], true);
str += addCode("hasDuplicates", [["asd","asd","asd"]], true);
	try{
		let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy13() {
	let copy = document.getElementById("code13");
	copy.select();
	document.execCommand("copy");
}


function validate14() {
	let str = code14.value;
	result.innerHTML="";
str += `addHeader("Ex 14: produsPozitive");`;
str += addCode("produsPozitive", [[1,2,3,4,5]], 120);
str += addCode("produsPozitive", [[5,4,5]], 100);
str += addCode("produsPozitive", [[-1,-2,-3]], 1);
str += addCode("produsPozitive", [[5,4,-5,-100]], 20);
	try{
		let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy14() {
	let copy = document.getElementById("code14");
	copy.select();
	document.execCommand("copy");
}


function validate15() {
	let str = code15.value;
	result.innerHTML="";
str += `addHeader("Ex 15: palindrom");`;
str += addCode("palindrom", ["123321"], true);
str += addCode("palindrom", ["12321"], true);
str += addCode("palindrom", ["1221"], true);
str += addCode("palindrom", ["asdffdsa"], true);
str += addCode("palindrom", ["asdfsa"], false);
	try{
		let f = new Function('"use strict";' + (str));
		f.apply({});
	}catch(e){
		addHeader(e);
	}
}
function copy15() {
	let copy = document.getElementById("code15");
	copy.select();
	document.execCommand("copy");
}


function addCode(fct, params, result){
	return `
		if (typeof ${fct} ==="function") {
			try{
				addCheck('${fct}',${fct},${JSON.stringify(params)},${JSON.stringify(result)});
			}catch(e){
				addHeader(e)
			}
		} else {
			addHeader("Nu exista functia ${fct}")
		}
	`
}

function addHeader(str) {
	result.innerHTML += `<h1>${str}</h1>`;
}

function addCheck(fctName, fct, params, expectedValue) {
	let paramsStr = JSON.stringify(params);
	paramsStr = paramsStr.substring(1, paramsStr.length - 1);
	let val = fct.apply(null, params);
	result.innerHTML += `<div class="${val === expectedValue}">${fctName}(${paramsStr}) => ${JSON.stringify(val)} expected ${JSON.stringify(expectedValue)}</div>`;
}