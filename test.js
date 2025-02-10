class VarType {
    constructor() {
        //1、属性名，2、初始属性，3、属性默认值
        this.ownProps = [
            // 需要界面手动输入
            { name: 'showInput', isInit: true, default: true },

            // 变量展示名称
            { name: 'showInputLabel', isInit: false, default: '' },

            // 不展示变量名称
            { name: 'showInputHiddenLabel', isInit: false, default: true },

            // 额外文本(上)
            { name: 'textLineBefore', isInit: false, default: '' },

            // 额外文本(下)
            { name: 'textLineAfter', isInit: false, default: '' },

            // 额外文本(右)
            { name: 'textAppendRight', isInit: false, default: '' },

            // 是否必填
            { name: 'mustInput', isInit: true, default: true },

            // 记住输入的值
            { name: 'rememberInputValue', isInit: false, default: true },

            // 改动后实时设置值
            { name: 'syncValueOnChange', isInit: false, default: true },

            // 内容对齐方式
            { name: 'showInputContentAlign', isInit: true, default: 'left' },

            // 显示宽度
            { name: 'showInputWidthBasis', isInit: false, default: '100%' },

            // 撑满剩余空间
            { name: 'showInputWidthGrow', isInit: false, default: 0 },

            // 背景颜色
            { name: 'backgroundColor', isInit: false, default: '#FFFFFF' },

            // 背景图片
            { name: 'backgroundImageData', isInit: false, default: '' },

            // 隐藏变量显示
            { name: 'showInputHiddenView', isInit: false, default: true },

            // 隐藏变量描述展示
            { name: 'showInputHiddenDesc', isInit: false, default: true },

            // 作用域
            { name: 'varScope', isInit: true, default: 'script' },

            // 变量描述
            { name: 'varDesc', isInit: false, default: '' },

            // 开启变量模式
            { name: '__vars', isInit: false, default: {} },
        ]

        this.props = this.ownProps
    }

    getInitVar() {
        const initObj = {}
        this.props.forEach((prop) => {
            if (prop.isInit === true) initObj[prop.name] = prop.default
        })
        return initObj
    }
}

class StringVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'string' },

            // 字符内容
            { name: 'value', isInit: false, default: '' },

            // 选项代替输入
            { name: 'stringItems', isInit: false, default: [] }
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class NumberVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'number' },

            // 字符内容
            { name: 'number', isInit: false, default: 0 },

            // 选项代替输入
            { name: 'selectItems', isInit: false, default: [] }
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class BoolVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'bool' },

            // 变量值为真
            { name: 'value', isInit: false, default: true },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ObjectVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'object' },

            // 按钮弹窗形式输入
            { name: 'configInNewDialog', isInit: false, default: true },

            // 子变量列表
            { name: 'objectVars', isInit: false, default: [] }
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ExpressionVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'expression' },

            // 表达式
            { name: 'valueExp', isInit: true, default: '' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class JsFunctionVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'js_function' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class DeleteVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'delete' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class PositionVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'position' },

            // 位置类型
            {
                name: 'position', isInit: true, default: {
                    type: 'location',
                    // x: '50%',
                    // y: '50%'
                }
            },

            // 返回所有匹配结果
            { name: 'findAll', isInit: false, default: true },

            // 输入时从屏幕选择
            { name: 'onlyCanChooseLocWhenInput', isInit: false, default: true },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ImageRecognitionVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'image_recognition' },

            // 识别配置
            {
                name: 'config', isInit: true, default: {
                    recognitionArea: '36% 36% 70% 50%',
                    recognitionMode: 'ocr_local',
                    imageFilter: {
                        type: 'bw',
                        greyAlgorithm: 'weighted_average',
                        threshold: 127
                    },
                    ocrResultType: 'text',
                    humanRecMaxPositionCount: 1
                }
            },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class NodeVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'node' },

            // 返回所有匹配结果
            { name: 'findAll', isInit: false, default: true },

            // 返回子节点信息
            { name: 'withChildren', isInit: false, default: true },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ScriptActionVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'script_action' },

            // 动作
            { name: 'script', isInit: false, default: { type: '系统提示', promptText: ' ', promptType: "toast" } },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ColorVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'color' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ScreenAreaVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'screen_area' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ImageDataVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'imageData' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class RequestUrlVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'requestUrl' },

            // 链接地址
            { name: 'url', isInit: true, default: 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=60364,60448&wd=%E6%98%9F%E4%B9%8B%E5%8D%A1%E6%AF%94&csor=4&pwd=xing%27zhi%27ka%27bi&cb=jQuery110206668090146658245_1720942032143&_=1720942032156' },

            // 请求方法
            { name: 'method', isInit: false, default: 'GET' },

            // 请求头部
            { name: 'headers', isInit: false, default: [] },

            // 返回格式
            { name: 'responseType', isInit: false, default: 'TEXT' },

            // 请求超时时间
            { name: 'responseType', isInit: false, default: 120000 },

        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class FileVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'file' },

            // 文件路径
            { name: 'filePath', isInit: false, default: '' },

            // 限制选择文件后缀
            { name: 'inputModeFileSuffix', isInit: false, default: '' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ArrayStringVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'array_string' },

            // 值数组
            { name: 'array', isInit: false, default: [] },

            // 选项代替输入
            { name: 'stringItems', isInit: false, default: [] },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ArrayNumberVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'array_number' },

            // 值数组
            { name: 'array', isInit: false, default: [] },

            // 选项代替输入
            { name: 'selectItems', isInit: false, default: [] },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class ArrayScriptActionVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'array_script_action' },

            // 动作数组
            { name: 'array', isInit: false, default: [] },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class UiTextVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'ui_text' },

            // 文字内容
            { name: 'textContent', isInit: false, default: '' },

            // 文字大小
            { name: 'textSize', isInit: false, default: 13 },

            // 文字颜色
            { name: 'textColor', isInit: false, default: '#000000' },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class UiButtonVar extends VarType {
    constructor() {
        super()
        const ownProps = [
            // 变量类型
            { name: 'varType', isInit: true, default: 'ui_button' },

            // 按钮文字
            { name: 'buttonText', isInit: false, default: 'button' },

            // 按钮样式,可选参数:button,link,none
            { name: 'buttonStyle', isInit: false, default: 'button' },

            // 按钮行为
            { name: 'action', isInit: false, default: { type: '系统提示', promptText: '点了button' } },

            // 点击按钮关闭弹窗
            { name: 'closeDialogOnAction', isInit: false, default: true },
        ]

        this.props = [...this.props, ...ownProps]
        this.ownProps = ownProps
    }
}

