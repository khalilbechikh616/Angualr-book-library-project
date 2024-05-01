<?php
// Include the database connection file
require_once 'connect.php';

try {
    // Check if the titre parameter is provided in the URL
    if(isset($_GET['titre'])) {
        // Retrieve the titre parameter from the URL and trim it
        $titre = trim($_GET['titre']);

        // Prepare SQL query
        $sql = "SELECT id_livre, titre FROM livre";

        // Prepare statement
        $stmt = $pdo->prepare($sql);

        // Execute statement
        $stmt->execute();

        // Fetch all the results
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Flag to track if a livre with matching titre is found
        $livreFound = false;

        foreach ($rows as $row) {
            // Compare the trimmed and lowercase versions of the titres
            if (strtolower(trim($row["titre"])) === strtolower($titre)) {
                // If a matching livre is found, set the flag and output its id_livre
                $livreFound = true;
                echo "id_livre: " . $row["id_livre"];
                break; // Exit the loop since we found the livre
            }
        }

        // If no matching livre is found, output a message
        if (!$livreFound) {
            echo "No livre found with the given titre.";
        }
    } else {
        echo "Titre parameter is missing in the request.";
    }
} catch (PDOException $e) {
    // If an error occurs during execution, display the error message
    echo "Error: " . $e->getMessage();
}
?>
