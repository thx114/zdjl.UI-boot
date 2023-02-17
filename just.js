
const { realpath } = require("fs")
const ID = Symbol("ID")
const CJSON = Symbol("CJSON")
const NAME = Symbol("NAME")
const Mother = Symbol("Mother")
const R = Symbol("R")
const REALPATH = Symbol("REALPATH")
var id = ''
zdjl.setVar("id",id)
window.all = {
    add: (obj) => {
        let id=obj[ID]??getid()
        all[id] = obj
        obj.self = function () { return all[id] }
        obj[ID] = id
        // console.log(`   <all> remapthisGetter_${obj[NAME]}`)
        Object.defineProperty(all, obj[NAME], {
            configurable: true,
            get (){

                return Object.values(all).find(k => k[NAME] == obj[NAME])
                
            }
        }
        )
    }
}
function lookforMother(obj){
      if (obj[Mother]!=null){
        let a=lookforMother(obj[Mother])
        if (typeof a[obj[NAME]] == "undefined"){
        a[obj[NAME]]=obj.val()}
        return lookforMother(obj[Mother])[obj[NAME]]
        }
      else {
        if (typeof zdjl.getVar(obj[NAME]) == 'undefined'){
            eval.call(`window.${obj[NAME]} = ${obj.val()}`)
        zdjl.setVar(obj[NAME],obj.val())}
        return zdjl.getVar(obj[NAME])
        }
      }
function scanforpath(obj){
if (!obj.Mother){return obj.name}
let objnow=obj
let list=obj.name
while (typeof objnow.Mother != "undefined"){
list=objnow.Mother.name+"."+list
objnow=objnow.Mother
}
return list
}
function set(name,value=114){
  let list
  var path
  if (name.includes(".")){list=name.split(".")}
  else{list=[name]}
  for (i in list){
  if ( i == 0 ){ path = zdjl.getVar( list[0] ) ; continue }
  path  =  path[name]
  }
  if (value==114){return path}
  path = value
  if (list.length==1){ 
    zdjl.setVar(name,value) 

}
  }
function get(name){

return set(name)
}
function getid() { //生成一个在all里不重复的数值
    let id = 0
    while (all[id]) {
        id++
    }
    return id
}

