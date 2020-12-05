
export const initialState = {
    selectedColumn: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SHOW_ALL_COLUMNS': 
            if(state === undefined)
                state = initialState
            return {...state, selectedColumn: action.payload}
        case 'ADD_COLUMN': 
            if(state === undefined)
                state = initialState
            return {...state, selectedColumn: action.payload};
        case 'REMOVE_COLUMN':
            if(state === undefined)
                state = initialState
            return {...state, selectedColumn: state.selectedColumn.filter(col => col+'' !== action.payload+'')};
        case 'RESET_COLUMNS':
            if(state === undefined)
                state = initialState
            return {...state, selectedColumn: []}
        default:
            return state;
    }
}

export default reducer