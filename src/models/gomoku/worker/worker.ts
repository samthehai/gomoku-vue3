/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
import registerPromiseWorker from 'promise-worker/register';

class MapPoint {
  r: number;

  c: number;

  set: any;

  score: any;

  valid: boolean;

  info: number[][];

  constructor(r: number, c: number) {
    this.r = r;
    this.c = c;
    this.set = false;
    this.score = 0;
    this.valid = false;
    this.info = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }
}

class AI {
  sum: number = 0;

  setNum: number = 0;

  scoreMap: never[] = [];

  scorequeue: MapPoint[] = [];

  map: MapPoint[][] = [];

  boardBufArr: Uint8Array = new Uint8Array(new ArrayBuffer(255));

  color: string = 'X';

  opponentColor: string = 'O';

  depth: number = 3;

  totry: number[] = [];

  cache: { [key: string]: number } = {};

  moves = [
    [-1, -1],
    [-1, 0],
    [0, -1],
    [-1, 1],
  ];

  coe = [-2, 1];

  scores = [0, 1, 10, 2000, 4000, 100000000000];

  constructor() {
    this.clear();
  }

  clear() {
    this.sum = 0;
    this.setNum = 0;
    this.scoreMap = [];
    this.scorequeue = [];
    this.map = [];

    for (let i = 0; i < 15; i++) {
      const tmp = [];
      for (let j = 0; j < 15; j++) {
        const a = new MapPoint(i, j);
        tmp.push(a);
        this.scorequeue.push(a);
      }
      this.map.push(tmp);
    }

    this.boardBufArr = new Uint8Array(new ArrayBuffer(255));
  }

  ini(mode: string, color: string): boolean {
    this.clear();

    this.color = color;

    if (color === 'O') {
      this.opponentColor = 'X';
    } else {
      this.opponentColor = 'O';
    }

    switch (mode) {
      case 'novice':
        this.depth = 3;
        this.totry = [30, 30];
        break;
      case 'medium':
        this.depth = 5;
        this.totry = [12, 8];
        break;
      case 'expert':
        this.depth = 7;
        this.totry = [10, 10];
        break;
      default:
        return false;
    }

    return true;
  }

  watch(r: number, c: number, color: string): boolean {
    this.updateMap(r, c, color);
    if (color === 'remove') {
      this.setNum--;
    } else {
      this.setNum++;
    }
    this.scorequeue.sort(this.sortMove);
    return true;
  }

  updateMap(r: number, c: number, color: string) {
    let remove = false;
    let num;

    if (color === this.color) {
      num = 1;
    } else if (color === this.opponentColor) {
      num = 0;
    } else {
      remove = true;
      num = this.map[r][c].set - 1;
    }

    return this._updateMap(r, c, num, remove);
  }

  _updateMap(r: number, c: number, num: number, remove: boolean) {
    const { moves, coe, scores } = this;
    let i = 4;
    let x;
    let y;
    let step;
    let tmp;
    let xx;
    let yy;
    let cur;
    let changes = 0;
    let s;
    let e;
    if (!remove) {
      this.boardBufArr[r * 15 + c] = num + 2;
      this.map[r][c].set = num + 1;
      while (i--) {
        x = r;
        y = c;
        step = 5;
        while (step-- && x >= 0 && y >= 0 && y < 15) {
          xx = x - moves[i][0] * 4;
          yy = y - moves[i][1] * 4;
          if (xx >= 15 || yy < 0 || yy >= 15) {
            x += moves[i][0];
            y += moves[i][1];
            continue;
          }
          cur = this.map[x][y].info[i];
          if (cur[2] > 0) {
            tmp = 5;
            xx = x;
            yy = y;
            s = scores[cur[2]];
            changes -= s * cur[3];
            while (tmp--) {
              this.map[xx][yy].score -= s;
              xx -= moves[i][0];
              yy -= moves[i][1];
            }
          }
          cur[num]++;
          if (cur[1 - num] > 0) {
            cur[2] = 0;
          } else {
            cur[2] = cur[num];
            e = coe[num];
            cur[3] = e;
            s = scores[cur[2]];
            tmp = 5;
            xx = x;
            yy = y;
            changes += s * cur[3];
            while (tmp--) {
              this.map[xx][yy].score += s;
              xx -= moves[i][0];
              yy -= moves[i][1];
            }
          }
          x += moves[i][0];
          y += moves[i][1];
        }
      }
    } else {
      this.boardBufArr[r * 15 + c] = 0;
      this.map[r][c].set = false;
      while (i--) {
        x = r;
        y = c;
        step = 5;
        while (step-- && x >= 0 && y >= 0 && y < 15) {
          xx = x - moves[i][0] * 4;
          yy = y - moves[i][1] * 4;
          if (xx >= 15 || yy < 0 || yy >= 15) {
            x += moves[i][0];
            y += moves[i][1];
            continue;
          }
          cur = this.map[x][y].info[i];
          let sc = 0;
          cur[num]--;
          if (cur[2] > 0) {
            tmp = 5;
            xx = x;
            yy = y;
            s = scores[cur[2]];
            changes -= s * cur[3];
            while (tmp--) {
              this.map[xx][yy].score -= s;
              xx -= moves[i][0];
              yy -= moves[i][1];
            }
            cur[2]--;
            if (cur[num] > 0) sc = 1;
          } else if (cur[1 - num] > 0 && !cur[num]) {
            sc = -1;
          }
          if (sc === 1) {
            tmp = 5;
            s = scores[cur[2]];
            xx = x;
            yy = y;
            changes += s * cur[3];
            while (tmp--) {
              this.map[xx][yy].score += s;
              xx -= moves[i][0];
              yy -= moves[i][1];
            }
          } else if (sc === -1) {
            cur[2] = cur[1 - num];
            tmp = 5;
            s = scores[cur[2]];
            cur[3] = coe[1 - num];
            xx = x;
            yy = y;
            changes += s * cur[3];
            while (tmp--) {
              this.map[xx][yy].score += s;
              xx -= moves[i][0];
              yy -= moves[i][1];
            }
          }
          x += moves[i][0];
          y += moves[i][1];
        }
      }
    }
    this.sum += changes;
  }

