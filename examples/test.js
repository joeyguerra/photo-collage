
const fs = require("fs")
const path = require("path")
const bufferEqual = require("buffer-equal")
const createCollage = require("../index")
const tap = require("tap")

// Test a variety of source types - file name, buffer, uri.
const sources = [
    path.resolve(__dirname, "../img/src1.jpg"),
    path.resolve(__dirname, "../img/src2.jpg"),
    path.resolve(__dirname, "../img/src3.jpg"),
    fs.readFileSync(path.resolve(__dirname, "../img/src4.jpg")),  
    "http://github.com/classdojo/photo-collage/blob/master/img/src5.jpg?raw=true",
    "https://github.com/classdojo/photo-collage/blob/master/img/src6.jpg?raw=true",
]

tap.test("2x3 collage with no spacing matches reference", t => {
  const options = {
    sources: sources,
    width: 3,
    height: 2,
    imageWidth: 350,
    imageHeight: 250,
  };

  createCollage(options)
    .then((canvas) => {
      return canvas.toBuffer()
    })
    .then((buffer) => {
      fs.writeFileSync(path.resolve(__dirname, "./test1.png"), buffer)

      const expected = fs.readFileSync(path.resolve(__dirname, "../img/result_no_spacing.png"))
      t.ok(bufferEqual(buffer, expected))
      t.end()
    })
})

tap.test("2x3 collage with spacing matches reference", t => {
  const options = {
    sources: sources,
    width: 3,
    height: 2,
    imageWidth: 350,
    imageHeight: 250,
    backgroundColor: "#f00",
    spacing: 2,
  }

  createCollage(options)
    .then((canvas) => {
      return canvas.toBuffer()
    })
    .then((buffer) => {
      fs.writeFileSync(path.resolve(__dirname, "./test2.png"), buffer)
      t.ok(bufferEqual(buffer, fs.readFileSync(path.resolve(__dirname, "../img/result_with_spacing.png"))))
      t.end()
    })


    tap.test("Square image size should crop the image", t => {
      const options = {
        sources: sources,
        width: 3,
        height: 2,
        imageWidth: 400,
        imageHeight: 400,
      };
    
      createCollage(options)
        .then((canvas) => {
          return canvas.toBuffer()
        })
        .then((buffer) => {
          fs.writeFileSync(path.resolve(__dirname, "./test3.png"), buffer)
    
          const expected = fs.readFileSync(path.resolve(__dirname, "../img/result_cropped.png"))
          t.ok(bufferEqual(buffer, expected))
          t.end()
        })
    })

    
})