/*
|| 7/10/2018
|| Chess Player
||
*/


var data = require("./data")
var domPrinter = require("./domPrinter")
var ai = require("./ai")



data.getLegalMoves();
data.removeChecks();

domPrinter();

console.log("Board:", data.board)
console.log("Legal moves:", data.legalMoves)

document.getElementById("display").addEventListener("click", function () {
    console.log(data.board)
    console.log(data.legalMoves)
    console.log(data.history)
})

let p = document.createElement("p")
p.textContent = "Working..."
p.id = "myP"

let button = document.createElement("button")
button.id = "aiMove"
button.type = "button"
button.textContent = "Make AI move"
button.addEventListener("click", function () {
    document.getElementById("info").appendChild(p)
    ai.execute(data.board, data.turn)
})
document.getElementById("info").appendChild(button)




