
V_UI=[2.0,2.0]
V_NOW=[zdjl.getStorage('version','Just_UI'),zdjl.getStorage('version2','Just_UI')]


function modelloadS(url,spaceName,valName){
    require('https').get(url, {
        headers: { 'User-Agent': 'node.js', 'Accept': 'application/vnd.github.v3.raw' }
    }, (res) => {
        data = [];
        res.on('data', (chunk) => {data.push(chunk);});
        res.on('end', ()=>{
            zdjl.setStorage(valName, data,spaceName)
            zdjl.runAction({ type: "运行JS代码", jsCode: Buffer.concat(data).toString('utf8') + '' })
            zdjl.alart(`${spaceName}已更新到${G_ver_UI}`)
        }
            
            )
    })}
let UI_ZDJL_JUSTshow = false
let str_UI = `最新版本:${JSON.stringify(V_UI)} 本机版本:${JSON.stringify(V_NOW)}`
if (typeof V_NOW[0] != 'number'||V_UI[0]>V_NOW[0]){str_UI+=`\n just.js检测到更新: ${V_NOW[0]} > ${V_UI[0]}`;UI_ZDJL_JUSTshow=true}
if (typeof V_NOW[1] != 'number'||V_UI[1]>V_NOW[1]){str_UI+=`\n base检测到更新: ${V_NOW[1]} > ${V_UI[1]}`;UI_ZDJL_JUSTshow=true}
if(UI_ZDJL_JUSTshow){zdjl.alert(str_UI)}



if (typeof V_NOW[0] != 'number'||V_UI[0]>V_NOW[0]){
modelloadS('https://api.github.com/repos/thx114/zdjl.UI-boot/contents/just2.js','Just_UI','justJs')

}
if (typeof V_NOW[1] != 'number'||V_UI[1]>V_NOW[1]){
modelloadS('https://api.github.com/repos/thx114/zdjl.UI-boot/contents/Base.64.js','Just_UI','base')}


