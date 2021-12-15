import Moralis from "moralis";
import MetamaskLogin from "./MetamaskLogin/MetamaskLogin";
import {contract as contractAddress} from "../contractAddress";
import FeatureToggle from "../abis/FeatureToggle.json";
import {useMoralis} from "react-moralis";
import {useState} from "react";
import styles from "../styles/Home.module.css";

// const options = {
//     chain: "eth",
//     address: "0xED117c3c4873525A736aA6D20d1414414Bd75dBc",
//     function_name: "allowance",
//     abi: ABI,
//     params: {owner: "0x1...2", spender: "0x1...2"}
// };
//
// const allowance = await Moralis.Web3API.native.runContractFunction(options);


export default function Demo() {

    const[isToggleEnabled, setIsToggleEnabled] = useState(false);
    const {
        isWeb3Enabled,
        isAuthenticated,
        enableWeb3,
        authenticate,
        logout,
        isAuthenticating,
        isWeb3EnableLoading,
        user
    } = useMoralis();
    const getUserAddress = async () => {
        const web3 = await Moralis.Web3.enableWeb3()
        const accounts = await web3.eth.getAccounts()
        return accounts[0] as string;
    };
    const optionsCore = {
        contractAddress: contractAddress,
        abi: FeatureToggle.abi,
    };


    const getIsEnabledOptions = {
        functionName: "getIsEnabled",
        params: {
            toggleId: 0
        },
        ...optionsCore
    }

    const updateToggleOptions = {
        functionName: "updateToggle",
        params: {
            toggleId: 0,
            isEnabled: !isToggleEnabled,
            name: "shouldRenderCopy"
        },
        ...optionsCore
    }
    const getIsEnabled = async () => {
        const result = await Moralis.Web3.executeFunction(getIsEnabledOptions)
        setIsToggleEnabled(result)
        console.log('isEnabled for toggleId 0', result);
    }


    const updateToggle = async () => {
        const result = await Moralis.Web3.executeFunction(updateToggleOptions)
        console.log('updatedToggle', result)
    }
    return (
        <div className={styles.container}>
            <h4>Demo!</h4>

            <button onClick={updateToggle}> update Toggle</button>
            <br/>
            <button onClick={getIsEnabled}>getIsEnabled</button>
            {isToggleEnabled && <h4>toggle is Enabled</h4>}
            {!isToggleEnabled && <h4>toggle is not enabled</h4>}

        </div>)

}