class UI {
    constructor(varsObj) {
        this.dialog = {}

        // 存放[设置变量]的变量配置
        this.vars = {}

        // 存放[设置变量]的配置方法
        this.setVarFn = {}

        // 存放[设置变量]的配置属性
        this.setVarPropsObj = {}

        // 存放[设置变量]开启了变量模式的配置属性
        this.setVarOnVarPropsObj = {}

        // 存放[设置变量]的变量类型类的映射
        this.setVarClassMap = new Map([
            ['any', VarType],
            ['string', StringVar],
            ['number', NumberVar],
            ['bool', BoolVar],
            ['object', ObjectVar],
            ['expression', ExpressionVar],
            ['js_function', JsFunctionVar],
            ['delete', DeleteVar],
            ['position', PositionVar],
            ['image_recognition', ImageRecognitionVar],
            ['node', NodeVar],
            ['script_action', ScriptActionVar],
            ['color', ColorVar],
            ['screen_area', ScreenAreaVar],
            ['imageData', ImageDataVar],
            ['requestUrl', RequestUrlVar],
            ['file', FileVar],
            ['array_string', ArrayStringVar],
            ['array_number', ArrayNumberVar],
            ['array_script_action', ArrayScriptActionVar],
            ['ui_text', UiTextVar],
            ['ui_button', UiButtonVar],
        ])

        // 获取变量集合与类型集合
        const varNames = Object.keys(varsObj)
        const varTypes = Object.values(varsObj)

        // 根据实例化参数，构建setVar的方法
        this.createVarProps('any')
        if (varTypes.includes('string')) this.createVarProps('string')
        if (varTypes.includes('number')) this.createVarProps('number')
        if (varTypes.includes('bool')) this.createVarProps('bool')
        if (varTypes.includes('object')) this.createVarProps('object')
        if (varTypes.includes('expression')) this.createVarProps('expression')
        if (varTypes.includes('js_function')) this.createVarProps('js_function')
        if (varTypes.includes('delete')) this.createVarProps('delete')
        if (varTypes.includes('position')) this.createVarProps('position')
        if (varTypes.includes('image_recognition')) this.createVarProps('image_recognition')
        if (varTypes.includes('node')) this.createVarProps('node')
        if (varTypes.includes('script_action')) this.createVarProps('script_action')
        if (varTypes.includes('color')) this.createVarProps('color')
        if (varTypes.includes('screen_area')) this.createVarProps('screen_area')
        if (varTypes.includes('imageData')) this.createVarProps('imageData')
        if (varTypes.includes('requestUrl')) this.createVarProps('requestUrl')
        if (varTypes.includes('file')) this.createVarProps('file')
        if (varTypes.includes('array_string')) this.createVarProps('array_string')
        if (varTypes.includes('array_number')) this.createVarProps('array_number')
        if (varTypes.includes('array_script_action')) this.createVarProps('array_script_action')
        if (varTypes.includes('ui_text')) this.createVarProps('ui_text')
        if (varTypes.includes('ui_button')) this.createVarProps('ui_button')

        // 初始化[设置变量]的配置
        varNames.forEach((varName, index) => {
            this.initVar(varName, varTypes[index])
        })

    }

