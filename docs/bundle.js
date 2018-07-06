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
            if (data.history[i].includes("!") || data.history[i].includes("castle")) {
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
            if (data.history[i].includes("k") || data.history[i].includes("castle")) {
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
                                if (data.board[i - 2] !== undefined) {
                                    if (data.board[i - 2][j] === "e" && i === 6) {  //double move forward
                                        let move = `${piece}${i}${j}${i - 2}${j}`
                                        data.legalMovesPush(move)
                                    }
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
                                if (data.board[i + 2] !== undefined) {
                                    if (data.board[i + 2][j] === "e" && i === 1) {  //double move forward
                                        let move = `${piece}${i}${j}${i + 2}${j}`
                                        data.legalMovesPush(move)
                                    }
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
    executeMove: {
        start: function (move) {
            console.log("move:", move)
            let pawnPromotionCheck = require("./pawnPromotionCheck")
            console.log("execute move start board pos: ", data.board)
            pawnPromotionCheck.run();
            pawnPromotionCheck.finish(move);
        },
        finish: function (move) {
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
        }

    },
    selectedPiece: ""
}

module.exports = data;
},{"./canCastle":1,"./domPrinter":3,"./isInCheck":4,"./pawnPromotionCheck":7}],3:[function(require,module,exports){
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
},{"./data":2,"./makeMove":6,"./selectPiece":9}],4:[function(require,module,exports){
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
    console.log(data.history)
})





},{"./data":2,"./domPrinter":3}],6:[function(require,module,exports){
var data = require("./data")

var makeMove = function(classList, id){

    if(classList === "active"){
        if(data.selectedPiece.includes("k") && id === "76"){
            data.executeMove.start("whiteCastleRight")
        } else if (data.selectedPiece.includes("k") && id === "72"){
            data.executeMove.start("whiteCastleLeft")
        } else if(data.selectedPiece.includes("k") && id === "02"){
            data.executeMove.start("blackCastleLeft")
        } else if(data.selectedPiece.includes("k") && id === "06"){
            data.executeMove.start("blackCastleRight")
        } else {
            let f = id;
            if(id.length > 2){
                f = id.slice(2,4);
            }
            data.executeMove.start(data.selectedPiece+f)
        }
    }
}

module.exports = makeMove
},{"./data":2}],7:[function(require,module,exports){
let data = require("./data")
let promotePawn = require("./promotePawn")

let pawnPromotionCheck = {
    run: function(){

        if(data.turn === "B"){
            for(let i = 0; i < 8; i++){
                if(data.board[0][i] === "Wp"){
                    pawnPromotionCheck.complete = false
                    promotePawn([0, i]);
                }
            }
        } else {
            for(let i = 0; i < 8; i++){
                if(data.board[7][i] === "Bp"){
                    pawnPromotionCheck.complete = false
                    promotePawn([7, i])
                }
            }
        }
    },
    finish: function(move){
        if(data.turn === "B"){
            for(let i = 0; i < 8; i++){
                if(data.board[0][i] === "Wp"){
                    return false
                }
            }
        } else {
            for(let i = 0; i < 8; i++){
                if(data.board[7][i] === "Bp"){
                    return false
                }
            }
        }
        data.executeMove.finish(move);
    }
}
module.exports = pawnPromotionCheck
},{"./data":2,"./promotePawn":8}],8:[function(require,module,exports){
let data = require("./data")
let domPrinter = require("./domPrinter")

let promotePawn = function(posArr){
    console.log(document.getElementById("info").firstChild)
    if(document.getElementById("info").firstChild === null){
        let completePromotion = function(e){
            document.getElementById("info")
            if(e.target.id.includes("q") || e.target.id.includes("r") || e.target.id.includes("k") || e.target.id.includes("b")){
                document.getElementById("info").innerHTML = " "
                data.board[posArr[0]][posArr[1]] = `${data.opponent}${e.target.id}`

                var isInCheck = require("./isInCheck")
                if (isInCheck(data.turn)) {
                    p = document.createElement("p")
                    if (data.opponent === "B") {
                        p.textContent = "Black is in check!"
                        data.history[data.history.length -1] += "!"
                    } else {
                        p.textContent = "White is in check!"
                        data.history[data.history.length -1] += "!"
                    }

                    document.getElementById("info").appendChild(p);

                }

                data.legalMoves = {};
                data.getLegalMoves();
                data.removeChecks();
                let domPrinter = require("./domPrinter")
                domPrinter();
                selectedPiece = "";

                let count = 0
                for (item in data.legalMoves) {
                    count = count + data.legalMoves[item].length
                }
                if (count === 0) {
                    if (data.history[data.history.length - 1].includes("!")) {
                        if (data.opponent === "B") {
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
        }
        let returnBox = function(id){
            let box = document.createElement("div")
            box.style.width = "75px"
            box.style.height = "75px"
            box.id = id
            box.addEventListener("click", completePromotion)
            return box
        }
        let knightBox = returnBox("n");
        let bishopBox = returnBox("b");
        let rookBox = returnBox("r");
        let queenBox = returnBox("q");
        document.getElementById("info").appendChild(knightBox)
        document.getElementById("info").appendChild(bishopBox)
        document.getElementById("info").appendChild(rookBox)
        document.getElementById("info").appendChild(queenBox)
        if(data.opponent === "W"){
            document.getElementById("n").style.backgroundImage = "url('./img/Wn.png')"
            document.getElementById("b").style.backgroundImage = "url('./img/Wb.png')"
            document.getElementById("r").style.backgroundImage = "url('./img/Wr.png')"
            document.getElementById("q").style.backgroundImage = "url('./img/Wq.png')"
        } else {
            document.getElementById("n").style.backgroundImage = "url('./img/Bn.png')"
            document.getElementById("b").style.backgroundImage = "url('./img/Bb.png')"
            document.getElementById("r").style.backgroundImage = "url('./img/Br.png')"
            document.getElementById("q").style.backgroundImage = "url('./img/Bq.png')"
        }
    }
}

module.exports = promotePawn
},{"./data":2,"./domPrinter":3,"./isInCheck":4}],9:[function(require,module,exports){
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
},{"./data":2}]},{},[1,2,3,4,5,6,7,8,9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2NhbkNhc3RsZS5qcyIsInNjcmlwdHMvZGF0YS5qcyIsInNjcmlwdHMvZG9tUHJpbnRlci5qcyIsInNjcmlwdHMvaXNJbkNoZWNrLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9tYWtlTW92ZS5qcyIsInNjcmlwdHMvcGF3blByb21vdGlvbkNoZWNrLmpzIiwic2NyaXB0cy9wcm9tb3RlUGF3bi5qcyIsInNjcmlwdHMvc2VsZWN0UGllY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0dkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcbnZhciBpbkNoZWNrID0gcmVxdWlyZShcIi4vaXNJbkNoZWNrXCIpXHJcblxyXG52YXIgY2FuQ2FzdGxlID0gZnVuY3Rpb24gKHR1cm4pIHtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEuYm9hcmQsIFwiIVwiKVxyXG4gICAgbGV0IGFyciA9IFsxLCAxXVxyXG4gICAgbGV0IGhvbGRlciA9IFtdXHJcblxyXG4gICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRbN11bNF0gIT09IFwiV2tcIikge1xyXG4gICAgICAgICAgICBhcnIgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5oaXN0b3J5Lmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCJrXCIpKSB7IC8vbG9va2luZyBmb3Iga2luZyBtb3Zlc1xyXG4gICAgICAgICAgICAgICAgYXJyID0gWzAsIDBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uc2xpY2UoMiwgNCkgPT09IFwiNzBcIikgeyAvL2xvb2tpbmcgZm9yIHJvb2sgbW92ZXNcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5zbGljZSgyLCA0KSA9PT0gXCI3N1wiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0YS5oaXN0b3J5Lmxlbmd0aDsgaSArPSAyKSB7ICAvL2xvb2tpbmcgZm9yIGNoZWNrc1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwiIVwiKSB8fCBkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCJjYXN0bGVcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IFswLCAwXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNDsgaSsrKSB7IC8vbWFraW5nIHN1cmUgdGhlIHNwYWNlIGlzIGVtcHR5XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBob2xkZXJbal0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRlcltqXVtrXSA9IGRhdGEuYm9hcmRbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLmJvYXJkWzddW2ldID0gXCJXa1wiXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5DaGVjayhcIldcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal0gPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal1ba10gPSBob2xkZXJbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbN11baV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDU7IGkgPCA3OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBob2xkZXJbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gZGF0YS5ib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhLmJvYXJkWzddW2ldID0gXCJXa1wiXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5DaGVjayhcIldcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXVtrXSA9IGhvbGRlcltqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFs3XVtpXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkWzBdWzRdICE9PSBcIkJrXCIpIHtcclxuICAgICAgICAgICAgYXJyID0gWzAsIDBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGEuaGlzdG9yeS5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwia1wiKSB8fCBkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCJjYXN0bGVcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IFswLCAwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLnNsaWNlKDIsIDQpID09PSBcIjAwXCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5zbGljZSgyLCA0KSA9PT0gXCIwN1wiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5oaXN0b3J5Lmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCIhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBbMCwgMF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1baV0gPSBcIkJrXCJcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkNoZWNrKFwiQlwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdW2tdID0gaG9sZGVyW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkWzBdW2ldICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSA1OyBpIDwgNzsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaG9sZGVyW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRlcltqXVtrXSA9IGRhdGEuYm9hcmRbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGF0YS5ib2FyZFswXVtpXSA9IFwiQmtcIlxyXG5cclxuICAgICAgICAgICAgaWYgKGluQ2hlY2soXCJCXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal1ba10gPSBob2xkZXJbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbMF1baV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFycjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYW5DYXN0bGU7IiwidmFyIGRhdGEgPSB7XHJcbiAgICBib2FyZDogW1xyXG4gICAgICAgIFtcIkJyXCIsIFwiQm5cIiwgXCJCYlwiLCBcIkJxXCIsIFwiQmtcIiwgXCJCYlwiLCBcIkJuXCIsIFwiQnJcIl0sXHJcbiAgICAgICAgW1wiQnBcIiwgXCJCcFwiLCBcIkJwXCIsIFwiQnBcIiwgXCJCcFwiLCBcIkJwXCIsIFwiQnBcIiwgXCJCcFwiXSxcclxuICAgICAgICBbXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLF0sXHJcbiAgICAgICAgW1wiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIixdLFxyXG4gICAgICAgIFtcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsXSxcclxuICAgICAgICBbXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLF0sXHJcbiAgICAgICAgW1wiV3BcIiwgXCJXcFwiLCBcIldwXCIsIFwiV3BcIiwgXCJXcFwiLCBcIldwXCIsIFwiV3BcIiwgXCJXcFwiXSxcclxuICAgICAgICBbXCJXclwiLCBcIlduXCIsIFwiV2JcIiwgXCJXcVwiLCBcIldrXCIsIFwiV2JcIiwgXCJXblwiLCBcIldyXCJdXHJcbiAgICBdLFxyXG4gICAgdHVybjogXCJXXCIsXHJcbiAgICBvcHBvbmVudDogXCJCXCIsXHJcbiAgICB0dXJuU3dpdGNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGEgPSBkYXRhLnR1cm47XHJcbiAgICAgICAgZGF0YS50dXJuID0gZGF0YS5vcHBvbmVudDtcclxuICAgICAgICBkYXRhLm9wcG9uZW50ID0gYTtcclxuICAgIH0sXHJcbiAgICBoaXN0b3J5OiBbXSxcclxuICAgIGxlZ2FsTW92ZXM6IHt9LFxyXG4gICAgbW92ZTogZnVuY3Rpb24gKG0sIGYpIHtcclxuICAgICAgICBsZXQgcGllY2UgPSBtLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgIGxldCBvZ1Bvc2kgPSBtLnNsaWNlKDIsIDMpO1xyXG4gICAgICAgIGxldCBvZ1Bvc2ogPSBtLnNsaWNlKDMsIDQpO1xyXG4gICAgICAgIGxldCBuZXdQb3NpID0gbS5zbGljZSg0LCA1KTtcclxuICAgICAgICBsZXQgbmV3UG9zaiA9IG0uc2xpY2UoNSwgNik7XHJcbiAgICAgICAgbGV0IGQgPSBmO1xyXG5cclxuICAgICAgICBkW25ld1Bvc2ldW25ld1Bvc2pdID0gcGllY2U7XHJcbiAgICAgICAgZFtvZ1Bvc2ldW29nUG9zal0gPSBcImVcIjtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH0sXHJcbiAgICBsZWdhbE1vdmVzUHVzaDogZnVuY3Rpb24gKG1vdmUpIHtcclxuICAgICAgICBsZXQgYm9vbCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHogPSB7fTtcclxuICAgICAgICBsZXQgcGllY2UgPSBtb3ZlLnNsaWNlKDAsIDIpXHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gbW92ZS5zbGljZSgyLCA0KVxyXG4gICAgICAgIGZvciAoaXRlbSBpbiBkYXRhLmxlZ2FsTW92ZXMpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gPT09IGAke3BpZWNlICsgc3RhcnR9YCkge1xyXG4gICAgICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29sID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNbYCR7cGllY2UgKyBzdGFydH1gXS5wdXNoKG1vdmUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1tgJHtwaWVjZSArIHN0YXJ0fWBdID0gW21vdmVdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRMZWdhbE1vdmVzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHsgICAgICAgICAgICAgICAgICAvL3Jvd1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpZWNlID0gZGF0YS5ib2FyZFtpXVtqXSAgICAgICAgICAgICAvL2NvbHVtblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1bal0uaW5jbHVkZXMoZGF0YS50dXJuKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJrXCIpKSB7ICAvL2tpbmcgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gLTE7IGsgPD0gMTsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsID0gLTE7IGwgPD0gMTsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBsXSAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBsXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBsfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBsXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGx9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInBcIikpIHsgICAgICAgICAgICAgICAgICAgIC8vcGF3biBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcIldcIikgJiYgZGF0YS50dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDFdW2pdID09PSBcImVcIikgeyAgICAgICAgICAvL3NpbmdsZSBtb3ZlIGZvcndhcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0gMX0ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0gMl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0gMl1bal0gPT09IFwiZVwiICYmIGkgPT09IDYpIHsgIC8vZG91YmxlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDJ9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0gMV1baiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0gMV1baiAtIDFdLmluY2x1ZGVzKFwiQlwiKSkgeyAgLy90YWtlIHRvIHRoZSBsZWZ0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqIC0gMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0gMV1baiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0gMV1baiArIDFdLmluY2x1ZGVzKFwiQlwiKSkgeyAgLy90YWtlIHRvIHRoZSByaWdodCBXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSAxfSR7aiArIDF9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBpZWNlLmluY2x1ZGVzKFwiQlwiKSAmJiBkYXRhLnR1cm4gPT09IFwiQlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgMV1bal0gPT09IFwiZVwiKSB7ICAgICAgICAgIC8vc2luZ2xlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyAxfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAyXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAyXVtqXSA9PT0gXCJlXCIgJiYgaSA9PT0gMSkgeyAgLy9kb3VibGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMn0ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDFdW2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDFdW2ogLSAxXS5pbmNsdWRlcyhcIldcIikpIHsgIC8vdGFrZSB0byB0aGUgbGVmdCBXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyAxfSR7aiAtIDF9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDFdW2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDFdW2ogKyAxXS5pbmNsdWRlcyhcIldcIikpIHsgIC8vdGFrZSB0byB0aGUgcmlnaHQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMX0ke2ogKyAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJyXCIpKSB7ICAvL3Jvb2sgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11bal0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11bal0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiblwiKSkgeyAvL2tuaWdodCBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBrbmlnaHRNb3ZlID0gZnVuY3Rpb24gKHIsIGMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyByXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIHJdW2ogKyBjXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyByXVtqICsgY10gPT09IFwiZVwiIHx8IGRhdGEuYm9hcmRbaSArIHJdW2ogKyBjXS5pbmNsdWRlcyhgJHtkYXRhLm9wcG9uZW50fWApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgcn0ke2ogKyBjfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDIsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMiwgLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTIsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTIsIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDEsIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMSwgLTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTEsIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTEsIC0yKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiYlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInFcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11bal0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11bal0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11bal0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2xlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkKVxyXG4gICAgICAgIHZhciBjYW5DYXN0bGUgPSByZXF1aXJlKFwiLi9jYW5DYXN0bGVcIilcclxuICAgICAgICBsZXQgYSA9IGNhbkNhc3RsZShkYXRhLnR1cm4pXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5ib2FyZClcclxuICAgICAgICBpZiAoYVswXSAhPT0gMCB8fCBhWzFdIHx8IDEpIHtcclxuICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzLmNhc3RsZSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS50dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICBpZiAoYVswXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBcIndoaXRlQ2FzdGxlTGVmdFwiXHJcbiAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYVsxXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBcIndoaXRlQ2FzdGxlUmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzLmNhc3RsZS5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYVswXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBcImJsYWNrQ2FzdGxlTGVmdFwiXHJcbiAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYVsxXSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBcImJsYWNrQ2FzdGxlUmlnaHRcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzLmNhc3RsZS5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQ2hlY2tzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5ib2FyZCwgXCIhXCIpXHJcbiAgICAgICAgZm9yIChpdGVtIGluIGRhdGEubGVnYWxNb3Zlcykge1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gXCJjYXN0bGVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVnYWxNb3Zlc1tpdGVtXS5sZW5ndGg7IGkrKykgeyAgLy9pdGVyYXRpbmcgdGhyb3VnaCBldmVyeSBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhvbGRlciA9IFtdXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBob2xkZXJbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRlcltqXVtrXSA9IGRhdGEuYm9hcmRbal1ba11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGEgPSBkYXRhLm1vdmUoZGF0YS5sZWdhbE1vdmVzW2l0ZW1dW2ldLCBkYXRhLmJvYXJkKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmQgPSBhO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudHVyblN3aXRjaCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQga2kgPSBcIlwiOyAgLy9raW5ncyBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBraiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHsvL2ZpbmQgdGhlIGtpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCA4OyBsKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tdW2xdID09PSBgJHtkYXRhLm9wcG9uZW50fWtgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2kgPSBrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2ogPSBsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcHBvbmVudCA9PT0gXCJXXCIpIHsgIC8vY2hlY2tpbmcgZm9yIHBhd25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqICsgMV0gPT09IGAke2RhdGEudHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqIC0gMV0gPT09IGAke2RhdGEudHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogKyAxXSA9PT0gYCR7ZGF0YS50dXJufXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogLSAxXSA9PT0gYCR7ZGF0YS50dXJufXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gbGluZUNoZWNrKGluYzEsIGluYzIpIHsgICAvL2xvb2tzIGluIGV2ZXJ5IGRpcmVjdGlvbiBmcm9tIHRoZSBraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG0gPSAxOyBtIDwgODsgbSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dID09PSBgJHtkYXRhLnR1cm59a2AgJiYgbSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCIhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBhID0gLTE7IGEgPD0gMTsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGIgPSAtMTsgYiA8PSAxOyBiKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVDaGVjayhhLCBiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXkuaW5jbHVkZXMoXCIhXCIpIHx8IGFycmF5LmluY2x1ZGVzKGAke2RhdGEudHVybn1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7ZGF0YS50dXJufWJgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBzdHJhaWdodHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHtkYXRhLnR1cm59cmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtuaWdodEtpbmdDaGVjayA9IGZ1bmN0aW9uIChsTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXVtraiArIGxNb3ZlWzFdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gPT09IGAke2RhdGEudHVybn1uYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB4ID0gW1syLCAxXSwgWzIsIC0xXSwgWy0yLCAxXSwgWy0yLCAtMV0sIFsxLCAyXSwgWzEsIC0yXSwgWy0xLCAyXSwgWy0xLCAtMl1dXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcSA9IDA7IHEgPCB4Lmxlbmd0aDsgcSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjayh4W3FdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maW5hbGx5IGZpbmlzaGVkIHdpdGggY2hlY2tpbmdcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkID0gaG9sZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEudHVyblN3aXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGVjayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiEhIXJlbW92aW5nIG1vdmVcIiwgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNbaXRlbV0uc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXhlY3V0ZU1vdmU6IHtcclxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKG1vdmUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb3ZlOlwiLCBtb3ZlKVxyXG4gICAgICAgICAgICBsZXQgcGF3blByb21vdGlvbkNoZWNrID0gcmVxdWlyZShcIi4vcGF3blByb21vdGlvbkNoZWNrXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhlY3V0ZSBtb3ZlIHN0YXJ0IGJvYXJkIHBvczogXCIsIGRhdGEuYm9hcmQpXHJcbiAgICAgICAgICAgIHBhd25Qcm9tb3Rpb25DaGVjay5ydW4oKTtcclxuICAgICAgICAgICAgcGF3blByb21vdGlvbkNoZWNrLmZpbmlzaChtb3ZlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbmlzaDogZnVuY3Rpb24gKG1vdmUpIHtcclxuICAgICAgICAgICAgbGV0IGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChpdGVtIGluIGRhdGEubGVnYWxNb3Zlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlZ2FsTW92ZXNbaXRlbV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZWdhbE1vdmVzW2l0ZW1dW2ldID09PSBtb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTGVnYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL0kgZG9uJ3QgdGhpbmsgYW55IG9mIHRoaXMgaXMgbmVjY2Vzc2FyeVxyXG4gICAgICAgICAgICAvKmxldCBmYWtlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGxldCBraSA9IFwiXCJcclxuICAgICAgICAgICAgbGV0IGtqID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHsvL2ZpbmQgdGhlIGtpbmdcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZha2VEYXRhLmJvYXJkW2ldW2pdID09PSBgJHtvcHBvbmVudH1rYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBraSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtqID0gajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wcG9uZW50ID09PSBcIldcIikgeyAgLy9jaGVja2luZyBmb3IgcGF3bnNcclxuICAgICAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgIHx8IGZha2VEYXRhLmJvYXJkW2tpICsgMV1bayAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtraSAtIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgIHx8IGZha2VEYXRhLmJvYXJkW2tpIC0gMV1bayAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gbGluZUNoZWNrKGluYzEsIGluYzIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG0gPSAxOyBtIDwgODsgbSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZha2VEYXRhLmJvYXJkW2kgKyBpbmMxXVtqICsgaW5jMl0gIT09IFwiZVwiICYmIGZha2VEYXRhLmJvYXJkW2kgKyBpbmMxXVtqICsgaW5jMl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFrZURhdGEuYm9hcmRbaSArIGluYzFdW2ogKyBpbmMyXSA9PT0gb3Bwb25lbnQgKyBcImtcIiAmJiBtID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZmFrZURhdGEuYm9hcmRbaSArIGluYzFdW2ogKyBpbmMyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZmFrZURhdGEuYm9hcmRbaSArIGluYzFdW2ogKyBpbmMyXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGEgPSAtMTsgYSA8PSAxOyBhKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGIgPSAtMTsgYiA8PSAxOyBiKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lQ2hlY2soYSwgYilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYXJyYXkuaW5jbHVkZXMoXCIhXCIpIHx8IGFycmF5LmluY2x1ZGVzKGAke3R1cm59cWApKSB7IC8vY2hlY2sgZm9yIGtpbmdzIGFuZCBxdWVlbnNcclxuICAgICAgICAgICAgICAgIGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIGRpYWdvbmFsc1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHt0dXJufWJgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgc3RyYWlnaHRzXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke3R1cm59cmApIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGtuaWdodEtpbmdDaGVjayA9IGZ1bmN0aW9uIChsTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpdGVtIGluIGxNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBsTW92ZS5pdGVtWzFdXVtraiArIGxNb3ZlLml0ZW1bMl1dID09PSBgJHt0dXJufW5gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKDIsIDEpXHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygyLCAtMSlcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKC0yLCAxKVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soLTIsIC0xKVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soMSwgMilcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKDEsIC0yKVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soLTEsIDIpXHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygtMSwgLTIpKi9cclxuXHJcbiAgICAgICAgICAgIC8vZmluYWxseSBmaW5pc2hlZCB3aXRoIGNoZWNraW5nXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW92ZVwiLCBtb3ZlKVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzTGVnYWwgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkludmFsaWQgbW92ZVwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtb3ZlLmluY2x1ZGVzKFwiQ2FzdGxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBpZWNlID0gbW92ZS5zbGljZSgwLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2dQb3NpID0gbW92ZS5zbGljZSgyLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2dQb3NqID0gbW92ZS5zbGljZSgzLCA0KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UG9zaSA9IG1vdmUuc2xpY2UoNCwgNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Bvc2ogPSBtb3ZlLnNsaWNlKDUsIDYpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW25ld1Bvc2ldW25ld1Bvc2pdID0gcGllY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtvZ1Bvc2ldW29nUG9zal0gPSBcImVcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZSA9PT0gXCJ3aGl0ZUNhc3RsZUxlZnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bMF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bMl0gPSBcIldrXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzNdID0gXCJXclwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVs0XSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUgPT09IFwid2hpdGVDYXN0bGVSaWdodFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVs0XSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVs1XSA9IFwiV3JcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bNl0gPSBcIldrXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzddID0gXCJlXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZSA9PT0gXCJibGFja0Nhc3RsZUxlZnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bMF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bMl0gPSBcIkJrXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzNdID0gXCJCclwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs0XSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUgPT09IFwiYmxhY2tDYXN0bGVSaWdodFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs0XSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs1XSA9IFwiQnJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bNl0gPSBcIkJrXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzddID0gXCJlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpc0luQ2hlY2sgPSByZXF1aXJlKFwiLi9pc0luQ2hlY2tcIilcclxuICAgICAgICAgICAgICAgIGlmIChpc0luQ2hlY2soZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnkucHVzaChgJHttb3ZlfSFgKVxyXG4gICAgICAgICAgICAgICAgICAgIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJCbGFjayBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAudGV4dENvbnRlbnQgPSBcIldoaXRlIGlzIGluIGNoZWNrIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQocCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnkucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLnR1cm5Td2l0Y2goKTtcclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3ZlcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5nZXRMZWdhbE1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJlbW92ZUNoZWNrcygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbVByaW50ZXIgPSByZXF1aXJlKFwiLi9kb21QcmludGVyXCIpXHJcbiAgICAgICAgICAgICAgICBkb21QcmludGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFBpZWNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm9hcmQgYWZ0ZXIgbW92ZTogXCIsIGRhdGEuYm9hcmQpXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gMFxyXG4gICAgICAgICAgICAgICAgZm9yIChpdGVtIGluIGRhdGEubGVnYWxNb3Zlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgKyBkYXRhLmxlZ2FsTW92ZXNbaXRlbV0ubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2RhdGEuaGlzdG9yeS5sZW5ndGggLSAxXS5pbmNsdWRlcyhcIiFcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEub3Bwb25lbnQgPT09IFwiV1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9IFwiQ2hlY2ttYXRlISBXaGl0ZSB3aW5zIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9IFwiQ2hlY2ttYXRlISBCbGFjayB3aW5zIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IFwiVGhlcmUgaXMgYSBkcmF3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmFwcGVuZENoaWxkKHApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdGVkUGllY2U6IFwiXCJcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYXRhOyIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG52YXIgc2VsZWN0UGllY2UgPSByZXF1aXJlKFwiLi9zZWxlY3RQaWVjZVwiKVxyXG52YXIgbWFrZU1vdmUgPSByZXF1aXJlKFwiLi9tYWtlTW92ZVwiKVxyXG5cclxudmFyIGRvbVByaW50ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIG1ha2VNb3ZlKGUudGFyZ2V0LmNsYXNzTmFtZSwgZS50YXJnZXQuaWQpXHJcbiAgICAgICAgbWFrZU1vdmUoZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWUsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQpXHJcbiAgICB9KVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIHJvdy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGJveC5pZCA9IGkudG9TdHJpbmcoKSArIGoudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIGJsYWNrXCI7XHJcbiAgICAgICAgICAgIGJveC5zdHlsZS53aWR0aCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICBib3guc3R5bGUuaGVpZ2h0ID0gXCI3NXB4XCI7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYm94LmlkID0gZGF0YS5ib2FyZFtpXVtqXSArIGkudG9TdHJpbmcoKSArIGoudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdLmluY2x1ZGVzKGRhdGEudHVybikpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0UGllY2UoYm94LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGltZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS53aWR0aCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmhlaWdodCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV3BcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV3AucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dyLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xbi5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV2JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV2IucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dxLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXa1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xay5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQnBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQnAucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JyLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cbi5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQmJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQmIucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JxLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCa1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cay5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBib3guYXBwZW5kQ2hpbGQoaW1nRGl2KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKS5hcHBlbmRDaGlsZChyb3cpXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG9tUHJpbnRlciIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG5cclxudmFyIGlzSW5DaGVjayA9IGZ1bmN0aW9uICh0dXJuKSB7XHJcbiAgICBsZXQgb3Bwb25lbnQgPSBcIldcIlxyXG4gICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgb3Bwb25lbnQgPSBcIkJcIlxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IGtpID0gXCJcIjsgIC8va2luZ3MgcG9zaXRpb25cclxuICAgIGxldCBraiA9IFwiXCI7XHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykgey8vZmluZCB0aGUga2luZ1xyXG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgODsgbCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tdW2xdID09PSBgJHt0dXJufWtgKSB7XHJcbiAgICAgICAgICAgICAgICBraSA9IGtcclxuICAgICAgICAgICAgICAgIGtqID0gbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAodHVybiA9PT0gXCJXXCIpIHsgIC8vY2hlY2tpbmcgZm9yIHBhd25zXHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcnJheSA9IFtdO1xyXG4gICAgZnVuY3Rpb24gbGluZUNoZWNrKGluYzEsIGluYzIpIHsgICAvL2xvb2tzIGluIGV2ZXJ5IGRpcmVjdGlvbiBmcm9tIHRoZSBraW5nXHJcbiAgICAgICAgZm9yIChsZXQgbSA9IDE7IG0gPCA4OyBtKyspIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSA9PT0gYCR7b3Bwb25lbnR9a2AgJiYgbSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIiFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGEgPSAtMTsgYSA8PSAxOyBhKyspIHtcclxuICAgICAgICBmb3IgKGxldCBiID0gLTE7IGIgPD0gMTsgYisrKSB7XHJcbiAgICAgICAgICAgIGxpbmVDaGVjayhhLCBiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwia2luZyBsaW5lIGFycmF5OlwiLCBhcnJheSlcclxuXHJcblxyXG4gICAgaWYgKGFycmF5LmluY2x1ZGVzKFwiIVwiKSB8fCBhcnJheS5pbmNsdWRlcyhgJHtvcHBvbmVudH1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHtvcHBvbmVudH1iYCkge1xyXG4gICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgYyA9IDE7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBzdHJhaWdodHNcclxuICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke29wcG9uZW50fXJgKSB7XHJcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIga25pZ2h0S2luZ0NoZWNrID0gZnVuY3Rpb24gKGxNb3ZlKSB7XHJcbiAgICAgICAgZm9yIChpdGVtIGluIGxNb3ZlKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXVtraiArIGxNb3ZlWzFdXSA9PT0gYCR7b3Bwb25lbnR9bmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgeCA9IFtbMiwgMV0sIFsyLCAtMV0sIFstMiwgMV0sIFstMiwgLTFdLCBbMSwgMl0sIFsxLCAtMl0sIFstMSwgMl0sIFstMSwgLTJdXVxyXG5cclxuICAgIGZvciAobGV0IHEgPSAwOyBxIDwgeC5sZW5ndGg7IHErKykge1xyXG4gICAgICAgIGtuaWdodEtpbmdDaGVjayh4W3FdKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4gY2hlY2s7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaXNJbkNoZWNrOyIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG52YXIgZG9tUHJpbnRlciA9IHJlcXVpcmUoXCIuL2RvbVByaW50ZXJcIilcclxuXHJcblxyXG5cclxuZGF0YS5nZXRMZWdhbE1vdmVzKCk7XHJcbmRhdGEucmVtb3ZlQ2hlY2tzKCk7XHJcblxyXG5kb21QcmludGVyKCk7XHJcblxyXG4vL2RhdGEuZXhlY3V0ZU1vdmUoXCJXcDYzNTNcIilcclxuXHJcbi8vZGF0YS5leGVjdXRlTW92ZShcIkJwMTMyM1wiKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiQm9hcmQ6XCIsIGRhdGEuYm9hcmQpXHJcbmNvbnNvbGUubG9nKFwiTGVnYWwgbW92ZXM6XCIsIGRhdGEubGVnYWxNb3ZlcylcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEuYm9hcmQpXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmxlZ2FsTW92ZXMpXHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmhpc3RvcnkpXHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG4iLCJ2YXIgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxuXHJcbnZhciBtYWtlTW92ZSA9IGZ1bmN0aW9uKGNsYXNzTGlzdCwgaWQpe1xyXG5cclxuICAgIGlmKGNsYXNzTGlzdCA9PT0gXCJhY3RpdmVcIil7XHJcbiAgICAgICAgaWYoZGF0YS5zZWxlY3RlZFBpZWNlLmluY2x1ZGVzKFwia1wiKSAmJiBpZCA9PT0gXCI3NlwiKXtcclxuICAgICAgICAgICAgZGF0YS5leGVjdXRlTW92ZS5zdGFydChcIndoaXRlQ2FzdGxlUmlnaHRcIilcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuc2VsZWN0ZWRQaWVjZS5pbmNsdWRlcyhcImtcIikgJiYgaWQgPT09IFwiNzJcIil7XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUuc3RhcnQoXCJ3aGl0ZUNhc3RsZUxlZnRcIilcclxuICAgICAgICB9IGVsc2UgaWYoZGF0YS5zZWxlY3RlZFBpZWNlLmluY2x1ZGVzKFwia1wiKSAmJiBpZCA9PT0gXCIwMlwiKXtcclxuICAgICAgICAgICAgZGF0YS5leGVjdXRlTW92ZS5zdGFydChcImJsYWNrQ2FzdGxlTGVmdFwiKVxyXG4gICAgICAgIH0gZWxzZSBpZihkYXRhLnNlbGVjdGVkUGllY2UuaW5jbHVkZXMoXCJrXCIpICYmIGlkID09PSBcIjA2XCIpe1xyXG4gICAgICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlLnN0YXJ0KFwiYmxhY2tDYXN0bGVSaWdodFwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBmID0gaWQ7XHJcbiAgICAgICAgICAgIGlmKGlkLmxlbmd0aCA+IDIpe1xyXG4gICAgICAgICAgICAgICAgZiA9IGlkLnNsaWNlKDIsNCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5leGVjdXRlTW92ZS5zdGFydChkYXRhLnNlbGVjdGVkUGllY2UrZilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWFrZU1vdmUiLCJsZXQgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxubGV0IHByb21vdGVQYXduID0gcmVxdWlyZShcIi4vcHJvbW90ZVBhd25cIilcclxuXHJcbmxldCBwYXduUHJvbW90aW9uQ2hlY2sgPSB7XHJcbiAgICBydW46IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGlmKGRhdGEudHVybiA9PT0gXCJCXCIpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgODsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuYm9hcmRbMF1baV0gPT09IFwiV3BcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF3blByb21vdGlvbkNoZWNrLmNvbXBsZXRlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBwcm9tb3RlUGF3bihbMCwgaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmJvYXJkWzddW2ldID09PSBcIkJwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhd25Qcm9tb3Rpb25DaGVjay5jb21wbGV0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbW90ZVBhd24oWzcsIGldKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGZpbmlzaDogZnVuY3Rpb24obW92ZSl7XHJcbiAgICAgICAgaWYoZGF0YS50dXJuID09PSBcIkJcIil7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA4OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5ib2FyZFswXVtpXSA9PT0gXCJXcFwiKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA4OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5ib2FyZFs3XVtpXSA9PT0gXCJCcFwiKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlLmZpbmlzaChtb3ZlKTtcclxuICAgIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHBhd25Qcm9tb3Rpb25DaGVjayIsImxldCBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG5sZXQgZG9tUHJpbnRlciA9IHJlcXVpcmUoXCIuL2RvbVByaW50ZXJcIilcclxuXHJcbmxldCBwcm9tb3RlUGF3biA9IGZ1bmN0aW9uKHBvc0Fycil7XHJcbiAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuZmlyc3RDaGlsZClcclxuICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5maXJzdENoaWxkID09PSBudWxsKXtcclxuICAgICAgICBsZXQgY29tcGxldGVQcm9tb3Rpb24gPSBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpXHJcbiAgICAgICAgICAgIGlmKGUudGFyZ2V0LmlkLmluY2x1ZGVzKFwicVwiKSB8fCBlLnRhcmdldC5pZC5pbmNsdWRlcyhcInJcIikgfHwgZS50YXJnZXQuaWQuaW5jbHVkZXMoXCJrXCIpIHx8IGUudGFyZ2V0LmlkLmluY2x1ZGVzKFwiYlwiKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuaW5uZXJIVE1MID0gXCIgXCJcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbcG9zQXJyWzBdXVtwb3NBcnJbMV1dID0gYCR7ZGF0YS5vcHBvbmVudH0ke2UudGFyZ2V0LmlkfWBcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgaXNJbkNoZWNrID0gcmVxdWlyZShcIi4vaXNJbkNoZWNrXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJbkNoZWNrKGRhdGEudHVybikpIHtcclxuICAgICAgICAgICAgICAgICAgICBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcHBvbmVudCA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IFwiQmxhY2sgaXMgaW4gY2hlY2shXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5oaXN0b3J5W2RhdGEuaGlzdG9yeS5sZW5ndGggLTFdICs9IFwiIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IFwiV2hpdGUgaXMgaW4gY2hlY2shXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5oaXN0b3J5W2RhdGEuaGlzdG9yeS5sZW5ndGggLTFdICs9IFwiIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQocCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3ZlcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YS5nZXRMZWdhbE1vdmVzKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJlbW92ZUNoZWNrcygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbVByaW50ZXIgPSByZXF1aXJlKFwiLi9kb21QcmludGVyXCIpXHJcbiAgICAgICAgICAgICAgICBkb21QcmludGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFBpZWNlID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgICAgICAgICBmb3IgKGl0ZW0gaW4gZGF0YS5sZWdhbE1vdmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCArIGRhdGEubGVnYWxNb3Zlc1tpdGVtXS5sZW5ndGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbZGF0YS5oaXN0b3J5Lmxlbmd0aCAtIDFdLmluY2x1ZGVzKFwiIVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcHBvbmVudCA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5maXJzdENoaWxkLnRleHRDb250ZW50ID0gXCJDaGVja21hdGUhIFdoaXRlIHdpbnMhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5maXJzdENoaWxkLnRleHRDb250ZW50ID0gXCJDaGVja21hdGUhIEJsYWNrIHdpbnMhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJUaGVyZSBpcyBhIGRyYXdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQocClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldHVybkJveCA9IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICAgICAgYm94LnN0eWxlLndpZHRoID0gXCI3NXB4XCJcclxuICAgICAgICAgICAgYm94LnN0eWxlLmhlaWdodCA9IFwiNzVweFwiXHJcbiAgICAgICAgICAgIGJveC5pZCA9IGlkXHJcbiAgICAgICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY29tcGxldGVQcm9tb3Rpb24pXHJcbiAgICAgICAgICAgIHJldHVybiBib3hcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGtuaWdodEJveCA9IHJldHVybkJveChcIm5cIik7XHJcbiAgICAgICAgbGV0IGJpc2hvcEJveCA9IHJldHVybkJveChcImJcIik7XHJcbiAgICAgICAgbGV0IHJvb2tCb3ggPSByZXR1cm5Cb3goXCJyXCIpO1xyXG4gICAgICAgIGxldCBxdWVlbkJveCA9IHJldHVybkJveChcInFcIik7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmFwcGVuZENoaWxkKGtuaWdodEJveClcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQoYmlzaG9wQm94KVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChyb29rQm94KVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChxdWVlbkJveClcclxuICAgICAgICBpZihkYXRhLm9wcG9uZW50ID09PSBcIldcIil7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiblwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV24ucG5nJylcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1diLnBuZycpXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xci5wbmcnKVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicVwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV3EucG5nJylcIlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiblwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQm4ucG5nJylcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JiLnBuZycpXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cci5wbmcnKVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicVwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQnEucG5nJylcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwcm9tb3RlUGF3biIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG5cclxudmFyIHNlbGVjdFBpZWNlID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgbGV0IGFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWN0aXZlXCIpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgYXJyW2ldLmNsYXNzTGlzdCA9IFwiIFwiXHJcbiAgICB9XHJcblxyXG4gICAgaWYoZGF0YS5sZWdhbE1vdmVzW2lkXSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBkYXRhLnNlbGVjdGVkUGllY2UgPSBpZDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZWdhbE1vdmVzW2lkXS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBteWkgPSBkYXRhLmxlZ2FsTW92ZXNbaWRdW2ldLnNsaWNlKDQsNSk7XHJcbiAgICAgICAgICAgIGxldCBteWogPSBkYXRhLmxlZ2FsTW92ZXNbaWRdW2ldLnNsaWNlKDUsNik7XHJcbiAgICAgICAgICAgIGxldCBhID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoZGF0YS5ib2FyZFtteWldW215al0gIT09IFwiZVwiKXtcclxuICAgICAgICAgICAgICAgIGEgPSBkYXRhLmJvYXJkW215aV1bbXlqXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhK215aStteWopLmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKGlkLmluY2x1ZGVzKFwia1wiKSl7ICAvL2Nhc3RsZSBzdHVmZlxyXG4gICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicHVsbGluZ0Nhc3RsZU1vdmVzXCIpXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwid2hpdGVDYXN0bGVMZWZ0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiNzJcIikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwid2hpdGVDYXN0bGVSaWdodFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjc2XCIpLmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlW2ldID09PSBcImJsYWNrQ2FzdGxlTGVmdFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjAyXCIpLmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlW2ldID09PSBcImJsYWNrQ2FzdGxlUmlnaHRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIwNlwiKS5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGVjdFBpZWNlOyJdfQ==
