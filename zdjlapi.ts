
declare interface LocationResult {
    /** 横坐标（屏幕物理像素） */
    x: number;
    /** 纵坐标（屏幕物理像素） */
    y: number;
    /** 横坐标（屏幕百分比） */
    x_100: number;
    /** 纵坐标（屏幕百分比） */
    y_100: number;
    /** 横坐标（屏幕 dp 逻辑像素） */
    x_dp: number;
    /** 纵坐标（屏幕 dp 逻辑像素） */
    y_dp: number;
}
declare interface FindNodeResult {
    /** 节点文字 */
    text: string;
    /** 节点类目 */
    className: string;
    /** 节点id */
    idResName: string;
    /** 所属 app 包名 */
    packageName: string;
    /** 节点位置（左） */
    boundLeft: number;
    /** 节点位置（上） */
    boundTop: number;
    /** 节点位置（右） */
    boundRight: number;
    /** 节点位置（下） */
    boundBottom: number;
    /** 子节点信息 */
    children?: FindNodeResult[];
}
declare interface RequestUrlConfig {
    /** 链接url */
    url: string;
    /** 请求方法 */
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    /** 请求头 */
    headers?: {
        [key: string]: string;
    }[];
    /** 请求体 */
    requestBody?: string;
    /** 请求格式 */
    requestType?: string;
    /** 返回格式 */
    responseType?: string;
    /** 超时时间 */
    timeout?: number;
}
declare interface ZdjlApi {
    /** 获取当前 app 版本 */
    getAppVersion(): string;
    /** 获取当前登录的用户信息 */
    getUser(): {
        userId: string;
        userName: string;
        isVip: boolean;
    };
    /** 获取当前设备信息 */
    getDeviceInfo(): {
        /** app 版本 */
        appVersion: string;
        /** app 版本号 */
        appVersionCode: number;
        /** 当前设备唯一标识 */
        deviceId: string;
        /** 当前设备 UA 标识 */
        userAgent: string;
        /** 当前屏幕旋转方向(0: 0度, 1: 90度, 2: 180度, 3: 270度) */
        screenRotation: number;
        /** 当前屏幕宽度（物理屏幕像素，包含虚拟按键等） */
        screenWidth: number;
        /** 当前屏幕高度（物理屏幕像素，包含虚拟按键等） */
        screenHeight: number;
        /** 当前屏幕宽度（可视内容区域，不包含虚拟按键等） */
        width: number;
        /** 当前屏幕高度（可视内容区域，不包含虚拟按键等） */
        height: number;
        /** 屏幕像素密度，即 1dp 代表的物理像素值 */
        density: number;
        /** 屏幕的 dpi */
        densityDpi: number;
        /** 客户端类型 */
        clientType: 'android' | 'pc',
    };
    /** 获取粘贴板文本 */
    getClipboard(): string;
    /** 设置粘贴板文本 */
    setClipboard(text: string): void;
    /** 展示 toast 简易提示 */
    toast(message: string, duration?: number): void;
    /** 展示 alert 提示弹窗 */
    alert(message: string, options?: {
        duration?: number;
        title?: string;
    }): void;
    /** 展示 alert 提示弹窗（异步非阻塞） */
    alertAsync(message: string, options?: {
        duration?: number;
        title?: string;
    }): Promise<void>;
    /** 展示 confirm 确认弹窗 */
    confirm(message: string, options?: {
        duration?: number;
        title?: string;
    }): any;
    /** 展示 confirm 确认弹窗（异步非阻塞） */
    confirmAsync(message: string, options?: {
        duration?: number;
        title?: string;
    }): Promise<any>;
    /** 展示 输入内容弹窗，返回值为输入的内容 */
    prompt(message: string, defaultValue?: string, options?: {
        duration?: number;
    }): any;
    /** 展示 输入内容弹窗，返回值为输入的内容（异步非阻塞） */
    promptAsync(message: string, defaultValue?: string, options?: {
        duration?: number;
    }): Promise<any>;
    /** 展示 选择弹窗，返回值为选择的条目 */
    select(config: {
        title?: string;
        items: string[];
        selectItems?: string[];
        multi?: false;
        duration?: number;
    }): {
        result: number;
        item: string;
    } | null;
    select(config: {
        title?: string;
        items: string[];
        selectItems?: string[];
        multi: true;
        duration?: number;
    }): {
        result: number[];
        items: string[];
    } | null;
    /** 展示 选择弹窗，返回值为选择的条目（异步非阻塞） */
    selectAsync(config: {
        title?: string;
        items: string[];
        selectItems?: string[];
        multi?: false;
        duration?: number;
    }): Promise<{
        result: number;
        item: string;
    } | null>;
    selectAsync(config: {
        title?: string;
        items: string[];
        selectItems?: string[];
        multi: true;
        duration?: number;
    }): Promise<{
        result: number[];
        items: string[];
    } | null>;
    /**
     * 等待一定时间
     * @param duration 等待时长，单位：毫秒
     */
    sleep(duration: number): void;
    /**
     * 等待一定时间（异步非阻塞）
     * @param duration 等待时长，单位：毫秒
     */
    sleepAsync(duration: number): Promise<void>;
    /** 获得变量值 */
    getVar(varName: string, scope?: 'global' | string): any;
    /** 设置变量值 */
    setVar(varName: string, varValue: any, scope?: 'global' | string): void;
    /** 删除变量值 */
    deleteVar(varName: string, scope?: 'global' | string): void;
    /** 删除变量值（带确认提示） */
    deleteVarWithConfirm(varName: string, scope?: 'global' | string): void;
    /** 获得一个作用域下的所有变量值 */
    getVars(scope?: 'global' | string): any;
    /** 弹窗展示所有变量值 */
    printVars(): Promise<void>;
    /**
     * 清空变量
     * @param scopeId 作用域，不填则清除全部
     */
    clearVars(scopeId?: string): void;
    /** 清空变量（带确认提示） */
    clearVarsWithConfirm(scope: string): void;
    /** 获取本地储存值 */
    getStorage(storageKey: string, scope?: string): any;
    /** 设置本地储存值 */
    setStorage(storageKey: string, content: any, scope?: string): void;
    /** 删除本地储存值 */
    removeStorage(storageKey: string, scope?: string): void;
    /** 运行一个动作，具体参数值请查看 变量-动作 查看值表达式 */
    runAction(actionJSON: object): void;
    /** 运行一个动作，具体参数值请查看 变量-动作 查看值表达式（异步非阻塞） */
    runActionAsync(actionJSON: object): Promise<void>;
    /** 检查运行条件，返回条件是否成立 */
    check(conditionJSON: object): boolean;
    /** 检查运行条件，返回条件是否成立（异步非阻塞） */
    checkAsync(conditionJSON: object): Promise<boolean>;
    /** 查找坐标，具体参数值请查看 变量-坐标 查看值表达式 */
    findLocation(posData: any, findAll: boolean): (typeof findAll extends true ? LocationResult[] : LocationResult);
    /** 查找坐标，具体参数值请查看 变量-坐标 查看值表达式（异步非阻塞） */
    findLocationAsync(posData: any, findAll: boolean): Promise<typeof findAll extends true ? LocationResult[] : LocationResult>;
    /** 查找节点，具体参数值请查看 变量-节点 查看值表达式 */
    findNode<FindAll extends boolean>(posData: any, config: {
        findAll?: FindAll;
        withChildren?: boolean;
    }): (FindAll extends true ? FindNodeResult[] : FindNodeResult);
    /** 查找节点，具体参数值请查看 变量-节点 查看值表达式（异步非阻塞） */
    findNodeAsync<FindAll extends boolean>(posData: any, config: {
        findAll?: FindAll;
        withChildren?: boolean;
    }): Promise<FindAll extends true ? FindNodeResult[] : FindNodeResult>;
    /** 识别屏幕内容，具体参数值请查看 变量-识别屏幕 查看值表达式 */
    recognitionScreen(config: any): string;
    /** 识别屏幕内容，具体参数值请查看 变量-识别屏幕 查看值表达式（异步非阻塞） */
    recognitionScreenAsync(config: any): Promise<string>;
    /** 获取屏幕指定位置的颜色 */
    getScreenColor(x: number | string, y: number | string, ignoreCache?: boolean): number;
    /** 获取屏幕指定位置的颜色（异步非阻塞） */
    getScreenColorAsync(x: number | string, y: number | string, ignoreCache?: boolean): Promise<number>;
    /** 获取屏幕指定区域的所有颜色（异步非阻塞） */
    getScreenAreaColors(param: {
        x: number | string;
        y: number | string;
        width: number | string;
        height: number | string;
        ignoreCache?: boolean;
        sampleSize?: number;
    }): {
        data: number[];
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** 获取屏幕指定区域的所有颜色（异步非阻塞） */
    getScreenAreaColorsAsync(param: {
        x: number | string;
        y: number | string;
        width: number | string;
        height: number | string;
        ignoreCache?: boolean;
        sampleSize?: number;
    }): Promise<{
        data: number[];
        x: number;
        y: number;
        width: number;
        height: number;
    }>;
    /** 请求链接内容，具体参数请查看 变量-链接内容 查看值表达式 */
    requestUrl(config: RequestUrlConfig): {
        code: number;
        body: string;
        headers: Record<string, string | string[]>;
    };
    /** 请求链接内容，具体参数请查看 变量-链接内容 查看值表达式（异步非阻塞） */
    requestUrlAsync(config: RequestUrlConfig): Promise<{
        code: number;
        body: string;
        headers: Record<string, string | string[]>;
    }>;
    /** 播放指定路径的音频 */
    playMedia(url: string): any;
    /** 播放指定路径的音频（异步非阻塞） */
    playMediaAsync(url: string): Promise<void>;
    /**
     * 震动
     * @param duration 震动时长
     * @param amplitude 震动强度（1-255）部分机器不支持
     */
    vibrator(duration?: number, amplitude?: number): any;
    /**
     * 震动（异步非阻塞）
     * @param duration 震动时长
     * @param amplitude 震动强度（1-255）部分机器不支持
     */
    vibratorAsync(duration?: number, amplitude?: number): Promise<void>;
    /** 点击指定坐标 */
    click(x: number | string, y: number | string, duration?: number): void;
    /** 点击指定坐标（异步非阻塞） */
    clickAsync(x: number | string, y: number | string, duration?: number): Promise<void>;
    /** 长按指定坐标 */
    longClick(x: number | string, y: number | string): void;
    /** 长按指定坐标（异步非阻塞） */
    longClickAsync(x: number | string, y: number | string): Promise<void>;
    /** 点击指定坐标（同 click） */
    press(x: number | string, y: number | string, duration?: number): void;
    /** 点击指定坐标（异步非阻塞，同 clickAsync） */
    pressAsync(x: number | string, y: number | string, duration?: number): Promise<void>;
    /** 滑动 */
    swipe(x1: number | string, y1: number | string, x2: number | string, y2: number | string, duration?: number): void;
    /** 滑动（异步非阻塞） */
    swipeAsync(x1: number | string, y1: number | string, x2: number | string, y2: number | string, duration?: number): Promise<void>;
    /** 执行一段手势 */
    gesture(duration: number, ...xyArray: Array<[number | string, number | string]>): void;
    /** 执行一段手势（异步非阻塞） */
    gestureAsync(duration: number, ...xyArray: Array<[number | string, number | string]>): Promise<void>;
    /** 执行多指手势 */
    gestures(...gestureConfigs: Array<[number, ...Array<[number | string, number | string]>] | [number, number, ...Array<[number | string, number | string]>]>): void;
    /** 执行多指手势（异步非阻塞） */
    gesturesAsync(...gestureConfigs: Array<[number, ...Array<[number | string, number | string]>] | [number, number, ...Array<[number | string, number | string]>]>): Promise<void>;
    /** 写入文件内容到目标路径 */
    writeFile(filePath: string, fileContent: string | ArrayBuffer | Uint8Array): void;
    /** 写入文件内容到目标路径（异步非阻塞） */
    writeFileAsync(filePath: string, fileContent: string | ArrayBuffer | Uint8Array): Promise<void>;
    /** 添加文件内容到目标路径的文件末尾 */
    appendFile(filePath: string, fileContent: string | ArrayBuffer | Uint8Array): void;
    /** 添加文件内容到目标路径的文件末尾（异步非阻塞） */
    appendFileAsync(filePath: string, fileContent: string | ArrayBuffer | Uint8Array): Promise<void>;
    /** 读取目标路径的文件内容 */
    readFile(filePath: string, options?: {
        encode?: 'UTF-8' | 'GBK' | 'BASE64';
        returnBuffer?: boolean;
    }): string | ArrayBuffer;
    /** 读取目标路径的文件内容（异步非阻塞） */
    readFileAsync(filePath: string, options?: {
        encode?: 'UTF-8' | 'GBK' | 'BASE64';
        returnBuffer?: boolean;
    }): Promise<string | ArrayBuffer>;
    /** 唤醒屏幕 */
    wakeupScreen(): void;
    /** 手势按下 */
    touchDown(x: number, y: number): void;
    /** 手势移动 */
    touchMove(x: number, y: number, duration?: number): void;
    /** 手势抬起 */
    touchUp(): void;
    /** 手势按下（异步非阻塞） */
    touchDownAsync(x: number, y: number): Promise<void>;
    /** 手势移动（异步非阻塞） */
    touchMoveAsync(x: number, y: number, duration?: number): Promise<void>;
    /** 手势抬起（异步非阻塞） */
    touchUpAsync(): Promise<void>;
    /** 键盘按下 */
    keyDown(keyName: string): void;
    /** 键盘抬起 */
    keyUp(keyName: string): void;
    /** 键盘按下并抬起，最后一个参数可以是数值代表时间 */
    keyPress(...keyNameOrDuration: Array<string | number>): void;
    /** 键盘按下并抬起（异步），最后一个参数可以是数值代表时间 */
    keyPressAsync(...keyNameOrDuration: Array<string | number>): Promise<void>;
    /** 对传入的 base64 图片内容执行 ocr 识别 */
    ocr(param: {
        mode?: 'local' | 'online';
        base64: string;
        resultType?: 'text'|'raw';
    }): string;
    /** 对传入的 base64 图片内容执行 ocr 识别（异步非阻塞） */
    ocrAsync(param: {
        mode?: 'local' | 'online';
        base64: string;
        resultType?: 'text'|'raw';
    }): Promise<string>;
    /** 获取当前手机定位经纬度 */
    getLocation(param: { timeout?: number }): object;
    /** 获取当前手机定位经纬度（异步非阻塞） */
    getLocationAsync(param: { timeout?: number }): Promise<object>;
    /** 设置屏幕亮度（-1 ～ 255） */
    setScreenBrightness(value: number): string;
    /** 设置 WIFI 开关 */
    setWifiEnable(enable: boolean): void;
    /** 设置 WIFI 开关(异步) */
    setWifiEnableAsync(enable: boolean): void;
    /** 设置 蓝牙 开关 */
    setBluetoothEnable(enable: boolean): void;
    /** 设置 蓝牙 开关(异步) */
    setBluetoothEnableAsync(enable: boolean): Promise<void>;
    /** 设置 闪光灯 开关 */
    setCameraFlashEnable(enable: boolean): void;
    /** 设置 闪光灯 开关(异步) */
    setCameraFlashEnableAsync(enable: boolean): Promise<void>;
    /** 获取安装的所有应用信息 */
    getInstalledAppInfo(): Array<{ isSystemApp: boolean, packageName: string, versionCode: number, versionName: string, label: string }>;
    /** 获取当前鼠标位置 */
    getMousePosition(): { x: number, y: number, xInScreen: number, yInScreen: number };
}

declare var zdjl: ZdjlApi;