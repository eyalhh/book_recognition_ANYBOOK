const tf = require("@tensorflow/tfjs-node");
const cocoSsd = require("@tensorflow-models/coco-ssd");
const fs = require("fs");


async function detectObj(imagePath) {
    const model = await cocoSsd.load();

    const image = tf.node.decodeImage(await fs.promises.readFile(imagePath));

    const predictions = await model.detect(image);

    const classes = predictions.map(pred => pred.class);
    console.log("Detected objects:", classes);

    image.dispose();
}

const path = "/home/eyal/Downloads/book.jpg";
detectObj(path);
