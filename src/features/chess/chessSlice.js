import { createSlice, current } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import {boxes} from './ChessConstants'
import {calculatePotentialMoves} from './PieceConstants'


export const chessSlice = createSlice({
  name: 'chess',
  initialState: {
    boxes: boxes,
    selectedPiece: {}
  },
  reducers: {
    highlightPotentialMoves: (state, action) => {

      const currentState = current(state)
      const selectedBox = selectBoxes(currentState, action.payload)
      console.log(selectedBox)
      const calculatedPotentialMoves = calculatePotentialMoves(selectedBox?.piece, currentState)

      let mappedState = {boxes: {}, selectedPiece: {...selectedBox}}
      if (calculatedPotentialMoves.length) {
        calculatedPotentialMoves?.forEach(position => {
          mappedState.boxes = currentState.boxes?.map(box => {
            if (calculatedPotentialMoves.includes(box.id)) {
              return {...box, isPotentialMove: true}
            } else {
              return {...box, isPotentialMove: false }
            }
          })

        })
        return mappedState
      } else {
        mappedState.boxes = currentState.boxes?.map(box => {
            return {...box, isPotentialMove: false}
        })
        return mappedState
      }
    },
    movePiece: (state, action) => {
      const currentState = current(state)
      const selectedBox = selectBoxes(currentState, action.payload)
      const selectedPiece = selectSelectedPiece(currentState)
      const updatedPiece = {...selectedPiece, id: action.payload, team: selectedPiece.team, hasMoved: true}
      const isBottomRow = selectedBox.id < 8
      const isTopRow = selectedBox.id > 55
      let isPromotion = false
      let mappedState = {boxes: {}, selectedPiece: {...selectedBox}}
      mappedState.boxes = currentState.boxes?.map(box => {
        if (action.payload === box.id) {
          console.log(selectedPiece.isPawn, isBottomRow)
          if (selectedPiece.team === 2 && isBottomRow && selectedPiece?.isPawn) {
            isPromotion = true
            return {...box, hasPiece: true, piece: updatedPiece, isPotentialMove: false, isPromotion }
          }
          if (selectedPiece.team === 1 && isTopRow && selectedPiece.isPawn) {
            isPromotion = true
            return {...box, hasPiece: true, piece: updatedPiece, isPotentialMove: false, isPromotion }
          }
          return {...box, hasPiece: true, piece: updatedPiece, isPotentialMove: false, isPromotion }
        } else if (box.id === selectedPiece.id) {
          return {...box, piece: '', hasPiece: false}
        } else {
          return {...box, isPotentialMove: false}
        }
      })
      return mappedState
    },
    promotePiece: (state, action) => {
      console.log('rerararar')
      const currentState = current(state)
      const selectedBox = selectBoxes(currentState, action.payload.id)
      const selectedPiece = selectedBox?.piece
      const isHorse = action.payload.pieceName === 'WhiteKnight' || action.payload.pieceName === 'BlackKnight'
      const updatedPiece = {...selectedPiece, pieceName: action.payload.pieceName, isPawn: false, isHorse}
      let mappedState = {boxes: {}, selectedPiece: {...selectedBox}}
      mappedState.boxes = currentState.boxes?.map(box => {
        if (selectedBox.id === box.id) {
          return {...box, isPromotion: false, piece: updatedPiece}
        } else {
          return {...box}
        }
      })
      return mappedState
    }
    // increment: state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { highlightPotentialMoves, movePiece, promotePiece } = chessSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBoxes = (state, box) => state.boxes[box]

export const selectSelectedPiece = (state) => state.selectedPiece?.piece

export default chessSlice.reducer;
