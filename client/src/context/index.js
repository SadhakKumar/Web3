import React, { useContect, createContext } from "react";

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const contract = useContect('0xc2D1D198F7C37a818aDec62E7146ad0b1EBf7978')
}