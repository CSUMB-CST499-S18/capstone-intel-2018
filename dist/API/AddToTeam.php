
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
        
        if($record != NULL){
                
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
        
        }
        $resourceID = array();
        
        while( $row = $stmt->fetch(PDO::FETCH_ASSOC) ) {
                $resourceID[] = $row; // appends each row to the array. 
        }

        /* adds VISITOR permissions to child teams */        
        $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID, TeamID)
        VALUES ";
        
        for($i = 0; $i < count($resourceID); $i++){
        $sql = $sql . "(:EmployeeID, " . $resourceID[$i]["ResourceID"] . " , " . 3 . ", :TeamID),";
        if($i == count($resourceID) - 1) {
        $sql = substr($sql, 0, -1);
        $sql = $sql . ";}";
                }
        }
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];
        
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
        $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID, TeamID)
        VALUES ";
        
        for($i = 0; $i < count($resourceID); $i++){
                $sql = $sql . "(:EmployeeID, " . $resourceID[$i]["ResourceID"] . " , " . 1 . ", :TeamID),";
                if($i == count($resourceID) - 1) {
                $sql = substr($sql, 0, -1);
                $sql = $sql . ";}";
                }
        }
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];
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
                $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID, TeamID)
                VALUES " . "(:EmployeeID, " . $resourceID[1]["ResourceID"] . " , " . 2 . ", :TeamID);} ";
        
                $namedParameters = array();
                $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
                $namedParameters[':TeamID'] = $_GET['TeamID'];
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
        
        /* Changes hasManager boolean flag in team table from NO TEAM MANAGER (0) to HAS TEAM MANAGER (1) */
        
        $sql = "UPDATE team
        SET hasManager = 1
        WHERE TeamID = :TeamID";
        
        //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':TeamID'] = $_GET['TeamID'];

        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);
        
        /* Log Entry */
        //INSERT INTO `logentry` (`LogID`, `Action`, `TimeStp`, `TeamID`, `EmployeeID`) VALUES (NULL, 'Testing', CURRENT_TIMESTAMP, '11', '1');
        
        $sql = "INSERT INTO 'logentry' ('LogID', 'Action', 'TimeStp', 'TeamID', 'EmployeeID') 
                VALUES (NULL, 'Added employee ID: :EmployeeID to team ID: :TeamID as OWNER and to team ID: " . $ParentNode["ParentNode"] . " as MEMBER.'
                , CURRENT_TIMESTAMP, :TeamID, :EmployeeID)";
                
                 //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];

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
        $sql = "INSERT INTO employeeresource ( EmployeeID, ResourceID, AccessID, TeamID)
        VALUES " . "(:EmployeeID, " . $resourceID[1]["ResourceID"] . " , " . 2 . ", :TeamID);} ";

        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];
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
        
        /* Log Entry */
        //INSERT INTO `logentry` (`LogID`, `Action`, `TimeStp`, `TeamID`, `EmployeeID`) VALUES (NULL, 'Testing', CURRENT_TIMESTAMP, '11', '1');
        
        $sql = "INSERT INTO 'logentry' ('LogID', 'Action', 'TimeStp', 'TeamID', 'EmployeeID') 
                VALUES (NULL, 'Added employee ID: :EmployeeID to team ID: :TeamID as MEMBER.', CURRENT_TIMESTAMP, :TeamID, :EmployeeID)";
                
                 //Sanitizing Input
        $namedParameters = array();
        $namedParameters[':EmployeeID'] = $_GET['EmployeeID'];
        $namedParameters[':TeamID'] = $_GET['TeamID'];

        $stmt = $conn->prepare($sql);
        $stmt->execute($namedParameters);  
        
}        
?>