const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const { createCanvas, loadImage } = require('canvas');

// Path to your image file
const imagePath = "/home/eyal/Downloads/testHome3.jpg"

// Load the image and run object detection
async function detectObjects() {
    // Load the image using the canvas library
    const image = await loadImage(imagePath);
    
    // Create a canvas and draw the image onto the canvas
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    // Load the pre-trained COCO-SSD model
    const model = await cocoSsd.load();

    // Perform object detection on the image
    const predictions = await model.detect(canvas);

    console.log('Predictions:', predictions);

    // Optionally, you can draw bounding boxes on the image
    predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        context.beginPath();
        context.rect(x, y, width, height);
        context.lineWidth = 4;
        context.strokeStyle = 'red';
        context.fillStyle = 'red';
        context.stroke();
        context.fillText(`${prediction.class} (${(prediction.score * 100).toFixed(2)}%)`, x, y > 10 ? y - 5 : 10);
    });

    // Save the image with bounding boxes drawn
    const outPath = path.join(__dirname, 'output-image.jpg');
    const outStream = fs.createWriteStream(outPath);
    const stream = canvas.createJPEGStream();
    stream.pipe(outStream);

    outStream.on('finish', () => {
        console.log(`Output image saved to ${outPath}`);
    });
}

detectObjects();
