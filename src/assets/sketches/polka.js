export default function polkaSketch(p5) {

    return function (p) {
        var CIRCLE_W = 30
        var ACTUAL_W = CIRCLE_W*0.72
        var MIN_W = 0
        var CIRCLE_DIST = CIRCLE_W/2

        var COLS = innerWidth / CIRCLE_DIST +1
        var ROWS = innerHeight / CIRCLE_DIST +1
        var GREATER = Math.max(innerWidth, innerHeight)

        var dots = []
        var beacon = new p5.Vector(48, 48)

        var CANVAS

        function setDimensions() {
            COLS = innerWidth / CIRCLE_DIST +1
            ROWS = innerHeight / CIRCLE_DIST +1
            GREATER = Math.max(innerWidth, innerHeight)
            CANVAS.canvas.width = innerWidth
            CANVAS.canvas.height = innerHeight

            dots = []
            for (var ci = 0; ci < COLS; ++ci)
                for (var ri = 0; ri < ROWS; ++ri){
                    var dot = new Dot(ci * CIRCLE_DIST, ri * CIRCLE_DIST)
                          
                    dots.push(dot)
                }
        }

        p.setup = function () {         
            CANVAS = p.createCanvas(innerWidth, innerHeight)   
            p.frameRate(10)         
            setDimensions()
            p.noStroke()
            window.addEventListener('resize', setDimensions)            
        }

        p.draw = function () {            
            p.fill('#00BCD4')
            p.rect(0,0,innerWidth, innerHeight)

            p.fill('#424242')
            dots.forEach(function (dot) {        
                dot.render()
            })
        }

        var Dot = function (posX, posY) {
            this.position = new p5.Vector(posX, posY)
        }

        Dot.prototype = {
            render: function () {
                var w = this.calcWidth()
                p.ellipse(this.position.x, this.position.y, w, w)
            },

            calcWidth: function () {
                var delta = Math.max(p5.Vector.dist(beacon, this.position), 0)

                delta *= p.map(
                    p.noise(this.position.x, this.position.y, p.frameCount),
                    0, 1,
                    0.7, 1.2
                )

                if (delta > GREATER/2) {
                    delta = GREATER/2
                }

                return p.map(delta, 0, GREATER/2, ACTUAL_W, MIN_W)
            }
        }
    }
}
