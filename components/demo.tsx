import Moralis from "moralis";

import {useEffect, useState} from "react";
import styles from "../styles/Home.module.css";
import {getIsEnabled} from "../web3Calls/getIsEnabled";
import {updateToggle} from "../web3Calls/updateToggle";
import {
    Button,
    CircularProgress,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import defaultOptions from "../web3Calls/defaultOptions";
import styled from "styled-components";

export default function Demo() {
    const[isToggleEnabled, setIsToggleEnabled] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Invoke async request
        getIsEnabled()
            .then((result: boolean) => {setIsToggleEnabled(result)})
            .catch(e => alert(`error getting isEnabled: ${e.message}`));
        // No variable dependencies means this would run only once after the first render
    }, []);

    const updateToggleOptions = {
        functionName: "updateToggle",
        params: {
            toggleId: 0,
            isEnabled: !isToggleEnabled,
            name: "shouldRenderCopy"
        },
        ...defaultOptions
    }


    const updateFeatureToggle = async () => {
        setIsLoading(true);
        await Moralis.Web3.executeFunction(updateToggleOptions)
            .then((response) => {
                console.log('updatedToggle', response);
                setIsLoading(false)
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
        <OuterContainer>


                <Container>

                <StyledBg elevation={2}>

                <Typography variant="h5" color="text.primary" component="div">
                    Toggles
                </Typography>

            <Container>
                <Typography variant="body1" color="text.secondary" component="div">
                    shopMembershipModule
                </Typography>
                <ToggleButtonGroup
                    color={isToggleEnabled ?? false ?"success" : "error"}
                    value={isToggleEnabled}
                    exclusive
                    onChange={updateFeatureToggle}
                    disabled={isLoading}
                >
                    <ToggleButton value={true}>On</ToggleButton>
                    <ToggleButton value={false}>Off</ToggleButton>
                </ToggleButtonGroup>
            </Container>


                <StyledLoading>
                    {isLoading && <CircularProgress color="secondary" />}
                    {isLoading && <Typography variant="h5" color="secondary">updating toggle...</Typography>}

                </StyledLoading>


                </StyledBg>
                </Container>


                <Container>
                    <StyledBg>
                    <Button variant="contained" color="secondary" onClick={
                        () => {
                            getIsEnabled()
                                .then((isEnabled) => setIsToggleEnabled(isEnabled));
                        }}
                    >
                        refetch toggle
                    </Button>
                    <Typography variant="body1" color="text.secondary" component="div">
                        "{!isLoading && copy}"
                    </Typography>
                    </StyledBg>
                </Container>
        </OuterContainer>

    );

}
const OuterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
`;
const Container = styled.div`
    align-items:center;
    display: flex;
    flex-direction: column;
    
`;
const StyledLoading = styled.div`
    
`;

const StyledBg = styled(Paper)`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
   
    padding: 30px;
    margin: 20px;
    & > * {
        padding: 15px;
    }
`;