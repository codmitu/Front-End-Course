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
    str += `addHeader("Ex 1: getDigits")`;
    str += addCode("getDigits", ["as123dfgh123jkl"], "123123");
    str += addCode("getDigits", ["asd1!2@3#$%^&*()fghjkl"], "123");
    str += addCode("getDigits", ["asdfghjkl"], "");
    str += addCode("getDigits", ["asd0987fghjkl"], "0987");
    str += addCode("getDigits", ["ASD123FGHJKL"], "123");
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
    str += `addHeader("Ex 2: getLetters");`;
    str += addCode("getLetters", ["as123dfgh123jkl"], "asdfghjkl");
    str += addCode("getLetters", ["asd1!2@3#$%^&*()fghjkl"], "asdfghjkl");
    str += addCode("getLetters", ["asdfghjkl"], "asdfghjkl");
    str += addCode("getLetters", ["asd0987fghjkl"], "asdfghjkl");
    str += addCode("getLetters", ["ASD123FGHJKL"], "ASDFGHJKL");
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
    str += `addHeader("Ex 3: getFirst5Letters");`;
    str += addCode("getFirst5Letters", ["as123dfgh123jkl"], "asdfg");
    str += addCode("getFirst5Letters", ["asd1!2@3#$%^&*()fghjkl"], "asdfg");
    str += addCode("getFirst5Letters", ["asdfghjkl"], "asdfg");
    str += addCode("getFirst5Letters", ["asd0987fghjkl"], "asdfg");
    str += addCode("getFirst5Letters", ["ASD123FGHJKL"], "ASDFG");
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
    str += `addHeader("Ex 4: concatenate");`;
    str += addCode("concatenate", [["a","b","c"]], "abc");
    str += addCode("concatenate", [["aa","bb","cc"]], "aabbcc");
    str += addCode("concatenate", [["a", "A"]], "aA");
    str += addCode("concatenate", [["aasd", "asd"]], "aasdasd");
    str += addCode("concatenate", [["10","2"]], "102");
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
    str += `addHeader("Ex 5: getAllDigits");`;
    str += addCode("getAllDigits", [["a1","b2","c3"]], "123");
    str += addCode("getAllDigits", [["a1a","b1b","c1c"]], "111");
    str += addCode("getAllDigits", [["a", "A","123"]], "123");
    str += addCode("getAllDigits", [["aas999d", "asd"]], "999");
    str += addCode("getAllDigits", [["10","299"]], "10299");
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
    str += `addHeader("Ex 6: invertAllStrings");`;
    str += addCode("invertAllStrings", [["a1","b2","c3"]], ["1a","2b","3c"] );
    str += addCode("invertAllStrings", [["a1b","b1c","c1d"]], ["b1a","c1b","d1c"]);
    str += addCode("invertAllStrings", [["a", "A","123"]],  ["a","A","321"]);
    str += addCode("invertAllStrings", [["aas999d", "asd"]], ["d999saa","dsa"]);
    str += addCode("invertAllStrings", [["10","299", ""]],  ["01","992",""]);
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
    str += `addHeader("Ex 7: factorial");`;
    str += addCode("factorial", [1], 1);
    str += addCode("factorial", [2], 2);
    str += addCode("factorial", [3], 6);
    str += addCode("factorial", [5], 120);
    str += addCode("factorial", [7], 5040);
    str += addCode("factorial", [12], 479001600);
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
    str += `addHeader("Ex 8: cmmdc");`;
    str += addCode("cmmdc", [2,3], 1);
    str += addCode("cmmdc", [100,25], 25);
    str += addCode("cmmdc", [12,16], 4);
    str += addCode("cmmdc", [33,121], 11);
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
    str += `addHeader("Ex 9: cmmmc");`;
    str += addCode("cmmmc", [2,3], 6);
    str += addCode("cmmmc", [5,3], 15);
    str += addCode("cmmmc", [12,16], 48);
    str += addCode("cmmmc", [10, 10], 10);
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
    str += `addHeader("Ex 10: divizori");`;
    str += addCode("divizori", [64], [2,4,8,16,32]);
    str += addCode("divizori", [9], [3]);
    str += addCode("divizori", [12], [2,3,4,6]);
    str += addCode("divizori", [81], [3,9,27]);
    str += addCode("divizori", [63], [3,7,9,21]);
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
    str += `addHeader("Ex 11: palindrom");`;
    str += addCode("palindrom", [64], false);
    str += addCode("palindrom", [111], true);
    str += addCode("palindrom", [1221], true);
    str += addCode("palindrom", [123454321], true);
    str += addCode("palindrom", [63], false);
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
    str += `addHeader("Ex 12: sort");`;
    str += addCode("sort", [[1,2,3,4,5]], [2,4]);
    str += addCode("sort", [[5,4,5]], [4]);
    str += addCode("sort", [[4,8,6,-1,-2,-3,30, 0]], [-2, 0,4,6,8,30]);
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
    str += `addHeader("Ex 13: sortAscDesc");`;
    str += addCode("sortAscDesc", [[1,2,3,4,5]], [2,4,5,3,1]);
    str += addCode("sortAscDesc", [[5,4,-5]], [4,5,-5]);
    str += addCode("sortAscDesc", [[4,7,17,8,6,-1,-2,-3,30, 0]], [-2, 0,4,6,8,30,17,7, -1,-3]);
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
    str += `addHeader("Ex 14: binarySearch");`;
    str += addCode("binarySearch", [[1,2,3,4,5], 5], true);
    str += addCode("binarySearch", [[1,2,3,4,5], 1], true);
    str += addCode("binarySearch", [[1,2,3,4,5], 2], true);
    str += addCode("binarySearch", [[1,2,3,4,5], 3], true);
    str += addCode("binarySearch", [[1,2,3,4,5], 6], false);
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
    str += `addHeader("Ex 15: countBinarySearch");`;
    str += addCode("countBinarySearch", [[1,2,3,4,5], 5], 3);
    str += addCode("countBinarySearch", [[1,2,3,4,5], 1], 2);
    str += addCode("countBinarySearch", [[1,2,3,4,5], 2], 3);
    str += addCode("countBinarySearch", [[1,2,3,4,5], 3], 1);
    str += addCode("countBinarySearch", [[1,2,3,4,5], 6], 3);
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
    result.innerHTML += `<div class="${JSON.stringify(val) === JSON.stringify(expectedValue)}">${fctName}(${paramsStr}) => ${JSON.stringify(val)} expected ${JSON.stringify(expectedValue)}</div>`;
}
