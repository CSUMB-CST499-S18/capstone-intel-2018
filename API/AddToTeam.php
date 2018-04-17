<?php
header("Access-Control-Allow-Origin: http://capstone-intel-jaimegvelazquez.c9users.io:8081");
include 'dbConnection.php';

$conn = getDatabaseConnection();

$sql = "INSERT INTO employeeteam
        (EmployeeID, TeamID, isTeamManager)
        VALUES( :EmployeeID, :TeamID, :isTeamManager)";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
$namedParameters[':TeamID'] = $_GET['TeamID'];
$namedParameters[':isTeamManager'] = $_GET['isTeamManager'];

$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);



?>