const w : number = window.innerWidth, h : number = window.innerHeight
const DELAY : number = 50
const color : String = "#01579B"
const SIZE_FACTOR : number = 3
const RADIUS_FACTOR : number = 4
const STROKE_FACTOR : number = 60
const lines : number = 4
const circles : number = 4
const nodes : number = 4
const parts : number = 2

const getSCNumber : Function = (o : number, s : number, sc : number) : number => o + (s - o) * sc

class CircularPoint {
    x : number
    y : number
    constructor(r : number, deg : number) {
        this.x = r * Math.cos(deg)
        this.y = r * Math.sin(deg)
    }

    asCenterDrawArc(context : CanvasRenderingContext2D, r : number) {
        context.beginPath()
        context.arc(this.x, this.y, r, 0, 2 * Math.PI)
        context.stroke()
    }

    drawLineToPoint(context : CanvasRenderingContext2D, p : CircularPoint, sc : number) {
        const x = getSCNumber(this.x, p.x, sc), y : number = getSCNumber(this.y, p.y, sc)
        context.beginPath()
        context.moveTo(this.x, this.y)
        context.lineTo(x, y)
        context.stroke()
    }
}

const getInverse : Function = (n : number) : number => 1 / n

const divideScale : Function = (scale : number, i : number, n : number) : number => {
    return Math.min(getInverse(n), Math.max(0, scale - i * getInverse(n))) * n
}

const getScaleFactor : Function = (scale : number) : number => {
    return Math.floor(scale * getInverse(parts))
}

const updateScale : Function = (scale : number, dir : number, a : number, b : number) : number => {
    const sf = getScaleFactor(scale)
    return dir * (0.1 * getInverse(parts)) * ((1 - sf) * getInverse(a) + sf * getInverse(b))
}

const getCircularPointForIndex : Function = (i : number, deg : number, r : number) : CircularPoint => new CircularPoint(r, deg * i + deg/2)

const drawCTCSNode : Function = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const gap : number = w / (nodes + 1)
    const size : number = gap / SIZE_FACTOR
    context.strokeStyle = color
    context.lineCap = 'round'
    context.lineWidth = Math.min(w, h) / STROKE_FACTOR
    const lineDeg : number = 2 * Math.PI / lines
    const circleDeg : number = 2 * Math.PI / lines
    context.save()
    context.translate(gap * (i + 1), h / 2)
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    for (var j = 0; j < circles; j++) {
        const sc : number = divideScale(sc1, j, circles)
        const cp : CircularPoint = getCircularPointForIndex(j, circleDeg, size * sc)
        cp.asCenterDrawArc(context, size/RADIUS_FACTOR)
    }

    for(var j = 0; j < lines; j++) {
        const sc : number = divideScale(sc2, j, lines)
        const cp1 : CircularPoint = getCircularPointForIndex(j, lineDeg, size)
        const cp2 : CircularPoint = getCircularPointForIndex(j + 1, lineDeg, size)
        cp1.drawLineToPoint(context, cp2, sc)
    }
    context.restore()
}

class CircleToCornerSquareStage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = '#212121'
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : CircleToCornerSquareStage = new CircleToCornerSquareStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
