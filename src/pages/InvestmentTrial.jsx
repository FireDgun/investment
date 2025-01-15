import React, { useEffect, useState } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { useShowBlackScreenForPeriodOfTime } from "../providers/ShowBlackScreenForPeriodOfTimeProvider";
import {
  investmentQuestionFirstPartOmx25,
  investmentQuestionFirstPartSp500,
  // investmentQuestionRequestOmx25,
  // investmentQuestionRequestSp500,
  investmentQuestionSecondPart,
  total as totalWord,
  investmentTrialQuestionTitle,
  investmentTrialQuestionRequestSp500,
  investmentTrialQuestionRequestOmx25,
} from "../content/investmentQuestion";
import { errorTotal100, next } from "../content/generalWords";
import { Box, Button, TextField, Typography } from "@mui/material";
import TrialResults from "./TrialResults";
import { useNavigate } from "react-router-dom";
import BoldTextWithCondition from "../components/BoldTextWithCondition";

export default function InvestmentTrial() {
  const { user } = useLanguage();
  const { lan, type } = user;
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);

  const [data, setData] = useState({ index: 0, riskFree: 0 });

  const [total, setTotal] = useState(0);
  const [error, setError] = useState(true);
  const showBlackScreenForPeriodOfTime = useShowBlackScreenForPeriodOfTime();
  const handleValueChange = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    let newTotal =
      event.target.name === "index"
        ? (parseInt(event.target.value) || 0) + (parseInt(data.riskFree) || 0)
        : (parseInt(data.index) || 0) + (parseInt(event.target.value) || 0);

    setTotal(newTotal);
  };

  useEffect(() => {
    if (data.riskFree !== "" || data.index !== "") {
      setError(total !== 100);
    }
  }, [total]);

  const handleNext = () => {
    setIsFinished(true);
  };

  if (lan === "" && type === "") return null;

  return (
    <>
      {isFinished ? (
        <>
          <TrialResults
            indexPercent={data.index}
            handleContinue={() => {
              navigate("/investmentQuestion/?PROLIFIC_PID=" + user._id, {
                replace: true,
              });
            }}
            indexUpPercent={1.46}
            amountOfMoney={50}
          />
        </>
      ) : (
        <Box sx={{ padding: 3, margin: "auto", maxWidth: 400 }}>
          <Typography>{investmentTrialQuestionTitle[lan]}</Typography>
          <Typography>
            <BoldTextWithCondition
              text={
                type === "Sp500"
                  ? investmentTrialQuestionRequestSp500[lan]
                  : investmentTrialQuestionRequestOmx25[lan]
              }
              lan={lan}
              stock={type}
            />
          </Typography>
          <TextField
            fullWidth
            name="index"
            label={
              type === "Sp500"
                ? investmentQuestionFirstPartSp500[lan]
                : investmentQuestionFirstPartOmx25[lan]
            }
            value={data.index}
            onChange={(e) => {
              // Only allow positive numbers and empty input for correction
              if (e.target.value >= 0 || e.target.value === "") {
                handleValueChange(e);
              }
            }}
            type="number"
            margin="normal"
            slotProps={{
              htmlInput: { min: "0" }, // Enforces minimum in supported browsers
            }}
          />

          <TextField
            fullWidth
            name="riskFree"
            label={investmentQuestionSecondPart[lan]}
            value={data.riskFree}
            onChange={(e) => {
              // Only allow positive numbers and empty input for correction
              if (e.target.value >= 0 || e.target.value === "") {
                handleValueChange(e);
              }
            }}
            type="number"
            margin="normal"
            slotProps={{
              htmlInput: { min: "0" }, // Use this to specify the minimum value
            }}
          />
          <Typography sx={{ mt: 2 }}>
            {totalWord[lan]}: {total || 0}%
          </Typography>
          <Typography color={error ? "error" : "inherit"}>
            {error && errorTotal100[lan]}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                showBlackScreenForPeriodOfTime(500);
                handleNext();
              }}
              disabled={error || total === 0}
              sx={{ my: 3 }}
            >
              {next[lan]}
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
