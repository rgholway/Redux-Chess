import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {bindActionCreators} from 'redux';
import Piece from "./Piece"
import PromotionModal from "./PromotionModal"
import {highlightPotentialMoves} from "./chessSlice";

const Board = ({ boxes, selectedPiece }) => {
  const dispatch = useDispatch()

  const handleClick = (id, isPotentialMove) => {
    if (!isPotentialMove) {
         dispatch({type: 'chess/highlightPotentialMoves', payload: id})
       } else {
         dispatch({type: 'chess/movePiece', payload: id})
       }
  }

  const handleSelectPromotion = (pieceName, id) => {
    console.log('what up')
    dispatch({type: 'chess/promotePiece', payload: {pieceName, id}})
  }

  const boxMap = boxes?.map((box) => {
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
        {box?.isPotentialMove && (
          <div className='PotentialMove' />
        )}

      </div>
      </>
    );
  });

  return <div className="board">{boxMap}</div>;
};

const mapStateToProps = (state) => {
  return {
    boxes: state?.state?.boxes,
    selectedPiece: state?.state?.selectedPiece
  };
};

export default connect(mapStateToProps)(Board);