function exp(keyname, value, apply) {
    // console.log(typeof value)
    if (typeof value === "function") {
        if (value.toString().match(/^\(\)/)) {
            value = value.toString().replace(/\s*\(\s*\)\s*\=\>\s*/, "")
            if (value[0] == '{') { value = value.macth(/\{([\s\S]*)\}/) }
            apply.e[keyname] = { valueExp: value, varType: 'expression' }
        }
    }
    else if (Array.isArray(value) && Array.isArray(value[0]) && typeof value[0][0] == "string") {
        if (typeof id == "undefined") { id = '' }

    let out=value[0][0]
    .replace(/#this/g,`all[${id}]`)
    .replace(/this/g,`eval(all[${id}].R)`)
        console.log(`Exp: ${out}  <${apply.name}>`)
        apply.e[keyname] = { valueExp: out, varType: 'expression' }
    }
    else if (apply.e[keyname]) {
        delete apply.e[keyname]
        apply[keyname] = value
    }
    else {
        apply[keyname] = value
    }
    if (apply.e[keyname] && apply[keyname]) {
        delete apply[keyname]
    }
}
class Var {
    static Object2Array(object) {
        if (Array.isArray(object)) {
            return object
        }
        else if (typeof object === "object") { //InputObject to Array input {name:value} output [{name:name,value:value}]
            return Object.entries(object).map(([key, value]) => {return { name: key, value: value }}).filter(i=> typeof i.value != "undefined")
        }
    }
    static Array2Object(array=[]) {
    if (array.length==0){return {}}
        return array.reduce((obj, item) => {
            obj[item.name] = item.value
            return obj
        })
    }
    static ReMap(obj, applist) {
        // console.log(`  >>reMap ${obj[NAME]} for [${Object.values(applist).map(v => v.name).join(", ")}]`)
        applist.forEach((v) => {
            let key = v.name
        Object.defineProperty(obj, key, {
            configurable: true,
            get() {
                if (applist.find(v => v.name == key)) {
                    return applist.find(v => v.name == key).value
                }
                else {
                    return obj[key]
                }

            },
            set(a) {
                if (a instanceof Var) {
                    if (applist.find(v => v.name == key)) {
                        if (typeof a == "undefined") { obj.remvoe(key); return }//remove
                        obj.set(key, a)//apply
                    }
                    else if (obj[key]) { obj[key] = a }//self property as Var
                    else { obj.set(key, a) }//add
                }
                else { obj[key] = a }//self property
            }
        })})
    }
    __vars = {}
    showInput = true
    mustInput = false
    syncValueOnChange = true

    exp = (k, v) => { exp(k, v, this) ;return this}

    constructor(k, v,type="string",obj) {
        this[R]=false
        this.k=k
        this.varType=type
        this.exp(k, v)
        Object.assign(this, obj)
        
    }
    val=(a)=>{
    if(a){this.exp(this.k,a);}
    if(this.varType=='object'){return {}}
    return this[this.k] ?? eval(this.__vars[this.k].valueExp)}
    get real() {return lookforMother(this)}
    get reload(){this.val(this.real)}
    get nid() { all.add(this) ;return this[ID]}
    get id() { return this[ID]}
    get e() { return this.__vars }
    get r() { this[R] = true;return this }
    get name(){return this[NAME]}
    get Mother(){return this[Mother]}
    get R(){return this.REALPATH}
    textT = (a) => { return this.exp('textLineBefore', a)}
    textB = (a) => { return this.exp('textLineAfter',a)}
    textL = (a) => { return this.exp('showInputLabel',a)}
    textR = (a) => { return this.exp('textAppendRight', a)} 
    w = (a) => { return this.exp('showInputWidthBasis', a) }
    g = (a) => { return this.exp('showInputWidthGrow', a) }
    h = (a) => { return this.exp('showInputHiddenView', a) }
    size = (a) => { return this.exp('textSize', a) }
    color = (a) => { return this.exp('textColor', a) }
    action = (a) => { this.action = a; return this }
    list = (a) => { return this.exp('stringItems', a) }
    js = (a) => { this.action = js(a); return this }
    C = (a) => { this.closeDialogOnAction = a;return this}
    push = (a) => { this[a.name]=a.value; return this }
    text = (a) => { return this.exp('buttonText', a) }
    textT = (a) => { return this.exp('textLineBefore', a) }
    textB = (a) => { return this.exp('textLineAfter', a) }
    textL = (a) => { return this.exp('showInputLabel', a) }
    textR = (a) => { return this.exp('textAppendRight', a) }
    BGcolor = (a) => { return this.exp('backgroundColor', a) }
    BGimg = (a) => { return this.exp('backgroundImageData', a) }
    get s() { this.showInput = false; return this }
    get m() { this.mustInput = true; return this }
    get sync() { this.syncValueOnChange = false; return this }
    get t() { this.showInputHiddenLabel = true; return this }
    get c() { this.closeDialogOnAction = false; return this }
    get ww(){ return this.w(100) }
    get set(){ new setvar({name:this[NAME]||"noname",value:this}).run }
    get wa(){ return this.wa()}
    apply=(a)=>{ 
    
    this.objectVars = [...this.objectVars,...Var.Object2Array(a)]
    this[CJSON] = Var.Array2Object(this.objectVars)
    Var.ReMap(this, this.objectVars)
    this.objectVars.forEach(i=>{
        i.value[Mother]=this
        })
        
        return this
    }
    push=(a)=>{
    this.objectVars = [...this.objectVars,...Var.Object2Array(a)]
    this[CJSON] = Var.Array2Object(this.objectVars)
    Var.ReMap(this, this.objectVars)
    this.objectVars.forEach(i=>{
        i.value[Mother]=this
        i.value[NAME]=i.name
        })
        
        return this
    }
   
    
}



class obj extends Var {
    varType = "object"
    showInputHiddenLabel = false
    syncValueOnChange = false
    get setvar() { return new setvar(this.objectVars) }
    get remap() { Var.ReMap(this, this.objectVars) }
    remvoe = (key) => { this.objectVars.splice(this.objectVars.findIndex(v => v.name == key), 1) }
    remvoe = (key, val) => { this.objectVars.find(v => v.name == key).value = val }
    constructor(input = {}) {
        super('objectVars', [])
        all.add(this)
        window.id=this[ID]
        // zdjl.setVar("GID",this[ID])
        
        this.objectVars = Var.Object2Array(input)
        this[CJSON] = Var.Array2Object(this.objectVars)
        Var.ReMap(this, this.objectVars)
        this.objectVars.forEach(i=>{
        i.value[Mother]=this
        i.value[NAME]=i.name
        }
        )
    }
}
class Action { constructor(type,obj={}) {
 this.type = type
 Object.assign(this,obj)
  } }
function string(input="") { return new Var('value', input, "string" )}
function number(input=0) { return new Var('number', input, "number" )}
function bool(input=false) { return new Var('value', input, "bool" )}
function text(input="") { return new Var('textContent', input, "ui_text" ).sync}
function button(input="") { return new Var('buttonText', input, "ui_button" ).sync}
function object(input={},id=null) { return new obj(input,id) }
function image(input={}) { return new Var('imageData', input, "ui_image" )}
function color(input) { return new Var('color', input, "color" )}
function xy(input) { return new Var('position', input, "position" )}
function area(input) { return new Var('screen_area', input, "screen_area" )}
function jscode(input) { return new Var('jsCode', input, "js_function" )}

function setvars(input) { return new setvars(input) }
function js(input) {
input=Array.isArray(input)?input[0][0]:input
input=input
.replace(/#this/g,`all[${id}]`)
.replace(/this/g,`eval(all[${id}].R)`)
// zdjl.alert(input)
 return new Action('运行JS代码',{jsCode:input})}



class setvar extends Action {
    constructor(input) {
        super('设置变量')
        this.vars = Var.Object2Array(input)
        this[CJSON] = Var.Array2Object(this.vars)

    }
    get scan(){
        function ascan(vars) {
            vars.forEach((v) => {
            v.value[NAME]=v.name
            if ( typeof v.value == "undefined"){
            return}
            if (v.value.varType == "object") {
               ascan(v.value.objectVars)
               v.value.remap
               }
            if ( v.value[R]){v.value.reload}
            v.value.REALPATH=scanforpath(v.value)  
            lookforMother(v.value)
               })

        }
        ascan(this.vars, all)
        
        return this
    }
    get run(){
        this.scan
        zdjl.runActionAsync(this)
    }
}



for (i of [getid,Var,exp,obj,Action,string,number,bool,text,button,object,image,color,xy,area,jscode,setvars,js,setvar,set,get,lookforMother,scanforpath]){
window[i.name]=i}

