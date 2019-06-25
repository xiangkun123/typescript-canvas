
/**
 * Application框架静态类结构
 */

// tips: Application类用于被继承、被扩展，最好成员变量都设置为protected
export class Application {

    // 用于标记Application是否进入不间断循环状态
    protected _start: boolean = false;
    
    // 由window对象的requestAnimationFrame返回的大于0的id号，可以使用cancelAnimationFrame(this._requestId)来取消动画循环
    protected _requestId: number = -1;
    
    // 用于基于时间的物理更新，通过使用 “!:” 可以延迟赋值
    protected _lastTime !: number;
    protected _startTime !: number;
}

