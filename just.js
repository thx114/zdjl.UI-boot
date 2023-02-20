//版本 0.32<conditions> 2023.2.19
// if (typeof window == "undefined") { var window = global; }
// if (typeof zdjl == "undefined") { var zdjl={
//    getVar: function (name) { global[name] },
//    setVar:function(name,value){global[name]=value},
//    alert:function(msg_){console.log(msg_)},
//    runActionAsync:function(a){return console.log(a)  }
// } }

const ID = Symbol("ID")
const CJSON = Symbol("CJSON")
const NAME = Symbol("NAME")
const Mother = Symbol("Mother")
const R = Symbol("R")
const REALPATH = Symbol("REALPATH")
var id

window.SwitchDefaultTime = 100
window.SwitchDefaultSize = 100
window.TheImgSave = {
    off : "<img src=\"https://user-images.githubusercontent.com/52259890/219910219-ce0abfa1-6252-41ae-9a1e-b19e14394197.png\" width=\"80%\">",
    on : "<img src=\"https://user-images.githubusercontent.com/52259890/219910229-2c158ad8-1d04-4cff-919f-9b0728e2c2e8.png\" width=\"80%\">",
    goOn:[
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910269-44a4c078-d8c6-4b0b-8bd1-d6a22a45b7ab.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910241-bfdf25d0-be6b-4fbd-8a92-169ec721f332.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910244-079e9225-5c90-4a3a-a023-1c39c35a2133.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910247-1cd1c246-c7e1-484c-b83d-ee3c80c4552b.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910249-09eca473-e93e-4952-be3b-2b41c8b952e3.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910250-0b887251-10e2-4a21-ac8b-bcb0a3b71468.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910252-4761975d-6e6e-4425-b945-64207882ca29.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910254-3a126ce2-79e1-476e-a521-e8fd06e888dc.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910255-d5069147-7b62-4ae2-94ef-7c9c13a808aa.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910256-eb065815-387a-4a7c-9163-29dd6daa1f63.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910258-fb0fd727-bc74-4b52-aecc-d4b36a03910c.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910260-e8fad093-37ef-4ec8-b53d-33d1d960e3e3.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910262-e46bfd7d-c475-46b1-83bf-ede4efc31155.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910263-d1b64573-b80b-497c-ab14-e814aa286f0e.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910264-c883ebcf-b9bd-482f-b3b9-b2278a6a6ef3.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910266-7b8021e3-84d9-4d91-98d0-ef1c296c2b90.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910267-749d9349-9e7f-4ed9-accd-6764c23d0c8c.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910268-6c071cb5-ae67-43b9-9b51-5f61d1640ef8.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910283-dfde49df-f102-471f-9cb5-3a9952cc2f9e.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910287-22b0dc7e-11b9-462d-96c0-ed527d40fcf1.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910289-518b84b9-9f6b-4be1-998b-9412661f470b.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910290-911a6c50-3f3b-4a3f-ade6-c5654ab6b15d.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910292-4732b4ad-cc85-41e4-b469-b7c29091e30d.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910294-fae9d7a1-9638-426f-813c-e446a20b3736.png\" width=\"80%\">"
     ],
    goOff:[
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910305-b86665eb-de2e-47b6-aef3-8bda005f612a.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910306-64516040-2578-457a-a87d-4fedff0aaec6.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910307-17f91df4-401c-4109-b79e-6f11fb3eb5b4.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910308-792673b5-3551-4c2f-8954-307526d670b3.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910309-8e57ede0-be5d-4034-b963-1fd35d21ebc3.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910310-de317e02-32a1-4d92-9567-14486484afb1.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910313-33364395-c078-4d68-b79d-dee6228c6731.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910314-12f8bc80-5f4f-42b4-9739-e48d41d5576b.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910315-b888c3b5-61f3-4c91-bf45-1d0feb328f66.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910318-c97c86b1-9b60-4504-ac26-53240a7284bc.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910320-28e23f4b-aa96-485b-8297-b57cd1b9f81a.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910322-2ca535df-526f-4959-b3de-0b2cefb4388c.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910324-7e2f2cc3-6a48-4e34-9eb3-5fc4d4d93f8c.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910325-ade9dbe4-740b-4e49-a2dd-c9fab6451b6d.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910329-11726b58-c2ac-40c9-8bd1-9877cfe28de8.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910331-919ecedc-5b6b-4123-9082-09a182371d80.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910332-ac8540f2-dc1f-43cb-8493-17e8279c48f4.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910333-9ac74bc2-5c8c-4020-9f1c-3bbc6ab1d7f9.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910334-07eaced4-c83d-4fb0-a060-60110584e3ee.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910335-ad8f2b1b-a81a-4913-aaa7-d9a860cdcc5b.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910336-bab4c5da-e941-44bb-80aa-38456bef8156.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910337-5138628b-90a2-482f-8734-5bbfff68df51.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910338-edfd31cf-01df-4b25-847c-1187483e7d8c.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910340-10c08c4f-c9a3-42b2-a088-81f56cf14ad9.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910341-89986f90-9d8b-4661-a16a-deb832e4dea5.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910342-8c3a1a58-abf5-4aac-b454-4925aeced4e7.png\" width=\"80%\">",
     "<img src=\"https://user-images.githubusercontent.com/52259890/219910219-ce0abfa1-6252-41ae-9a1e-b19e14394197.png\" width=\"80%\">"
     ],
    go_on(a=100,b){ 
        return this.goOn.map((url,index)=>{
            let ms = index * 20 * a * 0.01 +  20 * a * 0.01;
            return `new setvar({thisobjimg:{varType:"string",value:'${url.replace('80%',b)}'}}).d( ${ms} ).run`
        }).join(';\n')
    },
    go_off(a=100,b){ 
        return this.goOff.map((url,index)=>{
            let ms = index * 20 * a * 0.01+  20 * a * 0.01;
            return `new setvar({thisobjimg:{varType:"string",value:'${url.replace('80%',b)}'}}).d( ${ms} ).run`
        }).join(';\n')
    }

 }