    // 获取变量的配置
    initVar(varName, varType) {
        this.vars[varName] = this.setVarPropsObj[varType].getInitVar()
    }

    // 获取当前实例的所有自有属性
    getInstanceProperties(Obj = this) {
        return Object.getOwnPropertyNames(Obj)
    }

    // 开启属性变量函数的方法
    onVar(onPropsObj = {}) {
        this.setVarOnVarPropsObj[this.currentKey] = onPropsObj
        return this
    }

    // 一个辅助方法来设置当前操作的键
    setVar(key) {
        this.currentKey = key
        return this
    }

    // 设置varProp与默认值
    createVarProps(varType) {
        const VarClass = this.setVarClassMap.get(varType)
        this.setVarPropsObj[varType] = new VarClass()
        this.setVarPropsObj[varType].ownProps.forEach((propObj) => {

            // 设置varProp
            this[propObj.name] = this.createVarPropsFn(propObj.name, varType)
        })
    }

    // 构建varProp方法
    createVarPropsFn(prop, varType) {
        return (value) => {
            if (value === undefined) {
                const ownProps = this.setVarPropsObj[varType].ownProps
                const propArr = ownProps.filter(item => item.name === prop)
                const defaultValue = propArr[0].default

                // 设置varProp的默认值
                this.vars[this.currentKey][prop] = defaultValue
            } else {
                this.vars[this.currentKey][prop] = value
            }
            return this
        }
    }

    // 辅助方法来设置当前操作的configType
    setUi(key) {
        this.configType = key
        return this
    }

    // 便捷方法，配置弹出框
    setDialog() {
        return this.setUi('dialog')
    }

    // 设置: jumpId
    jumpId(id) {
        this[this.configType].jumpId = id
        return this
    }

    // 设置:弹窗标题
    dialogTitle(title) {
        this[this.configType].dialogTitle = title
        return this
    }

    // 设置:弹窗仅展示一次
    dialogShowOnce(isShowOnce = false) {
        this[this.configType].dialogShowOnce = isShowOnce
        return this
    }

    // 设置:确定按钮文字
    dialogOKText(text = '确定') {
        this[this.configType].dialogOKText = text
        return this
    }

    // 设置:取消按钮文字
    dialogCancelText(text = '取消') {
        this[this.configType].dialogCancelText = text
        return this
    }

    // 构造变量配置
    createVarExp() {
        const vars = []
        for (let varName of Object.keys(this.vars)) {
            const varObj = {
                name: varName,
                value: this.vars[varName]
            }
            vars.push(varObj)
        }

        return vars
    }

    // 构造表达式
    createExpression() {
        // 构建变量表达式
        const vars = this.createVarExp()

        // 设置开启变量模式的配置
        if (Object.keys(this.setVarOnVarPropsObj).length > 0) {
            vars.forEach(item => {
                // 获取开启了变量模式的变量与配置
                const onVar = this.setVarOnVarPropsObj[item.name]

                // 如果变量没有开启变量模式的属性，直接跳过
                if (!onVar) return

                // 获取开启变量模式的props
                const props = Object.keys(onVar)

                // 获取开启变量模式props的表达式
                const expressions = Object.values(onVar)

                // 为开启变量模式的props构建表达式
                props.forEach((prop, propIndex) => {
                    item.value.__vars = {
                        [prop]: {
                            varType: 'expression',
                            valueExp: expressions[propIndex]
                        }
                    }
                })
            })
        }

        // 构建设置变量头
        const expression = {
            type: '设置变量',
            vars: vars
        }

        // 构建弹出框表达式
        for (let key of Object.keys(this.dialog)) {
            expression[key] = this.dialog[key]
        }

        return expression
    }

    // 测试方法，写代码测试UI类的效果
    test() {
        return this.getInstanceProperties()
    }

