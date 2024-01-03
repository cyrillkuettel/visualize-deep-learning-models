// Existing variables
let cat1;
let cat1X = 0;
let cat1Y = 450;
let cat2Y = 450;
let cat2X = -200;

let globalSpeedFactor = 1;
let speed = 10 * globalSpeedFactor;
let arrowSpeed = 15;
let arrowShowTime = 15 * arrowSpeed; // Time for each arrow to be shown
let isPaused = false;
let startTime;
let stationaryTime = 500;
let main_model;
let classifier1;
let classifier2;
let arrowDown;
let arrowUp;
let countWhenImageSoonArrives = 0;
let imageCat1HasArrived = false;
let imageCat2HasArrived = false;
let adx;
let ady;
let aux;
let auy;
let startSecondCat = false;


function setup() {
   // frameRate(30);
    createCanvas(3651, 2000);
    main_model = loadImage('d_main_model_png.png');
    classifier1 = loadImage('d_classifier2.png');
    classifier2 = loadImage('2_classifier.png');
    arrowDown = loadImage('arrow_down.svg');
    arrowUp = loadImage('arrow_up.svg');
    cat1 = loadImage('object.png');
    cat2 = loadImage('object.png'); // Assuming cat2 uses the same image as cat1
    startTime = millis();
    adx = 1300 + main_model.width;
    ady = 850;
    aux = 1400 + main_model.width;
    auy = 100;

}

let shouldStartOscialate = false;

function printDebug() {
    return;
    // Display text variables
    fill(0);
    textSize(40);
    const displayTexts = [
        `Cat X Position: ${cat1X}`,
        `Cat Y Position: ${cat1Y}`,
        `Image Arrived: ${imageCat1HasArrived}`,
        `Arrow Speed: ${arrowSpeed}`,
        `main_model.width: ${main_model.width}`,
    ];

    displayTexts.forEach((textItem, index) => {
        text(textItem, 50, 1200 + 50 * (index + 1));
    });
}


function draw() {

    background(255);

    tint(255, 255); // Reset to full opacity for the cat
    image(cat1, cat1X, cat1Y);
    if (startSecondCat) {
        image(cat2, cat2X, cat2Y);
    }

    tint(255, 194); // Set opacity to 80% for main_model, classifier1, and classifier2
    image(main_model, 220, 500);
    image(classifier1, 1600, 0);
    image(classifier2, 1600, 1000);
    tint(255, 255); // Reset to full opacity for the cat


    if (isPaused) {
        printDebug();
        return; // Stop the draw function if the application is paused
    }

    if (millis() - startTime < stationaryTime) {
        return;
    }


    if (!imageCat1HasArrived) {
        cat1X += speed;
        if (cat1X >= main_model.width) {
            imageCat1HasArrived = true;
            cat1X = main_model.width; // Start at the end of the main model
            cat1Y = 450; // Starting Y position for classifier1
        }
        if (cat1X >= 400) {
            shouldStartOscialate = true;
            countWhenImageSoonArrives += arrowSpeed;
        }
    } else {
        cat1X += speed; // Continue moving in X direction
        if (!(cat1X > main_model.width + classifier1.width) && cat1Y > 100) {
            cat1Y -= 20;
        } else {
            startSecondCat = true;
        }

        // Stop the cat at the end of the classifier1 image
        if (cat1X > main_model.width + classifier1.width + 300) {
            cat1X = main_model.width + classifier1.width + 300; // Stop at the end of classifier1
            // catY remains at its current value
        }
    }

    if (startSecondCat) {

        if (!imageCat2HasArrived) {
            cat2X += speed;
            if (cat2X >= main_model.width) {
                imageCat2HasArrived = true;
                cat2X = main_model.width; // Start at the end of the main model
            }
            if (cat2X >= 400) {
                shouldStartOscialate = true;
                countWhenImageSoonArrives += arrowSpeed;
            }
        } else {
            cat2X += speed; // Continue moving in X direction
            if (!(cat2X > main_model.width + classifier1.width) && cat2Y < 1000) {
                cat2Y += 20;
            }

            // Stop the cat at the end of the classifier1 image
            if (cat2X > main_model.width + classifier1.width + 100) {
                cat2X = main_model.width + classifier1.width + 100; // Stop at the end of classifier2

            }
        }
    }

    // Alternate arrows
   if (cat2X < main_model.width + 300) {
       if (shouldStartOscialate) {
           if (countWhenImageSoonArrives % (2 * arrowShowTime) < arrowShowTime) {
               image(arrowDown, adx, ady);
           } else {
               image(arrowUp, aux, auy);
           }
       }
   }

    printDebug();
}
