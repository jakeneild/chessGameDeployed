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
        //console.log("obj before prune: ", obj)
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
            //console.log(worstScore, meanScoreNum)

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

            if(metaArr[1] === undefined){
                metaArr[1] = metaArr[0]
            }
            // console.log(metaArr)

            if(bObj.meta !== undefined){
                bObj.meta = ((bObj.meta + ((metaArr[0] + metaArr[1]) / metaArr.length))/2)
            } else {
                bObj.meta = ((metaArr[0] + metaArr[1]) / metaArr.length)
            }

            // console.log(bObj.meta)

            return bObj.meta
        }

        for (let i = 0; i <= 3; i++) {
            metaExplore(myObj.start)
        }
        for (item in myObj.start) {
            if (item !== "turn" && item !== "score" && item !== "board" && item !== "meta" && item !== "pruneDump") {
                explore(newBoard(myObj.start[item].board), changeTurn(turn), inc(iteration), myObj.start[item], 2)
                //console.log(myObj)
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
                    if(piece.includes("W")){
                        score += (((i-6)*-1)/20)
                    } else {
                        score -= ((i-1)/20)
                    }
                }

                if (piece.includes("r")) {
                    worth = 5
                }

                if (piece.includes("p")) {
                    worth = 1
                    //pawn position stuff
                    if(piece.includes("W")){
                        score += (((i-6)*-1)/10)
                    } else {
                        score -= ((i-1)/10)
                    }
                }

                if (piece.includes("q")) {
                    worth = 8
                }

                score = score + (worth * mod)
            }
        }
        arr = ai.getLegalMoves(board, turn)

        if (ai.isInCheck(board, "W")) {
            score -= 2
            if (turn === "W" && arr.length === 0) {
                score -= 100
            }
        }

        if (ai.isInCheck(board, "B")) {
            score += 2
            if (turn === "B" && arr.length === 0) {
                score += 100
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
    //console.log(data.board, "!")
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
                    document.getElementById("info").innerHTML = ""
                    let button = document.createElement("button")
                    button.id = "aiMove"
                    button.type = "button"
                    button.textContent = "Make AI move"
                    ai = require("./ai")
                    button.addEventListener("click", function () {
                        ai.execute(data.board, data.turn)
                    })
                    document.getElementById("info").appendChild(button)
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
    //console.log("king line array:", array)


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2FpLmpzIiwic2NyaXB0cy9jYW5DYXN0bGUuanMiLCJzY3JpcHRzL2RhdGEuanMiLCJzY3JpcHRzL2RvbVByaW50ZXIuanMiLCJzY3JpcHRzL2lzSW5DaGVjay5qcyIsInNjcmlwdHMvbWFpbi5qcyIsInNjcmlwdHMvbWFrZU1vdmUuanMiLCJzY3JpcHRzL3Bhd25Qcm9tb3Rpb25DaGVjay5qcyIsInNjcmlwdHMvcHJvbW90ZVBhd24uanMiLCJzY3JpcHRzL3NlbGVjdFBpZWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1OUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4dkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFpID0ge1xyXG4gICAgZXhlY3V0ZTogZnVuY3Rpb24gKGJvYXJkLCB0dXJuKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJiZWdpbiBBSSBjYWxjdWxhdGlvblwiKVxyXG4gICAgICAgIGNvbnN0IG9iaiA9IGFpLnNtYXJ0U2NvcmUoYm9hcmQsIHR1cm4pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzbWFydFNjb3JlIGNvbXBsZXRlXCIsIG9iailcclxuICAgICAgICBsZXQgYmVzdE1vdmUgPSBcIlwiXHJcbiAgICAgICAgbGV0IGJlc3RNZXRhID0gLTk5OTtcclxuICAgICAgICBpZiAodHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgYmVzdE1ldGEgPSA5OTlcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpdGVtIGluIG9iai5zdGFydCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gXCJtZXRhXCIgJiYgaXRlbSAhPT0gXCJzY29yZVwiICYmIGl0ZW0gIT09IFwidHVyblwiICE9PSBpdGVtICE9PSBcImJvYXJkXCIgJiYgaXRlbSAhPT0gXCJwcnVuZUR1bXBcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5zdGFydFtpdGVtXS5tZXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5zdGFydFtpdGVtXS5tZXRhID4gYmVzdE1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNZXRhID0gb2JqLnN0YXJ0W2l0ZW1dLm1ldGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RNb3ZlID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouc3RhcnRbaXRlbV0ubWV0YSA8IGJlc3RNZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TWV0YSA9IG9iai5zdGFydFtpdGVtXS5tZXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0TW92ZSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJCZXN0IG1vdmU6XCIsIGJlc3RNb3ZlKVxyXG5cclxuICAgICAgICBkYXRhLmxlZ2FsTW92ZXMuYmVzdE1vdmUgPSBbYmVzdE1vdmVdXHJcbiAgICAgICAgZGF0YS5leGVjdXRlTW92ZS5zdGFydChiZXN0TW92ZSlcclxuICAgIH0sXHJcbiAgICBtYWtlTW92ZTogZnVuY3Rpb24gKG0sIGJvYXJkSW5wdXQpIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld0JvYXJkID0gZnVuY3Rpb24gKG15Qm9hcmQpIHtcclxuICAgICAgICAgICAgbGV0IG5ld0JvYXJkID0gW1tdXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdCb2FyZFtqXSA9IFtdXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0JvYXJkW2pdW2tdID0gbXlCb2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3Qm9hcmRcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGllY2UgPSBtLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgIGNvbnN0IG9nUG9zaSA9IG0uc2xpY2UoMiwgMyk7XHJcbiAgICAgICAgY29uc3Qgb2dQb3NqID0gbS5zbGljZSgzLCA0KTtcclxuICAgICAgICBjb25zdCBuZXdQb3NpID0gbS5zbGljZSg0LCA1KTtcclxuICAgICAgICBjb25zdCBuZXdQb3NqID0gbS5zbGljZSg1LCA2KTtcclxuXHJcbiAgICAgICAgY29uc3QgYiA9IG5ld0JvYXJkKGJvYXJkSW5wdXQpXHJcbiAgICAgICAgYltuZXdQb3NpXVtuZXdQb3NqXSA9IHBpZWNlO1xyXG4gICAgICAgIGJbb2dQb3NpXVtvZ1Bvc2pdID0gXCJlXCI7XHJcblxyXG4gICAgICAgIHJldHVybiBiO1xyXG4gICAgfSxcclxuICAgIGdldExlZ2FsTW92ZXM6IGZ1bmN0aW9uIChib2FyZCwgdHVybikge1xyXG4gICAgICAgIGxldCBvcHBvbmVudCA9IFwiQlwiXHJcbiAgICAgICAgaWYgKHR1cm4gPT09IFwiQlwiKSB7XHJcbiAgICAgICAgICAgIG9wcG9uZW50ID0gXCJXXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtb3ZlID0gZnVuY3Rpb24gKG0sIGYpIHtcclxuICAgICAgICAgICAgbGV0IHBpZWNlID0gbS5zbGljZSgwLCAyKTtcclxuICAgICAgICAgICAgbGV0IG9nUG9zaSA9IG0uc2xpY2UoMiwgMyk7XHJcbiAgICAgICAgICAgIGxldCBvZ1Bvc2ogPSBtLnNsaWNlKDMsIDQpO1xyXG4gICAgICAgICAgICBsZXQgbmV3UG9zaSA9IG0uc2xpY2UoNCwgNSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdQb3NqID0gbS5zbGljZSg1LCA2KTtcclxuICAgICAgICAgICAgbGV0IGQgPSBmO1xyXG5cclxuICAgICAgICAgICAgZFtuZXdQb3NpXVtuZXdQb3NqXSA9IHBpZWNlO1xyXG4gICAgICAgICAgICBkW29nUG9zaV1bb2dQb3NqXSA9IFwiZVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlZ2FsTW92ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHsgICAgICAgICAgICAgICAgICAvL3Jvd1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBpZWNlID0gYm9hcmRbaV1bal0gICAgICAgICAgICAgLy9jb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqXS5pbmNsdWRlcyh0dXJuKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJrXCIpKSB7ICAvL2tpbmcgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gLTE7IGsgPD0gMTsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsID0gLTE7IGwgPD0gMTsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiArIGxdICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogKyBsXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBsfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogKyBsXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBsfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInBcIikpIHsgICAgICAgICAgICAgICAgICAgIC8vcGF3biBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcIldcIikgJiYgdHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0gMV1bal0gPT09IFwiZVwiKSB7ICAgICAgICAgIC8vc2luZ2xlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSAxfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSAyXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0gMl1bal0gPT09IFwiZVwiICYmIGkgPT09IDYpIHsgIC8vZG91YmxlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDJ9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0gMV1baiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIDFdW2ogLSAxXS5pbmNsdWRlcyhcIkJcIikpIHsgIC8vdGFrZSB0byB0aGUgbGVmdCBXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSAxfSR7aiAtIDF9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIDFdW2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSAxXVtqICsgMV0uaW5jbHVkZXMoXCJCXCIpKSB7ICAvL3Rha2UgdG8gdGhlIHJpZ2h0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqICsgMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwaWVjZS5pbmNsdWRlcyhcIkJcIikgJiYgdHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsgMV1bal0gPT09IFwiZVwiKSB7ICAgICAgICAgIC8vc2luZ2xlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyAxfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyAyXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsgMl1bal0gPT09IFwiZVwiICYmIGkgPT09IDEpIHsgIC8vZG91YmxlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDJ9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyAxXVtqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsgMV1baiAtIDFdLmluY2x1ZGVzKFwiV1wiKSkgeyAgLy90YWtlIHRvIHRoZSBsZWZ0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDF9JHtqIC0gMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsgMV1baiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIDFdW2ogKyAxXS5pbmNsdWRlcyhcIldcIikpIHsgIC8vdGFrZSB0byB0aGUgcmlnaHQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsgMX0ke2ogKyAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInJcIikpIHsgIC8vcm9vayBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpICsga11bal0uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga11bal0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSAtIGtdW2pdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2xlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1baiAtIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2ldW2ogKyBrXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJuXCIpKSB7IC8va25pZ2h0IG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtuaWdodE1vdmUgPSBmdW5jdGlvbiAociwgYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyByXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyByXVtqICsgY10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIHJdW2ogKyBjXSA9PT0gXCJlXCIgfHwgYm9hcmRbaSArIHJdW2ogKyBjXS5pbmNsdWRlcyhgJHtvcHBvbmVudH1gKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIHJ9JHtqICsgY31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDIsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMiwgLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTIsIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTIsIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRNb3ZlKDEsIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMSwgLTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTEsIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoLTEsIC0yKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiYlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSArIGtdW2pdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga11baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpIC0ga11baiArIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpICsga11baiAtIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9yaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSAtIGtdW2ogLSBrXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInFcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpICsga11bal0uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga11bal0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSAtIGtdW2pdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2xlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1baiAtIGtdLmluY2x1ZGVzKG9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaV1baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2ldW2ogKyBrXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWdhbE1vdmVzLnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpICsga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2kgKyBrXVtqICsga10uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd24gcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtpIC0ga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2kgLSBrXVtqICsga10uaW5jbHVkZXMob3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd24gbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgKyBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSArIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSArIGtdW2ogLSBrXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXAgbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2kgLSBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbaSAtIGtdW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaSAtIGtdW2ogLSBrXS5pbmNsdWRlcyhvcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVnYWxNb3Zlcy5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnYWxNb3Zlcy5sZW5ndGg7IGkrKykgeyAgLy9pdGVyYXRpbmcgdGhyb3VnaCBldmVyeSBtb3ZlXHJcbiAgICAgICAgICAgIHZhciBob2xkZXIgPSBbXVxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBob2xkZXJbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gYm9hcmRbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBhID0gbW92ZShsZWdhbE1vdmVzW2ldLCBib2FyZClcclxuICAgICAgICAgICAgYm9hcmQgPSBhO1xyXG5cclxuICAgICAgICAgICAgdHVybiA9IG9wcG9uZW50O1xyXG4gICAgICAgICAgICBvcHBvbmVudCA9IFwiV1wiXHJcbiAgICAgICAgICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgb3Bwb25lbnQgPSBcIkJcIlxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQga2kgPSBcIlwiOyAgLy9raW5ncyBwb3NpdGlvblxyXG4gICAgICAgICAgICBsZXQga2ogPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykgey8vZmluZCB0aGUga2luZ1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCA4OyBsKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba11bbF0gPT09IGAke29wcG9uZW50fWtgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtpID0ga1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBraiA9IGxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAob3Bwb25lbnQgPT09IFwiV1wiKSB7ICAvL2NoZWNraW5nIGZvciBwYXduc1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSAtIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgLSAxXVtraiArIDFdID09PSBgJHt0dXJufXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV1ba2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSAtIDFdW2tqIC0gMV0gPT09IGAke3R1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyAxXVtraiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV1ba2ogKyAxXSA9PT0gYCR7dHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIDFdW2tqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyAxXVtraiAtIDFdID09PSBgJHt0dXJufXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpbmVDaGVjayhpbmMxLCBpbmMyKSB7ICAgLy9sb29rcyBpbiBldmVyeSBkaXJlY3Rpb24gZnJvbSB0aGUga2luZ1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbSA9IDE7IG0gPCA4OyBtKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBpbmMxICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSA9PT0gYCR7dHVybn1rYCAmJiBtID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCIhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgYSA9IC0xOyBhIDw9IDE7IGErKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYiA9IC0xOyBiIDw9IDE7IGIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVDaGVjayhhLCBiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYXJyYXkuaW5jbHVkZXMoXCIhXCIpIHx8IGFycmF5LmluY2x1ZGVzKGAke3R1cm59cWApKSB7IC8vY2hlY2sgZm9yIGtpbmdzIGFuZCBxdWVlbnNcclxuICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIGRpYWdvbmFsc1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHt0dXJufWJgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgc3RyYWlnaHRzXHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke3R1cm59cmApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBrbmlnaHRLaW5nQ2hlY2sgPSBmdW5jdGlvbiAobE1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIGxNb3ZlWzBdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dID09PSBgJHt0dXJufW5gKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHggPSBbWzIsIDFdLCBbMiwgLTFdLCBbLTIsIDFdLCBbLTIsIC0xXSwgWzEsIDJdLCBbMSwgLTJdLCBbLTEsIDJdLCBbLTEsIC0yXV1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgcSA9IDA7IHEgPCB4Lmxlbmd0aDsgcSsrKSB7XHJcbiAgICAgICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soeFtxXSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9maW5hbGx5IGZpbmlzaGVkIHdpdGggY2hlY2tpbmdcclxuICAgICAgICAgICAgYm9hcmQgPSBob2xkZXI7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hlY2sgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGxlZ2FsTW92ZXMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxlZ2FsTW92ZXNcclxuICAgIH0sXHJcbiAgICBpc0luQ2hlY2s6IGZ1bmN0aW9uIChib2FyZCwgdHVybikge1xyXG4gICAgICAgIGxldCBvcHBvbmVudCA9IFwiV1wiXHJcbiAgICAgICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgICAgIG9wcG9uZW50ID0gXCJCXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGtpID0gXCJcIjsgIC8va2luZ3MgcG9zaXRpb25cclxuICAgICAgICBsZXQga2ogPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7Ly9maW5kIHRoZSBraW5nXHJcbiAgICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgODsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRba11bbF0gPT09IGAke3R1cm59a2ApIHtcclxuICAgICAgICAgICAgICAgICAgICBraSA9IGtcclxuICAgICAgICAgICAgICAgICAgICBraiA9IGxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHVybiA9PT0gXCJXXCIpIHsgIC8vY2hlY2tpbmcgZm9yIHBhd25zXHJcbiAgICAgICAgICAgIGlmIChib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSAtIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSAtIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV1ba2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpIC0gMV1ba2ogLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChib2FyZFtraSArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIDFdW2tqICsgMV0gPT09IGAke29wcG9uZW50fXBgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV1ba2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgMV1ba2ogLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXJyYXkgPSBbXTtcclxuICAgICAgICBmdW5jdGlvbiBsaW5lQ2hlY2soaW5jMSwgaW5jMikgeyAgIC8vbG9va3MgaW4gZXZlcnkgZGlyZWN0aW9uIGZyb20gdGhlIGtpbmdcclxuICAgICAgICAgICAgZm9yIChsZXQgbSA9IDE7IG0gPCA4OyBtKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIGluYzEgKiBtXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dID09PSBgJHtvcHBvbmVudH1rYCAmJiBtID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIiFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBhID0gLTE7IGEgPD0gMTsgYSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGIgPSAtMTsgYiA8PSAxOyBiKyspIHtcclxuICAgICAgICAgICAgICAgIGxpbmVDaGVjayhhLCBiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKGFycmF5LmluY2x1ZGVzKFwiIVwiKSB8fCBhcnJheS5pbmNsdWRlcyhgJHtvcHBvbmVudH1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7b3Bwb25lbnR9YmApIHtcclxuICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIHN0cmFpZ2h0c1xyXG4gICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke29wcG9uZW50fXJgKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGtuaWdodEtpbmdDaGVjayA9IGZ1bmN0aW9uIChsTW92ZSkge1xyXG4gICAgICAgICAgICBmb3IgKGl0ZW0gaW4gbE1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFtraSArIGxNb3ZlWzBdXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dID09PSBgJHtvcHBvbmVudH1uYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgeCA9IFtbMiwgMV0sIFsyLCAtMV0sIFstMiwgMV0sIFstMiwgLTFdLCBbMSwgMl0sIFsxLCAtMl0sIFstMSwgMl0sIFstMSwgLTJdXVxyXG5cclxuICAgICAgICBmb3IgKGxldCBxID0gMDsgcSA8IHgubGVuZ3RoOyBxKyspIHtcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKHhbcV0pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xyXG4gICAgfSxcclxuICAgIHBydW5lTWV0YTogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJvYmogYmVmb3JlIHBydW5lOiBcIiwgb2JqKVxyXG4gICAgICAgIGxldCBwcnVuZVdvcnN0ID0gZnVuY3Rpb24gKG15T2JqQXJyLCB0dXJuKSB7XHJcbiAgICAgICAgICAgIGxldCBtZWFuU2NvcmVBcnIgPSBbXTtcclxuICAgICAgICAgICAgbGV0IHdvcnN0TWV0YSA9IDk5OTtcclxuICAgICAgICAgICAgbGV0IHdvcnN0TW92ZSA9IFwiZmlsbGVyXCJcclxuICAgICAgICAgICAgbGV0IGFyclBvcyA9IDBcclxuICAgICAgICAgICAgbGV0IHdvcnN0U2NvcmUgPSAwO1xyXG4gICAgICAgICAgICBpZiAodHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgIHdvcnN0TWV0YSA9IC05OTlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG15T2JqQXJyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtZWFuU2NvcmVBcnIucHVzaChteU9iakFycltqXS5zY29yZSlcclxuICAgICAgICAgICAgICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChteU9iakFycltqXS5tZXRhIDwgd29yc3RNZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcnN0TWV0YSA9IG15T2JqQXJyW2pdLm1ldGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yc3RNb3ZlID0gbXlPYmpBcnJbal0ubW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JzdFNjb3JlID0gbXlPYmpBcnJbal0uc2NvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyUG9zID0galxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG15T2JqQXJyW2pdLm1ldGEgPiB3b3JzdE1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd29yc3RNZXRhID0gbXlPYmpBcnJbal0ubWV0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3b3JzdE1vdmUgPSBteU9iakFycltqXS5tb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcnN0U2NvcmUgPSBteU9iakFycltqXS5zY29yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJQb3MgPSBqXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtZWFuU2NvcmVOdW0gPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IG1lYW5TY29yZUFyci5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgbWVhblNjb3JlTnVtICs9IG1lYW5TY29yZUFycltrXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lYW5TY29yZU51bSAvPSBtZWFuU2NvcmVBcnIubGVuZ3RoXHJcblxyXG4gICAgICAgICAgICBvYmpBcnIuc3BsaWNlKGFyclBvcywgMSlcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh3b3JzdFNjb3JlLCBtZWFuU2NvcmVOdW0pXHJcblxyXG4gICAgICAgICAgICBpZiAod29yc3RTY29yZSA8PSBtZWFuU2NvcmVOdW0gJiYgdHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoucHJ1bmVEdW1wID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJ1bmVEdW1wID0gW3sgbW92ZTogd29yc3RNb3ZlLCBvYmo6IG9ialt3b3JzdE1vdmVdIH1dXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcnVuZUR1bXAucHVzaCh7IG1vdmU6IHdvcnN0TW92ZSwgb2JqOiBvYmpbd29yc3RNb3ZlXSB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ialt3b3JzdE1vdmVdXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod29yc3RTY29yZSA+PSBtZWFuU2NvcmVOdW0gJiYgdHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmoucHJ1bmVEdW1wID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJ1bmVEdW1wID0gW3sgbW92ZTogd29yc3RNb3ZlLCBvYmo6IG9ialt3b3JzdE1vdmVdIH1dXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcnVuZUR1bXAucHVzaCh7IG1vdmU6IHdvcnN0TW92ZSwgb2JqOiBvYmpbd29yc3RNb3ZlXSB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ialt3b3JzdE1vdmVdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHR1cm4gPSBvYmoudHVyblxyXG4gICAgICAgIGxldCBvYmpBcnIgPSBbXVxyXG5cclxuICAgICAgICBmb3IgKGl0ZW0gaW4gb2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtICE9PSBcInR1cm5cIiAmJiBpdGVtICE9PSBcInNjb3JlXCIgJiYgaXRlbSAhPT0gXCJib2FyZFwiICYmIGl0ZW0gIT09IFwibWV0YVwiICYmIGl0ZW0gIT09IFwicHJ1bmVEdW1wXCIpIHtcclxuICAgICAgICAgICAgICAgIG9iakFyci5wdXNoKHsgbW92ZTogaXRlbSwgbWV0YTogb2JqW2l0ZW1dLm1ldGEsIHNjb3JlOiBvYmpbaXRlbV0uc2NvcmUgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVuZ3RoID0gb2JqQXJyLmxlbmd0aFxyXG4gICAgICAgIGxlbmd0aCA9IE1hdGgucm91bmQobGVuZ3RoIC8gMilcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGFsbFRoZVNhbWUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgZmlyc3QgPSBvYmpBcnJbMF0ubWV0YVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iakFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iakFycltpXS5tZXRhICE9PSBmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFRoZVNhbWUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbGxUaGVTYW1lID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJwcnVuZVdvcnN0IGlucHV0OlwiLCBvYmpBcnIpXHJcbiAgICAgICAgICAgICAgICBwcnVuZVdvcnN0KG9iakFyciwgdHVybik7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9iaiBhZnRlciBwcnVuZVwiLCBvYmopXHJcbiAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgfSxcclxuICAgIHNtYXJ0U2NvcmU6IGZ1bmN0aW9uIChib2FyZCwgdHVybikge1xyXG4gICAgICAgIGxldCBuZXdCb2FyZCA9IGZ1bmN0aW9uIChteUJvYXJkKSB7XHJcbiAgICAgICAgICAgIGxldCBuZXdCb2FyZCA9IFtbXV07XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbmV3Qm9hcmRbal0gPSBbXVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdCb2FyZFtqXVtrXSA9IG15Qm9hcmRbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ld0JvYXJkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjaGFuZ2VUdXJuID0gZnVuY3Rpb24gKHR1cm4pIHtcclxuICAgICAgICAgICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJCXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIldcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpdGVyYXRpb24gPSAwO1xyXG4gICAgICAgIGxldCBteU9iaiA9IHtcclxuICAgICAgICAgICAgc3RhcnQ6IHt9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBteU9iai5zdGFydC5ib2FyZCA9IG5ld0JvYXJkKGJvYXJkKVxyXG5cclxuICAgICAgICBsZXQgaW5jID0gZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICAgICAgICBudW0rKztcclxuICAgICAgICAgICAgcmV0dXJuIG51bVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGV4cGxvcmUgPSBmdW5jdGlvbiAobkJvYXJkLCB0dXJuLCBpdGVyYXRpb24sIHBhdGgsIHN0YXJ0QXQpIHtcclxuICAgICAgICAgICAgLy9wYXduIHByb21vdGlvbiB0aGluZ3NcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChuQm9hcmRbMF1baV0gPT09IFwiV3BcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5Cb2FyZFswXVtpXSA9PT0gXCJXcVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobkJvYXJkWzddW2ldID09PSBcIkJwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuQm9hcmRbN11baV0gPT09IFwiQnFcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXRlcmF0aW9uIDwgNCAmJiBpdGVyYXRpb24gPj0gc3RhcnRBdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IGFpLmdldExlZ2FsTW92ZXMobkJvYXJkLCB0dXJuKTtcclxuICAgICAgICAgICAgICAgIHBhdGgudHVybiA9IHR1cm47XHJcbiAgICAgICAgICAgICAgICBsZXQgbkJvYXJkMiA9IG5ld0JvYXJkKG5Cb2FyZClcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5CID0gbmV3Qm9hcmQobkJvYXJkMilcclxuICAgICAgICAgICAgICAgICAgICBwYXRoW2FycltpXV0gPSB7IGJvYXJkOiBuZXdCb2FyZChhaS5tYWtlTW92ZShhcnJbaV0sIHBhdGguYm9hcmQpKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgZXhwbG9yZShhaS5tYWtlTW92ZShhcnJbaV0sIG5CKSwgY2hhbmdlVHVybih0dXJuKSwgaW5jKGl0ZXJhdGlvbiksIHBhdGhbYXJyW2ldXSwgMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBleHBsb3JlKG5ld0JvYXJkKGJvYXJkKSwgdHVybiwgaW5jKGl0ZXJhdGlvbiksIG15T2JqLnN0YXJ0LCAwKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhteU9iailcclxuXHJcbiAgICAgICAgbGV0IHNjb3JlRXhwbG9yZSA9IGZ1bmN0aW9uIChiT2JqKSB7XHJcbiAgICAgICAgICAgIGJPYmouc2NvcmUgPSBhaS5zY29yZUJvYXJkKGJPYmouYm9hcmQsIGJPYmoudHVybilcclxuICAgICAgICAgICAgZm9yIChpdGVtIGluIGJPYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSBcInR1cm5cIiAmJiBpdGVtICE9PSBcInNjb3JlXCIgJiYgaXRlbSAhPT0gXCJib2FyZFwiICYmIGl0ZW0gIT09IFwibWV0YVwiICYmIGl0ZW0gIT09IFwicHJ1bmVEdW1wXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZUV4cGxvcmUoYk9ialtpdGVtXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZUV4cGxvcmUobXlPYmouc3RhcnQpXHJcblxyXG4gICAgICAgIGxldCBtZXRhRXhwbG9yZSA9IGZ1bmN0aW9uIChiT2JqKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRhQXJyID0gW11cclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGJPYmopLmxlbmd0aCA8IDUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiT2JqLnNjb3JlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjYW5QcnVuZU1ldGEgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGl0ZW0gaW4gYk9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IFwidHVyblwiICYmIGl0ZW0gIT09IFwic2NvcmVcIiAmJiBpdGVtICE9PSBcImJvYXJkXCIgJiYgaXRlbSAhPT0gXCJtZXRhXCIgJiYgaXRlbSAhPT0gXCJwcnVuZUR1bXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChiT2JqW2l0ZW1dLm1ldGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5QcnVuZU1ldGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhblBydW5lTWV0YSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYk9iaiA9IGFpLnBydW5lTWV0YShiT2JqKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGl0ZW0gaW4gYk9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IFwidHVyblwiICYmIGl0ZW0gIT09IFwic2NvcmVcIiAmJiBpdGVtICE9PSBcImJvYXJkXCIgJiYgaXRlbSAhPT0gXCJtZXRhXCIgJiYgaXRlbSAhPT0gXCJwcnVuZUR1bXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGFBcnIucHVzaChtZXRhRXhwbG9yZShiT2JqW2l0ZW1dKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWV0YUFyciA9IG1ldGFBcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWV0YUFycilcclxuXHJcbiAgICAgICAgICAgIGlmKHR1cm4gPT09IFwiQlwiKXtcclxuICAgICAgICAgICAgICAgIG1ldGFBcnIgPSBtZXRhQXJyLnNsaWNlKC0yKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWV0YUFyciA9IG1ldGFBcnIuc2xpY2UoMCwgMilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYobWV0YUFyclsxXSA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIG1ldGFBcnJbMV0gPSBtZXRhQXJyWzBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWV0YUFycilcclxuXHJcbiAgICAgICAgICAgIGlmKGJPYmoubWV0YSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgIGJPYmoubWV0YSA9ICgoYk9iai5tZXRhICsgKChtZXRhQXJyWzBdICsgbWV0YUFyclsxXSkgLyBtZXRhQXJyLmxlbmd0aCkpLzIpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiT2JqLm1ldGEgPSAoKG1ldGFBcnJbMF0gKyBtZXRhQXJyWzFdKSAvIG1ldGFBcnIubGVuZ3RoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiT2JqLm1ldGEpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYk9iai5tZXRhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgbWV0YUV4cGxvcmUobXlPYmouc3RhcnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAoaXRlbSBpbiBteU9iai5zdGFydCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAhPT0gXCJ0dXJuXCIgJiYgaXRlbSAhPT0gXCJzY29yZVwiICYmIGl0ZW0gIT09IFwiYm9hcmRcIiAmJiBpdGVtICE9PSBcIm1ldGFcIiAmJiBpdGVtICE9PSBcInBydW5lRHVtcFwiKSB7XHJcbiAgICAgICAgICAgICAgICBleHBsb3JlKG5ld0JvYXJkKG15T2JqLnN0YXJ0W2l0ZW1dLmJvYXJkKSwgY2hhbmdlVHVybih0dXJuKSwgaW5jKGl0ZXJhdGlvbiksIG15T2JqLnN0YXJ0W2l0ZW1dLCAyKVxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhteU9iailcclxuICAgICAgICAgICAgICAgIHNjb3JlRXhwbG9yZShteU9iai5zdGFydFtpdGVtXSlcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobXlPYmouc3RhcnRbaXRlbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhRXhwbG9yZShteU9iai5zdGFydFtpdGVtXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG15T2JqXHJcbiAgICB9LFxyXG5cclxuICAgIHNjb3JlQm9hcmQ6IGZ1bmN0aW9uIChib2FyZCwgdHVybikge1xyXG4gICAgICAgIGxldCBzY29yZSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB3b3J0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9kID0gMTtcclxuICAgICAgICAgICAgICAgIGxldCBwaWVjZSA9IGJvYXJkW2ldW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiQlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZCA9IC0xXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiYlwiKSB8fCBwaWVjZS5pbmNsdWRlcyhcIm5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB3b3J0aCA9IDNcclxuICAgICAgICAgICAgICAgICAgICBpZihwaWVjZS5pbmNsdWRlcyhcIldcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSArPSAoKChpLTYpKi0xKS8yMClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZSAtPSAoKGktMSkvMjApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICB3b3J0aCA9IDVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ydGggPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXduIHBvc2l0aW9uIHN0dWZmXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGllY2UuaW5jbHVkZXMoXCJXXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgKz0gKCgoaS02KSotMSkvMTApXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgLT0gKChpLTEpLzEwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJxXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd29ydGggPSA4XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcmUgPSBzY29yZSArICh3b3J0aCAqIG1vZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIgPSBhaS5nZXRMZWdhbE1vdmVzKGJvYXJkLCB0dXJuKVxyXG5cclxuICAgICAgICBpZiAoYWkuaXNJbkNoZWNrKGJvYXJkLCBcIldcIikpIHtcclxuICAgICAgICAgICAgc2NvcmUgLT0gMlxyXG4gICAgICAgICAgICBpZiAodHVybiA9PT0gXCJXXCIgJiYgYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmUgLT0gMTAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhaS5pc0luQ2hlY2soYm9hcmQsIFwiQlwiKSkge1xyXG4gICAgICAgICAgICBzY29yZSArPSAyXHJcbiAgICAgICAgICAgIGlmICh0dXJuID09PSBcIkJcIiAmJiBhcnIubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzY29yZSArPSAxMDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNjb3JlO1xyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFpIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcbnZhciBpbkNoZWNrID0gcmVxdWlyZShcIi4vaXNJbkNoZWNrXCIpXHJcblxyXG52YXIgY2FuQ2FzdGxlID0gZnVuY3Rpb24gKHR1cm4pIHtcclxuICAgIC8vY29uc29sZS5sb2coZGF0YS5ib2FyZCwgXCIhXCIpXHJcbiAgICBsZXQgYXJyID0gWzEsIDFdXHJcbiAgICBsZXQgaG9sZGVyID0gW11cclxuXHJcbiAgICBpZiAodHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICBpZiAoZGF0YS5ib2FyZFs3XVs0XSAhPT0gXCJXa1wiKSB7XHJcbiAgICAgICAgICAgIGFyciA9IFswLCAwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmhpc3RvcnkubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5pbmNsdWRlcyhcImtcIikpIHsgLy9sb29raW5nIGZvciBraW5nIG1vdmVzXHJcbiAgICAgICAgICAgICAgICBhcnIgPSBbMCwgMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5zbGljZSgyLCA0KSA9PT0gXCI3MFwiKSB7IC8vbG9va2luZyBmb3Igcm9vayBtb3Zlc1xyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLnNsaWNlKDIsIDQpID09PSBcIjc3XCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBkYXRhLmhpc3RvcnkubGVuZ3RoOyBpICs9IDIpIHsgIC8vbG9va2luZyBmb3IgY2hlY2tzXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCIhXCIpIHx8IGRhdGEuaGlzdG9yeVtpXS5pbmNsdWRlcyhcImNhc3RsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gWzAsIDBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpKyspIHsgLy9tYWtpbmcgc3VyZSB0aGUgc3BhY2UgaXMgZW1wdHlcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gZGF0YS5ib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuYm9hcmRbN11baV0gPSBcIldrXCJcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkNoZWNrKFwiV1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXVtrXSA9IGhvbGRlcltqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFs3XVtpXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclswXSA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gNTsgaSA8IDc7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbGRlcltqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGEuYm9hcmRbN11baV0gPSBcIldrXCJcclxuXHJcbiAgICAgICAgICAgIGlmIChpbkNoZWNrKFwiV1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdW2tdID0gaG9sZGVyW2pdW2tdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkWzddW2ldICE9PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGRhdGEuYm9hcmRbMF1bNF0gIT09IFwiQmtcIikge1xyXG4gICAgICAgICAgICBhcnIgPSBbMCwgMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGF0YS5oaXN0b3J5Lmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uaW5jbHVkZXMoXCJrXCIpIHx8IGRhdGEuaGlzdG9yeVtpXS5pbmNsdWRlcyhcImNhc3RsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gWzAsIDBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmhpc3RvcnlbaV0uc2xpY2UoMiwgNCkgPT09IFwiMDBcIikge1xyXG4gICAgICAgICAgICAgICAgYXJyWzBdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5oaXN0b3J5W2ldLnNsaWNlKDIsIDQpID09PSBcIjA3XCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmhpc3RvcnkubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtpXS5pbmNsdWRlcyhcIiFcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IFswLCAwXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaG9sZGVyW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbGRlcltqXVtrXSA9IGRhdGEuYm9hcmRbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGF0YS5ib2FyZFswXVtpXSA9IFwiQmtcIlxyXG5cclxuICAgICAgICAgICAgaWYgKGluQ2hlY2soXCJCXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmJvYXJkW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal1ba10gPSBob2xkZXJbal1ba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbMF1baV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMF0gPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDU7IGkgPCA3OyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBob2xkZXJbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdW2tdID0gZGF0YS5ib2FyZFtqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkYXRhLmJvYXJkWzBdW2ldID0gXCJCa1wiXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5DaGVjayhcIkJcIikpIHtcclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbal0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtqXVtrXSA9IGhvbGRlcltqXVtrXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFswXVtpXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGFyclsxXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNhbkNhc3RsZTsiLCJ2YXIgZGF0YSA9IHtcclxuICAgIGJvYXJkOiBbXHJcbiAgICAgICAgW1wiQnJcIiwgXCJCblwiLCBcIkJiXCIsIFwiQnFcIiwgXCJCa1wiLCBcIkJiXCIsIFwiQm5cIiwgXCJCclwiXSxcclxuICAgICAgICBbXCJCcFwiLCBcIkJwXCIsIFwiQnBcIiwgXCJCcFwiLCBcIkJwXCIsIFwiQnBcIiwgXCJCcFwiLCBcIkJwXCJdLFxyXG4gICAgICAgIFtcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsXSxcclxuICAgICAgICBbXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLF0sXHJcbiAgICAgICAgW1wiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIixdLFxyXG4gICAgICAgIFtcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsIFwiZVwiLCBcImVcIiwgXCJlXCIsXSxcclxuICAgICAgICBbXCJXcFwiLCBcIldwXCIsIFwiV3BcIiwgXCJXcFwiLCBcIldwXCIsIFwiV3BcIiwgXCJXcFwiLCBcIldwXCJdLFxyXG4gICAgICAgIFtcIldyXCIsIFwiV25cIiwgXCJXYlwiLCBcIldxXCIsIFwiV2tcIiwgXCJXYlwiLCBcIlduXCIsIFwiV3JcIl1cclxuICAgIF0sXHJcbiAgICB0dXJuOiBcIldcIixcclxuICAgIG9wcG9uZW50OiBcIkJcIixcclxuICAgIHR1cm5Td2l0Y2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYSA9IGRhdGEudHVybjtcclxuICAgICAgICBkYXRhLnR1cm4gPSBkYXRhLm9wcG9uZW50O1xyXG4gICAgICAgIGRhdGEub3Bwb25lbnQgPSBhO1xyXG4gICAgfSxcclxuICAgIGhpc3Rvcnk6IFtdLFxyXG4gICAgbGVnYWxNb3Zlczoge30sXHJcbiAgICBtb3ZlOiBmdW5jdGlvbiAobSwgZikge1xyXG4gICAgICAgIGxldCBwaWVjZSA9IG0uc2xpY2UoMCwgMik7XHJcbiAgICAgICAgbGV0IG9nUG9zaSA9IG0uc2xpY2UoMiwgMyk7XHJcbiAgICAgICAgbGV0IG9nUG9zaiA9IG0uc2xpY2UoMywgNCk7XHJcbiAgICAgICAgbGV0IG5ld1Bvc2kgPSBtLnNsaWNlKDQsIDUpO1xyXG4gICAgICAgIGxldCBuZXdQb3NqID0gbS5zbGljZSg1LCA2KTtcclxuICAgICAgICBsZXQgZCA9IGY7XHJcblxyXG4gICAgICAgIGRbbmV3UG9zaV1bbmV3UG9zal0gPSBwaWVjZTtcclxuICAgICAgICBkW29nUG9zaV1bb2dQb3NqXSA9IFwiZVwiO1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfSxcclxuICAgIGxlZ2FsTW92ZXNQdXNoOiBmdW5jdGlvbiAobW92ZSkge1xyXG4gICAgICAgIGxldCBib29sID0gdHJ1ZTtcclxuICAgICAgICBsZXQgeiA9IHt9O1xyXG4gICAgICAgIGxldCBwaWVjZSA9IG1vdmUuc2xpY2UoMCwgMilcclxuICAgICAgICBsZXQgc3RhcnQgPSBtb3ZlLnNsaWNlKDIsIDQpXHJcbiAgICAgICAgZm9yIChpdGVtIGluIGRhdGEubGVnYWxNb3Zlcykge1xyXG4gICAgICAgICAgICBpZiAoaXRlbSA9PT0gYCR7cGllY2UgKyBzdGFydH1gKSB7XHJcbiAgICAgICAgICAgICAgICBib29sID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvb2wgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1tgJHtwaWVjZSArIHN0YXJ0fWBdLnB1c2gobW92ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzW2Ake3BpZWNlICsgc3RhcnR9YF0gPSBbbW92ZV07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldExlZ2FsTW92ZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykgeyAgICAgICAgICAgICAgICAgIC8vcm93XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGllY2UgPSBkYXRhLmJvYXJkW2ldW2pdICAgICAgICAgICAgIC8vY29sdW1uXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqXS5pbmNsdWRlcyhkYXRhLnR1cm4pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcImtcIikpIHsgIC8va2luZyBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAtMTsgayA8PSAxOyBrKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGwgPSAtMTsgbCA8PSAxOyBsKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGxdICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGxdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGx9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGxdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsgbH1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwicFwiKSkgeyAgICAgICAgICAgICAgICAgICAgLy9wYXduIG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwiV1wiKSAmJiBkYXRhLnR1cm4gPT09IFwiV1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0gMV1bal0gPT09IFwiZVwiKSB7ICAgICAgICAgIC8vc2luZ2xlIG1vdmUgZm9yd2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSAxfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAyXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAyXVtqXSA9PT0gXCJlXCIgJiYgaSA9PT0gNikgeyAgLy9kb3VibGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0gMn0ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqIC0gMV0uaW5jbHVkZXMoXCJCXCIpKSB7ICAvL3Rha2UgdG8gdGhlIGxlZnQgV1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0gMX0ke2ogLSAxfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSAxXVtqICsgMV0uaW5jbHVkZXMoXCJCXCIpKSB7ICAvL3Rha2UgdG8gdGhlIHJpZ2h0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIDF9JHtqICsgMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGllY2UuaW5jbHVkZXMoXCJCXCIpICYmIGRhdGEudHVybiA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyAxXVtqXSA9PT0gXCJlXCIpIHsgICAgICAgICAgLy9zaW5nbGUgbW92ZSBmb3J3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDF9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIDJdW2pdID09PSBcImVcIiAmJiBpID09PSAxKSB7ICAvL2RvdWJsZSBtb3ZlIGZvcndhcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyAyfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgMV1baiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgMV1baiAtIDFdLmluY2x1ZGVzKFwiV1wiKSkgeyAgLy90YWtlIHRvIHRoZSBsZWZ0IFdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIDF9JHtqIC0gMX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgMV1baiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgMV1baiArIDFdLmluY2x1ZGVzKFwiV1wiKSkgeyAgLy90YWtlIHRvIHRoZSByaWdodCBXXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyAxfSR7aiArIDF9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwaWVjZS5pbmNsdWRlcyhcInJcIikpIHsgIC8vcm9vayBtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11bal0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11bal0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11bal0gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2pdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2p9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2xlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV1baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2ogKyBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aX0ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJuXCIpKSB7IC8va25pZ2h0IG1vdmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtuaWdodE1vdmUgPSBmdW5jdGlvbiAociwgYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIHJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsgcl1baiArIGNdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIHJdW2ogKyBjXSA9PT0gXCJlXCIgfHwgZGF0YS5ib2FyZFtpICsgcl1baiArIGNdLmluY2x1ZGVzKGAke2RhdGEub3Bwb25lbnR9YCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyByfSR7aiArIGN9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMiwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgyLCAtMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMiwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMiwgLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtuaWdodE1vdmUoMSwgMilcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgxLCAtMilcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMSwgMilcclxuICAgICAgICAgICAgICAgICAgICAgICAga25pZ2h0TW92ZSgtMSwgLTIpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGllY2UuaW5jbHVkZXMoXCJiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwIHJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11bal0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL2Rvd24gcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogKyBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqICsga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3VwIGxlZnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqIC0ga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiAtIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgODsgaysrKSB7ICAvL3JpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBpZWNlLmluY2x1ZGVzKFwicVwiKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2pdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy9kb3duXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11bal0uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7an1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vbGVmdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2ogLSBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqIC0ga10uaW5jbHVkZXMoZGF0YS5vcHBvbmVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2l9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vcmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqICsga10gPT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1baiArIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgKyBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSArIGtdW2ogKyBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biByaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiArIGtdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXSA9PT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gYCR7cGllY2V9JHtpfSR7an0ke2kgLSBrfSR7aiArIGt9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzUHVzaChtb3ZlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaSAtIGtdW2ogKyBrXS5pbmNsdWRlcyhkYXRhLm9wcG9uZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqICsga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCA4OyBrKyspIHsgIC8vZG93biBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgKyBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSArIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpICsga11baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpICsga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDg7IGsrKykgeyAgLy91cCBsZWZ0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2kgLSBrXVtqIC0ga10gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdID09PSBcImVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmUgPSBgJHtwaWVjZX0ke2l9JHtqfSR7aSAtIGt9JHtqIC0ga31gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXNQdXNoKG1vdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpIC0ga11baiAtIGtdLmluY2x1ZGVzKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZSA9IGAke3BpZWNlfSR7aX0ke2p9JHtpIC0ga30ke2ogLSBrfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlc1B1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSA4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkKVxyXG4gICAgICAgIHZhciBjYW5DYXN0bGUgPSByZXF1aXJlKFwiLi9jYW5DYXN0bGVcIilcclxuICAgICAgICBsZXQgYSA9IGNhbkNhc3RsZShkYXRhLnR1cm4pXHJcbiAgICAgICAgaWYgKGFbMF0gIT09IDAgfHwgYVsxXSB8fCAxKSB7XHJcbiAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEudHVybiA9PT0gXCJXXCIpIHtcclxuICAgICAgICAgICAgaWYgKGFbMF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJ3aGl0ZUNhc3RsZUxlZnRcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzLmNhc3RsZS5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFbMV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJ3aGl0ZUNhc3RsZVJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFbMF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJibGFja0Nhc3RsZUxlZnRcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzLmNhc3RsZS5wdXNoKG1vdmUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFbMV0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtb3ZlID0gXCJibGFja0Nhc3RsZVJpZ2h0XCJcclxuICAgICAgICAgICAgICAgIGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUucHVzaChtb3ZlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbW92ZUNoZWNrczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAoaXRlbSBpbiBkYXRhLmxlZ2FsTW92ZXMpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gIT09IFwiY2FzdGxlXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlZ2FsTW92ZXNbaXRlbV0ubGVuZ3RoOyBpKyspIHsgIC8vaXRlcmF0aW5nIHRocm91Z2ggZXZlcnkgbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBob2xkZXIgPSBbXVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9sZGVyW2pdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob2xkZXJbal1ba10gPSBkYXRhLmJvYXJkW2pdW2tdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhID0gZGF0YS5tb3ZlKGRhdGEubGVnYWxNb3Zlc1tpdGVtXVtpXSwgZGF0YS5ib2FyZClcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkID0gYTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnR1cm5Td2l0Y2goKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtpID0gXCJcIjsgIC8va2luZ3MgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICAgICBsZXQga2ogPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7Ly9maW5kIHRoZSBraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGwgPSAwOyBsIDwgODsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtrXVtsXSA9PT0gYCR7ZGF0YS5vcHBvbmVudH1rYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpID0ga1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtqID0gbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEub3Bwb25lbnQgPT09IFwiV1wiKSB7ICAvL2NoZWNraW5nIGZvciBwYXduc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogKyAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiArIDFdID09PSBgJHtkYXRhLnR1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogLSAxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiAtIDFdID09PSBgJHtkYXRhLnR1cm59cGApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gPT09IGAke2RhdGEudHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqIC0gMV0gPT09IGAke2RhdGEudHVybn1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJheSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGxpbmVDaGVjayhpbmMxLCBpbmMyKSB7ICAgLy9sb29rcyBpbiBldmVyeSBkaXJlY3Rpb24gZnJvbSB0aGUga2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBtID0gMTsgbSA8IDg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gIT09IFwiZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSA9PT0gYCR7ZGF0YS50dXJufWtgICYmIG0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiIVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbSA9IDg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG0gPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYSA9IC0xOyBhIDw9IDE7IGErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBiID0gLTE7IGIgPD0gMTsgYisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lQ2hlY2soYSwgYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5LmluY2x1ZGVzKFwiIVwiKSB8fCBhcnJheS5pbmNsdWRlcyhgJHtkYXRhLnR1cm59cWApKSB7IC8vY2hlY2sgZm9yIGtpbmdzIGFuZCBxdWVlbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIGRpYWdvbmFsc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke2RhdGEudHVybn1iYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAxOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgc3RyYWlnaHRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7ZGF0YS50dXJufXJgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBrbmlnaHRLaW5nQ2hlY2sgPSBmdW5jdGlvbiAobE1vdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBsTW92ZVswXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBsTW92ZVswXV1ba2ogKyBsTW92ZVsxXV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dID09PSBgJHtkYXRhLnR1cm59bmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IFtbMiwgMV0sIFsyLCAtMV0sIFstMiwgMV0sIFstMiwgLTFdLCBbMSwgMl0sIFsxLCAtMl0sIFstMSwgMl0sIFstMSwgLTJdXVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHEgPSAwOyBxIDwgeC5sZW5ndGg7IHErKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soeFtxXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmluYWxseSBmaW5pc2hlZCB3aXRoIGNoZWNraW5nXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZCA9IGhvbGRlcjtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnR1cm5Td2l0Y2goKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2sgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGV4ZWN1dGVNb3ZlOiB7XHJcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIChtb3ZlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibW92ZTpcIiwgbW92ZSlcclxuICAgICAgICAgICAgbGV0IHBhd25Qcm9tb3Rpb25DaGVjayA9IHJlcXVpcmUoXCIuL3Bhd25Qcm9tb3Rpb25DaGVja1wiKVxyXG4gICAgICAgICAgICBwYXduUHJvbW90aW9uQ2hlY2sucnVuKCk7XHJcbiAgICAgICAgICAgIHBhd25Qcm9tb3Rpb25DaGVjay5maW5pc2gobW92ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaW5pc2g6IGZ1bmN0aW9uIChtb3ZlKSB7XHJcbiAgICAgICAgICAgIGxldCBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAoaXRlbSBpbiBkYXRhLmxlZ2FsTW92ZXMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVnYWxNb3Zlc1tpdGVtXVtpXSA9PT0gbW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xlZ2FsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9JIGRvbid0IHRoaW5rIGFueSBvZiB0aGlzIGlzIG5lY2Nlc3NhcnlcclxuICAgICAgICAgICAgLypsZXQgZmFrZURhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICBsZXQga2kgPSBcIlwiXHJcbiAgICAgICAgICAgIGxldCBraiA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7Ly9maW5kIHRoZSBraW5nXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBsID0gMDsgayA8IDg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtpXVtqXSA9PT0gYCR7b3Bwb25lbnR9a2ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2kgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBraiA9IGo7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvcHBvbmVudCA9PT0gXCJXXCIpIHsgIC8vY2hlY2tpbmcgZm9yIHBhd25zXHJcbiAgICAgICAgICAgICAgICBpZiAoZmFrZURhdGEuYm9hcmRba2kgKyAxXVtraiArIDFdID09PSBgJHtvcHBvbmVudH1wYCB8fCBmYWtlRGF0YS5ib2FyZFtraSArIDFdW2sgLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFrZURhdGEuYm9hcmRba2kgLSAxXVtraiArIDFdID09PSBgJHtvcHBvbmVudH1wYCB8fCBmYWtlRGF0YS5ib2FyZFtraSAtIDFdW2sgLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGFycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGxpbmVDaGVjayhpbmMxLCBpbmMyKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBtID0gMTsgbSA8IDg7IG0rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWtlRGF0YS5ib2FyZFtpICsgaW5jMV1baiArIGluYzJdICE9PSBcImVcIiAmJiBmYWtlRGF0YS5ib2FyZFtpICsgaW5jMV1baiArIGluYzJdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZha2VEYXRhLmJvYXJkW2kgKyBpbmMxXVtqICsgaW5jMl0gPT09IG9wcG9uZW50ICsgXCJrXCIgJiYgbSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcIiFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGZha2VEYXRhLmJvYXJkW2kgKyBpbmMxXVtqICsgaW5jMl0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZha2VEYXRhLmJvYXJkW2kgKyBpbmMxXVtqICsgaW5jMl0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKFwiZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBhID0gLTE7IGEgPD0gMTsgYSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBiID0gLTE7IGIgPD0gMTsgYisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUNoZWNrKGEsIGIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFycmF5LmluY2x1ZGVzKFwiIVwiKSB8fCBhcnJheS5pbmNsdWRlcyhgJHt0dXJufXFgKSkgeyAvL2NoZWNrIGZvciBraW5ncyBhbmQgcXVlZW5zXHJcbiAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBkaWFnb25hbHNcclxuICAgICAgICAgICAgICAgIGlmIChhcnJheVtjXSA9PT0gYCR7dHVybn1iYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzTGVnYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDk7IGMgKz0gMikgeyAvL2NoZWNrIHN0cmFpZ2h0c1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHt0dXJufXJgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMZWdhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBrbmlnaHRLaW5nQ2hlY2sgPSBmdW5jdGlvbiAobE1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaXRlbSBpbiBsTW92ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmUuaXRlbVsxXV1ba2ogKyBsTW92ZS5pdGVtWzJdXSA9PT0gYCR7dHVybn1uYCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0xlZ2FsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygyLCAxKVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soMiwgLTEpXHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygtMiwgMSlcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKC0yLCAtMSlcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKDEsIDIpXHJcbiAgICAgICAgICAgIGtuaWdodEtpbmdDaGVjaygxLCAtMilcclxuICAgICAgICAgICAga25pZ2h0S2luZ0NoZWNrKC0xLCAyKVxyXG4gICAgICAgICAgICBrbmlnaHRLaW5nQ2hlY2soLTEsIC0yKSovXHJcblxyXG4gICAgICAgICAgICAvL2ZpbmFsbHkgZmluaXNoZWQgd2l0aCBjaGVja2luZ1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1vdmVcIiwgbW92ZSlcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0xlZ2FsID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbnZhbGlkIG1vdmVcIilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghbW92ZS5pbmNsdWRlcyhcIkNhc3RsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uaWQgPSBcImFpTW92ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJNYWtlIEFJIG1vdmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFpID0gcmVxdWlyZShcIi4vYWlcIilcclxuICAgICAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWkuZXhlY3V0ZShkYXRhLmJvYXJkLCBkYXRhLnR1cm4pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQoYnV0dG9uKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaWVjZSA9IG1vdmUuc2xpY2UoMCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9nUG9zaSA9IG1vdmUuc2xpY2UoMiwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9nUG9zaiA9IG1vdmUuc2xpY2UoMywgNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1Bvc2kgPSBtb3ZlLnNsaWNlKDQsIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdQb3NqID0gbW92ZS5zbGljZSg1LCA2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtuZXdQb3NpXVtuZXdQb3NqXSA9IHBpZWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbb2dQb3NpXVtvZ1Bvc2pdID0gXCJlXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUgPT09IFwid2hpdGVDYXN0bGVMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzBdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzJdID0gXCJXa1wiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVszXSA9IFwiV3JcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bNF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlID09PSBcIndoaXRlQ2FzdGxlUmlnaHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bNF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbN11bNV0gPSBcIldyXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzddWzZdID0gXCJXa1wiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFs3XVs3XSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUgPT09IFwiYmxhY2tDYXN0bGVMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzBdID0gXCJlXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzJdID0gXCJCa1wiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVszXSA9IFwiQnJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bNF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlID09PSBcImJsYWNrQ2FzdGxlUmlnaHRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bNF0gPSBcImVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuYm9hcmRbMF1bNV0gPSBcIkJyXCJcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLmJvYXJkWzBdWzZdID0gXCJCa1wiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5ib2FyZFswXVs3XSA9IFwiZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNJbkNoZWNrID0gcmVxdWlyZShcIi4vaXNJbkNoZWNrXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJbkNoZWNrKGRhdGEub3Bwb25lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5oaXN0b3J5LnB1c2goYCR7bW92ZX0hYClcclxuICAgICAgICAgICAgICAgICAgICBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcHBvbmVudCA9PT0gXCJCXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IFwiQmxhY2sgaXMgaW4gY2hlY2shXCJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJXaGl0ZSBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmFwcGVuZENoaWxkKHApO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5oaXN0b3J5LnB1c2gobW92ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS50dXJuU3dpdGNoKCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmxlZ2FsTW92ZXMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGRhdGEuZ2V0TGVnYWxNb3ZlcygpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZW1vdmVDaGVja3MoKTtcclxuICAgICAgICAgICAgICAgIGxldCBkb21QcmludGVyID0gcmVxdWlyZShcIi4vZG9tUHJpbnRlclwiKVxyXG4gICAgICAgICAgICAgICAgZG9tUHJpbnRlcigpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQaWVjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvYXJkIGFmdGVyIG1vdmU6IFwiLCBkYXRhLmJvYXJkKVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICAgICAgICAgIGZvciAoaXRlbSBpbiBkYXRhLmxlZ2FsTW92ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IGNvdW50ICsgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtkYXRhLmhpc3RvcnkubGVuZ3RoIC0gMV0uaW5jbHVkZXMoXCIhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIldcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIkNoZWNrbWF0ZSEgV2hpdGUgd2lucyFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIkNoZWNrbWF0ZSEgQmxhY2sgd2lucyFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAudGV4dENvbnRlbnQgPSBcIlRoZXJlIGlzIGEgZHJhd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZWxlY3RlZFBpZWNlOiBcIlwiXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGF0YTsiLCJ2YXIgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxudmFyIHNlbGVjdFBpZWNlID0gcmVxdWlyZShcIi4vc2VsZWN0UGllY2VcIilcclxudmFyIG1ha2VNb3ZlID0gcmVxdWlyZShcIi4vbWFrZU1vdmVcIilcclxuXHJcbnZhciBkb21QcmludGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBtYWtlTW92ZShlLnRhcmdldC5jbGFzc05hbWUsIGUudGFyZ2V0LmlkKVxyXG4gICAgICAgIG1ha2VNb3ZlKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NOYW1lLCBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlkKVxyXG4gICAgfSlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICByb3cuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBib3guaWQgPSBpLnRvU3RyaW5nKCkgKyBqLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGJveC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCBibGFja1wiO1xyXG4gICAgICAgICAgICBib3guc3R5bGUud2lkdGggPSBcIjc1cHhcIjtcclxuICAgICAgICAgICAgYm94LnN0eWxlLmhlaWdodCA9IFwiNzVweFwiO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgIGJveC5pZCA9IGRhdGEuYm9hcmRbaV1bal0gKyBpLnRvU3RyaW5nKCkgKyBqLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtpXVtqXS5pbmNsdWRlcyhkYXRhLnR1cm4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdFBpZWNlKGJveC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBpbWdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUud2lkdGggPSBcIjc1cHhcIjtcclxuICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5oZWlnaHQgPSBcIjc1cHhcIjtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dwLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xci5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV24ucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIldiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1diLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJXcVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9XcS5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiV2tcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV2sucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJwXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JwLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cci5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQm5cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQm4ucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmJvYXJkW2ldW2pdID09PSBcIkJiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdEaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JiLnBuZycpXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5ib2FyZFtpXVtqXSA9PT0gXCJCcVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nRGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9CcS5wbmcnKVwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuYm9hcmRbaV1bal0gPT09IFwiQmtcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ0Rpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQmsucG5nJylcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYm94LmFwcGVuZENoaWxkKGltZ0RpdilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGJveCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRcIikuYXBwZW5kQ2hpbGQocm93KVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRvbVByaW50ZXIiLCJ2YXIgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxuXHJcbnZhciBpc0luQ2hlY2sgPSBmdW5jdGlvbiAodHVybikge1xyXG4gICAgbGV0IG9wcG9uZW50ID0gXCJXXCJcclxuICAgIGlmICh0dXJuID09PSBcIldcIikge1xyXG4gICAgICAgIG9wcG9uZW50ID0gXCJCXCJcclxuICAgIH1cclxuXHJcbiAgICBjaGVjayA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBraSA9IFwiXCI7ICAvL2tpbmdzIHBvc2l0aW9uXHJcbiAgICBsZXQga2ogPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgayA9IDA7IGsgPCA4OyBrKyspIHsvL2ZpbmQgdGhlIGtpbmdcclxuICAgICAgICBmb3IgKGxldCBsID0gMDsgbCA8IDg7IGwrKykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtrXVtsXSA9PT0gYCR7dHVybn1rYCkge1xyXG4gICAgICAgICAgICAgICAga2kgPSBrXHJcbiAgICAgICAgICAgICAgICBraiA9IGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHR1cm4gPT09IFwiV1wiKSB7ICAvL2NoZWNraW5nIGZvciBwYXduc1xyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiArIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgLSAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpIC0gMV1ba2ogLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdW2tqICsgMV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiArIDFdID09PSBgJHtvcHBvbmVudH1wYCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyAxXVtraiAtIDFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgMV1ba2ogLSAxXSA9PT0gYCR7b3Bwb25lbnR9cGApIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXJyYXkgPSBbXTtcclxuICAgIGZ1bmN0aW9uIGxpbmVDaGVjayhpbmMxLCBpbmMyKSB7ICAgLy9sb29rcyBpbiBldmVyeSBkaXJlY3Rpb24gZnJvbSB0aGUga2luZ1xyXG4gICAgICAgIGZvciAobGV0IG0gPSAxOyBtIDwgODsgbSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgaW5jMSAqIG1dW2tqICsgaW5jMiAqIG1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSAhPT0gXCJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9hcmRba2kgKyBpbmMxICogbV1ba2ogKyBpbmMyICogbV0gPT09IGAke29wcG9uZW50fWtgICYmIG0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCIhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goZGF0YS5ib2FyZFtraSArIGluYzEgKiBtXVtraiArIGluYzIgKiBtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChcImVcIilcclxuICAgICAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFycmF5LnB1c2goXCJlXCIpXHJcbiAgICAgICAgICAgICAgICBtID0gODtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBhID0gLTE7IGEgPD0gMTsgYSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgYiA9IC0xOyBiIDw9IDE7IGIrKykge1xyXG4gICAgICAgICAgICBsaW5lQ2hlY2soYSwgYilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKFwia2luZyBsaW5lIGFycmF5OlwiLCBhcnJheSlcclxuXHJcblxyXG4gICAgaWYgKGFycmF5LmluY2x1ZGVzKFwiIVwiKSB8fCBhcnJheS5pbmNsdWRlcyhgJHtvcHBvbmVudH1xYCkpIHsgLy9jaGVjayBmb3Iga2luZ3MgYW5kIHF1ZWVuc1xyXG4gICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgOTsgYyArPSAyKSB7IC8vY2hlY2sgZGlhZ29uYWxzXHJcbiAgICAgICAgaWYgKGFycmF5W2NdID09PSBgJHtvcHBvbmVudH1iYCkge1xyXG4gICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgYyA9IDE7IGMgPCA5OyBjICs9IDIpIHsgLy9jaGVjayBzdHJhaWdodHNcclxuICAgICAgICBpZiAoYXJyYXlbY10gPT09IGAke29wcG9uZW50fXJgKSB7XHJcbiAgICAgICAgICAgIGNoZWNrID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIga25pZ2h0S2luZ0NoZWNrID0gZnVuY3Rpb24gKGxNb3ZlKSB7XHJcbiAgICAgICAgZm9yIChpdGVtIGluIGxNb3ZlKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvYXJkW2tpICsgbE1vdmVbMF1dW2tqICsgbE1vdmVbMV1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5ib2FyZFtraSArIGxNb3ZlWzBdXVtraiArIGxNb3ZlWzFdXSA9PT0gYCR7b3Bwb25lbnR9bmApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgeCA9IFtbMiwgMV0sIFsyLCAtMV0sIFstMiwgMV0sIFstMiwgLTFdLCBbMSwgMl0sIFsxLCAtMl0sIFstMSwgMl0sIFstMSwgLTJdXVxyXG5cclxuICAgIGZvciAobGV0IHEgPSAwOyBxIDwgeC5sZW5ndGg7IHErKykge1xyXG4gICAgICAgIGtuaWdodEtpbmdDaGVjayh4W3FdKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4gY2hlY2s7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaXNJbkNoZWNrOyIsIi8qXHJcbnx8IDcvMTAvMjAxOFxyXG58fCBDaGVzcyBQbGF5ZXJcclxufHxcclxuKi9cclxuXHJcblxyXG52YXIgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxudmFyIGRvbVByaW50ZXIgPSByZXF1aXJlKFwiLi9kb21QcmludGVyXCIpXHJcbnZhciBhaSA9IHJlcXVpcmUoXCIuL2FpXCIpXHJcblxyXG5cclxuXHJcbmRhdGEuZ2V0TGVnYWxNb3ZlcygpO1xyXG5kYXRhLnJlbW92ZUNoZWNrcygpO1xyXG5cclxuZG9tUHJpbnRlcigpO1xyXG5cclxuY29uc29sZS5sb2coXCJCb2FyZDpcIiwgZGF0YS5ib2FyZClcclxuY29uc29sZS5sb2coXCJMZWdhbCBtb3ZlczpcIiwgZGF0YS5sZWdhbE1vdmVzKVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhLmJvYXJkKVxyXG4gICAgY29uc29sZS5sb2coZGF0YS5sZWdhbE1vdmVzKVxyXG4gICAgY29uc29sZS5sb2coZGF0YS5oaXN0b3J5KVxyXG59KVxyXG5cclxubGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG5wLnRleHRDb250ZW50ID0gXCJXb3JraW5nLi4uXCJcclxucC5pZCA9IFwibXlQXCJcclxuXHJcbmxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbmJ1dHRvbi5pZCA9IFwiYWlNb3ZlXCJcclxuYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiXHJcbmJ1dHRvbi50ZXh0Q29udGVudCA9IFwiTWFrZSBBSSBtb3ZlXCJcclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQocClcclxuICAgIGFpLmV4ZWN1dGUoZGF0YS5ib2FyZCwgZGF0YS50dXJuKVxyXG59KVxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQoYnV0dG9uKVxyXG5cclxuXHJcblxyXG5cclxuIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcblxyXG52YXIgbWFrZU1vdmUgPSBmdW5jdGlvbihjbGFzc0xpc3QsIGlkKXtcclxuXHJcbiAgICBpZihjbGFzc0xpc3QgPT09IFwiYWN0aXZlXCIpe1xyXG4gICAgICAgIGlmKGRhdGEuc2VsZWN0ZWRQaWVjZS5pbmNsdWRlcyhcImtcIikgJiYgaWQgPT09IFwiNzZcIil7XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUuc3RhcnQoXCJ3aGl0ZUNhc3RsZVJpZ2h0XCIpXHJcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLnNlbGVjdGVkUGllY2UuaW5jbHVkZXMoXCJrXCIpICYmIGlkID09PSBcIjcyXCIpe1xyXG4gICAgICAgICAgICBkYXRhLmV4ZWN1dGVNb3ZlLnN0YXJ0KFwid2hpdGVDYXN0bGVMZWZ0XCIpXHJcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEuc2VsZWN0ZWRQaWVjZS5pbmNsdWRlcyhcImtcIikgJiYgaWQgPT09IFwiMDJcIil7XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUuc3RhcnQoXCJibGFja0Nhc3RsZUxlZnRcIilcclxuICAgICAgICB9IGVsc2UgaWYoZGF0YS5zZWxlY3RlZFBpZWNlLmluY2x1ZGVzKFwia1wiKSAmJiBpZCA9PT0gXCIwNlwiKXtcclxuICAgICAgICAgICAgZGF0YS5leGVjdXRlTW92ZS5zdGFydChcImJsYWNrQ2FzdGxlUmlnaHRcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZiA9IGlkO1xyXG4gICAgICAgICAgICBpZihpZC5sZW5ndGggPiAyKXtcclxuICAgICAgICAgICAgICAgIGYgPSBpZC5zbGljZSgyLDQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuZXhlY3V0ZU1vdmUuc3RhcnQoZGF0YS5zZWxlY3RlZFBpZWNlK2YpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1ha2VNb3ZlIiwibGV0IGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcbmxldCBwcm9tb3RlUGF3biA9IHJlcXVpcmUoXCIuL3Byb21vdGVQYXduXCIpXHJcblxyXG5sZXQgcGF3blByb21vdGlvbkNoZWNrID0ge1xyXG4gICAgcnVuOiBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZihkYXRhLnR1cm4gPT09IFwiQlwiKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmJvYXJkWzBdW2ldID09PSBcIldwXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhd25Qcm9tb3Rpb25DaGVjay5jb21wbGV0ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbW90ZVBhd24oWzAsIGldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA4OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5ib2FyZFs3XVtpXSA9PT0gXCJCcFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBwYXduUHJvbW90aW9uQ2hlY2suY29tcGxldGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHByb21vdGVQYXduKFs3LCBpXSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBmaW5pc2g6IGZ1bmN0aW9uKG1vdmUpe1xyXG4gICAgICAgIGlmKGRhdGEudHVybiA9PT0gXCJCXCIpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgODsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuYm9hcmRbMF1baV0gPT09IFwiV3BcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgODsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuYm9hcmRbN11baV0gPT09IFwiQnBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5leGVjdXRlTW92ZS5maW5pc2gobW92ZSk7XHJcbiAgICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBwYXduUHJvbW90aW9uQ2hlY2siLCJsZXQgZGF0YSA9IHJlcXVpcmUoXCIuL2RhdGFcIilcclxubGV0IGRvbVByaW50ZXIgPSByZXF1aXJlKFwiLi9kb21QcmludGVyXCIpXHJcblxyXG5sZXQgcHJvbW90ZVBhd24gPSBmdW5jdGlvbihwb3NBcnIpe1xyXG4gICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQgPT09IG51bGwpe1xyXG4gICAgICAgIGxldCBjb21wbGV0ZVByb21vdGlvbiA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIilcclxuICAgICAgICAgICAgaWYoZS50YXJnZXQuaWQuaW5jbHVkZXMoXCJxXCIpIHx8IGUudGFyZ2V0LmlkLmluY2x1ZGVzKFwiclwiKSB8fCBlLnRhcmdldC5pZC5pbmNsdWRlcyhcImtcIikgfHwgZS50YXJnZXQuaWQuaW5jbHVkZXMoXCJiXCIpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5pbm5lckhUTUwgPSBcIiBcIlxyXG4gICAgICAgICAgICAgICAgZGF0YS5ib2FyZFtwb3NBcnJbMF1dW3Bvc0FyclsxXV0gPSBgJHtkYXRhLm9wcG9uZW50fSR7ZS50YXJnZXQuaWR9YFxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpc0luQ2hlY2sgPSByZXF1aXJlKFwiLi9pc0luQ2hlY2tcIilcclxuICAgICAgICAgICAgICAgIGlmIChpc0luQ2hlY2soZGF0YS50dXJuKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJCbGFjayBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnlbZGF0YS5oaXN0b3J5Lmxlbmd0aCAtMV0gKz0gXCIhXCJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnRleHRDb250ZW50ID0gXCJXaGl0ZSBpcyBpbiBjaGVjayFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmhpc3RvcnlbZGF0YS5oaXN0b3J5Lmxlbmd0aCAtMV0gKz0gXCIhXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5sZWdhbE1vdmVzID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLmdldExlZ2FsTW92ZXMoKTtcclxuICAgICAgICAgICAgICAgIGRhdGEucmVtb3ZlQ2hlY2tzKCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tUHJpbnRlciA9IHJlcXVpcmUoXCIuL2RvbVByaW50ZXJcIilcclxuICAgICAgICAgICAgICAgIGRvbVByaW50ZXIoKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUGllY2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICAgICAgICAgIGZvciAoaXRlbSBpbiBkYXRhLmxlZ2FsTW92ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IGNvdW50ICsgZGF0YS5sZWdhbE1vdmVzW2l0ZW1dLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaGlzdG9yeVtkYXRhLmhpc3RvcnkubGVuZ3RoIC0gMV0uaW5jbHVkZXMoXCIhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wcG9uZW50ID09PSBcIkJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIkNoZWNrbWF0ZSEgV2hpdGUgd2lucyFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQgPSBcIkNoZWNrbWF0ZSEgQmxhY2sgd2lucyFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHAudGV4dENvbnRlbnQgPSBcIlRoZXJlIGlzIGEgZHJhd1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChwKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmV0dXJuQm94ID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgICAgICBib3guc3R5bGUud2lkdGggPSBcIjc1cHhcIlxyXG4gICAgICAgICAgICBib3guc3R5bGUuaGVpZ2h0ID0gXCI3NXB4XCJcclxuICAgICAgICAgICAgYm94LmlkID0gaWRcclxuICAgICAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjb21wbGV0ZVByb21vdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuIGJveFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga25pZ2h0Qm94ID0gcmV0dXJuQm94KFwiblwiKTtcclxuICAgICAgICBsZXQgYmlzaG9wQm94ID0gcmV0dXJuQm94KFwiYlwiKTtcclxuICAgICAgICBsZXQgcm9va0JveCA9IHJldHVybkJveChcInJcIik7XHJcbiAgICAgICAgbGV0IHF1ZWVuQm94ID0gcmV0dXJuQm94KFwicVwiKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm9cIikuYXBwZW5kQ2hpbGQoa25pZ2h0Qm94KVxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mb1wiKS5hcHBlbmRDaGlsZChiaXNob3BCb3gpXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmFwcGVuZENoaWxkKHJvb2tCb3gpXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpLmFwcGVuZENoaWxkKHF1ZWVuQm94KVxyXG4gICAgICAgIGlmKGRhdGEub3Bwb25lbnQgPT09IFwiV1wiKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Xbi5wbmcnKVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYlwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvV2IucG5nJylcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL1dyLnBuZycpXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9XcS5wbmcnKVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9Cbi5wbmcnKVwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYlwiKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWcvQmIucG5nJylcIlxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1nL0JyLnBuZycpXCJcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJxXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltZy9CcS5wbmcnKVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHByb21vdGVQYXduIiwidmFyIGRhdGEgPSByZXF1aXJlKFwiLi9kYXRhXCIpXHJcblxyXG52YXIgc2VsZWN0UGllY2UgPSBmdW5jdGlvbihpZCl7XHJcbiAgICBsZXQgYXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hY3RpdmVcIik7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBhcnJbaV0uY2xhc3NMaXN0ID0gXCIgXCJcclxuICAgIH1cclxuXHJcbiAgICBpZihkYXRhLmxlZ2FsTW92ZXNbaWRdICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGRhdGEuc2VsZWN0ZWRQaWVjZSA9IGlkO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlZ2FsTW92ZXNbaWRdLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG15aSA9IGRhdGEubGVnYWxNb3Zlc1tpZF1baV0uc2xpY2UoNCw1KTtcclxuICAgICAgICAgICAgbGV0IG15aiA9IGRhdGEubGVnYWxNb3Zlc1tpZF1baV0uc2xpY2UoNSw2KTtcclxuICAgICAgICAgICAgbGV0IGEgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZihkYXRhLmJvYXJkW215aV1bbXlqXSAhPT0gXCJlXCIpe1xyXG4gICAgICAgICAgICAgICAgYSA9IGRhdGEuYm9hcmRbbXlpXVtteWpdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGErbXlpK215aikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYoaWQuaW5jbHVkZXMoXCJrXCIpKXsgIC8vY2FzdGxlIHN0dWZmXHJcbiAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwdWxsaW5nQ2FzdGxlTW92ZXNcIilcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVnYWxNb3Zlcy5jYXN0bGUubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZVtpXSA9PT0gXCJ3aGl0ZUNhc3RsZUxlZnRcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCI3MlwiKS5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5sZWdhbE1vdmVzLmNhc3RsZVtpXSA9PT0gXCJ3aGl0ZUNhc3RsZVJpZ2h0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiNzZcIikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwiYmxhY2tDYXN0bGVMZWZ0XCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiMDJcIikuY2xhc3NOYW1lID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubGVnYWxNb3Zlcy5jYXN0bGVbaV0gPT09IFwiYmxhY2tDYXN0bGVSaWdodFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIjA2XCIpLmNsYXNzTmFtZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc2VsZWN0UGllY2U7Il19
