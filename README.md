## 这是什么?
这是一个自动精灵的js功能延伸，用于用户在此软件上更轻易部署自己的ui功能

## 他能做什么?
同步全局变量，动态修改UI

## 我该怎么使用
### [点此 移动到<部署>](https://gitlab.com/thx114/zdjl-UI-boot/-/wikis/1.%E9%83%A8%E7%BD%B2)

## 更新日志:
### 4.1  
 * 完全重写代码 抛弃了$this等写法改为全局变量  
 * 代码提示支持  
 * 注释 `代码示例` 下面的代码就是示例的用户代码  

### 3.1
 * 修复了杂七杂八一大堆的bug (完全记不清修复了什么，但是一切都按照预期工作)
 * 新增 addon `.runs()`,参数与.as一致，使用它将不需要as初始化，作用是重复执行动作(等效 `.then(js()=>{runtime.run})` ),但是不会内存溢出
 * 新增 `self` 用于获取固定值
 * 新增 `NB()` 等效 `new Builder()`
 * 新增 addon `.k` `.K()` ,使用后变量本体(`$this`)的对应值会直接与实际值(`this`)绑定
 * 变量补充了脚本变量`action()`
 * `just3.js`中 `RELOAD()` 下方的所有被注释的代码，是一个示例，可运行

### 3.0
 * 全部代码重构
 * Addons 现在可以被动态加载
 * this 与 #this 改为 this 与 $this
 * `Builder` 现在单独存在，作为 `<Var>` 和 `<Action>` 的构建器
 * `runlist` 与 `addlist` 现在作为 Addons 与 Function 的动态加载器，你可以修改其内容，之后的所有变量都会加载新的 Addons ,使用 `RELOAD()` 重载 Addons
 * 对于this的重构使得全局all不复存在，使用`<Builder>.as()`来为setvar指定一个全局变量名，尽管this的读取变量是全自动的
 * `<Builder>|<runlistFunction>.help`将提供对应值的Addons帮助，对于不同的Builder，取决于类型或内容，会提供不同的Addon
 * 方法 `Var.set(name,value)` 能设置变量内容,支持路径
 * 方法 `Var.get(name)` 能获取变量内容,支持路径
 * 方法 `Var.asTimeInput(input,mode=1)` 能把字符串输入，数字输入转换为对应的毫秒级数值输出


### 2.0.1
 * 新增特性 `%BOOLNAME%`: 与this配合使用获取变量实际内容 例:``` button().text(()=>{return this['%BOOLNAME%']})```
 * Switch上线，参数只有一个`default:bool` 全局变量 G_Switch_size 调整大小，默认100
 * exp重构

### 2.0
 * 全部代码重构
 * this现在工作在`object<Obj>`中，这意味着不需要apply与this定向，也不存在全局变量id了，现在this真的是this了
 * `<Var>`与`<Action>`现在作为构建器存在，在被添加到`<setvar>`或`<Obj>object`之后，会释放对应变量，减少性能损耗和存储内存占用
 * all 的 id获取初始化 在 object 或 setvars 中才会进行，对于Mother获取也是在 object 初始化时进行  
 * 新增了基础变量 array ，使用 array 将生成一个 object 对象，工作原理与 js 的 Array 类似
 * 新增函数 `Obj.object()` : 将一个 object 变量转换为 Object
 * 新增函数 `Obj.array()` : 将一个 object 变量转换为 Array (只保留values)
 * 新增函数 `Var.value2Var()` :将一个普通变量转换为\<Var\>变量，当然这在 `object()` 中是默认自动进行的

注意 : Switch textlist等都没有被迁移到最新版本，现在的一切都是不稳定的
