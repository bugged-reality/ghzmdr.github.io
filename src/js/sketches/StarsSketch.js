export default class StarsSketch {

    constructor() {
        this.maxStars = 100;
        this.colors = ['#ffd2d2', '#d2ffd2', '#d2d2ff'];
        this.generateStar = this.generateStar.bind(this);
        this.generateStars();
        this.W = window.innerWidth;
        this.H = window.innerHeight;
    }

    generateStars() {
        this.stars = [];
        for (let i = 0; i < this.maxStars; ++i) {
            let s = Math.random()
            TweenMax.delayedCall(s, this.generateStar.bind(this, i));
        }
    }

    generateStar() {
        this.stars.push({
            x: ~~(Math.random() * 1024),
            y: ~~(Math.random() * 1024),
            size: 0,
            maxSize: Math.random() * 1 + 1,
            color: this.colors[~~(Math.random() * this.colors.length)]
        })

        const index = this.stars.length - 1;
        TweenMax.delayedCall(Math.random() * 5 + 5, () => {
            this.killStar(index)
                .then(() => {
                    this.stars[index] = null
                    this.generateStar()
                })
        });
    }

    killStar(index) {
        return new Promise(res => {
            TweenMax.to(this.stars[index], 0.5, {size: 0, onComplete: res})
        })
    }


    step() {
        for (let i = 0; i < this.stars.length; ++i)  {
            if (this.stars[i] && this.stars[i].size < this.stars[i].maxSize) {
                this.stars[i].size += 0.01
            }
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, this.W, this.H);
        ctx.fillStyle = '#2b2bda';
        ctx.fillRect(0, 0, this.W, this.H);
        for (let i = 0; i < this.stars.length; ++i) {
            if (this.stars[i]) this.drawStar(this.stars[i], ctx)
        }
    }

    resize() {
        this.W = window.innerWidth;
        this.H = window.innerHeight;
    }

    drawStar(star, ctx) {
        ctx.fillStyle = ctx.shadowColor = star.color;
        ctx.shadowBlur = Math.random() * 4 + 1;
        ctx.shadow
        ctx.beginPath();
        const x = ~~(star.x / 1024 * this.W)
        const y = ~~(star.y / 1024 * this.H)
        ctx.arc(x, y, star.size, 0, 2 * Math.PI)
        ctx.fill();
    }

}
