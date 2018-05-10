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
$record = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($record);
?>