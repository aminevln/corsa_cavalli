<?php

SESSION_START();
function startsWith($parola, $lettera) {
    return strpos($parola, $lettera) === 2;
}
$setA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
$setB = ['.p', '.c', '.q', '.f'];
// Verifica se esiste un array di sessione per le carte uscite
if (!isset($_SESSION['carteUscite'])) {
    $_SESSION['carteUscite'] = [];
}

// Inizializza le variabili di posizione delle suite se non esistono
if (!isset($_SESSION['idxQ'])) {
    $_SESSION['idxQ'] = 0;
}

if (!isset($_SESSION['idxP'])) {
    $_SESSION['idxP'] = 0;
}

if (!isset($_SESSION['idxC'])) {
    $_SESSION['idxC'] = 0;
}

if (!isset($_SESSION['idxF'])) {
    $_SESSION['idxF'] = 0;
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
        $_SESSION['idxP']+=120;
        $removedElement[0] = $removedElement[0].".".$_SESSION['idxP'];
    } else if($splitResult[1] === 'q'){
        $_SESSION['idxQ']+=120;
        $removedElement[0] = $removedElement[0].".".$_SESSION['idxQ'];
    } else if($splitResult[1] === 'f'){
        $_SESSION['idxF']+=120;
        $removedElement[0] = $removedElement[0].".".$_SESSION['idxF'];
    } else if($splitResult[1] === 'c'){
        $_SESSION['idxC']+=120;
        $removedElement[0] = $removedElement[0].".".$_SESSION['idxC'];
    }
    $_SESSION['carteUscite'][] = $removedElement[0];
    echo json_encode($removedElement[0]."%");
    if($_SESSION['idxC']>=480 ||  $_SESSION['idxF']>=480 || $_SESSION['idxQ']>=480 || $_SESSION['idxP']>=480)
     {
        $_SESSION['idxQ'] = 0;
        $_SESSION['idxP'] = 0;
        $_SESSION['idxF'] = 0;
        $_SESSION['idxC'] = 0;
     }
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
    $_SESSION['idxQ'] = 0;
    $_SESSION['idxP'] = 0;
    $_SESSION['idxF'] = 0;
    $_SESSION['idxC'] = 0;
    echo json_encode($removedElement[0]."%");
}

exit;
?>
