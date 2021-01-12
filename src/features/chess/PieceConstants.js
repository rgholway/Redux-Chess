import {selectBox} from "./chessSlice"

export const rules = {
  WhitePawn: {
    movement: {
      firstMove: ["DOWN1", "DOWN2"],
      move: ["DOWN1"],
      attack: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN"],
    },
  },
  BlackPawn: {
    movement: {
      firstMove: ["UP1", "UP2"],
      move: ["UP1"],
      attack: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP"],
    },
  },
  Bishop: {
    movement: {
      move: [
        "DIAGONAL_RIGHT_DOWN",
        "DIAGONAL_LEFT_DOWN",
        "DIAGONAL_RIGHT_UP",
        "DIAGONAL_LEFT_UP"
      ],
      badMoves: {
        isRightWall: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP"],
        isLeftWall: ["DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP"],
        isBottomRow: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP"],
        isTopRow: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN"]
      }
    },
  },
  Knight: {
    movement: {
      move: [
        "DOWN17",
        "DOWN15",
        "DOWN6",
        "DOWN10",
        "UP17",
        "UP15",
        "UP6",
        "UP10",
      ],
      badMoves: {
        isLeftWall: [
            "UP15",
            "UP6",
            "DOWN10",
            "DOWN17"
        ],
        isRightWall: [
            "DOWN15",
            "DOWN6",
            "UP10",
            "UP17"
        ],
        isNextToRightWall: [
          "DOWN6",
          "UP10"
        ],
        isNextToLeftWall: [
          "UP6",
          "DOWN10"
        ]
      }
    },
  },
  Rook: {
    movement: {
      move: [["RIGHT1"], ["LEFT1"], ["UP1"], ["DOWN1"]],
      badMoves: {
        isRightWall: "RIGHT1",
        isLeftWall: "LEFT1",
        isBottomRow: "UP1",
        isTopRow: "DOWN1"
      }
    },
  },
  Queen: {
    movement: {
      move: [
        "RIGHT1",
        "LEFT1",
        "UP1",
        "DOWN1",
        "DIAGONAL_RIGHT_UP",
        "DIAGONAL_LEFT_UP",
        "DIAGONAL_RIGHT_DOWN",
        "DIAGONAL_LEFT_DOWN",
      ],
      badMoves: {
        isRightWall: ["RIGHT1", "DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP"],
        isLeftWall: ["LEFT1", "DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP"],
        isTopRow: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN", "DOWN1"],
        isBottomRow: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP", "UP1"]
      }
    },
  },
  King: {
    movement: {
      move: [
        "RIGHT1",
        "LEFT1",
        "UP1",
        "DOWN1",
        "DIAGONAL_RIGHT_UP",
        "DIAGONAL_LEFT_UP",
        "DIAGONAL_RIGHT_DOWN",
        "DIAGONAL_LEFT_DOWN",
      ],
      specialMoves: {
        queenSideCastle: "QueenSideCastle",
        kingSideCastle: "KingSideCastle",
      },
      attackedFrom: [
        "DOWN17",
        "DOWN15",
        "DOWN6",
        "DOWN10",
        "UP17",
        "UP15",
        "UP6",
        "UP10"
      ],
      badMoves: {
        isRightWall: ["RIGHT1", "DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP","DOWN15",
        "DOWN6",
        "UP10",
        "UP17" ],
        isLeftWall: ["LEFT1", "DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP", "UP15",
        "UP6",
        "DOWN10",
        "DOWN17"],
        isTopRow: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN", "DOWN1"],
        isBottomRow: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP", "UP1"],
        isNextToRightWall: [
          "DOWN6",
          "UP10"
        ],
        isNextToLeftWall: [
          "UP6",
          "DOWN10"
        ]
      },
    },
  },
};

const movement = {
  DOWN1: -8,
  DOWN2: -16,
  UP1: 8,
  UP2: 16,
  DOWN17: -17,
  DOWN15: -15,
  DOWN6: -6,
  DOWN10: -10,
  UP17: 17,
  UP15: 15,
  UP6: 6,
  UP10: 10,
  DIAGONAL_LEFT_DOWN: -9,
  DIAGONAL_RIGHT_DOWN: -7,
  DIAGONAL_LEFT_UP: +9,
  DIAGONAL_RIGHT_UP: +7,
  RIGHT1: +1,
  LEFT1: -1,
};

