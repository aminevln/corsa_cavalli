let base = document.getElementsByClassName("home");
let aside = document.getElementsByClassName("casellaAside");
let symbols = document.getElementsByClassName("p");

document.body.innerHTML += restart()
for (let i = 0, k = 0; i < base.length; i++, k += 25) {
  base[i].innerHTML = getCard(13, seeds[i]);
  base[i].style.left = k - 1 + "%";
}

for (let i = 0; i < aside.length; i++) aside[i].innerHTML = getBackCard();
document.getElementById("mazzoUscito").innerHTML = getBackCard();

for (let i = 0; i < symbols.length; i++)
  symbols[i].addEventListener("click", function () {
    choice = symbols[i].textContent;
    for (let j = 0; j < symbols.length; j++)
      symbols[j].style.visibility = "hidden";
    selectedSeed(symbols[i].textContent);
});

function play(carta) {
  console.log(carta);
  if (carta.startsWith("E"))
    document.getElementById("w").textContent =
      "TUTTE LE CARTE SONO STATE ESTRATTE";
  else if (carta.startsWith("w")) {
    playC(carta);
  } else {
    document.getElementById("w").textContent = "STAI SCOMMETTENDO SU";
    let numero = carta.split(".")[0];
    let seed = carta.split(".")[1];
    let y = carta.split(".")[2];
    if (seed.startsWith("q")) seed = "♢";
    else if (seed.startsWith("c")) seed = "♡";
    else if (seed.startsWith("p")) seed = "♤";
    else if (seed.startsWith("f")) seed = "♧";
    document.getElementById("cartaUscita").innerHTML = getNewCard(numero, seed); //getBackCard()
    move(y, seed, true);
    if (end) {
      if (seed2Char(choice) == winner) {
        document.getElementById("w").textContent =
          "COMPLIMENTI SOLDATO, HAI VINTO";
      } else {
        let i = Math.floor(Math.random() * 4);
        switch (i) {
          case 0:
            document.getElementById("w").textContent =
              "PERSO, LA PROSSIMA E' BUONA";
            break;
          case 1:
            document.getElementById("w").textContent =
              "PERSO, DAI LA PROSSIMA LA VINCI";
            break;
          case 2:
            document.getElementById("w").textContent =
              "PERSO, GIOCA ANCORA TANTO I SOLDI VANNO E VENGONO";
            break;
          case 3:
            document.getElementById("w").textContent =
              "PERSO, LA VINCITA E' DIETRO L'ANGOLO, RIPROVA";
            break;
        }
      }
      document.getElementById('restart').style.visibility = 'visible'
      document.getElementById('mazzoUscito').style.visibility = 'hidden'
    }
  }
}

function playA(carta) {
  console.log(carta);
  if (carta.startsWith("E"))
    document.getElementById("w").textContent =
      "TUTTE LE CARTE SONO STATE ESTRATTE";
  else {
    document.getElementById("w").textContent = "STAI SCOMMETTENDO SU";
    let numero = carta.split(".")[0];
    let seed = carta.split(".")[1];
    let y = carta.split(".")[2];
    //if(seed)
    let a = "ciao";
    if (seed.startsWith("q")) seed = "♢";
    else if (seed.startsWith("c")) seed = "♡";
    else if (seed.startsWith("p")) seed = "♤";
    else if (seed.startsWith("f")) seed = "♧";
    move(y, seed, true);
    if (end) {
      if (seed2Char(choice) == winner) {
        document.getElementById("w").textContent =
          "COMPLIMENTI SOLDATO, HAI VINTO";
      } else {
        let i = Math.floor(Math.random() * 4);
        switch (i) {
          case 0:
            document.getElementById("w").textContent =
              "PERSO, LA PROSSIMA E' BUONA";
            break;
          case 1:
            document.getElementById("w").textContent =
              "PERSO, DAI LA PROSSIMA LA VINCI";
            break;
          case 2:
            document.getElementById("w").textContent =
              "PERSO, GIOCA ANCORA TANTO I SOLDI VANNO E VENGONO";
            break;
          case 3:
            document.getElementById("w").textContent =
              "PERSO, LA VINCITA E' DIETRO L'ANGOLO, RIPROVA";
            break;
        }
      }
      document.getElementById('restart').style.visibility = 'visible'
      document.getElementById('mazzoUscito').style.visibility = 'hidden'
    }
  }
}
function selectedSeed(seed) {
  document.getElementById("w").textContent = "STAI SCOMMETTENDO SU";
  document.body.innerHTML += getCube(seed);
  document.getElementById('mazzoUscito').addEventListener('click',function () {
    $.ajax({
      type: "GET",
      url: "./PHP/control.php",
      dataType: "text",
      success: function (data) {
        console.log(data);
        play(data.substring(1, data.length - 1));
      },
      error: function (xhr, status, error) {
        console.log("Errore: " + status + " - " + error);
        console.log(xhr.responseText);
      },
    });
  });
}

