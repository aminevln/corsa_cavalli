
console.log('ciao')
let base = document.getElementsByClassName('home')
let seeds = ['♤', '♡', '♢', '♧']
for(let i=0; i<base.length; i++)
    base[i].innerHTML = getCard(13, seeds[i])

function getCard(number, seed){
    return(
    `
        <div class="cp" >
            <div class="cn">${number}</div>
            <div class="cs">${seed}</div>
            <div class="cbs">${seed}</div>
            <div class="cs">${seed}</div>
            <div class="cn">${number}</div>
        </div>
    `)
}