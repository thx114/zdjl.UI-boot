// exports.js by F_thx

function exobj(any,list,add){
    let a=any[0];let b=any[1];let c =any[2];
    let listall = [list,...add.map(i=>list.map(_=>_+i))]
        a={...a}
        if(a instanceof Object&&b instanceof Array ){
            while(b.length<Object.keys(a).length){b.push(0)}
            listall.forEach(i=>{if(Number.isFinite(a[i[0]])){i.forEach((_,index)=>{a[_]=a[_]+b[index]})}})}
        else if(a instanceof Object&&b instanceof Object){
            listall.forEach(i=>{if(Number.isFinite(a[i[0]])){i.forEach(_=>{a[_]=a[_]+b[_]})}})}
        else{zdjl.alert('exports.add()第二个输入不合法 必须为区域/坐标/数组')}
        Object.entries(a).forEach(([k,v])=>{if(isNaN(v)){delete a[k]}})
        switch(c){
            case '%': Object.keys(a).forEach(i=>{if(!i.includes('_100')){delete a[i]}});break
            case 'dp': Object.keys(a).forEach(i=>{if(!i.includes('_dp')){delete a[i]}});break
            default:Object.keys(a).forEach(i=>{if(i.includes('_')){delete a[i]}});break}
        return a}
function syncA(a,b){
    if(typeof b == "undefined"){b=a}
    let _a = Object.keys(a);let _b = Object.keys(b)
    let sync = []
    if(_a.filter(i=>i.includes('_100')).length>0&&_b.filter(i=>i.includes('_100')).length>0){sync.push('%')}
    if(_a.filter(i=>i.includes('_dp')).length>0&&_b.filter(i=>i.includes('_dp')).length>0){sync.push('dp')}
    if(_a.includes('x')||_a.includes('top')&&_b.includes('x')||_a.includes('top')){sync.push('_')}
    if(sync.includes('_')){return [exports.add(a,[]),exports.add(b,[])]}
    else if(sync.includes('%')){return [exports.add(a,[],'%'),exports.add(b,[],'%')]}
    else if(sync.includes('dp')){return [exports.add(a,[],'dp'),exports.add(b,[],'dp')]}
}

/** ### 使2个对象相加
* @param {location | area} a 坐标/区域
* @param {location | area | number[]} b 坐标/区域/数组
* @param {'%'|'dp'} more '%'/'dp
* @return {location | area} 返回一个新的区域/坐标对象 **/
exports.add=function(a,b,more=undefined){
    let any = [a,b,more].filter(i=>typeof i != 'undefined')
    if(exports.isLoc(any[0])){return exobj(any,['x','y'],['_dp','_100'])}
    else if(exports.isArea(any[0])){return exobj(any,['top','bottom','left','right'],['_dp','_100'])}
    else {zdjl.alert('exports.add()第一个输入不合法 必须为区域或者坐标')}}

/** 判断是否是区域 **/
exports.isArea=function(any){return (Number.isFinite(any.top)||Number.isFinite(any.top_100)||Number.isFinite(any.top_dp))}
/** 判断是否是坐标 **/
exports.isLoc=function(any){return (Number.isFinite(any.x)||Number.isFinite(any.x_100)||Number.isFinite(any.x_dp))}
/** ### 过滤输出所有匹配结果的列表
* @param {Array} a 坐标/区域
* @param { area | number[]} b 区域/数组
* @param {{mode:'+'|'-' ,apply?:'%'|'dp'}} cfg '%'/'dp
* @return {Array[]} 返回一个新的列表 **/
exports.filter=function(a,b,cfg={mode:'+',apply:undefined}){
    let list = ['top','bottom','left','right','x','y'].map(i=>{
        if (typeof cfg.apply == 'undefined'){return i}
        if (cfg.apply.includes('%')){return i+'_100'}
        if (cfg.apply.includes('dp')){return i+'_dp'}})
    if(b instanceof Array){let out={}; b.forEach((i,index)=>{out[list[index]]=i});b=out}
    switch(cfg.mode){ 
        case '-':return a.filter(i=>!((b[list[2]]<i[list[4]]&&i[list[4]]<b[list[3]])&&(b[list[0]]<i[list[5]]&&i[list[5]]<b[list[1]])))
        default:return a.filter(i=>(b[list[2]]<i[list[4]]&&i[list[4]]<b[list[3]])&&(b[list[0]]<i[list[5]]&&i[list[5]]<b[list[1]]))
    }}
/** 返回中心点 @param {area} any 区域*/
exports.center=function(any,mode=false){
    if(mode){return }
    if(exports.isArea(any)){
        return Number.isFinite(any.top)?{x:(any.top+any.bottom)/2,y:(any.left+any.right)/2}:Number.isFinite(any.top_100)?{x_100:(any.top_100+any.bottom_100)/2,y_100:(any.left_100+any.right_100)/2}:Number.isFinite(any.top_dp)?{x_dp:(any.top_dp+any.bottom_dp)/2,y_dp:(any.left_dp+any.right_dp)/2}:null}
    else{return any}
}
/** 返回两点/两区域之间直线距离 或 偏移x与偏移y值 
 *  @param {location | area} a 坐标/区域
 *  @param {location | area} b 坐标/区域
 *  @param {'d'|'xy'} a 'd' | 'xy' 直线距离或者数组xy偏移
 *  @returns {number | [number,number]}
*/
exports.length=function(a,b,mode='d'){
    a=exports.center(a);b=exports.center(b)
    if(mode='xy'){}
    let list = syncA(a,b)
    let out = 0;let xy = []
    Object.entries(list[0]).forEach(([k,v])=>{
        if(mode=='xy'){xy.push(Math.abs(list[1][k]-v))}
        else{out += Math.abs(list[1][k]-v) * Math.abs(list[1][k]-v)}
    })
    if(mode=='xy'){return xy}
    return Math.sqrt(out)
}
/** 偏移一个区域 
 * @param {area} area 区域
 * @param {number} px x偏移
 * @param {number} py y偏移
 * @param {'_'|'%'|'dp'} py 偏移模式
*/
exports.px=function(area,px,py,apply='_'){return exports.add(area,[py,py,px,px],apply)}
exports.num=function(any){return (any+'').replace(/(\d+.\d+?)0+./g,'$1')}
