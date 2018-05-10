<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "SELECT *
        FROM team
        WHERE team.TeamID = :TeamID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':TeamID'] = $_GET['TeamID'];
        
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);
$rows = array();

while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
  $rows[] = $row; // appends each row to the array
}

echo json_encode($rows);
?>