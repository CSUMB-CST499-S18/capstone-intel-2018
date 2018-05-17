<?php
header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN'] . "");
include 'dbConnection.php';

$conn = getDatabaseConnection();

/******************* DROP ALL TABLES *********************/

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

/******************** ADD TABLES *********************/

$sql = "-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: us-cdbr-iron-east-05.cleardb.net
-- Generation Time: May 17, 2018 at 11:22 PM
-- Server version: 5.6.36-log
-- PHP Version: 5.5.9-1ubuntu4.22

SET SQL_MODE = `NO_AUTO_VALUE_ON_ZERO`;
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = `+00:00`;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heroku_8896a2ab41724d1`
--

-- --------------------------------------------------------

--
-- Table structure for table `accesstype`
--

CREATE TABLE `accesstype` (
  `AccessID` smallint(6) NOT NULL,
  `AType` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accesstype`
--

INSERT INTO `accesstype` (`AccessID`, `AType`) VALUES
(1, 'Owner'),
(2, 'Member'),
(3, 'Visitor');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `EmployeeID` smallint(6) NOT NULL,
  `Name` varchar(40) DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `Email` varchar(40) DEFAULT NULL,
  `Salary` int(11) DEFAULT NULL,
  `isManager` tinyint(1) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`EmployeeID`, `Name`, `Phone`, `Email`, `Salary`, `isManager`, `isActive`) VALUES
