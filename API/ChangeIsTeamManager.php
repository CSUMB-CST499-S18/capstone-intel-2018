<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "UPDATE employeeteam
        SET isTeamManager  = :isTeamManager
        WHERE EmployeeID = :EmployeeID
        AND TeamID = :TeamID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
$namedParameters[':isTeamManager'] = $_GET['isTeamManager'];
$namedParameters[':TeamID'] = $_GET['TeamID'];


$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);

?>
