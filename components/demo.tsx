import Moralis from "moralis";
import {contract as contractAddress} from "../contractAddress";
import FeatureToggle from "../abis/FeatureToggle.json";
import {useState} from "react";
import styles from "../styles/Home.module.css";
import {getIsEnabled} from "../web3Calls/getIsEnabled";
import {updateToggle} from "../web3Calls/updateToggle";

export default function Demo() {
    const[isToggleEnabled, setIsToggleEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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


    const updateFeatureToggle = async () => {
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

            <button onClick={updateFeatureToggle}> update Toggle</button>
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
