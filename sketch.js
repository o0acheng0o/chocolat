let ball = {
  x: 50,
  y: 50,
  size: 20
};

let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(400, 400);
 

  serial = new p5.SerialPort();
 
  serial.list();
  serial.open('COM5');
 
  serial.on('connected', serverConnected);
  serial.on('data', gotData);
  serial.on('error', gotError);
}

function draw() {
  background(220);
 

  ball.x += latestData.x;
  ball.y -= latestData.y;


  ball.x = constrain(ball.x, 0, width);
  ball.y = constrain(ball.y, 0, height);
 

  ball.size = constrain(ball.size * latestData.z, 10, 40);
 

  ellipse(ball.x, ball.y, ball.size);
}


function serverConnected() {
  print("Connected to Server");
}


function gotData() {
  let currentString = serial.readLine();
  trim(currentString);                  
  if (!currentString) return;            
  latestData = JSON.parse(currentString);
}


function gotError(theError) {
  print(theError);
}
