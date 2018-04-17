<?php
header("Access-Control-Allow-Origin: http://capstone-intel-jaimegvelazquez.c9users.io:8081");
include 'dbConnection.php';
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