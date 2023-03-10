## 这是什么?
这是一个自动精灵的js功能延伸，用于用户在此软件上更轻易部署自己的ui功能

## 他能做什么?
同步ui对象的属性与全局变量对应，使得能动态修改ui对象的属性，从而可以动态变化ui

## 我该怎么使用
### [点此 移动到<部署>](https://github.com/thx114/zdjl.UI-boot/wiki/1.%E9%83%A8%E7%BD%B2)

更新日志:

### 2.0
* 全部代码重构
* this现在工作在`object<Obj>`中，这意味着不需要apply与this定向，也不存在全局变量id了，现在this真的是this了
* `<Var>`现在作为构建器存在，在被添加到`<setvar>`或`<Obj>object`之后，会释放对应变量，减少性能损耗和存储内存占用
* all 的 id获取初始化 在 object 或 setvars 中才会进行，对于Mother获取也是在 object 初始化时进行
> 注意 : Switch textlist等都没有被迁移到最新版本，现在的一切都是不稳定的
