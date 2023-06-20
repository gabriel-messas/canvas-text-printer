// Copyright 2022, Gabriel Esteves Messas, All rights reserved.
// Reproduction is allowed, as long as the source is mentioned.

// Prints text in HTML Canvas element with line breaks and proportional size calculations

function setupAndPrintText(canvas, text, areaWidth, areaHeight, x, y) {
    let size = areaWidth / 7;
    canvas.textBaseline = 'middle';
    canvas.textAlign = 'center';
    canvas.fillStyle = '#ffffff';
    canvas.font = `${size}px Stag`;

    let lines = text.split(' ');

    let finalLines = [];
    let curIndex = 0;
    while (true) {
        let tempLine = lines[curIndex];
        let nextWord = curIndex + 1;
        if (nextWord >= lines.length) {
            finalLines.push(tempLine);
            break;
        }
        while (this._ctx.measureText(tempLine + lines[nextWord]).width <= areaWidth * 0.9) {
            tempLine += (' ' + lines[nextWord]);
            nextWord++;
            if (nextWord === lines.length) {
                break;
            }
        }
        finalLines.push(tempLine);
        curIndex = nextWord;
        if (curIndex >= lines.length) {
            break;
        }
    }

    lines = finalLines;

    let longest = 0;
    let longestLine;
    for (let line of lines) {
        if (this._ctx.measureText(line).width > longest) {
            longest = this._ctx.measureText(line).width;
            longestLine = line;
        }
    }

    const imgHeight = areaHeight;

    // startY gets set to the text initial y here
    let startY = y;
    startY -= imgHeight / 2;
    startY += 0.1 * imgHeight;

    // finalY get set to the last line of text's Y
    let finalY = y + (imgHeight / 2) - (0.1 * imgHeight);

    const amountOfLines = lines.length;
    let finalLineHeight = (finalY - startY) / amountOfLines;

    size = 1;
    canvas.font = `${size}px Stag`;

    const measure = this._ctx.measureText(longestLine);
    const increaseRoom = Math.min( ( (areaWidth * 0.9) / measure.width ), ( (finalLineHeight * 0.9) / (measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent) ) );
    size *= increaseRoom;
    canvas.font = `${size}px Stag`;

    // startY gets set to the text initial y here
    startY = y;
    startY -= imgHeight / 2;
    startY += 0.1 * imgHeight;
    startY += finalLineHeight * 0.5;

    for (let i = 0; i < lines.length; i++)
        canvas.fillText( lines[i], x, startY + (i * finalLineHeight) );
}
