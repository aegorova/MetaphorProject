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
Thank you for your participation!
  
<?php
session_start();

$results_dir = "./results/";
if ($_POST["assignmentId"] !=""){
    $theFileName = $_POST["assignmentId"];
}
else{
  $theFileName = (string)(time() % 100000000);

  }

$theFile = fopen ($results_dir . $theFileName . ".csv", "w");
$results = explode(";", $_POST["results"]);
if ($_POST["assignmentId"] != ""){
  echo("<form action='http://mturk.com/mturk/externalSubmit'> <input type='hidden' name='mturk_form' value='"
  . $subjectID . "'><input type='submit'></form\>");

  }

$theFields = array("gender", "age", "language", "yrs_spoken", "bilingual", "nationality", "politics", "nativeparents", "bornhere", "livein", "yrs_in_country", "ethnicity", "religion_value", "occupation", "education");

foreach ($theFields as $field) {
  fwrite($theFile, $field . ", " . $_POST[$field] . "\n");
}


foreach ($results as $value){
   fwrite($theFile, $value);
}


 fclose($theFile);

?>
</div>
</body>
</html>