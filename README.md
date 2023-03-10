## 这是什么?
这是一个自动精灵的js功能延伸，用于用户在此软件上更轻易部署自己的ui功能

## 他能做什么?
同步ui对象的属性与全局变量对应，使得能动态修改ui对象的属性，从而可以动态变化ui

## 我该怎么使用
### [点此 移动到<部署>](https://github.com/thx114/zdjl.UI-boot/wiki/1.%E9%83%A8%E7%BD%B2)

## 更新日志:
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
