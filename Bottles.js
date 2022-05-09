img="";
Status = "";
objects = [];

function preload(){
    img = loadImage("bottles.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.position(450, 250);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized");
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(Status != "") {
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width + 300, objects[i].height + 180);
        }
        document.getElementById("objects_detected").innerHTML = "There is 1 big object of which cocossd has detected 0 big object";
    }0}