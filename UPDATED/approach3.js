//UniqueID	PassageID	Passage	MetaphorType	Completion	CompletionType	(set?)
const NUM_STIMS = 8;
const DELAY = 500;
const UniqueID_COLUMN = 0;
const PassageID_COLUMN = 1;
const Passage_COLUMN = 2;
const MetaphorType_COLUMN = 3;
const Prompt_COLUMN = 4;
const PromptType_COLUMN = 5;
const Set_COLUMN = 6;

function StimulusArray (csvFile) {
    this.Stimuli = new Array();
    this.csvFile = csvFile;
    this.csvLines = CSVToArray(this.csvFile, ",");
    this.csvLines.shift(); // the first line contains a header.
    this.currentStim = 0;
    this.done = 0;

    for (var i = 0; i < NUM_STIMS; i+=1) {
	this.Stimuli[i] = new approach3Stim(this.csvLines[i]);
    }
    

    this.Stimuli = shuffle(this.Stimuli);

    this.advance = advance;
    function advance() {
	this.currentStim += 1;
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
	theString = "Order,UniqueID,PassageID,MetaphorType,PromptType,Response\n";
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
/*
const UniqueID_COLUMN = 0;
const PassageID_COLUMN = 1;
const Passage_COLUMN = 2;
const MetaphorTypeColumn = 3;
const Prompt_COLUMN = 4;
const PromptType_COLUMN = 5;
const Set_COLUMN = 6;

*/
    this.UniqueID = csvLineArray[UniqueID_COLUMN];
    this.PassageID = csvLineArray[PassageID_COLUMN]
    this.Passage = csvLineArray[Passage_COLUMN];
    this.Prompt = csvLineArray[Prompt_COLUMN];
    this.PromptType = csvLineArray[PromptType_COLUMN];
    //this.Set = csvLineArray[Set_COLUMN];
    this.MetaphorType = csvLineArray[MetaphorType_COLUMN];

    this.response = 0;

    this.showMe = showMe;

    function showMe() {
	document.getElementById("passage").innerHTML = "";
	document.getElementById("prompt").innerHTML = "";

	var pass = this.Passage;
	var pr = this.Prompt
	setTimeout(function() {
	    document.getElementById("passage").innerHTML = pass;
	    document.getElementById("prompt").innerHTML = pr;
	}
, DELAY);
    }


    this.toString = toString;
    
    function toString(orderString) {
	var theString = "";
	theString += orderString + "," + this.UniqueID + "," + this.PassageID + "," + this.MetaphorType + "," + this.PromptType + "," + this.response + "\n";
	return theString;
    }
    this.recordResponse = recordResponse;
    function recordResponse(button) {
	this.response = button.value;
    }
}