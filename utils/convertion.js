const Convertion = (xMax, yMax, x, y) => {
  let xToPercent = x / xMax * 100
  let yTopercent = y / yMax * 100

  return [xToPercent, yTopercent]
}

module.exports = { Convertion };
