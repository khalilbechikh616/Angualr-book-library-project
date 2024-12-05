<?php
require 'connect.php';
/* this the table that i will work on it in all of this file CREATE TABLE compte (
    id_compte INT AUTO_INCREMENT PRIMARY KEY,
    Firstname VARCHAR(50) NOT NULL,
    Lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    telephonenumber VARCHAR(20) NOT NULL,
    birthdaydate DATE NOT NULL
      INDEX (email),           -- Add index on 'email' column
    INDEX (password)
);*/
// this file will be a restapi for account management
// if the methode is GET    
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
   if (isset($_GET['id_utilisateur'])){
    $id_utilisateur = $_GET['id_utilisateur'];
       $sql = "SELECT * FROM utilisateur WHERE id_utilsateur = ?";
       $stmt = $pdo->prepare($sql);
       $stmt->execute([$id_utilisateur]);
       $result = $stmt->fetch(PDO::FETCH_ASSOC);
       echo json_encode($result);
   }

   else if (empty($_GET)){
    $sql = "SELECT * FROM utilisateur";
       $stmt = $pdo->query($sql);
       $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
       echo json_encode($result);}
       break;
       case 'DELETE':
        if(isset($_GET['id_compte'])){
            $id_compte = $_GET['id_compte'];
            $sql = "DELETE FROM compte WHERE id_compte = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id_compte]);
            if($stmt->rowCount() > 0){
                http_response_code(201);
                echo json_encode(["message" => "Account deleted successfully"]);
            }else  {
                http_response_code(400);
            }}
        break;
        case  'PUT' :
    
            // Get the JSON data from the request body
            $data = json_decode(file_get_contents("php://input"), true);
            
            // Initialize an empty array to store the fields to update
            $fieldsToUpdate = array();
            
            // Check if each field exists in the request data and is not null, then add it to the fields to update
            if (isset($data['Firstname']) && $data['Firstname'] !== null) {
                $fieldsToUpdate[] = 'Firstname = :Firstname';
            }
            if (isset($data['Lastname']) && $data['Lastname'] !== null) {
                $fieldsToUpdate[] = 'Lastname = :Lastname';
            }
            if (isset($data['email']) && $data['email'] !== null) {
                $fieldsToUpdate[] = 'email = :email';
            }
            if (isset($data['password']) && $data['password'] !== null) {
                $fieldsToUpdate[] = 'password = :password';
            }
            if (isset($data['telephonenumber']) && $data['telephonenumber'] !== null) {
                $fieldsToUpdate[] = 'telephonenumber = :telephonenumber';
            }
            
            // If there are fields to update, construct the SQL query
            if (!empty($fieldsToUpdate)) {
                $sql = "UPDATE compte SET " . implode(", ", $fieldsToUpdate) . " WHERE id_compte = :id_compte";
                
                // You should include your database connection here
                
                // Prepare the SQL statement
                $stmt = $pdo->prepare($sql);
                
                // Bind parameters
                if (isset($data['Firstname'])) {
                    $stmt->bindParam(':Firstname', $data['Firstname']);
                }
                if (isset($data['Lastname'])) {
                    $stmt->bindParam(':Lastname', $data['Lastname']);
                }
                if (isset($data['email'])) {
                    $stmt->bindParam(':email', $data['email']);
                }
                if (isset($data['password'])) {
                    $stmt->bindParam(':password', $data['password']);
                }
                if (isset($data['telephonenumber'])) {
                    $stmt->bindParam(':telephonenumber', $data['telephonenumber']);
                }
                
                // Bind the id_compte parameter
                $stmt->bindParam(':id_compte', $data['id_compte']);
                
                // Execute the statement
                if ($stmt->execute()) {
                    // If update successful, return success message
                    http_response_code(200);
                    echo json_encode(array("message" => "Compte updated successfully."));
                } else {
                    // If update fails, return error message
                    http_response_code(500);
                    echo json_encode(array("message" => "Unable to update compte."));
                }
            } else {
                // If no fields to update, return error message
                http_response_code(400);
                echo json_encode(array("message" => "No fields to update."));
            }
        
        break;


default : echo json_encode(array("message" => "Invalid request method"));
        }



