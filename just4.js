GLOBAL_VARS = {}; pass = Symbol('pass'); window.$Setting = {switch:{fastSwitch:false,switchTime:450}}
try { window } catch {
    zdjl = {
        runActionAsync: async (i) => { console.log(JSON.stringify(i)) },
        setVar: (i, v) => { GLOBAL_VARS[i] = v },
        getVar: (i) => {
            return GLOBAL_VARS[i]
        }
    }
    window = globalThis
    console.warn('DEV MODE')
}
class Mio {
    static base64_to_img(base, size = 100, end = '') {
        return `#MD<img width="${size}" src="data:image/${end};base64,${base}" >`
    }
}
window.G_Switch_size = 125
class Builder { // 构建器
    static asFuncInput(codeFunc, func = (input) => input, direct = false) {
        const debug = true
        let _func = func;
        let codeFuncString
        if (typeof codeFunc === 'string') {
            codeFuncString = codeFunc
        } else {
            codeFuncString = '(' + codeFunc.toString() + ')()'
        }

        if (Object.prototype.toString.call(func) === '[object Object]') {
            Object.entries(func).forEach(([key, value]) => {
                // 确保 key 是一个合法的正则表达式
                const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                codeFuncString = codeFuncString.replace(regex, value)
                _func = i => i;
            });
        }
        console.log('   =|',codeFuncString)
        return _func(
            codeFuncString
        )
    }
    static asTimeInput(any, mode = 0) { // 模式1:将任意输入转换为[delay,delayUnit] 模式2:将任意输入转换为毫秒单位数字
        let out
        if (typeof any === 'number') { out = [any, 0] }
        else if (typeof any === 'string') {
            if (any.includes('ms')) { out = [Number(any.replace('ms', '')), 0] }
            else if (any.includes('s')) { out = [Number(any.replace('s', '')), 1] }
            else if (any.includes('m')) { out = [Number(any.replace('m', '')), 2] }
            else if (any.includes('h')) { out = [Number(any.replace('h', '')) * 60, 2] }
            else if (any.includes('d')) { out = [Number(any.replace('d', '')) * 60 * 24, 2] }
            else { out = [Number(any), 0] }
        }
        else { throw Error('输入错误:asTimeInput > input > not number or string') }
        switch (mode) {
            case 0: return out
            case 1:
                switch (out[1]) {
                    case 0: return out[0]
                    case 1: return out[0] * 1000
                    case 2: return out[0] * 1000 * 60
                    default: throw Error('内部错误:asTimeInput > mode 1 > time ms output')
                }
        }

    }
    static asExp(i, func = (input) => input) {
        if (i instanceof Function) {
            return func(`(${i.toString()})()`)
        }
        return i
    }
    get execute() {
        if (this.executed) return this.data;

        this.executed = true;
        let raw = this.data;


        Object.entries(raw).forEach(([key, value]) => {
            if (value instanceof Builder) {
                raw[key] = value.execute;
            }
            else if (value instanceof Array) {
                raw[key] = value.map(i => {
                    if (i instanceof Builder) {
                        return i.execute
                    }
                    return i
                })
            }
            else if (value instanceof Object) {
                Object.entries(value).forEach(([k, v]) => {
                    if (v instanceof Builder) {
                        raw[key][k] = v.execute
                    }
                    else {
                        raw[key][k] = v
                    }
                })
            }
        });
        return raw
    }
    exp(expitem, i, func = (input) => input) {
        if (!this.data.__vars) this.data.__vars = {}
        this.data.__vars[expitem] = new expression().valueExp(i, func)
        return this;
    }
    desc(i) { this.data.desc = i; return this } // 描述
    get disabled() { this.data.disabled = true; return this } // 禁用
    get enable() { this.data.disabled = false; return this } // 启用
    as(string) { $set(string, this); return this }
    val(i) { this.data.value = i; return this }
}


