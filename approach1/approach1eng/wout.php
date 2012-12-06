<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
#ex1
{
	border: solid;
}
</style>

<center>
<body>
<div id=ex1 style="outline:#000 thin solid; display:table-cell; height:200px; width:450px; text-align:center">
<?php 

$results_dir = "./results/";
$post = $_POST["results"];

if ($_POST["assignmentId"] == ""){
	$theFileName = (string)(time() % 100000000);
	$theFile = fopen($results_dir . $theFileName . ".csv", "w");
	$results = explode(";", $_POST["results"]);
  	$subjectId = $theFileName;
}
else{
	$theFileName = $_POST["assignmentId"];
	$theFile = fopen ($theFileName, "w");
	$results = explode(";", $_POST["results"]);
  	$subjectId = $theFileName;
  	echo("<form method='POST' action='http://mturk.com/mturk/externalSubmit'><input type='hidden' name='assignmentId' value='" . $subjectId . "'><input id='submitButton' type='submit' name='Submit' value='Submit'></form>");
}
$theFields = array("gender", "age", "language", "yrs_spoken", "bilingual", "bifluent", "nationality", "politics", "nativeparents", "bornhere", "livein", "yrs_in_country", "ethnicity", "religion", "occupation", "econ_status", "education");

foreach ($theFields as $field) {
	//  echo($field . ", " . $_POST[$field]);
	fwrite($theFile, $field . ", " . $_POST[$field] . "\n");
}

foreach ($results as $value){
	fwrite($theFile, $value);
	//  echo($value . "\n");
}

fclose($theFile);
echo("Thank you for your participation!");

?>
</div>
</body>