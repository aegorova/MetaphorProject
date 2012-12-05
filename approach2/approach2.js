//Item	Mapping	Metaphor	Scenario	Instructions	
//Source Element 1	Source Element 2	Source Element 3	Source Element 4	
//Target Element 1	Target Element 2	Target Element 3	Target Element 4	
//Question Frame	Correct Answer	Other Answer (B)	Other Answer (C)	Other Answer (D)

const NUM_PARTS = 4;// There are four lines in the CSV file per stim
const DELAY = 200;
function StimulusArray (csvFile) {
    this.Stimuli = new Array();
    this.csvFile = csvFile;
    this.csvLines = CSVToArray(this.csvFile, ",");
    this.csvLines.shift(); // the first line contains a header.
    this.currentStim = 0;
    this.done = 0;
    var numStims = this.csvLines.length / NUM_PARTS; 

    for (i = 0; i < numStims; i += 1) {
	
	this.Stimuli[i] = new approach2Stim(this.csvLines[NUM_PARTS * i], this.csvLines[NUM_PARTS * i+1], this.csvLines[NUM_PARTS * i+2], this.csvLines[NUM_PARTS * i + 3]);
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

function approach2Stim(csvLineArray1, csvLineArray2, csvLineArray3, csvLineArray4)
{
    this.partsArray = new Array();
    this.partsArray[0] = new approach2StimPart(csvLineArray1);
    this.partsArray[1] = new approach2StimPart(csvLineArray2);
    this.partsArray[2] = new approach2StimPart(csvLineArray3);
    this.partsArray[3] = new approach2StimPart(csvLineArray4);
    this.partsArray = shuffle(this.partsArray);

    this.done = 0;
    this.currentPart = 0;
    this.showMe = showMe;

    function showMe() {
	if (this.currentPart == 0) {
	    this.partsArray[this.currentPart].showScenario();
	}
	this.partsArray[this.currentPart].showQuestion();
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


//Item	Mapping	Metaphor	Scenario	Instructions	
//Source Element 1	Source Element 2	Source Element 3	Source Element 4	
//Target Element 1	Target Element 2	Target Element 3	Target Element 4	
//Question Frame	Correct Answer	Other Answer (B)	Other Answer (C)	Other Answer (D)

function approach2StimPart(csvLineArray, isMetaphor)
{
    //Initialize values from CSV file for this stimulus
    this.item = csvLineArray[0];
    this.mapping=csvLineArray[1];
    this.metaphor=csvLineArray[2];
    this.scenario=csvLineArray[3];
    this.instructions = csvLineArray[4];

    this.sourceElements = shuffle([csvLineArray[5], csvLineArray[6], csvLineArray[7], csvLineArray[8]]);
    this.targetElements = shuffle([csvLineArray[9], csvLineArray[10], csvLineArray[11], csvLineArray[12]]);
    this.questionFrame = csvLineArray[13];
    this.answers = [csvLineArray[14], csvLineArray[15], csvLineArray[16], csvLineArray[17]]; // 0 is the correct one
    this.answerProperties = ["correct", "otherB", "otherC", "otherD"];
    this.answerOrder = [0, 1, 2, 3];
    this.answerOrder = shuffle(this.answerOrder);
    this.answerPropsOrder = new Array();
    for (var i = 0; i < NUM_PARTS; i++) {
	this.answerPropsOrder[i] = this.answerProperties[this.answerOrder[i]];
    }

    this.showScenario = showScenario;
    function showScenario() {
	document.getElementById("scenario").innerHTML = "";
	document.getElementById("instructions").innerHTML = "";
	for (var i = 0; i < NUM_PARTS; i++){
	    document.getElementById("sourceElements" + i).innerHTML = "";
	    document.getElementById("targetElements" + i).innerHTML = "";
	}
	var scen = this.scenario;
	var inst = this.instructions;
	var se = this.sourceElements;
	var te = this.targetElements;

	setTimeout(function() {
	document.getElementById("scenario").innerHTML = scen;
	document.getElementById("instructions").innerHTML = inst;
	for (var i = 0; i < NUM_PARTS; i++){
	    document.getElementById("sourceElements" + i).innerHTML = se[i];
	    document.getElementById("targetElements" + i).innerHTML = te[i];
	}}, DELAY);
	}
    this.showQuestion=showQuestion;
    function showQuestion() { //
	document.getElementById("questionFrame").innerHTML = "";
	var qf = this.questionFrame; // I am not sure why this kludge is necessary - probably a name-space issue. If you put this.questionFrame below vv it just returns an object, not the actual questionFrame variable associated with this object.
	setTimeout(function () {
	    document.getElementById("questionFrame").innerHTML = qf;
	}, DELAY);
	var ansArray = new Array();
	for (var i = 0; i < NUM_PARTS; i++) {
	    document.getElementById("lbl" + i).innerHTML = "";
	    ansArray[i] = this.answers[this.answerOrder[i]];
	}
	for (var i = 0; i < NUM_PARTS; i++) {
	    var label = "lbl" + i;
	    var ans = ansArray[i];
	    setTimeout(function () {
		document.getElementById("lbl0").innerHTML = ansArray[0];
		document.getElementById("lbl1").innerHTML = ansArray[1];
		document.getElementById("lbl2").innerHTML = ansArray[2];
		document.getElementById("lbl3").innerHTML = ansArray[3];
	    }, DELAY);
	}


    }
    this.recordResponse = recordResponse;
    function recordResponse(button)
    {
	this.response = this.answerPropsOrder[button.value];
    }
    this.toString = toString;
    function toString()
    {
	var theString;
	theString = this.item + "," + this.mapping + "," + this.metaphor + "," + this.response;
	return theString;
    }
}