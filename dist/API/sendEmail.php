<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

$sql = "SELECT *
        FROM logentry WHERE TimeStp >= CURDATE()";

//Sanitizing Input
    
        
$stmt = $conn->query($sql);
$stmt->execute();
$rows = array();
$message = "";

while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
  $rows[] = $row["Action"]; // appends each row to the array
}

for($i = 0; $i < count($rows); $i++) {
    $message = $message . $rows[$i] . "\n";
}

// $to      = 'bavery@csumbcapstone.onmicrosoft.com';
// $subject = 'Daily Log';
// $headers = 'From: kbutler-fish@csumbcapstone.onmicrosoft.com' . "\r\n" .
//     'X-Mailer: PHP/' . phpversion();

// mail($to, $subject, $message, $headers);

echo json_encode($message);

?>