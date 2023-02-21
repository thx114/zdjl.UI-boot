if(zdjl.getStorage("MoSaves")==null){zdjl.setStorage("MoSaves",{存储为:{}})}
window.Mo={
颜色配置(){
window.不再提示=false

this.output={}
return object().apply({

input:action(gesture([])).t.wa,

input2:condition([]).t.wa,

Set:string().wa.t
  .list([[` Object.keys(zdjl.getStorage("MoSaves")) `]]),
  
Load:button("#MD## ⤵️").wa.style("none")
  .h([[` this.Set=='存储为' `]])
  .js([[`let save= zdjl.getStorage("MoSaves") 
       save[this.Set].forEach((i,index)=>{
       let listindex=#this.output.length+index
       #this.output.push({
        ["_"+listindex]:condition(i).t
          .textR("#MD"+Delete('#this.output',"_"+listindex,'this.output._'+listindex+'=undefined;#this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)'))
        })
       })
       `]]),
       
Delete:button('#MD## ❌').wa.style("none")
  .h([[` this.Set=='存储为' `]])
  .js([[`let save= zdjl.getStorage("MoSaves") 
       delete save[this.Set]
       zdjl.setStorage("MoSaves",save)
       `]]),

Name:string().wa.t.h([[` this.Set!='存储为' `]]).xy('right'),

Save:button().xy('right').ww
  .h([[` this.Name.length<1 ||this.Set!='存储为'`]])
  .js([[` let save=zdjl.getStorage("MoSaves")
        save[this.Name]=Object.values(this.output).filter(i=>i!=null)
        zdjl.setStorage("MoSaves",save)
   `]]),
   
load1:button("导入").ww
  .js([[` this.input[GA].forEach((i,index)=>{
      let listindex=#this.output.length+index
      let con=color(0,i.posData.x,i.posData.y)
      #this.output.push({
        ["_"+listindex]:condition(con).t
          .textR('#MD'+Delete('#this.output',"_"+listindex,'this.output._'+listindex+'=undefined;#this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)'))})
      })
      #this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)
      `]])
      .h([[` this.input?.gestureActions?.length==0 `]]),
      
load2:button("导入").ww
  .js([[` this.input2.conditions.forEach((i,index)=>{
    let listindex=#this.output.length+index
    #this.output.push({
        ["_"+listindex]:condition(i)
          .textR('#MD'+Delete('#this.output',"_"+listindex,'this.output._'+listindex+'=undefined;#this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)'))
        })
      })
       #this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)
    `]])
    .h([[` this.input2?.conditions?.length==0 `]]),

_:textlist({
  [[`#as #this.output.length>0||this.input?.gestureActions?.length>0||this.input2?.conditions?.length>0`]]:["请从以下导入方法选择",true],
  [[`#and this.input?.gestureActions?.length>0`]]: 
  ["#MD* 在 单指手势 > 快速设置 里选中多个点",'#00c7ff','#404040'],
  [[`#and this.input2?.conditions?.length>0`]]: 
  ["#MD* 长按 全部满足 粘贴动作运行条件",'#00c7ff','#404040'],
  [[`#and false`]]: 
  ["#MD* 添加自己的条件",'#00c7ff','#404040'],
  [[`#add this.input2?.conditions?.length>0||#this.output.length>0 `]]: 
  ["点击 导入 导入",true],
  [[`#this.output.length<1||不再提示`]]:["#MD您现在可以 编辑条件 / 刷新输出 / 继续导入 / 长按复制输出条件 \n  [不再提示](javascript_then_finish:set('不再提示',true))","#FFFFFF"]
  }).ww.sync,
  
output:object(false).t.ww.h([[` #this.output.length<1 `]]),

add:button("+").wa.ww
  .js([[` let listindex=#this.output.length
    #this.output.push({
        ["_"+listindex]:condition().t.ww
          .textR("#MD"+Delete('#this.output',"_"+listindex,'this.output._'+listindex+'=undefined;#this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)'))
        }) `]]),
        
output2:condition([]).t.wa,
  reload:button("🔄刷新").js([[` 
  Object.keys(this.output)?.forEach(key=>{
  if ( #this.output.objectVars.find(i=>i.name==key)){}
  else{delete this.output[key]}})
  #this.output.objectVars?.forEach(i=>{
  i.value.condition=this.output[i.name]})
  #this.output2.conditions=Object.values(this.output).filter(i=>i!=null)
  `]]).wa

}).t}
}
window.runtime=
new setvar({test:Mo.颜色配置()}).then_js([[` runtime.d(50).run `]])
runtime.run