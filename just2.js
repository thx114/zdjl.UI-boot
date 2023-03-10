

ID = Symbol('ID')
M = Symbol('M')
window.FINDM=M
all
if (typeof all == 'undefined') { var all = {}}

class Main{
    static checkRuntime(){
        if(typeof window === 'undefined'){
            globalThis.window = globalThis
            window.zdjl={
                setVar(name,value){window[name]=value},
                getVar(name){return window[name]},
                alert(msg){console.log('alert:',msg)},
                runActionAsync(input){console.log('runActionAsync:',input)},
            }
        }
     }
    constructor(){
        //Main.checkRuntime()
        window.all = {}
     }
}
class All{
    static add(obj){window.id=All.getid();all[id] = obj;return id}
    static getid(obj=all) { let id = 0 ;while (obj[id]){id++}return id}
    static removeAllBuilder(p){
        for (let prop in p) {
          let descriptor = Object.getOwnPropertyDescriptor(p, prop);
          if (descriptor && descriptor.get) {
            delete p[prop];
          }
        }
        Object.freeze(p)
     }
    static removeAll(obj,a){
        a.forEach(i=>{
            delete obj[i]
        })
        return obj
     }
    get all(){return all}
}
class Obj {
    static as_object(iobj={}){let obj = iobj;return Object.entries(obj).map(([key,val])=>Object({name:key,value:val}))}
    static as_array(arr=[]){return Object.entries(arr).map(([key,val])=>Object({name:key,value:val}))}
    static object(arr=[]){return Object.assign({}, ...arr.map(item => ({[item.name]: item.value})))}
    static array(arr=[]){return  arr.map(item => item.value)}
    static add(obj,name,value){if(typeof value.output != 'undefined'){value=value.output}obj.objectVars.push({name:name,value:Obj.add_ons(obj,value)})}
    static delete(obj,name){obj.objectVars.splice(obj.objectVars.findIndex(item=>item.name==name),1)}
    static push(obj,value){this.add(obj,obj.objectVars.length+'',value)}
    static apply(obj,name,value){if(name instanceof Object){return Obj.applys(obj,name)}obj.objectVars.find(item=>item.name==name).value=value}
    static find(obj,name){return obj.objectVars.find(item=>item.name==name)}
    static getid(obj){All.add(obj)}
    static applys(obj,inputobj){
        let input =Obj.as_object(inputobj)
        input.forEach(item=>{
            if(!Obj.find(obj)){
                Obj.add(obj,item.name,item.value)
            }else{
                if (item.value === null){Obj.delete(obj,item.name)}
                else{Obj.apply(obj,item.name,item.value)}
            }
        })
        return obj
     }
    static remove(obj,name){
        if(name instanceof Array){name.forEach(item=>Obj.delete(obj,item))}
        else{Obj.delete(obj,name)}
     }
    static add_ons(obj,value){
        let input = value
        if(typeof value.output != 'undefined'){input = input.output}
        if(typeof value.varType === 'undefined'){ 

            input=Var.value2Var(value)
            }
        input[M]=obj[ID]
        input[ID]=All.add(input)
        console.log(`注册id:${input[ID]}`)
        if (typeof input.__vars != 'undefined'){
            Object.keys(input.__vars).forEach(key=>{
                input.__vars[key].valueExp = input.__vars[key].valueExp
                .replace('#this',`Obj.object(Var.findM(${input[ID]}).objectVars)`)
                .replace('this',`eval(Var.findR(Var.findM(${input[ID]})))`)

            })

        }
        input.__vars

        return input
     }
    
