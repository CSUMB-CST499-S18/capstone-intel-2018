<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "SELECT *
        FROM employee";

//Sanitizing Input
$stmt = $conn->query($sql);
$stmt->execute();
$rows = array();

while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
  $rows[] = $row; // appends each row to the array
}
echo json_encode($rows);
?>