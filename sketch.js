let video;
let poseNet;
let noseX = 0;
let noseY = 0;
t = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 80);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}

function draw() {
    // background(1);
    // image(video, 0, 0);
    noStroke();
    fill((noseX/width)*255,(noseY/height)*255, (noseX/800)*255)  
    ellipse((noseX/video.width)*windowWidth, (noseY/video.height)*windowHeight, 120);
    t ++;
}

function gotPoses(poses) {
    // console.log(poses);
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;    
}

function modelReady() {
    console.log('model ready');
}