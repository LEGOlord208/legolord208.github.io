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
                onDragStart: function() {
                    if (!players_turn) {
                        return;
                    }
                },
                onDrop: function(from, to) {
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
                    setTimeout(function() {
                        players_turn = true;
                        let reply = chess.get_move();
                        if (!reply.success) {
                            return;
                        }

                        console.log(reply.from().toLowerCase() + "-" + reply.to().toLowerCase());
                        board.move(reply.from().toLowerCase() + "-" + reply.to().toLowerCase());
                    }, 100);
                }
            });
        });
    });
