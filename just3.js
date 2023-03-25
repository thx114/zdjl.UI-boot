M=Symbol('m');$END$=null;$INPUT$=null;$this={};$VAR$='<Var>';$ACTION$='<Action>';try{window}catch{window=globalThis;var off=true}


class Builder{
    
    constructor(any,exp=null){ //Builder 初始化 Addons添加
        this.out=any
      //Addons 添加
      
        Object.values(addlist).forEach(item=>{
            Object.entries(item).forEach(([name,i])=>{
              //声明
                window. BUILD=true
                let get = false
                let getname = ''
                let _cons
                let _runs
                let offSet=false 
                let CON
                let RUN
                let ADD =''
              //输入简化
                if(name.includes('$get_')){
                   getname= name.match(/\$get_(.*)\$/)[1]
                   name=name.replace(/\$get_(.*)\$/,'')
                   get = true}
                name=name.replace(/\$.*/,'')
                if(typeof i[0] == 'string'||i[0]===null){
                   if(i[0]===null){_cons=[`true`]}
                   else if(i[0]==='<Var>'){_cons=[`this.varType`]}
                   else if(i[0]==='<Action>'){_cons=[`this.type`]}
                   else if(i[0]==='<Any>'){_cons=[`this.type||this.varType`]}
                   else if(i[0].includes('|')){_cons=[i[0].split('|').map(item=>`(this.varType=="${item}"||this.type=="${item}")`).join('|')]}
                   else {_cons=[`(this.varType=="${i[0]}"||this.type=="${i[0]}")`]}
                   i[0]=_cons
                }
                if(typeof i[1] == 'string'||i[1]===null){
                    let Default = 'null'
                    if(i[1].includes('=')){Default=i[1].match(/=(.*)/)[1];i[1]=i[1].replace(/=.*/,'')}
                    _runs=[`Var.exp(this,{${i[1]}:$0??${Default}})`]
                    i[1]=_runs
                }
              //输入转换到方法字符串
                _cons = i[0].map(x=>x.replace(/\$(\d)/g,'any[$1]').replace(/this/g,'this.out').replace(/self/g,'this'))
                _runs = i[1].map(x=>x.replace(/\$(\d)/g,'any[$1]').replace(/this/g,'this.out').replace(/self/g,'this'))
                if(offSet){return}
                CON = _cons.join('&&')
                RUN = _runs.join(';')
              //条件检查
               // if(!eval(_cons[0])){throw Error('条件检查失败')} 
              //方法累加
                if(typeof this[name] != 'undefined'){
                    
                ADD = this[name].toString().match(/\(\.\.\.any\)=>\{(.*)\$END\$;return this/)[1].replace('if(BUILD){return this}','')}
              //方法创建
                ADD+=((...any)=>{if(BUILD){return this}$ADD$;if($CON$){$RUN$};$END$;return this}).toString()
                    .replace('$CON$',CON)
                    .replace('$RUN$',RUN)
                    .replace('$ADD$',ADD)
                if(typeof i[2]!='undefined'){ADD=ADD.replace('$NAME$',i[2])} //方法说明
                else{ADD=ADD.replace('$NAME$',name)}
                if(name.length === 0){name=Symbol('undFun')}
              //get 赋值
                if(get){ 
                    Object.defineProperty(this, getname, {
                    get: function(){return this[name]()}})}
                if(name.length === 0){return}
              //方法赋值
                this[name]=eval(ADD)
                this[name].help=i[2]
                BUILD=false
            })})
        if(exp){Var.exp(this.out,exp)}
        }
    get help(){ // 帮助
        return zdjl.alert(Object.entries(this).filter(([key,val])=>val.help).map(([key,val])=>`${key}:${val.help}`).join('\n'))
     }


}
class Var{ //<Var> 变量
    static exp(obj,input){ // 变量属性修改
        Object.entries(input).forEach(([key,value])=>{
            if(!(value instanceof Function)&&(value===null||typeof value=='undefined')){return}
            if(value instanceof Builder){value=value.out}
            delete obj[key]
            delete obj?.__vars?.[key]
            if(value instanceof Function ){
                if (key==='jsCode'){obj.jsCode=`(${value+''})()`;console.log('JS',obj.jsCode) ;return}
                obj.__vars??={}
                obj.__vars[key]={varType:'expression',valueExp:`(${value.toString()})()`}
            }else{
              if (typeof value === 'undefined'){return}
              if (key==='objectVars'||key==='vars'){
                value = Var.asObject(value)
                }
                if (typeof value === 'undefined'){return}
                obj[key]=value
            }
        })
     }
    static asObject(input){ // obejct()输入转换到objectVars
        if (JSON.stringify(input).length<5){return undefined}  
        let out= Object.entries(input).map(([key,val])=>{
            if(val instanceof Builder){val=val.out}
            return {name:key,value:val}})
           return out}
    static asTimeInput(any,mode=0){ // 模式1:将任意输入转换为[delay,delayUnit] 模式2:将任意输入转换为毫秒单位数字
        let out
        if(typeof any === 'number'){out= [any,0]}
        else if(typeof any ==='string'){
            if(any.includes('ms')){out= [Number(any.replace('ms','')),0]}
            else if(any.includes('s')){out= [Number(any.replace('s','')),1]}
            else if(any.includes('m')){out= [Number(any.replace('m','')),2]}
            else if(any.includes('h')){out= [Number(any.replace('h',''))*60,2]}
            else if(any.includes('d')){out= [Number(any.replace('d',''))*60*24,2]}
            else{out= [Number(any),0]}  }
        else{throw Error('输入错误:asTimeInput > input > not number or string')}
        switch (mode){
            case 0:return out
            case 1:
                switch (out[1]){
                    case 0:return out[0]
                    case 1:return out[0]*1000
                    case 2:return out[0]*1000*60
                    default:throw Error('内部错误:asTimeInput > mode 1 > time ms output')
                }
        }

     }
    static asFunction(any){ // Function 转换 String
        if (any instanceof Function){return `(${any.toString()})()`}
     }
    static asAny(any){ // 将任意变量转换为 Builder <Var>
        if(any instanceof Builder){return any}
        else if(typeof any === 'number'){return number(any)}
        else if(typeof any === 'boolean'){return bool(any)}
        else if(typeof any === 'function'){return js_function(any)}
        else if(typeof any ==='string'){return string(any)}
        else if(any instanceof Object){
            
            return Var.asAnyAll(object(any))}
     }
    static Action={ // <Action> 的内部方法
        scan(any,path,name){ // objectVars 扫描 & this 与 $this 绑定
            let Data = any.vars ?? any.objectVars
            if (typeof Data === 'undefined'){
                return -1
            }
            Data.forEach(i=>{
                let add = path.replace(/window(\.)*/,'')
                if(i.value.__vars){
                    Object.values(i.value.__vars).forEach(item=>{
                        item.valueExp=Var.$this(item.valueExp,name,add)
                    })
                }
                if(i.value.action){
                    if(typeof i.value.action.jsCode != 'undefined'){
                        console.log('into')
                        i.value.action.jsCode=Var.$this(i.value.action.jsCode,name,add)
                    }
                }
                if(i.value.k==true && i.value.varType!="object"){
                    eval(path)[i.name] = i.value[Var.getval(i.value)]
                    i.value[Var.getval(i.value)] = eval(`${path}.${i.name}`)

                }
                if(i.value.varType=="object"){
                    eval(`${path}.${i.name}={}`)
                    
                    let call = Var.Action.scan(i.value,path+'.'+i.name,name)
                    if(call==-1){i.value.objectVars=[]}
                }
                else if(i.value.varType=="string"){eval(`${path}.${i.name}="${i.value.value}"`)}
                else if(i.value.varType=="number"){eval(`${path}.${i.name}=${i.value.number}`)}
                else if(i.value.varType=="boolean"){eval(`${path}.${i.name}=${i.value.value}`)}
                else if(typeof eval(`${path}`)[i.name] == 'undefined'){eval(`${path}.${i.name}='UND'`)}
            })
         },
        scanS(any,name){ // 扫描启动器
         Var.Action.scan(any,"window",name)
          },
        
     }
    static $this(any,name,add){
        let out =any.replace(/\$this([\.\w]*)/g,`Var.Find(window.${name},"${add}$1")`)
                    .replace(/this([\.\w]*)/g,`eval(Var.Find(${name},"${add}$1",1))`)
                    .replace(/self([\.\w]*)/g,(match,p1)=>{return Var.Find(name,`${add}${p1}`,1)})
        console.log(out)
        return out
    }
    static Find(obj,next,mode=0){  // this 的工作源
        if (next[0]=='.'){next=next.substr(1)}
        if (obj instanceof Builder){obj = obj.out}
        let now=obj
        if(mode===0){
            if(next.length===0){return obj}
            let pathlist=next.split(".")
            if(pathlist[0].length ===0){pathlist.shift()}
            pathlist.forEach(item=>{
            now = now.vars ?? now.objectVars
            now = now.find(i=>i.name==item)
            now = now.value
          })
          return now}
        else if (mode===1){
            if(next.length===0){return obj}
            let pathlist=next.split(".")
            if(pathlist[0].length ===0){pathlist.shift()}
            let out= pathlist.join('.')
            return out}
         }
    static set(name,value){ // 设置变量内容 (支持路径,等级setVar)
        setvar({[name]:Var.asAny(value).S(false)}).run
     }
    static get(name){  // 获取变量内容
        return eval(name)
     }
    static asAnyAll(obj){ // 将<Var> 或 Builder <Var> 的 objectVars 所有值 转换为 合法值
        function scan(obj){
            let data
            if(obj instanceof Builder){data=obj.out}
            else{data=obj}
            data.objectVars.forEach(i=>{
                if(typeof i.value.varType =='undefined'){
                    i.value=Var.asAny(i.value).out
                }
                if(i.value.varType=="object"){
                    scan(i.value)
                }
            })
        }
        scan(obj)
        return obj
     }
    static asexp(any){
        if(any instanceof Builder){ return any.out}
        else{return any}
     }
    static push(obj,var_){
        if(var_ instanceof Builder){var_ = var_.out}
        obj.objectVars.push({name:obj.objectVars.length,value:var_})
        return var_
     }
    static getval(any){
        if(any instanceof Builder){any=any.out}
        return Object.keys(any)[1]
    }
    constructor(input){ // <Var> 构造
        Var.exp(this,input)
     }
}
window.runlist={
    string:[{varType:'string',value:'$0'},'.SYNC(true).S(true).W("auto")'],
    object:[{varType:'object',objectVars:'$0'},'.S(true).t'],
    bool:[{varType:'boolean',value:'$0'},'.S(true).SYNC(true).W("auto")'],
    number:[{varType:'number',number:'$0'},'.S(true).SYNC(true).W("auto")'],
    js_function:[{varType:'js_function',jscode:'$0'},'.S(true).SYNC(true).t'],

    text:[{varType:'ui_text',textContent:'$0'},'.S(true).t.W("auto")'],
    button:[{varType:'ui_button',buttonText:'$0'},'.S(true).t.W("auto")'],
    image:[{varType:'imageData',data:'$0'},'.S(true).t.W("auto")'],
    color:[{varType:'color',color:'$0'},'.S(true).SYNC(true).t.W("auto")'],   
    xy:[{varType:'position',position:'$0'},'.S(true).SYNC(true).t.W("auto")'],
    area:[{varType:'screen_area',screen_area:'$0'},'.S(true).SYNC(true).t.W("auto")'],    
    expression:[{varType:'expression',valueExp:'$0'},'.S(true).SYNC(true).t.W("auto")'],
    action:[{varType:'script_action',script:'$0'},'.S(true).SYNC(true).t.W("auto")'],

    click:[{type:'点击',posData:'$0'},''],
    swipe:[{type:'滑动',startPos:'$0',endPos:'$1'},''],
    gesture:[{type:'单指手势',gestureActions:'$0'},''],
    setvar:[{type:'设置变量',vars:'$0'},''],
    js:[{type:'运行JS代码',jsCode:'$0'},''],
    print:[{type:'系统提示',promptText:'$0'},''],
    alert:[{type:'系统提示',promptTitle:'$1',promptText:'$0',promptType:"alert"},''],
    runScript:[{type:'执行脚本',filePath:'$0'},''],
    stop:[{type:'控制执行',controlRunType:'stop',ContinueParentExecute:'$0'},''],
    wait:[{type:'控制执行',controlRunType:'waitDelay'},'.delay($0)',''],
    suspend:[{type:'控制执行',controlRunType:'pause'},''],
    setJump:[{type:'控制执行',controlRunType:'setJumpId',jumpId:'$0'},''],
    jump:[{type:'控制执行',controlRunType:'jumpTo',jumpToPosition:'$0'},''],
    runJump:[{type:'控制执行',controlRunType:'runAimAction',aimActionPosition:'$0'},''],
    runActions:[{type:'运行多个动作',scriptSet:'$0',runMode:'$1'??'normal'},''],


    

    }
window.$CBTS='this.scriptCallbacks??={};this.scriptCallbacks.';window.$CBTS2='this.extraScriptCallbacks??={};this.extraScriptCallbacks.'
window.addlist={
    ActionAddonList:{
        time:['系统提示',['this.showDuration=Var.asTimeInput($0,1)'],'提示时间'],
        playAudio:['系统提示','playAudio','是否播放声音'],
        as$a:['设置变量',v=['window[$0]=self;Var.Action.scanS(this,$0);self.AS="$0"'],'声明全局绑定'],

        value$click:v=['点击','posData','点击位置'],posData$1:v,
        value$swipe:v=['滑动',['this.startPos=Var.asexp($0)','this.endPos=Var.asexp($0)'],'点击位置'],posData$2:v,
        value$gesture:v=['单指手势','gestureActions','手势内容'],posData$3:v,
        value$vars:['设置变量','vars','变量列表'],vars:v,
        value$jsCode:v=['运行JS代码','jsCode','代码内容'],jsCode:v,
        value$Ptext:v=['系统提示','promptText','提示内容'],text$Ptext:v,
        value$filePath:v=['执行脚本','filePath','脚本路径'],path:v,
        value$jumpId:v=[['this.type=="控制执行"','this.controlRunType=="setJumpId"'],'jumpId','设置跳转ID'],id$jumpId:v,
        value$jump:v=[['this.type=="控制执行"','this.controlRunType=="jumpTo"'],'jumpToPosition','跳转到'],id$jump:v,
        value$runJump:v=[['this.type=="控制执行"','this.controlRunType=="runAimAction"'],'aimActionPosition','运行目标动作'],id$runJump:v,
        value$runActions:v=['运行多个动作','scriptSet','动作列表'],script$runActions:v,

        title$dialog: ['设置变量','dialogTitle','设置变量界面:标题'],
        textOk$dialog: ['设置变量','dialogOKText','设置变量界面:确认文字'],
        textCancel$dialog: ['设置变量','dialogCancelText','设置变量界面:取消文字'],
        cancelAction$dialog: ['设置变量','dialogCancelAction','设置变量界面:取消动作'],
        playAudio$dialog: ['设置变量','playAudio','设置变量界面:是否播放声音'],
        autoBtn$dialog: ['设置变量','dialogAutoClickBtn','设置变量界面:自动点击选项'],

        back$runScript:['执行脚本','continueCurrentAfterFinish','是否返回上级脚本'],
        Gmix$runScript:['执行脚本','useCurrentGestureMatrix','是否手势混淆'],

        mode$runActions:['运行多个动作','runMode="normal"','运行模式'],
        break$runActions:['运行多个动作','breakCondition','中断条件'],
        Gmix$runActions:['运行多个动作','gestureMatrix','手势混淆'],

        Exthen:['运行多个动作',[$CBTS2+'afterExecSuc=Var.asexp($0)'],'额外监听_动作运行成功后'],
        Exafter:['运行多个动作',[$CBTS2+'afterExecFinish=Var.asexp($0)'],'额外监听_动作运行结束后'],
        Exbefore:['运行多个动作',[$CBTS2+'beforeStartExec=Var.asexp($0)'],'额外监听_动作运行前'],
        ExbeforeCon:['运行多个动作',[$CBTS2+'beforeCondition=Var.asexp($0)'],'额外监听_动作条件检测前'],
        ExafterCon:['运行多个动作',[$CBTS2+'afterConditionSuc=Var.asexp($0)'],'额外监听_动作条件检测成功后'],
        ExconFail:['运行多个动作',[$CBTS2+'afterConditionFail=Var.asexp($0)'],'额外监听_动作运行检测失败后'],
        Exfail:['运行多个动作',[$CBTS2+'afterExecFail=Var.asexp($0)'],'额外监听_动作运行失败后'],
        limit$runActions:['运行多个动作','limitRunCount','限制运行次数'],

        back$stop:[['this.type=="控制执行"','this.controlRunType=="stop"'],'ContinueParentExecute','是否返回上级脚本'],

        time$showDuration:['系统提示',['this.showDuration=Var.asTimeInput($0,1)'],'提示时间'],
        useVibrator$useVibrator:['系统提示','useVibrator','useVibrator'],
        title$promptTitle:['系统提示','promptTitle','提示标题'],
        actions$actions:['系统提示','actions','提示选项'],

        index$img:[a=['this.type=="点击"','this?.posData?.imageData'],[(b='this.posData.')+'indexNum=$0'],'选择第几个'],
        area$img:[a,[b+'limitArea=Var.asexp($0)'],'限制区域'],
        similar$img:[a,[b+'minSimilarPercent=Var.asexp($0)'],'相似度'],
        quick$img:[a,[b+'quickSearch=Var.asexp($0)'],'快速搜索'],
        type$img:[a,[b+'imageScaleType=Var.asexp($0)'],'搜索模式类型'],
        filter$img:[a,[b+'imageFilter=Var.asexp($0)'],'滤镜'],
        px$img:[a,[b+'xOffset=Var.asexp($0)'],'便宜'],

        mode$text:[a=['this.type=="点击"','this?.posData?.text'],['this.posData.ocrMode=$0'],'文字识别模式'],
        filter$text:[a,['this.posData.filter=Var.asexp($0)'],'滤镜'],
        text$text:[a,['this.posData.text=Var.asexp($0)'],'文字'],
        area$text:[a,['this.posData.limitArea=Var.asexp($0)'],'限制区域'],
        index$text:[a,['this.posData.indexNum=Var.asexp($0)'],'选择第几个'],
        px$text:[a,['this.posData.xOffset=Var.asexp($0)'],'偏移'],

        color$color:[a=['this.type=="点击"','this?.posData?.color'],[(b='this.posData.')+'color=$0'],'颜色'],
        area$color:[a,[b+'limitArea=Var.asexp($0)'],'限制区域'],
        similar$color:[a,[b+'minSimilarPercent=Var.asexp($0)'],'相似度'],
        px$color:[a,[b+'xOffset=Var.asexp($0)'],'偏移'],

        $get_run$:['<Action>',['zdjl.runActionAsync(this);return'],'运行动作'],    //runActions(()=>{return ZDJLUI.out}).repeat(0).Exfail(suspend()).run
        runs:['<Action>',['self.as($0);let V=$0+".out";let out=runActions(eval((()=>{return $INFO$}).toString().replace("$INFO$",V))).repeat(0).Exfail(suspend());out.run'],'重复运行动作'],//runActions($0.out).repeat(0).Exfail(suspend()).run
        condition:['<Action>','condition','动作条件'],
        repeat:['<Action>','repeatCount','重复次数'],
        delay:['<Action>',['if(any.length==2){this.delay=$0;this.delayUnit=$1}if(any.length==1){self.delay(...Var.asTimeInput($0))}'],'动作运行等待时间'],

        then:['<Action>',[$CBTS+'afterExecSuc=Var.asexp($0)'],'监听:动作运行成功后'],
        after:['<Action>',[$CBTS+'afterExecFinish=Var.asexp($0)'],'监听:动作运行结束后'],
        before:['<Action>',[$CBTS+'beforeStartExec=Var.asexp($0)'],'监听:动作运行前'],
        beforeCon:['<Action>',[$CBTS+'beforeCondition=Var.asexp($0)'],'监听:动作条件检测前'],
        afterCon:['<Action>',[$CBTS+'afterConditionSuc=Var.asexp($0)'],'监听:动作条件检测成功后'],
        conFail:['<Action>',[$CBTS+'afterConditionFail=Var.asexp($0)'],'监听:动作运行检测失败后'],
        fail:['<Action>',[$CBTS+'afterExecFail=Var.asexp($0)'],'监听:动作运行失败后']
        },
    VarAddonList:{
        value:['string|boolean','value','值'],
        value$number:v=['number','number=0','数值'],number:v,
        value$object:v=['object','objectVars','键值内容'],vars:v,
        value$color:v=['color','color','颜色'],color:v,
        value$text:v=['ui_text','textContent','文本'],text$text:v,
        value$button:v=['ui_button','buttonText','按钮文本'],text$button:v,
        value$image:v=['imageData','data','图片'],img:v,
        value$position:v=['position','position','位置'],position:v,
        value$area:v=['screen_area','screen_area','区域'],area:v,
        value$exp:v=['expression','valueExp','Exp'],exp:v,
        value$jsCode:v=['js_function','jsCode','函数'],jsCode:v,

        size:['ui_text','textSize','文字大小'],
        color$text:['ui_text','textColor','文字颜色'],
        action:['ui_button','action','按钮动作'],
        list:['string|number','stringItems','选择列表'],
        style$get_none$:['ui_button','buttonStyle="none"','按钮样式'],
        show$get_os$:['imageData','onlyForShow=true','仅展示'],
        C$get_c$:['ui_button','closeDialogOnAction=false','点击后关闭整个页面'],

        W$get_w$:['<Var>','showInputWidthBasis=100','显示宽度'],
        G$get_g$:['<Var>','showInputWidthGrow=1','显示宽度填充'],
        S$get_s$:['<Var>','showInput=false','是否显示'],
        M$get_m$:['<Var>','mustInput=true','必须输入'],
        T$get_t$:['<Var>','showInputHiddenLabel=true','隐藏标题'],
        H$get_h$:['<Var>','showInputHiddenView="true"','隐藏条件表达式'],
        P$get_p$:['<Var>','showInputContentAlign="right"','显示位置'],
        R$get_r$:['<Var>','rememberInputValue=true','记住输入'],
        K$get_k$:['<Var>','K=true','同步输入'],
        SYNC$get_sync$:['<Var>','syncValueOnChange=true','SYNC'],

        //as$val:['<Var>',['setvar({[$0]:self.S(false)}).run'],'立即设置变量'],

        textT:['<Var>','textLineBefore','上方文本'],
        textB:['<Var>','textLineAfter','下方文本'],
        textL:['<Var>','showInputLabel','左侧文本_标题'],
        textR:['<Var>','textAppendRight','右侧文本'],
        BGcolor:['<Var>','backgroundColor="#303030"','背景颜色'],
        BGimg:['<Var>','backgroundImg','背景图片']
        },
    不重要的:{
        desc:['<Any>','desc','描述'],
        $get_disabled$:['<Action>','disabled=true','禁用动作']
    }
    }
window.NB=function(any){return new Builder(any)}
window.RELOAD=function(){Object.entries(runlist).forEach(([k,v])=>{window[k]=eval(((...any)=>{return new Builder( new Var($ADD$),$ADD$);$ADDON$}).toString().replace(/\$ADD\$/g,JSON.stringify(v[0]).replace(/"\$(\d)"/g,'any[$1]')).replace(';$ADDON$',v[1].replace(/"\$(\d)"/g,'any[$1]')??''));Object.defineProperty(window[k], 'help', {get: function(){return new Builder(window[k]()).help}})});window.Var = Var;window.Builder = Builder   }
RELOAD() 
// window.Freload=function(a,a_text,b,b_text){
//     if(a=='无'){a= '无'}
//     else if(a=='新类别'){a= a_text}
//     if(b=='无'){b= '无'}
//     else if(b=='新类别'){b= b_text}
//     return a+' '+b
// }
// setvar({

// zdjlUI:object({
//     name:string('').t.g,
//     add:button('+')
//       .H(()=>{return (typeof this.action?.type=='undefined'||this.name?.length<2)})
//       .action(js(()=>{
//         if($this.all .objectVars.length===1){Var.push($this.all,text('占位').desc('').size(0))}
//       NB(Var.push($this.all,action(this.action).desc(Freload(this.a,this.a_text,this.b,this.b_text)).w.k.textL(self.name).T(false))).H(eval((()=>{
//             let desc = $this.all .objectVars[$ID$].value.desc
//             return !(($NAME$.includes(this.name)||this.name.length<2)&&
//                 ( ((desc.match(/\S+/)[0]==(this.a=='新类别'?this.a_text:this.a))||this.a=='无')&&
//                   ((desc.match(/\S+ (\S+)/)[1]==(this.b=='新类别'?this.b_text:this.b))||this.b=='无') ))
//         }).toString().replace(/\$NAME\$/g,`"${self.name}"`)
//                      .replace(/\$ID\$/g,`${$this.all .objectVars.length-1}`)
//         )).textR(eval((()=>{
//             let desc =($this.all).objectVars[$ID$].value.desc
//             let A=desc.match(/\S+/)?.[0]
//             let B=desc.match(/\S+ (\S+)/)?.[1]
//             let DELETE = '('+(()=>{if(confirm('确定删除?')){($this.all).objectVars[$ID$]={name:'_',value:text().size(0).out};(this.all)[$ID$]=null}}).toString()+')()'
//             let RENAME = '('+(()=>{($this.all).objectVars[$ID$].value.showInputLabel=prompt('请输入',($this.all).objectVars[$ID$].value.showInputLabel)}).toString()+')()'
//             let listOfTag = [['无',...new Set(Object.values($this.all .objectVars).map(i=>(i.value.desc+'').match(/\S+/)?.[0]).filter(i=>i)),'新类别'],['无',...new Set(Object.values($this.all .objectVars).map(i=>(i.value.desc+'').match(/\S+ (\S+)/)?.[1]).filter(i=>i)),'新类别']]
//             window.G_UI_a_text = string(eval((()=>{return (this.a=='新类别'?(this.a_text??$TEXT$).replace(/^(新类别|无)$/,"") :this.a).replace('无',$TEXT$)}).toString().replace(/\$TEXT\$/g,JSON.stringify(A)))).t
//             window.G_UI_b_text = string(eval((()=>{return (this.b=='新类别'?(this.b_text??$TEXT$).replace(/^(新类别|无)$/,"") :this.b).replace('无',$TEXT$)}).toString().replace(/\$TEXT\$/g,JSON.stringify(B)))).t
//             let TAG = '('+(()=>{input=$INPUT$;setvar({G_SET:object({a:string('').t.list(input[0]),b:string('').t.list(input[1]),m:text().size(0).W(100),a_text:G_UI_a_text,b_text:G_UI_b_text})}).as('GSET').then(js(()=>{($this.all).objectVars[$ID$].value.desc=Freload(G_SET.a,G_SET.a_text,G_SET.b,G_SET.b_text)})).run}).toString().replace('$INPUT$',JSON.stringify(listOfTag))+')();'
//             return `#MD [删除](javascript_then_finish:${DELETE}) [修改名称](javascript_then_finish:${RENAME}) [修改类别](javascript_then_finish:${TAG})`
//                 }).toString().replace(/\$NAME\$/g,`"${self.name}"`)
//                              .replace(/\$ID\$/g,`${$this.all .objectVars.length-1}`)))
//     })),
//     action:action().W('auto'),
//     a:string().t.list(()=>{return ['无',...new Set(Object.values($this.all .objectVars).map(i=>(i.value.desc+'').match(/\S+/)?.[0]).filter(i=>i)),'新类别']}),
//     b:string().t.list(()=>{return ['无',...new Set(Object.values($this.all .objectVars).filter(i=>i.value.desc.includes(this.a)).map(i=>(i.value.desc+'').match(/\S+ (\S+)/)?.[1]).filter(i=>i)),'新类别']}),
//     n_:text().W(100).size(1),
//     save:button('保存').action(js(()=>{
//         zdjl.setStorage('listSave', JSON.stringify($this.all .objectVars), 'ZDJLUI_FTHX')
//         setvar({output:string(JSON.stringify($this.all .objectVars))}).run
//     })),
//     load:button('加载').action(js(()=>{
//         let a =zdjl.getStorage('listSave', 'ZDJLUI_FTHX')
//         if(a){$this.all .objectVars = JSON.parse( a)}
//     })).H(()=>{return ($this.all .objectVars.length>1)}),
//     loadfrom:button('导入').action(js(()=>{
//         setvar({input:string('').textL('输入Url/文件路径/文本'),button_G:button('从官方服务器导入').action(js(()=>{window.input='https://gitlab.com/thx114/zdjl-UI-boot/-/raw/just-2.0/test.js'}))}).then(js(()=>{
//             let a = input
//             if(a.includes('http')){
//                 let url=a
//                 require('https').get(url, (res) => {let data = '';
//                     res.on('data', (chunk) => {data += chunk;});
//                     res.on('end', () => {zdjl.alert('导入结束');$this.all .objectVars=(JSON.parse(data+''))});
//                 }).on('error', (err) => {zdjl.alert('读取网络文件失败:'+err.message);});  
//             }
//             else if(a.includes('sdcard')||a.includes('storage')||['C','D','E','F','G','H'].includes(a[0])){
//                 text = require('fs').readFileSync(a)
//                 zdjl.alert('导入结束')
//                 $this.all .objectVars=(JSON.parse(text+''))
//             }
//             else if(a){$this.all .objectVars = JSON.parse( a)}
//         })).run
//     })).H(()=>{return ($this.all .objectVars.length>1)}),
//     reload:button('刷新').action(js(()=>{
//         $this.all .objectVars.filter(i=>i?.value?.varType==='script_action').forEach((i,index)=>{
//             switch (i.value.varType){
//                 case 'script_action':i.value.script = Object.values(this.all).filter(i=>typeof i.type=='string')[index];break
//             }
//         })
//     })),
//     n:text('|').H(()=>{return this.a!='新类别'|this.b!='新类别'}).t.g,
//     a_text:string(()=>{return this.a=='新类别'?(this.a_text??'').replace(/^(新类别|无)$/,'') :this.a}).H(()=>{return this.a!='新类别'}).t.P('right'),
//     b_text:string(()=>{return this.b=='新类别'?(this.b_text??'').replace(/^(新类别|无)$/,'') :this.b}).H(()=>{return this.b!='新类别'}).t.P('right'),
//     all:object({debug:text('').desc('')}).w,
// })

// }).runs('ZDJLUI')