    constructor(input={}){
        this.varType = 'object'
        this.objectVars = []
        let objs
        if(input instanceof Array){
            if(input[0] instanceof Object && typeof input[0].name != "undefined"){ objs = Obj.object(input)}
            else{objs = Obj.object(Obj.as_array(input))}
            }
        else if(input instanceof Object){
            objs = input
        }
        else{zdjl.alert('输入错误')}
        Obj.applys(this,objs)

     }
}
class Var{
    static value2Var(value){
        switch(typeof value){
            case 'string': return string(value).output
            case 'number': return number(value).output
            case 'boolean': return bool(value).output
            case 'object': 
              if(value instanceof Array){return array(value).output}
              else{return object(value).output}
            case 'function': return func(value).output
            
        }
     }
    static findM(obj_or_id){if (typeof obj_or_id  == 'number'){return all[all[obj_or_id][M]]} return all[obj_or_id[M]]}
    static f(obj_or_id){if (typeof obj_or_id  == 'number'){return all[obj_or_id]}}
    static findR(obj_or_id){
        let now
        let str = ''
        if (typeof obj_or_id  == 'number'){now = all[obj_or_id]}
        else{now = obj_or_id}
        while(now[ID] != -1){
            let id =now[ID]
            
            if (now[M]==-1){
                let add = all[-1].vars.find(i=>i.value[ID]==id).name
                str = add+str
                break}
            let idbefor = id
            now = Var.findM(now)
            let idnow = now[ID]
            if(typeof now == 'undefined'){console.error(`FindM error at ${id}`)}
            let add
            try{
            add = now.objectVars.find(i=>i.value[ID]==id).name
            }catch{
                console.error(`find error :value now has no objectVars [${idbefor} > ${idnow}] ${JSON.stringify(now)}`)
                throw new Error()
            }
            str = add+str
            str = '.'+str
        }
        return str
     }

