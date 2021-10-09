export default class HeartBeat {
    canvas;
    ctx;
    size = 150;
    constructor() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = ctx;

        // this.beat();
        requestAnimationFrame(this.small.bind(this));
        let rectX = 1;
        let rectY = 1;
        this.move(rectX, rectY);
        // setInterval(() => {
        //     rectX = rectY += 1;
        //     console.log(rectY, rectX)
   
        // }, 1000)
        
    }

    move(x, y) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(x, y, 10, 10);
    }

    beat() {
        // let size = 150;
        // let scale = 1;
        // setInterval(() => {
            this.clear();
            this.drawHeart(this.size, 1);
            // if (scale <= 1) {
            //     scale += 0.1;
            // } else {
            //     scale = 1;
            // }
            // if (this.size > 150) {
            //     this.size -= 50;    
            // } else {
            //     this.size += 50;    
            // }
            // requestAnimationFrame(this.beat.bind(this));
        // }, 200)
    }

    small() {
        this.beat();
        if (this.size > 140) {
            this.size -= 1;
            requestAnimationFrame(this.small.bind(this));
            return;
        } 
        requestAnimationFrame(this.big.bind(this));
    }

    big() {
        this.beat();
        if (this.size < 150) {
            this.size += 1;
            requestAnimationFrame(this.big.bind(this));
            return;
        } 
        requestAnimationFrame(this.small.bind(this));
    }

    clear() {
        this.ctx.clearRect(0,0,300, 300);
    }

    drawHeart(size, scale) {
        const x = 150;
        const y = size / 2;
        const height = size;
        const width = size;
        const ctx = this.ctx;
        
        // console.log(scale);
        // ctx.scale(scale,scale);
        ctx.beginPath();
        const downCurvePoint = height * 0.36;
        ctx.moveTo(x, y + downCurvePoint);
        // top left curve
        ctx.bezierCurveTo(
            x, y, 
            x - width / 2, y, 
            x - width / 2, y + downCurvePoint,
        );

        // bottom left curve
        ctx.bezierCurveTo(
            x - width / 2, y + (height + downCurvePoint) / 2, 
            x, y + height, 
            x, y + height
        );

        // bottom right curve
        ctx.bezierCurveTo(
            x, y + height, 
            x + width / 2, y + (height + downCurvePoint) / 2, 
            x + width / 2, y + downCurvePoint
        );

        // top right curve
        ctx.bezierCurveTo(
            x + width / 2, y, 
            x, y, 
            x, y + downCurvePoint
        );

        // ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
        // ctx.restore();  
        
    }
}