class Var extends Builder { // 变量
    showInput(i = true) { this.data.showInput = i; return this }
    get sync() { this.data.syncValueOnChange = true; return this }
    SYNC(bool = true) { this.data.syncValueOnChange = bool; return this }
    get remember() { this.data.rememberInputValue = true; return this }
    get input() { this.data.showInput = true; return this }
    width(number) { this.data.showInputWidthBasis = number; return this }
    grow(number) { this.data.showInputWidthGrow = number; return this }
    align(string) { this.data.showInputContentAlign = string; return this }
    get notMust() { this.data.mustInput = false; return this }
    get hiddenLabel() { this.data.showInputHiddenLabel = true; return this }
    get hidden() { this.data.showInputHiddenView = true; return this }
    get show() { this.data.showInputHiddenView = false; return this }
    textTop(string) { this.data.textLineBefore = string; return this }
    textBottom(string) { this.data.textLineAfter = string; return this }
    textLeft(string) { this.data.showInputLabel = string; return this }
    textRight(string) { this.data.textAppendRight = string; return this }
    bgColor(string) { this.data.backgroundColor = string; return this }
    bgImg(image) { this.data.backgroundImg = image; return this }

}
class Action extends Builder { // 动作
    get run() { zdjl.runActionAsync(this.execute) }
    get runs() { return async () => { await zdjl.runActionAsync(new runActions().actions([this.execute()]).execute()) } }
    repeat(i = 0) { this.data.repeatCount = i; return this }
    condition(i) { this.data.condition = i; return this }
    delay(...i) { if (i.length == 2) { this.data.delay = i[0]; this.data.delayUnit = i[1] } else { this.data.delay = Builder.asTimeInput(i) } return this }


    then(Action) { this.data.afterExecSuc = Action; return this }
    after(Action) { this.data.afterExecFinish = Action; return this }
    before(Action) { this.data.beforeStartExec = Action; return this }
    beforeCon(Action) { this.data.beforeCondition = Action; return this }
    afterCon(Action) { this.data.afterConditionSuc = Action; return this }
    conFail(Action) { this.data.afterConditionFail = Action; return this }
    fail(Action) { this.data.afterExecFail = Action; return this }
}

class expression extends Var { // 表达式
    data = { varType: 'expression', valueExp: '' }
    constructor() { super() }
    valueExp(...args) { this.data.valueExp = Builder.asFuncInput(...args); return this }
}
class string extends Var { // 字符串
    data = { varType: 'string', syncValueOnChange: true }
    constructor(string = '') { super(); this.value(string) }
    value(i) {
        this.data.value = i;
        return this
    }
    list(i) { this.data.stringItems = i; return this }
}
class number extends Var { // 数字
    data = { varType: 'number', syncValueOnChange: true }
    constructor(number = 0) { super(); this.value(number) }
    value(i) { this.data.number = i; return this }
    list(i) { this.data.stringItems = i; return this }
}
class boolean extends Var { // 布尔
    data = { varType: 'boolean', syncValueOnChange: true }
    constructor(bool = false) { super(); this.value(bool) }
    value(i) { this.data.value = i; return this }
}
class js_function extends Var { // JS函数
    data = { varType: 'js_function', syncValueOnChange: true }
    constructor(string = '') { super(); this.jscode(string) }
    jscode(i) { this.data.jsCode = i; return this }
}
class button extends Var { // 按钮
    data = { varType: 'ui_button', buttonText: '', closeDialogOnAction: false }
    constructor(string = '') { super(); this.text(string) }
    text(i) { this.data.buttonText = i; return this }
    action(Action) { this.data.action = Action; return this }
    get close() { this.data.closeDialogOnAction = true; return this }
    style(string) { this.data.buttonStyle = string; return this }
    get style_none() { this.data.buttonStyle = 'none'; return this }
    get style_normal() { this.data.buttonStyle = 'normal'; return this }
}
class ui_text extends Var { // 文本
    data = { varType: 'ui_text', textContent: '' }
    constructor(string = '') { super(); this.text(string) }
    text(string) { this.data.textContent = string; return this }
    size(number) { this.data.textSize = number; return this }
    color(string) { this.data.textColor = string; return this }
}
class imageData extends Var { // 图片
    data = { varType: 'imageData', data: '' }
    constructor(string = '') { super(); this.data(string) }
    data(i) { this.data.data = i; return this }
    get onlyForShow() { this.data.onlyForShow = true; return this }
}
class Color extends Var { // 颜色
    data = { varType: 'color', color: '' }
    constructor(string = '') { super(); this.color(string) }
    color(i) { this.data.color = i; return this }
}
class position extends Var { // 位置
    data = { varType: 'position', position: '' }
    constructor(string = '') { super(); this.position(string) }
    position(i) { this.data.position = i; return this }
}
class screen_area extends Var { // 区域
    data = { varType: 'screen_area', screen_area: '' }
    constructor(string = '') { super(); this.screen_area(string) }
    screen_area(i) { this.data.screen_area = i; return this }
}
class object extends Var { // 对象
    data = { varType: 'object', objectVars: [] }
    constructor(object = {}) { super(); this.vars(object) }
    vars(i) {
        this.data.objectVars = Object.entries(i).map(([key, value]) => {
            if (value instanceof Builder) {
                return { name: key, value: value.execute }
            }
            return { name: key, value: value }
        })
        return this
    }
    fill(i) {
        zdjl.setVar(i, {})
        return this
    }
}
class script_action extends Var { // 动作
    data = { varType: 'script_action', script: '' }
    constructor(Action) { super(); this.script(Action) }
    script(i) { this.data.script = i; return this }

}

