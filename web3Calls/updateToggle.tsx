import Moralis from "moralis";
import defaultOptions from "./defaultOptions";


const updateToggleOptions = {
    functionName: "updateToggle",
    ...defaultOptions
}

export const updateToggle = async (isToggleEnabled: boolean, toggleName?: string, toggleId?: number) => {
    const options = {
        ...updateToggleOptions,
        params: {
            toggleId: toggleId ?? 0,
            isEnabled: !isToggleEnabled,
            name: toggleName ?? "shouldRenderCopy"
        },
    }

    return await Moralis.Web3.executeFunction(options)
        .then(response=> {
            console.log('updatedToggle', response);
        });

};


