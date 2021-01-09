import { createSlice, current } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import {boxes} from './ChessConstants'
import {calculatePotentialMoves} from './PieceConstants'

export const chessSlice = createSlice({
  name: 'chess',
  initialState: {
    boxes: boxes,
    selectedPiece: {team: 2},
    turn: 2,
    user: {
      team: 2
    },
    preMove: {
      isLive: false,
      selectedPiece: '',
      selectedMove: ''
    }
  },

  reducers: {
    highlightPotentialMoves: (state, action) => {
      const currentState = current(state)
      const selectedBox = selectBoxes(currentState, action.payload)
      // Just send boxes not all of state
      const calculatedPotentialMoves = calculatePotentialMoves(selectedBox?.piece, currentState?.boxes, false)
      let mappedState = {...currentState, selectedPiece: selectedBox?.piece || ""}
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
      const preMove = currentState?.preMove
      const turn = currentState.turn
      const selectedBox = selectBoxes(currentState, action.payload)
      const selectedPiece = selectSelectedPiece(currentState)
      const updatedPiece = {...selectedPiece, id: action.payload, hasMoved: true}
      const isBottomRow = selectedBox.id < 8
      const isTopRow = selectedBox.id > 55
      let isPromotion = false
      let whoseTurnIsItAnyways = turn === 2 ? 1 : 2
      let mappedState = {...currentState, boxes: {}, selectedPiece: '', turn: whoseTurnIsItAnyways, preMove: {isLive: false, selectedPiece: '', selectedMove: '' }}
      mappedState.boxes = currentState.boxes?.map(box => {
        if (action.payload === box.id) {
          if (selectedPiece?.team === 2 && isBottomRow && selectedPiece?.isPawn) {
            isPromotion = true
            return {...box, hasPiece: true, piece: updatedPiece, isPotentialMove: false, isPromotion }
          }
          if (selectedPiece?.team === 1 && isTopRow && selectedPiece.isPawn) {
            isPromotion = true
            return {...box, hasPiece: true, piece: updatedPiece, isPotentialMove: false, isPromotion }
          }
          return {...box, hasPiece: true, piece: updatedPiece, isPotentialMove: false, isPromotion }
        } else if (box?.id === selectedPiece?.id) {
          return {...box, piece: '', hasPiece: false, isPromotion}
        } else {
          return {...box, isPotentialMove: false, isPromotion}
        }
      })
      if (preMove?.isLive) {
        const selectedPiece = selectBoxes(currentState, preMove?.selectedPiece)?.piece
        const calculatedPotentialMoves = calculatePotentialMoves(selectedPiece, mappedState)
        const updatedPreMovePiece = {...selectedPiece, id: preMove?.selectedMove, hasMoved: true}
        if (calculatedPotentialMoves?.includes(preMove?.selectedMove) && selectedPiece) {
          whoseTurnIsItAnyways = whoseTurnIsItAnyways === 1 ? 2 : 1
          mappedState.boxes = mappedState?.boxes?.map(box => {
            if (box?.id === preMove?.selectedMove) {
              return {...box, hasPiece: true, piece: updatedPreMovePiece, isPotentialMove: false, isPromotion }
            } else if (box?.id === preMove?.selectedPiece) {
              return {...box, piece: '', hasPiece: false, isPromotion}
            }
            else {
              return {...box, isPotentialMove: false, isPromotion: false}
            }
          })
        }
      }
      return {...mappedState, turn: whoseTurnIsItAnyways}
    },
    promotePiece: (state, action) => {
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
    },
    preMovePiece: (state, action) => {
      const currentState = current(state)
      const selectedBox = selectBoxes(currentState, action?.payload?.selectedPiece)
      const preMove = currentState?.preMove
      if (action?.payload?.selectedPiece && !preMove?.selectedPiece && currentState?.user?.team === selectedBox?.piece?.team) {
          return {...currentState, preMove: {selectedPiece: action?.payload?.selectedPiece}}
      } else if (!preMove.selectedMove) {
        return {...currentState, preMove: {...preMove, isLive: true, selectedMove: action?.payload?.selectedSquare}}
      } else {
          return {...currentState, preMove: {isLive: false, selectedMove: '', selectedPiece: ''}}
      }

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

export const { highlightPotentialMoves, movePiece, promotePiece, preMovePiece } = chessSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBoxes = (state, box) => state.boxes[box]

export const selectBox = (boxes, box) => boxes[box]

export const selectSelectedPiece = (state) => state.selectedPiece

export default chessSlice.reducer;