export const calculateCheck = (boxes, turn) => {
  let blackKing;
  let whiteKing;
  let sameTeam = []
  let otherTeam = []
  let walls = []
  boxes.map((box) => {
    if (box.piece.team === turn) {
      sameTeam.push(box.id);
    } else if (box.hasPiece && box.piece.team !== turn) {
      otherTeam.push(box.id);
    }
    if (box.isWall) {
      walls.push(box.id);
    }
    if (box?.piece?.className === 'WhiteKing') {
      whiteKing = box?.piece
    }

    if (box?.piece?.className === 'BlackKing') {
      blackKing = box?.piece
    }
  });
  const enemyKing = turn === 2 ? blackKing : whiteKing
  const attackingMoves = teamMoves(sameTeam, boxes)
  const moves = attackingMoves?.moves?.filter(move => move <= 63 && move >= 0)
  const pieceMoves = attackingMoves?.pieceMoves
  const defendingKing = checkDefendingKing(enemyKing, boxes, otherTeam)
  let piecesDefendingKingFromCheck = []
  let attackingPieces = []
  defendingKing?.forEach(piece => {
    pieceMoves?.forEach(move => {
      if (move?.potentialMoves?.includes(piece?.piece)) {
        if (!move?.piece?.isPawn && !move?.piece?.isHorse && !move?.piece?.isKing) {
          piecesDefendingKingFromCheck?.push(piece)
        }
      }
    })
  })
  pieceMoves?.forEach(move => {
    if (move?.potentialMoves?.includes(enemyKing?.id)) {
      attackingPieces?.push(move?.piece?.id)
    }
  })
  return {attackingPieces, piecesDefendingKingFromCheck}
}

const checkDefendingKing = (king, boxes, otherTeam) => {
  const square = king?.id
  const moves = [
    "RIGHT1",
    "LEFT1",
    "UP1",
    "DOWN1",
    "DIAGONAL_RIGHT_UP",
    "DIAGONAL_LEFT_UP",
    "DIAGONAL_RIGHT_DOWN",
    "DIAGONAL_LEFT_DOWN",
  ]
  let piecesDefendingKing = []
  for (var i = 0; i < moves.length; i++) {
    let possibleMovement = square;

    const move = moves[i];
    for (var j = 0; j < 7; j++) {
      possibleMovement += movement[move]
      if (possibleMovement > -1 && possibleMovement < 64) {
      }
      if (otherTeam?.includes(possibleMovement)) {

        // Select enemy piece and dont add if pawn/horse/king
        //Check horse seperately but change moves to horse moves only
        //THis will work

        //May need to investigate why extra pieces are being added to attack. Check King is true
          piecesDefendingKing?.push({piece: possibleMovement, move})
          break
      }
    }
  }
  return piecesDefendingKing
}


