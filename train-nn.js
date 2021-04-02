let mobilenet;
let tagetLabel = 'C';
let state = 'collection'

// regression -> predict
// classification -> classify

let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification', //'regression'
    debug: 'true',
    //learningRate: 0.01
}

let trainingData = []

const loadModelDone = () => {

}

const modelLoaded = () => {
    
}

function setup() {
    createCanvas(400, 400);
    background(220)

    model = ml5.neuralNetwork(options ,dataLoaded)
    //model.loadData('testData.json')
    /*
    let files = {
        model: '',
        metadata: '',
        weights: ''
    }
    */
    //model.load(files, modelLoaded)
}

function draw() {
}


function keyPressed (){
    if(key == 't'){
        state = 'training';
        model.normalizeData()
        let options = {
            epochs: 200
        }
        model.train( options, whileTraining, finishedTraining)
    }else if(key == 's'){
        model.saveData('mouse-test-data')
    }else if(key == 'm'){
        model.saveData('mouse-model')
    }else{
        tagetLabel = key.toUpperCase();
    }
}

function mousePressed (){

    let inputs = {
        x: mouseX,
        y: mouseY
    }

    let target = {
        label: tagetLabel
    }

    if (state == 'collection') {
        model.addData(inputs, target)

        stroke(0)
        noFill()
        ellipse(mouseX, mouseY, 24)
        fill(0)
        noStroke()
        textAlign(CENTER, CENTER);
        text( tagetLabel, mouseX, mouseY);
    } else if (state == 'prediction') {
        model.classify(inputs, gotResults);
    }
}

//model.addData(inputs, target)
//model.train()
const dataLoaded = () => {
    console.log(model.data)
}

const whileTraining = (epoch, loss) => {
    console.log( epoch, loss )
}

const finishedTraining = () => {
    console.log('Done To training')
    state = 'prediction';
}

function gotResults(error, results) {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
    stroke(0);
    fill(0, 0, 255, 100);
    ellipse(mouseX, mouseY, 24);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    let label = results[0].label;
    text(label, mouseX, mouseY);
}