    // 显示界面
    async run() {
        await zdjl.runActionAsync(this.createExpression())
    }
}

// 申明UI变量:objVars
const objVars = {
    o1: 'string',
    o2: 'number',
    o3: 'bool'
}

// 实例化ObjVar
const ObjVar = new UI(objVars)
for (let key of Object.keys(objVars)) {
    ObjVar.setVar(key).mustInput(false)
}

// 申明UI变量:vars
// 下面的注释掉的，你都可以打开看看效果，支持所有的自动精灵变量
const vars = {
    gameName: 'string',
    gameLv: 'number',
    gameServer: 'string',
    isVip: 'bool',
    objVar: 'object',
    // expVar: 'expression',
    // fnVar: 'js_function',
    // delVar: 'delete',
    // positionVar: 'position',
    // imagReVar: 'image_recognition',
    // nodeVar: 'node',
    // actionVar: 'script_action',
    // colorVar: 'color',
    // screenAreaVar: 'screen_area',
    // imageVar: 'imageData',
    // requestVar: 'requestUrl',
    // fileVar: 'file',
    // arrayStrVar: 'array_string',
    // arrayNumVar: 'array_number',
    // arrayActVar: 'array_script_action',
    uiTextVar: 'ui_text',
    uiButtonVar: 'ui_button',
}

// 实例化UI
const Ui = new UI(vars)

// 配置UI变量:gameName
Ui.setVar('gameName')
    // 下面的所有链式调用都有效，说明参考【UI】类的内部方法说明。key值与自动精灵一致。
    // 我注释掉的，你也可以启用看效果。

    .value('King of aye310')
    // .stringItems(['King of aye', 'King of aye2', 'King of aye3'])
    .showInput(true)
    .showInputLabel('游戏名称')
    .showInputHiddenLabel(false)
    .varScope('global')
    // .textLineBefore('请填写游戏名称')
    // .textLineAfter('游戏名称不得为空')
    // .textAppendRight(':)')
    .mustInput(true)
    .rememberInputValue(false)
    .syncValueOnChange(false)
    .showInputContentAlign('center')
    .showInputWidthBasis('auto')
    .showInputWidthGrow(1)
    .backgroundColor('#000000')
    // .backgroundImageData()
    .showInputHiddenView(false)
    .showInputHiddenDesc()
    .varDesc('\n游戏名称不得为空\n游戏名称需要是2-10个字符')
    .mustInput(false)
    // onVar方法设置开启变量模式的所需，传参格式为：{属性名:表达式}
    .onVar({
        value: "!zdjl.getVar('isVip')",
        showInputLabel: "!zdjl.getVar('isVip')",
        textLineBefore: "!zdjl.getVar('isVip')",
        showInputHiddenView: "!zdjl.getVar('isVip')",
    })

// 配置UI变量:gameLv
Ui.setVar('gameLv')
    .showInput(true)
    .number(520)
    .showInputLabel('游戏等级')
    .varScope('global')
    .showInputWidthBasis('auto')
    // .textLineAfter('这是数值变量')
    .showInputWidthGrow(1)
    .mustInput(false)
    .onVar({
        value: "!zdjl.getVar('isVip')",
        showInputLabel: "!zdjl.getVar('isVip')",
        textLineBefore: "!zdjl.getVar('isVip')",
        showInputHiddenView: "!zdjl.getVar('isVip')",
    })

// 配置UI变量:gameServer
Ui.setVar('gameServer')
    .stringItems(['火影忍者专区', '星之卡比专区', '王者不荣耀区'])
    .showInput(true)
    .showInputLabel('游戏服务器')

// 配置UI变量:isVip
Ui.setVar('isVip')
    .showInputLabel('VIP会员')
    .syncValueOnChange()

// 配置UI变量:objVar
Ui.setVar('objVar')
    .objectVars(ObjVar.createVarExp())
    .configInNewDialog()
    .mustInput(false)

// 配置UI变量:uiTextVar
Ui.setVar('uiTextVar')
    .textContent('文字内容')
    .textSize(30)
    .textColor('#FFD9EC')

// 配置UI变量:uiButtonVar
Ui.setVar('uiButtonVar')
    .buttonText('攻击GM')
    .buttonStyle('link')
    .action()
    .closeDialogOnAction(false)

// 配置弹出框
Ui.setDialog()
    // .jumpId('testUI')
    .dialogTitle('配置游戏信息')
    .dialogOKText('ok')
    .dialogCancelText('cancel')

// 运行UI界面
await Ui.run()