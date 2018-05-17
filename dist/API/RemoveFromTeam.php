<?php
//CODE NEEDS TO BE REFACTORED

// WORKFLOW
//////////////////////////////////////////////////////////////////////////////////////////

// IF EMPLOYEE IS THE OWNER
// Grab all children of TeamID.
// Grab all ResourceID's attached to those childrens TeamIDs + original TeamID.
// Delete all instances where ResourceID AND EmployeeID appear in employeeresource table.
// Lastly, delete employee from employeeteam table using EmployeeID and TeamID.

//////////////////////////////////////////////////////////////////////////////////////////

// IF NOT THE OWNER
// No need to lookup children
// Grabs all resourceID's based on TeamID
// Delete all instances where ResourceID AND EmployeeID appear in employeeresource table.
// Lastly, delete employee from employeeteam table using EmployeeID and TeamID.

//////////////////////////////////////////////////////////////////////////////////////////

header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';

$conn = getDatabaseConnection();

//Get child teams
$sql = "SELECT ChildTeams
        FROM parentteam
        WHERE ParentTeam = :TeamID";

$namedParameters = array();
$namedParameters[':TeamID'] = $_GET['TeamID'];
        
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters);
$record = $stmt->fetch(PDO::FETCH_ASSOC);

if (isset($record)){ //If communication with the DB was established
/*Here we check if they are the manager of the team */
        $sql = "SELECT isTeamManager
        FROM employeeteam
        WHERE TeamID = :TeamID
        AND EmployeeID = :EmployeeID";

        $namedParameters = array();
        $namedParameters[':TeamID'] = $_GET['TeamID'];
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];

        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        $isTeamManager = $stmt->fetch(PDO::FETCH_ASSOC);
        
        //echo $isTeamManager["isTeamManager"];
        
        if($isTeamManager["isTeamManager"] == 1){
                
                $record = explode(",", $record["ChildTeams"]); //stores all child teams in an array
                //echo $record[0];
           /*
        /* Here we loop through the array and append all child teams to the query */
                
                $sql = "SELECT ResourceID FROM teamresource WHERE";
                
                for($i = 0; $i < count($record); $i++){
                        $sql = $sql . " TeamID = " . $record[$i];
                        if($i < count($record) - 1) {
                                $sql = $sql . " OR ";
                        }
                }
                $sql = $sql . " OR TeamID = " . $_GET['TeamID']; 
                
        /* Here insert all ResourceID's into the $rows array*/
                
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $resourceID = array();
        
                while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                        $resourceID[] = $row; // appends each row to the array. 
                }
                
        /* Here we loop through the $rows array and append all ResourceID's to sql query, and delete from employeeresource*/
        
                //Just add teamID to remove specific viewer access. Add teamID column to employeeresource
                
                $sql = "DELETE FROM employeeresource
                        WHERE EmployeeID = :EmployeeID
                        AND TeamID = :TeamID
                        AND (AccessID = 3 OR AccessID = 1) 
                        AND (";
                
                for($i = 0; $i < count($resourceID); $i++){
                        $sql = $sql . " ResourceID = " . $resourceID[$i]["ResourceID"];
                        if($i < count($resourceID) - 1) {
                                $sql = $sql . " OR ";
                        } elseif($i == count($resourceID) - 1){
                                $sql = $sql . ")";
                        }
                }
                
                $namedParameters = array();
                $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                $namedParameters[':TeamID'] = $_GET['TeamID'];
        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
                
/*****************************Deleting OWNER from their PARENTNODE team in which they are MEMBERS. **************************/

                /* Get the ParentNode of the team in which they are being made manager. */
        
                $sql = "SELECT ParentNode FROM parentteam WHERE ParentTeam = :TeamID";
        
                $namedParameters = array();
                $namedParameters[':TeamID'] = $_GET['TeamID'];
        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
                $ParentNode = $stmt->fetch(PDO::FETCH_ASSOC);
                
                /* Changes hasManager boolean flag in team table from HAS TEAM MANAGER (1) to NO TEAM MANAGER (0) */
        
                $sql = "UPDATE team
                SET hasManager = `0`
                WHERE TeamID = :TeamID";
                
                //Sanitizing Input
                $namedParameters = array();
                $namedParameters[':TeamID'] = $_GET['TeamID'];
        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);

                if($ParentNode["ParentNode"] != NULL){ //Run if TeamID has a ParentNode *Works on all cases except root node*
                
                        //Where employee is member of the team, delete resources from employeeresource
                        $sql = "SELECT ResourceID FROM teamresource WHERE TeamID = :TeamID";
                        
                        $namedParameters = array();
                        $namedParameters[':TeamID'] = $ParentNode["ParentNode"];
                        $stmt = $conn->prepare($sql);
                        $stmt->execute($namedParameters);
                        $resourceID = array();
                
                        while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                                $resourceID[] = $row; // appends each row to the array. 
                        }
                        
                        $sql = "DELETE FROM employeeresource
                                WHERE EmployeeID = :EmployeeID
                                AND TeamID = :TeamID
                                AND AccessID = 2 
                                AND (";
                        
                        for($i = 0; $i < count($resourceID); $i++){
                                $sql = $sql . " ResourceID = " . $resourceID[$i]["ResourceID"];
                                if($i < count($resourceID) - 1) {
                                        $sql = $sql . " OR ";
                                } elseif($i == count($resourceID) - 1){
                                        $sql = $sql . ")";
                                }
                        }
                        
                        $namedParameters = array();
                        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                        $namedParameters[':TeamID'] = $_GET['TeamID'];
                
                        $stmt = $conn->prepare($sql);
                        $stmt->execute($namedParameters);
                }