class Click extends Action { // 点击
    data = { type: '点击', posData: '' }
    constructor(posData = null) { super(); if (posData) this.posData(posData) }
    posData(i) { this.data.posData = i; return this }
    index(i) { this.data.indexNum = i; return this } // 选择第几个
    area(i) { this.data.limitArea = i; return this } // 限制区域
    px(i) { this.data.xOffset = i; return this }
    similar(i) { this.data.minSimilarPercent = i; return this } // 相似度
    img_quick(i) { this.data.quickSearch = i; return this } // 快速搜索
    img_type(i) { this.data.imageScaleType = i; return this } // 搜索模式类型
    img_filter(i) { this.data.imageFilter = i; return this } // 滤镜
    ocr_mode(i) { this.data.ocrMode = i; return this } // 文字识别模式
    ocr_filter(i) { this.data.filter = i; return this } // 滤镜
    ocr_text(i) { this.data.text = i; return this } // 文字
    color_color(i) { this.data.color = i; return this } // 颜色 
}
class Swipe extends Action { // 滑动
    data = { type: '滑动', startPos: '', endPos: '' }
    constructor(start = null, end = null) { super(); if (start) this.startPos(start); if (end) this.endPos(end) }
    startPos(i) { this.data.startPos = i; return this }
    endPos(i) { this.data.endPos = i; return this }
}
class Gesture extends Action { // 单指手势
    data = { type: '单指手势', gestureActions: '' }
    constructor(i = null) { super(); if (i) this.gestureActions(i) }
    gestureActions(i) { this.data.gestureActions = i; return this }
}
class Runjs extends Action { // 运行JS
    data = { type: '运行JS代码', jsCode: '' }
    constructor(...args) { super(); this.jscode(...args) }
    jscode(...args) {
        this.data.jsCode = Builder.asFuncInput(...args); return this
    }
}
class SystemPrompt extends Action { // 系统提示
    constructor(type = 'print') {
        super();
        switch (type) {
            case 'print': this.data = { type: '系统提示', promptText: '' }; break;
            case 'alert': this.data = { type: '系统提示', promptTitle: '', promptText: '', promptType: 'alert' }; break;
        }
    }
    title(i) { this.data.promptTitle = i; return this }
    text(i) { this.data.promptText = i; return this }
    print(text = '') { this.data = { type: '系统提示', promptText: text }; return this }
    alert(text = '', title = '') { this.data = { type: '系统提示', promptTitle: title, promptText: text, promptType: 'alert' }; return this }
    time(i) { this.data.showDuration = Builder.asTimeInput(i, 1); return this }
    playAudio(i = true) { this.data.playAudio = i; return this }
    useVibrator(i = true) { this.data.useVibrator = i; return this }
    actions(i) { this.data.actions = i; return this } // 提示选项
}
class Control extends Action { // 控制执行
    data = { type: '控制执行', controlRunType: 'pause' }
    constructor(type = 'pause') { super(); if (type) this.type(type) }
    get pause() { this.data.controlRunType = 'pause'; return this }
    wait(i) { this.data.controlRunType = 'waitDelay'; this.data.waitDelay = Builder.asTimeInput(i); return this }
    setJumpId(number) { this.data.controlRunType = 'setJumpId'; this.data.jumpId = number; return this }
    jumpTo(number) { this.data.controlRunType = 'jumpTo'; this.data.jumpToPosition = number; return this }
    runAimAction(i) { this.data.controlRunType = 'runAimAction'; this.data.aimActionPosition = i; return this }
    get stop() { this.data.controlRunType = 'stop'; return this }
    get back() { this.data.ContinueParentExecute = true; return this }

}
class RunScript extends Action { // 执行脚本
    data = { type: '执行脚本', filePath: '' }
    constructor(filePath = '') { super(); this.filePath(filePath) }
    filePath(i) { this.data.filePath = i; return this }
    back(bool = true) { this.data.continueCurrentAfterFinish = bool; return this }
    Gmix(bool = true) { this.data.useCurrentGestureMatrix = bool; return this }
}
class Setvar extends Action { // 设置变量
    data = { type: '设置变量', vars: [] }
    constructor(object = {}) { super(); this.vars(object) }
    vars(i) {
        this.data.vars = Object.entries(i).map(([key, value]) => {
            if (value instanceof Builder) {
                return { name: key, value: value.execute }
            }
            return { name: key, value: value }
        })
        return this
    }
    title(i) { this.data.dialogTitle = i; return this }
    textOk(i) { this.data.dialogOKText = i; return this }
    textCancel(i) { this.data.dialogCancelText = i; return this }
    cancelAction(i) { this.data.dialogCancelAction = i; return this }
    playAudio(i = true) { this.data.playAudio = i; return this }
    autoBtn(i = true) { this.data.dialogAutoClickBtn = i; return this }
}
class RunActions extends Action { // 运行多个动作
    data = { type: '运行多个动作', runMode: "normal", scriptSet: [] }
    constructor(Array = null) { super(); if (Array) this.actions(Array) }
    actions(Array) { this.data.scriptSet = Array; return this }
    mode(string = 'normal') { this.data.runMode = string; return this }
    break(bool = false) { this.data.breakCondition = bool; return this }
    Gmix(bool = false) { this.data.gestureMatrix = bool; return this }
    ExThen(Action) { this.data.extraScriptCallbacks ??= {}; this.data.extraScriptCallbacks.afterExecSuc = Action; return this }
    ExAfter(Action) { this.data.extraScriptCallbacks ??= {}; this.data.extraScriptCallbacks.afterExecFinish = Action; return this }
    ExBefore(Action) { this.data.extraScriptCallbacks ??= {}; this.data.extraScriptCallbacks.beforeStartExec = Action; return this }
    ExBeforeCon(Action) { this.data.extraScriptCallbacks ??= {}; this.data.extraScriptCallbacks.beforeCondition = Action; return this }
    ExAfterCon(Action) { this.data.extraScriptCallbacks ??= {}; this.data.extraScriptCallbacks.afterConditionSuc = Action; return this }
    ExConFail(Action) { this.data.extraScriptCallbacks ??= {}; this.data.extraScriptCallbacks.afterConditionFail = Action; return this }
    ExFail(Action) { this.data.extraScriptCallbacks ??= {}; this.data.extraScriptCallbacks.afterExecFail = Action; return this }
    limit(number) { this.data.limitRunCount = number; return this }
}

