
let base = document.getElementsByClassName("home");
let seeds = ["♤", "♡", "♢", "♧"];
let positions = [0,0,0,0]
let listSorpassi = [false, false, false, false]
for (let i = 0, k = 0; i < base.length; i++, k += 25) {
  base[i].innerHTML = getCard(13, seeds[i]);
  base[i].style.left = k - 1 + "%";
}
let iP = 0,
  iF = 0,
  iQ = 0,
  iC = 0;
let aside = document.getElementsByClassName("casellaAside");
for (let i = 0; i < aside.length; i++) aside[i].innerHTML = getBackCard();
document.getElementById("mazzoUscito").innerHTML = getBackCard();
let symbols = document.getElementsByClassName("p");

for (let i = 0; i < symbols.length; i++)
  symbols[i].addEventListener("click", function () {
    for (let j = 0; j < symbols.length; j++)
      symbols[j].style.visibility = "hidden";
    selectedSeed(symbols[i].textContent);
  });

$("#mazzoUscito").click(function () {
  $.ajax({
    type: "GET",
    url: "./PHP/control.php",
    dataType: "text",
    success: function (data) {
      play(data.substring(1, data.length - 1));
    },
    error: function (xhr, status, error) {
      console.log("Errore: " + status + " - " + error);
      console.log(xhr.responseText);
    },
  });
});
function play(carta) {
  console.log(carta);
  if (carta.startsWith("E"))
    document.getElementById("w").textContent =
      "TUTTE LE CARTE SONO STATE ESTRATTE";
  else if(carta.startsWith('w')){
    playC(carta)
    
    alert('ce un vincitore')

  }else{
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
    document.getElementById("cartaUscita").innerHTML = getNewCard(numero, seed); //getBackCard()
    move(y, seed, true)
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
    move(y, seed, true)
    
  }
}
function selectedSeed(seed) {
  document.getElementById("w").textContent = "STAI SCOMMETTENDO SU";
  let a = `
    <div class="cube">
        <div class="top"></div>
        <div>
            <span style="--i:0">${seed}</span>
            <span style="--i:1">${seed}</span>
            <span style="--i:2">${seed}</span>
            <span style="--i:3">${seed}</span>
        </div>
    </div>
    `;
  document.body.innerHTML += a;
  $("#mazzoUscito").click(function () {
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
function getCard(number, seed) {
  return `
        <div class="cp" style="height: 120px" >
            <div class="cn">${number}</div>
            <div class="cs keySeed">${seed}</div>
            <div class="cbs">${seed}</div>
            <div class="cs" style="text-align: right; padding-left:0; margin-right: 12px;">${seed}</div>
            <div class="cn" style="text-align: right; padding-left:0; margin-right: 12px;">${number}</div>
        </div>
    `;
}
function getNewCard(number, seed) {
  return `
            <div class="cp" style="width: 80px; height: 120px; margin-top: 8px; z-index: 999999;" >
                <div class="cn">${number}</div>
                <div class="cs">${seed}</div>
                <div class="cbs">${seed}</div>
                <div class="cs" style="text-align: right; padding-left:0; margin-right: 12px;">${seed}</div>
                <div class="cn" style="text-align: right; padding-left:0; margin-right: 12px;">${number}</div>
            </div>
        `;
}
function getBackCard() {
  return `
            <div class="cpn" style="margin: 0px; margin-top: 8px;">?</div>
        `;
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
  if(flag)
    check(positions, seed)
}
function check(positions, seed){
    if(allTheSame(positions, 120) && !listSorpassi[0]){
      $.ajax({
        type: "GET",
        url: "./PHP/control.php",
        dataType: "text",
        success: function (data) {
          let a = data.substring(1, data.length-1)
          document.getElementById('k0').innerHTML = getNewCard(a.split('.')[0], char2Seed(a.split('.')[1]))
          listSorpassi[0] = true
          playA(a);
        },
        error: function (xhr, status, error) {
          console.log("Errore: " + status + " - " + error);
          console.log(xhr.responseText);
        },
      }); 
      
    }else if(allTheSame(positions, 240) && !listSorpassi[1]){
      $.ajax({
        type: "GET",
        url: "./PHP/control.php",
        dataType: "text",
        success: function (data) {
          let a = data.substring(1, data.length-1)
          document.getElementById('k1').innerHTML = getNewCard(a.split('.')[0], char2Seed(a.split('.')[1]))
          listSorpassi[1] = true
          playA(a);
        },
        error: function (xhr, status, error) {
          console.log("Errore: " + status + " - " + error);
          console.log(xhr.responseText);
        },
      }); 
    }else if(allTheSame(positions, 360) && !listSorpassi[2]){
      $.ajax({
        type: "GET",
        url: "./PHP/control.php",
        dataType: "text",
        success: function (data) {
          let a = data.substring(1, data.length-1)
          document.getElementById('k2').innerHTML = getNewCard(a.split('.')[0], char2Seed(a.split('.')[1]))
          listSorpassi[2] = true
          playA(a);
        },
        error: function (xhr, status, error) {
          console.log("Errore: " + status + " - " + error);
          console.log(xhr.responseText);
        },
      }); 
    }
    for (let i = 0; i < positions.length; i++) 
      if (positions[i] == 480 ) {
        switch(i){
          case 0: 
          alert('quadri')
          break;
          case 1: 
          alert('cuori')
          break;
          case 2: 
          alert('picche')
          break; 
          case 3:
          alert('fiori') 
          break;
          
      }
    }
}

function allTheSame(a, n){
  for (let i = 0; i < a.length; i++) 
    if (a[i] < n ) 
        return false;
  return true
}
function char2Seed(seed){
  if (seed.startsWith("q")) seed = "♢";
  else if (seed.startsWith("c")) seed = "♡";
  else if (seed.startsWith("p")) seed = "♤";
  else if (seed.startsWith("f")) seed = "♧";
  return seed
}
