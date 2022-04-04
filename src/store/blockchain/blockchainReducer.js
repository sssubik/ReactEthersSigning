
const initialState = {
    provider: null,
    account: null
}
const blockchainReducer = (state = initialState, action) => {
    switch(action.type){
        case "WEB3_LOADED":
            return {
                ...state,
                payload: action.provider
            }
        case "WEB3_ACCOUNT_LOADED":
            return {
                ...state,
                account: action.account
            }
        default: 
            return state
    }
}

export default blockchainReducer;
