$(document).ready(function() {
    wasm_bindgen("./wasm_bg.wasm")
        .then(() => {
            let chess = new wasm_bindgen.ChessBoard();

            $("#loading").hide();

            let players_turn = true;

            var board = ChessBoard("board", {
                position: "start",
                pieceTheme: "vendor/chessboard.js/img/chesspieces/wikipedia/{piece}.png",
                draggable: true,
                onDragStart: () => {
                    if (!players_turn) {
                        return false;
                    }
                },
                onDrop: (from, to) => {
                    let move = chess.can_move(from, to);
                    if (move.illegal) {
                        if (move.check() != null) {
                            $("#board .square-" + move.check().toLowerCase()).addClass("highlight");
                            setTimeout(function() {
                                $("#board .square-" + move.check().toLowerCase()).removeClass("highlight");
                            }, 1000);
                        }
                        return "snapback";
                    }

                    players_turn = false;

                    if (move.checkmate) {
                        setTimeout(() => alert("You won!"), 1000);
                        return;
                    }

                    setTimeout(() => {
                        let positions = {};
                        let checkmate = chess.do_move((pos, square) => {
                            positions[pos.toLowerCase()] = square;
                        });

                        board.position(positions);

                        players_turn = true;

                        if (checkmate) {
                            setTimeout(() => alert("You lost!"), 1000);
                        }
                    }, 100);
                }
            });
        });
    });
