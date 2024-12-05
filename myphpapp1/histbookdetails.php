<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// method to allow preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // return only the headers and not the content
    http_response_code(204);
    return;
}

// require the connect file to connect to the database
require_once 'connect.php';

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the required parameter 'email' is provided in the query string
    if (isset($_GET['email'])) {
        // Retrieve the email from the query string
        $email = $_GET['email'];

        try {
            // Prepare SQL query to fetch data from historique table based on email
            $selectSql = "SELECT titre, auteur, link_image FROM historique WHERE email = :email";

            // Prepare statement
            $stmt = $pdo->prepare($selectSql);

            // Bind parameters
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);

            // Execute statement
            $stmt->execute();

            // Fetch data
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Output fetched data
            http_response_code(200);
            echo json_encode($result);
        } catch (PDOException $e) {
            // If an error occurs during execution, display the error message
            http_response_code(500);
            echo json_encode(array("message" => "Error: " . $e->getMessage()));
        }
    } else {
        // Output error message if email parameter is missing
        http_response_code(400);
        echo json_encode(array("message" => "Required parameter 'email' is missing"));
    }
} else {
    // Output error message if the request method is not GET
    http_response_code(405);
    echo json_encode(array("message" => "Invalid request method"));
}
?>
