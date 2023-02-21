//ryan leitenberger

(function() {
    class Primitive {
        constructor(params){
            this.params = params;
        }

        getArea() {
            return undefined;
        }
    }

    class ConvexPolygon extends Primitive {
        constructor(params){
            super(params);
        }

        getArea(){
            const pts = this.params.points;
            if (pts.length < 3){
                console.log("not enough points");
                return 0;
            }

            const tri = pts.length - 2;
            let area = 0;
            for (let i = tri; i >= 0; i--){
                const t = new Triangle({
                    points: [pts[0], pts[tri-2], pts[tri-1]]
                });
                area += t.getArea();
            }

            return Math.abs(area);
        }
    }

    class Quad extends Primitive {
        constructor(params){
            super(params);
        }

        getArea(){
            const pts = this.params.points;

            if (pts.length !== 4){
                console.log('wrong number of points');
                return 0;
            }

            const a = pts[0], b = pts[1], c = pts[2], d = pts[3];

            const tris = [
                new Triangle({
                    points: [a, b, c]
                }),
                new Triangle({
                    points: [a, c, d]
                }),
            ];

            return tris[0].getArea() + tris[1].getArea();
        }

    }

    class Triangle extends Primitive {
        constructor(params){
            super(params);
        }
        
        getArea(){
            const pts = this.params.points;

            if(pts.length !== 3){
                console.log('Wrong number of points');
                return 0;
            }

            const u = {
                x: pts[1].x - pts[0].x,
                y: pts[1].y - pts[0].y,
            }

            const v = {
                x: pts[2].x - pts[0].x,
                y: pts[2].y - pts[0].y,
            }

            return Math.abs(0.5 * (u.x * v.y - v.x * u.y));
        }
    }

    class Circle extends Primitive {
        constructor(params){
            super(params);
        }

        getArea(){
            const r = this.params.radius;
            const x = this.params.x;
            const y = this.params.y;

            if (r === undefined){
                console.log('no radius');
                return 0;
            }

            return Math.abs(Math.PI * r * r);
        }
    }

    const p = (x, y) => {
        return {
            x: x,
            y: y,
        };
    }


    const shapes = [new Triangle({
        points: [p(1, 1), p(1, 2), p(2, 1)]
    }), new Quad({
        points: [p(1, 1), p(1, 2), p(2, 1), p(2, 2)]
    }), new ConvexPolygon({
        points: [p(1, 1), p(1, 3), p(2, 2), p(3, 3), p(1, 3)]
    }), new Circle({
        radius: 5,
        x: 1,
        y: 1
    })];

    shapes.forEach(e => {
        console.log(`Area of ${e.constructor.name}:`, e.getArea());
    });

})();