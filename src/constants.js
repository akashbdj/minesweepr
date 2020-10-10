// These configurations are taken from 
// http://minesweeperonline.com
export const PRE_DEFINED_GRIDS = {
    Beginner: { rows: 9, cols: 9, mines: 10 },
    Intermediate: { rows: 16, cols: 16, mines: 40 },
    Expert: { rows: 16, cols: 30, mines: 99 }
}

export const NEARBY_COORDIDATES = [
    [-1, -1], [-1, 0], [-1, 1], // above row
    [0, -1], [0, 1],           // same row
    [1, -1], [1, 0], [1, 1]    // below row
]

export const OPEN = 'OPEN'
export const FLAG = 'FLAG'