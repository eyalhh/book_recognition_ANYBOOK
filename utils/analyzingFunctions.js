const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const { createCanvas, loadImage } = require('canvas');
const { fileURLToPath } = require('url');  // To convert path to URL

// Path to model yolov8
const pathToModel = path.join(__dirname, "../../yolov8n_web_model/model.json");

// Convert local path to file URL
const modelUrl = `file://${pathToModel}`;

console.log('Model URL:', modelUrl);  // Log the model URL for debugging

async function detectObjects(imagePath) {
    // Load the image using the canvas library
    const image = await loadImage(imagePath);
    
    // Create a canvas and draw the image onto the canvas
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    try {
        // Load the pre-trained YOLOv8 model using file URL
        const model = await tf.loadGraphModel(modelUrl);

        // Perform object detection on the image
        const inputTensor = tf.node.decodeImage(canvas.toBuffer());
        const predictions = await model.executeAsync(inputTensor);

        console.log('Predictions:', predictions);

        // Optionally, you can draw bounding boxes on the image
        predictions[0].forEach(prediction => {
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
    } catch (error) {
        console.error('Error loading or running model:', error);
    }
}

module.exports = detectObjects;
