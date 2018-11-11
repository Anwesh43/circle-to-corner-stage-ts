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
