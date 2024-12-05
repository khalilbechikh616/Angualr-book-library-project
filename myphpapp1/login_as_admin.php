<?php
require 'connect.php';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    $check = $pdo->prepare("SELECT * FROM admin WHERE email = ?");
    $check->execute([$email]);

    if($check->rowCount() > 0){
        $admin = $check->fetch(PDO::FETCH_ASSOC);
        if(password_verify($password, $admin['password'])){
            http_response_code(200);
            $adminData = [
                "id_admin" => $admin['id_admin'],
                "firstname" => $admin['firstname'],
                "lastname" => $admin['lastname'],
                "email" => $admin['email']
            ];
            echo json_encode(["admin" => $adminData]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(["message" => "Incorrect password"]);
        }
    } else {
        http_response_code(404); // Not Found
        echo json_encode(["message" => "Email not found"]);
    }
}
?>
