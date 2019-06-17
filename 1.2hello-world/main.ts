
// export/import属于ES2015标准的内容，这里要配合<script type="module">运行
import { Canvas2D } from './canvas/Canvas2D';

// 调用Canvas2D类绘制居中对齐文字
let canvas: HTMLCanvasElement | null = document.getElementById('canvas') as HTMLCanvasElement;

if ( canvas === null ) {
    alert("无法获取 HTMLCanvasElement！！！");
    throw new Error("无法获取 HTMLCanvasElement！！！");
}

let canvas2d: Canvas2D = new Canvas2D(canvas);
canvas2d.drawText("Hello World from Module Canvas");