if(zdjl.getStorage("MoSaves")==null){zdjl.setStorage("MoSaves",{存储为:{}})}
if(typeof allC=='undefined'){window.allC={}}
window.guid=()=>{
    return '_xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
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
       
       // if(#this.output.objectVars[0].value?.condition?.colorData?.__vars?.limitArea){#this.Area_a_img.imgData=JSON.parse(#this.output.objectVars[0].value.condition.colorData.__vars.limitArea.valueExp.match(/imageData.*(\{.*\})\s*,"searchMode"/)[1])}
       // if(#this.output.objectVars[0].value?.condition?.colorData?.limitArea){#this.Area.screen_area=#this.output.objectVars[0].value.condition.colorData.limitArea}
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
  `]]).wa,
n2_:n(),
autoR:button("转换为区域").js([[`setareaG_.run;#this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)`]]).wa,
Area:area().h([[`typeof #this.Area.screenArea == "undefined" `]]).wa.t,
n3_:n(),
autoR_SOC:button("转换为自适应").js([[`setareaG_2.run;#this.output2.conditions=#this.output.objectVars.map(i=>i.value.condition)`]]).wa,
Area_a_img:image().h([[`typeof #this.Area_a_img.imageData == "undefined" `]]).wa.t.os,
n4_:n(),
S_ssAutoInput:Switch('autoInput').textR([[`"自动应用区域或自适应 [未实现]"+""`]]),

}).t}
}
window.setareaG_=new setvar({G_area:area(),info:text('此操作不可逆，将所有寻找颜色的条件改为区域限制').size(20).color('#FF0000')}).then_js([[`
  
  all[id].output.objectVars.forEach(i=>{
  if (i.value.condition.type='colorFound'){
    delete i.value.condition.colorData.limitPosX
    delete i.value.condition.colorData.limitPosY
    i.value.condition.colorData.limitArea = G_area.area

  }})
    all[id].Area.screenArea = G_area.area


  `]])
window.setareaG_2=new setvar({G_area:area(),info:text('此操作不可逆，将所有寻找颜色的条件改为自适应图片寻找').size(20).color('#FF0000')}).then_js([[`
  

    all[id].Area_a_img.imageData = await zdjl.recognitionScreenAsync({"recognitionMode":"get_image_data","recognitionArea":G_area.area})
    IMG_=all[id].Area_a_img.imageData

    let imgW =0+(G_area.right_100-G_area.left_100)/2
    let imgH =0+(G_area.bottom_100-G_area.top_100)/2
    all[id].output.objectVars.forEach(i=>{
       if (i.value.condition.type='colorFound'){
         delete i.value.condition.colorData.limitPosX
         delete i.value.condition.colorData.limitPosY
         i.value.condition.colorData.__vars={}
         i.value.condition.colorData.__vars.limitArea =CON_IMG(imgW,imgH,IMG_,guid())
         console.log(i.value.condition.colorData.__vars)
         }})
  `]])
window.CON_IMG=function(w,h,img,id){
  
  let findP={"type":"image","imageData":img,"searchMode":"color_2.21","minSimilarPercent":95,"codeVersion":"V1_7","imageScaleType":"dpi"}
  return {varType:"expression",valueExp:`(()=>{
  if (typeof allC.${id} != 'undefined'){return allC.${id}}
  try{
  sleep(1000)
  let xy=zdjl.findLocation(${JSON.stringify(findP)})
  let x = xy.x_100
  let y = xy.y_100
  let areaxy =''+ (x-${w}) + '% ' +( y-${h} )+ '% ' +( x+${w}) + '% ' + (y+${h} )+ '%'
  if(xy){
  allC.${id}=areaxy}
  return areaxy}
  catch{return "0% 0% 0.1% 0.1%"}
  })()
  `
  
  }
  
  }
window.runtime=
new setvar({test:Mo.颜色配置()}).then_js([[` runtime.d(50).run `]])
runtime.run