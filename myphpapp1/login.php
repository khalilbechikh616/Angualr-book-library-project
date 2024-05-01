<?php
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
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
// this file will be a restapi for signup
 // if the methode is POST
 if($_SERVER['REQUEST_METHOD'] == 'POST') {
    //echo "POST request detected";
    // get the data from the body of the post as a restapi
    $data = json_decode(file_get_contents('php://input'), true);
    // extract the variables from the data
    $email = $data['email'];
    $password = $data['password'];
    // check if email exists
    $check = $pdo->prepare("SELECT * FROM compte where email = ?");
    $check->execute([$email]);
    if($check->rowCount() > 0){
        // email exists, now verify password
       $user = $check->fetch(PDO::FETCH_ASSOC);
       if(password_verify($password, $user['password'])){
        // return statu code 200 for success
        http_response_code(200);
        $user = $pdo->prepare("SELECT firstName, lastName, email, telephonenumber, birthdaydate FROM compte WHERE email = ?");
        $user->execute([$email]);
        $user = $user->fetch(PDO::FETCH_ASSOC);
        echo json_encode(["user" => $user]);
        
       }
       else {
        // password is incorrect
           echo json_encode(["message" => "Incorrect password"]);
       }
    } else{
        // email does not exist
        echo json_encode(["message" => "Email not found"]);
    }







    }