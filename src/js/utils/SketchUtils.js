class Vector {
    constructor(x, y) {
        if (arguments[0] instanceof Vector) {
            this.x = arguments[0].x;
            this.y = arguments[0].y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    dist(vector) {
        return vector
                .copy()
                .sub(this)
                .mag();

    }

    sub(vector) {
        const {x, y} = vector;
        this.x -= x;
        this.y -= y;
        return this;
    }

    mag() {
        return Math.sqrt(this.magSq());
    }

    magSq() {
        const {x, y} = this;
        return x * x + y * y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    static mag(vector) {
        const {x, y} = vector;
        const magSq = x * x + y * y;
        return Math.sqrt(mag);
    }
}

function map(val, start1, stop1, start2, stop2) {
  return (val - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}


export default {
    Vector,
    map
}
