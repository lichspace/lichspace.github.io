# Zhang-Suen 图像骨架提取算法
##js opencv实现
```
import { debugImg } from "../opencv/debugImg.js";

const getVal = (x, y, mat) => mat.ucharPtr(y, x)[0];

export const skeletonization = (src) => {
  let gray = new cv.Mat();
  let binary = new cv.Mat();

  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(gray, binary, 254, 255, cv.THRESH_BINARY);

  let skel = binary;
  console.log(binary);

  debugImg(binary);

  while (true) {
    const toWhite = [];
    step1(skel, (x, y) => { toWhite.push({ x, y }) });
    step2(skel, (x, y) => { toWhite.push({ x, y }) });
    if (toWhite.length === 0) break;

    toWhite.forEach(({ x, y }, index) => {
      skel.ucharPtr(y, x)[0] = 255;
    });

    console.log('loop', toWhite.length);
  }

  debugImg(skel);

  return skel;
}

const black = 0;
const white = 255;
const neighbors = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];

function step1(src, cb) {
  let rows = src.rows;
  let cols = src.cols;
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      if (getVal(x, y, src) === 0) {
        // get p2, p3, p4, p5, p6, p7, p8, p9
        const around = neighbors.map(([offx, offy]) => getVal(x + offx, y + offy, src));
        const [p2, p3, p4, p5, p6, p7, p8, p9] = around;
        const blackP1 = around.filter(v => v === 0).length;
        const ap1 = around.reduce((acc, cur, index, arr) => {
          const pre = index === 0 ? p2 : arr[index - 1];
          if (pre > 0 && cur === 0) {
            acc = acc + 1;
          }
          return acc;
        }, 0);

        // At least one of P2 and P4 and P6 is white
        // At least one of P4 and P6 and P8 is white
        const oneWhite = p2 + p4 + p6 > 0 && p4 + p6 + p8 > 0;

        if (ap1 == 1 && (blackP1 >= 2 && blackP1 <= 3) && oneWhite) {
          // console.log(around, ap1, blackP1, oneWhite);
          cb(x, y);
        }
      }
    }
  }
}

function step2(src, cb) {
  let rows = src.rows;
  let cols = src.cols;
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 1; x < cols - 1; x++) {
      if (getVal(x, y, src) === 0) {
        // get p2, p3, p4, p5, p6, p7, p8, p9
        const around = neighbors.map(([offx, offy]) => getVal(x + offx, y + offy, src));
        const [p2, p3, p4, p5, p6, p7, p8, p9] = around;
        const blackP1 = around.filter(v => v === 0).length;
        const ap1 = around.reduce((acc, cur, index, arr) => {
          const pre = index === 0 ? p2 : arr[index - 1];
          if (pre > 0 && cur === 0) {
            acc = acc + 1;
          }
          return acc;
        }, 0);

        const oneWhite = p2 + p4 + p8 > 0 && p2 + p6 + p8 > 0

        if (ap1 == 1 && (blackP1 >= 2 && blackP1 <= 6) && oneWhite) {
          cb(x, y);
        }
      }
    }
  }
}


```
## 资源
rust [Zhang-Suen 图像骨架提取算法](https://github.com/okaneco/skeletonize/tree/master)
nodejs https://github.com/olivierlando/zhang-suen
