<?php

$host = 'localhost';
$dbname = 'myphpapp';
$username = 'root';
$password = 'root'; // Assuming no password set

try {
    // Establish a connection to the database using PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Set PDO to throw exceptions for error handling
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Display a success message if the connection is established
    //echo "Connected to database successfully!";
} catch (PDOException $e) {
    // If an error occurs during connection, display the error message
    echo "Connection failed: " . $e->getMessage();
}
