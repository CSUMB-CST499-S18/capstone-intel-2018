
<?php
//CODE NEEDS TO BE REFACTORED

// WORKFLOW
//////////////////////////////////////////////////////////////////////////////////////////

// IF EMPLOYEE WILL BE THE OWNER
// Grab all children of TeamID.
// Grab all ResourceID's attached to those childrens TeamIDs + original TeamID.
// Insert all instances where ResourceID AND EmployeeID appear in employeeresource table.

//////////////////////////////////////////////////////////////////////////////////////////

// IF NOT THE OWNER
// No need to lookup children
// Grabs all resourceID's based on TeamID
// Insert all instances where ResourceID AND EmployeeID appear in employeeresource table.

//////////////////////////////////////////////////////////////////////////////////////////
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';


$conn = getDatabaseConnection();

if($_GET['isTeamManager'] == 1){ //If they're a manager, get child teams
        $sql = "SELECT ChildTeams
        FROM parentteam
        WHERE ParentTeam = :ParentTeam";

        $namedParameters = array();
        $namedParameters[':ParentTeam'] = $_GET['TeamID'];
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        $record = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $record = explode(",", $record["ChildTeams"]); //stores all child teams in an array
         
        /* Here we loop through the array and append all child teams to the query */
                
        $sql = "SELECT ResourceID FROM teamresource WHERE";
                
        for($i = 0; $i < count($record); $i++){
                $sql = $sql . " TeamID = " . $record[$i];
                if($i < count($record) - 1) {
                        $sql = $sql . " OR ";
                        }
                }
        //$sql = $sql . " OR TeamID = " . $_GET['TeamID'];
        
        /* Here insert all ResourceID's into the $rows array*/
                
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        $resourceID = array();
        
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                $resourceID[] = $row; // appends each row to the array. 
        }

        /* adds VISITOR permissions to child teams */        
        $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID )
        VALUES ";
        
        for($i = 0; $i < count($resourceID); $i++){
        $sql = $sql . "(:EmployeeID, " . $resourceID[$i]["ResourceID"] . " , " . 3 . "),";
        if($i == count($resourceID) - 1) {
        $sql = substr($sql, 0, -1);
        $sql = $sql . ";}";
                }
        }
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
         
        /* Adds OWNER access to team being assigned */
         
        $sql = "SELECT ResourceID FROM teamresource WHERE TeamID = :TeamID";
        
        $namedParameters = array();
        $namedParameters[':TeamID'] = $_GET['TeamID'];
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        $resourceID = array();
        
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                $resourceID[] = $row; // appends each row to the array. 
        }       
                /* adds owner permissions for TeamID */        
        $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID )
        VALUES ";
        
        for($i = 0; $i < count($resourceID); $i++){
                $sql = $sql . "(:EmployeeID, " . $resourceID[$i]["ResourceID"] . " , " . 1 . "),";
                if($i == count($resourceID) - 1) {
                $sql = substr($sql, 0, -1);
                $sql = $sql . ";}";
                }
        }
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);

        
        /******************************Adding the owner as a member to the PARENTNODE team as member **************************/
        
        /* Get the ParentNode of the team in which they are being made manager. */
        
        $sql = "SELECT ParentNode FROM parentteam WHERE ParentTeam = :TeamID";
        
        $namedParameters = array();
        $namedParameters[':TeamID'] = $_GET['TeamID'];
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        $ParentNode = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($ParentNode["ParentNode"] != NULL){ //Run if TeamID has a ParentNode *Works on all cases except root node*
                
                $sql = "SELECT ResourceID FROM teamresource WHERE TeamID = :TeamID";
        
                $namedParameters = array();
                $namedParameters[':TeamID'] = $ParentNode["ParentNode"];        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
                $resourceID = array();
                
                while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                        $resourceID[] = $row; // appends each row to the array. 
                }
                
                /* Grant employee member access to their new team */
                $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID )
                VALUES " . "(:EmployeeID, " . $resourceID[1]["ResourceID"] . " , " . 2 . ");} ";
        
                $namedParameters = array();
                $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
        }
        
        /****************************************Add employee to employeeteam table *********************************/
        
        if($ParentNode["ParentNode"] != NULL){ //Run if TeamID has a ParentNode *Works on all cases except root node*
                /* Adds employee to PARENTNODE team*/
                $sql = "INSERT INTO employeeteam
                (EmployeeID, TeamID, isTeamManager)
                VALUES( :EmployeeID, :TeamID, :isTeamManager)";
        
                //Sanitizing Input
                $namedParameters = array();
                $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                $namedParameters[':TeamID'] = $ParentNode["ParentNode"];
                $namedParameters[':isTeamManager'] = 0;
        
                $stmt = $conn->prepare($sql);
                $stmt->execute($namedParameters);
        }
        
        /* Adds employee to employeeteam WHERE ISTEAMMANAGER = 1 */
        $sql = "INSERT INTO employeeteam
        (EmployeeID, TeamID, isTeamManager)
        VALUES( :EmployeeID, :TeamID, :isTeamManager)";

        //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];
        $namedParameters[':isTeamManager'] = $_GET['isTeamManager'];

        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
         
} else { // else if the employee will not be the manager **************************************************************

        /* Get resource ID's for that team ID */
                
        $sql = "SELECT ResourceID FROM teamresource WHERE TeamID = :TeamID";

        $namedParameters = array();
        $namedParameters[':TeamID'] = $_GET['TeamID'];        
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        $resourceID = array();
        
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                $resourceID[] = $row; // appends each row to the array. 
        }
        
        /* Grant employee member access to their new team */
        $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID )
        VALUES " . "(:EmployeeID, " . $resourceID[1]["ResourceID"] . " , " . 2 . ");} ";

        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        
        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        
        /* Adds employee to employeeteam */
        $sql = "INSERT INTO employeeteam
        (EmployeeID, TeamID, isTeamManager)
        VALUES( :EmployeeID, :TeamID, :isTeamManager)";

        //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];
        $namedParameters[':isTeamManager'] = $_GET['isTeamManager'];

        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        
        
}        
?>