function $set(path, value, delay = 0) { // 顶级设置变量
    function asAny(value) {
        if (value instanceof Builder) { return value }
        else if (typeof value == 'string') { return str(value).sync }
        else if (typeof value == 'number') { return num(value).sync }
        else if (typeof value == 'boolean') { return bool(value).sync }
        else if (typeof value == 'object') { return obj(value).sync }
        else if (typeof value == 'function') { return jsFunc(value).sync }
        else { throw Error('输入错误: $set > value > not string or number or boolean or object or function') }
    }
    setvar({ [path]: asAny(value) }).delay(delay, 0).run
}
function $get(path) { // 顶级获取变量
    return eval(path);
}

function exp(...i) { return new expression(...i) }
function str(...i) { return new string(...i) }
function num(...i) { return new number(...i) }
function bool(...i) { return new boolean(...i) }
function jsFunc(...i) { return new js_function(...i) }
function btn(...i) { return new button(...i) }
function text(...i) { return new ui_text(...i) }
function image(...i) { return new imageData(...i) }
function color(...i) { return new Color(...i) }
function pos(...i) { return new position(...i) }
function area(...i) { return new screen_area(...i) }
function obj(...i) { return new object(...i) }
function action(...i) { return new script_action(...i) }
function click(...i) { return new Click(...i) }
function swipe(...i) { return new Swipe(...i) }
function gesture(...i) { return new Gesture(...i) }
function js(...i) { return new Runjs(...i) }
function prompt(...i) { return new SystemPrompt(...i) }
function ctrl(...i) { return new Control(...i) }
function runScript(...i) { return new RunScript(...i) }
function setvar(...i) { return new Setvar(...i) }
function runActions(...i) { return new RunActions(...i) }
let SwitchImg = '<img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e6acd32.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e6e4cf1.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e6d4ed3.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e6d56cf.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e6d6fd5.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e8835a8.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e8e3bc2.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e95a144.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e9d7e6e.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e3e6c497e.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c67d1f3.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c689629.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c689538.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c69f2bb.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c695f33.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c897524.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c8d40ae.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c8cb96d.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e4c930573.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5326d8dc.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e533429c6.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5321698b.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5321b388.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e532101e7.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e53489913.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e532101e7.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e53489913.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e534d84ab.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e534e9719.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e535162b7.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e531ebfa2.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b5259dc.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b53cbaa.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b5259dc.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b53cbaa.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b53402d.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b530e92.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b54067a.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b7047f9.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b7357f2.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b786a34.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b7c8c49.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e5b522caa.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e81243d5f.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e8125f9ca.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e8126c684.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e8125f0f4.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e81262248.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e8125f0f4.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e81262248.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e8127174c.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e8149b935.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e814db154.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e814f2794.png"><img width="0%" src="https://www.helloimg.com/i/2025/01/12/6782e8150fb41.png">'

