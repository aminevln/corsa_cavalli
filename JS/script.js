
console.log('ciao')
let base = document.getElementsByClassName('home')
let seeds = ['♤', '♡', '♢', '♧']
for(let i=0; i<base.length; i++)
    base[i].innerHTML = getCard(13, seeds[i])
let aside = document.getElementsByClassName('casellaAside')
for(let i=0; i<aside.length; i++)   
    aside[i].innerHTML = getBackCard()
document.getElementById('mazzoUscito').innerHTML = getBackCard()
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