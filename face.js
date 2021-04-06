let video;
let faceapi;
let detections = [];
let cw = 1200;
let ch = 800;
t = 0;

function setup(){
    var myCanvas = createCanvas(cw,ch);
    myCanvas.parent("container");

    colorMode(HSB, 80);

    video = createCapture(VIDEO);
    video.size(width,height);

    const detectionOptions = {
        withLandmarks: true,
        withExpressions: false,
        withDescriptors: false,
    };

    video.hide();
    faceapi = ml5.faceApi(video, detectionOptions, modelReady);
}

function draw() {
    // noLoop()
    noFill()

  if (detections.length > 0) {
      // get face points
      let mouthTop = detections[0].parts.mouth[4];
      let mouthBottom = detections[0].parts.mouth[8];
      let leftEyeBrow = detections[0].parts.leftEyeBrow[2];
      let rightEyeBrow = detections[0].parts.rightEyeBrow[2];
      let uniBrow = [(leftEyeBrow._x + rightEyeBrow.x)/2, (leftEyeBrow._y + rightEyeBrow.y)/2];
      
    //   calculate distance between brows and mouth
    // let dBrowsMouth = dist(uniBrow[0], uniBrow[1], mouthBottom._x, mouthBottom._y);
    // console.log(dBrowsMouth);

    // define color 
      let h = (uniBrow[0]/video.height) * 100;
      let s = (uniBrow[1]/video.height) * 80;
      let b = noise(t/2) * 500;

      stroke(h, s, b);

      //calculate distance between lips
      let dOpen = dist(mouthTop._x,mouthTop._y, mouthBottom._x, mouthBottom._y) * 10;

      //draw the ellipse
      let unmirrowedX = cw - uniBrow[0];
      ellipse((unmirrowedX/video.width) * cw, (mouthBottom._y/video.width) * ch, dOpen);

    t = t + 0.1;
  }
//   mouseClicked();
}


// function drawCircle(nosePoint) {
//     let r = (nosePoint._x/video.width) * 100;
//     let g = (nosePoint.y/video.height) * 255;
//     let b = (nosePoint.x/video.width) * 180;
//     fill(r, g, b);
//     // console.log(r,g,b);
//     ellipse(nosePoint._x, nosePoint._y, 100);
// }


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

function mousePressed() {
    console.log('stopped');
    noLoop();
}