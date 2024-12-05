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
    if (isset($data['email']) && isset($data['titre']) && isset($data['auteur']) && isset($data['link_image'])) {
        // Retrieve the email, titre, auteur, and link_image from the JSON data
        $email = $data['email'];
        $titre = $data['titre'];
        $auteur = $data['auteur'];
        $link_image = $data['link_image'];

        try {
            // Prepare SQL query to insert data into historique table
            $insertSql = "INSERT INTO historique (email, titre, auteur, link_image) VALUES (:email, :titre, :auteur, :link_image)";

            // Prepare statement
            $stmt = $pdo->prepare($insertSql);

            // Bind parameters
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':titre', $titre, PDO::PARAM_STR);
            $stmt->bindParam(':auteur', $auteur, PDO::PARAM_STR);
            $stmt->bindParam(':link_image', $link_image, PDO::PARAM_STR);

            // Execute statement
            $stmt->execute();

            // Output success message
            http_response_code(200);
            echo json_encode(array("message" => "Data inserted into historique table successfully"));
        } catch (PDOException $e) {
            // If an error occurs during execution, display the error message
            http_response_code(500);
            echo json_encode(array("message" => "Error: " . $e->getMessage()));
        }
    } else {
        // Output error message if any required parameter is missing
        http_response_code(400);
        echo json_encode(array("message" => "Required parameter is missing"));
    }
} else {
    // Output error message if the request method is not POST
    http_response_code(405);
    echo json_encode(array("message" => "Invalid request method"));
}
?>
