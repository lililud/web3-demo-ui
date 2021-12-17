import Moralis from "moralis";
import MetamaskLogin from "./MetamaskLogin/MetamaskLogin";
import {contract as contractAddress} from "../contractAddress";
import FeatureToggle from "../abis/FeatureToggle.json";
import {useMoralis} from "react-moralis";
import {useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import {getIsEnabled} from "../web3ApiCalls/getIsEnabled";

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
    // const getIsEnabled = async () => {
    //     await Moralis.Web3.executeFunction(getIsEnabledOptions)
    //         .then( (result ) => {
    //                 // setIsToggleEnabled(result);
    //                 console.log('getIsEnabled for toggleId 0', result);
    //             }
    //         );
    // }
    const[isToggleEnabled, setIsToggleEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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


    const updateToggle = async () => {
        setIsLoading(true);
        await Moralis.Web3.executeFunction(updateToggleOptions)
            .then(response=> {
                    console.log('updatedToggle', response);
        })
            .then(() => {setIsLoading(false)})
            .then(() => {
                getIsEnabled()
                    .then(newIsEnabled => {
                        console.log("updating with setIsToggleEnabled" );
                        console.log("old value:",isToggleEnabled);
                        console.log("new value:", newIsEnabled);
                        setIsToggleEnabled(newIsEnabled);
                    });
            });
    };

    const copy = isToggleEnabled ? "toggle is Enabled" : "toggle is not enabled";

    return (
        <div className={styles.container}>
            <h4>Demo!</h4>

            <button onClick={
                () => {
                    setIsLoading(true);
                    updateToggle()
                        .then(() => {setIsLoading(false)})
                        .then(() => {
                            getIsEnabled()
                                .then(newIsEnabled => {
                                    console.log("updating with setIsToggleEnabled" );
                                    console.log("old value:",isToggleEnabled);
                                    console.log("new value:", newIsEnabled);
                                    setIsToggleEnabled(newIsEnabled);
                                });
                        });
                }}> update Toggle</button>
            <br/>
            <p>{isLoading && 'loading...'}</p>
            <br/>
            <button onClick={
                () => {
                    getIsEnabled()
                        .then((isEnabled) => setIsToggleEnabled(isEnabled));
                }}
            >
                getIsEnabled
            </button>
            <h4>{copy}</h4>

        </div>)

}
