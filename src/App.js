import React, { useState, useEffect } from "react";
import { AptosClient } from 'aptos';
import { Types } from 'aptos';

function App() {

  const [address, setAddress] = useState();
  const isPetraInstalled = window.aptos

  const getAptosWallet = () => {
    if ('aptos' in window) {
      return window.aptos;
    } else {
      window.open('https://petra.app/', `_blank`);
    }
  }
  const wallet = getAptosWallet();
  const connect = async () => {
    // const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();
      console.log(response); // { address: string, address: string }

      const account = await wallet.account();
      setAddress(account.address);
      console.log(account); // { address: string, address: string }
    } catch (error) {
      // { code: 4001, message: "User rejected the request."}
    }
  }
  const disconnect = async () => {
    await wallet.disconnect();
  }

  const transfer = async () => {
    const transaction = {
      arguments: [address, '717'],
      function: '0x1::coin::transfer',
      type: 'entry_function_payload',
      type_arguments: ['0x1::aptos_coin::TestCoin'],
    };
    try {
      const pendingTransaction = await(window).aptos.signAndSubmitTransaction(transaction);
      console.log("pendingTransaction", pendingTransaction);
      // In most cases a dApp will want to wait for the transaction, in these cases you can use the typescript sdk
      const client = new AptosClient('https://testnet.aptoslabs.com');
      client.waitForTransaction(pendingTransaction.hash);
    } catch (error) {
      // see "Errors"
    }
  };


  return (
    <><button onClick={connect} variant="primary">
      Connect to wallet
    </button><button onClick={disconnect} variant="primary">
        disconnect
      </button>
      <button onClick={transfer} variant="primary">
        transfer
      </button></>

  );
}

export default App;
