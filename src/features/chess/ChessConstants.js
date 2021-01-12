const newBox = (id, className, boxName, isWall, style, hasPiece, piece) => ({
  key: id,
  id: id,
  name: boxName,
  isWall,
  className,
  isPotentialMove: false,
  style: {
    backgroundColor: style?.color,
    borderTopLeftRadius: style?.topLeftRadius,
    borderTopRightRadius: style?.topRightRadius,
    borderBottomRightRadius: style?.bottomRightRadius,
    borderBottomLeftRadius: style?.bottomLeftRadius,
  },
  hasPiece,
  piece,
});
// #5461B5

const makeBoxes = (lightColor, darkColor, pieceOrder) => {
  let boxesLocals = [];
  let row = 1;
  let isWall = false;
  let color;
  let piece = {};
  let name = "";
  let hasPiece = false;
  let topLeftRadius = "";
  let topRightRadius = "";
  let bottomLeftRadius = "";
  let bottomRightRadius = "";
  const letters = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
  };
  let rightWallHelper = 7
  for (var i = 0; i < 64; i++) {
    if (i % 8 === 0 && i !== 0) {
      row += 1;
    }
    if (row % 2 === 1) {
      if (i % 2 === 1) {
        color = lightColor;
      } else {
        color = darkColor;
      }
    } else {
      if (i % 2 === 1) {
        color = darkColor;
      } else {
        color = lightColor;
      }
    }
    if (pieceOrder[i]) {
      hasPiece = true;
      piece =
        {
          id: i,
          pieceName: pieceOrder[i]?.pieceName,
          hasMoved: pieceOrder[i]?.hasMoved,
          isAttacked: pieceOrder[i]?.isAttacked,
          isPromotion: false,
          isPawn: pieceOrder[i]?.isPawn,
          potentialMoves: [],
          isKing: pieceOrder[i]?.isKing,
          isHorse: pieceOrder[i]?.isHorse,
          team: pieceOrder[i]?.team,
          isProtectingKing: pieceOrder[i]?.isProtectingKing,
          isAttackingKing: pieceOrder[i]?.isAttackingKing,
          className: pieceOrder[i]?.className,
        } || "";
    } else {
      hasPiece = false;
      piece = "";
    }

    if (row === 1 || row === 8) {
      isWall = true
    } else if (i === rightWallHelper ) {
      isWall = true
    } else if (i % 8 === 0) {
      rightWallHelper += 8
      isWall = true
    } else {
      isWall = false
    }

    if (i === 0) {
      topLeftRadius = "20%";
    } else if (i === 7) {
      topRightRadius = "20%";
    } else if (i === 56) {
      bottomLeftRadius = "20%";
    } else if (i === 63) {
      bottomRightRadius = "20%";
    } else {
      topLeftRadius = "";
      topRightRadius = "";
      bottomLeftRadius = "";
      bottomRightRadius = "";
    }
    name = `${letters[row]}${((i % 8) + 1).toString()}`;
    boxesLocals.push(
      newBox(
        i,
        "box",
        name,
        isWall,
        {
          color: color,
          topLeftRadius,
          topRightRadius,
          bottomLeftRadius,
          bottomRightRadius,
        },
        hasPiece,
        piece
      )
    );
  }
  return boxesLocals;
};

// implement later

const makePiece = (
  id,
  pieceName,
  className,
  hasMoved,
  isAttacked,
  potentialMoves,
  points,
  isKing,
  team,
  isProtectingKing,
  isAttackingKing
) => ({
    id,
    pieceName,
    className,
    hasMoved,
    isAttacked,
    potentialMoves,
    points,
    isKing,
    team,
    isProtectingKing,
    isAttackingKing,
});