/********************** Deleting EMPLOYEE from employeeteam table in which they are OWNER and MEMBER ****************************/

                
        /* Here we delete the employee from the employeeteam table WHERE THEY ARE OWNER */
        $sql = "DELETE FROM employeeteam
                WHERE EmployeeID  = :EmployeeID
                AND TeamID = :TeamID";
        
        //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        
        if($ParentNode["ParentNode"] != NULL){ //Run if TeamID has a ParentNode *Works on all cases except root node*
        /* Here we delete the employee from the employeeteam table WHERE THEY ARE MEMBER */
                $sql = "DELETE FROM employeeteam
                        WHERE EmployeeID  = :EmployeeID
                        AND TeamID = :TeamID
                        AND isTeamManager = 0";
        
                //Sanitizing Input
                $namedParameters = array();
                $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                $namedParameters[':TeamID'] = $ParentNode["ParentNode"];
        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
        
                
        /* Log Entry */

        $sql = "INSERT INTO `logentry` (`LogID`, `Action`, `TimeStp`, `TeamID`, `EmployeeID`) 
                VALUES (NULL, 'Removed employeeID ':EmployeeID' from teamID ':TeamID' as OWNER and from teamID  " . $ParentNode["ParentNode"] . " as MEMBER.',
                CURRENT_TIMESTAMP, :TeamID, :EmployeeID)";
                
        //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];

        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);       
        }
        } else {
                //Where employee is NOT the manager of the team
                $sql = "SELECT ResourceID FROM teamresource WHERE TeamID = :TeamID";
                
                $namedParameters = array();
                $namedParameters[':TeamID'] = $_GET['TeamID'];
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
                $resourceID = array();
        
                while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                        $resourceID[] = $row; // appends each row to the array. 
                }
                
                $sql = "DELETE FROM employeeresource
                        WHERE EmployeeID = :EmployeeID
                        AND TeamID = :TeamID
                        AND AccessID = 2 
                        AND (";
                
                for($i = 0; $i < count($resourceID); $i++){
                        $sql = $sql . " ResourceID = " . $resourceID[$i]["ResourceID"];
                        if($i < count($resourceID) - 1) {
                                $sql = $sql . " OR ";
                        } elseif($i == count($resourceID) - 1){
                                $sql = $sql . ")";
                        }
                }
                
                $namedParameters = array();
                $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                $namedParameters[':TeamID'] = $_GET['TeamID'];
        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
                
                /* Here we delete the employee from the employeeteam table */
                $sql = "DELETE FROM employeeteam
                        WHERE EmployeeID  = :EmployeeID
                        AND TeamID = :TeamID";
        
                //Sanitizing Input
                $namedParameters = array();
                $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                $namedParameters[':TeamID'] = $_GET['TeamID'];
        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
                
                        
        /* Log Entry */
        //INSERT INTO `logentry` (`LogID`, `Action`, `TimeStp`, `TeamID`, `EmployeeID`) VALUES (NULL, 'Testing', CURRENT_TIMESTAMP, '11', '1');
        
        $sql = "INSERT INTO `logentry` (`LogID`, `Action`, `TimeStp`, `TeamID`, `EmployeeID`) 
                VALUES (NULL, 'Removed employeeID ':EmployeeID' from teamID ':TeamID' as MEMBER.',
                CURRENT_TIMESTAMP, :TeamID, :EmployeeID)";
                
                 //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];

        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        }
} else {
  echo false;
}

?>
