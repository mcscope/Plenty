var VARIANCE_FACTOR = 3;

export function gaussian() {
// defaults to between 0 and 1
  var rand = 0;

  for (var i = 0; i < VARIANCE_FACTOR; i += 1) {
    rand += Math.random();
  }

  return rand / VARIANCE_FACTOR;
}

export function gaussianRange(start, end) {
  return start + gaussian() * (end - start + 1);
}

