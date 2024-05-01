<?php
//creat a header to alllw all origin and methods
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type');

require 'connect.php';

 if($_SERVER['REQUEST_METHOD'] == 'POST') {
   // echo the data that is posted as json 
   //echo "POST request detected";
   
$data = json_decode(file_get_contents('php://input'),true);
//echo json_decode(file_get_contents('php://input'),true);

   
    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $email = $data['email'];
    $password = $data['password'];
    $telephonenumber = $data['telephone'];
    $birthdaydate = $data['birthdaydate'];
   
   
    $check = $pdo->prepare("SELECT * FROM compte where email = ?");
    $check->execute([$email]);
   
    if($check->rowCount() > 0){

        echo json_encode(["message" => "Email already exists"]);
    }
    else {
      
        // hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        // insert the new user in the database
        $insert = $pdo->prepare("INSERT INTO compte (Firstname, Lastname, email, password, telephonenumber, birthdaydate) VALUES (?,?,?,?,?,?)");
        $insert->execute([$firstname, $lastname, $email, $hashedPassword, $telephonenumber, $birthdaydate]);
        // retrun statut 201 for created
        http_response_code(200);
        // retrun the data of the user created 
        $user = $pdo->prepare("SELECT firstName, lastName, email, telephonenumber, birthdaydate FROM compte WHERE email = ?");
        $user->execute([$email]);
        $user = $user->fetch(PDO::FETCH_ASSOC);
        echo json_encode(["user" => $user]);
    }}