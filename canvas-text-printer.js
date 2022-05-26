// Copyright 2022, Gabriel Esteves Messas, All rights reserved.
// Reproduction is allowed, as long as the source is mentioned.

// Prints text in HTML Canvas element with line breaks and proportional size calculations

function setupAndPrintText(canvas, text, areaWidth, areaHeight, x, y) {
    let size = areaWidth / 7;
    canvas.textBaseline = 'middle';
    canvas.textAlign = 'center';
    canvas.fillStyle = '#ffffff';
    canvas.font = `${size}px Stag`;

    const lineHeight = size;
    const lines = text.split(' ');

    const imgHeight = areaHeight;

    // startY gets set to the text initial y here
    let startY = y;
    startY -= imgHeight / 2;
    startY += 0.7 * lineHeight;

    // finalY get set to the last line of text's Y
    let finalY = y + (imgHeight / 2) - (0.6 * lineHeight);

    const amountOfLines = lines.length - 1;
    let finalLineHeight = (finalY - startY) / amountOfLines;

    while (finalLineHeight < size) {
        size -= 0.01 * size;
        // startY gets set to the text initial y here
        startY = y;
        startY -= imgHeight / 2;
        startY += 0.7 * finalLineHeight;

        // finalY get set to the last line of text's Y
        finalY = y + (imgHeight / 2) - (0.6 * finalLineHeight);

        finalLineHeight = (finalY - startY) / amountOfLines;
        
    }
    while (finalLineHeight > size) {
        size += 0.01 * size;
        // startY gets set to the text initial y here
        startY = y;
        startY -= imgHeight / 2;
        startY += 0.7 * finalLineHeight;

        // finalY get set to the last line of text's Y
        finalY = y + (imgHeight / 2) - (0.6 * finalLineHeight);

        finalLineHeight = (finalY - startY) / amountOfLines;
    }

    canvas.font = `${size}px Stag`;

    // startY gets set to the text initial y here
    startY = y;
    startY -= imgHeight / 2;
    startY += 0.7 * finalLineHeight;

    // finalY get set to the last line of text's Y
    finalY = y + (imgHeight / 2) - (0.6 * finalLineHeight);

    finalLineHeight = (finalY - startY) / amountOfLines;

    for (let i = 0; i < lines.length; i++)
        canvas.fillText( lines[i], x, startY + (i * finalLineHeight) );
}
