import { ethers } from 'ethers';


const web3Loaded = (provider) => {
    return {
        type: 'WEB3_LOADED',
        provider
    }
}

const web3AccountLoaded = (account) => {
    return {
        type: 'WEB3_ACCOUNT_LOADED',
        account
    }
}
export const loadWeb3 = () => {
    return async (dispatch) => {
        if(typeof window.ethereum!=='undefined'){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log('asdasd',provider)
            dispatch(web3Loaded(
                {
                    provider: provider
                }
            ))
            
            return provider
          } else {
            window.alert('Please install MetaMask')
            window.location.assign("https://metamask.io/")
          }
        
    }
}

export const loadAccount = (provider) => {
    return async (dispatch) => {
      const accounts = await provider.listAccounts()
      const account = accounts[0]
      
      dispatch(web3AccountLoaded(account))
      return account 
    }
}