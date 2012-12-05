const NUM_PARTS = 1;
const DELAY = 500;

function StimulusArray (csvFile) {
    this.Stimuli = new Array();
    this.csvFile = csvFile;
    this.csvLines = CSVToArray(csvFile, ",");
    this.csvLines.shift(); // the first line contains a header.
    this.desiredAffect = new Array();
    this.currentStim = 0;
    this.done = 0;
    var numStims = this.csvLines.length;

    for (var i = 0; i < numStims; i += 1) {
	this.Stimuli[i] = new approach5Stim(this.csvLines[i]);
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
	theString = "Order,StimID,PredictedAffect,Metaphor,Response\n";
	for (var i = 0; i < numStims; i++) {
	    theString += (i + 1).toString() + "," + this.Stimuli[i].toString() + "\n";
	}
    }
    this.showMe = showMe;
    function showMe(){
	this.Stimuli[this.currentStim].showMe();
    }

}


function approach5Stim(csvLineArray)
{

// ITEM #	PREDICTED AFFECT	METAPHOR	SENTENCE	QUESTION FRAME
    //Initialize values from CSV file for this stimulus
    this.item = csvLineArray[0];
    this.predictedAffect=csvLineArray[1];
    this.metaphor=csvLineArray[2];
    this.sentence=csvLineArray[3];
    this.questionFrame = csvLineArray[4];

    this.showMe=showMe;
    function showMe()
    { //
	
	var sent = this.sentence;
	var qf = this.questionFrame;
	document.getElementById("questionFrame").innerHTML = "";
	document.getElementById("sentence").innerHTML = "";
	setTimeout(function() {
	    document.getElementById("questionFrame").innerHTML = qf;
	    document.getElementById("sentence").innerHTML = sent;
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
	
	theString = this.item + "," + this.predictedAffect + "," + this.metaphor + "," + this.response;
	return theString;
    }
}