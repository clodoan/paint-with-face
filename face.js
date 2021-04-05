let video;
let faceapi;
let detections = [];
t = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    noStroke();
    video = createCapture(VIDEO);
    video.size(width,height);
    colorMode(HSB, 80);

    const detectionOptions = {
        withLandmarks: true,
        withExpressions: false,
        withDescriptors: false,
    };
    video.hide();
    faceapi = ml5.faceApi(video, detectionOptions, modelReady);
}

function draw() {
    // background(255,255,255);
  // Just look at the first face and draw all the points
  if (detections.length > 0) {
      let nosePoint = detections[0].parts.nose[5];
      let mouthTop = detections[0].parts.mouth[4];
      let mouthBottom = detections[0].parts.mouth[8];

      noFill()
      stroke((mouthTop.y/video.height)* 100, (mouthBottom._y/video.height) * 80, noise(t/2)*500)
      let d = dist(mouthTop._x,mouthTop._y, mouthBottom._x, mouthBottom._y) * 10;
      ellipse((mouthTop._x/video.width) * windowWidth, (mouthBottom._y/video.height)*windowHeight, d);

    //   drawCircle(nosePoint);  
    t = t + 0.1;
  }
}


function drawCircle(nosePoint) {
    let r = (nosePoint._x/video.width) * 100;
    let g = (nosePoint.y/video.height) * 255;
    let b = (nosePoint.x/video.width) * 180;
    fill(r, g, b);
    // console.log(r,g,b);
    ellipse(nosePoint._x, nosePoint._y, 100);
}


function modelReady() {
    faceapi.detect(gotResults)
};


function gotResults(error, result) {
    if (error) {
        console.log(error);
        return
    }
    detections = result;
    faceapi.detect(gotResults);
}
