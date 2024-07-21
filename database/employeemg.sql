-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 10:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employeemg`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `id`) VALUES
('admin', 'admin', 1);

-- --------------------------------------------------------

--
-- Table structure for table `are_manager`
--

CREATE TABLE `are_manager` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `are_manager`
--

INSERT INTO `are_manager` (`id`, `name`) VALUES
(1, 'John Doe'),
(2, 'John wick');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `branch_address` varchar(255) NOT NULL,
  `area_manager_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `branch_name`, `branch_address`, `area_manager_id`) VALUES
(1, 'Downtown', '123 Main St', 1),
(2, 'Uptown', '456 Elm St', 2),
(3, 'Central Branch', '385 A E', 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'IT'),
(2, 'Management'),
(3, 'Finance'),
(4, 'HR'),
(5, 'Marketing');

-- --------------------------------------------------------

--
-- Table structure for table `cycle`
--

CREATE TABLE `cycle` (
  `id` int(11) NOT NULL,
  `closing_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cycle`
--

INSERT INTO `cycle` (`id`, `closing_date`) VALUES
(1, '2024-01-31'),
(3, '2024-07-18');

-- --------------------------------------------------------

--
-- Table structure for table `dependent`
--

CREATE TABLE `dependent` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `birth` date NOT NULL,
  `relationship` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dependent`
--

INSERT INTO `dependent` (`id`, `employee_id`, `name`, `gender`, `birth`, `relationship`) VALUES
(1, 1, 'Jane Doe', 'Female', '2010-05-15', 'Daughter'),
(4, 1, 'Oliver', 'Male', '2005-10-11', 'son');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `birth` date NOT NULL,
  `civil_status` enum('Single','Married','Divorced','Widowed') NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `position` varchar(100) NOT NULL,
  `start_date` date NOT NULL,
  `grade` varchar(50) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `appointment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `address`, `gender`, `birth`, `civil_status`, `branch_id`, `position`, `start_date`, `grade`, `category_id`, `appointment_date`) VALUES
(1, 'BenTen', '1234 Main St', 'Male', '2000-01-12', 'Married', 1, 'Technician', '2023-01-01', '3', 1, '2023-01-01'),
(5, 'gwen', '456 ALM', 'Male', '1999-10-10', 'Single', 1, 'Sales Management', '2024-01-01', '4', 2, '2024-01-01'),
(6, 'chamila', '456 ALM', 'Female', '2000-10-12', 'Single', 2, 'Sales Management', '2024-01-01', '4', 2, '2024-01-01');

-- --------------------------------------------------------

--
-- Table structure for table `transfer_request`
--

CREATE TABLE `transfer_request` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `request_date` date NOT NULL,
  `title` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `transferposition` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  `cycle_id` int(11) NOT NULL,
  `hr_decision` varchar(50) DEFAULT NULL,
  `hr_comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transfer_request`
--

INSERT INTO `transfer_request` (`id`, `employee_id`, `description`, `request_date`, `title`, `type`, `transferposition`, `status`, `cycle_id`, `hr_decision`, `hr_comment`) VALUES
(2, 1, 'Request for transfer to another department', '2024-07-15', 'Technician', 'Internal Transfer', 'Senior Technician', 'Pending', 1, 'Approved', 'This transfer request is approved based on performance.');

-- --------------------------------------------------------

--
-- Table structure for table `transfer_schedule`
--

CREATE TABLE `transfer_schedule` (
  `id` int(11) NOT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `employee_name` varchar(255) DEFAULT NULL,
  `employee_address` varchar(255) DEFAULT NULL,
  `employee_birth` date DEFAULT NULL,
  `employee_position` varchar(100) DEFAULT NULL,
  `present_branch` varchar(100) DEFAULT NULL,
  `employee_start_date` date DEFAULT NULL,
  `employee_grade` varchar(50) DEFAULT NULL,
  `period` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `transfer_branch` varchar(100) DEFAULT NULL,
  `hr_comment` text DEFAULT NULL,
  `comment_1` varchar(255) DEFAULT NULL,
  `comment_2` varchar(255) DEFAULT NULL,
  `comment_3` varchar(255) DEFAULT NULL,
  `final_decision` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transfer_schedule`
--

INSERT INTO `transfer_schedule` (`id`, `branch_id`, `employee_id`, `employee_name`, `employee_address`, `employee_birth`, `employee_position`, `present_branch`, `employee_start_date`, `employee_grade`, `period`, `description`, `transfer_branch`, `hr_comment`, `comment_1`, `comment_2`, `comment_3`, `final_decision`) VALUES
(7, 1, 1, 'BenTen', '1234 Main St', '2000-01-11', 'Technician', 'Downtown', '2022-12-31', '3', '1 years, 6 months, and 17 days', 'Request for transfer to another department', 'Uptown', 'This transfer request is approved based on performance.', 'Eligible, needs training', 'Eligible, needs training', 'Eligible', 'ok');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `are_manager`
--
ALTER TABLE `are_manager`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_area_manager` (`area_manager_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cycle`
--
ALTER TABLE `cycle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dependent`
--
ALTER TABLE `dependent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `transfer_request`
--
ALTER TABLE `transfer_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `cycle_id` (`cycle_id`);

--
-- Indexes for table `transfer_schedule`
--
ALTER TABLE `transfer_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch_id` (`branch_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `are_manager`
--
ALTER TABLE `are_manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cycle`
--
ALTER TABLE `cycle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dependent`
--
ALTER TABLE `dependent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transfer_request`
--
ALTER TABLE `transfer_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transfer_schedule`
--
ALTER TABLE `transfer_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `fk_area_manager` FOREIGN KEY (`area_manager_id`) REFERENCES `are_manager` (`id`);

--
-- Constraints for table `dependent`
--
ALTER TABLE `dependent`
  ADD CONSTRAINT `dependent_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `transfer_request`
--
ALTER TABLE `transfer_request`
  ADD CONSTRAINT `transfer_request_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `transfer_request_ibfk_2` FOREIGN KEY (`cycle_id`) REFERENCES `cycle` (`id`);

--
-- Constraints for table `transfer_schedule`
--
ALTER TABLE `transfer_schedule`
  ADD CONSTRAINT `transfer_schedule_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`),
  ADD CONSTRAINT `transfer_schedule_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
