(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ai = {
    execute: function (board, turn) {
        console.log("begin AI calculation")
        const obj = ai.smartScore(board, turn)
        console.log("smartScore complete", obj)
        let bestMove = ""
        let bestMeta = -999;
        if (turn === "B") {
            bestMeta = 999
        }
        for (item in obj.start) {
            if (item !== "meta" && item !== "score" && item !== "turn" !== item !== "board" && item !== "pruneDump") {
                if (obj.start[item].meta !== undefined) {
                    if (turn === "W") {
                        if (obj.start[item].meta > bestMeta) {
                            bestMeta = obj.start[item].meta
                            bestMove = item;
                        }
                    } else {
                        if (obj.start[item].meta < bestMeta) {
                            bestMeta = obj.start[item].meta
                            bestMove = item;
                        }
                    }
                }
            }
        }
        const data = require("./data")

        console.log("Best move:", bestMove)

        data.legalMoves.bestMove = [bestMove]
        data.executeMove.start(bestMove)
    },
    makeMove: function (m, boardInput) {

        let newBoard = function (myBoard) {
            let newBoard = [[]];

            for (let j = 0; j < 8; j++) {
                newBoard[j] = []
                for (let k = 0; k < 8; k++) {
                    newBoard[j][k] = myBoard[j][k]
                }
            }

            return newBoard
        }
        const piece = m.slice(0, 2);
        const ogPosi = m.slice(2, 3);
        const ogPosj = m.slice(3, 4);
        const newPosi = m.slice(4, 5);
        const newPosj = m.slice(5, 6);

        const b = newBoard(boardInput)
        b[newPosi][newPosj] = piece;
        b[ogPosi][ogPosj] = "e";

        return b;
    },
    getLegalMoves: function (board, turn) {
        let opponent = "B"
        if (turn === "B") {
            opponent = "W"
        }

        let move = function (m, f) {
            let piece = m.slice(0, 2);
            let ogPosi = m.slice(2, 3);
            let ogPosj = m.slice(3, 4);
            let newPosi = m.slice(4, 5);
            let newPosj = m.slice(5, 6);
            let d = f;

            d[newPosi][newPosj] = piece;
            d[ogPosi][ogPosj] = "e";
            return d;
        }
        let legalMoves = [];

        for (let i = 0; i < 8; i++) {                  //row
            for (let j = 0; j < 8; j++) {
                let piece = board[i][j]             //column
                if (board[i][j].includes(turn)) {

                    if (piece.includes("k")) {  //king move
                        for (let k = -1; k <= 1; k++) {
                            for (let l = -1; l <= 1; l++) {
                                if (board[i + k] !== undefined) {
                                    if (board[i + k][j + l] !== undefined) {

                                        if (board[i + k][j + l] === "e") {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            legalMoves.push(move)
                                        }

                                        if (board[i + k][j + l].includes(opponent)) {
                                            let move = `${piece}${i}${j}${i + k}${j + l}`
                                            legalMoves.push(move)
                                        }

                                    }
                                }
                            }
                        }
                    }

                    if (piece.includes("p")) {                    //pawn move
                        if (piece.includes("W") && turn === "W") {
                            if (board[i - 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i - 1}${j}`
                                legalMoves.push(move)
                                if (board[i - 2] !== undefined) {
                                    if (board[i - 2][j] === "e" && i === 6) {  //double move forward
                                        let move = `${piece}${i}${j}${i - 2}${j}`
                                        legalMoves.push(move)
                                    }
                                }

                            }
                            if (board[i - 1][j - 1] !== undefined) {
                                if (board[i - 1][j - 1].includes("B")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i - 1}${j - 1}`
                                    legalMoves.push(move)
                                }
                            }
                            if (board[i - 1][j + 1] !== undefined) {
                                if (board[i - 1][j + 1].includes("B")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i - 1}${j + 1}`
                                    legalMoves.push(move)
                                }
                            }
                        } else if (piece.includes("B") && turn === "B") {
                            if (board[i + 1][j] === "e") {          //single move forward
                                let move = `${piece}${i}${j}${i + 1}${j}`
                                legalMoves.push(move)
                                if (board[i + 2] !== undefined) {
                                    if (board[i + 2][j] === "e" && i === 1) {  //double move forward
                                        let move = `${piece}${i}${j}${i + 2}${j}`
                                        legalMoves.push(move)
                                    }
                                }
                            }
                            if (board[i + 1][j - 1] !== undefined) {
                                if (board[i + 1][j - 1].includes("W")) {  //take to the left W
                                    let move = `${piece}${i}${j}${i + 1}${j - 1}`
                                    legalMoves.push(move)
                                }
                            }
                            if (board[i + 1][j + 1] !== undefined) {
                                if (board[i + 1][j + 1].includes("W")) {  //take to the right W
                                    let move = `${piece}${i}${j}${i + 1}${j + 1}`
                                    legalMoves.push(move)
                                }
                            }
                        }
                    }
                    if (piece.includes("r")) {  //rook move
                        for (let k = 1; k < 8; k++) {  //up
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j] !== undefined) {
                                    if (board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j] !== undefined) {
                                    if (board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (board[i] !== undefined) {
                                if (board[i][j - k] !== undefined) {
                                    if (board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (board[i] !== undefined) {
                                if (board[i][j + k] !== undefined) {
                                    if (board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
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
                            if (board[i + r] !== undefined) {
                                if (board[i + r][j + c] !== undefined) {
                                    if (board[i + r][j + c] === "e" || board[i + r][j + c].includes(`${opponent}`)) {
                                        let move = `${piece}${i}${j}${i + r}${j + c}`
                                        legalMoves.push(move)
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
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j + k] !== undefined) {
                                    if (board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j + k] !== undefined) {
                                    if (board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j - k] !== undefined) {
                                    if (board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j - k] !== undefined) {
                                    if (board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
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
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j] !== undefined) {
                                    if (board[i + k][j] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j] !== undefined) {
                                    if (board[i - k][j] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //left
                            if (board[i] !== undefined) {
                                if (board[i][j - k] !== undefined) {
                                    if (board[i][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //right
                            if (board[i] !== undefined) {
                                if (board[i][j + k] !== undefined) {
                                    if (board[i][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }

                        for (let k = 1; k < 8; k++) {  //up right
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j + k] !== undefined) {
                                    if (board[i + k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down right
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j + k] !== undefined) {
                                    if (board[i - k][j + k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j + k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j + k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //down left
                            if (board[i + k] !== undefined) {
                                if (board[i + k][j - k] !== undefined) {
                                    if (board[i + k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i + k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i + k}${j - k}`
                                        legalMoves.push(move)
                                        k = 8
                                    } else {
                                        k = 8;
                                    }
                                }
                            }
                        }
                        for (let k = 1; k < 8; k++) {  //up left
                            if (board[i - k] !== undefined) {
                                if (board[i - k][j - k] !== undefined) {
                                    if (board[i - k][j - k] === "e") {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
                                    } else if (board[i - k][j - k].includes(opponent)) {
                                        let move = `${piece}${i}${j}${i - k}${j - k}`
                                        legalMoves.push(move)
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




        for (let i = 0; i < legalMoves.length; i++) {  //iterating through every move
            var holder = []


            for (let j = 0; j < 8; j++) {
                holder[j] = [];
                for (let k = 0; k < 8; k++) {
                    holder[j][k] = board[j][k]
                }
            }


            check = false;
            let a = move(legalMoves[i], board)
            board = a;

            turn = opponent;
            opponent = "W"
            if (turn === "W") {
                opponent = "B"
            }

            let ki = "";  //kings position
            let kj = "";
            for (let k = 0; k < 8; k++) {//find the king
                for (let l = 0; l < 8; l++) {
                    if (board[k][l] === `${opponent}k`) {
                        ki = k
                        kj = l
                    }
                }
            }


            if (opponent === "W") {  //checking for pawns
                if (board[ki - 1] !== undefined) {
                    if (board[ki - 1][kj + 1] !== undefined) {
                        if (board[ki - 1][kj + 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
                if (board[ki - 1] !== undefined) {
                    if (board[ki - 1][kj - 1] !== undefined) {
                        if (board[ki - 1][kj - 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
            } else {
                if (board[ki + 1] !== undefined) {
                    if (board[ki + 1][kj + 1] !== undefined) {
                        if (board[ki + 1][kj + 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
                if (board[ki + 1] !== undefined) {
                    if (board[ki + 1][kj - 1] !== undefined) {
                        if (board[ki + 1][kj - 1] === `${turn}p`) {
                            check = true;
                        }
                    }
                }
            }

            array = [];
            function lineCheck(inc1, inc2) {   //looks in every direction from the king
                for (let m = 1; m < 8; m++) {
                    if (board[ki + inc1 * m] !== undefined) {
                        if (board[ki + inc1 * m][kj + inc2 * m] !== undefined) {
                            if (board[ki + inc1 * m][kj + inc2 * m] !== "e") {
                                if (board[ki + inc1 * m][kj + inc2 * m] === `${turn}k` && m === 1) {
                                    array.push("!")
                                    m = 8;
                                } else {
                                    array.push(board[ki + inc1 * m][kj + inc2 * m]);
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

            if (array.includes("!") || array.includes(`${turn}q`)) { //check for kings and queens
                check = true;
            }
            for (let c = 0; c < 9; c += 2) { //check diagonals
                if (array[c] === `${turn}b`) {
                    check = true;
                }
            }
            for (let c = 1; c < 9; c += 2) { //check straights
                if (array[c] === `${turn}r`) {
                    check = true;
                }
            }

            var knightKingCheck = function (lMove) {
                if (board[ki + lMove[0]] !== undefined) {
                    if (board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                        if (board[ki + lMove[0]][kj + lMove[1]] === `${turn}n`) {
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
            board = holder;

            if (check === true) {
                legalMoves.splice(i, 1)
                i--;
            }
        }
        return legalMoves
    },
    isInCheck: function (board, turn) {
        let opponent = "W"
        if (turn === "W") {
            opponent = "B"
        }

        check = false;
        let ki = "";  //kings position
        let kj = "";
        for (let k = 0; k < 8; k++) {//find the king
            for (let l = 0; l < 8; l++) {
                if (board[k][l] === `${turn}k`) {
                    ki = k
                    kj = l
                }
            }
        }
        if (turn === "W") {  //checking for pawns
            if (board[ki - 1] !== undefined) {
                if (board[ki - 1][kj + 1] !== undefined) {
                    if (board[ki - 1][kj + 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
            if (board[ki - 1] !== undefined) {
                if (board[ki - 1][kj - 1] !== undefined) {
                    if (board[ki - 1][kj - 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
        } else {
            if (board[ki + 1] !== undefined) {
                if (board[ki + 1][kj + 1] !== undefined) {
                    if (board[ki + 1][kj + 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
            if (board[ki + 1] !== undefined) {
                if (board[ki + 1][kj - 1] !== undefined) {
                    if (board[ki + 1][kj - 1] === `${opponent}p`) {
                        check = true;
                    }
                }
            }
        }

        array = [];
        function lineCheck(inc1, inc2) {   //looks in every direction from the king
            for (let m = 1; m < 8; m++) {
                if (board[ki + inc1 * m] !== undefined) {
                    if (board[ki + inc1 * m][kj + inc2 * m] !== undefined) {
                        if (board[ki + inc1 * m][kj + inc2 * m] !== "e") {
                            if (board[ki + inc1 * m][kj + inc2 * m] === `${opponent}k` && m === 1) {
                                array.push("!")
                                m = 8;
                            } else {
                                array.push(board[ki + inc1 * m][kj + inc2 * m]);
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
                if (board[ki + lMove[0]] !== undefined) {
                    if (board[ki + lMove[0]][kj + lMove[1]] !== undefined) {
                        if (board[ki + lMove[0]][kj + lMove[1]] === `${opponent}n`) {
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
    },
    pruneMeta: function (obj) {
        console.log("obj before prune: ", obj)
        let pruneWorst = function (myObjArr, turn) {
            let meanScoreArr = [];
            let worstMeta = 999;
            let worstMove = "filler"
            let arrPos = 0
            let worstScore = 0;
            if (turn === "B") {
                worstMeta = -999
            }
            for (let j = 0; j < myObjArr.length; j++) {
                meanScoreArr.push(myObjArr[j].score)
                if (turn === "W") {
                    if (myObjArr[j].meta < worstMeta) {
                        worstMeta = myObjArr[j].meta
                        worstMove = myObjArr[j].move
                        worstScore = myObjArr[j].score
                        arrPos = j
                    }
                } else {
                    if (myObjArr[j].meta > worstMeta) {
                        worstMeta = myObjArr[j].meta
                        worstMove = myObjArr[j].move
                        worstScore = myObjArr[j].score
                        arrPos = j
                    }
                }
            }
            let meanScoreNum = 0;
            for (let k = 0; k < meanScoreArr.length; k++) {
                meanScoreNum += meanScoreArr[k]
            }
            meanScoreNum /= meanScoreArr.length

            objArr.splice(arrPos, 1)
            console.log(worstScore, meanScoreNum)

            if (worstScore <= meanScoreNum && turn === "W") {
                if (obj.pruneDump === undefined) {
                    obj.pruneDump = [{ move: worstMove, obj: obj[worstMove] }]
                } else {
                    obj.pruneDump.push({ move: worstMove, obj: obj[worstMove] })
                }
                delete obj[worstMove]
            } else if (worstScore >= meanScoreNum && turn === "B") {
                if (obj.pruneDump === undefined) {
                    obj.pruneDump = [{ move: worstMove, obj: obj[worstMove] }]
                } else {
                    obj.pruneDump.push({ move: worstMove, obj: obj[worstMove] })
                }
                delete obj[worstMove]
            }
        }
        let turn = obj.turn
        let objArr = []

        for (item in obj) {
            if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                objArr.push({ move: item, meta: obj[item].meta, score: obj[item].score })
            }
        }
        let length = objArr.length
        length = Math.round(length / 2)




        for (let i = 0; i < length - 1; i++) {
            let allTheSame = true;
            let first = objArr[0].meta
            for (let i = 0; i < objArr.length; i++) {
                if (objArr[i].meta !== first) {
                    allTheSame = false
                }
            }
            if (allTheSame === false) {
                // console.log("pruneWorst input:", objArr)
                pruneWorst(objArr, turn);

            }

        }
        console.log("obj after prune", obj)
        return obj
    },
    smartScore: function (board, turn) {
        let newBoard = function (myBoard) {
            let newBoard = [[]];

            for (let j = 0; j < 8; j++) {
                newBoard[j] = []
                for (let k = 0; k < 8; k++) {
                    newBoard[j][k] = myBoard[j][k]
                }
            }

            return newBoard
        }
        let changeTurn = function (turn) {
            if (turn === "W") {
                return "B"
            } else {
                return "W"
            }
        }
        let iteration = 0;
        let myObj = {
            start: {}
        };
        myObj.start.board = newBoard(board)

        let inc = function (num) {
            num++;
            return num
        }

        let explore = function (nBoard, turn, iteration, path, startAt) {
            //pawn promotion things
            for (let i = 0; i < 8; i++) {
                if (nBoard[0][i] === "Wp") {
                    nBoard[0][i] === "Wq"
                }
                if (nBoard[7][i] === "Bp") {
                    nBoard[7][i] === "Bq"
                }
            }

            if (iteration < 4 && iteration >= startAt) {
                let arr = ai.getLegalMoves(nBoard, turn);
                path.turn = turn;
                let nBoard2 = newBoard(nBoard)
                for (let i = 0; i < arr.length; i++) {
                    let nB = newBoard(nBoard2)
                    path[arr[i]] = { board: newBoard(ai.makeMove(arr[i], path.board)) }
                    explore(ai.makeMove(arr[i], nB), changeTurn(turn), inc(iteration), path[arr[i]], 0)
                }
            }
        }
        explore(newBoard(board), turn, inc(iteration), myObj.start, 0)

        console.log(myObj)

        let scoreExplore = function (bObj) {
            bObj.score = ai.scoreBoard(bObj.board, bObj.turn)
            for (item in bObj) {
                if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                    scoreExplore(bObj[item])
                }
            }
        }
        scoreExplore(myObj.start)

        let metaExplore = function (bObj) {
            let metaArr = []
            if (Object.keys(bObj).length < 5) {
                return bObj.score
            }

            let canPruneMeta = true;
            for (item in bObj) {
                if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                    if (bObj[item].meta === undefined) {
                        canPruneMeta = false;
                    }
                }
            }
            if (canPruneMeta === true) {
                bObj = ai.pruneMeta(bObj)
            }

            for (item in bObj) {
                if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                    metaArr.push(metaExplore(bObj[item]))
                }
            }

            metaArr = metaArr.sort(function (a, b) {
                return a - b;
            })

            // console.log(metaArr)

            if(turn === "B"){
                metaArr = metaArr.slice(-2)
            } else {
                metaArr = metaArr.slice(0, 2)
            }

            // console.log(metaArr)

            bObj.meta = ((metaArr[0] + metaArr[1]) / metaArr.length)

            // console.log(bObj.meta)

            return bObj.meta
        }

        for (let i = 0; i <= 3; i++) {
            metaExplore(myObj.start)
        }
        for (item in myObj.start) {
            if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                explore(newBoard(myObj.start[item].board), changeTurn(turn), inc(iteration), myObj.start[item], 2)
                console.log(myObj)
                scoreExplore(myObj.start[item])

                for (let i = 0; i <= 3; i++) {
                    if (myObj.start[item] !== undefined) {
                        metaExplore(myObj.start[item])
                    }
                }
            }
        }
        return myObj
    },

    scoreBoard: function (board, turn) {
        let score = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let worth = 0;
                let mod = 1;
                let piece = board[i][j];
                if (piece.includes("B")) {
                    mod = -1
                }

                if (piece.includes("b") || piece.includes("n")) {
                    worth = 3
                }

                if (piece.includes("r")) {
                    worth = 5
                }

                if (piece.includes("p")) {
                    worth = 1
                }

                if (piece.includes("q")) {
                    worth = 8
                }

                score = score + (worth * mod)
            }
        }
        arr = ai.getLegalMoves(board, turn)

        if (ai.isInCheck(board, "W")) { //need to define all these
            score -= 1
            if (turn === "W" && arr.length === 0) {
                score -= 100
            }
        }

        if (ai.isInCheck(board, "B")) {
            score += 1
            if (turn === "B" && arr.length === 0) {
                score -= 100
            }
        }

        return score;
    }
}

module.exports = ai
},{"./data":3}],2:[function(require,module,exports){
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
},{"./data":3,"./isInCheck":5}],3:[function(require,module,exports){
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
                                    } else if (data.board[i + k][j + k].includes(data.opponent)) {
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

                if (document.getElementById("aiMove") === null || document.getElementById("aiMove") === undefined) {
                    let button = document.createElement("button")
                    button.id = "aiMove"
                    button.type = "button"
                    ai = require("./ai")
                    button.addEventListener("click", function () {
                        ai.execute(data.board, data.turn);
                    })
                    button.textContent = "Make AI move"
                    document.getElementById("info").appendChild(button)
                }
            }
        }
    },
    selectedPiece: ""
}

module.exports = data;
},{"./ai":1,"./canCastle":2,"./domPrinter":4,"./isInCheck":5,"./pawnPromotionCheck":8}],4:[function(require,module,exports){
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
},{"./data":3,"./makeMove":7,"./selectPiece":10}],5:[function(require,module,exports){
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
},{"./data":3}],6:[function(require,module,exports){
var data = require("./data")
var domPrinter = require("./domPrinter")
var ai = require("./ai")



data.getLegalMoves();
data.removeChecks();

domPrinter();

console.log("Board:", data.board)
console.log("Legal moves:", data.legalMoves)

document.getElementById("display").addEventListener("click", function(){
    console.log(data.board)
    console.log(data.legalMoves)
    console.log(data.history)
})

let button = document.createElement("button")
button.id = "aiMove"
button.type = "button"
button.addEventListener("click", function(){
    ai.execute(data.board, data.turn);
})
button.textContent = "Make AI move"

document.getElementById("info").appendChild(button)



},{"./ai":1,"./data":3,"./domPrinter":4}],7:[function(require,module,exports){
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
},{"./data":3}],8:[function(require,module,exports){
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
},{"./data":3,"./promotePawn":9}],9:[function(require,module,exports){
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
},{"./data":3,"./domPrinter":4,"./isInCheck":5}],10:[function(require,module,exports){
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
},{"./data":3}]},{},[1,2,3,4,5,6,7,8,9,10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FpLmpzIiwic2NyaXB0cy9jYW5DYXN0bGUuanMiLCJzY3JpcHRzL2RhdGEuanMiLCJzY3JpcHRzL2RvbVByaW50ZXIuanMiLCJzY3JpcHRzL2lzSW5DaGVjay5qcyIsInNjcmlwdHMvbWFpbi5qcyIsInNjcmlwdHMvbWFrZU1vdmUuanMiLCJzY3JpcHRzL3Bhd25Qcm9tb3Rpb25DaGVjay5qcyIsInNjcmlwdHMvcHJvbW90ZVBhd24uanMiLCJzY3JpcHRzL3NlbGVjdFBpZWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxOEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy92QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYWkgPSB7XHJcbiAgICBleGVjdXRlOiBmdW5jdGlvbiAoYm9hcmQsIHR1cm4pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJlZ2luIEFJIGNhbGN1bGF0aW9uXCIpXHJcbiAgICAgICAgY29uc3Qgb2JqID0gYWkuc21hcnRTY29yZShib2FyZCwgdHVybilcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNtYXJ0U2NvcmUgY29tcGxldGVcIiwgb2JqKVxyXG4gICAgICAgIGxldCBiZXN0TW92ZSA9IFwiXCJcclxuICAgICAgICBsZXQgYmVzdE1ldGEgPSAtOTk5O1xyXG4gICAgICAgIGlmICh0dXJuID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICBiZXN0TWV0YSA9IDk5OVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGl0ZW0gaW4gb2JqLnN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSBcIm1ldGFcIiAmJiBpdGVtICE9PSBcInNjb3JlXCIgJiYgaXRlbSAhPT0gXCJ0dXJuXCIgIT09IGl0ZW0gIT09IFwiYm9hcmRcIiAmJiBpdGVtICE9PSBcInBydW5lRHVtcFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnN0YXJ0W2l0ZW1dLm1ldGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnN0YXJ0W2l0ZW1dLm1ldGEgPiBiZXN0TWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1ldGEgPSBvYmouc3RhcnRbaXRlbV0ubWV0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdE1vdmUgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5zdGFydFtpdGVtXS5tZXRhIDwgYmVzdE1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNZXRhID0gb2JqLnN0YXJ0W2l0ZW1dLm1ldGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNb3ZlID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJlc3QgbW92ZTpcIiwgYmVzdE1vdmUpXHJcblxyXG4gICAgICAgIGRhdGEubGVnYWxNb3Zlcy5iZXN0TW92ZSA9IFtiZXN0TW92ZV1cclxuICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlLnN0YXJ0KGJlc3RNb3ZlKVxyXG4gICAgfSxcclxuICAgIG1ha2VNb3ZlOiBmdW5jdGlvbiAobSwgYm9hcmRJbnB1dCkge1xyXG5cclxuICAgICAgICBsZXQgbmV3Qm9hcmQgPSBmdW5jdGlvbiAobXlCb2FyZCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3Qm9hcmQgPSBbW11dO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG5ld0JvYXJkW2pdID0gW11cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Qm9hcmRbal1ba10gPSBteUJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdCb2FyZFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwaWVjZSA9IG0uc2xpY2UoMCwgMik7XHJcbiAgICAgICAgY29uc3Qgb2dQb3NpID0gbS5zbGljZSgyLCAzKTtcclxuICAgICAgICBjb25zdCBvZ1Bvc2ogPSBtLnNsaWNlKDMsIDQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1Bvc2kgPSBtLnNsaWNlKDQsIDUpO1xyXG4gICAgICAgIGNvbnN0IG5ld1Bvc2ogPSBtLnNsaWNlKDUsIDYpO1xyXG5cclxuICAgICAgICBjb25zdCBiID0gbmV3Qm9hcmQoYm9hcmRJbnB1dClcclxuICAgICAgICBiW25ld1Bvc2ldW25ld1Bvc2pdID0gcGllY2U7XHJcbiAgICAgICAgYltvZ1Bvc2ldW29nUG9zal0gPSBcImVcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIGI7XHJcbiAgICB9LFxyXG4gICAgZ2V0TGVnYWxNb3ZlczogZnVuY3Rpb24gKGJvYXJkLCB0dXJuKSB7XHJcbiAgICAgICAgbGV0IG9wcG9uZW50ID0gXCJCXCJcclxuICAgICAgICBpZiAodHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgb3Bwb25lbnQgPSBcIldcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1vdmUgPSBmdW5jdGlvbiAobSwgZikge1xyXG4gICAgICAgICAgICBsZXQgcGllY2UgPSBtLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgICAgICBsZXQgb2dQb3NpID0gbS5zbGljZSgyLCAzKTtcclxuICAgICAgICAgICAgbGV0IG9nUG9zaiA9IG0uc2xpY2UoMywgNCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdQb3NpID0gbS5zbGljZSg0LCA1KTtcclxuICAgICAgICAgICAgbGV0IG5ld1Bvc2ogPSBtLnNsaWNlKDUsIDYpO1xyXG4gICAgICAgICAgICBsZXQgZCA9IGY7XHJcblxyXG4gICAgICAgICAgICBkW25ld1Bvc2ldW25ld1Bvc2pdID0gcGllY2U7XHJcbiAgICAgICAgICAgIGRbb2dQb3NpXVtvZ1Bvc2pdID0gXCJlXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVnYWxNb3ZlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykgeyAgICAgICAgICAgICAgICAgIC8vcm93XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGllY2UgPSBib2FyZFtpXVtqXSAgICAgICAgICAgICAvL2NvbHVtblxyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2pdLmluY2x1ZGVzKHR1cm4pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcImtcIikpIHsgIC8va2luZyBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAtMTsgayA8PSAxOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGwgPSAtMTsgbCA8PSAxOyBsKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqICsgbF0gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiArIGxdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGx9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiArIGxdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGx9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwicFwiKSkgeyAgICAgICAgICAgICAgICAgICAgLy9wYXduIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiV1wiKSAmJiB0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSAxXVtqXSA9PT0gXCJlXCIpIHsgICAgICAgICAgLy9zaW5nbGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIDJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSAyXVtqXSA9PT0gXCJlXCIgJiYgaSA9PT0gNikgeyAgLy9kb3VibGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0gMn0ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSAxXVtqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0gMV1baiAtIDFdLmluY2x1ZGVzKFwiQlwiKSkgeyAgLy90YWtlIHRvIHRoZSBsZWZ0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqIC0gMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0gMV1baiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIDFdW2ogKyAxXS5pbmNsdWRlcyhcIkJcIikpIHsgIC8vdGFrZSB0byB0aGUgcmlnaHQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0gMX0ke2ogKyAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBpZWNlLmluY2x1ZGVzKFwiQlwiKSAmJiB0dXJuID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyAxXVtqXSA9PT0gXCJlXCIpIHsgICAgICAgICAgLy9zaW5nbGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDF9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIDJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyAyXVtqXSA9PT0gXCJlXCIgJiYgaSA9PT0gMSkgeyAgLy9kb3VibGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMn0ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIDFdW2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyAxXVtqIC0gMV0uaW5jbHVkZXMoXCJXXCIpKSB7ICAvL3Rha2UgdG8gdGhlIGxlZnQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMX0ke2ogLSAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyAxXVtqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsgMV1baiArIDFdLmluY2x1ZGVzKFwiV1wiKSkgeyAgLy90YWtlIHRvIHRoZSByaWdodCBXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyAxfSR7aiArIDF9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiclwiKSkgeyAgLy9yb29rIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11bal0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpIC0ga11bal0uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpXVtqIC0ga10uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1baiArIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcIm5cIikpIHsgLy9rbmlnaHQgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga25pZ2h0TW92ZSA9IGZ1bmN0aW9uIChyLCBjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIHJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIHJdW2ogKyBjXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsgcl1baiArIGNdID09PSBcImVcIiB8fCBib2FyZFtpICsgcl1baiArIGNdLmluY2x1ZGVzKGAke29wcG9uZW50fWApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgcn0ke2ogKyBjfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMiwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgyLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMiwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMiwgLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMSwgMilcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgxLCAtMilcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMSwgMilcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMSwgLTIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpICsga11bal0uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd24gcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2kgLSBrXVtqICsga10uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwIGxlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2kgKyBrXVtqIC0ga10uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpIC0ga11baiAtIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwicVwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11bal0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpIC0ga11bal0uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpXVtqIC0ga10uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1baiArIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSArIGtdW2ogKyBrXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSAtIGtdW2ogKyBrXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpICsga11baiAtIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpIC0ga11baiAtIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdhbE1vdmVzLmxlbmd0aDsgaSsrKSB7ICAvL2l0ZXJhdGluZyB0aHJvdWdoIGV2ZXJ5IG1vdmVcclxuICAgICAgICAgICAgdmFyIGhvbGRlciA9IFtdXHJcblxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGEgPSBtb3ZlKGxlZ2FsTW92ZXNbaV0sIGJvYXJkKVxyXG4gICAgICAgICAgICBib2FyZCA9IGE7XHJcblxyXG4gICAgICAgICAgICB0dXJuID0gb3Bwb25lbnQ7XHJcbiAgICAgICAgICAgIG9wcG9uZW50ID0gXCJXXCJcclxuICAgICAgICAgICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgICAgICAgICBvcHBvbmVudCA9IFwiQlwiXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBraSA9IFwiXCI7ICAvL2tpbmdzIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGxldCBraiA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7Ly9maW5kIHRoZSBraW5nXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IDg7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtrXVtsXSA9PT0gYCR7b3Bwb25lbnR9a2ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2kgPSBrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtqID0gbFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHBvbmVudCA9PT0gXCJXXCIpIHsgIC8vY2hlY2tpbmcgZm9yIHBhd25zXHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSAtIDFdW2tqICsgMV0gPT09IGAke3R1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgLSAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV1ba2ogLSAxXSA9PT0gYCR7dHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyAxXVtraiArIDFdID09PSBgJHt0dXJufXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV1ba2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIDFdW2tqIC0gMV0gPT09IGAke3R1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gbGluZUNoZWNrKGluYzEsIGluYzIpIHsgICAvL2xvb2tzIGluIGV2ZXJ5IGRpcmVjdGlvbiBmcm9tIHRoZSBraW5nXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtID0gMTsgbSA8IDg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIGluYzEgKiBtXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dID09PSBgJHt0dXJufWtgICYmIG0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIiFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBhID0gLTE7IGEgPD0gMTsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBiID0gLTE7IGIgPD0gMTsgYisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUNoZWNrKGEsIGIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhcnJheS5pbmNsdWRlcyhcIiFcIikgfHwgYXJyYXkuaW5jbHVkZXMoYCR7dHVybn1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke3R1cm59YmApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBzdHJhaWdodHNcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7dHVybn1yYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGtuaWdodEtpbmdDaGVjayA9IGZ1bmN0aW9uIChsTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgbE1vdmVbMF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gPT09IGAke3R1cm59bmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgeCA9IFtbMiwgMV0sIFsyLCAtMV0sIFstMiwgMV0sIFstMiwgLTFdLCBbMSwgMl0sIFsxLCAtMl0sIFstMSwgMl0sIFstMSwgLTJdXVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBxID0gMDsgcSA8IHgubGVuZ3RoOyBxKyspIHtcclxuICAgICAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjayh4W3FdKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2ZpbmFsbHkgZmluaXNoZWQgd2l0aCBjaGVja2luZ1xyXG4gICAgICAgICAgICBib2FyZCA9IGhvbGRlcjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGVjayA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGVnYWxNb3Zlc1xyXG4gICAgfSxcclxuICAgIGlzSW5DaGVjazogZnVuY3Rpb24gKGJvYXJkLCB0dXJuKSB7XHJcbiAgICAgICAgbGV0IG9wcG9uZW50ID0gXCJXXCJcclxuICAgICAgICBpZiAodHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgb3Bwb25lbnQgPSBcIkJcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICBsZXQga2kgPSBcIlwiOyAgLy9raW5ncyBwb3NpdGlvblxyXG4gICAgICAgIGxldCBraiA9IFwiXCI7XHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHsvL2ZpbmQgdGhlIGtpbmdcclxuICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCA4OyBsKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtrXVtsXSA9PT0gYCR7dHVybn1rYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtpID0ga1xyXG4gICAgICAgICAgICAgICAgICAgIGtqID0gbFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0dXJuID09PSBcIldcIikgeyAgLy9jaGVja2luZyBmb3IgcGF3bnNcclxuICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV1ba2ogKyAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYm9hcmRba2kgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgLSAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgLSAxXVtraiAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV1ba2ogKyAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYm9hcmRba2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyAxXVtraiAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcnJheSA9IFtdO1xyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmVDaGVjayhpbmMxLCBpbmMyKSB7ICAgLy9sb29rcyBpbiBldmVyeSBkaXJlY3Rpb24gZnJvbSB0aGUga2luZ1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtID0gMTsgbSA8IDg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgaW5jMSAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gPT09IGAke29wcG9uZW50fWtgICYmIG0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGEgPSAtMTsgYSA8PSAxOyBhKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgYiA9IC0xOyBiIDw9IDE7IGIrKykge1xyXG4gICAgICAgICAgICAgICAgbGluZUNoZWNrKGEsIGIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoYXJyYXkuaW5jbHVkZXMoXCIhXCIpIHx8IGFycmF5LmluY2x1ZGVzKGAke29wcG9uZW50fXFgKSkgeyAvL2NoZWNrIGZvciBraW5ncyBhbmQgcXVlZW5zXHJcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBkaWFnb25hbHNcclxuICAgICAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHtvcHBvbmVudH1iYCkge1xyXG4gICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgc3RyYWlnaHRzXHJcbiAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7b3Bwb25lbnR9cmApIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIga25pZ2h0S2luZ0NoZWNrID0gZnVuY3Rpb24gKGxNb3ZlKSB7XHJcbiAgICAgICAgICAgIGZvciAoaXRlbSBpbiBsTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgbE1vdmVbMF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gPT09IGAke29wcG9uZW50fW5gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB4ID0gW1syLCAxXSwgWzIsIC0xXSwgWy0yLCAxXSwgWy0yLCAtMV0sIFsxLCAyXSwgWzEsIC0yXSwgWy0xLCAyXSwgWy0xLCAtMl1dXHJcblxyXG4gICAgICAgIGZvciAobGV0IHEgPSAwOyBxIDwgeC5sZW5ndGg7IHErKykge1xyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soeFtxXSlcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gY2hlY2s7XHJcbiAgICB9LFxyXG4gICAgcHJ1bmVNZXRhOiBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvYmogYmVmb3JlIHBydW5lOiBcIiwgb2JqKVxyXG4gICAgICAgIGxldCBwcnVuZVdvcnN0ID0gZnVuY3Rpb24gKG15T2JqQXJyLCB0dXJuKSB7XHJcbiAgICAgICAgICAgIGxldCBtZWFuU2NvcmVBcnIgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHdvcnN0TWV0YSA9IDk5OTtcclxuICAgICAgICAgICAgbGV0IHdvcnN0TW92ZSA9IFwiZmlsbGVyXCJcclxuICAgICAgICAgICAgbGV0IGFyclBvcyA9IDBcclxuICAgICAgICAgICAgbGV0IHdvcnN0U2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBpZiAodHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgIHdvcnN0TWV0YSA9IC05OTlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtZWFuU2NvcmVBcnIucHVzaChteU9iakFycltqXS5zY29yZSlcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChteU9iakFycltqXS5tZXRhIDwgd29yc3RNZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcnN0TWV0YSA9IG15T2JqQXJyW2pdLm1ldGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yc3RNb3ZlID0gbXlPYmpBcnJbal0ubW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JzdFNjb3JlID0gbXlPYmpBcnJbal0uc2NvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyUG9zID0galxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG15T2JqQXJyW2pdLm1ldGEgPiB3b3JzdE1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yc3RNZXRhID0gbXlPYmpBcnJbal0ubWV0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JzdE1vdmUgPSBteU9iakFycltqXS5tb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcnN0U2NvcmUgPSBteU9iakFycltqXS5zY29yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJQb3MgPSBqXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtZWFuU2NvcmVOdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1lYW5TY29yZUFyci5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgbWVhblNjb3JlTnVtICs9IG1lYW5TY29yZUFycltrXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lYW5TY29yZU51bSAvPSBtZWFuU2NvcmVBcnIubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICBvYmpBcnIuc3BsaWNlKGFyclBvcywgMSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2cod29yc3RTY29yZSwgbWVhblNjb3JlTnVtKVxyXG5cclxuICAgICAgICAgICAgaWYgKHdvcnN0U2NvcmUgPD0gbWVhblNjb3JlTnVtICYmIHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnBydW5lRHVtcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnBydW5lRHVtcCA9IFt7IG1vdmU6IHdvcnN0TW92ZSwgb2JqOiBvYmpbd29yc3RNb3ZlXSB9XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJ1bmVEdW1wLnB1c2goeyBtb3ZlOiB3b3JzdE1vdmUsIG9iajogb2JqW3dvcnN0TW92ZV0gfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpbd29yc3RNb3ZlXVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdvcnN0U2NvcmUgPj0gbWVhblNjb3JlTnVtICYmIHR1cm4gPT09IFwiQlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnBydW5lRHVtcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnBydW5lRHVtcCA9IFt7IG1vdmU6IHdvcnN0TW92ZSwgb2JqOiBvYmpbd29yc3RNb3ZlXSB9XVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJ1bmVEdW1wLnB1c2goeyBtb3ZlOiB3b3JzdE1vdmUsIG9iajogb2JqW3dvcnN0TW92ZV0gfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpbd29yc3RNb3ZlXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0dXJuID0gb2JqLnR1cm5cclxuICAgICAgICBsZXQgb2JqQXJyID0gW11cclxuXHJcbiAgICAgICAgZm9yIChpdGVtIGluIG9iaikge1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gXCJ0dXJuXCIgJiYgaXRlbSAhPT0gXCJzY29yZVwiICYmIGl0ZW0gIT09IFwiYm9hcmRcIiAmJiBpdGVtICE9PSBcIm1ldGFcIiAmJiBpdGVtICE9PSBcInBydW5lRHVtcFwiKSB7XHJcbiAgICAgICAgICAgICAgICBvYmpBcnIucHVzaCh7IG1vdmU6IGl0ZW0sIG1ldGE6IG9ialtpdGVtXS5tZXRhLCBzY29yZTogb2JqW2l0ZW1dLnNjb3JlIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IG9iakFyci5sZW5ndGhcclxuICAgICAgICBsZW5ndGggPSBNYXRoLnJvdW5kKGxlbmd0aCAvIDIpXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxUaGVTYW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGZpcnN0ID0gb2JqQXJyWzBdLm1ldGFcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmpBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpBcnJbaV0ubWV0YSAhPT0gZmlyc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxUaGVTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYWxsVGhlU2FtZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJ1bmVXb3JzdCBpbnB1dDpcIiwgb2JqQXJyKVxyXG4gICAgICAgICAgICAgICAgcHJ1bmVXb3JzdChvYmpBcnIsIHR1cm4pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJvYmogYWZ0ZXIgcHJ1bmVcIiwgb2JqKVxyXG4gICAgICAgIHJldHVybiBvYmpcclxuICAgIH0sXHJcbiAgICBzbWFydFNjb3JlOiBmdW5jdGlvbiAoYm9hcmQsIHR1cm4pIHtcclxuICAgICAgICBsZXQgbmV3Qm9hcmQgPSBmdW5jdGlvbiAobXlCb2FyZCkge1xyXG4gICAgICAgICAgICBsZXQgbmV3Qm9hcmQgPSBbW11dO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG5ld0JvYXJkW2pdID0gW11cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Qm9hcmRbal1ba10gPSBteUJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdCb2FyZFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2hhbmdlVHVybiA9IGZ1bmN0aW9uICh0dXJuKSB7XHJcbiAgICAgICAgICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQlwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJXXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXRlcmF0aW9uID0gMDtcclxuICAgICAgICBsZXQgbXlPYmogPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiB7fVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbXlPYmouc3RhcnQuYm9hcmQgPSBuZXdCb2FyZChib2FyZClcclxuXHJcbiAgICAgICAgbGV0IGluYyA9IGZ1bmN0aW9uIChudW0pIHtcclxuICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgIHJldHVybiBudW1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBleHBsb3JlID0gZnVuY3Rpb24gKG5Cb2FyZCwgdHVybiwgaXRlcmF0aW9uLCBwYXRoLCBzdGFydEF0KSB7XHJcbiAgICAgICAgICAgIC8vcGF3biBwcm9tb3Rpb24gdGhpbmdzXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobkJvYXJkWzBdW2ldID09PSBcIldwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuQm9hcmRbMF1baV0gPT09IFwiV3FcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5Cb2FyZFs3XVtpXSA9PT0gXCJCcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbkJvYXJkWzddW2ldID09PSBcIkJxXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZXJhdGlvbiA8IDQgJiYgaXRlcmF0aW9uID49IHN0YXJ0QXQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBhaS5nZXRMZWdhbE1vdmVzKG5Cb2FyZCwgdHVybik7XHJcbiAgICAgICAgICAgICAgICBwYXRoLnR1cm4gPSB0dXJuO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5Cb2FyZDIgPSBuZXdCb2FyZChuQm9hcmQpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuQiA9IG5ld0JvYXJkKG5Cb2FyZDIpXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aFthcnJbaV1dID0geyBib2FyZDogbmV3Qm9hcmQoYWkubWFrZU1vdmUoYXJyW2ldLCBwYXRoLmJvYXJkKSkgfVxyXG4gICAgICAgICAgICAgICAgICAgIGV4cGxvcmUoYWkubWFrZU1vdmUoYXJyW2ldLCBuQiksIGNoYW5nZVR1cm4odHVybiksIGluYyhpdGVyYXRpb24pLCBwYXRoW2FycltpXV0sIDApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZXhwbG9yZShuZXdCb2FyZChib2FyZCksIHR1cm4sIGluYyhpdGVyYXRpb24pLCBteU9iai5zdGFydCwgMClcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2cobXlPYmopXHJcblxyXG4gICAgICAgIGxldCBzY29yZUV4cGxvcmUgPSBmdW5jdGlvbiAoYk9iaikge1xyXG4gICAgICAgICAgICBiT2JqLnNjb3JlID0gYWkuc2NvcmVCb2FyZChiT2JqLmJvYXJkLCBiT2JqLnR1cm4pXHJcbiAgICAgICAgICAgIGZvciAoaXRlbSBpbiBiT2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gXCJ0dXJuXCIgJiYgaXRlbSAhPT0gXCJzY29yZVwiICYmIGl0ZW0gIT09IFwiYm9hcmRcIiAmJiBpdGVtICE9PSBcIm1ldGFcIiAmJiBpdGVtICE9PSBcInBydW5lRHVtcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVFeHBsb3JlKGJPYmpbaXRlbV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2NvcmVFeHBsb3JlKG15T2JqLnN0YXJ0KVxyXG5cclxuICAgICAgICBsZXQgbWV0YUV4cGxvcmUgPSBmdW5jdGlvbiAoYk9iaikge1xyXG4gICAgICAgICAgICBsZXQgbWV0YUFyciA9IFtdXHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhiT2JqKS5sZW5ndGggPCA1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYk9iai5zY29yZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY2FuUHJ1bmVNZXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChpdGVtIGluIGJPYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSBcInR1cm5cIiAmJiBpdGVtICE9PSBcInNjb3JlXCIgJiYgaXRlbSAhPT0gXCJib2FyZFwiICYmIGl0ZW0gIT09IFwibWV0YVwiICYmIGl0ZW0gIT09IFwicHJ1bmVEdW1wXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYk9ialtpdGVtXS5tZXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuUHJ1bmVNZXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYW5QcnVuZU1ldGEgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGJPYmogPSBhaS5wcnVuZU1ldGEoYk9iailcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChpdGVtIGluIGJPYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSBcInR1cm5cIiAmJiBpdGVtICE9PSBcInNjb3JlXCIgJiYgaXRlbSAhPT0gXCJib2FyZFwiICYmIGl0ZW0gIT09IFwibWV0YVwiICYmIGl0ZW0gIT09IFwicHJ1bmVEdW1wXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRhQXJyLnB1c2gobWV0YUV4cGxvcmUoYk9ialtpdGVtXSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1ldGFBcnIgPSBtZXRhQXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1ldGFBcnIpXHJcblxyXG4gICAgICAgICAgICBpZih0dXJuID09PSBcIkJcIil7XHJcbiAgICAgICAgICAgICAgICBtZXRhQXJyID0gbWV0YUFyci5zbGljZSgtMilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1ldGFBcnIgPSBtZXRhQXJyLnNsaWNlKDAsIDIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1ldGFBcnIpXHJcblxyXG4gICAgICAgICAgICBiT2JqLm1ldGEgPSAoKG1ldGFBcnJbMF0gKyBtZXRhQXJyWzFdKSAvIG1ldGFBcnIubGVuZ3RoKVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYk9iai5tZXRhKVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJPYmoubWV0YVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1ldGFFeHBsb3JlKG15T2JqLnN0YXJ0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGl0ZW0gaW4gbXlPYmouc3RhcnQpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IFwidHVyblwiICYmIGl0ZW0gIT09IFwic2NvcmVcIiAmJiBpdGVtICE9PSBcImJvYXJkXCIgJiYgaXRlbSAhPT0gXCJtZXRhXCIgJiYgaXRlbSAhPT0gXCJwcnVuZUR1bXBcIikge1xyXG4gICAgICAgICAgICAgICAgZXhwbG9yZShuZXdCb2FyZChteU9iai5zdGFydFtpdGVtXS5ib2FyZCksIGNoYW5nZVR1cm4odHVybiksIGluYyhpdGVyYXRpb24pLCBteU9iai5zdGFydFtpdGVtXSwgMilcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG15T2JqKVxyXG4gICAgICAgICAgICAgICAgc2NvcmVFeHBsb3JlKG15T2JqLnN0YXJ0W2l0ZW1dKVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChteU9iai5zdGFydFtpdGVtXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFFeHBsb3JlKG15T2JqLnN0YXJ0W2l0ZW1dKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbXlPYmpcclxuICAgIH0sXHJcblxyXG4gICAgc2NvcmVCb2FyZDogZnVuY3Rpb24gKGJvYXJkLCB0dXJuKSB7XHJcbiAgICAgICAgbGV0IHNjb3JlID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHdvcnRoID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCBtb2QgPSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpZWNlID0gYm9hcmRbaV1bal07XHJcbiAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJCXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kID0gLTFcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJiXCIpIHx8IHBpZWNlLmluY2x1ZGVzKFwiblwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcnRoID0gM1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB3b3J0aCA9IDVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ydGggPSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwicVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdvcnRoID0gOFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNjb3JlID0gc2NvcmUgKyAod29ydGggKiBtb2QpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXJyID0gYWkuZ2V0TGVnYWxNb3Zlcyhib2FyZCwgdHVybilcclxuXHJcbiAgICAgICAgaWYgKGFpLmlzSW5DaGVjayhib2FyZCwgXCJXXCIpKSB7IC8vbmVlZCB0byBkZWZpbmUgYWxsIHRoZXNlXHJcbiAgICAgICAgICAgIHNjb3JlIC09IDFcclxuICAgICAgICAgICAgaWYgKHR1cm4gPT09IFwiV1wiICYmIGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHNjb3JlIC09IDEwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWkuaXNJbkNoZWNrKGJvYXJkLCBcIkJcIikpIHtcclxuICAgICAgICAgICAgc2NvcmUgKz0gMVxyXG4gICAgICAgICAgICBpZiAodHVybiA9PT0gXCJCXCIgJiYgYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gMTAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzY29yZTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhaSIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG52YXIgaW5DaGVjayA9IHJlcXVpcmUoXCIuL2lzSW5DaGVja1wiKVxyXG5cclxudmFyIGNhbkNhc3RsZSA9IGZ1bmN0aW9uICh0dXJuKSB7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkLCBcIiFcIilcclxuICAgIGxldCBhcnIgPSBbMSwgMV1cclxuICAgIGxldCBob2xkZXIgPSBbXVxyXG5cclxuICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkWzddWzRdICE9PSBcIldrXCIpIHtcclxuICAgICAgICAgICAgYXJyID0gWzAsIDBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaGlzdG9yeS5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwia1wiKSkgeyAvL2xvb2tpbmcgZm9yIGtpbmcgbW92ZXNcclxuICAgICAgICAgICAgICAgIGFyciA9IFswLCAwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLnNsaWNlKDIsIDQpID09PSBcIjcwXCIpIHsgLy9sb29raW5nIGZvciByb29rIG1vdmVzXHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uc2xpY2UoMiwgNCkgPT09IFwiNzdcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGEuaGlzdG9yeS5sZW5ndGg7IGkgKz0gMikgeyAgLy9sb29raW5nIGZvciBjaGVja3NcclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5pbmNsdWRlcyhcIiFcIikgfHwgZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwiY2FzdGxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBbMCwgMF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKykgeyAvL21ha2luZyBzdXJlIHRoZSBzcGFjZSBpcyBlbXB0eVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaG9sZGVyW2pdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVtpXSA9IFwiV2tcIlxyXG5cclxuICAgICAgICAgICAgaWYgKGluQ2hlY2soXCJXXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdW2tdID0gaG9sZGVyW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkWzddW2ldICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSA1OyBpIDwgNzsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaG9sZGVyW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRlcltqXVtrXSA9IGRhdGEuYm9hcmRbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVtpXSA9IFwiV2tcIlxyXG5cclxuICAgICAgICAgICAgaWYgKGluQ2hlY2soXCJXXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal1ba10gPSBob2xkZXJbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbN11baV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoZGF0YS5ib2FyZFswXVs0XSAhPT0gXCJCa1wiKSB7XHJcbiAgICAgICAgICAgIGFyciA9IFswLCAwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRhLmhpc3RvcnkubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5pbmNsdWRlcyhcImtcIikgfHwgZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwiY2FzdGxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBbMCwgMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5zbGljZSgyLCA0KSA9PT0gXCIwMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uc2xpY2UoMiwgNCkgPT09IFwiMDdcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuaGlzdG9yeS5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLmluY2x1ZGVzKFwiIVwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gWzAsIDBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBob2xkZXJbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gZGF0YS5ib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhLmJvYXJkWzBdW2ldID0gXCJCa1wiXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5DaGVjayhcIkJcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXVtrXSA9IGhvbGRlcltqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFswXVtpXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gNTsgaSA8IDc7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1baV0gPSBcIkJrXCJcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkNoZWNrKFwiQlwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdW2tdID0gaG9sZGVyW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkWzBdW2ldICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2FuQ2FzdGxlOyIsInZhciBkYXRhID0ge1xyXG4gICAgYm9hcmQ6IFtcclxuICAgICAgICBbXCJCclwiLCBcIkJuXCIsIFwiQmJcIiwgXCJCcVwiLCBcIkJrXCIsIFwiQmJcIiwgXCJCblwiLCBcIkJyXCJdLFxyXG4gICAgICAgIFtcIkJwXCIsIFwiQnBcIiwgXCJCcFwiLCBcIkJwXCIsIFwiQnBcIiwgXCJCcFwiLCBcIkJwXCIsIFwiQnBcIl0sXHJcbiAgICAgICAgW1wiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIixdLFxyXG4gICAgICAgIFtcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsXSxcclxuICAgICAgICBbXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLF0sXHJcbiAgICAgICAgW1wiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIixdLFxyXG4gICAgICAgIFtcIldwXCIsIFwiV3BcIiwgXCJXcFwiLCBcIldwXCIsIFwiV3BcIiwgXCJXcFwiLCBcIldwXCIsIFwiV3BcIl0sXHJcbiAgICAgICAgW1wiV3JcIiwgXCJXblwiLCBcIldiXCIsIFwiV3FcIiwgXCJXa1wiLCBcIldiXCIsIFwiV25cIiwgXCJXclwiXVxyXG4gICAgXSxcclxuICAgIHR1cm46IFwiV1wiLFxyXG4gICAgb3Bwb25lbnQ6IFwiQlwiLFxyXG4gICAgdHVyblN3aXRjaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBhID0gZGF0YS50dXJuO1xyXG4gICAgICAgIGRhdGEudHVybiA9IGRhdGEub3Bwb25lbnQ7XHJcbiAgICAgICAgZGF0YS5vcHBvbmVudCA9IGE7XHJcbiAgICB9LFxyXG4gICAgaGlzdG9yeTogW10sXHJcbiAgICBsZWdhbE1vdmVzOiB7fSxcclxuICAgIG1vdmU6IGZ1bmN0aW9uIChtLCBmKSB7XHJcbiAgICAgICAgbGV0IHBpZWNlID0gbS5zbGljZSgwLCAyKTtcclxuICAgICAgICBsZXQgb2dQb3NpID0gbS5zbGljZSgyLCAzKTtcclxuICAgICAgICBsZXQgb2dQb3NqID0gbS5zbGljZSgzLCA0KTtcclxuICAgICAgICBsZXQgbmV3UG9zaSA9IG0uc2xpY2UoNCwgNSk7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2ogPSBtLnNsaWNlKDUsIDYpO1xyXG4gICAgICAgIGxldCBkID0gZjtcclxuXHJcbiAgICAgICAgZFtuZXdQb3NpXVtuZXdQb3NqXSA9IHBpZWNlO1xyXG4gICAgICAgIGRbb2dQb3NpXVtvZ1Bvc2pdID0gXCJlXCI7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9LFxyXG4gICAgbGVnYWxNb3Zlc1B1c2g6IGZ1bmN0aW9uIChtb3ZlKSB7XHJcbiAgICAgICAgbGV0IGJvb2wgPSB0cnVlO1xyXG4gICAgICAgIGxldCB6ID0ge307XHJcbiAgICAgICAgbGV0IHBpZWNlID0gbW92ZS5zbGljZSgwLCAyKVxyXG4gICAgICAgIGxldCBzdGFydCA9IG1vdmUuc2xpY2UoMiwgNClcclxuICAgICAgICBmb3IgKGl0ZW0gaW4gZGF0YS5sZWdhbE1vdmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtID09PSBgJHtwaWVjZSArIHN0YXJ0fWApIHtcclxuICAgICAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYm9vbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzW2Ake3BpZWNlICsgc3RhcnR9YF0ucHVzaChtb3ZlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNbYCR7cGllY2UgKyBzdGFydH1gXSA9IFttb3ZlXTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0TGVnYWxNb3ZlczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7ICAgICAgICAgICAgICAgICAgLy9yb3dcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwaWVjZSA9IGRhdGEuYm9hcmRbaV1bal0gICAgICAgICAgICAgLy9jb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdLmluY2x1ZGVzKGRhdGEudHVybikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwia1wiKSkgeyAgLy9raW5nIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IC0xOyBrIDw9IDE7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbCA9IC0xOyBsIDw9IDE7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsgbF0gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsgbF0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsgbH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsgbF0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBsfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJwXCIpKSB7ICAgICAgICAgICAgICAgICAgICAvL3Bhd24gbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJXXCIpICYmIGRhdGEudHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqXSA9PT0gXCJlXCIpIHsgICAgICAgICAgLy9zaW5nbGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDJdW2pdID09PSBcImVcIiAmJiBpID09PSA2KSB7ICAvL2RvdWJsZSBtb3ZlIGZvcndhcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSAyfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDFdW2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDFdW2ogLSAxXS5pbmNsdWRlcyhcIkJcIikpIHsgIC8vdGFrZSB0byB0aGUgbGVmdCBXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSAxfSR7aiAtIDF9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDFdW2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIDFdW2ogKyAxXS5pbmNsdWRlcyhcIkJcIikpIHsgIC8vdGFrZSB0byB0aGUgcmlnaHQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0gMX0ke2ogKyAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwaWVjZS5pbmNsdWRlcyhcIkJcIikgJiYgZGF0YS50dXJuID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDFdW2pdID09PSBcImVcIikgeyAgICAgICAgICAvL3NpbmdsZSBtb3ZlIGZvcndhcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMX0ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgMl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgMl1bal0gPT09IFwiZVwiICYmIGkgPT09IDEpIHsgIC8vZG91YmxlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDJ9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqIC0gMV0uaW5jbHVkZXMoXCJXXCIpKSB7ICAvL3Rha2UgdG8gdGhlIGxlZnQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMX0ke2ogLSAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqICsgMV0uaW5jbHVkZXMoXCJXXCIpKSB7ICAvL3Rha2UgdG8gdGhlIHJpZ2h0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDF9JHtqICsgMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiclwiKSkgeyAgLy9yb29rIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11bal0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1baiArIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcIm5cIikpIHsgLy9rbmlnaHQgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQga25pZ2h0TW92ZSA9IGZ1bmN0aW9uIChyLCBjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgcl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyByXVtqICsgY10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgcl1baiArIGNdID09PSBcImVcIiB8fCBkYXRhLmJvYXJkW2kgKyByXVtqICsgY10uaW5jbHVkZXMoYCR7ZGF0YS5vcHBvbmVudH1gKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIHJ9JHtqICsgY31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgyLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDIsIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0yLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0yLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgxLCAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDEsIC0yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0xLCAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKC0xLCAtMilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcImJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJxXCIpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11bal0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11bal0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9sZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duIGxlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwIGxlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEuYm9hcmQpXHJcbiAgICAgICAgdmFyIGNhbkNhc3RsZSA9IHJlcXVpcmUoXCIuL2NhbkNhc3RsZVwiKVxyXG4gICAgICAgIGxldCBhID0gY2FuQ2FzdGxlKGRhdGEudHVybilcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkKVxyXG4gICAgICAgIGlmIChhWzBdICE9PSAwIHx8IGFbMV0gfHwgMSkge1xyXG4gICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLnR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChhWzBdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IFwid2hpdGVDYXN0bGVMZWZ0XCJcclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhWzFdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IFwid2hpdGVDYXN0bGVSaWdodFwiXHJcbiAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhWzBdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IFwiYmxhY2tDYXN0bGVMZWZ0XCJcclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhWzFdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IFwiYmxhY2tDYXN0bGVSaWdodFwiXHJcbiAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXMuY2FzdGxlLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW1vdmVDaGVja3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkLCBcIiFcIilcclxuICAgICAgICBmb3IgKGl0ZW0gaW4gZGF0YS5sZWdhbE1vdmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSBcImNhc3RsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLmxlbmd0aDsgaSsrKSB7ICAvL2l0ZXJhdGluZyB0aHJvdWdoIGV2ZXJ5IG1vdmVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaG9sZGVyID0gW11cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gZGF0YS5ib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYSA9IGRhdGEubW92ZShkYXRhLmxlZ2FsTW92ZXNbaXRlbV1baV0sIGRhdGEuYm9hcmQpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZCA9IGE7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50dXJuU3dpdGNoKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBraSA9IFwiXCI7ICAvL2tpbmdzIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtqID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykgey8vZmluZCB0aGUga2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IDg7IGwrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba11bbF0gPT09IGAke2RhdGEub3Bwb25lbnR9a2ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraSA9IGtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraiA9IGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIldcIikgeyAgLy9jaGVja2luZyBmb3IgcGF3bnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogKyAxXSA9PT0gYCR7ZGF0YS50dXJufXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogLSAxXSA9PT0gYCR7ZGF0YS50dXJufXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiArIDFdID09PSBgJHtkYXRhLnR1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiAtIDFdID09PSBgJHtkYXRhLnR1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBsaW5lQ2hlY2soaW5jMSwgaW5jMikgeyAgIC8vbG9va3MgaW4gZXZlcnkgZGlyZWN0aW9uIGZyb20gdGhlIGtpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbSA9IDE7IG0gPCA4OyBtKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gPT09IGAke2RhdGEudHVybn1rYCAmJiBtID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIiFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGEgPSAtMTsgYSA8PSAxOyBhKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYiA9IC0xOyBiIDw9IDE7IGIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZUNoZWNrKGEsIGIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJheS5pbmNsdWRlcyhcIiFcIikgfHwgYXJyYXkuaW5jbHVkZXMoYCR7ZGF0YS50dXJufXFgKSkgeyAvL2NoZWNrIGZvciBraW5ncyBhbmQgcXVlZW5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBkaWFnb25hbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHtkYXRhLnR1cm59YmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIHN0cmFpZ2h0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke2RhdGEudHVybn1yYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIga25pZ2h0S2luZ0NoZWNrID0gZnVuY3Rpb24gKGxNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXVtraiArIGxNb3ZlWzFdXSA9PT0gYCR7ZGF0YS50dXJufW5gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHggPSBbWzIsIDFdLCBbMiwgLTFdLCBbLTIsIDFdLCBbLTIsIC0xXSwgWzEsIDJdLCBbMSwgLTJdLCBbLTEsIDJdLCBbLTEsIC0yXV1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBxID0gMDsgcSA8IHgubGVuZ3RoOyBxKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKHhbcV0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbmFsbHkgZmluaXNoZWQgd2l0aCBjaGVja2luZ1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmQgPSBob2xkZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS50dXJuU3dpdGNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiISEhcmVtb3ZpbmcgbW92ZVwiLCBkYXRhLmxlZ2FsTW92ZXNbaXRlbV1baV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1tpdGVtXS5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBleGVjdXRlTW92ZToge1xyXG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiAobW92ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdmU6XCIsIG1vdmUpXHJcbiAgICAgICAgICAgIGxldCBwYXduUHJvbW90aW9uQ2hlY2sgPSByZXF1aXJlKFwiLi9wYXduUHJvbW90aW9uQ2hlY2tcIilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJleGVjdXRlIG1vdmUgc3RhcnQgYm9hcmQgcG9zOiBcIiwgZGF0YS5ib2FyZClcclxuICAgICAgICAgICAgcGF3blByb21vdGlvbkNoZWNrLnJ1bigpO1xyXG4gICAgICAgICAgICBwYXduUHJvbW90aW9uQ2hlY2suZmluaXNoKG1vdmUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmluaXNoOiBmdW5jdGlvbiAobW92ZSkge1xyXG4gICAgICAgICAgICBsZXQgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGl0ZW0gaW4gZGF0YS5sZWdhbE1vdmVzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVnYWxNb3Zlc1tpdGVtXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlZ2FsTW92ZXNbaXRlbV1baV0gPT09IG1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMZWdhbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vSSBkb24ndCB0aGluayBhbnkgb2YgdGhpcyBpcyBuZWNjZXNzYXJ5XHJcbiAgICAgICAgICAgIC8qbGV0IGZha2VEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgbGV0IGtpID0gXCJcIlxyXG4gICAgICAgICAgICBsZXQga2ogPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykgey8vZmluZCB0aGUga2luZ1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFrZURhdGEuYm9hcmRbaV1bal0gPT09IGAke29wcG9uZW50fWtgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtpID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2ogPSBqO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3Bwb25lbnQgPT09IFwiV1wiKSB7ICAvL2NoZWNraW5nIGZvciBwYXduc1xyXG4gICAgICAgICAgICAgICAgaWYgKGZha2VEYXRhLmJvYXJkW2tpICsgMV1ba2ogKyAxXSA9PT0gYCR7b3Bwb25lbnR9cGAgfHwgZmFrZURhdGEuYm9hcmRba2kgKyAxXVtrIC0gMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZha2VEYXRhLmJvYXJkW2tpIC0gMV1ba2ogKyAxXSA9PT0gYCR7b3Bwb25lbnR9cGAgfHwgZmFrZURhdGEuYm9hcmRba2kgLSAxXVtrIC0gMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBsaW5lQ2hlY2soaW5jMSwgaW5jMikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbSA9IDE7IG0gPCA4OyBtKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFrZURhdGEuYm9hcmRbaSArIGluYzFdW2ogKyBpbmMyXSAhPT0gXCJlXCIgJiYgZmFrZURhdGEuYm9hcmRbaSArIGluYzFdW2ogKyBpbmMyXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtpICsgaW5jMV1baiArIGluYzJdID09PSBvcHBvbmVudCArIFwia1wiICYmIG0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCIhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChmYWtlRGF0YS5ib2FyZFtpICsgaW5jMV1baiArIGluYzJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmYWtlRGF0YS5ib2FyZFtpICsgaW5jMV1baiArIGluYzJdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgYSA9IC0xOyBhIDw9IDE7IGErKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYiA9IC0xOyBiIDw9IDE7IGIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVDaGVjayhhLCBiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhcnJheS5pbmNsdWRlcyhcIiFcIikgfHwgYXJyYXkuaW5jbHVkZXMoYCR7dHVybn1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke3R1cm59YmApIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBzdHJhaWdodHNcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7dHVybn1yYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIga25pZ2h0S2luZ0NoZWNrID0gZnVuY3Rpb24gKGxNb3ZlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGl0ZW0gaW4gbE1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlLml0ZW1bMV1dW2tqICsgbE1vdmUuaXRlbVsyXV0gPT09IGAke3R1cm59bmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soMiwgMSlcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKDIsIC0xKVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soLTIsIDEpXHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygtMiwgLTEpXHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygxLCAyKVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soMSwgLTIpXHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygtMSwgMilcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKC0xLCAtMikqL1xyXG5cclxuICAgICAgICAgICAgLy9maW5hbGx5IGZpbmlzaGVkIHdpdGggY2hlY2tpbmdcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtb3ZlXCIsIG1vdmUpXHJcblxyXG4gICAgICAgICAgICBpZiAoaXNMZWdhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW52YWxpZCBtb3ZlXCIpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1vdmUuaW5jbHVkZXMoXCJDYXN0bGVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGllY2UgPSBtb3ZlLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZ1Bvc2kgPSBtb3ZlLnNsaWNlKDIsIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZ1Bvc2ogPSBtb3ZlLnNsaWNlKDMsIDQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdQb3NpID0gbW92ZS5zbGljZSg0LCA1KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UG9zaiA9IG1vdmUuc2xpY2UoNSwgNik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbbmV3UG9zaV1bbmV3UG9zal0gPSBwaWVjZTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW29nUG9zaV1bb2dQb3NqXSA9IFwiZVwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlID09PSBcIndoaXRlQ2FzdGxlTGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVswXSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVsyXSA9IFwiV2tcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bM10gPSBcIldyXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzRdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZSA9PT0gXCJ3aGl0ZUNhc3RsZVJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzRdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzVdID0gXCJXclwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVs2XSA9IFwiV2tcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bN10gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlID09PSBcImJsYWNrQ2FzdGxlTGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVswXSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVsyXSA9IFwiQmtcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bM10gPSBcIkJyXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzRdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZSA9PT0gXCJibGFja0Nhc3RsZVJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzRdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzVdID0gXCJCclwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs2XSA9IFwiQmtcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bN10gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGlzSW5DaGVjayA9IHJlcXVpcmUoXCIuL2lzSW5DaGVja1wiKVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5DaGVjayhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaGlzdG9yeS5wdXNoKGAke21vdmV9IWApXHJcbiAgICAgICAgICAgICAgICAgICAgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEub3Bwb25lbnQgPT09IFwiQlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAudGV4dENvbnRlbnQgPSBcIkJsYWNrIGlzIGluIGNoZWNrIVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IFwiV2hpdGUgaXMgaW4gY2hlY2shXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuaGlzdG9yeS5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEudHVyblN3aXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLmdldExlZ2FsTW92ZXMoKTtcclxuICAgICAgICAgICAgICAgIGRhdGEucmVtb3ZlQ2hlY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tUHJpbnRlciA9IHJlcXVpcmUoXCIuL2RvbVByaW50ZXJcIilcclxuICAgICAgICAgICAgICAgIGRvbVByaW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGllY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib2FyZCBhZnRlciBtb3ZlOiBcIiwgZGF0YS5ib2FyZClcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgICAgICAgICBmb3IgKGl0ZW0gaW4gZGF0YS5sZWdhbE1vdmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCArIGRhdGEubGVnYWxNb3Zlc1tpdGVtXS5sZW5ndGhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbZGF0YS5oaXN0b3J5Lmxlbmd0aCAtIDFdLmluY2x1ZGVzKFwiIVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcHBvbmVudCA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5maXJzdENoaWxkLnRleHRDb250ZW50ID0gXCJDaGVja21hdGUhIFdoaXRlIHdpbnMhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5maXJzdENoaWxkLnRleHRDb250ZW50ID0gXCJDaGVja21hdGUhIEJsYWNrIHdpbnMhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJUaGVyZSBpcyBhIGRyYXdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQocClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWlNb3ZlXCIpID09PSBudWxsIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWlNb3ZlXCIpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5pZCA9IFwiYWlNb3ZlXCJcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICBhaSA9IHJlcXVpcmUoXCIuL2FpXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFpLmV4ZWN1dGUoZGF0YS5ib2FyZCwgZGF0YS50dXJuKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiTWFrZSBBSSBtb3ZlXCJcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQoYnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlbGVjdGVkUGllY2U6IFwiXCJcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYXRhOyIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG52YXIgc2VsZWN0UGllY2UgPSByZXF1aXJlKFwiLi9zZWxlY3RQaWVjZVwiKVxyXG52YXIgbWFrZU1vdmUgPSByZXF1aXJlKFwiLi9tYWtlTW92ZVwiKVxyXG5cclxudmFyIGRvbVByaW50ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIG1ha2VNb3ZlKGUudGFyZ2V0LmNsYXNzTmFtZSwgZS50YXJnZXQuaWQpXHJcbiAgICAgICAgbWFrZU1vdmUoZS50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc05hbWUsIGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQpXHJcbiAgICB9KVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIHJvdy5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGJveC5pZCA9IGkudG9TdHJpbmcoKSArIGoudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgYm94LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIGJsYWNrXCI7XHJcbiAgICAgICAgICAgIGJveC5zdHlsZS53aWR0aCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICBib3guc3R5bGUuaGVpZ2h0ID0gXCI3NXB4XCI7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYm94LmlkID0gZGF0YS5ib2FyZFtpXVtqXSArIGkudG9TdHJpbmcoKSArIGoudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdLmluY2x1ZGVzKGRhdGEudHVybikpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0UGllY2UoYm94LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGltZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS53aWR0aCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmhlaWdodCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV3BcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV3AucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dyLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xbi5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV2JcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV2IucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dxLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXa1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xay5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQnBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQnAucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JyLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cbi5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQmJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQmIucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JxLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCa1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cay5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBib3guYXBwZW5kQ2hpbGQoaW1nRGl2KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoYm94KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKS5hcHBlbmRDaGlsZChyb3cpXHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZG9tUHJpbnRlciIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG5cclxudmFyIGlzSW5DaGVjayA9IGZ1bmN0aW9uICh0dXJuKSB7XHJcbiAgICBsZXQgb3Bwb25lbnQgPSBcIldcIlxyXG4gICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgb3Bwb25lbnQgPSBcIkJcIlxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IGtpID0gXCJcIjsgIC8va2luZ3MgcG9zaXRpb25cclxuICAgIGxldCBraiA9IFwiXCI7XHJcbiAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykgey8vZmluZCB0aGUga2luZ1xyXG4gICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgODsgbCsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tdW2xdID09PSBgJHt0dXJufWtgKSB7XHJcbiAgICAgICAgICAgICAgICBraSA9IGtcclxuICAgICAgICAgICAgICAgIGtqID0gbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAodHVybiA9PT0gXCJXXCIpIHsgIC8vY2hlY2tpbmcgZm9yIHBhd25zXHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiAtIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcnJheSA9IFtdO1xyXG4gICAgZnVuY3Rpb24gbGluZUNoZWNrKGluYzEsIGluYzIpIHsgICAvL2xvb2tzIGluIGV2ZXJ5IGRpcmVjdGlvbiBmcm9tIHRoZSBraW5nXHJcbiAgICAgICAgZm9yIChsZXQgbSA9IDE7IG0gPCA4OyBtKyspIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSA9PT0gYCR7b3Bwb25lbnR9a2AgJiYgbSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIiFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGEgPSAtMTsgYSA8PSAxOyBhKyspIHtcclxuICAgICAgICBmb3IgKGxldCBiID0gLTE7IGIgPD0gMTsgYisrKSB7XHJcbiAgICAgICAgICAgIGxpbmVDaGVjayhhLCBiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwia2luZyBsaW5lIGFycmF5OlwiLCBhcnJheSlcclxuXHJcblxyXG4gICAgaWYgKGFycmF5LmluY2x1ZGVzKFwiIVwiKSB8fCBhcnJheS5pbmNsdWRlcyhgJHtvcHBvbmVudH1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHtvcHBvbmVudH1iYCkge1xyXG4gICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgYyA9IDE7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBzdHJhaWdodHNcclxuICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke29wcG9uZW50fXJgKSB7XHJcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIga25pZ2h0S2luZ0NoZWNrID0gZnVuY3Rpb24gKGxNb3ZlKSB7XHJcbiAgICAgICAgZm9yIChpdGVtIGluIGxNb3ZlKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXVtraiArIGxNb3ZlWzFdXSA9PT0gYCR7b3Bwb25lbnR9bmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgeCA9IFtbMiwgMV0sIFsyLCAtMV0sIFstMiwgMV0sIFstMiwgLTFdLCBbMSwgMl0sIFsxLCAtMl0sIFstMSwgMl0sIFstMSwgLTJdXVxyXG5cclxuICAgIGZvciAobGV0IHEgPSAwOyBxIDwgeC5sZW5ndGg7IHErKykge1xyXG4gICAgICAgIGtuaWdodEtpbmdDaGVjayh4W3FdKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4gY2hlY2s7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaXNJbkNoZWNrOyIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG52YXIgZG9tUHJpbnRlciA9IHJlcXVpcmUoXCIuL2RvbVByaW50ZXJcIilcclxudmFyIGFpID0gcmVxdWlyZShcIi4vYWlcIilcclxuXHJcblxyXG5cclxuZGF0YS5nZXRMZWdhbE1vdmVzKCk7XHJcbmRhdGEucmVtb3ZlQ2hlY2tzKCk7XHJcblxyXG5kb21QcmludGVyKCk7XHJcblxyXG5jb25zb2xlLmxvZyhcIkJvYXJkOlwiLCBkYXRhLmJvYXJkKVxyXG5jb25zb2xlLmxvZyhcIkxlZ2FsIG1vdmVzOlwiLCBkYXRhLmxlZ2FsTW92ZXMpXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkKVxyXG4gICAgY29uc29sZS5sb2coZGF0YS5sZWdhbE1vdmVzKVxyXG4gICAgY29uc29sZS5sb2coZGF0YS5oaXN0b3J5KVxyXG59KVxyXG5cclxubGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuYnV0dG9uLmlkID0gXCJhaU1vdmVcIlxyXG5idXR0b24udHlwZSA9IFwiYnV0dG9uXCJcclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgYWkuZXhlY3V0ZShkYXRhLmJvYXJkLCBkYXRhLnR1cm4pO1xyXG59KVxyXG5idXR0b24udGV4dENvbnRlbnQgPSBcIk1ha2UgQUkgbW92ZVwiXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQoYnV0dG9uKVxyXG5cclxuXHJcbiIsInZhciBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG5cclxudmFyIG1ha2VNb3ZlID0gZnVuY3Rpb24oY2xhc3NMaXN0LCBpZCl7XHJcblxyXG4gICAgaWYoY2xhc3NMaXN0ID09PSBcImFjdGl2ZVwiKXtcclxuICAgICAgICBpZihkYXRhLnNlbGVjdGVkUGllY2UuaW5jbHVkZXMoXCJrXCIpICYmIGlkID09PSBcIjc2XCIpe1xyXG4gICAgICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlLnN0YXJ0KFwid2hpdGVDYXN0bGVSaWdodFwiKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5zZWxlY3RlZFBpZWNlLmluY2x1ZGVzKFwia1wiKSAmJiBpZCA9PT0gXCI3MlwiKXtcclxuICAgICAgICAgICAgZGF0YS5leGVjdXRlTW92ZS5zdGFydChcIndoaXRlQ2FzdGxlTGVmdFwiKVxyXG4gICAgICAgIH0gZWxzZSBpZihkYXRhLnNlbGVjdGVkUGllY2UuaW5jbHVkZXMoXCJrXCIpICYmIGlkID09PSBcIjAyXCIpe1xyXG4gICAgICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlLnN0YXJ0KFwiYmxhY2tDYXN0bGVMZWZ0XCIpXHJcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEuc2VsZWN0ZWRQaWVjZS5pbmNsdWRlcyhcImtcIikgJiYgaWQgPT09IFwiMDZcIil7XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUuc3RhcnQoXCJibGFja0Nhc3RsZVJpZ2h0XCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGYgPSBpZDtcclxuICAgICAgICAgICAgaWYoaWQubGVuZ3RoID4gMil7XHJcbiAgICAgICAgICAgICAgICBmID0gaWQuc2xpY2UoMiw0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlLnN0YXJ0KGRhdGEuc2VsZWN0ZWRQaWVjZStmKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWtlTW92ZSIsImxldCBkYXRhID0gcmVxdWlyZShcIi4vZGF0YVwiKVxyXG5sZXQgcHJvbW90ZVBhd24gPSByZXF1aXJlKFwiLi9wcm9tb3RlUGF3blwiKVxyXG5cclxubGV0IHBhd25Qcm9tb3Rpb25DaGVjayA9IHtcclxuICAgIHJ1bjogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgaWYoZGF0YS50dXJuID09PSBcIkJcIil7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA4OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5ib2FyZFswXVtpXSA9PT0gXCJXcFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXduUHJvbW90aW9uQ2hlY2suY29tcGxldGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHByb21vdGVQYXduKFswLCBpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgODsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuYm9hcmRbN11baV0gPT09IFwiQnBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF3blByb21vdGlvbkNoZWNrLmNvbXBsZXRlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICBwcm9tb3RlUGF3bihbNywgaV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZmluaXNoOiBmdW5jdGlvbihtb3ZlKXtcclxuICAgICAgICBpZihkYXRhLnR1cm4gPT09IFwiQlwiKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmJvYXJkWzBdW2ldID09PSBcIldwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmJvYXJkWzddW2ldID09PSBcIkJwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUuZmluaXNoKG1vdmUpO1xyXG4gICAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gcGF3blByb21vdGlvbkNoZWNrIiwibGV0IGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcbmxldCBkb21QcmludGVyID0gcmVxdWlyZShcIi4vZG9tUHJpbnRlclwiKVxyXG5cclxubGV0IHByb21vdGVQYXduID0gZnVuY3Rpb24ocG9zQXJyKXtcclxuICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5maXJzdENoaWxkKVxyXG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQgPT09IG51bGwpe1xyXG4gICAgICAgIGxldCBjb21wbGV0ZVByb21vdGlvbiA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIilcclxuICAgICAgICAgICAgaWYoZS50YXJnZXQuaWQuaW5jbHVkZXMoXCJxXCIpIHx8IGUudGFyZ2V0LmlkLmluY2x1ZGVzKFwiclwiKSB8fCBlLnRhcmdldC5pZC5pbmNsdWRlcyhcImtcIikgfHwgZS50YXJnZXQuaWQuaW5jbHVkZXMoXCJiXCIpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5pbm5lckhUTUwgPSBcIiBcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtwb3NBcnJbMF1dW3Bvc0FyclsxXV0gPSBgJHtkYXRhLm9wcG9uZW50fSR7ZS50YXJnZXQuaWR9YFxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc0luQ2hlY2sgPSByZXF1aXJlKFwiLi9pc0luQ2hlY2tcIilcclxuICAgICAgICAgICAgICAgIGlmIChpc0luQ2hlY2soZGF0YS50dXJuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJCbGFjayBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnlbZGF0YS5oaXN0b3J5Lmxlbmd0aCAtMV0gKz0gXCIhXCJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJXaGl0ZSBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnlbZGF0YS5oaXN0b3J5Lmxlbmd0aCAtMV0gKz0gXCIhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLmdldExlZ2FsTW92ZXMoKTtcclxuICAgICAgICAgICAgICAgIGRhdGEucmVtb3ZlQ2hlY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tUHJpbnRlciA9IHJlcXVpcmUoXCIuL2RvbVByaW50ZXJcIilcclxuICAgICAgICAgICAgICAgIGRvbVByaW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGllY2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICAgICAgICAgIGZvciAoaXRlbSBpbiBkYXRhLmxlZ2FsTW92ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IGNvdW50ICsgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtkYXRhLmhpc3RvcnkubGVuZ3RoIC0gMV0uaW5jbHVkZXMoXCIhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIkNoZWNrbWF0ZSEgV2hpdGUgd2lucyFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIkNoZWNrbWF0ZSEgQmxhY2sgd2lucyFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAudGV4dENvbnRlbnQgPSBcIlRoZXJlIGlzIGEgZHJhd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmV0dXJuQm94ID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgICAgICBib3guc3R5bGUud2lkdGggPSBcIjc1cHhcIlxyXG4gICAgICAgICAgICBib3guc3R5bGUuaGVpZ2h0ID0gXCI3NXB4XCJcclxuICAgICAgICAgICAgYm94LmlkID0gaWRcclxuICAgICAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb21wbGV0ZVByb21vdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuIGJveFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga25pZ2h0Qm94ID0gcmV0dXJuQm94KFwiblwiKTtcclxuICAgICAgICBsZXQgYmlzaG9wQm94ID0gcmV0dXJuQm94KFwiYlwiKTtcclxuICAgICAgICBsZXQgcm9va0JveCA9IHJldHVybkJveChcInJcIik7XHJcbiAgICAgICAgbGV0IHF1ZWVuQm94ID0gcmV0dXJuQm94KFwicVwiKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQoa25pZ2h0Qm94KVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChiaXNob3BCb3gpXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmFwcGVuZENoaWxkKHJvb2tCb3gpXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmFwcGVuZENoaWxkKHF1ZWVuQm94KVxyXG4gICAgICAgIGlmKGRhdGEub3Bwb25lbnQgPT09IFwiV1wiKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xbi5wbmcnKVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYlwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV2IucG5nJylcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dyLnBuZycpXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9XcS5wbmcnKVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cbi5wbmcnKVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYlwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQmIucG5nJylcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JyLnBuZycpXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9CcS5wbmcnKVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHByb21vdGVQYXduIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcblxyXG52YXIgc2VsZWN0UGllY2UgPSBmdW5jdGlvbihpZCl7XHJcbiAgICBsZXQgYXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY3RpdmVcIik7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBhcnJbaV0uY2xhc3NMaXN0ID0gXCIgXCJcclxuICAgIH1cclxuXHJcbiAgICBpZihkYXRhLmxlZ2FsTW92ZXNbaWRdICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGRhdGEuc2VsZWN0ZWRQaWVjZSA9IGlkO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlZ2FsTW92ZXNbaWRdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG15aSA9IGRhdGEubGVnYWxNb3Zlc1tpZF1baV0uc2xpY2UoNCw1KTtcclxuICAgICAgICAgICAgbGV0IG15aiA9IGRhdGEubGVnYWxNb3Zlc1tpZF1baV0uc2xpY2UoNSw2KTtcclxuICAgICAgICAgICAgbGV0IGEgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZihkYXRhLmJvYXJkW215aV1bbXlqXSAhPT0gXCJlXCIpe1xyXG4gICAgICAgICAgICAgICAgYSA9IGRhdGEuYm9hcmRbbXlpXVtteWpdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGErbXlpK215aikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaWQuaW5jbHVkZXMoXCJrXCIpKXsgIC8vY2FzdGxlIHN0dWZmXHJcbiAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwdWxsaW5nQ2FzdGxlTW92ZXNcIilcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZVtpXSA9PT0gXCJ3aGl0ZUNhc3RsZUxlZnRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCI3MlwiKS5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZVtpXSA9PT0gXCJ3aGl0ZUNhc3RsZVJpZ2h0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiNzZcIikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwiYmxhY2tDYXN0bGVMZWZ0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiMDJcIikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwiYmxhY2tDYXN0bGVSaWdodFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjA2XCIpLmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VsZWN0UGllY2U7Il19
