<?php
// Include the connect.php file to establish the database connection
require 'connect.php';

// Switch method for GET or POST request
switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        // Get the raw posted data
        $raw_data = file_get_contents('php://input');
        // Decode the raw data to an array
        $data = json_decode($raw_data, true);
        
        // Retrieve all data from the array
        $titre = $data['titre'];
        $auteur = $data['auteur'];
        $nomcategorie = $data['nomcategorie'];
        $disponibilite = $data['disponibilite'];
        $code_image = $data['code_image'];
        $pdf_link = $data['pdf_link'];
        
        // Insert data into the database
        $stmt = $pdo->prepare("INSERT INTO livre (titre, auteur, nomcategorie, disponibilite, code_image, pdf_link) VALUES (:titre, :auteur, :nomcategorie, :disponibilite, :code_image, :pdf_link)");
        $stmt->bindParam(':titre', $titre);  
        $stmt->bindParam(':auteur', $auteur);
        $stmt->bindParam(':nomcategorie', $nomcategorie);
        $stmt->bindParam(':disponibilite', $disponibilite);
        $stmt->bindParam(':code_image', $code_image);
        $stmt->bindParam(':pdf_link', $pdf_link);
        
        try {
            $stmt->execute();
            http_response_code(201);
            echo json_encode(["message" => "Livre ajouté avec succès"]);
        } catch (PDOException $e) {
            // Error handling
            http_response_code(500);
            echo json_encode(["message" => "Erreur lors de l'ajout du livre: " . $e->getMessage()]);
        }
        break;
}
?>
