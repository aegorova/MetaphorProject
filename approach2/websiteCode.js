var Stimuli = new StimulusArray(theCSVFile);
var roundNumber = 1;
const demographicFile = "<div id=\"demographic\" >\n<h1>PLEASE ANSWER THE FOLLOWING QUESTIONS BEFORE PROCEEDING</h1>\n<br>\n1. What is your age?<br>\n<input id=\"age\" type=\"text\" name=\"age\"/><br />\n<br>\n2. What is your gender?\n<select id=\"gender\" name =\"gender\">\n	<option value = \"\">Select one</option>\n  	<option value=\"male\">Male</option>\n  	<option value=\"female\">Female</option>\n</select><br>\n<br>\n3. What is your native language?\n<select id=\"language\" name =\"language\">\n	<option value=\"\">Select one</option>\n	<option value=\"english\">English</option>\n	<option value=\"other\">Other</option>\n</select><br>\n<br>\n4. For how many years have you spoken the language in question &#35;3?<br>\n<input id=\"yrs_spoken\" type=\"text\" name=\"yrs_spoken\"/><br />\n<br>\n5. Are you bilingual? \n<select id=\"bilingual\" name =\"bilingual\">\n	<option value=\"\">Select one</option>\n  	<option value=\"y\">Yes</option>\n  	<option value=\"n\">No</option>\n</select><br>\n<br>\n6. How fluent are you at reading, writing, and speaking your second language?<br>\n&#40;with 1 &#61; not fluent at all and 5 &#61; native level of fluency&#41;<br>\n<input id=\"bifluent\" type=\"radio\" name=\"bifluent\" value=\"1\" onclick = \"on_selection1(this)\">1&nbsp;&nbsp;\n<input id=\"bifluent\" type=\"radio\" name=\"bifluent\" value=\"2\" onclick = \"on_selection1(this)\">2&nbsp;&nbsp;\n<input id=\"bifluent\" type=\"radio\" name=\"bifluent\" value=\"3\" onclick = \"on_selection1(this)\">3&nbsp;&nbsp;\n<input id=\"bifluent\" type=\"radio\" name=\"bifluent\" value=\"4\" onclick = \"on_selection1(this)\">4&nbsp;&nbsp;\n<input id=\"bifluent\" type=\"radio\" name=\"bifluent\" value=\"5\" onclick = \"on_selection1(this)\">5<br>\n<br>\n7. What is your nationality?<br>\n<select id=\"nationality\" name =\"nationality\">\n	<option value=\"\">Select one</option>\n	<option value=\"us\">American</option>\n	<option value=\"other\">Other</option>\n</select><br>\n<br>\n8. What is your political affiliation?<br>\n<select id =\"politics\" name =\"politics\">\n	<option value=\"\">Select one</option>\n	<option value=\"democrat\">Democratic Party</option>\n	<option value=\"republican\">Republican Party</option>\n	<option value=\"libertarian\">Libertarian Party</option>\n	<option value=\"green\">Green Party</option>\n	<option value=\"constitution\">Constitution Party</option>\n	<option value=\"other\">Other</option>\n</select><br>\n<br>\n9. Were your parents born in the U.S.?<br>\n<select id =\"nativeparents\" name =\"nativeparents\">\n	<option value=\"\">Select one</option>\n  	<option value=\"y\">Yes</option>\n  	<option value=\"n\">No</option>\n</select><br>\n<br>\n10. Were you born in U.S.?<br>\n<select id=\"bornhere\" name =\"bornhere\">\n	<option value=\"\">Select one</option>\n  	<option value=\"y\">Yes</option>\n  	<option value=\"n\">No</option>\n</select><br>\n<br>\n11. Where do you currently live?<br>\n<select id=\"livein\" name =\"livein\">\n	<option value=\"\">Select one</option>\n  	<option value=\"usa\">USA</option>\n  	<option value=\"other\">Other</option>\n</select><br>\n<br>\n12. For how many years have you lived in your current country?<br>\n<input id=\"yrs_in_country\" type=\"text\" name=\"yrs_in_country\" value=\"\" /><br />\n<br>\n13. What is your ethnicity?<br>\n<select id =\"ethnicity\" name =\"ethnicity\">\n	<option value=\"\">Select one</option>\n	<option value=\"white\">White American</option>\n	<option value=\"black\">Black American</option>\n	<option value=\"asian\">Asian American</option>\n	<option value=\"hispanic\">Hispanic and Latino Americans</option>\n	<option value=\"other\">Other</option>\n</select><br>\n<br>\n14. What is your religious background?<br>\n<select id =\"religion\" name =\"religion\">\n	<option value=\"\">Select one</option>\n	<option value=\"christianity\">Christianity</option>\n	<option value=\"islam\">Islam</option>\n	<option value=\"judaism\">Judaism</option>\n	<option value=\"buddhism\">Buddhism</option>\n	<option value=\"agnostism\">Agnostism</option>	\n	<option value=\"atheism\">Atheism</option>	\n	<option value=\"other\">Other</option>\n</select><br>\n<br>\n15. How would you rank your economic status compared to other people?<br>\n&#40;with 1 &#61; much lower than most and 5 &#61; much higher than most people&#41;<br>\n<input id= \"econ_status\" type=\"radio\" name=\"econ_status\" value=\"1\" onclick = \"on_selection2(this)\">1&nbsp;&nbsp;\n<input id= \"econ_status\" type=\"radio\" name=\"econ_status\" value=\"2\" onclick = \"on_selection2(this)\">2&nbsp;&nbsp;\n<input id= \"econ_status\" type=\"radio\" name=\"econ_status\" value=\"3\" onclick = \"on_selection2(this)\">3&nbsp;&nbsp;\n<input id= \"econ_status\" type=\"radio\" name=\"econ_status\" value=\"4\" onclick = \"on_selection2(this)\">4&nbsp;&nbsp;\n<input id= \"econ_status\" type=\"radio\" name=\"econ_status\" value=\"5\" onclick = \"on_selection2(this)\">5<br>\n<br>\n16. What is your occupation?<br>\n<input id=\"occupation\" type=\"text\" name=\"occupation\" value=\"\" /><br />\n<br>\n17. What is your level of education?\n<select id=\"education\" name =\"education\">\n	<option value=\"\">Select one</option>\n	<option value=\"none\">No formal education</option>\n	<option value=\"elementary\">Elementary education</option>\n	<option value=\"secondary\">Secondary education</option>\n	<option value=\"college\">Some College</option>\n	<option value=\"BA/BS\">Bachelors degree</option>\n	<option value=\"graduate\">Graduate degree &#40;example&#58; M.S., Ph.D.&#41;</option>\n	<option value=\"other\">Other</option>\n</select><br>\n<br>\n<center><input type=\"button\" value=\"Accept\" onclick=\"checkInput('demographic')\"></center>\n</div>";


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
document.getElementById("number").innerHTML = "<b>Question " + roundNumber + "</b>";

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
  document.getElementById("number").innerHTML = "<b>Question " + roundNumber + "</b>";
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