    constructor(Var){
        this.output = Var
        this.S(true)
        this.SYNC(true)
    }
    exp=(name,value)=>{
        let app = exp(value,true)
        function self(input){
            if (input instanceof Action||input instanceof Var){
                input = input.output
            }
            return input
        }
        if (BaseTlist.addlist[name][3]==1){
            if (app.mode==1){
                delete this.output[name]
                this.output.__vars ??={}
                this.output.__vars[name] = app
            }
            else{
                if(typeof this.output?.__vars?.[name] != 'undefined'){delete this.output?.__vars?.[name]}
                this.output[name]=self(app.valueExp)
            }
        }
        else{
            this.output[name]=self(app.valueExp)
        }
        return this

        }
    toJSON(){return `<Var> ${this.output.varType} :「${JSON.stringify(Object.values(this.output)[1])}」 ${JSON.stringify(this.output)}`}
    W=(any=100)=>{return this.exp('showInputWidthBasis',any)}
    G=(number=0)=>{return this.exp('showInputWidthGrow',number)}
    H=(bool=false)=>{return this.exp('showInputHiddenView',bool)}
    size=(number=13)=>{return this.exp('textSize',number)}
    color=(string='#FFFFFF')=>{return this.exp('textColor',string)}
    action=(action=Action)=>{return this.exp('action',action)}
    list=(array=[])=>{return this.exp('stringItems',array)}
    style=(string='button')=>{return this.exp('buttonStyle',string)}
    text=(string='')=>{return this.exp('buttonText',string)}
    textT=(string='')=>{return this.exp('textLineBefore',string)}
    textB=(string='')=>{return this.exp('textLineAfter',string)}
    textL=(string='')=>{return this.exp('showInputLabel',string)}
    textR=(string='')=>{return this.exp('textAppendRight',string)}
    textB=(string='')=>{return this.exp('textLineAfter',string)}
    BGcolor=(string)=>{return this.exp('backgroundColor',string)}
    BGimg=(object)=>{return this.exp('backgroundImg',object)}
    xy=(string='left')=>{return this.exp('showInputContentAlign',string)}
    OS=(bool=false)=>{return this.exp('onlyForShow',bool)}
    S=(bool=true)=>{return this.exp('showInput',bool)}
    M=(bool=false)=>{return this.exp('mustInput',bool)}
    SYNC=(bool=true)=>{return this.exp('syncValueOnChange',bool)}
    T=(bool=false)=>{return this.exp('showInputHiddenLabel',bool)}
    C=(bool=true)=>{return this.exp('closeDialogOnAction',bool)}
    get w(){this.W(100)}
    get wa(){this.W('auto')}
    get w0(){this.W(0)}
    get g(){this.G(1)}
    get g0(){this.G(0)}
    get h(){this.H(true)}
    get h0(){this.H(false)}
    get size0(){this.size(13)}
    get color0(){this.color('#FFFFFF')}
    get color1(){this.color('#303030')}
    get BGcolor0(){this.BGcolor('#303030')}
    get BGcolor1(){this.BGcolor('#404040')}
    get BGcolor2(){this.BGcolor('#505050')}
    get xyL(){this.xy('left')}
    get xyR(){this.xy('right')}
    get xyC(){this.xy('center')}
    get os(){this.OS(true)}
    get s(){this.S(false)}
    get m(){this.M(true)}
    get sync(){this.SYNC(false)}
    get t(){this.T(true)}
    get c(){this.C(false)}

}
class setvar{
    static scan(input,inputlist){
        let obj = input
        if(typeof obj.output != 'undefined'){obj = obj.output}
        if(typeof obj.value != 'undefined'){obj = obj.value}
        obj[inputlist].forEach(now=>{

            if(typeof now.output != 'undefined'){now = now.output}
            if(typeof now.name != 'undefined'){now = now.value}
            now[M]=obj[ID]
            if(typeof obj[ID] == 'undefined'){
                console.error(`父对象ID缺失: var ${now[ID]} at ${obj[ID]} ${JSON.stringify(now)}`)
            }
            
            
            if (now.varType==="object"){
                setvar.scan(now,'objectVars')
            }
        })

     }
    constructor(input){
        let objs
        this.type = '设置变量'
        if(input instanceof Array){
            if(input[0] instanceof Object && typeof input[0].name != "undefined"){ objs = Obj.object(input)}
            else{objs = Obj.object(Obj.as_array(input))}
            }
        else if(input instanceof Object){
            objs = input
        }

        this.vars = Obj.applys({objectVars:[]},objs).objectVars
        this[ID] = -1
        
        setvar.scan(this,'vars')
        all[-1]=this
     }
}
class Action{
    static delay(obj,time,Dunit=0){
        if (typeof time == 'string'){ 
            if (time.includes('ms')){obj.delayUnit=0;obj.delay=Number(time.replace('ms',''))}
            else if (time.includes('s')){obj.delayUnit=1;obj.delay=Number(time.replace('s',''))}
            else if (time.includes('m')){obj.delayUnit=2;obj.delay=Number(time.replace('m',''))}
            else if (time.includes('h')){obj.delayUnit=2;obj.delay=60*Number(time.replace('h',''))}
            else{zdjl.alert('运行等待时间输入不合法')}
        }
        else{
            obj.delayUnit=Dunit
            obj.delay=time
        }
     }
    static then(obj,action){obj.scriptCallbacks ??= {};obj.scriptCallbacks.afterExecSuc = action}
    static then_js(obj,code){obj.scriptCallbacks ??= {};obj.scriptCallbacks.afterExecSuc = js(code)}
    constructor(input){
        this.output=input
     }
    toJSON(){return `<Action> ${this.output.type} :「${JSON.stringify(Object.values(this.output)[1])}」 ${JSON.stringify(this.output)}`}
    delay(time,Dunit=0){Action.delay(this.output,time,Dunit);return this}
    then(action){Action.then(this.output,action);return this}
    then_js(code){Action.then_js(this.output,code);return this}
    get run(){run(this.output);return this}
}
{
 function string(value='') {return new Var({varType:'string',value:value})}
 function number(value=0) {return new Var({varType:'number',number:value})}
 function bool(value=false) {return new Var({varType:'boolean',value:value})}
 function object(value={},isaddon) {return new Var(new Obj(value,isaddon))}
 function array(value=[]) {return new Var({varType:'object',objectVars:Obj.as_array(value),get get(){return Obj.array(this.objectVars)}})}
 function func(value=()=>{}){return new Var({varType:'js_function',jsCode:(typeof value=='string')?value:value.toString()})}
 
 function button(text){return new Var({varType:'button',buttonText:text})}
 function image(input = {}){return new Var({varType:'imageData',data:input})}
 function color(input = {}) { return new Var({varType:'color',color:input})}
 function xy(input={}) { return new Var({varType:'position',position:input} )}
 function area(input={}) { return new Var({varType:'screen_area',screen_area:input} )}
 function text(input='') { return new Var({varType:'ui_text',textContent:input} )}
 
 function setvars(input){return new Action( new setvar(input))}
 function run(input){zdjl.runActionAsync(input)}
 function js(input){return {type:'运行JS代码',jsCode:input}}
 
 function FO(id){return `eval(Var.findR(${id}))`}
 function FT(id){return `all[${id}]`}
 function direct(input){return input}
 function set2(input,sets){
    let SET = 0
    let OUT
    Object.entries(input).forEach(([key,val],index)=>{
        if(sets[index] == String){ if(val.length>SET){SET = val.length;OUT = key} }
    })
    return input[OUT]
  }
 function exp(input,need=false){
    let out
    let mode 
    switch(typeof input){
        case 'function': out= `(${input.toString()})()`;mode = 1;break
        case 'object': 
        if(input instanceof Array &&input[0] instanceof Array&&typeof input[0][0] == 'string'){out = input[0][0];mode = 1}
        else{out = input;mode = 0};break
        default: out= input;mode=0;break
    }
    if(need){return {varType:'expression',valueExp:out,mode:mode}}
    else{return {varType:'expression',valueExp:out}}
 }
}
new Main()
BaseTlist = {
    funlist:{
      string:               ['字符串',1,string,['value_string']],
      number:               ['数字',1,number,['number']],
      boolean:              ['布尔',1,bool,['value_boolean']],
      object:               ['对象',0,object,['objectVars']],
      func:                 ['函数',0,func,['jsCode']],

      text:                 ['文本',1,text,['textContent']],
      button:               ['按钮',1,button,['buttonText']],
      image:                ['图片',0,image,['data']],
      color:                ['颜色',1,color,['color']],
      xy:                   ['位置',1,xy,['position']],
      area:                 ['区域',1,area,['screen_area']],
    },
    addlist:{
      value_string:         ['内容',direct,`string()`,1,'value'],
      value_boolean:        ['布尔',direct,`bool()`,1,'value'],
      value:                ['',direct,null,1],
      number:               ['数字',direct,`number()`,1],
      objectVars:           ['对象',direct,`text('未实现')`,0],
      jsCode:               ['',direct,`func()`,0],

      textContent:          ['内容',direct,`string()`,1],
      buttonText:           ['按钮文字',direct,`string()`,1],
      data:                 ['图片内容',direct,`image()`,0],
      color:                ['颜色',set2,[`object({0:color(),1:string()})`,[String,String]],1],
      position:             ['位置',direct,`xy()`,1],
      screen_area:          ['区域',direct,`area()`,1],

      showInputWidthBasis:  ['显示宽度',direct,`string('auto').list(['100%','95%','90%','85%','80%','75%','70%','65%','60%','55','50%','45%','40%','35%','30%','25%','20%','15%','10%','5%','0%'])`,1],
      showInputWidthGrow:   ['撑满空间',direct,`number(0)`,1],
      showInputHiddenView:  ['隐藏显示',direct,`bool()`,1],
      textSize:             ['文字大小',direct,`number(13)`,1],
      textColor:            ['文字颜色',set2,[`object().apply({v1:color().wa.t.h([["typeof this.v2 !='undefined' && this.v2.length>1"]]),v2:string().wa.t.h([['typeof this.v1=="number"']])})`,[String,String]],1],
      action:               ['按钮动作',set2,["object().apply({v1:action().wa.h([[`typeof this.v2 !='undefined' && this.v2.length>1`]]),v2:string().wa.h([[`typeof this.v1 !='undefined' && this.v1.type>0`]])})",[Action,String]],0],
      stringItems:          ['选择列表',direct,`list()`,1],
      buttonStyle:          ['按钮外观',direct,`string().list(['button','link','none'])`,0],
      buttonText:           ['按钮文字',direct,`string()`,1],
      textLineBefore:       ['上文本',direct,`string()`,1],
      textLineAfter:        ['下文本',direct,`string()`,1],
      showInputLabel:       ['标题',direct,`string()`,1],
      textAppendRight:      ['右文本',direct,`string()`,1],
      backgroundColor:      ['背景颜色',direct,["object().apply({v1:color().wa.t.h([[`typeof this.v2 !='undefined' && this.v2.length>1`]]),v2:string().wa.t.h([[`typeof this.v1=='number'`]])})",[String,String]],1],
      backgroundImg:        ['背景图片',direct,`image()`,1],
      showInputContentAlign:['位置',direct,`xy()`,1],
      onlyForShow:          ['仅展示',direct,`bool()`,0],
      showInput:            ['显示变量',direct,`bool()`,0],
      mustInput:            ['必须输入',direct,`bool()`,0],
      syncValueOnChange:    ['SYNC',direct,`bool()`,0],
      showInputHiddenLabel: ['隐藏标题',direct,`bool()`,0],
      closeDialogOnAction:  ['按钮关闭界面',direct,`bool()`,0],


    }

}
let list =[Action,Var,Obj,setvar, string,number,bool,object,func, button,image,color,xy,area,text, setvars,run,js, FO,FT,direct,set2,exp]
list.forEach(i=>{window[i.name]=i})
setvars({
    test:object({
        a:string().textR([[`#this.b`]]),
        b:string('atest')

    })}).run





