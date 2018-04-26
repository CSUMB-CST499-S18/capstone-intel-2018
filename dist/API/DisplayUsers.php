<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';

console.log("DisplayUsers.php");

$conn = getDatabaseConnection();

$sql = "SELECT *
        FROM employee
        WHERE EmployeeID = :EmployeeID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);
$record = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($record);
?>