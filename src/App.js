import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWeb3,loadAccount } from "./store/blockchain/blockchainActions";

function App() {
  const [signatures, setSignatures] = useState([]);
  const SIGNING_DOMAIN_NAME = 'WEB3CLUB'
  const SIGNING_DOMAIN_VERSION = 1
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  

  const loadBlockchainData = async (e) => {
    e.preventDefault();
    const web3 = await dispatch(loadWeb3())
    await dispatch(loadAccount(web3))
    
  }
  const signMessage = async (message) =>{
    const signer =blockchain.payload.provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,signature,address
    }
  }

  const handleSign = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const sig = await signMessage(data.get("message"))
    if (sig) {
      setSignatures([...signatures,sig]);
      console.log(sig)
    }
  }
  return (
    <div>

      <h1>
        Helo!
      </h1>
      {
        blockchain.account === null ?
      (
        <button onClick={loadBlockchainData}>Load Metamask!</button>
      ):
      (
        <form onSubmit={handleSign}>
        
          <textarea type="text" name="message" placeholder="Message"/>
          <button type="submit"> Sign Message </button>
        </form>
      )
      }
    </div>
  );
}

export default App;