export const boxes = makeBoxes("#F4A565", "#5461B5", {
  // makePiece(
  //   0,
  //   'BlackRook',
  //   '',
  //   hasMoved: false,
  //
  //
  //
  // )
  0: {
    className: "BlackRook",
    pieceName: "Rook",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 5,
    isKing: false,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  1: {
    className: "BlackKnight",
    pieceName: "Knight",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: ['DOWN17', 'DOWN15'],
    points: 3,
    isKing: false,
    isHorse: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  2: {
    className: "BlackBishop",
    pieceName: "Bishop",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 3,
    isKing: false,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  3: {
    className: "BlackQueen",
    pieceName: "Queen",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 9,
    isKing: false,
    isQueen: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  4: {
    className: "BlackKing",
    pieceName: "King",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: "WIN",
    isKing: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  5: {
    className: "BlackBishop",
    pieceName: "Bishop",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 3,
    isKing: false,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  6: {
    className: "BlackKnight",
    pieceName: "Knight",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: ['DOWN17', 'DOWN15'],
    points: 3,
    isKing: false,
    isHorse: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  7: {
    className: "BlackRook",
    pieceName: "Rook",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 5,
    isKing: false,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  8: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    isPawn: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  9: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    isPawn: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  10: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  11: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    isPawn: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  12: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    isPawn: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  13: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    isPawn: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  14: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    isPawn: true,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  15: {
    className: "BlackPawn",
    pieceName: "BlackPawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'down', amount: 8}, {direction: 'down', amount: 16}],
    points: 1,
    isKing: false,
    team: 1,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  48: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [{direction: 'up', amount: 8}, {direction: 'up', amount: 16}],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  49: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  50: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  51: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  52: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [44, 36],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  53: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  54: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  55: {
    className: "WhitePawn",
    pieceName: "WhitePawn",
    isPawn: true,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 1,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  56: {
    className: "WhiteRook",
    pieceName: "Rook",
    isPawn: false,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 5,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  57: {
    className: "WhiteKnight",
    pieceName: "Knight",
    isPawn: false,
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 3,
    isKing: false,
    isHorse: true,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  58: {
    className: "WhiteBishop",
    pieceName: "Bishop",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 3,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  59: {
    className: "WhiteKing",
    pieceName: "King",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 'WIN',
    isKing: true,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  60: {
    className: "WhiteQueen",
    pieceName: "Queen",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 9,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  61: {
    className: "WhiteBishop",
    pieceName: "Bishop",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 3,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  62: {
    className: "WhiteKnight",
    pieceName: "Knight",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 3,
    isKing: false,
    isHorse: true,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
  63: {
    className: "WhiteRook",
    pieceName: "Rook",
    hasMoved: false,
    isAttacked: false,
    potentialMoves: [],
    points: 5,
    isKing: false,
    team: 2,
    isProtectingKing: false,
    isAttackingKing: false,
  },
});

// export const boxes = [
//   newBox(
//     1,
//     'box',
//     'A8',
//     {color: '#F4A565', topLeftRadius: '20%'},
//     true,
//     'BlackRook'
//   ),
//   newBox(
//     2,
//     'box',
//     'B8',
//     {color: '#5461B5'},
//     true,
//     'BlackHorse'
//     ),
//     newBox(
//       3,
//       'box',
//       'C8',
//       {color: '#F4A565'},
//       true,
//       'BlackQueenBishop'
//     ),
//     newBox(
//       4,
//       'box',
//       'D8',
//       {color: '#5461B5'},
//       true,
//       'BlackQueen'
//     ),
//     newBox(
//       5,
//       'box',
//       'E8',
//       {color: '#F4A565'},
//       true,
//       'BlackKing'
//     ),
//     newBox(
//       6,
//       'box',
//       'F8',
//       {color: '#5461B5'},
//       true,
//       'BlackKingBishop'
//     ),
//     newBox(
//       7,
//       'box',
//       'G8',
//       {color: '#F4A565'},
//       true,
//       'BlackKnight'
//     ),
//     newBox(
//       8,
//       'box',
//       'H8',
//       {color: '#5461B5', topRightRadius: '20%'},
//       true,
//       'BlackRook'
//     ),
//     newBox(
//       9,
//       'box',
//       'A7',
//       {color: '#5461B5'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       10,
//       'box',
//       'B7',
//       {color: '#F4A565'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       11,
//       'box',
//       'C7',
//       {color: '#5461B5'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       12,
//       'box',
//       'D7',
//       {color: '#F4A565'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       13,
//       'box',
//       'E7',
//       {color: '#5461B5'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       14,
//       'box',
//       'F7',
//       {color: '#F4A565'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       15,
//       'box',
//       'G7',
//       {color: '#5461B5'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       16,
//       'box',
//       'H7',
//       {color: '#F4A565'},
//       true,
//       'BlackPawn'
//     ),
//     newBox(
//       17,
//       'box',
//       'A6',
//       {color: '#F4A565'},
//       true,
//     ),
//     newBox(
//       18,
//       'box',
//       'B6',
//       {color: '#5461B5'},
//       true,
//     ),
//     newBox(
//       19,
//       'box',
//       'B6',
//       {color: '#F4A565'},
//       true,
//     ),
// ]

// let boxes = []
// let leftToRight = 'ltr'
// for(var i=1; i < 65; i++) {
//   if (i % 8 === 0 && leftToRight === 'ltr' ) {
//     leftToRight = 'rtl'
//   } else if (i % 8 === 0) {
//     leftToRight = 'ltr'
//   }
//   // console.log(i % 8)
//   if (leftToRight === 'ltr') {
//     if (i % 2 === 0 && i % 8 !== 0) {
//       boxes.push(<div key={i} id={i} className={`box${leftToRight}`} style={{backgroundColor:'#F4A565'}} piece={false} pieceId={null} />)
//     } else if (i % 8 === 0) {
//         boxes.push(<div key={i} id={i} className={`box${leftToRight}`} style={{backgroundColor:'#5461B5'}} piece={false} pieceId={null} />)
//     } else {
//       boxes.push(<div key={i} id={i} className={`box${leftToRight}`} style={{backgroundColor:'#5461B5'}} piece={false} pieceId={null} />)
//     }
//    } else {
//     if (i % 2 === 0 && i % 8 !== 0) {
//       boxes.push(<div key={i} id={i} className={`box${leftToRight}`} style={{backgroundColor:'#5461B5'}} piece={false} pieceId={null}/>)
//     }
//     else if (i % 8 === 0) {
//       boxes.push(<div key={i} id={i} className={`box${leftToRight}`} style={{backgroundColor:'#F4A565'}} piece={false} pieceId={null} />)
//    } else {
//       boxes.push(<div key={i} id={i} className={`box${leftToRight}`} style={{backgroundColor:'#F4A565'}} piece={false} pieceId={null} />)
//
//     }
//
//   }
// }

// export {boxes}

// let pieces = [1]
//
// for(var i=0; i < 2; i++) {
//   let hi = boxes[10]
//   console.log(document.getElementById(9))
//   // boxes[10].piece = true
// }