Exp_Modules = {
  Button_Text_exp : (a) => { let rtext =`SwitchImg()+thisobjimg`
        .replace(/thisobj/g, `_${a}`)
        let out = [['eval(`' + rtext +'`)']]
        console.log('B_textExp:'+out[0][0] )
    return out
    },

  Button_Action_exp: (a, size, Vname , time) => { let rtext = 
    thisobjmode=`
    (()=>{
    switch (thisobjmode){
    case "off": 
    new setvar({${Vname}:bool(true).s}).run; 
    new setvar({thisobjmode:string("on").s}).run; 
    ${TheImgSave.go_on(time,size+"%")} 
    ;break
    case "on": 
    new setvar({${Vname}:bool(false).s}).run; 
    new setvar({thisobjmode:string("off").s}).run ; 
    ${TheImgSave.go_off(time,size+"%")} 
    ;break
    }
    })()`
      .replace(/thisobj/g, `_${a}`)
      .replace(/80%/g, `${size/2}%`);
      let out = [['eval(`' + rtext + '`)']]
      console.log('B_ActionExp: '+out[0][0]  )
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
            return Object.entries(object).map(([key, value]) => { 
                if (value.varType=='object' && typeof all[key] == "undefined"){
                    console .log(`Find obj ${key}`)
                    Object.defineProperty(all, key, {
                        configurable: true,
                        get() {
                            return value
                        }
                    })
                }
                return { name: key, value: value } 
            }).filter(i => typeof i.value != "undefined")
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
    get wa() { return this.w("auto") }
    get xy() { return this.script.xy }
    get set() { new setvar({test:this}).run}
    apply = (a,remap=true) => {
        this.objectVars = [...this.objectVars, ...Var.Object2Array(a)]
        this[CJSON] = Var.Array2Object(this.objectVars)
        Var.ReMap(this, this.objectVars)
        this.objectVars.forEach(i => {
            i.value[Mother] = this
        })
        Var.ReMap(this, this.objectVars)
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
    get x(){return this.condition.colorData.x}
    get y(){return this.condition.colorData.y}
    get colors(){return this.condition.colorData?this.condition.colorData.color:this.condition.conditions.map(i=>i.color)}
    get xys(){return this.condition.conditions.map(i=>{return{x:i.x,y:i.y}})}
    get conditions(){return this.condition.conditions}
    get getallcolors(){
        this.conditions.forEach(i=>{
            if(i.type == "colorFound"){
            i.colorData.color = `#${zdjl.getScreenColor(i.colorData.x, i.colorData.y).toString(16).padStart(6, '0')}`
            }
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
        if(input === false){
            return this
        }
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
        })
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
    d = (a) => {
        this.delayUnit = 0
        this.delay=a
        return this 
     }
    get xy() {switch (this.type){
        case '单指手势':return this.gestureActions.map(i=>{let out = {...i.posData} ;delete out.type; return out})
        case "点击":return this.posData
     }}
    get run() {
        this.scan
        zdjl.runActionAsync(this)
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

    
 }


{ // 函数创建
    function string(input = "") { return new Var('value', input, "string") }
    function number(input = 0) { return new Var('number', input, "number") }
    function bool(input = false) { return new Var('value', input, "bool") }
    function text(input = "") { return new Var('textContent', input, "ui_text").sync }
    function button(input = "") { return new Var('buttonText', input, "ui_button").sync }
    function object(input = {}, id = null) { return new obj(input, id) }
    function image(input = {}) { return new Var('imageData', input, "ui_image") }
    function color(...args) { 
        function colorFound(icolor,x,y,similarPercent=99){return {
            type:'colorFound',
            colorData:{type:"color",x:x,y:y,limitPosX:x,limitPosY:y,color:((icolor===0)?'#000000':icolor),similarPercent:similarPercent},
            get color(){return this.colorData.color},
            get x(){return this.colorData.x},
            get y(){return this.colorData.y},
            get s(){return this.colorData.similarPercent},
            get getcolor(){this.colorData.color=`#${zdjl.getScreenColorAsync(this.x, this.y).toString(16).padStart(6, '0')}`;return this}
         }}
        if (args.length == 1) {return new Var('color', args[0], "color")}
        if (args.length > 1) {return colorFound(...args)} 
     }
    function xy(input) { return new Var('position', input, "position") }
    function area(input) { return new Var('screen_area', input, "screen_area") }
    function jscode(input) { return new Var('jsCode', input, "js_function") }
    function Switch(SwitchValueName,size=SwitchDefaultSize,time=SwitchDefaultTime) { 
        new setvar([
            { name: `_${SwitchValueName}img`, value: string(TheImgSave.off.replace('80%',size+"%")).s },
            { name: `_${SwitchValueName}mode`, value: string(`off`).s },
            { name: SwitchValueName, value: bool(false).s }
        ]).run
        return  button().c.style("none")
            .text(Exp_Modules.Button_Text_exp(SwitchValueName, size))
            .js(Exp_Modules.Button_Action_exp(SwitchValueName, size, SwitchValueName ,time))
        }
     function SwitchImg(){
        return '#MD <img src="https://user-images.githubusercontent.com/52259890/219910269-44a4c078-d8c6-4b0b-8bd1-d6a22a45b7ab.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910241-bfdf25d0-be6b-4fbd-8a92-169ec721f332.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910244-079e9225-5c90-4a3a-a023-1c39c35a2133.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910247-1cd1c246-c7e1-484c-b83d-ee3c80c4552b.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910249-09eca473-e93e-4952-be3b-2b41c8b952e3.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910250-0b887251-10e2-4a21-ac8b-bcb0a3b71468.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910252-4761975d-6e6e-4425-b945-64207882ca29.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910254-3a126ce2-79e1-476e-a521-e8fd06e888dc.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910255-d5069147-7b62-4ae2-94ef-7c9c13a808aa.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910256-eb065815-387a-4a7c-9163-29dd6daa1f63.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910258-fb0fd727-bc74-4b52-aecc-d4b36a03910c.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910260-e8fad093-37ef-4ec8-b53d-33d1d960e3e3.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910262-e46bfd7d-c475-46b1-83bf-ede4efc31155.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910263-d1b64573-b80b-497c-ab14-e814aa286f0e.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910264-c883ebcf-b9bd-482f-b3b9-b2278a6a6ef3.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910266-7b8021e3-84d9-4d91-98d0-ef1c296c2b90.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910267-749d9349-9e7f-4ed9-accd-6764c23d0c8c.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910268-6c071cb5-ae67-43b9-9b51-5f61d1640ef8.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910283-dfde49df-f102-471f-9cb5-3a9952cc2f9e.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910287-22b0dc7e-11b9-462d-96c0-ed527d40fcf1.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910289-518b84b9-9f6b-4be1-998b-9412661f470b.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910290-911a6c50-3f3b-4a3f-ade6-c5654ab6b15d.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910292-4732b4ad-cc85-41e4-b469-b7c29091e30d.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910294-fae9d7a1-9638-426f-813c-e446a20b3736.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910229-2c158ad8-1d04-4cff-919f-9b0728e2c2e8.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910305-b86665eb-de2e-47b6-aef3-8bda005f612a.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910306-64516040-2578-457a-a87d-4fedff0aaec6.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910307-17f91df4-401c-4109-b79e-6f11fb3eb5b4.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910308-792673b5-3551-4c2f-8954-307526d670b3.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910309-8e57ede0-be5d-4034-b963-1fd35d21ebc3.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910310-de317e02-32a1-4d92-9567-14486484afb1.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910313-33364395-c078-4d68-b79d-dee6228c6731.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910314-12f8bc80-5f4f-42b4-9739-e48d41d5576b.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910315-b888c3b5-61f3-4c91-bf45-1d0feb328f66.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910318-c97c86b1-9b60-4504-ac26-53240a7284bc.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910320-28e23f4b-aa96-485b-8297-b57cd1b9f81a.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910322-2ca535df-526f-4959-b3de-0b2cefb4388c.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910324-7e2f2cc3-6a48-4e34-9eb3-5fc4d4d93f8c.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910325-ade9dbe4-740b-4e49-a2dd-c9fab6451b6d.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910329-11726b58-c2ac-40c9-8bd1-9877cfe28de8.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910331-919ecedc-5b6b-4123-9082-09a182371d80.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910332-ac8540f2-dc1f-43cb-8493-17e8279c48f4.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910333-9ac74bc2-5c8c-4020-9f1c-3bbc6ab1d7f9.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910334-07eaced4-c83d-4fb0-a060-60110584e3ee.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910335-ad8f2b1b-a81a-4913-aaa7-d9a860cdcc5b.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910336-bab4c5da-e941-44bb-80aa-38456bef8156.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910337-5138628b-90a2-482f-8734-5bbfff68df51.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910338-edfd31cf-01df-4b25-847c-1187483e7d8c.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910340-10c08c4f-c9a3-42b2-a088-81f56cf14ad9.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910341-89986f90-9d8b-4661-a16a-deb832e4dea5.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910342-8c3a1a58-abf5-4aac-b454-4925aeced4e7.png" width="0%"><img src="https://user-images.githubusercontent.com/52259890/219910219-ce0abfa1-6252-41ae-9a1e-b19e14394197.png" width="0%">'
     }
    function action(input={}){return new Var('script', input, "script_action")}
    function n() { return text().ww.size(0) }
    function location(x,y) {return {type:'location',x:x,y:y} }    
    function Ba(boolname,JS,Imgs,size=100,time=100){
        let RUNLIST = ';'+ Imgs.map((url,index)=>{
            let ms = index * 20 * time * 0.01 +  20 * time * 0.01;
            return `new setvar({${boolname}img:{varType:"string",value:'${url.replace('80%',size+'%')}'}}).d( ${ms} ).run`
        }).join(';\n')
        new setvar([{name: `${boolname}img`,value:string(Imgs[0].replace('80%',size+'%')).s}]).run
        return button().c.style("none")
          .text([[`'#MD'+${boolname}img`]])
          .js([[JS[0][0]+RUNLIST]])
     }   
    function textlist(obj){ let thisobj = object(false).t
        Object.entries(obj).forEach(([key, value],index)=>{ 
            if(value[2]===0){thisobj.objectVars=[...thisobj.objectVars,...[
                {name:`_${index}`,value:text(value[0]).h(Array.isArray(key)?[[`!(${exp(key)})`]]:[[`!(${key})`]]).BGcolor('#035d00').color('#07ea00')},
                {name:`_${index}`,value:text(value[1]).h(Array.isArray(key)?[[`${exp(key)}`]]:[[key]]).BGcolor('#400300').color('#ff0005')}
            ]]}
            else{thisobj.objectVars.push({name:`_${index}`,value:text(value[0])
              .h(Array.isArray(key)?[[`${exp(key)}`]]:[[key]])
              .BGcolor(value[1]?'#035d00':'#400300')
              .color(value[1]?'#07ea00':'#ff0005')
            })}
        })
        thisobj.apply({})
        return thisobj
     }
    function condition(input){ 
        if (input instanceof Array) { return new Var('condition', {"type":"conditionSet","conditions":input}, "script_condition")  }
        return new Var('condition', input, "script_condition") 
     }

    function setvars(input) { var runtime = new setvar(input) ;runtime.run }
    function js(input) { new Action('运行JS代码', { jsCode: "" })
        let outt
        outt = Array.isArray(input) ? input[0][0] : input
        outt = outt
            .replace(/#this/g, `all[${id}]`)
            .replace(/this/g, `eval(all[${id}].R)`)

        let out = new Action('运行JS代码', { jsCode: outt })

        return out
     }
    function gesture(input=[]) { return new Action('单指手势', { gestureActions: input }) }
    function click(input) { return new Action('点击', { posData :input}) }


 }



window.M = {
    s:{
    a(name,size=100,time=100){return Exp_Modules.Button_Action_exp(name, size, name , time)[0][0]},
    t(name){return Exp_Modules.Button_Text_exp(name)[0][0]}
    }
 }


for (i of [getid, Var, exp, obj, Action, string, number, bool, text, button, object, image, color, xy, area, jscode, setvars, js, setvar, set, get, lookforMother, scanforpath, Switch,SwitchImg,n,Ba,gesture,click,location,action,textlist,condition]) {
    window[i.name] = i
 }

// a=new setvar({
// qee:textlist({
//     [[`this.qaq`]]:['qaq',true]
// })
// })
// a.run
// console.log(all.qee._0)
// run=
// new setvar({ 
//     qaq:condition([color('#000000',100,100,99)]) 
// })
// console.log(
// run.vars[0].value.conditions
// )