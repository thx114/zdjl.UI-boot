versionOUT=[2.0]

zdjl.setStorage('version', versionOUT[0],'Just_UI')
window.G_ver_UI=versionOUT[0]
ID = Symbol('ID')
M = Symbol('M')
window.FINDM=M

if (typeof all == 'undefined') { var all = {}}
G_Switch_size = 125
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
    static base64_to_img(base,size=100,end=''){
        return `#MD<img width="${size}" src="data:image/${end};base64,${base}" >`
     }
    static setVar(name,value){setvars({[name]:value})}
    static Find(a){return eval(Var.findR(Var.findM(a)))}
    get all(){return all}
}
class Obj {
    static as_object(iobj={}){let obj = iobj;return Object.entries(obj).map(([key,val])=>Object({name:key,value:val}))}
    static as_array(arr=[]){return Object.entries(arr).map(([key,val])=>Object({name:key,value:val}))}
    static object(arr=[]){return Object.assign({}, ...arr.map(item => ({[item.name]: item.value})))}
    static array(arr=[]){return  arr.map(item => item.value)}
    static add(obj,name,value){if(typeof value.output != 'undefined'){value=value.output}obj.objectVars.push({name:name,value:Obj.add_ons(obj,value,name)})}
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
    static add_ons(obj,value,name){
        let input = value
        if(typeof input.output != 'undefined'){input = input.output}
        if(typeof input.varType === 'undefined'){ input=Var.value2Var(input)}
        input[M]=obj[ID]
        input[ID]=All.add(input)
        console.log(`??????id:${input[ID]}`)
        if (typeof input.__vars != 'undefined'){
            Object.keys(input.__vars).forEach(key=>{
                if(input.BOOLNAME==true){
                    input.__vars[key].valueExp = input.__vars[key].valueExp
                    .replace(/%BOOLNAME%/g,name)
                }
                input.__vars[key].valueExp = input.__vars[key].valueExp
                .replace(/#this/g,`Obj.object(Var.findM(${input[ID]}).objectVars)`)
                .replace(/this/g,`eval(Var.findR(Var.findM(${input[ID]})))`)
            })
        }
        if (typeof input.action?.jsCode != 'undefined'){
            if(input.BOOLNAME==true){
                input.action.jsCode = input.action.jsCode
                .replace(/%BOOLNAME%/g,name)
                .replace(/#this/g,`Obj.object(Var.findM(${input[ID]}).objectVars)`)
                .replace(/this/g,`eval(Var.findR(Var.findM(${input[ID]})))`)
            }
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
        else{zdjl.alert('????????????')}
        Obj.applys(this,objs)

     }
     }
class Var{
    static value2Var(value){
        switch(typeof value){
            case 'string': return string(value).s.output
            case 'number': return number(value).s.output
            case 'boolean': return bool(value).s.output
            case 'object': 
              if(value instanceof Array){return array(value).s.output}
              else{return object(value).s.output}
            case 'function': return func(value).s.output
            
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
            if(typeof now[ID] == -1){return now.vars.find(i=>i.value[ID]==id).name}
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
        if(str.length<1){str='zdjl.getVars()'}
        return str
     }
    static exp(input){return {varType:'expression',valueExp:input}}
    static varsC(obj){obj.__vars??={}}
    constructor(Var){
        this.output = Var
        this.S(true)
        this.SYNC(true)
     }
    exp=(name,value)=>{
        console.log(value)
        if (typeof value.output != 'undefined'){value = value.output}
        if (typeof this.output[name] != 'undefined'){delete this.output[name]}
        if (typeof this.output?.__vars?.[name] != 'undefined'){delete this.output?.__vars?.[name]}
        if (value instanceof Function){value = [value]} // Exp function
        if (value instanceof Array && (value[0] instanceof Function)){ // Exp functions
            value.forEach(i=>{
            this.output.__vars??={}
            this.output.__vars[name]??=Var.exp('')
            this.output.__vars[name].valueExp+=`(${i.toString()})();`
            }) ;console.log(`Exp:${this.output.__vars[name].valueExp}`)}
        else if (value instanceof Array&&value[0] instanceof Array&&value[0][0] instanceof String){ // Exp strings
            value[0].forEach(i=>{
            this.output.__vars??={}
            this.output.__vars[name]??=Var.exp('')
            this.output.__vars[name].valueExp+=`(${i.toString()})();`
            }) ;console.log(`Exp:${this.output.__vars[name].valueExp}`)}
        
        else{this.output[name]=value;;console.log(`Exp:${this.output[name]}`)} // else
        return this
     }
    toJSON(){return `<Var> ${this.output.varType} :???${JSON.stringify(Object.values(this.output)[1])}??? ${JSON.stringify(this.output)}`}
    MORE(name,value){this.output[name]=value;return this}
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
    get w(){return this.W(100)}
    get wa(){return this.W('auto')}
    get w0(){return this.W(0)}
    get g(){return this.G(1)}
    get g0(){return this.G(0)}
    get h(){return this.H(true)}
    get h0(){return this.H(false)}
    get size0(){return this.size(13)}
    get color0(){return this.color('#FFFFFF')}
    get color1(){return this.color('#303030')}
    get BGcolor0(){return this.BGcolor('#303030')}
    get BGcolor1(){return this.BGcolor('#404040')}
    get BGcolor2(){return this.BGcolor('#505050')}
    get xyL(){return this.xy('left')}
    get xyR(){return this.xy('right')}
    get xyC(){return this.xy('center')}
    get os(){return this.OS(true)}
    get s(){return this.S(false)}
    get m(){return this.M(true)}
    get sync(){return this.SYNC(false)}
    get t(){return this.T(true)}
    get c(){return this.C(false)}
    js=(string='')=>{
        if (typeof string == "function"){string=`(${string})()`}
        return this.action(js(string))}

}
class setvar{
    static scan(input,inputlist,path='window'){
        let obj = input
        if(typeof obj.output != 'undefined'){obj = obj.output}
        if(typeof obj.value != 'undefined'){obj = obj.value}
        obj[inputlist].forEach(now=>{
            let name
            if(typeof now.output != 'undefined'){now = now.output}
            if(typeof now.name != 'undefined'){name = now.name;now = now.value}
            now[M]=obj[ID]
            if(typeof obj[ID] == 'undefined'){
                console.error(`?????????ID??????: var ${now[ID]} at ${obj[ID]} ${JSON.stringify(now)}`)
            }
            if (now.varType==="object"){

                if(path=='window'){
                    window[name] = {}
                    zdjl.setVar(name,new Object())}
                else{path[name]={}}
                if (path=='window'){setvar.scan(now,'objectVars',eval(name))}
                else{setvar.scan(now,'objectVars',path[name])}  
                
            }
            else{
                if(path=='window'){zdjl.setVar(name,Object.values(now)[1])}
                else{path[name]=Object.values(now)[1]}
            }
        })

     }
    constructor(input){
        let objs
        this.type = '????????????'
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
            else{zdjl.alert('?????????????????????????????????')}
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
        if (this.output.type=='??????JS??????'&&  typeof this.output.jsCode == "function"){
            this.output.jsCode=`(${this.output.jsCode.toString()})()`
            console.log(this.output.jsCode)
        }
     }
    toJSON(){return `<Action> ${this.output.type} :???${JSON.stringify(Object.values(this.output)[1])}??? ${JSON.stringify(this.output)}`}
    delay(time,Dunit=0){Action.delay(this.output,time,Dunit);return this}
    then(action){Action.then(this.output,action);return this}
    then_js(code){Action.then_js(this.output,code);return this}
    get run(){run(this.output);return this}
     }
{
 function string(value='') {return new Var({varType:'string',value:value})}
 function number(value=0) {return new Var({varType:'number',number:value})}
 function bool(value=false) {return new Var({varType:'boolean',value:value})}
 function object(value={},isaddon) {return new Var(new Obj(value,isaddon)).sync}
 function array(value=[]) {return new Var({varType:'object',objectVars:Obj.as_array(value),get get(){return Obj.array(this.objectVars)}})}
 function func(value=()=>{}){return new Var({varType:'js_function',jsCode:(typeof value=='string')?value:value.toString()})}
 
 function button(text){return new Var({varType:'ui_button',buttonText:text}).sync}
 function image(input = {}){return new Var({varType:'imageData',data:input})}
 function color(input = {}) { return new Var({varType:'color',color:input})}
 function xy(input={}) { return new Var({varType:'position',position:input} )}
 function area(input={}) { return new Var({varType:'screen_area',screen_area:input} )}
 function text(input='') { return new Var({varType:'ui_text',textContent:input} )}
 
 function setvars(input){return new Action( new setvar(input))}
 function run(input){zdjl.runActionAsync(input)}
 function js(input){return new Action({type:'??????JS??????',jsCode:input})}
 
 function Switch(bool){
    return button(bool).MORE('BOOLNAME',true).sync.c.style('none').text(()=>{
        switch(this['%BOOLNAME%']){
            case -2: return All.base64_to_img( BASE64_ZUI.off,G_Switch_size,'png' )
            case 2: return All.base64_to_img( BASE64_ZUI.on,G_Switch_size,'png' )
            case -1: return All.base64_to_img( BASE64_ZUI.go_off,G_Switch_size,'gif' )
            case 1: return All.base64_to_img( BASE64_ZUI.go_on,G_Switch_size,'gif' )
            case false: this['%BOOLNAME%']=-2;return All.base64_to_img( BASE64_ZUI.off,G_Switch_size,'png' )
            case true: this['%BOOLNAME%']=2;return All.base64_to_img( BASE64_ZUI.on,G_Switch_size,'png' )
        }}).js(()=>{
        switch(this['%BOOLNAME%']){
            case -2:this['%BOOLNAME%']=1;js(()=>{this['%BOOLNAME%']=2}).delay(500).run;break
            case 2: this['%BOOLNAME%']=-1;js(()=>{this['%BOOLNAME%']=-2}).delay(500).run;break
        }})
  }
 function infolist(){

 }
  
}
new Main()
// BaseTlist = {
//     funlist:{
//       string:               ['?????????',1,string,['value_string']],
//       number:               ['??????',1,number,['number']],
//       boolean:              ['??????',1,bool,['value_boolean']],
//       object:               ['??????',0,object,['objectVars']],
//       func:                 ['??????',0,func,['jsCode']],

//       text:                 ['??????',1,text,['textContent']],
//       button:               ['??????',1,button,['buttonText']],
//       image:                ['??????',0,image,['data']],
//       color:                ['??????',1,color,['color']],
//       xy:                   ['??????',1,xy,['position']],
//       area:                 ['??????',1,area,['screen_area']],
//     },
//     addlist:{
//       value_string:         ['??????',direct,`string()`,1],
//       value_boolean:        ['??????',direct,`bool()`,1],
//       value:                ['',direct,null,1],
//       number:               ['??????',direct,`number()`,1],
//       objectVars:           ['??????',direct,`text('?????????')`,0],
//       jsCode:               ['',direct,`func()`,0],

//       textContent:          ['??????',direct,`string()`,1],
//       buttonText:           ['????????????',direct,`string()`,1],
//       data:                 ['????????????',direct,`image()`,0],
//       color:                ['??????',set2,[`object({0:color(),1:string()})`,[String,String]],1],
//       position:             ['??????',direct,`xy()`,1],
//       screen_area:          ['??????',direct,`area()`,1],

//       showInputWidthBasis:  ['????????????',direct,`string('auto').list(['100%','95%','90%','85%','80%','75%','70%','65%','60%','55','50%','45%','40%','35%','30%','25%','20%','15%','10%','5%','0%'])`,1],
//       showInputWidthGrow:   ['????????????',direct,`number(0)`,1],
//       showInputHiddenView:  ['????????????',direct,`bool()`,1],
//       textSize:             ['????????????',direct,`number(13)`,1],
//       textColor:            ['????????????',set2,[`object().apply({v1:color().wa.t.h([["typeof this.v2 !='undefined' && this.v2.length>1"]]),v2:string().wa.t.h([['typeof this.v1=="number"']])})`,[String,String]],1],
//       action:               ['????????????',set2,["object().apply({v1:action().wa.h([[`typeof this.v2 !='undefined' && this.v2.length>1`]]),v2:string().wa.h([[`typeof this.v1 !='undefined' && this.v1.type>0`]])})",[Action,String]],0],
//       stringItems:          ['????????????',direct,`list()`,1],
//       buttonStyle:          ['????????????',direct,`string().list(['button','link','none'])`,0],
//       buttonText:           ['????????????',direct,`string()`,1],
//       textLineBefore:       ['?????????',direct,`string()`,1],
//       textLineAfter:        ['?????????',direct,`string()`,1],
//       showInputLabel:       ['??????',direct,`string()`,1],
//       textAppendRight:      ['?????????',direct,`string()`,1],
//       backgroundColor:      ['????????????',direct,["object().apply({v1:color().wa.t.h([[`typeof this.v2 !='undefined' && this.v2.length>1`]]),v2:string().wa.t.h([[`typeof this.v1=='number'`]])})",[String,String]],1],
//       backgroundImg:        ['????????????',direct,`image()`,1],
//       showInputContentAlign:['??????',direct,`xy()`,1],
//       onlyForShow:          ['?????????',direct,`bool()`,0],
//       showInput:            ['????????????',direct,`bool()`,0],
//       mustInput:            ['????????????',direct,`bool()`,0],
//       syncValueOnChange:    ['SYNC',direct,`bool()`,0],
//       showInputHiddenLabel: ['????????????',direct,`bool()`,0],
//       closeDialogOnAction:  ['??????????????????',direct,`bool()`,0],


//     }

// }
let list =[Action,Var,Obj,setvar,All, string,number,bool,object,func, button,image,color,xy,area,text, setvars,run,js,Switch]
list.forEach(i=>{window[i.name]=i})




setvars({
    a:Switch(true)
}).run
console.log(All.Find(0).a)


