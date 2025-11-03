<?php
$myfile = fopen("/shared/data.json", "r") or die("Unable to open file!");
echo fread($myfile,filesize("/shared/data.json"));
header("Content-Type: application/json");
?>
