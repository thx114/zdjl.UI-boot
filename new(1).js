const getValue = Symbol('getValue')
const real = Symbol('real')
const val = Symbol('val')
const NAME = Symbol('NAME')
const ValueName = Symbol('ValueName')
const RELOAD =Symbol("RELOAD")
// window =zdjl.getVar('global')
// global=window
class VlaueVar {
  showInput=true
  mustInput=false
  syncValueOnChange=true
  __vars = {}
  static Prop_text = [
    'textLineBefore',
    'textLineAfter',
    'showInputLabel',
    'textAppendRight',
  ]
  static Prop_base = [
    'showInput',
    'mustInput',
    'syncValueOnChange',
  ] 
  constructor(varType,value,object={}){
    this.varType = varType
    const PropsList=Symbol.for('PropsList')
    this[PropsList]=new Array()
    Object.assign(this,object)
    this[PropsList].push(...VlaueVar.Prop_base)
    this[PropsList].push(...VlaueVar.Prop_text) 
    this[RELOAD]=true
    switch (varType){
      case "string":
        this.__vars.value = exp(value)
        this[PropsList].unshift('_value')
        break
      case "number":
        this.__vars.number  = exp(value)
        this[PropsList].unshift('_number')
        break
      case "object":
        this.objectVars=[]
        this.showInputHiddenLabel=true
        this[PropsList].unshift('objectVars')
        this[getValue] = {}
        this[RELOAD]=false
        value = {}
        break
      case "bool":
        this.__vars.value = exp(value)
        this[PropsList].unshift('_value')
        break
      case "expression":
        this.valueExp = value
        this[PropsList]=['valueExp']
        break 
      case "ui_text":
        this.__vars.textContent = exp(value)
        this[PropsList].unshift('_textContent')
        break
      case "ui_button":
        this.action = value
        this[PropsList].unshift('action')
        break
      case "ui_image":
        this.imageData = value
        this[PropsList].unshift('imageData') 
        break
    }
    this[getValue] = value
    this[real] = global
    if (this[PropsList][0][0] === '_') {
      this[ValueName] = [this.__vars[this[PropsList][0].slice(1)],'valueExp']
      // console.log(`${this[PropsList][0].slice(1)} - ${Object.keys(this.__vars)} - ${this.__vars[this[PropsList][0].slice(1)]}`)
    }else{
      this[ValueName] = [this,this[PropsList][0]]
    }


  }
  get vlaue() { return this[real][this[NAME]] }
  get name() { return this[NAME] }
  get real() { return this[real] }
  set reload(a=false){this[RELOAD]=a;return this}
  get r(){this.reload=!this[RELOAD];return this}
  
  get c(){ this.closeDialogOnAction=false;return this}




}


class setvars {
  constructor(obj){
    this.type='设置变量'
    this.vars=[]
    function scan(obj,realpath,applist,app,s=false){
      console.log(`scan for  ${obj.constructor.name} at ${app.varType||'global'}`)


      for (const [key,value] of Object.entries(obj)){


        applist.push({"name":key,"value":value})
        Object.defineProperty(app, key, {
        get() {
            if (applist.find(v => v.name == key)) {
              return applist.find(v=>v.name==key).value
          }
          else {
              return app[key]
          }
        },
        set(a){
          if (a instanceof undefined && applist.find(v=>v.name==key)){
            //vars 赋值 undefined
            applist.splice(applist.findIndex(v=>v.name==key),1)
          }
          else if (a instanceof VlaueVar && applist.find(v => v.name == key)){
            //vars 赋值 对应 var
            applist.find(v => v.name == key).value=a.value
          }
          else if (app[key] === undefined &&a instanceof VlaueVar){
            //vars 与 this 都没有
            applist.push({name:key,value:a})
          }
          else {
            //this 有
            this[key]=a
          }
        }
      }
        )
        if (s){realpath[key]=zdjl.getVar(key)}
        // if (value
          if (typeof realpath[key] != "undefined" && typeof value[val] == 'undefined') {
          //全局有 不是对象
          if (value[ValueName][0].varType=='expression'){

            value[ValueName][0][value[ValueName][1]] = ` '${realpath[key]}' `
            console.log(` ${realpath[key]} >> ${value[ValueName][1]}`)
            value[getValue] = value[ValueName][0][value[ValueName][1]]
            }

          }
          else if (typeof realpath[key] == "undefined" && typeof value[val] != 'undefined') {
          // 全局无 是对象
            realpath[key] = {}
          }
        else if (typeof realpath[key] == "undefined" && typeof value[val] == 'undefined') {
        //全局无 不是对象
        

          value[ValueName][0][value[ValueName][1]] = ''
          value[getValue] = value[ValueName][0][value[ValueName][1]]

        }


          value[real] = realpath
          value[NAME] = key
        console.log(`    > ${key}  <${value.varType || 'object'}> :${value[getValue]}`)
        if (value instanceof VlaueVar ==false){

          if (typeof realpath[key] == "undefined") {
          realpath[key] = {}
          }
          applist[applist.length - 1].value = value[val]
          applist[applist.length - 1].value[real] = realpath
          applist[applist.length - 1].value[NAME] = key

          scan(value, realpath[key], applist[applist.length - 1].value.objectVars, applist[applist.length - 1].value)
        }


      }
    }
    scan(obj,window,this.vars,this,true)
  }
}

function string(a) { return new VlaueVar("string", a) }
function object(a) { a[val] = new VlaueVar("object", a) ;return a}
function number(a) { return new VlaueVar("number", a) }
function bool(a) { return new VlaueVar("bool", a) }
function expression(a) { return new VlaueVar("expression", a) }
function text(a) { return new VlaueVar("ui_text", a) }
function button(a) { return new VlaueVar("ui_button", a) }
function image(a) { return new VlaueVar("ui_image", a) }
function exp(a) {
  switch (typeof a) {
    case 'function': return expression(a.toString())
    case 'undefined': return expression("''")
    default : return expression(`'${a}'`)
  }
}
function js(a) {return {type:'运行JS代码',jsCode:a[0][0]}}
// justobj={}
// justobj.test = 'wwwww'
模块编辑器=object({
av1:string('h'),

})
window.runtime=
new setvars({
  test:string(),
  vvv:模块编辑器
  
})

// zdjl.setVar('stop',false)
// stop=false
  // runtime.justobj
  // zdjl.alert(JSON.stringify(runtime))
// zdjl.runActionAsync(runtime).then(()=>{
// while (stop==true){}
zdjl.runActionAsync(runtime)
// }())
// )
// zdjl.alert(JSON.stringify(window))
// zdjl.alert()