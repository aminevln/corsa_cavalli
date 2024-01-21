<?php
      SESSION_START();
      $setA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      $setB = ['♤', '♡', '♢', '♧'];
      $cardImages = [];
      foreach ($setA as $numA) {
          foreach ($setB as $letteraB) {
              // Creazione della coppia
              $coppia = $numA . $letteraB;

              // Aggiunta della coppia all'array
              $coppie[] = $coppia;
          }
      }
      $randomIndex = mt_rand(0, count($cardImages) - 1);
      $removedElement = array_splice($cardImages, $randomIndex, 1);
      echo json_encode(['cartaUscita' => $removedElement[0]]);

