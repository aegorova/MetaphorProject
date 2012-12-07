var Stimuli = new StimulusArray(theCSVFile);
var roundNumber = 1;


function addLoadEvent(func) {  
      var oldonload = window.onload;  
      if (typeof window.onload != 'function') {  
        window.onload = func;  
      } else {  
        window.onload = function() {  
          if (oldonload) {  
            oldonload();  
          }  
          func();  
        }  
      }  
Stimuli.showMe();
document.getElementById("number").innerHTML = roundNumber;

}


function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


function on_selection(button) {
  Stimuli.recordResponse(button);


  button.checked = false;
  
  Stimuli.advance();
    roundNumber +=1;
  document.getElementById("number").innerHTML = roundNumber;
  if(Stimuli.done == 0) {
     Stimuli.showMe();
  }
  else {
        doDemo();
        passDemo();
        document.getElementById("results").value = Stimuli.toString();
  }
}

function chooseWriter() {
}


function on_selection1(button){demographic += "fluent="+button.value;}

function on_selection2(button){demographic += "econ_status="+button.value;}

function checkInput(id){

	var demo1 = gup("assignmentId") + "&gender="+val("gender")+"&age="+val("age")+"&language="+val("language")+"&yrs_spoken="+val("yrs_spoken")+"&bilingual="+val("bilingual");
	var demo2 = "&nationality="+val("nationality")+"&politics="+val("politics")+"&nativeparents="+val("nativeparents")+"&bornhere="+val("bornhere")+"&livein="+val("livein");
	var demo3 = "&yrs_in_country="+val("yrs_in_country")+"&ethnicity="+val("ethnicity")+"&religion="+val("religion")+"&occupation="+val("occupation")+"&education="+val("education");
	demographic = demo1 + demo2 +demo3;
	if ((document.getElementById("gender").value == "")
	|| (document.getElementById("age").value == "")
	|| (document.getElementById("language").value == "")
	|| (document.getElementById("yrs_spoken").value == "")
	|| (document.getElementById("bilingual").value == "")
	|| (document.getElementById("nationality").value == "")
	|| (document.getElementById("politics").value == "")
	|| (document.getElementById("nativeparents").value == "")
	|| (document.getElementById("bornhere").value == "")
	|| (document.getElementById("livein").value == "")
	|| (document.getElementById("yrs_in_country").value == "")
	|| (document.getElementById("ethnicity").value == "")
	|| (document.getElementById("religion").value == "")
	|| (document.getElementById("occupation").value == "")
	|| (document.getElementById("education").value == "")){alert("Part of the form has not been filled out, please double check all the questions and finish");}
	else {
		window.location="surveypage.html?assignmentId=" + demographic;
	    	document.getElementById("mturk_form").action = "write.php";
        document.getElementById('mturk_form').submit();

		}
}
function val(id)
{
    if (document.getElementById(id).value == "") {
	//alert(id + "=" + document.getElementById(id).value);
    }
	else{return document.getElementById(id).value;}
}

function doDemo() {
    document.getElementById("ex1").innerHTML = demographicFile;
}

function passDemo() {

		document.getElementById("assignmentId").value = gup("assignmentId");
		document.getElementById("gender").value = gup("gender");
		document.getElementById("age").value = gup("age");
		document.getElementById("language").value = gup("language");
		document.getElementById("yrs_spoken").value = gup("yrs_spoken");
		document.getElementById("bilingual").value = gup("bilingual");
		document.getElementById("nationality").value = gup("nationality");
		document.getElementById("politics").value = gup("politics");
		document.getElementById("nativeparents").value = gup("nativeparents");
		document.getElementById("bornhere").value = gup("bornhere");
		document.getElementById("livein").value = gup("livein");
		document.getElementById("yrs_in_country").value = gup("yrs_in_country");
		document.getElementById("ethnicity").value = gup("ethnicity");
		document.getElementById("religion").value = gup("religion");
		document.getElementById("occupation").value = gup("occupation");
		document.getElementById("education").value = gup("education");
}
