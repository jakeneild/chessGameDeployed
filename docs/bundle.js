(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var data = require("./data")
var inCheck = require("./isInCheck")

var canCastle = function (turn) {
    console.log(data.board, "!")
    let arr = [1, 1]
    let holder = []

    if (turn === "W") {
        if (data.board[7][4] !== "Wk") {
            arr = [0, 0];
        }
        for (let i = 0; i < data.history.length; i += 2) {
            if (data.history[i].includes("k")) { //looking for king moves
                arr = [0, 0];
            }
            if (data.history[i].slice(2, 4) === "70") { //looking for rook moves
                arr[0] = 0;
            }
            if (data.history[i].slice(2, 4) === "77") {
                arr[1] = 0;
            }
        }
        for (let i = 1; i < data.history.length; i += 2) {  //looking for checks
            if (data.history[i].includes("!")) {
                arr = [0, 0]
            }
        }
        for (let i = 1; i < 4; i++) { //making sure the space is empty
            for (let j = 0; j < 8; j++) {
                holder[j] = [];

                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }
            data.board[7][i] = "Wk"

            if (inCheck("W")) {
                arr[0] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];

                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[7][i] !== "e") {
                arr[0] = 0
            }
        }
        for (let i = 5; i < 7; i++) {

            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }

            data.board[7][i] = "Wk"

            if (inCheck("W")) {
                arr[1] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];
                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[7][i] !== "e") {
                arr[1] = 0;
            }
        }
    } else {
        if (data.board[0][4] !== "Bk") {
            arr = [0, 0];
        }
        for (let i = 1; i < data.history.length; i += 2) {
            if (data.history[i].includes("k")) {
                arr = [0, 0];
            }
            if (data.history[i].slice(2, 4) === "00") {
                arr[0] = 0;
            }
            if (data.history[i].slice(2, 4) === "07") {
                arr[1] = 0;
            }
        }
        for (let i = 0; i < data.history.length; i += 2) {
            if (data.history[i].includes("!")) {
                arr = [0, 0]
            }
        }
        for (let i = 1; i < 4; i++) {

            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }

            data.board[0][i] = "Bk"

            if (inCheck("B")) {
                arr[0] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];
                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[0][i] !== "e") {
                arr[0] = 0
            }
        }
        for (let i = 5; i < 7; i++) {

            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = data.board[j][k]
                }
            }

            data.board[0][i] = "Bk"

            if (inCheck("B")) {
                arr[1] = 0;
            }
            for (let j = 0; j < 8; j++) {
                data.board[j] = [];
                for (let k = 0; k < 8; k++) {
                    data.board[j][k] = holder[j][k]
                }
            }

            if (data.board[0][i] !== "e") {
                arr[1] = 0;
            }
        }
    }
    return arr;
}

