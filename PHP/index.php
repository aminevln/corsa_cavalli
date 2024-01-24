<?php

?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TOMBOLA</title>
</head>
<body>

<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

header('Content-Type: application/json');
SESSION_START();

$setA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
$setB = ['♤', '♡', '♢', '♧'];
$coppie = [];

foreach ($setA as $numA) {
    foreach ($setB as $letteraB) {
        // Creazione della coppia
        $coppia = $numA . $letteraB;

        // Aggiunta della coppia all'array
        $coppie[] = $coppia;
    }
}

$randomIndex = mt_rand(0, count($coppie) - 1);
$removedElement = array_splice($coppie, $randomIndex, 1);

echo json_encode(['cartaUscita' => $removedElement[0]]);
?>
</body>
</html>
