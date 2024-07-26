const initialState = ''

export const changeFilter = (filter) => {
  return {
    type: "CHANGE_FILTER",
    payload: filter
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action.payload
    default:
      return state
  }
}

export default reducer