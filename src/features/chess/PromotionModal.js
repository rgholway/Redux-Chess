import React from 'react'
import '../../PromotionModal.css'

const whitePromotionObject = [{
  pieceName: 'WhiteQueen',

},
{
  pieceName: 'WhiteRook'
},
  {pieceName: 'WhiteBishop'},
  {pieceName: 'WhiteKnight'}
]

const blackPromotionObject = [{
  pieceName: 'BlackQueen',

},
{
  pieceName: 'BlackRook'
},
  {pieceName: 'BlackBishop'},
  {pieceName: 'BlackKnight'}
]

const PromotionModal = ({team, id, handleSelectPromotion}) => {
  console.log(id)

  const promotedTeam = team === 1 ? blackPromotionObject : whitePromotionObject

  const handleClick = (pieceName) => {
    console.log(pieceName)
    console.log(handleSelectPromotion)
    handleSelectPromotion(pieceName, id)
  }

  const mappedPieces = promotedTeam.map(piece => {
    return (
      <div className='piecePromotionBox' onClick={() => handleClick(piece.pieceName)}>
        {piece.pieceName}
      </div>
    )
  })

  return (
    <div className='PromotionModal'>
      {mappedPieces}
    </div>
  )
}

export default PromotionModal