window.TheImgSave = {
    off: `#MD<img width="90" src="https://www.helloimg.com/i/2025/01/12/6782e8150fb41.png">`,
    on: `#MD<img width="90" src="https://www.helloimg.com/i/2025/01/12/6782e532101e7.png">`,
    goOn: [
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e6acd32.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e6e4cf1.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e6d4ed3.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e6d56cf.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e6d6fd5.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e8835a8.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e8e3bc2.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e95a144.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e9d7e6e.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e3e6c497e.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c67d1f3.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c689629.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c689538.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c69f2bb.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c695f33.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c897524.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c8d40ae.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c8cb96d.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e4c930573.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5326d8dc.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e533429c6.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5321698b.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5321b388.png">`,
        `#MD<img width="90" src="https://www.helloimg.com/i/2025/01/12/6782e532101e7.png">`
    ],
    goOff: [
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e53489913.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e53489913.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e534d84ab.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e534e9719.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e535162b7.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e531ebfa2.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b5259dc.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b53cbaa.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b5259dc.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b53cbaa.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b53402d.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b530e92.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b54067a.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b7047f9.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b7357f2.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b786a34.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b7c8c49.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e5b522caa.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e81243d5f.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e8125f9ca.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e8126c684.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e8125f0f4.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e81262248.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e8125f0f4.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e81262248.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e8127174c.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e8149b935.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e814db154.png">`,
        `#MD<img width="95" src="https://www.helloimg.com/i/2025/01/12/6782e814f2794.png">`,
        `#MD<img width="90" src="https://www.helloimg.com/i/2025/01/12/6782e8150fb41.png">`
    ],
    async go_on(valName, a = 100, b) {
        for (let i = 0; i < this.goOn.length; i++) {
            if(i < (this.goOn.length-1) && $Setting.switch.fastSwitch ) continue;
            let ms = i * 20 * a * 0.01 + 20 * a * 0.01;
            if($Setting.switch.fastSwitch) ms = 0
            setTimeout(() => { eval(`${valName} = '${this.goOn[i]}'`) }, ms)
        }
    },
    async go_off(valName, a = 100, b) {
        for (let i = 0; i < this.goOff.length; i++) {
            if(i < (this.goOff.length-1) && $Setting.switch.fastSwitch ) continue;
            let ms = i * 20 * a * 0.01 + 20 * a * 0.01;
            if($Setting.switch.fastSwitch) ms = 0
            setTimeout(() => { eval(`${valName} = '${this.goOff[i]}'`) }, ms)
        }
        
    }
}

function Switch(swName) {
    $set( swName, -2)
    $set('__uiboot_switchIMG_' + swName, str(TheImgSave.off))
    return btn(bool).input.style_none
        .exp('buttonText', `$IMGPATH$`,
            {
                $IMGPATH$: `__uiboot_switchIMG_${swName}`
            })
        .action(js(() => {
            switch ($PATH$) {
                case -2:
                    $PATH$ = 1;
                    TheImgSave.go_on($IMGPATH$, $Setting.switch.switchTime/5, '100%')
                    setTimeout(() => { eval(`$PATH$ = 2`) }, $Setting.switch.switchTime) ; break
                case 2:
                    $PATH$ = -1;
                    TheImgSave.go_off($IMGPATH$, $Setting.switch.switchTime/5, '100%')
                    setTimeout(() => { eval(`$PATH$ = -2`) }, $Setting.switch.switchTime) ; break
            }
        }, {
            $PATH$: `${swName}`,
            $IMGPATH$: `'__uiboot_switchIMG_${swName}'`
        }))

}
[$set, $get, exp, str, num, bool, jsFunc, btn, text, image, color, pos, area, obj, action, click, swipe, gesture, js, prompt, ctrl, runScript, setvar, runActions, Mio].forEach(i => window[i.name] = i)


$Setting.switch.fastSwitch = false
ZDJLUI = setvar({
    all: obj({
        SW1: Switch('SW1').textRight('选项1').bgColor('#11ffffff'),
        SW2: Switch('SW2').textRight('选项2').bgColor('#11ffffff'),
        SW3: Switch('SW3').textRight('选项3').bgColor('#11ffffff')
    }).input.sync
})

zdjl.runActionAsync(runActions([
    ZDJLUI.execute
]).execute)



