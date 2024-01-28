function reload(){
    location.reload();
}
function getCard(number, seed) {
    return `
          <div class="cp" style="height: 120px, background: #000" >
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
              <div class="cp" style="width: 80px; height: 120px; margin-top: 8px; z-index: 999999; background: #000" >
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
function getCube(seed){
    return `
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
}
function restart() {
    return `
    <form style="border: 0;">
        <input value="restart" id="restart" type="submit" style="
          position: absolute;
          bottom: 25%;
          left: 70%;
          border: 1px solid rgb(255, 255, 255);
          width: 100px;
          height: 40px;
          -webkit-box-shadow:0px 0px 25px 0px rgba(151,46,255,1);
          -moz-box-shadow: 0px 0px 25px 0px rgba(151,46,255,1);
          box-shadow: 0px 0px 36px 0px rgba(151,46,255,1);
          background: #000;
          visibility: hidden;
        " onclick="restart()">
      </form>
    `;
}
function allTheSame(a, n) {
    for (let i = 0; i < a.length; i++) if (a[i] < n) return false;
    return true;
  }
function char2Seed(seed) {
    if (seed.startsWith("q")) seed = "♢";
    else if (seed.startsWith("c")) seed = "♡";
    else if (seed.startsWith("p")) seed = "♤";
    else if (seed.startsWith("f")) seed = "♧";
    return seed;
  }
function seed2Char(seed) {
    if (seed === "♢") seed = "quadri";
    else if (seed === "♡") seed = "cuori";
    else if (seed === "♤") seed = "picche";
    else if (seed === "♧") seed = "fiori";
    return seed;
}
  