import defaultOptions from "./defaultOptions";
import Moralis from "moralis";
import FeatureToggle from "../abis/FeatureToggle.json";
import {contract as contractAddress} from "../contractAddress";

const getIsEnabledOptions = {
    functionName: "getIsEnabled",
    params: {
        toggleId: 0
    },
    ...defaultOptions
}

export const getIsEnabled = async () => {

    const web3 = await (Moralis as any).enableWeb3();
    const contract = new web3.eth.Contract(FeatureToggle.abi, contractAddress);
    const isEnabled = await contract.methods.getIsEnabled(0).call();

    console.log('isEnabled222', isEnabled);
    return isEnabled;
}