  simulate(x: number, y: number, num: number) {
    this.setNum++;
    this._updateMap(x, y, num, false);
  }

  desimulate(x: number, y: number, num: number) {
    this._updateMap(x, y, num, true);
    this.setNum--;
  }

  // eslint-disable-next-line class-methods-use-this
  sortMove(a: MapPoint, b: MapPoint): number {
    if (a.set) {
      return 1;
    }

    if (b.set) {
      return -1;
    }

    if (a.score < b.score) {
      return 1;
    }

    return -1;
  }

  bufToString() {
    return String.fromCharCode.apply(null, (this.boardBufArr as unknown) as number[]);
  }

  nega(x: number, y: number, depth: number, alpha: number, beta: number): number {
    let i = 4;
    const num = depth % 2;
    this.simulate(x, y, num);
    let bufstr = this.bufToString();
    if (this.cache[bufstr]) {
      return this.cache[bufstr];
    }
    if (Math.abs(this.sum) >= 10000000) return -1 / 0;
    if (this.setNum === 225) {
      return 0;
    }
    if (depth === 0) {
      return this.sum;
    }
    this.scorequeue.sort(this.sortMove);
    i = this.totry[num];
    let tmp;
    const tmpqueue = [];
    let b = beta;
    while (i--) {
      tmp = this.scorequeue[i];
      if (tmp.set) continue;
      tmpqueue.push(tmp.c);
      tmpqueue.push(tmp.r);
    }
    depth -= 1;
    i = tmpqueue.length - 1;
    x = tmpqueue[i];
    y = tmpqueue[--i];
    let score = -this.nega(x, y, depth, -b, -alpha);
    this.desimulate(x, y, depth % 2);
    if (score > alpha) {
      bufstr = this.bufToString();
      this.cache[bufstr] = score;
      alpha = score;
    }
    if (alpha >= beta) {
      bufstr = this.bufToString();
      this.cache[bufstr] = beta;
      return alpha;
    }
    b = alpha + 1;
    while (i--) {
      x = tmpqueue[i];
      y = tmpqueue[--i];
      score = -this.nega(x, y, depth, -b, -alpha);
      this.desimulate(x, y, depth % 2);
      if (alpha < score && score < beta) {
        score = -this.nega(x, y, depth, -beta, -alpha);
        this.desimulate(x, y, depth % 2);
      }
      if (score > alpha) {
        alpha = score;
      }
      if (alpha >= beta) {
        return alpha;
      }
      b = alpha + 1;
    }
    return alpha;
  }

  move() {
    this.cache = {};
    let alpha = -1 / 0;
    const beta = 1 / 0;
    let bestmove = [this.scorequeue[0].r, this.scorequeue[0].c];
    let i = 20;
    let tmp;
    const tmpqueue = [];
    const { depth } = this;
    while (i--) {
      tmp = this.scorequeue[i];
      if (tmp.score.set) continue;
      tmpqueue.push(tmp.c);
      tmpqueue.push(tmp.r);
    }
    i = tmpqueue.length - 1;
    let x;
    let y;
    let b = beta;
    x = tmpqueue[i];
    y = tmpqueue[--i];
    let score = -this.nega(x, y, depth, -b, -alpha);
    this.desimulate(x, y, depth % 2);
    if (score > alpha) {
      alpha = score;
      bestmove = [x, y];
    }
    b = alpha + 1;
    while (i--) {
      x = tmpqueue[i];
      y = tmpqueue[--i];
      score = -this.nega(x, y, depth, -b, -alpha);
      this.desimulate(x, y, depth % 2);
      if (alpha < score && score < beta) {
        score = -this.nega(x, y, depth, -beta, -alpha);
        this.desimulate(x, y, depth % 2);
      }
      if (score > alpha) {
        alpha = score;
        bestmove = [x, y];
      }
      b = alpha + 1;
    }

    return {
      r: bestmove[0],
      c: bestmove[1],
    };
  }
}

const ai = new AI();

registerPromiseWorker((e: any): any => {
  if (e.type !== 'message') {
    return null;
  }

  switch (e.data.type) {
    case 'init':
      return ai.ini(e.data.mode, e.data.color);
    case 'watch':
      return ai.watch(e.data.r, e.data.c, e.data.color);
    case 'compute':
      return ai.move();
    default:
      break;
  }

  return null;
});
