import React, { createContext, useContext } from "react";

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xc2D1D198F7C37a818aDec62E7146ad0b1EBf7978');

    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign({
                args: [
                    address, // owner
                    form.title, // title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), // deadline,
                    form.image,
                ],
            })

            console.log("contract call success", data)

        } catch (error) {
            console.log("contract call failure", error)
        }

    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaign = campaigns.map((campaign) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image

        }))
        return parsedCampaign;

    }

    const getUsersCampaign = async () => {
        const allCampaigns = await getCampaigns();

        const filterCampaign = allCampaigns.filter((campaign) =>
            campaign.owner === address
        );

        return filterCampaign;
    }
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                getCampaigns,
                getUsersCampaign,
                createCampaign: publishCampaign
            }}
        >

            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);