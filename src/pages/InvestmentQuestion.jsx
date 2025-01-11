import React, { useEffect, useState } from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import { useLanguage } from "../providers/LanguageProvider";
import {
  // investmentQuestionTitle,
  investmentQuestionRequestSp500,
  investmentQuestionRequestOmx25,
  investmentQuestionFirstPartSp500,
  investmentQuestionFirstPartOmx25,
  investmentQuestionSecondPart,
  total as totalWord,
} from "../content/investmentQuestion";
import {
  errorTotal100,
  month as monthText,
  next,
  numberInWords,
} from "../content/generalWords";
import { useShowBlackScreenForPeriodOfTime } from "../providers/ShowBlackScreenForPeriodOfTimeProvider";
import TrialResults from "./TrialResults";
import BoldTextWithCondition from "../components/BoldTextWithcondtion";

export default function InvestmentQuestion({
  month,
  data,
  onChange,
  handleNext,
  currentMonth,
  // months,
  indexUpPercent,
  amountOfMoney,
  isFinished,
  setIsFinished,
}) {
  const { user } = useLanguage();
  const { lan, type } = user;
  const { index, riskFree } = data;
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(true);
  const showBlackScreenForPeriodOfTime = useShowBlackScreenForPeriodOfTime();

  const handleValueChange = (event) => {
    onChange(month - 1, event.target.name, event.target.value);

    let newTotal =
      event.target.name === "index"
        ? (parseInt(event.target.value) || 0) + (parseInt(riskFree) || 0)
        : (parseInt(index) || 0) + (parseInt(event.target.value) || 0);

    setTotal(newTotal);
  };

  useEffect(() => {
    if (riskFree !== "" || index !== "") {
      setError(total !== 100);
    }
  }, [total]);

  useEffect(() => {
    setTotal((parseInt(riskFree) || 0) + (parseInt(index) || 0));
  }, [currentMonth]);

  const onNext = () => {
    setIsFinished(true);
  };

  if (lan === "" && type === "") return null;

  return (
    <>
      {isFinished ? (
        <>
          <TrialResults
            indexPercent={index}
            handleContinue={(newAmount) => {
              handleNext(newAmount);
              setIsFinished(false);
            }}
            indexUpPercent={indexUpPercent}
            amountOfMoney={amountOfMoney}
            isTrial={false}
            monthIndex={currentMonth}
          />
        </>
      ) : (
        <Box sx={{ padding: 3, margin: "auto", maxWidth: 400 }}>
          {/* <Typography>
            {monthText[lan]} {month}: {investmentQuestionTitle[lan]}
          </Typography> */}
          <Typography>
            <BoldTextWithCondition
              text={
                type === "Sp500"
                  ? investmentQuestionRequestSp500[lan]
                  : investmentQuestionRequestOmx25[lan]
              }
              lan={lan}
              stock={type}
            />
            {numberInWords[month - 1][lan]} {monthText[lan]}
          </Typography>
          <TextField
            fullWidth
            name="index"
            label={
              type === "Sp500"
                ? investmentQuestionFirstPartSp500[lan]
                : investmentQuestionFirstPartOmx25[lan]
            }
            value={index}
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
            value={riskFree}
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
            {
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  showBlackScreenForPeriodOfTime(500);
                  onNext();
                }}
                disabled={error || total === 0}
                sx={{ my: 3 }}
              >
                {next[lan]}
              </Button>
            }
          </Box>
        </Box>
      )}
    </>
  );
}
