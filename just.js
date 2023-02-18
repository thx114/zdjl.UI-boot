//版本 0.2<Switch log> 2023.2.18
if (typeof window == "undefined") { var window = global; }
const ID = Symbol("ID")
const CJSON = Symbol("CJSON")
const NAME = Symbol("NAME")
const Mother = Symbol("Mother")
const R = Symbol("R")
const REALPATH = Symbol("REALPATH")
var id


Exp_Modules = {
  Button_Text_exp : (a,size,Vname) => { let rtext =`
    (()=>{
    switch (thisobjmode) {
    case "go - on":thisobjmode= "on - ing" ; thisobjtime= 0 ; #switch# = true ; return "#MD<img src='https://user-images.githubusercontent.com/52259890/219705758-abfb74ad-5b41-4be7-972b-e7cf54a0bfe3.gif' width='80%'>"
    case "on - ing": thisobjtime++ ; thisobjmode +="";return "#MD<img src='https://user-images.githubusercontent.com/52259890/219705758-abfb74ad-5b41-4be7-972b-e7cf54a0bfe3.gif' width='80%'>"
    case "go - off": thisobjmode = "off - ing"; thisobjtime = 0; #switch# = false ;return "#MD<img src='https://user-images.githubusercontent.com/52259890/219711727-8027dde0-1d93-4194-82ec-86009183f8c6.gif' width='80%'>"
    case "off - ing":thisobjtime++ ; thisobjmode +="";return "#MD<img src='https://user-images.githubusercontent.com/52259890/219711727-8027dde0-1d93-4194-82ec-86009183f8c6.gif' width='80%'>"
    case "off":return "#MD<img src='https://user-images.githubusercontent.com/52259890/219713371-76ab63f7-c1a7-4b4b-9548-428682ee45a3.gif' width='80%'>"
    case "on":return "#MD<img src='https://user-images.githubusercontent.com/52259890/219713381-4530445b-d41e-468f-8861-d60dae93511a.gif' width='80%'>"
    }
    })()`
        .replace(/thisobj/g, `_${a}`)
        .replace(/#switch#/g, Vname)
        .replace(/width='80%'/g, `width='${size}%'`);
        let out = [['eval(`'+rtext+'`)']]
        console.log('B_textExp:' + JSON.stringify(out))
    return out
    },
    
  Button_TextR_exp: (a,size) => { let rtext =
    thisobjtime=`
    (()=>{
    if( thisobjtime > 0 ) { thisobjtime++}
    if( thisobjtime > 2000 ) { 
      thisobjtime= 0 
      thisobjmode= thisobjmode.replace(" - ing","") }
      return thisobjtime
    })()`
        .replace(/thisobj/g, `_${a}`)
        .replace(/width='80%'/g, `width='${size}%'`);
        let out = [['eval(`' + rtext + '`)']]
        console.log('B_TimeExp:' + JSON.stringify(out))
        return out
    },

  Button_Action_exp: (a, size, Vname) => { let rtext = 
    thisobjmode=`
    (()=>{
    thisobjmode??="off"
    switch (thisobjmode){
    case "off": thisobjmode= "go - on";new setvar({${Vname}:bool(true)}).run;break
    case "on": thisobjmode= "go - off";new setvar({${Vname}:bool(false)}).run;break
    }
    })()`
      .replace(/thisobj/g, `_${a}`)
      .replace(/width='80%'/g, `width='${size}%'`);
      let out = [['eval(`' + rtext + '`)']]
      console.log('B_ActionExp:' + JSON.stringify(out))
      return out
    },
 }




window.all = {
    add: (obj) => {
        let id = obj[ID] ?? getid()
        all[id] = obj
        obj.self = function () { return all[id] }
        obj[ID] = id
        // console.log(`   <all> remapthisGetter_${obj[NAME]}`)
        Object.defineProperty(all, obj[NAME], {
            configurable: true,
            get() {
                return Object.values(all).find(k => k[NAME] == obj[NAME])
            }
        }
        )
        return id
    }
}

function lookforMother(obj) {
    if (obj[Mother] != null) {
        let a = lookforMother(obj[Mother])
        if (typeof a[obj[NAME]] == "undefined") {
            a[obj[NAME]] = obj.val()
        }
        return lookforMother(obj[Mother])[obj[NAME]]
    }
    else {
        if (typeof zdjl.getVar(obj[NAME]) == 'undefined') {
            eval.call(`window.${obj[NAME]} = ${obj.val()}`)
            zdjl.setVar(obj[NAME], obj.val())
        }
        return zdjl.getVar(obj[NAME])
    }
 }
function scanforpath(obj) {
    if (!obj.Mother) { return obj.name }
    let objnow = obj
    let list = obj.name
    while (typeof objnow.Mother != "undefined") {
        list = objnow.Mother.name + "." + list
        objnow = objnow.Mother
    }
    return list
 }
function set(name, value = 114) {
    let list
    var path
    if (name.includes(".")) { list = name.split(".") }
    else { list = [name] }
    for (i in list) {
        if (i == 0) { path = zdjl.getVar(list[0]); continue }
        path = path[name]
    }
    if (value == 114) { return path }
    path = value
    if (list.length == 1) { zdjl.setVar(name, value) }
 }
function get(name) { return set(name) }
function getid() { //生成一个在all里不重复的数值
    let id = 0
    while (all[id]) { id++ }
    return id
 }
function exp(keyname, value, apply) {
    if (typeof value === "function") {
        if (value.toString().match(/^\(\)/)) {
            value = value.toString().replace(/\s*\(\s*\)\s*\=\>\s*/, "")
            if (value[0] == '{') { value = value.macth(/\{([\s\S]*)\}/) }
            apply.e[keyname] = { valueExp: value, varType: 'expression' }
        }
    }
    else if (Array.isArray(value) && Array.isArray(value[0]) && typeof value[0][0] == "string") {
        let _id
        _id = id ?? window.id ?? global.id ?? zdjl.getVar('id')
        let out = value[0][0]
            .replace(/#this/g, `all[${_id}]`)
            .replace(/this/g, `eval(all[${_id}].R)`)
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
            return Object.entries(object).map(([key, value]) => { return { name: key, value: value } }).filter(i => typeof i.value != "undefined")
        }
     }
    static Array2Object(array = []) {
        if (array.length == 0) { return {} }
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
            })
        })
     }
    __vars = {}
    showInput = true
    mustInput = false
    syncValueOnChange = true
    constructor(k, v, type = "string", obj) {
        this[R] = false
        this.k = k
        this.varType = type
        this.exp(k, v)
        Object.assign(this, obj)
     }
    val = (a) => {
        if (a) { this.exp(this.k, a); }
        if (this.varType == 'object') { return {} }
        if (typeof this[this.k] != "undefined") { return this[this.k] }
        else {
            try { return eval(this.__vars[this.k].valueExp) }
            catch { console.error('eval error'); return undefined }
        }
     }
    exp = (k, v) => { exp(k, v, this); return this }
    get real() { return lookforMother(this) }
    get reload() { this.val(this.real) }
    get nid() { all.add(this); return this[ID] }
    get id() { return this[ID] }
    get e() { return this.__vars }
    get r() { this[R] = true; return this }
    get name() { return this[NAME] }
    get Mother() { return this[Mother] }
    get R() { return this.REALPATH }
    textT = (a) => { return this.exp('textLineBefore', a) }
    textB = (a) => { return this.exp('textLineAfter', a) }
    textL = (a) => { return this.exp('showInputLabel', a) }
    textR = (a) => { return this.exp('textAppendRight', a) }
    w = (a) => { return this.exp('showInputWidthBasis', a) }
    g = (a) => { return this.exp('showInputWidthGrow', a) }
    h = (a) => { return this.exp('showInputHiddenView', a) }
    size = (a) => { return this.exp('textSize', a) }
    color = (a) => { return this.exp('textColor', a) }
    action = (a) => { this.action = a; return this }
    list = (a) => { return this.exp('stringItems', a) }
    js = (a) => { this.action = js(a); return this }
    C = (a) => { this.closeDialogOnAction = a; return this }
    push = (a) => { this[a.name] = a.value; return this }
    style = (a) => { this.buttonStyle = a; return this }
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
    get ww() { return this.w(100) }
    get set() { new setvar({ name: this[NAME] || "noname", value: this }).run }
    get wa() { return this.wa() }
    apply = (a) => {
        this.objectVars = [...this.objectVars, ...Var.Object2Array(a)]
        this[CJSON] = Var.Array2Object(this.objectVars)
        Var.ReMap(this, this.objectVars)
        this.objectVars.forEach(i => {
            i.value[Mother] = this
        })

        return this
     }
    push = (a) => {
        this.objectVars = [...this.objectVars, ...Var.Object2Array(a)]
        this[CJSON] = Var.Array2Object(this.objectVars)
        Var.ReMap(this, this.objectVars)
        this.objectVars.forEach(i => {
            i.value[Mother] = this
            i.value[NAME] = i.name
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
        let thisid
        thisid = all.add(this)
        id = thisid
        window.id = thisid
        global.id = thisid

        this.objectVars = Var.Object2Array(input)
        this[CJSON] = Var.Array2Object(this.objectVars)
        Var.ReMap(this, this.objectVars)
        this.objectVars.forEach(i => {
            i.value[Mother] = this
            i.value[NAME] = i.name
        }
        )
    }
 }
class Action {
    constructor(type, obj = {}) {
        this.type = type
        if (obj) { Object.assign(this, obj) }
        this.scriptCallbacks = new Object()
        return this
    }
    then = (a) => {
        this.scriptCallbacks = {}
        this.scriptCallbacks.afterExecSuc = a; return this
    }
    then_js = (input) => {
        this.scriptCallbacks = {}
        this.scriptCallbacks.afterExecSuc = js(input); return this
    }
 }
{ // 函数创建
    function string(input = "") { return new Var('value', input, "string") }
    function number(input = 0) { return new Var('number', input, "number") }
    function bool(input = false) { return new Var('value', input, "bool") }
    function text(input = "") { return new Var('textContent', input, "ui_text").sync }
    function button(input = "") { return new Var('buttonText', input, "ui_button").sync }
    function object(input = {}, id = null) { return new obj(input, id) }
    function image(input = {}) { return new Var('imageData', input, "ui_image") }
    function color(input) { return new Var('color', input, "color") }
    function xy(input) { return new Var('position', input, "position") }
    function area(input) { return new Var('screen_area', input, "screen_area") }
    function jscode(input) { return new Var('jsCode', input, "js_function") }
    function Switch(SwitchValueName,size=80) { let Thisobj = object().t
        if (!SwitchValueName) { zdjl.alert(
         `开关输入参数错误 Switch() 需要一个必须输入参数 SwitchValueName
         input : 
           SwitchValueName : string 
             < 开关 开启与关闭 修改的全局变量中的 布尔值变量名 >
           size : string 
             < 开关 大小 >
         `.replace(/^\s+/gm, ''));throw Error()}
        new setvar([
            { name: `_${id}time`, value: number(0).s },
            { name: `_${id}mode`, value: string(`off`).s },
            { name: SwitchValueName, value: bool(false).s }
        ]).run
        return Thisobj.apply({ button: button().c.style("none")
            .text(Exp_Modules.Button_Text_exp(id, size))
            .textR(Exp_Modules.Button_TextR_exp(id, size))
            .js(Exp_Modules.Button_Action_exp(id, size, SwitchValueName))
        })}

    function setvars(input) { return new setvars(input) }
    function js(input) { new Action('运行JS代码', { jsCode: "" })
        let outt
        outt = Array.isArray(input) ? input[0][0] : input
        outt = outt
            .replace(/#this/g, `all[${id}]`)
            .replace(/this/g, `eval(all[${id}].R)`)

        let out = new Action('运行JS代码', { jsCode: outt })

        return out
     }
    

 }


class setvar extends Action {
    constructor(input) {
        super('设置变量')
        this.vars = Var.Object2Array(input)
        this[CJSON] = Var.Array2Object(this.vars)
        return this
    }
    get scan() {
        function ascan(vars) {
            vars.forEach((v) => {
                v.value[NAME] = v.name
                if (typeof v.value == "undefined") {
                    return
                }
                v.value.REALPATH = scanforpath(v.value)
                lookforMother(v.value)
                if (v.value.varType == "object") {
                    ascan(v.value.objectVars)
                    v.value.remap
                }
                if (v.value[R]) { v.value.reload }

            })

        }
        ascan(this.vars, all)

        return this
    }
    get run() {
        this.scan
        zdjl.runActionAsync(this)
    }
 }



for (i of [getid, Var, exp, obj, Action, string, number, bool, text, button, object, image, color, xy, area, jscode, setvars, js, setvar, set, get, lookforMother, scanforpath, Switch]) {
    window[i.name] = i
 }

