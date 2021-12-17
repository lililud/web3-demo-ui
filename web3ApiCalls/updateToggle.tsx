import Moralis from "moralis";
import {getIsEnabled} from "./getIsEnabled";
import defaultOptions from "./defaultOptions";



const updateToggleOptions = {
    functionName: "updateToggle",

    ...defaultOptions
}

export const updateToggle = async (isToggleEnabled: boolean, toggleName?: string) => {
    const options = {
        ...updateToggleOptions,
        params: {
            toggleId: 0,
            isEnabled: !isToggleEnabled,
            name: toggleName ?? "shouldRenderCopy"
        },
    }

    await Moralis.Web3.executeFunction(options)
        .then(response=> {
            console.log('updatedToggle', response);
        })

};


