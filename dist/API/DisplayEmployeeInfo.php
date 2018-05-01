<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "SELECT employee.Name, employee.EmployeeID, employee.Phone, employee.Email, employee.isManager
        FROM employee
        WHERE employee.EmployeeID = :EmployeeID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);
$record = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($record);
?>