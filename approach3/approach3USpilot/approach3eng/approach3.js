const NUM_STIMS = 10; // For this approach there are ten stimuli per condition.
const NUM_SETS = 2;
const CONSISTENT_COLUMN = 2 ;
const INCONSISTENT_COLUMN = 3;
const PASSAGE_COLUMN = 0;
const UNIQUE_ID_COLUMN = 6;
const CONSISTENT_METAPHOR_COLUMN = 1;
const INCONSISTENT_METAPHOR_COLUMN = 4;
const SET_COLUMN = 5;
const DELAY = 500; //display delay in miliseconds

function StimulusArray (csvFile) {
    this.Stimuli = new Array();
    this.csvFile = csvFile;
    this.csvLines = CSVToArray(this.csvFile, ",");
    this.csvLines.shift(); // the first line contains a header.
    this.currentStim = 0;
    this.done = 0;
    this.set = Math.floor(Math.random()*NUM_SETS) + 1;
    this.firstConsistency = new Array();
    for (var i = 0; i < NUM_STIMS; i += 1) {
	if (i < NUM_STIMS/2) {
	    this.firstConsistency[i] = "i";
	}
	else {
	    this.firstConsistency[i] = "c";
	}
    }
    this.firstConsistency = shuffle(this.firstConsistency);

    var totalStims = this.csvLines.length;
    var j = 0;
    for (var i = 0; i < totalStims; i+=1) {
	if (this.csvLines[i][SET_COLUMN] == this.set) {
	    this.Stimuli[j] = new approach3Stim(this.csvLines[i], this.firstConsistency[j]);
	    j += 1;
	}
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
//	    theString += orderString + "," + (i + 1).toString() + "," + this.uniqueID + "," + this.set + "," + this.first + "," + this.completionOrder[i] + "," + this.metaphors[i] + "," + this.response + "\n"
	theString = "Order,Part Order,StimID,Set,First Metaphor,Current Metaphor,Response\n";
	for (var i = 0; i < this.Stimuli.length; i++) {
	    theString +=  this.Stimuli[i].toString(i+1);
	}
	return theString;
    }
    this.showMe = showMe;
    function showMe(){
	this.Stimuli[this.currentStim].showMe();
    }

}


function approach3Stim(csvLineArray, firstConsistency)
{
// For this approach, we have:
// Passage
// Consistent completion
// Inconsistent completion
// Metaphor
// Unique ID
// Set
    this.stimulusText = csvLineArray[PASSAGE_COLUMN];
    this.completions = new Array();
    this.completionOrder = new Array();
    this.metaphors = new Array();
    if (firstConsistency == "i"){
	this.completions = [csvLineArray[INCONSISTENT_COLUMN], csvLineArray[CONSISTENT_COLUMN]];
	this.metaphors = [csvLineArray[INCONSISTENT_METAPHOR_COLUMN], csvLineArray[CONSISTENT_METAPHOR_COLUMN]];
	this.completionOrder = ["inconsistent", "consistent"];
	this.first = "inconcsistent";
    }
    else if (firstConsistency == "c") {
		this.completions = [csvLineArray[CONSISTENT_COLUMN], csvLineArray[INCONSISTENT_COLUMN]];
		this.metaphors = [csvLineArray[CONSISTENT_METAPHOR_COLUMN], csvLineArray[INCONSISTENT_METAPHOR_COLUMN]];
	this.completionOrder = ["consistent", "inconsistent"];
	this.first = "consistent";
    }
    this.uniqueID = csvLineArray[UNIQUE_ID_COLUMN];
    this.set = csvLineArray[SET_COLUMN];
    this.done = 0;
    this.currentPart = 0;
    this.response = 0;
    this.displayPassage = displayPassage;
    function displayPassage(aString) {
	document.getElementById("vignette").innerHTML = aString;
    }
    this.displayContinuation = displayContinuation;
    function displayContinuation(aString) {
	document.getElementById("completion").innerHTML = aString;
    }



    this.showMe = showMe;

    function showMe() {
	if (this.currentPart == 0) { // we need to display a new vignette
	    document.getElementById("vignette").innerHTML = "";
	    var stimText = this.stimulusText;

	    setTimeout(function() {
		document.getElementById("vignette").innerHTML = stimText;
	    }
, DELAY);
	}
	
	document.getElementById("completion").innerHTML = "";
	var curCompl = this.completions[this.currentPart];
	setTimeout(function() {	
	    document.getElementById("completion").innerHTML = curCompl;
	}, DELAY);
//this.displayContinuation(this.completions[this.currentPart]), 200);
    }


    this.toString = toString;
    
    function toString(orderString) {
	var theString = "";
	for (var i = 0; i < 2; i++) {
	    theString += orderString + "," + (i + 1).toString() + "," + this.uniqueID + "," + this.set + "," + this.first + "," + this.completionOrder[i] + "," + this.metaphors[i] + "," + this.response + "\n";
	}
	return theString;
    }
    this.recordResponse = recordResponse;
    function recordResponse(button) {
	this.response = button.value;
    }
    this.advance = advance;
    function advance() {
	this.currentPart += 1;
	if (this.currentPart >= 2) {
	    this.done = 1;
	}
    }
}