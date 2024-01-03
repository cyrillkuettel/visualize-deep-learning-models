let cat;
let catX = 0;
let speed = 10; // Increased speed
let startTime;
let stationaryTime = 500;
let main_model;
let classifier1;
let classifier2;
let arrowDown;
let arrowUp;

let imageHasArrived = false;

function setup() {
    createCanvas(3651, 2000);
    main_model = loadImage('d_main_model_png.png');
    classifier1 = loadImage('d_classifier2.png');
    classifier2 = loadImage('2_classifier.png');
    arrowDown = loadImage('arrow_down.svg');
    arrowUp = loadImage('arrow_arrow.svg');
    cat = loadImage('object.png');
    startTime = millis();
}

function draw() {
    background(255);

    if (millis() - startTime > stationaryTime) {
        if (catX < main_model.width) {
            catX += speed;
        } else {
            imageHasArrived = true;
            console.log('catX: ' + catX); // Corrected console log text
        }
    }

    image(main_model, 220, 500);
    image(classifier1, 1600, 0);
    image(classifier2, 1600, 1000);

    image(cat, catX, 450);
    if (imageHasArrived) {
        image(arrowDown, main_model.width+ 140, 850);
    }
}
