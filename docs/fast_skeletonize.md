# 骨架提取 
js版 skimage.morphology.skeletonize

## 代码
```js

const getVal = (y, x, mat) => mat.ucharPtr(y, x)[0];
const lut = [0, 0, 0, 1, 0, 0, 1, 3, 0, 0, 3, 1, 1, 0,
  1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0,
  3, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  2, 0, 0, 0, 3, 0, 2, 2, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0,
  0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0,
  3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0,
  2, 0, 0, 0, 3, 1, 0, 0, 1, 3, 0, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 1, 3,
  0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  2, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 3, 3, 0, 1, 0, 0, 0, 0, 2, 2, 0, 0,
  2, 0, 0, 0];
const neighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

class BackgroundSet {
  data = new Map();

  add(x, y) {
    this.data.set(x + ',' + y, 1);
  }

  has(x, y) {
    return this.data.has(x + ',' + y);
  }
}


export const fast_skeletonize = (binary) => {
  const { rows, cols } = binary;
  const background = new BackgroundSet();
  const rect = cv.boundingRect(binary);
  console.log(rect);

  let pixel_removed = true;
  while (pixel_removed) {
    pixel_removed = false;
    const removeList = [];
    for (let step = 0; step < 2; step++) {
      const first_pass = step === 0;
      for (let y = rect.y; y < rect.y + rect.height - 1; y++) {
        for (let x = rect.x; x < rect.x + rect.width - 1; x++) {

          if (background.has(x, y)) continue;

          if (getVal(y, x, binary)) {
            const around = neighbors.map(([offy, offx]) => getVal(y + offy, x + offx, binary) / 255);
            let neighbval = lut[around[0] + 2 * around[1] + 4 * around[2] + 8 * around[3] + 16 * around[4] + 32 * around[5] + 64 * around[6] + 128 * around[7]];

            if (neighbval == 0) {
              continue;
            } else if ((neighbval == 3) || (neighbval == 1 && first_pass) || (neighbval == 2 && !first_pass)) {
              // Remove the pixel
              removeList.push({ x, y });
              pixel_removed = true;
            }
          } else {
            background.add(x, y);
          }
        }
      }

      removeList.forEach(({ x, y }) => {
        binary.ucharPtr(y, x)[0] = 0;
      });

      console.log(removeList.length);
    }
  }
}

```
