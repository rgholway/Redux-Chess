import React from "react";
import { rules } from "./PieceConstants";
import { useDispatch } from 'react-redux'

const Piece = ({
  className,
  pieceName,
  id,
  isAttacked,
  potentialMoves,
  isKing,
  isHorse,
  isProtectingKing,
  isAttackingKing,
  rules,
  highlightPotentialMoves,
}) => {
  const dispatch = useDispatch()

const highlightMoves = (e) => {
  // dispatch({type: 'chess/highlightPotentialMoves', payload: potentialMoves})
}

  return (<div className={className} />);
};

export default Piece;
