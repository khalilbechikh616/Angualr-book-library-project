<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

    // Check if the required field 'id_livre' is present in the JSON data
    if (isset($data['id_livre'])) {
        // Retrieve the id_livre from the JSON data
        $id_livre = $data['id_livre'];

        try {
            // Check if the disponibilite is less than 5
            $checkSql = "SELECT disponibilite FROM livre WHERE id_livre = :id_livre";
            $stmt = $pdo->prepare($checkSql);
            $stmt->bindParam(':id_livre', $id_livre, PDO::PARAM_INT);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row && $row['disponibilite'] < 5) {
                // Increment the disponibilite by 1
                $updateSql = "UPDATE livre SET disponibilite = disponibilite + 1 WHERE id_livre = :id_livre";
                $stmt = $pdo->prepare($updateSql);
                $stmt->bindParam(':id_livre', $id_livre, PDO::PARAM_INT);
                $stmt->execute();

                // Return success message
                http_response_code(200);
                echo json_encode(array("message" => "Disponibilité updated successfully"));
            } else {
                // Return error message if disponibilite is already at maximum
                http_response_code(201);
                echo json_encode(array("message" => "Chaque livre a au maximum 5 copies"));
            }
        } catch (PDOException $e) {
            // If an error occurs during execution, display the error message
            http_response_code(500);
            echo json_encode(array("message" => "Error: " . $e->getMessage()));
        }
    } else {
        // Output error message if id_livre parameter is missing
        http_response_code(400);
        echo json_encode(array("message" => "Required parameter 'id_livre' is missing"));
    }
} else {
    // Output error message if the request method is not POST
    http_response_code(405);
    echo json_encode(array("message" => "Invalid request method"));
}
?>
