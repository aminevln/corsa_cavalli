
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
        dataType: 'json',
        success: function(data) {
            alert('Risposta dal server:', data.cartaUscita);
            // $('#cartaUscita').html({
            //     'background-image' : "url('./IMG/"+data.cartaUscita+"')",
            //     'background-repeat' : 'no-repeat',
            //     'background-size' : 'cover'
            // })
            play(data.cartaUscita)
        },
        error: function(err) {
            console.log('Errore'+err);
        }
    });
})
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
function getBackCard(){
    return(
        `
            <div class="cpn">?</div>
        `)
}