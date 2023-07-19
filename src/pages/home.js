import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Input,
} from "@mui/material";

import { toast } from "react-toastify";

import {
  INPUT_TEXT_COLOR,
  BACKGROUND_COLOR,
  BUTTON_COLOR,
} from "../config-global";

import { useSigningClient } from '../contexts/cosmwasm'


export default function Home() {

  const [currentDomainName, setCurrentDomainName] = useState("");
  const [currentBetPrice, setCurrentBetPrice] = useState(0);

  const {
    walletAddress,
    signingClient,
    executeRegister,
    nativeBalance

  } = useSigningClient()


  const handleRegister = async() => {
    console.log("register==>curretnDomainName:", currentDomainName);

    if (currentDomainName.length == 0)
    {
      toast.warning("Domain Name is required");
      return;
    }

    // if (currentBetPrice <= 0) {
    //   toast.warning("Please select price.");
    //   return;
    // }

    if (!signingClient || walletAddress.length === 0) {
      toast.error('Please connect wallet first');
      return
    }
    console.log("nativebalance:", nativeBalance);
    if (nativeBalance < currentBetPrice) {
      toast.error("Insufficient Funds");
      return
    }

    await executeRegister(currentDomainName, 1, "0.1");
    
  }


  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: { sm: "80px", xs: "40px" },
          marginBottom: { sm: "20px", xs: "10px" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            width: "fit-content",
            fontSize: { sm: "90px", xs: "56px" },
            padding: "0 20px",
            color: "white !important",
          }}
        >
          Injective Name Service
        </Typography>

        <Box
          sx={{
            display: "flex",
            marginTop: { sm: "80px", xs: "40px" },
            marginBottom: { sm: "20px", xs: "10px" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            type="text"
            placeholder="Search Domain Name"
            sx={{
              width: { sm: "400px", md:"800px", xs: "200px" },
              height: "40px",
              fontSize: { sm: "20px", xs: "16px" },
              padding: "0 10px",
              border: `1px solid ${INPUT_TEXT_COLOR}`,
              backgroundColor: "transparent",
              color: INPUT_TEXT_COLOR,
              borderRadius: "0px",
              "&::before": {
                display: "none",
              },
              "&::after": {
                display: "none",
              },
            }}
            value={currentDomainName}
            onChange={(e) => setCurrentDomainName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRegister();
              }
            }}
          />

          <Button
            sx={{
              color: BACKGROUND_COLOR,
              background: BUTTON_COLOR,
              ":hover": {
                color: BACKGROUND_COLOR,
                background: BUTTON_COLOR,
              },
              marginLeft: "10px",
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
}
