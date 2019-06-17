
/**
 * 编写一个Canvas2D类导出给main.ts调用
 */
export class Canvas2D {

    // 声明public级别的成员变量
    // 由于canvas.getContext('2d')返回值可能为null，所以这里设置了一个null
    public context: CanvasRenderingContext2D | null;
    
    // 构造函数
    public constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
    }

    // 声明一个绘图函数
    public drawText(text: string): void {

        /**
         * Canvas2D和webGL这种底层绘图API都是状态机模式，
         * 每次绘图前通过save()记录原始状态记录下来，每次绘制后调用restore将已修改状态丢弃，恢复初始化状态
         * 假设当前绘制文本使用红色，如果你没有使用save/restore匹配函数，则下次调用其他绘图函数时，如果你没有更改颜色，则还是继续使用
         * 上次设置的红色来绘制，随着程序的复杂度提高，最后整个渲染状态会极其混乱。
         */

        // 由于context的值有可能为null，在调用下面的代码之前需要先做null值检查
        if (this.context !== null) {

            // 使用save/restore来管理渲染状态
            this.context.save();

            // 让绘制文本居中对齐
            this.context.textBaseline = "middle";
            this.context.textAlign = "center";

            // 计算canvas中心坐标
            let centerX = this.context.canvas.width * .5;
            let centerY = this.context.canvas.height * .5;

            // 红色填充
            this.context.fillStyle = "red";

            // 调用文本填充命令
            this.context.fillText(text, centerX, centerY);

            // 绿色描边
            this.context.strokeStyle = "green";

            // 调用描边命令
            this.context.strokeText(text, centerX, centerY);

            // 将上面context中的textAlign\textBaseline\fillStyle\strokeStyle状态恢复到初始化状态
            this.context.restore();

        }
    }

}