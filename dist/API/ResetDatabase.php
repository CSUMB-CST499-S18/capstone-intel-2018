<?php
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';

$conn = getDatabaseConnection();

$sql = "SET FOREIGN_KEY_CHECKS = 0;

        DROP TABLE IF EXISTS accesstype;
        DROP TABLE IF EXISTS employee;
        DROP TABLE IF EXISTS employeeresource;
        DROP TABLE IF EXISTS employeeteam;
        DROP TABLE IF EXISTS logentry;
        DROP TABLE IF EXISTS parentteam;
        DROP TABLE IF EXISTS resources;
        DROP TABLE IF EXISTS resourcetype;
        DROP TABLE IF EXISTS team;
        DROP TABLE IF EXISTS teamresource;
        
        SET FOREIGN_KEY_CHECKS = 1;";
        
$stmt = $conn->prepare($sql);
$stmt->execute();
?>