import React, { useState } from "react";
import { ethers } from "ethers";
import { CrossChainMessenger } from "@mantleio/sdk";

const Body = () => {
  const [hash, setHash] = useState();
  const [status, setStatus] = useState("No status");

  const l1RpcProvider = new ethers.providers.JsonRpcProvider(
    import.meta.env.VITE_GOERLI_RPC
  );
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.testnet.mantle.xyz"
  );

  let crossChainMessenger = new CrossChainMessenger({
    l1ChainId: 5,
    l2ChainId: 5001,
    l1SignerOrProvider: l1RpcProvider,
    l2SignerOrProvider: l2RpcProvider,
  });

  const handleChange = async (e) => {
    setHash(e.target.value);
  };

  const handleClick = async (e) => {
    if (hash === "") return;
    setStatus("Loading...");
    try {
      let currentStatus = await crossChainMessenger.getMessageStatus(hash);
      switch (currentStatus) {
        case 0:
          return setStatus("Unconfirmed Message");
        case 1:
          return setStatus("Failed Message");
        case 2:
          return setStatus("State root not published");
        case 3:
          return setStatus("In challenge period");
        case 4:
          return setStatus("Ready for relay");
        case 5:
          return setStatus("Message Relayed");
      }
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div className="px-2 py-4 flex flex-col items-center">
      <input
        className=" bg-gray-100 w-full outline outline-1 h-8 indent-1 rounded-sm"
        placeholder="Enter transaction hash 0x.."
        onChange={handleChange}
      />
      {status && <p className="mt-4 text-xl">{status}</p>}
      <button
        className=" rounded-full bg-black text-gray-50 mt-2 px-4 py-2 text-base"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
};

export default Body;
