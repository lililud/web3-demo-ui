import {contract as contractAddress} from "../contractAddress";
import FeatureToggle from "../abis/FeatureToggle.json";

const defaultOptions = {
    contractAddress: contractAddress,
    abi: FeatureToggle.abi,
    awaitReceipt: false // allows us to receive all data as event callbacks
};

export default defaultOptions;