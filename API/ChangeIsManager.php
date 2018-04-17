<?php
header("Access-Control-Allow-Origin: http://capstone-intel-jaimegvelazquez.c9users.io:8081");
include 'dbConnection.php';

$conn = getDatabaseConnection();

$sql = "UPDATE employee
        SET isManager  = :isManager
        WHERE EmployeeID = :EmployeeID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
$namedParameters[':isManager'] = $_GET['isManager'];


$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);

?>
