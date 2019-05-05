const fs            = require("fs");
const path          = require("path");
const bufferEqual   = require("buffer-equal");
const createCollage = require("../index");
const tap = require("tap")

// Test a variety of source types - file name, buffer, uri.
const sources = [
  path.resolve(__dirname, "../img/src1.jpg"),
  path.resolve(__dirname, "../img/src2.jpg"),
  path.resolve(__dirname, "../img/src3.jpg"),
  fs.readFileSync("img/src4.jpg")
]

tap.test("calculates width and height according to aspect ratio", t => {
    let rect = {width: 20, height: 50}
    const aspectRatio = rect.width/rect.height
    const square = {width: rect.width, height: rect.height * aspectRatio}
    const y = (rect.height - square.height)/2
    console.log(rect, square, y)
    t.equal("50", aspectRatio)
    t.end()
});

