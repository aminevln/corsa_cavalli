
console.log('ciao')
let base = document.getElementsByClassName('home')
let seeds = ['♤', '♡', '♢', '♧']
for(let i=0; i<base.length; i++)
    base[i].innerHTML = getCard(13, seeds[i])
let aside = document.getElementsByClassName('casellaAside')
for(let i=0; i<aside.length; i++)   
    aside[i].innerHTML = getBackCard()
document.getElementById('mazzoUscito').innerHTML = getBackCard()
let symbols = document.getElementsByClassName('p')

for(let i = 0; i<symbols.length; i++)
    symbols[i].addEventListener('click', function() {
        for(let j = 0; j<symbols.length; j++)
            symbols[j].style.visibility = "hidden" 
        selectedSeed(symbols[i].textContent);

    });

$("#mazzoUscito").click(function(){
    $.ajax({
        type: 'GET',
        url: './PHP/control.php',
        dataType: 'text', 
        success: function(data) {
            play(data.substring(1, data.length-1))
        },
        error: function(xhr, status, error) {
            console.log('Errore: ' + status + ' - ' + error);
            console.log(xhr.responseText);
        }
    });
});
function play(carta){
    console.log(carta)
    if(carta.startsWith('E'))
        document.getElementById('w').textContent = "TUTTE LE CARTE SONO STATE ESTRATTE"
    else{
        let numero = carta.split('.')[0]
    let seed = carta.split('.')[1]
    //if(seed)
    let a = "ciao"
    if(seed.startsWith('q'))
        seed = '♢'
    else if(seed.startsWith('c'))
        seed = '♡'
    else if(seed.startsWith('p'))
        seed = '♤'
    else if(seed.startsWith('f'))
        seed = '♧'

    document.getElementById('cartaUscita').innerHTML = getNewCard(numero, seed)//getBackCard() 
    }
    
}  
function selectedSeed(seed){
    document.getElementById('w').textContent = "STAI SCOMMETTENDO SU"
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
    `
    document.body.innerHTML+=a
    $("#mazzoUscito").click(function(){
        $.ajax({
            type: 'GET',
            url: './PHP/control.php',
            dataType: 'text', 
            success: function(data) {
                console.log(data)
                play(data.substring(1, data.length-1))
            },
            error: function(xhr, status, error) {
                console.log('Errore: ' + status + ' - ' + error);
                console.log(xhr.responseText);
            }
        });
    });
    
}
function getCard(number, seed){
    return(
    `
        <div class="cp" >
            <div class="cn">${number}</div>
            <div class="cs">${seed}</div>
            <div class="cbs">${seed}</div>
            <div class="cs" style="text-align: right; padding-left:0; margin-right: 12px;">${seed}</div>
            <div class="cn" style="text-align: right; padding-left:0; margin-right: 12px;">${number}</div>
        </div>
    `)
}
function getNewCard(number, seed){
    return(
        `
            <div class="cp" style="width: 80px; height: 120px; margin-top: 8px;" >
                <div class="cn">${number}</div>
                <div class="cs">${seed}</div>
                <div class="cbs">${seed}</div>
                <div class="cs" style="text-align: right; padding-left:0; margin-right: 12px;">${seed}</div>
                <div class="cn" style="text-align: right; padding-left:0; margin-right: 12px;">${number}</div>
            </div>
        `)
}
function getBackCard(){
    return(
        `
            <div class="cpn">?</div>
        `)
}