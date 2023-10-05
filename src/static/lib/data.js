import { SECS, FPS } from './CONSTANTS.js'

async function getFrames(path, secs = SECS, fps = FPS) {
    // Create a VideoCapture object
    const video = new cv.VideoCapture();
    await video.openVideo(path);
  
    // Calculate the total number of frames to read
    const totalFrames = secs * fps;
  
    // Initialize an array to store frames
    const frames = new Array(totalFrames);
  
    // Initialize variables for frame and video indices
    let framesIndex = 0;
    let videoIndex = 0;
  
    // Calculate the frame stepping based on video's original FPS and target FPS
    const stepper = Math.floor(video.get(cv.CAP_PROP_FPS) / fps);
  
    // Loop to read frames
    while (framesIndex < totalFrames) {
        video.set(cv.CAP_PROP_POS_FRAMES, videoIndex);
        const frame = new cv.Mat();
        const success = video.read(frame);

        if (!success) {
            break;
        }

        cv.cvtColor(frame, frame, cv.COLOR_BGR2GRAY);
        frames[framesIndex] = frame.clone();
        frame.delete();

        videoIndex += stepper;
        framesIndex += 1;
    }
  
    video.delete();
    
    // Convert frames to a single 4D tensor
    const frameShape = new cv.Size(frames[0].cols, frames[0].rows);
    const frameCount = frames.length;
    const channels = 1; // Grayscale image
    const depth = cv.CV_8U;
    const frameData = new Uint8Array(frameCount * frameShape.height * frameShape.width * channels);
  
    for (let i = 0; i < frameCount; i++) {
        const frame = frames[i];
        const view = new Uint8Array(frame.data);
        frameData.set(view, i * frameShape.height * frameShape.width * channels);
        frame.delete();
    }
  
    const framesMat = new cv.Mat(frameCount, frameShape.height * frameShape.width * channels, depth);
    framesMat.data.set(frameData);
  
    return framesMat;
}

export {
    getFrames
}