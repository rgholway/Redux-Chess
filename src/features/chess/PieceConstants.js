import {selectBox} from "./chessSlice"

export const rules = {
  WhitePawn: {
    movement: {
      firstMove: ["DOWN1", "DOWN2"],
      move: ["DOWN1"],
      attack: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN"],
    },
  },
  WhiteBishop: {
    movement: {
      move: [
        ["DIAGONAL_RIGHT_DOWN"],
        ["DIAGONAL_LEFT_DOWN"],
        ["DIAGONAL_RIGHT_UP"],
        ["DIAGONAL_LEFT_UP"],
      ],
      badMoves: {
        isRightWall: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP"],
        isLeftWall: ["DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP"],
        isBottomRow: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP"],
        isTopRow: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN"]
      }
      // const movement = {
      //   DOWN1: -8,
      //   DOWN2: -16,
      //   UP1: 8,
      //   UP2: 16,
      //   DOWN17: -17,
      //   DOWN15: -15,
      //   DOWN6: -6,
      //   DOWN10: -10,
      //   UP17: 17,
      //   UP15: 15,
      //   UP6: 6,
      //   UP10: 10,
      //   DIAGONAL_LEFT_DOWN: -9,
      //   DIAGONAL_RIGHT_DOWN: -7,
      //   DIAGONAL_LEFT_UP: +9,
      //   DIAGONAL_RIGHT_UP: +7,
      //   RIGHT1: +1,
      //   LEFT1: -1,
    },
  },
  BlackBishop: {
    movement: {
      move: [
        ["DIAGONAL_RIGHT_UP"],
        ["DIAGONAL_LEFT_UP"],
        ["DIAGONAL_RIGHT_DOWN"],
        ["DIAGONAL_LEFT_DOWN"],
      ],
      badMoves: {
        isRightWall: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP"],
        isLeftWall: ["DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP"],
        isBottomRow: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP"],
        isTopRow: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN"]
      }
    },
  },
  BlackPawn: {
    movement: {
      firstMove: ["UP1", "UP2"],
      move: ["UP1"],
      attack: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP"],
    },
  },
  WhiteKnight: {
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
  // DOWN17: -17,
  // DOWN15: -15,
  // DOWN6: -6,
  // DOWN10: -10,
  // UP17: 17,
  // UP15: 15,
  // UP6: 6,
  // UP10: 10,
  BlackKnight: {
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
  BlackRook: {
    movement: {
      move: [["RIGHT1"], ["LEFT1"], ["UP1"], ["DOWN1"]],
      badMoves: {
        isRightWall: ["RIGHT1"],
        isLeftWall: ["LEFT1"],
        isBottomRow: ["UP1"],
        isTopRow: ["DOWN1"]
      }
    },
  },
  WhiteRook: {
    movement: {
      move: [["RIGHT1"], ["LEFT1"], ["UP1"], ["DOWN1"]],
      badMoves: {
        isRightWall: ["RIGHT1"],
        isLeftWall: ["LEFT1"],
        isBottomRow: ["UP1"],
        isTopRow: ["DOWN1"]
      }
    },
  },
  WhiteQueen: {
    movement: {
      move: [
        ["RIGHT1"],
        ["LEFT1"],
        ["UP1"],
        ["DOWN1"],
        ["DIAGONAL_RIGHT_UP"],
        ["DIAGONAL_LEFT_UP"],
        ["DIAGONAL_RIGHT_DOWN"],
        ["DIAGONAL_LEFT_DOWN"],
      ],
      badMoves: {
        isRightWall: ["RIGHT1", "DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP"],
        isLeftWall: ["LEFT1", "DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP"],
        isTopRow: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN", "DOWN1"],
        isBottomRow: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP", "UP1"]
      }
    },
  },
  BlackQueen: {
    movement: {
      move: [
        ["RIGHT1"],
        ["LEFT1"],
        ["UP1"],
        ["DOWN1"],
        ["DIAGONAL_RIGHT_UP"],
        ["DIAGONAL_LEFT_UP"],
        ["DIAGONAL_RIGHT_DOWN"],
        ["DIAGONAL_LEFT_DOWN"],
      ],
      badMoves: {
        isRightWall: ["RIGHT1", "DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP"],
        isLeftWall: ["LEFT1", "DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP"],
        isTopRow: ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_DOWN", "DOWN1"],
        isBottomRow: ["DIAGONAL_RIGHT_UP", "DIAGONAL_LEFT_UP", "UP1"]
      }
    },
  },
  WhiteKing: {
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
  BlackKing: {
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


export const calculatePotentialMoves = (piece, boxes, isCheckingKing) => {
  let options = [];

  if (!piece) {
    return []
  }
  //Piece Movement
  const pieceRules = rules[piece.pieceName];
  const moves = pieceRules?.movement?.move;
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

  //Board Logic
  let potentialMoves = [];
  let boardMoves = [];
  let otherPieces = [];
  let walls = [];
  let isPieceOnWall = false
  let isDiagonal = false

  boxes.map((box) => {
    if (box.piece.team === piece.team) {
      boardMoves.push(box.id);
    } else if (box.hasPiece && box.piece.team !== piece.team) {
      otherPieces.push(box.id);
    }
    if (box.isWall) {
      walls.push(box.id);
    }
    if (box?.piece?.pieceName === 'WhiteKing') {
      whiteKing = box?.piece
    }

    if (box?.piece?.pieceName === 'BlackKing') {
      blackKing = box?.piece
    }

  });

  const enemyKing = piece.team === 2 ? blackKing : whiteKing

  if (piece.isPawn) {
    return potentialMoves = calculatePawn(piece, boardMoves, otherPieces, walls, isCheckingKing)
  }

  if (piece?.isKing ){
    isDiagonal = false

    if (isRightWall) {
      isPieceOnWall = true
      if (isTopRow) {
        const badMoves = pieceRules?.movement?.badMoves?.isRightWall.concat(pieceRules?.movement?.badMoves?.isTopRow)
        filteredMoves = moves.filter((move) => !badMoves?.includes(move));
        return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, false)
      }
      if (isBottomRow) {
        const badMoves = pieceRules?.movement?.badMoves?.isRightWall.concat(pieceRules?.movement?.badMoves?.isBottomRow)
        filteredMoves = moves.filter((move) => !badMoves?.includes(move));
        return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
      }
      const badMoves = pieceRules?.movement?.badMoves?.isRightWall
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
    }
    if (isLeftWall) {
      isPieceOnWall = true
      if (isTopRow) {
        const badMoves = pieceRules?.movement?.badMoves?.isLeftWall.concat(pieceRules?.movement?.badMoves?.isTopRow)
        filteredMoves = moves.filter((move) => !badMoves?.includes(move));
        return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
      }
      if (isBottomRow) {
        const badMoves = pieceRules?.movement?.badMoves?.isLeftWall.concat(pieceRules?.movement?.badMoves?.isBottomRow)
        filteredMoves = moves.filter((move) => !badMoves?.includes(move));
        return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
      }
      const badMoves = pieceRules?.movement?.badMoves?.isLeftWall
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
    }
    if (isTopRow) {
      const badMoves = pieceRules?.movement?.badMoves?.isTopRow
      isPieceOnWall = true
      if (badMoves?.includes('DIAGONAL_LEFT_DOWN') || badMoves?.includes('DIAGONAL_RIGHT_DOWN')) {
        isDiagonal = true
      }
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
    }
    if (isBottomRow) {
      isPieceOnWall = true
      const badMoves = pieceRules?.movement?.badMoves?.isBottomRow
      if (badMoves?.includes('DIAGONAL_LEFT_UP') || badMoves?.includes('DIAGONAL_RIGHT_UP')) {
        isDiagonal = true
      }
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
    }
    return calculateKing(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, isDiagonal, boxes, piece.team, isCheckingKing)
  }

  if (piece.isHorse) {
    if (isRightWall) {
      const badMoves = pieceRules?.movement?.badMoves?.isRightWall
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateHorse(piece.id, filteredMoves, boardMoves, otherPieces)
    }

    if (isLeftWall) {
      const badMoves = pieceRules?.movement?.badMoves?.isLeftWall
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateHorse(piece.id, filteredMoves, boardMoves, otherPieces)
    }

    if (isNextToRightWall) {
      const badMoves = pieceRules?.movement?.badMoves?.isNextToRightWall
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateHorse(piece.id, filteredMoves, boardMoves, otherPieces)
    }

    if (isNextToLeftWall) {
      const badMoves = pieceRules?.movement?.badMoves?.isNextToLeftWall
      filteredMoves = moves.filter((move) => !badMoves?.includes(move));
      return calculateHorse(piece.id, filteredMoves, boardMoves, otherPieces)
    }
    return calculateHorse(piece.id, filteredMoves, boardMoves, otherPieces)
  }
  if (isLeftWall) {
    let isPieceOnWall = true
    if (isTopRow) {
      const badMoves = pieceRules?.movement?.badMoves?.isLeftWall.concat(pieceRules?.movement?.badMoves?.isTopRow)
      filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
      return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing)
    }
    else if (isBottomRow) {
      const badMoves = pieceRules?.movement?.badMoves?.isLeftWall.concat(pieceRules?.movement?.badMoves?.isBottomRow)
      filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
      return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing)
    }
    const badMoves = pieceRules?.movement?.badMoves?.isLeftWall
    filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
    return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing)
  }
  if (isRightWall) {
    let isPieceOnWall = true
    if (isTopRow) {
      const badMoves = pieceRules?.movement?.badMoves?.isRightWall.concat(pieceRules?.movement?.badMoves?.isTopRow)
      filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
      return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall,  enemyKing, isCheckingKing)
    }
    if (isBottomRow) {
      const badMoves = pieceRules?.movement?.badMoves?.isRightWall.concat(pieceRules?.movement?.badMoves?.isBottomRow)
      filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
      return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing)
    }
    const badMoves = pieceRules?.movement?.badMoves?.isRightWall
    filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
    return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall,  enemyKing, isCheckingKing)
  }
  if (isTopRow) {
    const badMoves = pieceRules?.movement?.badMoves?.isTopRow
    if (badMoves?.includes('DIAGONAL_LEFT_DOWN') || badMoves?.includes('DIAGONAL_RIGHT_DOWN')) {
      isDiagonal = true
    }
    let isPieceOnWall = true
    filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
    return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing,isDiagonal)
  }
  if (isBottomRow) {
    const badMoves = pieceRules?.movement?.badMoves?.isBottomRow
    if (badMoves?.includes('DIAGONAL_LEFT_UP') || badMoves?.includes('DIAGONAL_RIGHT_UP')) {
      isDiagonal = true
    }
    let isPieceOnWall = true
    filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
    return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing, isDiagonal)
  }
  return calculatePiece(piece.id, filteredMoves, boardMoves, otherPieces, walls, isPieceOnWall, enemyKing, isCheckingKing)
  };

  const isWall = (square, walls) => {
    return walls.includes(square);
  };

  const calculateKing = (square, moves, sameTeam, otherTeam, walls, isPieceOnWall, isDiagonal, boxes, team, isCheckingKing) => {
    let potentialMoves = []
    let allEnemyTeamMoves = []
    if (!isCheckingKing) {
      allEnemyTeamMoves = enemyTeamMoves(square, otherTeam, boxes)
    }
      for (var i = 0; i < moves.length; i++) {
        const move = moves[i];
        const possibleMovement = square + movement[move]
        console.log(possibleMovement)
        if (!sameTeam.includes(possibleMovement)) {
          if (!allEnemyTeamMoves?.includes(possibleMovement)) {
              potentialMoves.push(possibleMovement)
            }
          }
        }
        console.log(potentialMoves)
        return potentialMoves
      }

  const enemyTeamMoves = (square, otherTeam, boxes) => {
    let forbiddenMoves = []
    let attackedFrom = square
    otherTeam?.forEach(enemyPiece => {
      const piece = selectBox(boxes, enemyPiece)?.piece
        const calculatedPotentialMoves = calculatePotentialMoves(piece, boxes, true)
        forbiddenMoves = forbiddenMoves.concat(calculatedPotentialMoves)
    })
    return forbiddenMoves
  }



    // for (var j = 0; j < 7; j++) {
    //   attackedFrom += movement[move]
    //   if (!sameTeam.includes(possibleMovement)) {
    //     if (!enemyKing) {
    //       if (isWall(possibleMovement, walls)) {
    //         break
    //       }
    //       if (enemyQueen) {
    //         const forbiddenQueenMoves = calculatePotentialMoves(enemyQueen, boxes)
    //         console.log(forbiddenQueenMoves)
    //         if (forbiddenQueenMoves?.includes(possibleMovement)) {
    //           return true
    //           break
    //         } else {
    //           return false
    //           break
    //         }
    //
    //       }
    //       if (otherTeam.includes(attackedFrom)) {
    //         const enemyPiece = selectBox(boxes, attackedFrom)?.piece
    //         const enemyMoves = calculatePotentialMoves(enemyPiece, boxes)
    //         if (enemyMoves?.includes(possibleMovement)) {
    //           forbiddenMoves?.push(possibleMovement)
    //           return true
    //           break
    //         } else {
    //           return false
    //           break
    //         }
    //         break
    //       }
    //     } else {
    //       if (enemyQueen) {
    //         const forbiddenQueenMoves = calculatePotentialMoves(enemyQueen, boxes)
    //         console.log(forbiddenQueenMoves)
    //         if (forbiddenQueenMoves?.includes(possibleMovement)) {
    //           return true
    //           break
    //         } else {
    //           return false
    //           break
    //         }
    //       }
    //       const checkForPawnMoves = {}
    //       if (otherTeam.includes(attackedFrom)) {
    //         console.log('what')
    //         const enemyPiece = selectBox(boxes, attackedFrom)?.piece
    //         const forbiddenMoves = calculatePotentialMoves(enemyPiece, boxes)
    //         console.log('forbiddenMoves')
    //         if (forbiddenMoves?.includes(possibleMovement)) {
    //           forbiddenMoves?.push(possibleMovement)
    //           return true
    //           break
    //         } else {
    //           return false
    //           break
    //         }
    //       }
    //       if (isDiagonal) {
    //         if (isWall(possibleMovement, walls)) {
    //           break
    //         }
    //       }
    //     }
    //   } else {
    //     return false
    //   }
    // }

  const calculatePiece = (square, moves, sameTeam, otherTeam, walls, isPieceOnWall, enemyKing, isCheckingKing, isDiagonal ) => {
    let potentialMoves = []

    for (var i = 0; i < moves.length; i++) {
      let possibleMovement = square;
      const move = moves[i];
      for (var j = 0; j < 7; j++) {
        possibleMovement += movement[move]
        console.log(enemyKing.id, possibleMovement, isCheckingKing)
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
  console.log(isCheckingKing)
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

const calculateRook = (
  piece,
  board,
  boardMoves,
  otherPieces,
  walls,
  isBottomOrTopRow
) => {
  let options = [];
  const pieceRules = rules[piece.pieceName];
  const moves = pieceRules?.movement?.move;

  const isRightWall = (piece.id + 1) % 8 === 0;
  const isLeftWall = (piece.id) % 8 === 0 || piece.id === 0;
  const isSideWall = isRightWall || isLeftWall;
  const pieceIsOnWall = isSideWall || isBottomOrTopRow;
  const isCorner = isSideWall && isBottomOrTopRow
  let filteredMoves = [...moves];
  for (var i = 0; i < moves.length; i++) {
    let possibleMovement = piece.id;
    const move = moves[i];
    for (var j = 0; j < 7; j++) {
      possibleMovement += movement[move];
      // console.log(possibleMovement, isWall(possibleMovement))
      if (!boardMoves.includes(possibleMovement)) {
        if (otherPieces.includes(possibleMovement)) {
          options.push(possibleMovement);
          break;
        }
        if (pieceIsOnWall) {
          if (isCorner) {
            if (!isWall(possibleMovement)) {
              break
            } else {
              options.push(possibleMovement)
            }
          }
          if (isBottomOrTopRow && !isCorner) {
            if (possibleMovement > 55 || (possibleMovement < 8 && piece.id < 7) && move !== 'DOWN1' || move !== 'UP1') {
            options.push(possibleMovement)
          } else {
            break
          }
        }

        if (isSideWall && !isCorner) {
          if (move[0] === 'RIGHT1' || move[0] === 'LEFT1') {
            if (pieceIsOnWall && possibleMovement !== piece.id + movement[move]) {
              options.push(possibleMovement)
            }
            if (!isWall(possibleMovement)) {
              options.push(possibleMovement)
            } else {
              break
            }
          } else {
            options.push(possibleMovement)
          }
        }
        } else {
        if (!isWall(possibleMovement)) {
          options.push(possibleMovement)
        } else {
          options.push(possibleMovement)
          break
        }
      }
      } else {
        break;
      }
    }
  }
  return options;
};

const calculateBishop = (piece, board, boardMoves, otherPieces, walls, isBottomOrTopRow) => {
  const pieceRules = rules[piece.pieceName];
  const moves = pieceRules?.movement?.move;
  let options = [];
  const isWall = (piece) => {
    return walls.includes(piece);
  }
  const isRightWall = (piece.id + 1) % 8 === 0;
  const isLeftWall = (piece.id) % 8 === 0 || piece.id === 0;
  const isSideWall = isRightWall || isLeftWall;
  const pieceIsOnWall = isSideWall || isBottomOrTopRow;
  let filteredMoves = [...moves]
  // DIAGONAL_LEFT_DOWN: -9,
  // DIAGONAL_RIGHT_DOWN: -7,
  // DIAGONAL_LEFT_UP: +9,
  // DIAGONAL_RIGHT_UP: +7,
  if (isRightWall) {
    const badMoves = ["DIAGONAL_RIGHT_DOWN", "DIAGONAL_LEFT_UP"];
    filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
  }

  if (isLeftWall) {
    const badMoves = ["DIAGONAL_LEFT_DOWN", "DIAGONAL_RIGHT_UP"];
    filteredMoves = moves.filter((move) => !badMoves?.includes(move[0]));
  }
  for (var i = 0; i < moves.length; i++) {
    let possibleMovement = piece.id;
    const move = filteredMoves[i];
    for (var j = 0; j < 7; j++) {
      possibleMovement += movement[move];
      if (!boardMoves.includes(possibleMovement)) {
        if (otherPieces.includes(possibleMovement)) {
        options.push(possibleMovement)
        break
        }
        if (isWall(possibleMovement)) {
          options.push(possibleMovement)
          break
        }
        options.push(possibleMovement)
      } else {
        break
      }

    }
  }
  return options
}

//           if (isWall(possibleMovement) && isWall(possibleMovement - movement[move])) {
//             if (isRook && (move?.[0] === 'UP1' || move?.[0] === 'DOWN1')) {
//               options.push(possibleMovement)
//             } else {
//               break
//           }
//           } else if (isWall(possibleMovement) && !isRook) {
//               options.push(possibleMovement);
//               break
//           }
//           options.push(possibleMovement);
//         } else {
//           break
//         }
//       }
//     }
//
// }

// const calculateQueen = (piece, board, boardMoves, otherPieces, walls, isBottomOrTopRow) => {
//   let options = []
//   const bishop = {id: piece.id, pieceName: 'WhiteBishop'}
//   const rook = {id: piece.id, pieceName: 'BlackRook'}
//   const rookPieces = calculateRook(rook, board, boardMoves, otherPieces, walls, isBottomOrTopRow)
//   const bishopPieces = calculateBishop(bishop, board, boardMoves, otherPieces, walls, isBottomOrTopRow)
//   console.log(calculateRook(piece, board, boardMoves, otherPieces, walls, isBottomOrTopRow))
//   console.log(calculateBishop(piece, board, boardMoves, otherPieces, walls, isBottomOrTopRow))
//   return rookPieces.concat(bishopPieces)
// }


  // switch (pieceName) {
  //   case "WhitePawn":
  //     return (potentialMoves = calculatePawn(
  //       piece,
  //       board,
  //       boardMoves,
  //       otherPieces,
  //       walls
  //     ));
  //   case "BlackPawn":
  //     return calculatePawn(piece, board, boardMoves, otherPieces, walls);
  //   case "BlackKnight":
  //     return calculateHorse(piece, board, boardMoves, otherPieces, walls);
  //   case "WhiteKnight":
  //     return calculateHorse(piece, board, boardMoves, otherPieces, walls);
  //   case "BlackRook":
  //     return calculateRook(
  //       piece,
  //       board,
  //       boardMoves,
  //       otherPieces,
  //       walls,
  //       isBottomOrTopRow
  //     );
  //   case "WhiteRook":
  //     return calculateRook(
  //       piece,
  //       board,
  //       boardMoves,
  //       otherPieces,
  //       walls,
  //       isBottomOrTopRow
  //     );
  //   case "WhiteQueen":
  //     return calculateQueen(
  //       piece,
  //       board,
  //       boardMoves,
  //       otherPieces,
  //       walls,
  //       isBottomOrTopRow
  //     );
  //   case "BlackQueen":
  //     return calculateQueen(
  //       piece,
  //       board,
  //       boardMoves,
  //       otherPieces,
  //       walls,
  //       isBottomOrTopRow
  //     );
  //     case "BlackBishop":
  //       return calculateBishop(
  //         piece,
  //         board,
  //         boardMoves,
  //         otherPieces,
  //         walls,
  //         isBottomOrTopRow
  //       );
  //       case "WhiteBishop":
  //         return calculateBishop(
  //           piece,
  //           board,
  //           boardMoves,
  //           otherPieces,
  //           walls,
  //           isBottomOrTopRow
  //         );
  //   default:
  //     return [];
  // }

// let boardMoves = [];
// let otherPieces = [];
// let walls = [];
// board.boxes.map((box) => {
//   if (box.piece.team === piece.team) {
//     boardMoves.push(box.id);
//   } else if (box.hasPiece && box.piece.team !== piece.team) {
//     otherPieces.push(box.id);
//   }
//   if (box.isWall) {
//     walls.push(box.id);
//   }
// });
//
// const isSameTeam = (piece) => {
//   return boardMoves?.includes(piece)
// }
//
// const isOtherTeam = (piece) => {
//   return otherPieces?.includes(piece)
// }
//
// const isWall = (piece) => {
//   return walls?.includes(piece)
// }
//
// let options = [];
// const pieceRules = rules[piece.pieceName];
// const firstMove = pieceRules?.movement?.firstMove;
// const attackMoves = pieceRules?.movement?.attack;
// const moves = pieceRules?.movement?.move
// const isRook = piece.pieceName === 'WhiteRook' || piece.pieceName === 'BlackRook'
//
//     const attackLength = attackMoves?.length;
//     if (attackLength) {
//       for (var i = 0; i < attackLength; i++) {
//         const move = attackMoves[i];
//         if (otherPieces.includes(piece.id + movement[move])) {
//           if (isWall(piece.id + movement[move])) {
//             options.push(piece.id + movement[move]);
//             break
//           }
//           options.push(piece.id + movement[move]);
//         }
//         // pieceRules?.movement?.firstMove.forEach(move => {
//         //   if (!boardMoves.includes(piece.id + movement[move])) {
//         //       options.push(piece.id + movement[move])
//         //   }
//         // })
//       }
//     }
//     const moveLength = moves?.length
//     if (moveLength) {
//       if (!piece.isPawn && !piece.isHorse) {
//     for (var i = 0; i < moveLength; i++) {
//       let possibleMovement = piece.id
//       const move = moves[i];
//       for (var j = 0; j < 7; j++) {
//         possibleMovement += movement[move]
//       if (!boardMoves.includes(possibleMovement)) {
//         if (otherPieces.includes(possibleMovement)) {
//           options.push(possibleMovement);
//           break
//         }
//         if (isWall(possibleMovement) && isWall(possibleMovement - movement[move])) {
//           if (isRook && (move?.[0] === 'UP1' || move?.[0] === 'DOWN1')) {
//             options.push(possibleMovement)
//           } else {
//             break
//         }
//         } else if (isWall(possibleMovement) && !isRook) {
//             options.push(possibleMovement);
//             break
//         }
//         options.push(possibleMovement);
//       } else {
//         break
//       }
//     }
//   }
// } else {
//     for (var i = 0; i < moveLength; i++) {
//       const move = moves[i];
//       const possibleMovement = piece.id + movement[move]
//       if (!boardMoves.includes(possibleMovement)) {
//         if (piece.isHorse) {
//         options.push(possibleMovement);
//       } else if (otherPieces.includes(possibleMovement)) {
//         return options
//       } else {
//         options.push(possibleMovement)
//       }
//       }
//     }
//   }
//     return options
// }
// return options;
