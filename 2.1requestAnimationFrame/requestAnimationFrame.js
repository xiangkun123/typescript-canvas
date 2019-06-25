"use strict";
/**
    动画就是不间断地、基于时间的更新与重绘。
    不间断有两种方式：
    1、类似于while(true) {}之类的死循环，在window下的D3D、OpenGL开发中，经常使用这种模式来驱动动画不断运行；
    2、类似于定时器的回调，例如DOM中window对象的setTimeout\setInterval及requestAnimationFrame方法。
*/
// 用于记录第一次调用step函数的时间点，用于计算与第一次调用step函数的时间差，以毫秒为单位
var start = 0;
// lastTime记录的是上一次调用step函数的时间点，用于计算两帧之间的时间差，以毫秒为单位
var lastTime = 0;
// count用于记录step函数运行的次数
var count = 0;
/**
 * step函数用于计算：
 * 1、用于计算当前时间点与HTML程序启动时的时间差： timestamp
 * 2、获取当前时间点与第一次调用step时的时间差： elapsedMsec
 * 3、获取当前时间点与上一次调用step是的时间差： intervalMsec
 * step函数是作为requestAnimationFrame方法的回调函数使用的
 * 因此step函数的签名必须是 { timestamp: number } => void
 */
function step(timestamp) {
    // 第一次调用函数时，设置start和lastTime为timestamp
    if (!start)
        start = timestamp;
    if (!lastTime)
        lastTime = timestamp;
    // 计算当前时间点与第一次调用step时间点的差
    var elapsedMsec = timestamp - start;
    // 两帧之间的时间差
    var intervalMsec = timestamp - lastTime;
    // 记录下上一次的时间戳
    lastTime = timestamp;
    // 计数器，用于记录step函数被调用的次数
    count++;
    console.log(" " + count + " timestamp = " + timestamp);
    console.log(" " + count + " elapsedMsec = " + elapsedMsec);
    console.log(" " + count + " intervalMsec = " + intervalMsec);
    // 使用requestAnimationFrame启动step
    window.requestAnimationFrame(step);
}
// 使用requestAnimationFrame启动step函数，step中又会通过requestAnimationFrame回调step函数，从而形成不间断递归调用，驱动动画运行
// window.requestAnimationFrame( step );
/**
 * 总结：
 * 最终可以看到requestAnimationFrame是一个与硬件相关的方法，该方法与监视器刷新频率一致。1000/60 ≈ 16.666666
 */ 
