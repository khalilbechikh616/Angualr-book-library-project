<?php
require 'connect.php';
/* i will work with this table in this file CREATE TABLE livre (
    id_livre INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    auteur VARCHAR(255) NOT NULL,
    nomcategorie VARCHAR(100),
    disponibilite INT,
    code_image TEXT,
    pdf_link VARCHAR(255),
    FOREIGN KEY (nomcategorie) REFERENCES categorie(nomcategorie)*/
// swithc mthoe for get or post request
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
    // chek if the request is empty
if(empty($_GET)){
  //return all books
  $stmt = $pdo->prepare("SELECT * FROM livre");
  $stmt->execute();
  // fetch results as associative array
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($results);
}
else if (isset($_GET['titre'])) {
$titre = strtolower($_GET['titre']);
$stmt = $pdo->prepare("SELECT * FROM livre WHERE LOWER(titre) = :titre");
$stmt->bindParam(':titre', $titre);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
} else if (isset($_GET['auteur'])) {
$auteur = strtolower($_GET['auteur']);
$stmt = $pdo->prepare("SELECT * FROM livre WHERE LOWER(auteur) = :auteur");
$stmt->bindParam(':auteur', $auteur);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
} else if (isset($_GET['nomcategorie'])) {
$stmt = $pdo->prepare("SELECT * FROM livre WHERE nomcategorie = :nomcategorie");
$stmt->bindParam(':nomcategorie', $_GET['nomcategorie']);
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($results);
}

    break;
    case 'POST':
      // get the raw posted data
      $raw_data = file_get_contents('php://input');
      // decode the raw data to an array
      $data = json_decode($raw_data, true);
  
      // retrieve all data from array
      $titre = $data['titre'];
      $auteur = $data['auteur'];
      $nomcategorie = $data['nomcategorie'];
      $disponibilite = $data['disponibilite'];
      $link_image = $data['link_image'];
      $pdf_link = $data['pdf_link'];
  
      // insert data into database using prepared statement
      $stmt = $pdo->prepare("INSERT INTO livre (titre, auteur, nomcategorie, disponibilite, link_image, pdf_link) 
                             VALUES (:titre, :auteur, :nomcategorie, :disponibilite, :link_image, :pdf_link)");
      $stmt->bindParam(':titre', $titre);
      $stmt->bindParam(':auteur', $auteur);
      $stmt->bindParam(':nomcategorie', $nomcategorie);
      $stmt->bindParam(':disponibilite', $disponibilite);
      $stmt->bindParam(':link_image', $link_image);
      $stmt->bindParam(':pdf_link', $pdf_link);
  
      if ($stmt->execute()) {
          http_response_code(201);
          echo json_encode(["message" => "Livre ajouté avec succès"]);
      } else {
          http_response_code(500);
          echo json_encode(["error" => "Erreur lors de l'ajout du livre"]);
      }
      break;
      case 'DELETE':
        // get id of book to delete from the body of the request
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        // delete book from database
        $stmt = $pdo->prepare("DELETE FROM livre WHERE id_livre = :id");
        $stmt->bindParam(':id', $id);
        if($stmt->execute()){
            http_response_code(200); // Change status code to 200 if deletion is successful
            echo json_encode(["message" => "Livre supprimé avec succès"]); // Send message in French
        }
        break;
    
    }

     
