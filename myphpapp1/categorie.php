<?php
/*CREATE TABLE categorie (
    nomcategorie VARCHAR(100) PRIMARY KEY
    link_img TEXT
);*/
require_once 'connect.php'; // Include the connect.php file
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
// Get all the categories
$sql = "SELECT * FROM categorie";
// Prepare statement
$stmt = $pdo->prepare($sql);
    // Execute the statement
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
break;
case 'POST':
        // Get the JSON data from the request body
        $data = json_decode(file_get_contents('php://input'), true);
    
        // Insert the new category
        $sql = "INSERT INTO categorie (nomcategorie, link_img) VALUES (:nomcategorie, :link_img)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':nomcategorie', $data['nomcategorie']);
        $stmt->bindParam(':link_img', $data['link_img']);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(array('message' => 'Category added successfully'));
        } else {
            echo json_encode(array('message' => 'Error adding category'));
        }
    
break;
case 'DELETE':
    $data = json_decode(file_get_contents('php://input'), true);
    $nomcategory=$data['nomcategorie'];
    echo $nomcategory;
    // Delete the category
    $sql= "DELETE FROM categorie WHERE nomcategorie = :nomcategorie";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nomcategorie', $nomcategory);
     $stmt->execute();
   if ($stmt->rowCount() > 0) {
        echo json_encode(array('message' => 'Category deleted successfully'));
    } else {
        echo json_encode(array('message' => 'Error deleting category'));
    }


    break;


};