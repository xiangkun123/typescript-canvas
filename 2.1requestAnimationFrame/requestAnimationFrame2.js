"use strict";
/**
    动画就是不间断地、基于时间的更新与重绘。
    不间断有两种方式：
    1、类似于while(true) {}之类的死循环，在window下的D3D、OpenGL开发中，经常使用这种模式来驱动动画不断运行；
    2、类似于定时器的回调，例如DOM中window对象的setTimeout\setInterval及requestAnimationFrame方法。
*/
// 用于记录第一次调用step2函数的时间点，用于计算与第一次调用step2函数的时间差，以毫秒为单位
var start2 = 0;
// lastTime2记录的是上一次调用step2函数的时间点，用于计算两帧之间的时间差，以毫秒为单位
var lastTime2 = 0;
// count2用于记录step2函数运行的次数
var count2 = 0;
/**
 * step2函数用于计算：
 * 1、用于计算当前时间点与HTML程序启动时的时间差： timestamp
 * 2、获取当前时间点与第一次调用step2时的时间差： elapsedMsec
 * 3、获取当前时间点与上一次调用step2是的时间差： intervalMsec
 * step2函数是作为requestAnimationFrame方法的回调函数使用的
 * 因此step2函数的签名必须是 { timestamp: number } => void
 */
function step2(timestamp) {
    // 第一次调用函数时，设置start2和lastTime2为timestamp
    if (!start2)
        start2 = timestamp;
    if (!lastTime2)
        lastTime2 = timestamp;
    // 计算当前时间点与第一次调用step2时间点的差
    var elapsedMsec = timestamp - start2;
    // 两帧之间的时间差
    var intervalMsec = timestamp - lastTime2;
    // 记录下上一次的时间戳
    lastTime2 = timestamp;
    // 计数器，用于记录step2函数被调用的次数
    count2++;
    // 每次调用step2做累加操作
    var sum = 0;
    // 进行耗时操作
    var num = 50000000 + Math.random() * 10000000;
    for (var i = 0; i < num; i++) {
        sum++;
    }
    console.log(" sum = " + sum);
    console.log(" " + count2 + " timestamp = " + timestamp);
    console.log(" " + count2 + " elapsedMsec = " + elapsedMsec);
    console.log(" " + count2 + " intervalMsec = " + intervalMsec);
    // 使用requestAnimationFrame启动step2
    window.requestAnimationFrame(step2);
}
// 使用requestAnimationFrame启动step2函数，step2中又会通过requestAnimationFrame回调step2函数，从而形成不间断递归调用，驱动动画运行
// window.requestAnimationFrame( step2 );
/**
 * 总结：
 * 这里我们在count++后添加了一个耗时的操作，查看输出结果：
 * 1、如果当前回调操作在16.66毫秒内能完成，那么requestAnimationFrame会等到16.66毫秒时调用下一次回调函数；
 * 2、如果当前回调操作超过16.66毫秒，则会以16.66毫秒的倍数为时间间隔进行调用下一次回调函数；
 */ 