function move(y, seed, flag) {
  let horses = document.getElementsByClassName("keySeed");
  for (let i = 0; i < horses.length; i++) {
    if (horses[i].textContent == seed) {
      if (seed.startsWith("♢")) {
        base[i].style.bottom = y;
        positions[0] = parseInt(y.slice(0, -1));
      } else if (seed.startsWith("♡")) {
        base[i].style.bottom = y;
        positions[1] = parseInt(y.slice(0, -1));
      } else if (seed.startsWith("♤")) {
        base[i].style.bottom = y;
        positions[2] = parseInt(y.slice(0, -1));
      } else if (seed.startsWith("♧")) {
        base[i].style.bottom = y;
        positions[3] = parseInt(y.slice(0, -1));
      }
    }
  }
  if (flag) check(positions, seed);
}
function check(positions, seed) {
  if (allTheSame(positions, 120) && !listSorpassi[0]) {
    $.ajax({
      type: "GET",
      url: "./PHP/control.php",
      dataType: "text",
      success: function (data) {
        let a = data.substring(1, data.length - 1);
        document.getElementById("k0").innerHTML = getNewCard(
          a.split(".")[0],
          char2Seed(a.split(".")[1])
        );
        listSorpassi[0] = true;
        playA(a);
      },
      error: function (xhr, status, error) {
        console.log("Errore: " + status + " - " + error);
        console.log(xhr.responseText);
      },
    });
  } else if (allTheSame(positions, 240) && !listSorpassi[1]) {
    $.ajax({
      type: "GET",
      url: "./PHP/control.php",
      dataType: "text",
      success: function (data) {
        let a = data.substring(1, data.length - 1);
        document.getElementById("k1").innerHTML = getNewCard(
          a.split(".")[0],
          char2Seed(a.split(".")[1])
        );
        listSorpassi[1] = true;
        playA(a);
      },
      error: function (xhr, status, error) {
        console.log("Errore: " + status + " - " + error);
        console.log(xhr.responseText);
      },
    });
  } else if (allTheSame(positions, 360) && !listSorpassi[2]) {
    $.ajax({
      type: "GET",
      url: "./PHP/control.php",
      dataType: "text",
      success: function (data) {
        let a = data.substring(1, data.length - 1);
        document.getElementById("k2").innerHTML = getNewCard(
          a.split(".")[0],
          char2Seed(a.split(".")[1])
        );
        listSorpassi[2] = true;
        playA(a);
      },
      error: function (xhr, status, error) {
        console.log("Errore: " + status + " - " + error);
        console.log(xhr.responseText);
      },
    });
  }
  for (let i = 0; i < positions.length; i++)
    if (positions[i] == 480) {
      switch (i) {
        case 0:
          winner = "quadri";
          break;
        case 1:
          winner = "cuori";
          break;
        case 2:
          winner = "picche";
          break;
        case 3:
          winner = "fiori";
          break;
      }
      end = true;
    }
}

