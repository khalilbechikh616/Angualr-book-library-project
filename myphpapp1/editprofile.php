<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include the database connection file
    include 'connect.php';

    // Get data from the request body
    $data = json_decode(file_get_contents("php://input"));

    // Extract data from the request
    $email = isset($data->email) ? $data->email : null;
    $new_firstname = isset($data->firstName) ? $data->firstName : null;
    $new_lastname = isset($data->lastName) ? $data->lastName : null;
    $new_email = isset($data->email) ? $data->email : null;
    $new_telephonenumber = isset($data->phoneNumber) ? $data->phoneNumber : null;
    $new_password = isset($data->password) ? $data->password : null;

    try {
        // Prepare the SQL statement
        $sql = "UPDATE compte SET ";
        $params = array();
        
        // Append each field to update to the SQL statement if it's not null
        if (!is_null($new_firstname)) {
            $sql .= "Firstname = ?, ";
            $params[] = $new_firstname;
        }
        if (!is_null($new_lastname)) {
            $sql .= "Lastname = ?, ";
            $params[] = $new_lastname;
        }
        if (!is_null($new_telephonenumber)) {
            $sql .= "telephonenumber = ?, ";
            $params[] = $new_telephonenumber;
        }
        if (!is_null($new_password)) {
            // Check if a new password is provided
            if ($new_password !== '') {
                $sql .= "password = ?, ";
                $params[] = password_hash($new_password, PASSWORD_DEFAULT); // Hash the new password
            }
        }

        // Remove the trailing comma and space
        $sql = rtrim($sql, ', ');

        // Add WHERE clause
        $sql .= " WHERE email = ?";

        // Prepare the SQL statement
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        foreach ($params as $key => $value) {
            $stmt->bindValue($key + 1, $value);
        }
        $stmt->bindValue(count($params) + 1, $email);

        // Execute the query
        $stmt->execute();

        // Check if the query was successful
        if ($stmt->rowCount() > 0) {
            // Return success message
            echo json_encode(array("message" => "Account updated successfully"));
        } else {
            // Return error message
            echo json_encode(array("message" => "Failed to update account"));
        }
    } catch (PDOException $e) {
        // If an error occurs during the query execution, display the error message
        echo json_encode(array("message" => "Error updating account: " . $e->getMessage()));
    }
}
?>
