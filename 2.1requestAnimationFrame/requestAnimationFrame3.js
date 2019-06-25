"use strict";
/**
    动画就是不间断地、基于时间的更新与重绘。
    不间断有两种方式：
    1、类似于while(true) {}之类的死循环，在window下的D3D、OpenGL开发中，经常使用这种模式来驱动动画不断运行；
    2、类似于定时器的回调，例如DOM中window对象的setTimeout\setInterval及requestAnimationFrame方法。
*/
// 用于记录第一次调用step3函数的时间点，用于计算与第一次调用step3函数的时间差，以毫秒为单位
var start3 = 0;
// lastTime3记录的是上一次调用step3函数的时间点，用于计算两帧之间的时间差，以毫秒为单位
var lastTime3 = 0;
// count3用于记录step3函数运行的次数
var count3 = 0;
var posX = 0;
// 单位为秒，以每秒10个像素的速度位移
var speedX = 10;
function update(timestamp, elapsedMsec, intervalMsec) {
    // 毫秒转换为秒
    var t = intervalMsec / 1000.0;
    posX += speedX * t;
    console.log(" current posX: " + posX);
}
// 使用CanvasRenderingContext2D绘图上下文渲染对象进行物体的绘制
function render(ctx) {
    // 仅输出render字符串
    console.log(" render ");
}
/**
 * step3函数用于计算：
 * 1、用于计算当前时间点与HTML程序启动时的时间差： timestamp
 * 2、获取当前时间点与第一次调用step3时的时间差： elapsedMsec
 * 3、获取当前时间点与上一次调用step3是的时间差： intervalMsec
 * step3函数是作为requestAnimationFrame方法的回调函数使用的
 * 因此step3函数的签名必须是 { timestamp: number } => void
 */
function step3(timestamp) {
    // 第一次调用函数时，设置step3和lastTime3为timestamp
    if (!step3)
        start3 = timestamp;
    if (!lastTime3)
        lastTime3 = timestamp;
    // 计算当前时间点与第一次调用step3时间点的差
    var elapsedMsec = timestamp - start3;
    // 两帧之间的时间差
    var intervalMsec = timestamp - lastTime3;
    // 记录下上一次的时间戳
    lastTime3 = timestamp;
    // 进行基于时间的更新坐标
    update(timestamp, elapsedMsec, intervalMsec);
    // 调用渲染函数，渲染图形
    render(null);
    console.log(" " + count3 + " timestamp = " + timestamp);
    console.log(" " + count3 + " elapsedMsec = " + elapsedMsec);
    console.log(" " + count3 + " intervalMsec = " + intervalMsec);
    // 使用requestAnimationFrame启动step3
    window.requestAnimationFrame(step3);
}
// 使用requestAnimationFrame启动step3函数，step3中又会通过requestAnimationFrame回调step3函数，从而形成不间断递归调用，驱动动画运行
// window.requestAnimationFrame( step3 );
/**
 * 总结：
 * 这里我们在count++后添加了一个耗时的操作，查看输出结果：
 * 1、如果当前回调操作在16.66毫秒内能完成，那么requestAnimationFrame会等到16.66毫秒时调用下一次回调函数；
 * 2、如果当前回调操作超过16.66毫秒，则会以16.66毫秒的倍数为时间间隔进行调用下一次回调函数；
 */ 
