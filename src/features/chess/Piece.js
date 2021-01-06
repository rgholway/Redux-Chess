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

  const name = className || pieceName

  return (<div className={name} />);
};

export default Piece;
