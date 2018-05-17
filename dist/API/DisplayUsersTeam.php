

<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "SELECT employee.EmployeeID, employee.Name, employee.Phone, employee.Email, employee.isManager, 
        team.TeamName, employeeteam.TeamID, employeeteam.isTeamManager
        FROM employee LEFT JOIN employeeteam ON (employee.EmployeeID = employeeteam.EmployeeID)
        LEFT JOIN team ON (employeeteam.TeamID = team.TeamID)
        WHERE isManager = 0 OR isTeamManager = 1 OR (isTeamManager IS NULL AND isManager = 1)";

//Sanitizing Input
    
        
$stmt = $conn->query($sql);
$stmt->execute();
$rows = array();

while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
  $rows[] = $row; // appends each row to the array
}
echo json_encode($rows);
?>