export const calculatePotentialMoves = (piece, boxes, isCheckingKing) => {
  let options = [];

  if (!piece) {
    return []
  }
  //Piece Movement
  const pieceRules = rules[piece.pieceName];
  const moves = pieceRules?.movement?.move;
  const badMoves = pieceRules?.movement?.badMoves;
  let filteredMoves = [...moves]

  //special Pieces
  let whiteKing = ''
  let blackKing = ''

  //Piece Position
  const isRightWall = (piece.id + 1) % 8 === 0;
  const isLeftWall = (piece.id) % 8 === 0 || piece.id === 0;
  const isNextToLeftWall = piece.id - 1 === 0 || (piece.id - 1) % 8 === 0;
  const isNextToRightWall = (piece.id + 2) % 8 === 0;
  const isBottomRow = piece.id > 55
  const isTopRow = piece.id < 8
  const isPieceOnWall = isRightWall || isLeftWall || isTopRow || isBottomRow

  //Board Logic
  let potentialMoves = [];
  let boardMoves = [];
  let otherPieces = [];
  let walls = [];
  let attackingPieces = [];
  boxes.map((box) => {
    if (box.piece.team === piece.team) {
      boardMoves.push(box.id);
    } else if (box.hasPiece) {
      otherPieces.push(box.id);
    }
    if (box?.piece?.isAttackingKing) {
      console.log(box)
      attackingPieces?.push(box?.id)
    }
    if (box.isWall) {
      walls.push(box.id);
    }
    if (box?.piece?.className === 'WhiteKing') {
      whiteKing = box?.piece
    }
    if (box?.piece?.className === 'BlackKing') {
      blackKing = box?.piece
    }
  });

  const enemyKing = piece.team === 2 ? blackKing : whiteKing
  filteredMoves = filterMoves(moves, badMoves, isRightWall, isLeftWall, isTopRow, isBottomRow)
  if (piece?.isProtectingKing) {
    return calculateProtectedMoves(boardMoves,  otherPieces, filteredMoves, piece, pieceRules)
  }

  if (piece.isPawn) {
    return potentialMoves = calculatePawn(piece, boardMoves, otherPieces, walls, isCheckingKing)
  }

  if (piece?.isKing ){
    filteredMoves = filterMoves(moves, badMoves, isRightWall, isLeftWall, isTopRow, isBottomRow, isNextToLeftWall, isNextToRightWall)
    return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, boxes, piece.team, isCheckingKing)
  }

  if (piece.isHorse) {
    filteredMoves = filterMoves(moves, badMoves, isRightWall, isLeftWall, isTopRow, isBottomRow, isNextToLeftWall, isNextToRightWall)
    return calculateHorse(piece.id, filteredMoves, boardMoves, otherPieces)
  }

    return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing)
  };

  const isWall = (square, walls) => {
    return walls.includes(square);
  };

  const calculateKing = (square, moves, sameTeam, otherTeam, walls, isPieceOnWall, boxes, team, isCheckingKing) => {
    let potentialMoves = []
    let allEnemyTeamMoves = []
    if (!isCheckingKing) {
      allEnemyTeamMoves = teamMoves(otherTeam, boxes)?.moves
    }
      for (var i = 0; i < moves.length; i++) {
        const move = moves[i];
        const possibleMovement = square + movement[move]
        if (!sameTeam.includes(possibleMovement)) {
          if (!allEnemyTeamMoves?.includes(possibleMovement)) {
              potentialMoves.push(possibleMovement)
            }
          }
        }
        return potentialMoves
      }

  const teamMoves = (team, boxes) => {
    let moves = []
    let pieceMoves = []
    team?.forEach(piece => {
      const selectedPiece = selectBox(boxes, piece)?.piece
        const calculatedPotentialMoves = calculatePotentialMoves(selectedPiece, boxes, true)
        pieceMoves = pieceMoves.concat({potentialMoves: calculatedPotentialMoves, piece: selectedPiece})
        moves = moves.concat(calculatedPotentialMoves)
    })
    return {moves, pieceMoves}
  }

  const filterMoves = (moves, badMoves, isRightWall, isLeftWall, isTopRow, isBottomRow, isNextToLeftWall, isNextToRightWall) => {
    let disallowedMoves = []
    if (isRightWall) {
      if (isTopRow) {
        disallowedMoves = badMoves?.isRightWall.concat(badMoves?.isTopRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      } else if (isBottomRow) {
        disallowedMoves = badMoves?.isRightWall.concat(badMoves?.isBottomRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      } else {
        const check = moves?.filter((move) => !badMoves?.isRightWall?.includes(move))
        return moves?.filter((move) => !badMoves?.isRightWall?.includes(move))
      }
    } else if (isLeftWall) {
      if (isTopRow) {
        disallowedMoves = badMoves?.isLeftWall.concat(badMoves?.isTopRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      } else if (isBottomRow) {
        disallowedMoves = badMoves?.isLeftWall.concat(badMoves?.isBottomRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      } else {
        return moves?.filter((move) => !badMoves?.isLeftWall?.includes(move))
      }
    } else if (isTopRow) {
      if (isNextToLeftWall) {
        disallowedMoves = badMoves?.isNextToLeftWall.concat(badMoves?.isTopRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      } else if (isNextToRightWall) {
        disallowedMoves = badMoves?.isNextToRightWall.concat(badMoves?.isTopRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      }
      return moves?.filter((move) => !badMoves?.isTopRow?.includes(move))
    } else if (isBottomRow) {
      if (isNextToLeftWall) {
        disallowedMoves = badMoves?.isNextToLeftWall.concat(badMoves?.isBottomRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      } else if (isNextToRightWall) {
        disallowedMoves = badMoves?.isNextToRightWall.concat(badMoves?.isBottomRow)
        return moves?.filter((move) => !disallowedMoves?.includes(move))
      }
      return moves?.filter((move) => !badMoves?.isBottomRow?.includes(move))
    } else if (isNextToLeftWall) {
      return moves?.filter((move) => !badMoves?.isNextToLeftWall?.includes(move))
    } else if (isNextToRightWall) {
      return moves?.filter((move) => !badMoves?.isNextToRightWall?.includes(move))
    } else {
      return moves
    }
  }

  const calculateProtectedMoves = (sameTeam,  otherPieces, move, piece, rules) => {
    const canMove = rules?.movement?.move?.includes(move[0]) || rules?.movement?.attack?.includes(move[0])
    console.log(move)
    let potentialMovement = [];
    const attackedFrom = piece?.isProtectingKing
    const square = piece?.id

    let possibleMovement = square
    let backwardsMovement = square
    console.log(movement[move])
    if (canMove) {
      for (var i = 0; i < 7; i++) {
        possibleMovement += movement[move[i]]
        backwardsMovement += movement[move[i]]
        console.log(possibleMovement)
        if (!sameTeam?.includes(possibleMovement)) {
          if (piece?.isHorse) {
            break
          }
          if (piece?.isPawn) {

            potentialMovement?.push(possibleMovement)
            break
          }
          if (otherPieces?.includes(possibleMovement)) {
            potentialMovement?.push(possibleMovement)
            break
          }

            potentialMovement?.push(possibleMovement)
        }

      else {
        if (!sameTeam?.includes(backwardsMovement)) {
          if (piece?.isHorse) {
            break
          }
          if (piece?.isPawn) {
            break
          }
          if (otherPieces?.includes(backwardsMovement)) {
            potentialMovement?.push(backwardsMovement)
            break
          }

            potentialMovement?.push(backwardsMovement)
        }
      }
    }
      return potentialMovement
  }

  }

  const calculatePiece = (square, moves, sameTeam, otherTeam, walls, isPieceOnWall, enemyKing, isCheckingKing ) => {
    let potentialMoves = []
    for (var i = 0; i < moves.length; i++) {
      let possibleMovement = square;
      const move = moves[i];
      const isDiagonal = move[0] === 'DIAGONAL_LEFT_UP' || move[0] === 'DIAGONAL_RIGHT_UP' || move[0] === 'DIAGONAL_LEFT_DOWN' || move[0] === 'DIAGONAL_RIGHT_DOWN'
      for (var j = 0; j < 7; j++) {
        possibleMovement += movement[move]
        if (!sameTeam.includes(possibleMovement)) {
          if (otherTeam.includes(possibleMovement)) {
            if (enemyKing?.id === possibleMovement && isCheckingKing) {
              potentialMoves.push(possibleMovement)
            } else {
              potentialMoves.push(possibleMovement)
              break
            }
          }
          if (!isPieceOnWall) {
            if (isWall(possibleMovement, walls)) {
              potentialMoves.push(possibleMovement)
              break
            }
          } else {
            if (otherTeam.includes(possibleMovement)) {
              if (enemyKing?.id === possibleMovement && isCheckingKing) {
                potentialMoves.push(possibleMovement)
              } else {
                potentialMoves.push(possibleMovement)
                break
              }
            }
            if (isDiagonal) {
              if (isWall(possibleMovement, walls)) {
                potentialMoves.push(possibleMovement)
                break
              }
            }
          }
          potentialMoves.push(possibleMovement)
        } else {
          break
        }
      }
    }
    return potentialMoves
  }

const calculatePawn = (piece, boardMoves, otherPieces, walls, isCheckingKing) => {
  let options = [];
  const pieceRules = rules[piece.pieceName];
  const firstMove = pieceRules?.movement?.firstMove;
  const attackMoves = pieceRules?.movement?.attack;
  const moves = pieceRules?.movement?.move;
  if (!piece?.hasMoved) {
    for (var i = 0; i < firstMove.length; i++) {
      const move = firstMove[i];
      if (
        !boardMoves.includes(piece.id + movement[move]) &&
        !otherPieces.includes(piece.id + movement[move])
      ) {
        options.push(piece.id + movement[move]);
      } else {
        break;
      }
    }
  }
  for (var i = 0; i < attackMoves.length; i++) {
    const attack = attackMoves[i];
    const move = moves[i];
    if (otherPieces.includes(piece.id + movement[attack]) || isCheckingKing) {
      if (!boardMoves.includes(piece.id + movement[move]) && !isCheckingKing) {
        options.push(piece.id + movement[move]);
      }
      options.push(piece.id + movement[attack]);
    } else if (
      !boardMoves.includes(piece.id + movement[move]) &&
      !otherPieces.includes(piece.id + movement[move])
    ) {
      options.push(piece.id + movement[move]);
    }
  }
  return options;
};

const calculateHorse = (square, moves, sameTeam, otherTeam) => {
    let options = []
  for (var i = 0; i < moves.length; i++) {
    const move = moves[i];
    const possibleMovement = square + movement[move];
    if (!sameTeam.includes(possibleMovement)) {
      options.push(possibleMovement);
    }
  }
  return options;
};
