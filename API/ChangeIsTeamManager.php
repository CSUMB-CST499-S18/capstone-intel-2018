<?php
include 'dbConnection.php';
header("Access-Control-Allow-Origin: http://capstone-intel-jaimegvelazquez.c9users.io:8081");
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
