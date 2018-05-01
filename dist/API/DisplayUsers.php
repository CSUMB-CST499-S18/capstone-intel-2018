<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "SELECT *
        FROM employee";

//Sanitizing Input
        
$stmt = $conn->prepare($sql);
$stmt->execute();
$record = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($record);
?>