(1, 'Sathya Narayanan', 2147483647, 'snarayanan@csumb.edu', 100000, 1, 1),
(11, 'Paige Weisskirch', 2147483647, 'pweisskirch@csumb.edu', 85000, 1, 1),
(21, 'Glenn Bruns', 2147483647, 'gbruns@csumb.edu', 90000, 1, 1),
(31, 'Bude Su', 2147483647, 'bsu@csumb.edu', 110000, 1, 1),
(41, 'Jason Henderson', 2147483647, 'jhenderson@csumb.edu', 95000, 1, 1),
(51, 'YoungJoon Byun', 1234567890, 'ybyun@csumb.edu', 120000, 1, 1),
(61, 'Avner Biblarz', 2147483647, 'abiblarz@csumb.edu', 80000, 1, 1),
(71, 'Eric Tao', 2147483647, 'etao@csumb.edu', 78000, 0, 1),
(81, 'Kevin Cahill', 1659784612, 'kcahill@csumb.edu', 92000, 0, 1),
(91, 'Johnathan Shu', 1456987452, 'jshu@csumb.edu', 80000, 0, 1),
(101, 'Michael McCann', 831654895, 'mmcann@csumb.edu', 72000, 0, 1),
(111, 'Karen Wisdom', 2147483647, 'kwisdom@csumb.edu', 102000, 0, 1),
(121, 'Michael Wood', 2147483647, 'mwood@csumb.edu', 65000, 0, 1),
(131, 'Kathrine Green', 2147483647, 'kgreen@csumb.edu', 61000, 0, 1),
(141, 'Miguel Lara', 2147483647, 'mlara@csumb.edu', 104000, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employeeresource`
--

CREATE TABLE `employeeresource` (
  `EmployeeID` smallint(6) DEFAULT NULL,
  `ResourceID` smallint(6) DEFAULT NULL,
  `AccessID` smallint(6) DEFAULT NULL,
  `TeamID` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employeeresource`
--

INSERT INTO `employeeresource` (`EmployeeID`, `ResourceID`, `AccessID`, `TeamID`) VALUES
(21, 101, 3, 21),
(21, 111, 3, 21),
(21, 121, 3, 21),
(21, 131, 3, 21),
(21, 41, 1, 21),
(21, 51, 1, 21),
(21, 11, 2, 21),
(31, 61, 1, 31),
(31, 71, 1, 31),
(31, 31, 2, 31),
(41, 81, 1, 41),
(41, 91, 1, 41),
(41, 31, 2, 41),
(51, 101, 1, 51),
(51, 111, 1, 51),
(51, 51, 2, 51),
(61, 121, 1, 61),
(61, 131, 1, 61),
(61, 51, 2, 61),
(71, 71, 2, 31),
(81, 71, 2, 31),
(101, 91, 2, 41),
(111, 111, 2, 51),
(121, 111, 2, 51),
(131, 131, 2, 61),
(141, 131, 2, 61),
(91, 91, 2, 41),
(11, 61, 3, 11),
(11, 71, 3, 11),
(11, 81, 3, 11),
(11, 91, 3, 11),
(11, 21, 1, 11),
(11, 31, 1, 11),
(11, 11, 2, 11),
(1, 21, 3, 1),
(1, 31, 3, 1),
(1, 41, 3, 1),
(1, 51, 3, 1),
(1, 61, 3, 1),
(1, 71, 3, 1),
(1, 81, 3, 1),
(1, 91, 3, 1),
(1, 101, 3, 1),
(1, 111, 3, 1),
(1, 121, 3, 1),
(1, 131, 3, 1),
(1, 1, 1, 1),
(1, 11, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employeeteam`
--

CREATE TABLE `employeeteam` (
  `EmployeeID` smallint(6) DEFAULT NULL,
  `TeamID` smallint(6) DEFAULT NULL,
  `isTeamManager` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employeeteam`
--

INSERT INTO `employeeteam` (`EmployeeID`, `TeamID`, `isTeamManager`) VALUES
(21, 1, 0),
(21, 21, 1),
(31, 11, 0),
(31, 31, 1),
(41, 11, 0),
(41, 41, 1),
(51, 21, 0),
(51, 51, 1),
(61, 21, 0),
(61, 61, 1),
(71, 31, 0),
(81, 31, 0),
(101, 41, 0),
(111, 51, 0),
(121, 51, 0),
(131, 61, 0),
(141, 61, 0),
(91, 41, 0),
(11, 1, 0),
(11, 11, 1),
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `logentry`
--

CREATE TABLE `logentry` (
  `LogID` int(11) NOT NULL,
  `Action` varchar(200) DEFAULT NULL,
  `TimeStp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `TeamID` smallint(6) DEFAULT NULL,
  `EmployeeID` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `parentteam`
--

CREATE TABLE `parentteam` (
  `ParentTeam` smallint(6) NOT NULL DEFAULT '0',
  `ChildTeams` varchar(120) DEFAULT NULL,
  `ParentNode` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parentteam`
--

INSERT INTO `parentteam` (`ParentTeam`, `ChildTeams`, `ParentNode`) VALUES
(1, '11,21,31,41,51,61', ''),
(11, '31,41', '1'),
(21, '51,61', '1'),
(31, '', '11'),
(41, '', '11'),
(51, '', '21'),
(61, '', '21');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `ResourceID` smallint(6) NOT NULL,
  `Location` varchar(120) DEFAULT NULL,
  `TypeID` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`ResourceID`, `Location`, `TypeID`) VALUES
(1, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Manager%20Docs/Forms/AllItems.aspx', 1),
(11, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Shared%20Documents/Forms/AllItems.aspx', 2),
(21, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Dir1/Manager%20Docs/Forms/AllItems.aspx', 1),
(31, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Dir1/Shared%20Documents/Forms/AllItems.aspx', 2),
(41, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/DirTeam2/Manager%20Docs/Forms/AllItems.aspx', 1),
(51, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/DirTeam2/Shared%20Documents/Forms/AllItems.aspx', 2),
(61, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Dir1/ProjTeam1/Manager%20Docs/Forms/AllItems.aspx', 1),
(71, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Dir1/ProjTeam1/Shared%20Documents/Forms/AllItems.aspx', 2),
(81, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Dir1/ProjTeam2/Manager%20Docs/Forms/AllItems.aspx', 1),
(91, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/Dir1/ProjTeam2/Shared%20Documents/Forms/AllItems.aspx', 2),
(101, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/DirTeam2/ProjTeam3/Manager%20Docs/Forms/AllItems.aspx', 1),
(111, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/DirTeam2/ProjTeam3/Shared%20Documents/Forms/AllItems.aspx', 2),
(121, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/DirTeam2/HRTeam/Manager%20Docs/Forms/AllItems.aspx', 1),
(131, 'https://csumbcapstone.sharepoint.com/sites/CompanyA/VP/DirTeam2/HRTeam/Shared%20Documents/Forms/AllItems.aspx', 2);

-- --------------------------------------------------------

--
-- Table structure for table `resourcetype`
--

CREATE TABLE `resourcetype` (
  `TypeID` smallint(6) NOT NULL,
  `RType` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `resourcetype`
--

INSERT INTO `resourcetype` (`TypeID`, `RType`) VALUES
(1, 'Manager'),
(2, 'Staff');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `TeamID` smallint(6) NOT NULL,
  `TeamName` varchar(40) DEFAULT NULL,
  `hasManager` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`TeamID`, `TeamName`, `hasManager`) VALUES
(1, 'VP Site', 1),
(11, 'DIR1', 1),
(21, 'DIR2', 1),
(31, 'Proj1', 1),
(41, 'Proj2', 1),
(51, 'Proj3', 1),
(61, 'Human Resources', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teamresource`
--

CREATE TABLE `teamresource` (
  `TeamID` smallint(6) DEFAULT NULL,
  `ResourceID` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teamresource`
--

INSERT INTO `teamresource` (`TeamID`, `ResourceID`) VALUES
(1, 1),
(1, 11),
(11, 21),
(11, 31),
(21, 41),
(21, 51),
(31, 61),
(31, 71),
(41, 81),
(41, 91),
(51, 101),
(51, 111),
(61, 121),
(61, 131);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accesstype`
--
ALTER TABLE `accesstype`
  ADD PRIMARY KEY (`AccessID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EmployeeID`);

--
-- Indexes for table `employeeresource`
--
ALTER TABLE `employeeresource`
  ADD KEY `EmployeeID` (`EmployeeID`),
  ADD KEY `ResourceID` (`ResourceID`),
  ADD KEY `AccessID` (`AccessID`),
  ADD KEY `TeamID` (`TeamID`);

--
-- Indexes for table `employeeteam`
--
ALTER TABLE `employeeteam`
  ADD KEY `EmployeeID` (`EmployeeID`),
  ADD KEY `TeamID` (`TeamID`);

--
-- Indexes for table `logentry`
--
ALTER TABLE `logentry`
  ADD PRIMARY KEY (`LogID`),
  ADD KEY `TeamID` (`TeamID`),
  ADD KEY `EmployeeID` (`EmployeeID`);

--
-- Indexes for table `parentteam`
--
ALTER TABLE `parentteam`
  ADD PRIMARY KEY (`ParentTeam`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`ResourceID`),
  ADD KEY `TypeID` (`TypeID`);

--
-- Indexes for table `resourcetype`
--
ALTER TABLE `resourcetype`
  ADD PRIMARY KEY (`TypeID`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`TeamID`);

--
-- Indexes for table `teamresource`
--
ALTER TABLE `teamresource`
  ADD KEY `TeamID` (`TeamID`),
  ADD KEY `ResourceID` (`ResourceID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `EmployeeID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `logentry`
--
ALTER TABLE `logentry`
  MODIFY `LogID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `ResourceID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `TeamID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employeeresource`
--
ALTER TABLE `employeeresource`
  ADD CONSTRAINT `employeeresource_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`),
  ADD CONSTRAINT `employeeresource_ibfk_2` FOREIGN KEY (`ResourceID`) REFERENCES `resources` (`ResourceID`),
  ADD CONSTRAINT `employeeresource_ibfk_3` FOREIGN KEY (`AccessID`) REFERENCES `accesstype` (`AccessID`);

--
-- Constraints for table `employeeteam`
--
ALTER TABLE `employeeteam`
  ADD CONSTRAINT `employeeteam_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`),
  ADD CONSTRAINT `employeeteam_ibfk_2` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`);

--
-- Constraints for table `logentry`
--
ALTER TABLE `logentry`
  ADD CONSTRAINT `logentry_ibfk_1` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`),
  ADD CONSTRAINT `logentry_ibfk_2` FOREIGN KEY (`EmployeeID`) REFERENCES `employee` (`EmployeeID`);

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_ibfk_1` FOREIGN KEY (`TypeID`) REFERENCES `resourcetype` (`TypeID`);

--
-- Constraints for table `teamresource`
--
ALTER TABLE `teamresource`
  ADD CONSTRAINT `teamresource_ibfk_1` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`),
  ADD CONSTRAINT `teamresource_ibfk_2` FOREIGN KEY (`ResourceID`) REFERENCES `resources` (`ResourceID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
";

$stmt = $conn->prepare($sql);
$stmt->execute();

?>