<?php
      //SESSION_START();
      //$setA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      //$setB = ['♤', '♡', '♢', '♧'];
      //$cardImages = [];
      //foreach ($setA as $numA) {
          //foreach ($setB as $letteraB) {
              // Creazione della coppia
              //$coppia = $numA . $letteraB;

              // Aggiunta della coppia all'array
              //$coppie[] = $coppia;
          //}
      //}
      //$randomIndex = mt_rand(0, count($cardImages) - 1);
      //$removedElement = array_splice($cardImages, $randomIndex, 1);
      //echo json_encode(['cartaUscita' => $removedElement[0]]);


    SESSION_START(); // Inizia una sessione PHP. Assicurati che questa istruzione sia la prima nel tuo script se stai utilizzando le sessioni.

    $setA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Un array contenente numeri da 1 a 12.
    $setB = ['♤', '♡', '♢', '♧']; // Un array contenente quattro simboli per i semi delle carte.

    $coppie = []; // Inizializza un array vuoto che verrà popolato con le coppie di numeri e simboli.

    // Questo doppio ciclo crea tutte le possibili coppie di numeri e simboli e le aggiunge all'array $coppie.
    foreach ($setA as $numA) {
        foreach ($setB as $letteraB) {
            // Creazione della coppia
            $coppia = $numA . $letteraB;

            // Aggiunta della coppia all'array
            $coppie[] = $coppia;
        }
    }

    // Genera un indice casuale all'interno dell'array $coppie.
    $randomIndex = mt_rand(0, count($coppie) - 1);

    // Estrae un elemento casuale dall'array $coppie utilizzando array_splice e lo rimuove dall'array.
    $removedElement = array_splice($coppie, $randomIndex, 1);

    // Restituisce l'elemento estratto come un oggetto JSON con la chiave 'cartaUscita'.
    echo json_encode(['cartaUscita' => $removedElement[0]]);
?>

     
      


