<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . ""); 
include '../dbConnection.php';

$conn = getDatabaseConnection();

$sql = "DELETE FROM employeeteam
        WHERE EmployeeID  = :EmployeeID
        AND TeamID = :TeamID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
$namedParameters[':TeamID'] = $_GET['TeamID'];

$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);

?>
