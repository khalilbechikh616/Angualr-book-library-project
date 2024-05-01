<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode the JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if the required fields are present in the JSON data
    if (isset($data['id_livre']) && isset($data['email'])) {
        // Retrieve the id_livre and email from the JSON data
        $id_livre = $data['id_livre'];
        $email = $data['email'];

        try {
            // Begin a transaction
            $pdo->beginTransaction();

            // Check if the book has already been borrowed by the user
            $checkSql = "SELECT * FROM emprunt WHERE id_livre = :id_livre AND email = :email";
            $checkStmt = $pdo->prepare($checkSql);
            $checkStmt->bindParam(':id_livre', $id_livre, PDO::PARAM_INT);
            $checkStmt->bindParam(':email', $email, PDO::PARAM_STR);
            $checkStmt->execute();
            $existingRecord = $checkStmt->fetch();

            if ($existingRecord) {
                // Book already borrowed by the user, return error message
                http_response_code(409); // Conflict
                echo json_encode(array("message" => "You have already borrowed this book."));
            } else {
                // Prepare SQL query to insert data into emprunt table
                $insertSql = "INSERT INTO emprunt (id_livre, email) VALUES (:id_livre, :email)";

                // Prepare statement
                $stmt = $pdo->prepare($insertSql);

                // Bind parameters
                $stmt->bindParam(':id_livre', $id_livre, PDO::PARAM_INT);
                $stmt->bindParam(':email', $email, PDO::PARAM_STR);

                // Execute statement
                $stmt->execute();

                // Update disponibilite in livre table
                $updateSql = "UPDATE livre SET disponibilite = disponibilite - 1 WHERE id_livre = :id_livre";

                // Prepare update statement
                $updateStmt = $pdo->prepare($updateSql);

                // Bind id_livre parameter
                $updateStmt->bindParam(':id_livre', $id_livre, PDO::PARAM_INT);

                // Execute update statement
                $updateStmt->execute();

                // Commit the transaction
                $pdo->commit();

                // Output success message
                http_response_code(200);
                echo json_encode(array("message" => "Emprunt successful"));
            }
        } catch (PDOException $e) {
            // If an error occurs during execution, rollback the transaction and display the error message
            $pdo->rollBack();
            http_response_code(500);
            echo json_encode(array("message" => "Error: " . $e->getMessage()));
        }
    } else {
        // Output error message if id_livre or email parameter is missing
        http_response_code(400);
        echo json_encode(array("message" => "id_livre or email parameter is missing"));
    }
} else {
    // Output error message if the request method is not POST
    http_response_code(405);
    echo json_encode(array("message" => "Invalid request method"));
}
?>
