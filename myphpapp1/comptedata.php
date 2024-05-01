<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Include the database connection file
    include 'connect.php';

    // Prevent SQL Injection
    $email = $_GET['email'];

    try {
        // Prepare the SQL statement
        $stmt = $pdo->prepare("SELECT * FROM compte WHERE email = :email");

        // Bind the parameter
        $stmt->bindParam(':email', $email);

        // Execute the query
        $stmt->execute();

        // Fetch the user's profile data
        $userProfile = $stmt->fetch(PDO::FETCH_ASSOC);

        // Return the user's profile data as JSON
        echo json_encode($userProfile);
    } catch (PDOException $e) {
        // If an error occurs during the query execution, display the error message
        echo "Error fetching account details: " . $e->getMessage();
    }
}
?>
