// One stimulus seems to correspond to 3 lines in the CSV file -- as long as they are contiguous, this is cool.
const NUM_PARTS = 3; // There are three lines in the CSV per Stimulus
const DELAY = 500;
function StimulusArray (csvFile) {
    this.Stimuli = new Array();
    this.csvFile = csvFile;
    this.csvLines = CSVToArray(this.csvFile, ",");
    this.csvLines.shift(); // the first line contains a header.
    this.isMetaphor = new Array();
    this.currentStim = 0;
    this.done = 0;
    var numStims = this.csvLines.length / NUM_PARTS; // There are three lines in the CSV file per stimulus
    for (var i = 0; i < numStims; i+= 1) {
	if (i < numStims.length /2) {
	    this.isMetaphor[i] = "m";
	}
	else {
	    this.isMetaphor[i] = "l";
	}
    }
    this.isMetaphor = shuffle(this.isMetaphor);
    
    for (i = 0; i < numStims; i += 1) {
	
	this.Stimuli[i] = new approach4Stim(this.csvLines[NUM_PARTS * i], this.csvLines[NUM_PARTS * i+1], this.csvLines[NUM_PARTS * i+2], this.isMetaphor[i]);
    }
    this.Stimuli = shuffle(this.Stimuli);

        
    this.advance = advance;
    function advance() {
	this.Stimuli[this.currentStim].advance();
	if (this.Stimuli[this.currentStim].done == 1) {
	    this.currentStim += 1;
	}

	if (this.currentStim >= this.Stimuli.length) {
	    //There are no more stimuli.
	    this.done = 1;
	}
    }

    this.recordResponse = recordResponse;
    function recordResponse(button) {
	this.Stimuli[this.currentStim].recordResponse(button);
    }

    this.toString = toString;
    function toString() {
	var theString;
	theString = "Order,Part Order,StimID,MappingID,Metaphor,Response\n";
	for (var i = 0; i < numStims; i++) {
	    theString +=  this.Stimuli[i].toString(i+1);
	}
	return theString;
    }
    this.showMe = showMe;
    function showMe(){
	this.Stimuli[this.currentStim].showMe();
    }

}


function approach4Stim(csvLineArray1, csvLineArray2, csvLineArray3, isMetaphor)
{
    this.partsArray = new Array();
    this.partsArray[0] = new approach4StimPart(csvLineArray1, isMetaphor);
    this.partsArray[1] = new approach4StimPart(csvLineArray2, isMetaphor);
    this.partsArray[2] = new approach4StimPart(csvLineArray3, isMetaphor);

    this.partsArray = shuffle(this.partsArray);

    this.done = 0;
    this.currentPart = 0;
    this.showMe = showMe;

    function showMe() {
	this.partsArray[this.currentPart].showMe();
    }
    this.toString = toString;
    
    function toString(orderString) {
	var theString = "";
	for (var i = 0; i < NUM_PARTS; i++) {
	    theString += orderString + "," + (i + 1).toString() + "," +  this.partsArray[i].toString() + "\n";
	}
	return theString;
    }
    this.recordResponse = recordResponse;
    function recordResponse(button) {
	this.partsArray[this.currentPart].recordResponse(button);
    }
    this.advance = advance;
    function advance() {
	this.currentPart += 1;
	if (this.currentPart >= NUM_PARTS) {
	    this.done = 1;
	}
    }


}


function approach4StimPart(csvLineArray, isMetaphor)
{
    //Initialize values from CSV file for this stimulus
    this.item = csvLineArray[0];
    this.mapping=csvLineArray[1];
    this.metaphor=csvLineArray[2];
    this.literalVignette=csvLineArray[3];
    this.metaphoricalVignette = csvLineArray[4];
    this.questionFrame = csvLineArray[5];
    this.statement = csvLineArray[6];
    this.response = "";
    //Use the appropriate Vignette -- put it in stimulusText
    if (isMetaphor.toLowerCase() == "m") {
	this.stimulusText = this.metaphoricalVignette;
    }
    else if (isMetaphor.toLowerCase() == "l") {
	this.stimulusText = this.literalVignette;
    }


    this.showMe=showMe;
    function showMe()
    { //
	document.getElementById("statement").innerHTML = "";
	var st = this.stimulusText;
	var qf = this.questionFrame;
	var sta = this.statement;
	setTimeout(function() {
	document.getElementById("vignette").innerHTML = st;
	document.getElementById("questionFrame").innerHTML = qf;
	document.getElementById("statement").innerHTML = sta;
	}, DELAY);
    }
    this.recordResponse = recordResponse;
    function recordResponse(button)
    {
	this.response = button.value;
    }
    this.toString = toString;
    function toString()
    {
	var theString;
	theString = this.item + "," + this.mapping + "," + this.metaphor + "," + this.response;
	return theString;
    }
}