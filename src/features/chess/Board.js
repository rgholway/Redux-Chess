import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import Piece from "./Piece";
import PromotionModal from "./PromotionModal";
import { selectBox } from "./chessSlice";
import { highlightPotentialMoves } from "./chessSlice";

const Board = ({ boxes, selectedPiece, turn, userTeam, preMove}) => {
  const dispatch = useDispatch();

  const handleClick = (id, isPotentialMove) => {
    // Weird logic here because right now we are both teams. Once Stockfish is set up we will set the
    //user team and the logic will be simpler
    const selectedBox = selectBox(boxes, id)
      if (selectedPiece?.team === turn && isPotentialMove) {
        dispatch({ type: "chess/movePiece", payload: id });
      } else if (selectedBox?.piece?.team === turn) {
        dispatch({ type: "chess/highlightPotentialMoves", payload: id });
      } else if (preMove?.selectedPiece || selectedBox?.piece?.team === 2) {
        dispatch({ type: "chess/preMovePiece", payload: {selectedPiece: selectedBox?.piece?.id, selectedSquare: selectedBox?.id} });
      }
}
  //   if (selectedPieceTeam === turn) {
  //     if (!isPotentialMove) {
  //       dispatch({ type: "chess/highlightPotentialMoves", payload: id });
  //     } else {
  //       console.log('what up')
  //       dispatch({ type: "chess/movePiece", payload: id });
  //     }
  //   } else if (userTeam === selectedPieceTeam) {
  //       dispatch({ type: "chess/preMovePiece", payload: id });
  //     }
  // };

  const handleSelectPromotion = (pieceName, id) => {
    dispatch({ type: "chess/promotePiece", payload: { pieceName, id } });
  };
  const boxMap = boxes?.map((box) => {
    const preMoveStyle = box?.hasPiece ? '-100%' : '0%'
    return (
      <>
        <div
          key={box?.id}
          id={box?.id}
          className={box?.className}
          onClick={() => handleClick(box?.id, box?.isPotentialMove)}
          name={box?.name}
          style={{
            backgroundColor: box?.style?.backgroundColor,
            borderTopLeftRadius: box?.style?.borderTopLeftRadius,
            borderTopRightRadius: box?.style?.borderTopRightRadius,
            borderBottomRightRadius: box?.style?.borderBottomRightRadius,
            borderBottomLeftRadius: box?.style?.borderBottomLeftRadius,
          }}
          hasPiece={box?.hasPiece}
        >
          {box?.isPromotion && (
            <PromotionModal
              team={box?.piece?.team}
              id={box?.id}
              handleSelectPromotion={handleSelectPromotion}
            />
          )}
          {box?.hasPiece && (
            <Piece
              key={box?.id}
              id={box?.id}
              highlightPotentialMoves={highlightPotentialMoves}
              pieceName={box?.piece?.pieceName}
              className={box?.piece?.className}
              hasMoved={box?.piece?.hasMoved}
              isAttacked={box?.piece?.isAttacked}
              potentialMoves={box?.piece?.potentialMoves}
              isKing={box?.piece?.isKing}
              isKing={box?.piece?.isHorse}
              isProtectingKing={box?.piece?.isProtectingKing}
              isAttackingKing={box?.piece?.isAttackingKing}
              rules={box?.piece?.rules}
              team={box?.piece?.team}
            />
          )}
          {box?.isPotentialMove && <div className="PotentialMove" />}
          {box?.id === preMove?.selectedPiece && <div className="PreMovePiece" />}
          {box?.id === preMove?.selectedMove && <div className="PreMoveBox" style={{marginTop: preMoveStyle }} />}
        </div>
      </>
    );
  });

  return <div className="board">{boxMap}</div>;
};

const mapStateToProps = (state) => {
  return {
    boxes: state?.state?.boxes,
    selectedPiece: state?.state?.selectedPiece,
    turn: state?.state?.turn,
    userTeam: state?.state?.user?.team,
    preMove: state?.state?.preMove,
  };
};

export default connect(mapStateToProps)(Board);
