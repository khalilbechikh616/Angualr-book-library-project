<?php
// Include the database connection file
require 'connect.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // get the data from the POST request body
    $data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];

    // Prepare a SQL statement to check if the email exists in the compte table
    $sql_check = "SELECT * FROM compte WHERE email = ?";
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->execute([$email]);
    $compte = $stmt_check->fetch();

    // If the compte with the given email exists, delete it
    if ($compte) {
        // Prepare a SQL statement to delete the compte based on the email
        $sql_delete = "DELETE FROM compte WHERE email = ?";
        $stmt_delete = $pdo->prepare($sql_delete);

        // Bind parameters
        $stmt_delete->bindParam(1, $email);

        // Execute the SQL statement
        if ($stmt_delete->execute()) {
            // Return a success message
            echo json_encode(["message" => "Compte deleted successfully"]);
        } else {
            // Return an error message
            echo json_encode(["error" => "Error deleting compte"]);
        }
    } else {
        // Echo a message indicating that the email was not found
        echo json_encode(["error" => "Email not found"]);
    }
}
?>
