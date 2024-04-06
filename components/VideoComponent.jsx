import React, {useContext, useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { DataStore } from '../utils/DataStore';
function VideoComponent() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const { state } = useContext(DataStore);
  const { userInfo } = state;
  useEffect(() => {
    async function startWebcam() {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/training-models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/training-models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/training-models');

      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          setIsLoaded(true);
        })
        .catch((error) => console.error(error));
    }

    startWebcam();
  }, []);

  useEffect(() => {
    if (isLoaded & userInfo) {
      startFaceDetection();
    }
  }, [isLoaded]);

  async function startFaceDetection() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const labeledFaceDescriptors = await getLabeledFaceDescriptions();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      resizedDetections.forEach((detection) => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        const box = detection.detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
        drawBox.draw(canvas);
      });
    }, 100);
  }

  async function getLabeledFaceDescriptions() {
    const labels = ['Chirag', 'Vasu'];
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`./labels/${label}/${i}.jpeg`);
          const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }

  return (
    <div className="main">
      <video ref={videoRef} width="600" height="450" autoPlay muted></video>
      <canvas className='main-canvas' ref={canvasRef} width="600" height="450"></canvas>
    </div>
  );
}

export default VideoComponent;
