<?php
require 'connect.php';

/* tis table will contain rent details 
CREATE TABLE `emprunt` (
  `id_livre` int DEFAULT NULL,
  `id_utilisateur` int DEFAULT NULL,
  `date_emprunt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_retour` date DEFAULT NULL
)
and with it i will work in this file */
 switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
    //get  the id from the get request 
    $id = $_GET['id'];
    $sql= "SELECT * FROM emprunt WHERE id_livre = $id";
    $result = $pdo->query($sql);
    if($result->rowCount() > 0) {
        $rows = $result->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($rows);
    }
    else {
        echo json_encode(["message" => "No rent found"]);
    }
    case 'POST':
        // get the raw posted data the user and the id book from the body of the post reuest
        $data = json_decode(file_get_contents('php://input'), true);
        $id_livre = $data['id_livre'];
            $id_utilisateur = $data['id_utilisateur'];
            $sql = "INSERT INTO emprunt (id_livre, id_utilisateur) VALUES (:id_livre, :id_utilisateur)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':id_livre', $id_livre);
            $stmt->bindParam(':id_utilisateur', $id_utilisateur);
            if($stmt->execute()){
                http_response_code(200);
                echo json_encode(["message" => "Rent request successful"]);
            }else {
                // retrun http code for failiure  to insert 
                http_response_code(400);
                echo json_encode(["message" => "Rent request failed"]);
            }}