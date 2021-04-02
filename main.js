let mobilenet;
let tomato;

const loadModelDone = () => {
    console.log('Loaded Done.')
    mobilenet.predict(tomato, gotResult)
}

const gotResult = (error, data) => {
    if( error ){
        console.error( error )
    }else{
        console.log(data)
    }
}

function setup() {
    createCanvas(400, 400);
    tomato = createImg('./training/tomato.jpg', imageReader)
    tomato.hide()
    background(0)

    mobilenet = ml5.imageClassifier('MobileNet', loadModelDone)
}

function draw() {
}

const imageReader = () => {
    image(tomato, 0, 0, width, height)
}