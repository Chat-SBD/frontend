import { FRAMES, SIZE, FPS } from './CONSTANTS.js'

const canvas = document.getElementById('frame-hidden')
const context = canvas.getContext('2d')

// this takes a <video> element
async function modify(video) {
    const width = video.videoWidth
    const height = video.videoWidth
    frames = []
    video.play()
    crop(video, frames, context)
    console.log(frames)
}

function crop(video, frames, context) {
    if (frames.length == FRAMES) {
        return
    }
    console.log(video)
    context.drawImage(video, 0, 0, SIZE, SIZE)
    frames.push('placeholder')
    // load cropped and downscaled frames into []
    // advance the counter
    video.currentTime += 1 / FPS
    requestAnimationFrame(() => { crop(video, frames, context) })
}
/*
document.addEventListener('DOMContentLoaded', function () {
    const videoElement = document.getElementById('videoElement');
    const canvasElement = document.getElementById('canvasElement');
    const processButton = document.getElementById('processButton');

    // Set up the canvas context
    const ctx = canvasElement.getContext('2d');

    // Add event listener to load the video
    videoElement.addEventListener('loadedmetadata', () => {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
    });

    // Function to process the frame
    processButton.addEventListener('click', () => {
        // Ensure the video is paused
        if (!videoElement.paused) {
            videoElement.pause();
        }

        // Draw the current video frame onto the canvas
        ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        // Crop and downscale the frame (adjust dimensions as needed)
        const cropX = 50;
        const cropY = 50;
        const cropWidth = 200;
        const cropHeight = 200;
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.drawImage(videoElement, cropX, cropY, cropWidth, cropHeight, 0, 0, canvasElement.width, canvasElement.height);

        // Get the modified frame as an RGB array
        const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const pixelData = imageData.data;

        // Process the pixel data (e.g., access individual RGB values)
        for (let i = 0; i < pixelData.length; i += 4) {
            const red = pixelData[i];
            const green = pixelData[i + 1];
            const blue = pixelData[i + 2];
            // You can access and manipulate individual RGB values here
        }
    });

    // Set the video source (replace with your video file)
    videoElement.src = 'your-video.mp4';
});

*/
export {
    modify
}