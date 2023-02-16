const { realpath } = require("fs")

const ID = Symbol("ID")
const CJSON = Symbol("CJSON")
const NAME = Symbol("NAME")
const Mother = Symbol("Mother")
const R = Symbol("R")
const REALPATH = Symbol("REALPATH")
var all = {
    add: (obj) => {
        let id = getid()
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
        apply.e[keyname] = { valueExp: value[0][0], varType: 'expression' }
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
            return Object.entries(object).map(([key, value]) => {return { name: key, value: value }})
        }
    }
    static Array2Object(array) {
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

    exp = (k, v) => { exp(k, v, this) }

    constructor(k, v,type="string",obj) {
        this[R]=false
        this.varType=type
        this.exp(k, v)
        this.val = (a) => { 
            if (a) { exp(k,a)}
            return this[k] || eval(this.__vars[k].valueExp) 
        }
        Object.assign(this, obj)
    }
    get real() {
        if (this[REALPATH] == null) {
            try { return zdjl.getVar(this[NAME]) }
            catch { return null }
        }
        else {
            try { return this[REALPATH][this[NAME]] }
            catch { return null }
        }
    }
    get e() { return this.__vars }
    get r() { this[R] = ture }
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
        this.objectVars = Var.Object2Array(input)
        this[CJSON] = Var.Array2Object(this.objectVars)
        Var.ReMap(this, this.objectVars)
    }
}
class Action { constructor(type) { this.type = type } }
function string(input) { return new Var('value', input, "string" )}
function number(input) { return new Var('number', input, "number" )}
function bool(input) { return new Var('value', input, "bool" )}
function text(input) { return new Var('textContent', input, "ui_text" )}
function button(input) { return new Var('buttonText', input, "ui_button" )}
function object(input) { return new obj(input) }
function image(input) { return new Var('imageData', input, "ui_image" )}
function color(input) { return new Var('color', input, "color" )}
function xy(input) { return new Var('position', input, "position" )}
function area(input) { return new Var('screen_area', input, "screen_area" )}
function jscode(input) { return new Var('jsCode', input, "js_function" )}

function setvars(input) { return new setvars(input) }
function js(input) { return new Action('运行JS代码')}




class setvar extends Action {
    constructor(input) {
        super('设置变量')
        this.vars = Var.Object2Array(input)
        this[CJSON] = Var.Array2Object(this.vars)
        function scan(realpath, vars,allpath) {
            // console.log(`scan for ${realpath || 'global' } > [${vars.map(v => v.name).join(', ')}]`)
            vars.forEach((v) => {
                // console.log(`  > Var:${v.name} <${v.value.varType}> : (${typeof v.value.val() == "object" ? '['+v.value.val().map(v => v.name).join(', ')+']' : v.value.val() })`)
                v.value[NAME] = v.name
                v.value[Mother] = allpath
                v.value[REALPATH] = realpath
               
                all.add(v.value)
                console.log(`  > reg new  ${v.name} <${v.value.varType}> ${v.value[ID]}`)

                if (v.value.varType == "object") {
                    scan(realpath, v.value.objectVars, all[v.value[ID]])
                    v.value.remap
                }
            })
        }
        scan(null, this.vars, all)
    }
    get scan(){
        function scan(realpath, vars, allpath) {
            console.log(`scan for ${realpath || 'global'} > [${vars.map(v => v.name).join(', ')}]`)
            vars.forEach((v) => {
                // console.log(`  > Var:${v.name} <${v.value.varType}> : (${typeof v.value.val() == "object" ? '['+v.value.val().map(v => v.name).join(', ')+']' : v.value.val() })`)
                // v.value[REAL] = () => { return realpath == null ? zdjl.getVar(v.name) : eval(`${realpath}.${v.name}`) }
                if (v.value[ID] == undefined) {
                    console.log(`find new Var:${v.name}`)
                    v.value[NAME]=v.name
                    v.value[Mother] = allpath
                    v.value[REALPATH] = realpath
                    all.add(v.value)
                }
                if (v.value.varType == "object") {
                    if (!v.value.real) { 
                        if (realpath == null){ 
                            zdjl.setVar(v.name,{}) 
                            realpath = zdjl.getVar(v.name) 
                            }
                        else { 
                            realpath[v.name] = {}
                            realpath = realpath[v.name]
                            }
                        }
                    v.value[REALPATH] = realpath
                    scan(realpath, v.value.objectVars, all[v.value[ID]])
                    v.value.remap
                }
                else {
                    if (!v.value.real){
                        if (realpath == null) { zdjl.setVar(v.name, v.value.val()) }
                        else { realpath[v.name] = v.value.val() }
                    }
                    else if (v.value[R]){
                        v.value.val(v.value.real) 


                    }
                    v.value[REALPATH] = realpath
                }
            })
        }
        scan(null, this.vars, all)
    }
    get run(){
        this.scan
        zdjl.runActionAsync(this)
    }
}
if (typeof zdjl == "undefined") {
    zdjl = {
        getVar: function (name) {
            try{return eval(name)}
            catch{return null}

        },
        setVar: function (name, value) {
            console.log(`setVar ${name} = ${value}`)
            global[name] = value

        },
        runActionAsync: function (action) {
            return undefined
            
        }
    }
}

b=new setvar({a:new object({b:new object({c:new object({d:new object({e:new string("a")})})})})})
b.scan
console.log(all.b.c.d)
b.run


