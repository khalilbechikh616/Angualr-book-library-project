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
        // Prepare the SQL statement to select only firstname and lastname
        $stmt = $pdo->prepare("SELECT Firstname, Lastname FROM compte WHERE email = :email");

        // Bind the parameter
        $stmt->bindParam(':email', $email);

        // Execute the query
        $stmt->execute();

        // Fetch the user's first name and last name
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if data is fetched
        if ($userData) {
            // Return the user's first name and last name as JSON
            echo json_encode($userData);
        } else {
            // If no data is found for the email, return an error
            echo json_encode(array("error" => "No data found for the email"));
        }
    } catch (PDOException $e) {
        // If an error occurs during the query execution, display the error message
        echo json_encode(array("error" => "Error fetching account details: " . $e->getMessage()));
    }
}
?>
