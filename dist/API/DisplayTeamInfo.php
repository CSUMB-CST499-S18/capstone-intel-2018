<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "SELECT team.TeamName, employeeteam.isTeamManager, employeeteam.TeamID
        FROM employeeteam NATURAL JOIN team
        WHERE EmployeeID = :EmployeeID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);
$rows = array();

while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
  $rows[] = $row; // appends each row to the array
}

echo json_encode($rows);
?>