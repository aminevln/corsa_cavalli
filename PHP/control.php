<?php

SESSION_START();

function startsWith($parola, $lettera) {
    return strpos($parola, $lettera) === 2;
}

$setA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
$setB = ['.p', '.c', '.q', '.f'];
$idxQ = 0;
$idxP = 0;
$idxC = 0;
$idxF = 0;
// Verifica se esiste un array di sessione per le carte uscite
if (!isset($_SESSION['carteUscite'])) {
    $_SESSION['carteUscite'] = [];
}

$coppie = [];

foreach ($setA as $numA) {
    foreach ($setB as $letteraB) {
        $coppia = $numA . $letteraB;

        // Verifica se la carta è già stata estratta
        if (!in_array($coppia, $_SESSION['carteUscite'])) {
            $coppie[] = $coppia;
        }
    }
}

// Verifica se ci sono carte disponibili
if (!empty($coppie)) {
    $randomIndex = mt_rand(0, count($coppie) - 1);
    $removedElement = array_splice($coppie, $randomIndex, 1);
    $splitResult = explode(".", $removedElement[0]);
    if($splitResult[1] === 'p'){
        $idxP+=120;
        $removedElement[0] = $removedElement[0].".".$idxP;
    } else if($splitResult[1] === 'q'){
        $idxQ+=120;
        $removedElement[0] = $removedElement[0].".".$idxQ;
    } else if($splitResult[1] === 'f'){
        $idxF+=120;
        $removedElement[0] = $removedElement[0].".".$idxF;
    } else if($splitResult[1] === 'c'){
        $idxC+=120;
        $removedElement[0] = $removedElement[0].".".$idxC;
    }
    $_SESSION['carteUscite'][] = $removedElement[0];

    echo json_encode($removedElement[0]."%");
} else {
    echo json_encode('E');
    // Se tutte le carte sono state estratte, reimposta l'array delle carte uscite
    $_SESSION['carteUscite'] = [];
    foreach ($setA as $numA) {
        foreach ($setB as $letteraB) {
            $coppia = $numA . $letteraB;
            $coppie[] = $coppia;
        }
    }

    $randomIndex = mt_rand(0, count($coppie) - 1);
    $removedElement = array_splice($coppie, $randomIndex, 1);
    
    
    $_SESSION['carteUscite'][] = $removedElement[0];

    echo json_encode($removedElement[0]."%");
}

exit;
?>
