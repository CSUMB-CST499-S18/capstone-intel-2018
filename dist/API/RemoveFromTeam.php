<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';

$conn = getDatabaseConnection();

//Get child teams
$sql = "SELECT ChildTeams
        FROM parentteam
        WHERE ParentTeam = :ParentTeam";

$namedParameters = array();
$namedParameters[':ParentTeam'] = $_GET['ParentTeam'];
        
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);
$record = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($record);


/*$sql = "DELETE FROM employeeteam
        WHERE EmployeeID  = :EmployeeID
        AND TeamID = :TeamID";

//Sanitizing Input
$namedParameters = array();
$namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
$namedParameters[':TeamID'] = $_GET['TeamID'];

$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);
*/

//TODO: REMOVAL LOGIC
//SELECT *
//FROM teamresource NATURAL JOIN employeeresource 
//WHERE employeeresource.ResourceID = teamresource.ResourceID AND employeeresource.EmployeeID = 1 AND TeamID = 21;

//This removes an employees resource access to that specific team ID.

?>
