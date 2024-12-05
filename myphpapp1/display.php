<?php

include 'connect.php'; // Include the connect.php file

try {
    // Check if the search field and query parameters are set
    if (isset($_GET['auteur'])) {
        $searchField = 'auteur';
        $searchQuery = $_GET['auteur'];
    } elseif (isset($_GET['titre'])) {
        $searchField = 'titre';
        $searchQuery = $_GET['titre'];
    } else {
        $searchField = null;
        $searchQuery = null;
    }

    // Prepare the SQL statement based on the search field
    if ($searchField) {
        $sql = "SELECT * FROM livre WHERE $searchField LIKE ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(["%$searchQuery%"]);
    } else {
        // If no search parameters are provided, fetch all books
        $stmt = $pdo->query("SELECT * FROM livre");
    }

    // Fetch the results as associative array
    $books = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the results as JSON
    header('Content-Type: application/json');
    echo json_encode($books);
    
} catch (PDOException $e) {
    // If an error occurs during connection or query, display the error message
    echo "Error: " . $e->getMessage();
}