module.exports = canCastle;
},{"./data":2,"./isInCheck":4}],2:[function(require,module,exports){
var data = {
    board: [
        ["Br", "Bn", "Bb", "Bq", "Bk", "Bb", "Bn", "Br"],
        ["Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp"],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["e", "e", "e", "e", "e", "e", "e", "e",],
        ["Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp"],
        ["Wr", "Wn", "Wb", "Wq", "Wk", "Wb", "Wn", "Wr"]
    ],
    turn: "W",
    opponent: "B",
    turnSwitch: function () {
        let a = data.turn;
        data.turn = data.opponent;
        data.opponent = a;
    },
    history: [],
    legalMoves: {},
    move: function (m, f) {
        let piece = m.slice(0, 2);
        let ogPosi = m.slice(2, 3);
        let ogPosj = m.slice(3, 4);
        let newPosi = m.slice(4, 5);
        let newPosj = m.slice(5, 6);
        let d = f;

        d[newPosi][newPosj] = piece;
        d[ogPosi][ogPosj] = "e";
        return d;
    },
    legalMovesPush: function (move) {
        let bool = true;
        let z = {};
        let piece = move.slice(0, 2)
        let start = move.slice(2, 4)
        for (item in data.legalMoves) {
            if (item === `${piece + start}`) {
                bool = false;
            }
        }
        if (bool === false) {
            data.legalMoves[`${piece + start}`].push(move);
        } else {
            data.legalMoves[`${piece + start}`] = [move];
        }
    },
    getLegalMoves: function () {
        for (let i = 0; i < 8; i++) {                  //row
            for (let j = 0; j < 8; j++) {
                let piece = data.board[i][j]             //column
                if (data.board[i][j].includes(data.turn)) {

                    if (piece.includes("k")) {  //king move
                        for (let k = -1; k <= 1; k++) {
                            for (let l = -1; l <= 1; l++) {
                                if (data.board[i + k] !== undefined) {
                                    if (data.board[i + k][j + l] !== undefined) {

                                        if (data.board[i + k][j + l] === "e") {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            data.legalMovesPush(move)
                                        }

                                        if (data.board[i + k][j + l].includes(data.opponent)) {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            data.legalMovesPush(move)
                                        }

                                    }
                                }
                            }
                        }
                    }

                    if (piece.includes("p")) {                    //pawn move
                        if (piece.includes("W") && data.turn === "W") {
                            if (data.board[i - 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i - 1}${j}`
                                data.legalMovesPush(move)
                                if (data.board[i - 2][j] === "e" && i === 6) {  //double move forward
                                    let move = `${piece}${i}${j}${i - 2}${j}`
                                    data.legalMovesPush(move)
                                }
                            }
                            if (data.board[i - 1][j - 1] !== undefined) {
                                if (data.board[i - 1][j - 1].includes("B")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i - 1}${j - 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                            if (data.board[i - 1][j + 1] !== undefined) {
                                if (data.board[i - 1][j + 1].includes("B")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i - 1}${j + 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                        } else if (piece.includes("B") && data.turn === "B") {
                            if (data.board[i + 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i + 1}${j}`
                                data.legalMovesPush(move)
                                if (data.board[i + 2][j] === "e" && i === 1) {  //double move forward
                                    let move = `${piece}${i}${j}${i + 2}${j}`
                                    data.legalMovesPush(move)
                                }
                            }
                            if (data.board[i + 1][j - 1] !== undefined) {
                                if (data.board[i + 1][j - 1].includes("W")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i + 1}${j - 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                            if (data.board[i + 1][j + 1] !== undefined) {
                                if (data.board[i + 1][j + 1].includes("W")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i + 1}${j + 1}`
                                    data.legalMovesPush(move)
                                }
                            }
                        }
                    }
                    if (piece.includes("r")) {  //rook move
                        for (let k = 1; k < 8; k++) {  //up
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j] !== undefined) {
                                    if (data.board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j] !== undefined) {
                                    if (data.board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j - k] !== undefined) {
                                    if (data.board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j + k] !== undefined) {
                                    if (data.board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                    }
                    if (piece.includes("n")) { //knight move
                        let knightMove = function (r, c) {
                            if (data.board[i + r] !== undefined) {
                                if (data.board[i + r][j + c] !== undefined) {
                                    if (data.board[i + r][j + c] === "e" || data.board[i + r][j + c].includes(`${data.opponent}`)) {
                                        let move = `${piece}${i}${j}${i + r}${j + c}`
                                        data.legalMovesPush(move)
                                    }
                                }
                            }
                        }
                        knightMove(2, 1)
                        knightMove(2, -1)
                        knightMove(-2, 1)
                        knightMove(-2, -1)
                        knightMove(1, 2)
                        knightMove(1, -2)
                        knightMove(-1, 2)
                        knightMove(-1, -2)

                    }
                    if (piece.includes("b")) {
                        for (let k = 1; k < 8; k++) {  //up right
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j + k] !== undefined) {
                                    if (data.board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j + k] !== undefined) {
                                    if (data.board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j - k] !== undefined) {
                                    if (data.board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j - k] !== undefined) {
                                    if (data.board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                    }

                    if (piece.includes("q")) {

                        for (let k = 1; k < 8; k++) {  //up
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j] !== undefined) {
                                    if (data.board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j] !== undefined) {
                                    if (data.board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j - k] !== undefined) {
                                    if (data.board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (data.board[i] !== undefined) {
                                if (data.board[i][j + k] !== undefined) {
                                    if (data.board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }

                        for (let k = 1; k < 8; k++) {  //up right
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j + k] !== undefined) {
                                    if (data.board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j + k] !== undefined) {
                                    if (data.board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j + k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down left
                            if (data.board[i + k] !== undefined) {
                                if (data.board[i + k][j - k] !== undefined) {
                                    if (data.board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i + k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (data.board[i - k] !== undefined) {
                                if (data.board[i - k][j - k] !== undefined) {
                                    if (data.board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                    } else if (data.board[i - k][j - k].includes(data.opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        data.legalMovesPush(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(data.board)
        var canCastle = require("./canCastle")
        let a = canCastle(data.turn)
        console.log(data.board)
        if (a[0] !== 0 || a[1] || 1) {
            data.legalMoves.castle = [];
        }
        if (data.turn === "W") {
            if (a[0] === 1) {
                let move = "whiteCastleLeft"
                data.legalMoves.castle.push(move)
            }
            if (a[1] === 1) {
                let move = "whiteCastleRight"
                data.legalMoves.castle.push(move)
            }
        } else {
            if (a[0] === 1) {
                let move = "blackCastleLeft"
                data.legalMoves.castle.push(move)
            }
            if (a[1] === 1) {
                let move = "blackCastleRight"
                data.legalMoves.castle.push(move)
            }
        }
    },
    removeChecks: function () {
        console.log(data.board, "!")
        for (item in data.legalMoves) {
            if (item !== "castle") {
                let check = false;
                for (let i = 0; i < data.legalMoves[item].length; i++) {  //iterating through every move
                    var holder = []


                    for (let j = 0; j < 8; j++) {
                        holder[j] = [];
                        for (let k = 0; k < 8; k++) {
                            holder[j][k] = data.board[j][k]
                        }
                    }


                    check = false;
                    let a = data.move(data.legalMoves[item][i], data.board)
                    data.board = a;
                    data.turnSwitch();

                    let ki = "";  //kings position
                    let kj = "";
                    for (let k = 0; k < 8; k++) {//find the king
                        for (let l = 0; l < 8; l++) {
                            if (data.board[k][l] === `${data.opponent}k`) {
                                ki = k
                                kj = l
                            }
                        }
                    }


                    if (data.opponent === "W") {  //checking for pawns
                        if (data.board[ki - 1] !== undefined) {
                            if (data.board[ki - 1][kj + 1] !== undefined) {
                                if (data.board[ki - 1][kj + 1] === `${data.turn}p`) {
                                    check = true;
                                }
                            }
                        }
                        if (data.board[ki - 1] !== undefined) {
                            if (data.board[ki - 1][kj - 1] !== undefined) {
                                if (data.board[ki - 1][kj - 1] === `${data.turn}p`) {
                                    check = true;
                                }
                            }
                        }
                    } else {
                        if (data.board[ki + 1] !== undefined) {
                            if (data.board[ki + 1][kj + 1] !== undefined) {
                                if (data.board[ki + 1][kj + 1] === `${data.turn}p`) {
                                    check = true;
                                }
                            }
                        }
                        if (data.board[ki + 1] !== undefined) {
                            if (data.board[ki + 1][kj - 1] !== undefined) {
                                if (data.board[ki + 1][kj - 1] === `${data.turn}p`) {
                                    check = true;
                                }
                            }
                        }
                    }

                    array = [];
                    function lineCheck(inc1, inc2) {   //looks in every direction from the king
                        for (let m = 1; m < 8; m++) {
                            if (data.board[ki + inc1 * m] !== undefined) {
                                if (data.board[ki + inc1 * m][kj + inc2 * m] !== undefined) {
                                    if (data.board[ki + inc1 * m][kj + inc2 * m] !== "e") {
                                        if (data.board[ki + inc1 * m][kj + inc2 * m] === `${data.turn}k` && m === 1) {
                                            array.push("!")
                                            m = 8;
                                        } else {
                                            array.push(data.board[ki + inc1 * m][kj + inc2 * m]);
                                            m = 8;
                                        }
                                    }
                                } else {
                                    array.push("e")
                                    m = 8;
                                }
                            } else {
                                array.push("e")
                                m = 8;
                            }
                        }
                        return array;
                    }
                    for (let a = -1; a <= 1; a++) {
                        for (let b = -1; b <= 1; b++) {
                            lineCheck(a, b)
                        }
                    }

                    if (array.includes("!") || array.includes(`${data.turn}q`)) { //check for kings and queens
                        check = true;
                    }
                    for (let c = 0; c < 9; c += 2) { //check diagonals
                        if (array[c] === `${data.turn}b`) {
                            check = true;
                        }
                    }
                    for (let c = 1; c < 9; c += 2) { //check straights
                        if (array[c] === `${data.turn}r`) {
                            check = true;
                        }
                    }

                    var knightKingCheck = function (lMove) {
                        if (data.board[ki + lMove[0]] !== undefined) {
                            if (data.board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                                if (data.board[ki + lMove[0]][kj + lMove[1]] === `${data.turn}n`) {
                                    check = true;
                                }
                            }
                        }
                    }
                    var x = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]



                    for (let q = 0; q < x.length; q++) {
                        knightKingCheck(x[q])
                    }

                    //finally finished with checking
                    data.board = holder;
                    data.turnSwitch();
                    if (check === true) {
                        console.log("!!!removing move", data.legalMoves[item][i])
                        data.legalMoves[item].splice(i, 1)
                        i--;
                    }
                }
            }
        }
    },
    executeMove: function (move) {
        console.log("execute move start board pos: ", data.board)
        let isLegal = false;
        for (item in data.legalMoves) {
            for (let i = 0; i < data.legalMoves[item].length; i++) {
                if (data.legalMoves[item][i] === move) {
                    isLegal = true;
                }
            }
        }
        //I don't think any of this is neccessary
        /*let fakeData = data;
        let ki = ""
        let kj = "";
        for (let k = 0; k < 8; k++) {//find the king
            for (let l = 0; k < 8; k++) {
                if (fakeData.board[i][j] === `${opponent}k`) {
                    ki = i;
                    kj = j;
                }
            }
        }
        if (opponent === "W") {  //checking for pawns
            if (fakeData.board[ki + 1][kj + 1] === `${opponent}p` || fakeData.board[ki + 1][k - 1] === `${opponent}p`) {
                isLegal = false;
            }
        } else {
            if (fakeData.board[ki - 1][kj + 1] === `${opponent}p` || fakeData.board[ki - 1][k - 1] === `${opponent}p`) {
                isLegal = false;
            }
        }
        let array = [];
        function lineCheck(inc1, inc2) {
            for (let m = 1; m < 8; m++) {
                if (fakeData.board[i + inc1][j + inc2] !== "e" && fakeData.board[i + inc1][j + inc2] !== undefined) {
                    if (fakeData.board[i + inc1][j + inc2] === opponent + "k" && m === 1) {
                        array.push("!")
                    }
                    array.push(fakeData.board[i + inc1][j + inc2]);
                    m = 8;
                } else if (fakeData.board[i + inc1][j + inc2] === undefined) {
                    array.push("e")
                }
            }
            return array;
        }
        for (let a = -1; a <= 1; a++) {
            for (let b = -1; b <= 1; b++) {
                lineCheck(a, b)
            }
        }
        if (array.includes("!") || array.includes(`${turn}q`)) { //check for kings and queens
            isLegal = false;
        }
        for (let c = 0; c < 9; c += 2) { //check diagonals
            if (array[c] === `${turn}b`) {
                isLegal = false;
            }
        }
        for (let c = 0; c < 9; c += 2) { //check straights
            if (array[c] === `${turn}r`) {
                isLegal = false;
            }
        }
        var knightKingCheck = function (lMove) {
            for (item in lMove) {
                if (data.board[ki + lMove.item[1]][kj + lMove.item[2]] === `${turn}n`) {
                    isLegal = false;
                }
            }
        }
        knightKingCheck(2, 1)
        knightKingCheck(2, -1)
        knightKingCheck(-2, 1)
        knightKingCheck(-2, -1)
        knightKingCheck(1, 2)
        knightKingCheck(1, -2)
        knightKingCheck(-1, 2)
        knightKingCheck(-1, -2)*/

        //finally finished with checking
        console.log("move", move)

        if (isLegal === false) {
            console.log("Invalid move")
        } else {
            if (!move.includes("Castle")) {
                document.getElementById("info").innerHTML = "";
                let piece = move.slice(0, 2);
                let ogPosi = move.slice(2, 3);
                let ogPosj = move.slice(3, 4);
                let newPosi = move.slice(4, 5);
                let newPosj = move.slice(5, 6);

                data.board[newPosi][newPosj] = piece;
                data.board[ogPosi][ogPosj] = "e";
            } else if (move === "whiteCastleLeft") {
                data.board[7][0] = "e"
                data.board[7][2] = "Wk"
                data.board[7][3] = "Wr"
                data.board[7][4] = "e"
            } else if (move === "whiteCastleRight") {
                data.board[7][4] = "e"
                data.board[7][5] = "Wr"
                data.board[7][6] = "Wk"
                data.board[7][7] = "e"
            } else if (move === "blackCastleLeft") {
                data.board[0][0] = "e"
                data.board[0][2] = "Bk"
                data.board[0][3] = "Br"
                data.board[0][4] = "e"
            } else if (move === "blackCastleRight") {
                data.board[0][4] = "e"
                data.board[0][5] = "Br"
                data.board[0][6] = "Bk"
                data.board[0][7] = "e"
            }
            var isInCheck = require("./isInCheck")
            if (isInCheck(data.opponent)) {
                data.history.push(`${move}!`)
                p = document.createElement("p")
                if (data.opponent === "B") {
                    p.textContent = "Black is in check!"
                } else {
                    p.textContent = "White is in check!"
                }

                document.getElementById("info").appendChild(p);

            } else {
                data.history.push(move)
            }

            data.turnSwitch();
            data.legalMoves = {};
            data.getLegalMoves();
            data.removeChecks();
            let domPrinter = require("./domPrinter")
            domPrinter();
            selectedPiece = "";
            console.log("board after move: ", data.board)

            let count = 0
            for (item in data.legalMoves) {
                count = count + data.legalMoves[item].length
            }
            if (count === 0) {
                if (data.history[data.history.length - 1].includes("!")) {
                    if (data.opponent === "W") {
                        document.getElementById("info").firstChild.textContent = "Checkmate! White wins!"
                    } else {
                        document.getElementById("info").firstChild.textContent = "Checkmate! Black wins!"
                    }
                } else {
                    p = document.createElement("p")
                    p.textContent = "There is a draw"
                    document.getElementById("info").appendChild(p)
                }
            }
        }
    },
    selectedPiece: ""
}

module.exports = data;
},{"./canCastle":1,"./domPrinter":3,"./isInCheck":4}],3:[function(require,module,exports){
var data = require("./data")
var selectPiece = require("./selectPiece")
var makeMove = require("./makeMove")

var domPrinter = function () {
    document.getElementById("board").innerHTML = ""
    document.getElementById("board").addEventListener("click", function(e){
        makeMove(e.target.className, e.target.id)
        makeMove(e.target.parentElement.className, e.target.parentElement.id)
    })
    for (let i = 0; i < 8; i++) {
        let row = document.createElement("div")
        row.style.display = "flex";
        for (let j = 0; j < 8; j++) {
            let box = document.createElement("div");
            box.id = i.toString() + j.toString();
            box.style.border = "2px solid black";
            box.style.width = "75px";
            box.style.height = "75px";
            if (data.board[i][j] !== "e") {
                box.id = data.board[i][j] + i.toString() + j.toString();
                if (data.board[i][j].includes(data.turn)) {
                    box.addEventListener("click", function () {
                        selectPiece(box.id);
                    })
                }
                let imgDiv = document.createElement("div")
                imgDiv.style.width = "75px";
                imgDiv.style.height = "75px";
                if (data.board[i][j] === "Wp") {
                    imgDiv.style.backgroundImage = "url('./img/Wp.png')"
                } else if (data.board[i][j] === "Wr") {
                    imgDiv.style.backgroundImage = "url('./img/Wr.png')"
                } else if (data.board[i][j] === "Wn") {
                    imgDiv.style.backgroundImage = "url('./img/Wn.png')"
                } else if (data.board[i][j] === "Wb") {
                    imgDiv.style.backgroundImage = "url('./img/Wb.png')"
                } else if (data.board[i][j] === "Wq") {
                    imgDiv.style.backgroundImage = "url('./img/Wq.png')"
                } else if (data.board[i][j] === "Wk") {
                    imgDiv.style.backgroundImage = "url('./img/Wk.png')"
                } else if (data.board[i][j] === "Bp") {
                    imgDiv.style.backgroundImage = "url('./img/Bp.png')"
                } else if (data.board[i][j] === "Br") {
                    imgDiv.style.backgroundImage = "url('./img/Br.png')"
                } else if (data.board[i][j] === "Bn") {
                    imgDiv.style.backgroundImage = "url('./img/Bn.png')"
                } else if (data.board[i][j] === "Bb") {
                    imgDiv.style.backgroundImage = "url('./img/Bb.png')"
                } else if (data.board[i][j] === "Bq") {
                    imgDiv.style.backgroundImage = "url('./img/Bq.png')"
                } else if (data.board[i][j] === "Bk") {
                    imgDiv.style.backgroundImage = "url('./img/Bk.png')"
                }
                box.appendChild(imgDiv)
            }

            row.appendChild(box);
        }
        document.getElementById("board").appendChild(row)
    }
}

module.exports = domPrinter
},{"./data":2,"./makeMove":6,"./selectPiece":7}],4:[function(require,module,exports){
var data = require("./data")

var isInCheck = function (turn) {
    let opponent = "W"
    if (turn === "W") {
        opponent = "B"
    }

    check = false;

    let ki = "";  //kings position
    let kj = "";
    for (let k = 0; k < 8; k++) {//find the king
        for (let l = 0; l < 8; l++) {
            if (data.board[k][l] === `${turn}k`) {
                ki = k
                kj = l
            }
        }
    }


    if (turn === "W") {  //checking for pawns
        if (data.board[ki - 1] !== undefined) {
            if (data.board[ki - 1][kj + 1] !== undefined) {
                if (data.board[ki - 1][kj + 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
        if (data.board[ki - 1] !== undefined) {
            if (data.board[ki - 1][kj - 1] !== undefined) {
                if (data.board[ki - 1][kj - 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
    } else {
        if (data.board[ki + 1] !== undefined) {
            if (data.board[ki + 1][kj + 1] !== undefined) {
                if (data.board[ki + 1][kj + 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
        if (data.board[ki + 1] !== undefined) {
            if (data.board[ki + 1][kj - 1] !== undefined) {
                if (data.board[ki + 1][kj - 1] === `${opponent}p`) {
                    check = true;
                }
            }
        }
    }

    array = [];
    function lineCheck(inc1, inc2) {   //looks in every direction from the king
        for (let m = 1; m < 8; m++) {
            if (data.board[ki + inc1 * m] !== undefined) {
                if (data.board[ki + inc1 * m][kj + inc2 * m] !== undefined) {
                    if (data.board[ki + inc1 * m][kj + inc2 * m] !== "e") {
                        if (data.board[ki + inc1 * m][kj + inc2 * m] === `${opponent}k` && m === 1) {
                            array.push("!")
                            m = 8;
                        } else {
                            array.push(data.board[ki + inc1 * m][kj + inc2 * m]);
                            m = 8;
                        }
                    }
                } else {
                    array.push("e")
                    m = 8;
                }
            } else {
                array.push("e")
                m = 8;
            }
        }
        return array;
    }
    for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <= 1; b++) {
            lineCheck(a, b)
        }
    }
    console.log("king line array:", array)


    if (array.includes("!") || array.includes(`${opponent}q`)) { //check for kings and queens
        check = true;
    }
    for (let c = 0; c < 9; c += 2) { //check diagonals
        if (array[c] === `${opponent}b`) {
            check = true;
        }
    }
    for (let c = 1; c < 9; c += 2) { //check straights
        if (array[c] === `${opponent}r`) {
            check = true;
        }
    }
    var knightKingCheck = function (lMove) {
        for (item in lMove) {
            if (data.board[ki + lMove[0]] !== undefined) {
                if (data.board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                    if (data.board[ki + lMove[0]][kj + lMove[1]] === `${opponent}n`) {
                        check = true;
                    }
                }
            }
        }
    }

    var x = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]

    for (let q = 0; q < x.length; q++) {
        knightKingCheck(x[q])
    }


    return check;
}

module.exports = isInCheck;
},{"./data":2}],5:[function(require,module,exports){
var data = require("./data")
var domPrinter = require("./domPrinter")

data.getLegalMoves();
data.removeChecks();
domPrinter();

//data.executeMove("Wp6353")

//data.executeMove("Bp1323");

console.log("Board:", data.board)
console.log("Legal moves:", data.legalMoves)

document.getElementById("display").addEventListener("click", function(){
    console.log(data.board)
    console.log(data.legalMoves)
})





},{"./data":2,"./domPrinter":3}],6:[function(require,module,exports){
var data = require("./data")

var makeMove = function(classList, id){

    if(classList === "active"){
        if(data.selectedPiece.includes("k") && id === "76"){
            data.executeMove("whiteCastleRight")
        } else if (data.selectedPiece.includes("k") && id === "72"){
            data.executeMove("whiteCastleLeft")
        } else if(data.selectedPiece.includes("k") && id === "02"){
            data.executeMove("blackCastleLeft")
        } else if(data.selectedPiece.includes("k") && id === "06"){
            data.executeMove("blackCastleRight")
        } else {
            let f = id;
            if(id.length > 2){
                f = id.slice(2,4);
            }
            data.executeMove(data.selectedPiece+f)
        }
    }
}

module.exports = makeMove
},{"./data":2}],7:[function(require,module,exports){
var data = require("./data")

var selectPiece = function(id){
    let arr = document.querySelectorAll(".active");
    for(let i = 0; i < arr.length; i++){
        arr[i].classList = " "
    }

    if(data.legalMoves[id] !== undefined){
        data.selectedPiece = id;
        for(let i = 0; i < data.legalMoves[id].length; i++){
            let myi = data.legalMoves[id][i].slice(4,5);
            let myj = data.legalMoves[id][i].slice(5,6);
            let a = "";
            if(data.board[myi][myj] !== "e"){
                a = data.board[myi][myj]
            }

            document.getElementById(a+myi+myj).className = "active";
        }
    }

    if(id.includes("k")){  //castle stuff
        if(data.legalMoves.castle !== undefined){
            console.log("pullingCastleMoves")
            for(let i = 0; i < data.legalMoves.castle.length; i++){
                if(data.legalMoves.castle[i] === "whiteCastleLeft"){
                    document.getElementById("72").className = "active";
                }
                if(data.legalMoves.castle[i] === "whiteCastleRight"){
                    document.getElementById("76").className = "active";
                }
                if(data.legalMoves.castle[i] === "blackCastleLeft"){
                    document.getElementById("02").className = "active";
                }
                if(data.legalMoves.castle[i] === "blackCastleRight"){
                    document.getElementById("06").className = "active";
                }
            }
        }
    }
}

module.exports = selectPiece;
},{"./data":2}]},{},[1,2,3,4,5,6,7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2NhbkNhc3RsZS5qcyIsInNjcmlwdHMvZGF0YS5qcyIsInNjcmlwdHMvZG9tUHJpbnRlci5qcyIsInNjcmlwdHMvaXNJbkNoZWNrLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9tYWtlTW92ZS5qcyIsInNjcmlwdHMvc2VsZWN0UGllY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3J1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcbnZhciBpbkNoZWNrID0gcmVxdWlyZShcIi4vaXNJbkNoZWNrXCIpXHJcblxyXG52YXIgY2FuQ2FzdGxlID0gZnVuY3Rpb24gKHR1cm4pIHtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEuYm9hcmQsIFwiIVwiKVxyXG4gICAgbGV0IGFyciA9IFsxLCAxXVxyXG4gICAgbGV0IGhvbGRlciA9IFtdXHJcblxyXG4gICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRbN11bNF0gIT09IFwiV2tcIikge1xyXG4gICAgICAgICAgICBhcnIgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5oaXN0b3J5Lmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCJrXCIpKSB7IC8vbG9va2luZyBmb3Iga2luZyBtb3Zlc1xyXG4gICAgICAgICAgICAgICAgYXJyID0gWzAsIDBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uc2xpY2UoMiwgNCkgPT09IFwiNzBcIikgeyAvL2xvb2tpbmcgZm9yIHJvb2sgbW92ZXNcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5zbGljZSgyLCA0KSA9PT0gXCI3N1wiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0YS5oaXN0b3J5Lmxlbmd0aDsgaSArPSAyKSB7ICAvL2xvb2tpbmcgZm9yIGNoZWNrc1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwiIVwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gWzAsIDBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspIHsgLy9tYWtpbmcgc3VyZSB0aGUgc3BhY2UgaXMgZW1wdHlcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gZGF0YS5ib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuYm9hcmRbN11baV0gPSBcIldrXCJcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkNoZWNrKFwiV1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXVtrXSA9IGhvbGRlcltqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFs3XVtpXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gNTsgaSA8IDc7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEuYm9hcmRbN11baV0gPSBcIldrXCJcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkNoZWNrKFwiV1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdW2tdID0gaG9sZGVyW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkWzddW2ldICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRbMF1bNF0gIT09IFwiQmtcIikge1xyXG4gICAgICAgICAgICBhcnIgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0YS5oaXN0b3J5Lmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCJrXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBbMCwgMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5zbGljZSgyLCA0KSA9PT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uc2xpY2UoMiwgNCkgPT09IFwiMDdcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaGlzdG9yeS5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwiIVwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gWzAsIDBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBob2xkZXJbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gZGF0YS5ib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhLmJvYXJkWzBdW2ldID0gXCJCa1wiXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5DaGVjayhcIkJcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXVtrXSA9IGhvbGRlcltqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFswXVtpXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gNTsgaSA8IDc7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1baV0gPSBcIkJrXCJcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkNoZWNrKFwiQlwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdW2tdID0gaG9sZGVyW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkWzBdW2ldICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2FuQ2FzdGxlOyIsInZhciBkYXRhID0ge1xyXG4gICAgYm9hcmQ6IFtcclxuICAgICAgICBbXCJCclwiLCBcIkJuXCIsIFwiQmJcIiwgXCJCcVwiLCBcIkJrXCIsIFwiQmJcIiwgXCJCblwiLCBcIkJyXCJdLFxyXG4gICAgICAgIFtcIkJwXCIsIFwiQnBcIiwgXCJCcFwiLCBcIkJwXCIsIFwiQnBcIiwgXCJCcFwiLCBcIkJwXCIsIFwiQnBcIl0sXHJcbiAgICAgICAgW1wiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIixdLFxyXG4gICAgICAgIFtcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsXSxcclxuICAgICAgICBbXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLF0sXHJcbiAgICAgICAgW1wiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIixdLFxyXG4gICAgICAgIFtcIldwXCIsIFwiV3BcIiwgXCJXcFwiLCBcIldwXCIsIFwiV3BcIiwgXCJXcFwiLCBcIldwXCIsIFwiV3BcIl0sXHJcbiAgICAgICAgW1wiV3JcIiwgXCJXblwiLCBcIldiXCIsIFwiV3FcIiwgXCJXa1wiLCBcIldiXCIsIFwiV25cIiwgXCJXclwiXVxyXG4gICAgXSxcclxuICAgIHR1cm46IFwiV1wiLFxyXG4gICAgb3Bwb25lbnQ6IFwiQlwiLFxyXG4gICAgdHVyblN3aXRjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhID0gZGF0YS50dXJuO1xyXG4gICAgICAgIGRhdGEudHVybiA9IGRhdGEub3Bwb25lbnQ7XHJcbiAgICAgICAgZGF0YS5vcHBvbmVudCA9IGE7XHJcbiAgICB9LFxyXG4gICAgaGlzdG9yeTogW10sXHJcbiAgICBsZWdhbE1vdmVzOiB7fSxcclxuICAgIG1vdmU6IGZ1bmN0aW9uIChtLCBmKSB7XHJcbiAgICAgICAgbGV0IHBpZWNlID0gbS5zbGljZSgwLCAyKTtcclxuICAgICAgICBsZXQgb2dQb3NpID0gbS5zbGljZSgyLCAzKTtcclxuICAgICAgICBsZXQgb2dQb3NqID0gbS5zbGljZSgzLCA0KTtcclxuICAgICAgICBsZXQgbmV3UG9zaSA9IG0uc2xpY2UoNCwgNSk7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2ogPSBtLnNsaWNlKDUsIDYpO1xyXG4gICAgICAgIGxldCBkID0gZjtcclxuXHJcbiAgICAgICAgZFtuZXdQb3NpXVtuZXdQb3NqXSA9IHBpZWNlO1xyXG4gICAgICAgIGRbb2dQb3NpXVtvZ1Bvc2pdID0gXCJlXCI7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9LFxyXG4gICAgbGVnYWxNb3Zlc1B1c2g6IGZ1bmN0aW9uIChtb3ZlKSB7XHJcbiAgICAgICAgbGV0IGJvb2wgPSB0cnVlO1xyXG4gICAgICAgIGxldCB6ID0ge307XHJcbiAgICAgICAgbGV0IHBpZWNlID0gbW92ZS5zbGljZSgwLCAyKVxyXG4gICAgICAgIGxldCBzdGFydCA9IG1vdmUuc2xpY2UoMiwgNClcclxuICAgICAgICBmb3IgKGl0ZW0gaW4gZGF0YS5sZWdhbE1vdmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09PSBgJHtwaWVjZSArIHN0YXJ0fWApIHtcclxuICAgICAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9vbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzW2Ake3BpZWNlICsgc3RhcnR9YF0ucHVzaChtb3ZlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNbYCR7cGllY2UgKyBzdGFydH1gXSA9IFttb3ZlXTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0TGVnYWxNb3ZlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7ICAgICAgICAgICAgICAgICAgLy9yb3dcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwaWVjZSA9IGRhdGEuYm9hcmRbaV1bal0gICAgICAgICAgICAgLy9jb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdLmluY2x1ZGVzKGRhdGEudHVybikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwia1wiKSkgeyAgLy9raW5nIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IC0xOyBrIDw9IDE7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbCA9IC0xOyBsIDw9IDE7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsgbF0gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsgbF0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsgbH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsgbF0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBsfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJwXCIpKSB7ICAgICAgICAgICAgICAgICAgICAvL3Bhd24gbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJXXCIpICYmIGRhdGEudHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqXSA9PT0gXCJlXCIpIHsgICAgICAgICAgLy9zaW5nbGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDJdW2pdID09PSBcImVcIiAmJiBpID09PSA2KSB7ICAvL2RvdWJsZSBtb3ZlIGZvcndhcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDJ9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqIC0gMV0uaW5jbHVkZXMoXCJCXCIpKSB7ICAvL3Rha2UgdG8gdGhlIGxlZnQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0gMX0ke2ogLSAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqICsgMV0uaW5jbHVkZXMoXCJCXCIpKSB7ICAvL3Rha2UgdG8gdGhlIHJpZ2h0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqICsgMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGllY2UuaW5jbHVkZXMoXCJCXCIpICYmIGRhdGEudHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqXSA9PT0gXCJlXCIpIHsgICAgICAgICAgLy9zaW5nbGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDF9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDJdW2pdID09PSBcImVcIiAmJiBpID09PSAxKSB7ICAvL2RvdWJsZSBtb3ZlIGZvcndhcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDJ9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqIC0gMV0uaW5jbHVkZXMoXCJXXCIpKSB7ICAvL3Rha2UgdG8gdGhlIGxlZnQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMX0ke2ogLSAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqICsgMV0uaW5jbHVkZXMoXCJXXCIpKSB7ICAvL3Rha2UgdG8gdGhlIHJpZ2h0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDF9JHtqICsgMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiclwiKSkgeyAgLy9yb29rIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11bal0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1baiArIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcIm5cIikpIHsgLy9rbmlnaHQgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga25pZ2h0TW92ZSA9IGZ1bmN0aW9uIChyLCBjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgcl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyByXVtqICsgY10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgcl1baiArIGNdID09PSBcImVcIiB8fCBkYXRhLmJvYXJkW2kgKyByXVtqICsgY10uaW5jbHVkZXMoYCR7ZGF0YS5vcHBvbmVudH1gKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIHJ9JHtqICsgY31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgyLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDIsIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0yLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0yLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgxLCAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDEsIC0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0xLCAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0xLCAtMilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcImJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJxXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11bal0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11bal0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11bal0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd24gcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqICsga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd24gbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5ib2FyZClcclxuICAgICAgICB2YXIgY2FuQ2FzdGxlID0gcmVxdWlyZShcIi4vY2FuQ2FzdGxlXCIpXHJcbiAgICAgICAgbGV0IGEgPSBjYW5DYXN0bGUoZGF0YS50dXJuKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYm9hcmQpXHJcbiAgICAgICAgaWYgKGFbMF0gIT09IDAgfHwgYVsxXSB8fCAxKSB7XHJcbiAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEudHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgaWYgKGFbMF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJ3aGl0ZUNhc3RsZUxlZnRcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzLmNhc3RsZS5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFbMV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJ3aGl0ZUNhc3RsZVJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFbMF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJibGFja0Nhc3RsZUxlZnRcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzLmNhc3RsZS5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFbMV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJibGFja0Nhc3RsZVJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZUNoZWNrczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYm9hcmQsIFwiIVwiKVxyXG4gICAgICAgIGZvciAoaXRlbSBpbiBkYXRhLmxlZ2FsTW92ZXMpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IFwiY2FzdGxlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlZ2FsTW92ZXNbaXRlbV0ubGVuZ3RoOyBpKyspIHsgIC8vaXRlcmF0aW5nIHRocm91Z2ggZXZlcnkgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBob2xkZXIgPSBbXVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhID0gZGF0YS5tb3ZlKGRhdGEubGVnYWxNb3Zlc1tpdGVtXVtpXSwgZGF0YS5ib2FyZClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkID0gYTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnR1cm5Td2l0Y2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtpID0gXCJcIjsgIC8va2luZ3MgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICBsZXQga2ogPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7Ly9maW5kIHRoZSBraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgODsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtrXVtsXSA9PT0gYCR7ZGF0YS5vcHBvbmVudH1rYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpID0ga1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtqID0gbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEub3Bwb25lbnQgPT09IFwiV1wiKSB7ICAvL2NoZWNraW5nIGZvciBwYXduc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiArIDFdID09PSBgJHtkYXRhLnR1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiAtIDFdID09PSBgJHtkYXRhLnR1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gPT09IGAke2RhdGEudHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqIC0gMV0gPT09IGAke2RhdGEudHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGxpbmVDaGVjayhpbmMxLCBpbmMyKSB7ICAgLy9sb29rcyBpbiBldmVyeSBkaXJlY3Rpb24gZnJvbSB0aGUga2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBtID0gMTsgbSA8IDg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSA9PT0gYCR7ZGF0YS50dXJufWtgICYmIG0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYSA9IC0xOyBhIDw9IDE7IGErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBiID0gLTE7IGIgPD0gMTsgYisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQ2hlY2soYSwgYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5LmluY2x1ZGVzKFwiIVwiKSB8fCBhcnJheS5pbmNsdWRlcyhgJHtkYXRhLnR1cm59cWApKSB7IC8vY2hlY2sgZm9yIGtpbmdzIGFuZCBxdWVlbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIGRpYWdvbmFsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke2RhdGEudHVybn1iYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgc3RyYWlnaHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7ZGF0YS50dXJufXJgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrbmlnaHRLaW5nQ2hlY2sgPSBmdW5jdGlvbiAobE1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBsTW92ZVswXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dID09PSBgJHtkYXRhLnR1cm59bmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IFtbMiwgMV0sIFsyLCAtMV0sIFstMiwgMV0sIFstMiwgLTFdLCBbMSwgMl0sIFsxLCAtMl0sIFstMSwgMl0sIFstMSwgLTJdXVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHEgPSAwOyBxIDwgeC5sZW5ndGg7IHErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soeFtxXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmluYWxseSBmaW5pc2hlZCB3aXRoIGNoZWNraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZCA9IGhvbGRlcjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnR1cm5Td2l0Y2goKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2sgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIhISFyZW1vdmluZyBtb3ZlXCIsIGRhdGEubGVnYWxNb3Zlc1tpdGVtXVtpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGV4ZWN1dGVNb3ZlOiBmdW5jdGlvbiAobW92ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXhlY3V0ZSBtb3ZlIHN0YXJ0IGJvYXJkIHBvczogXCIsIGRhdGEuYm9hcmQpXHJcbiAgICAgICAgbGV0IGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGl0ZW0gaW4gZGF0YS5sZWdhbE1vdmVzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZWdhbE1vdmVzW2l0ZW1dW2ldID09PSBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMZWdhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9JIGRvbid0IHRoaW5rIGFueSBvZiB0aGlzIGlzIG5lY2Nlc3NhcnlcclxuICAgICAgICAvKmxldCBmYWtlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IGtpID0gXCJcIlxyXG4gICAgICAgIGxldCBraiA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHsvL2ZpbmQgdGhlIGtpbmdcclxuICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtpXVtqXSA9PT0gYCR7b3Bwb25lbnR9a2ApIHtcclxuICAgICAgICAgICAgICAgICAgICBraSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAga2ogPSBqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHBvbmVudCA9PT0gXCJXXCIpIHsgIC8vY2hlY2tpbmcgZm9yIHBhd25zXHJcbiAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgIHx8IGZha2VEYXRhLmJvYXJkW2tpICsgMV1bayAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGZha2VEYXRhLmJvYXJkW2tpIC0gMV1ba2ogKyAxXSA9PT0gYCR7b3Bwb25lbnR9cGAgfHwgZmFrZURhdGEuYm9hcmRba2kgLSAxXVtrIC0gMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW107XHJcbiAgICAgICAgZnVuY3Rpb24gbGluZUNoZWNrKGluYzEsIGluYzIpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDE7IG0gPCA4OyBtKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtpICsgaW5jMV1baiArIGluYzJdICE9PSBcImVcIiAmJiBmYWtlRGF0YS5ib2FyZFtpICsgaW5jMV1baiArIGluYzJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFrZURhdGEuYm9hcmRbaSArIGluYzFdW2ogKyBpbmMyXSA9PT0gb3Bwb25lbnQgKyBcImtcIiAmJiBtID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCIhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZmFrZURhdGEuYm9hcmRbaSArIGluYzFdW2ogKyBpbmMyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZha2VEYXRhLmJvYXJkW2kgKyBpbmMxXVtqICsgaW5jMl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBhID0gLTE7IGEgPD0gMTsgYSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGIgPSAtMTsgYiA8PSAxOyBiKyspIHtcclxuICAgICAgICAgICAgICAgIGxpbmVDaGVjayhhLCBiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcnJheS5pbmNsdWRlcyhcIiFcIikgfHwgYXJyYXkuaW5jbHVkZXMoYCR7dHVybn1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7dHVybn1iYCkge1xyXG4gICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgc3RyYWlnaHRzXHJcbiAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7dHVybn1yYCkge1xyXG4gICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrbmlnaHRLaW5nQ2hlY2sgPSBmdW5jdGlvbiAobE1vdmUpIHtcclxuICAgICAgICAgICAgZm9yIChpdGVtIGluIGxNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlLml0ZW1bMV1dW2tqICsgbE1vdmUuaXRlbVsyXV0gPT09IGAke3R1cm59bmApIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAga25pZ2h0S2luZ0NoZWNrKDIsIDEpXHJcbiAgICAgICAga25pZ2h0S2luZ0NoZWNrKDIsIC0xKVxyXG4gICAgICAgIGtuaWdodEtpbmdDaGVjaygtMiwgMSlcclxuICAgICAgICBrbmlnaHRLaW5nQ2hlY2soLTIsIC0xKVxyXG4gICAgICAgIGtuaWdodEtpbmdDaGVjaygxLCAyKVxyXG4gICAgICAgIGtuaWdodEtpbmdDaGVjaygxLCAtMilcclxuICAgICAgICBrbmlnaHRLaW5nQ2hlY2soLTEsIDIpXHJcbiAgICAgICAga25pZ2h0S2luZ0NoZWNrKC0xLCAtMikqL1xyXG5cclxuICAgICAgICAvL2ZpbmFsbHkgZmluaXNoZWQgd2l0aCBjaGVja2luZ1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibW92ZVwiLCBtb3ZlKVxyXG5cclxuICAgICAgICBpZiAoaXNMZWdhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbnZhbGlkIG1vdmVcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIW1vdmUuaW5jbHVkZXMoXCJDYXN0bGVcIikpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpZWNlID0gbW92ZS5zbGljZSgwLCAyKTtcclxuICAgICAgICAgICAgICAgIGxldCBvZ1Bvc2kgPSBtb3ZlLnNsaWNlKDIsIDMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9nUG9zaiA9IG1vdmUuc2xpY2UoMywgNCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zaSA9IG1vdmUuc2xpY2UoNCwgNSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3UG9zaiA9IG1vdmUuc2xpY2UoNSwgNik7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtuZXdQb3NpXVtuZXdQb3NqXSA9IHBpZWNlO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtvZ1Bvc2ldW29nUG9zal0gPSBcImVcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlID09PSBcIndoaXRlQ2FzdGxlTGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzBdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bMl0gPSBcIldrXCJcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bM10gPSBcIldyXCJcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bNF0gPSBcImVcIlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUgPT09IFwid2hpdGVDYXN0bGVSaWdodFwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzRdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bNV0gPSBcIldyXCJcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bNl0gPSBcIldrXCJcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bN10gPSBcImVcIlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUgPT09IFwiYmxhY2tDYXN0bGVMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bMF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVsyXSA9IFwiQmtcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVszXSA9IFwiQnJcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs0XSA9IFwiZVwiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZSA9PT0gXCJibGFja0Nhc3RsZVJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bNF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs1XSA9IFwiQnJcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs2XSA9IFwiQmtcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs3XSA9IFwiZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGlzSW5DaGVjayA9IHJlcXVpcmUoXCIuL2lzSW5DaGVja1wiKVxyXG4gICAgICAgICAgICBpZiAoaXNJbkNoZWNrKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnkucHVzaChgJHttb3ZlfSFgKVxyXG4gICAgICAgICAgICAgICAgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcHBvbmVudCA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJCbGFjayBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJXaGl0ZSBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChwKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnkucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhLnR1cm5Td2l0Y2goKTtcclxuICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzID0ge307XHJcbiAgICAgICAgICAgIGRhdGEuZ2V0TGVnYWxNb3ZlcygpO1xyXG4gICAgICAgICAgICBkYXRhLnJlbW92ZUNoZWNrcygpO1xyXG4gICAgICAgICAgICBsZXQgZG9tUHJpbnRlciA9IHJlcXVpcmUoXCIuL2RvbVByaW50ZXJcIilcclxuICAgICAgICAgICAgZG9tUHJpbnRlcigpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFBpZWNlID0gXCJcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJib2FyZCBhZnRlciBtb3ZlOiBcIiwgZGF0YS5ib2FyZClcclxuXHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICAgICAgZm9yIChpdGVtIGluIGRhdGEubGVnYWxNb3Zlcykge1xyXG4gICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCArIGRhdGEubGVnYWxNb3Zlc1tpdGVtXS5sZW5ndGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbZGF0YS5oaXN0b3J5Lmxlbmd0aCAtIDFdLmluY2x1ZGVzKFwiIVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9IFwiQ2hlY2ttYXRlISBXaGl0ZSB3aW5zIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIkNoZWNrbWF0ZSEgQmxhY2sgd2lucyFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IFwiVGhlcmUgaXMgYSBkcmF3XCJcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQocClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZWxlY3RlZFBpZWNlOiBcIlwiXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGF0YTsiLCJ2YXIgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxudmFyIHNlbGVjdFBpZWNlID0gcmVxdWlyZShcIi4vc2VsZWN0UGllY2VcIilcclxudmFyIG1ha2VNb3ZlID0gcmVxdWlyZShcIi4vbWFrZU1vdmVcIilcclxuXHJcbnZhciBkb21QcmludGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBtYWtlTW92ZShlLnRhcmdldC5jbGFzc05hbWUsIGUudGFyZ2V0LmlkKVxyXG4gICAgICAgIG1ha2VNb3ZlKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkKVxyXG4gICAgfSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICByb3cuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBib3guaWQgPSBpLnRvU3RyaW5nKCkgKyBqLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGJveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBibGFja1wiO1xyXG4gICAgICAgICAgICBib3guc3R5bGUud2lkdGggPSBcIjc1cHhcIjtcclxuICAgICAgICAgICAgYm94LnN0eWxlLmhlaWdodCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGJveC5pZCA9IGRhdGEuYm9hcmRbaV1bal0gKyBpLnRvU3RyaW5nKCkgKyBqLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqXS5pbmNsdWRlcyhkYXRhLnR1cm4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFBpZWNlKGJveC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpbWdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUud2lkdGggPSBcIjc1cHhcIjtcclxuICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5oZWlnaHQgPSBcIjc1cHhcIjtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dwLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xci5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV24ucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1diLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXcVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9XcS5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV2tcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV2sucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JwLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cci5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQm5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQm4ucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JiLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCcVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9CcS5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQmtcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQmsucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYm94LmFwcGVuZENoaWxkKGltZ0RpdilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikuYXBwZW5kQ2hpbGQocm93KVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRvbVByaW50ZXIiLCJ2YXIgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxuXHJcbnZhciBpc0luQ2hlY2sgPSBmdW5jdGlvbiAodHVybikge1xyXG4gICAgbGV0IG9wcG9uZW50ID0gXCJXXCJcclxuICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgIG9wcG9uZW50ID0gXCJCXCJcclxuICAgIH1cclxuXHJcbiAgICBjaGVjayA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBraSA9IFwiXCI7ICAvL2tpbmdzIHBvc2l0aW9uXHJcbiAgICBsZXQga2ogPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHsvL2ZpbmQgdGhlIGtpbmdcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IDg7IGwrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtrXVtsXSA9PT0gYCR7dHVybn1rYCkge1xyXG4gICAgICAgICAgICAgICAga2kgPSBrXHJcbiAgICAgICAgICAgICAgICBraiA9IGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7ICAvL2NoZWNraW5nIGZvciBwYXduc1xyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiArIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiArIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXJyYXkgPSBbXTtcclxuICAgIGZ1bmN0aW9uIGxpbmVDaGVjayhpbmMxLCBpbmMyKSB7ICAgLy9sb29rcyBpbiBldmVyeSBkaXJlY3Rpb24gZnJvbSB0aGUga2luZ1xyXG4gICAgICAgIGZvciAobGV0IG0gPSAxOyBtIDwgODsgbSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gPT09IGAke29wcG9uZW50fWtgICYmIG0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCIhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBhID0gLTE7IGEgPD0gMTsgYSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYiA9IC0xOyBiIDw9IDE7IGIrKykge1xyXG4gICAgICAgICAgICBsaW5lQ2hlY2soYSwgYilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhcImtpbmcgbGluZSBhcnJheTpcIiwgYXJyYXkpXHJcblxyXG5cclxuICAgIGlmIChhcnJheS5pbmNsdWRlcyhcIiFcIikgfHwgYXJyYXkuaW5jbHVkZXMoYCR7b3Bwb25lbnR9cWApKSB7IC8vY2hlY2sgZm9yIGtpbmdzIGFuZCBxdWVlbnNcclxuICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIGRpYWdvbmFsc1xyXG4gICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7b3Bwb25lbnR9YmApIHtcclxuICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAobGV0IGMgPSAxOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgc3RyYWlnaHRzXHJcbiAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHtvcHBvbmVudH1yYCkge1xyXG4gICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIGtuaWdodEtpbmdDaGVjayA9IGZ1bmN0aW9uIChsTW92ZSkge1xyXG4gICAgICAgIGZvciAoaXRlbSBpbiBsTW92ZSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXVtraiArIGxNb3ZlWzFdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gPT09IGAke29wcG9uZW50fW5gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHggPSBbWzIsIDFdLCBbMiwgLTFdLCBbLTIsIDFdLCBbLTIsIC0xXSwgWzEsIDJdLCBbMSwgLTJdLCBbLTEsIDJdLCBbLTEsIC0yXV1cclxuXHJcbiAgICBmb3IgKGxldCBxID0gMDsgcSA8IHgubGVuZ3RoOyBxKyspIHtcclxuICAgICAgICBrbmlnaHRLaW5nQ2hlY2soeFtxXSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIGNoZWNrO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5DaGVjazsiLCJ2YXIgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxudmFyIGRvbVByaW50ZXIgPSByZXF1aXJlKFwiLi9kb21QcmludGVyXCIpXHJcblxyXG5kYXRhLmdldExlZ2FsTW92ZXMoKTtcclxuZGF0YS5yZW1vdmVDaGVja3MoKTtcclxuZG9tUHJpbnRlcigpO1xyXG5cclxuLy9kYXRhLmV4ZWN1dGVNb3ZlKFwiV3A2MzUzXCIpXHJcblxyXG4vL2RhdGEuZXhlY3V0ZU1vdmUoXCJCcDEzMjNcIik7XHJcblxyXG5jb25zb2xlLmxvZyhcIkJvYXJkOlwiLCBkYXRhLmJvYXJkKVxyXG5jb25zb2xlLmxvZyhcIkxlZ2FsIG1vdmVzOlwiLCBkYXRhLmxlZ2FsTW92ZXMpXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkKVxyXG4gICAgY29uc29sZS5sb2coZGF0YS5sZWdhbE1vdmVzKVxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcblxyXG52YXIgbWFrZU1vdmUgPSBmdW5jdGlvbihjbGFzc0xpc3QsIGlkKXtcclxuXHJcbiAgICBpZihjbGFzc0xpc3QgPT09IFwiYWN0aXZlXCIpe1xyXG4gICAgICAgIGlmKGRhdGEuc2VsZWN0ZWRQaWVjZS5pbmNsdWRlcyhcImtcIikgJiYgaWQgPT09IFwiNzZcIil7XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUoXCJ3aGl0ZUNhc3RsZVJpZ2h0XCIpXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnNlbGVjdGVkUGllY2UuaW5jbHVkZXMoXCJrXCIpICYmIGlkID09PSBcIjcyXCIpe1xyXG4gICAgICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlKFwid2hpdGVDYXN0bGVMZWZ0XCIpXHJcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEuc2VsZWN0ZWRQaWVjZS5pbmNsdWRlcyhcImtcIikgJiYgaWQgPT09IFwiMDJcIil7XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUoXCJibGFja0Nhc3RsZUxlZnRcIilcclxuICAgICAgICB9IGVsc2UgaWYoZGF0YS5zZWxlY3RlZFBpZWNlLmluY2x1ZGVzKFwia1wiKSAmJiBpZCA9PT0gXCIwNlwiKXtcclxuICAgICAgICAgICAgZGF0YS5leGVjdXRlTW92ZShcImJsYWNrQ2FzdGxlUmlnaHRcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZiA9IGlkO1xyXG4gICAgICAgICAgICBpZihpZC5sZW5ndGggPiAyKXtcclxuICAgICAgICAgICAgICAgIGYgPSBpZC5zbGljZSgyLDQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUoZGF0YS5zZWxlY3RlZFBpZWNlK2YpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1ha2VNb3ZlIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcblxyXG52YXIgc2VsZWN0UGllY2UgPSBmdW5jdGlvbihpZCl7XHJcbiAgICBsZXQgYXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY3RpdmVcIik7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBhcnJbaV0uY2xhc3NMaXN0ID0gXCIgXCJcclxuICAgIH1cclxuXHJcbiAgICBpZihkYXRhLmxlZ2FsTW92ZXNbaWRdICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGRhdGEuc2VsZWN0ZWRQaWVjZSA9IGlkO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlZ2FsTW92ZXNbaWRdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG15aSA9IGRhdGEubGVnYWxNb3Zlc1tpZF1baV0uc2xpY2UoNCw1KTtcclxuICAgICAgICAgICAgbGV0IG15aiA9IGRhdGEubGVnYWxNb3Zlc1tpZF1baV0uc2xpY2UoNSw2KTtcclxuICAgICAgICAgICAgbGV0IGEgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZihkYXRhLmJvYXJkW215aV1bbXlqXSAhPT0gXCJlXCIpe1xyXG4gICAgICAgICAgICAgICAgYSA9IGRhdGEuYm9hcmRbbXlpXVtteWpdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGErbXlpK215aikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaWQuaW5jbHVkZXMoXCJrXCIpKXsgIC8vY2FzdGxlIHN0dWZmXHJcbiAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwdWxsaW5nQ2FzdGxlTW92ZXNcIilcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZVtpXSA9PT0gXCJ3aGl0ZUNhc3RsZUxlZnRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCI3MlwiKS5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZVtpXSA9PT0gXCJ3aGl0ZUNhc3RsZVJpZ2h0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiNzZcIikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwiYmxhY2tDYXN0bGVMZWZ0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiMDJcIikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwiYmxhY2tDYXN0bGVSaWdodFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjA2XCIpLmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VsZWN0UGllY2U7Il19
