import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useLanguage } from "../providers/LanguageProvider";
import {
  ResultStartOmx25,
  ResultStartSp500,
  resultSummary,
  summaryLastMonth,
  trialResult,
  trialResultStartOmx25,
  trialResultStartSp500,
  trialSummary,
} from "../content/investmentQuestion";
import {
  month,
  next,
  numberInWords,
  resultsOfInvestment,
} from "../content/generalWords";

export default function TrialResults({
  indexPercent,
  handleContinue,
  indexUpPercent,
  amountOfMoney,
  isTrial = true,
  monthIndex = 1,
}) {
  const { user } = useLanguage();
  const { lan, type } = user;
  return (
    <Container>
      <Typography>
        {type === "Sp500"
          ? isTrial
            ? trialResultStartSp500[lan]
            : ResultStartSp500[lan] +
              numberInWords[monthIndex][lan] +
              " " +
              month[lan] +
              ": " +
              indexUpPercent +
              "%"
          : isTrial
          ? trialResultStartOmx25[lan]
          : ResultStartOmx25[lan] +
            numberInWords[monthIndex][lan] +
            " " +
            month[lan] +
            ": " +
            indexUpPercent +
            "%"}
      </Typography>
      <Typography>
        {resultsOfInvestment[lan]}
        {(indexUpPercent * indexPercent + 0.37 * (100 - indexPercent)) /
          100 /
          100 >
        0
          ? "+"
          : ""}{" "}
        {(
          amountOfMoney *
          ((indexUpPercent * indexPercent + 0.37 * (100 - indexPercent)) /
            100 /
            100)
        ).toFixed(2)}
      </Typography>
      {isTrial && (
        <Typography>
          {trialResult[lan]}
          {(
            (indexUpPercent * indexPercent + 0.37 * (100 - indexPercent)) /
            100
          ).toFixed(2) + "%"}
        </Typography>
      )}
      <Typography>
        {isTrial ? trialSummary[lan] : resultSummary[lan]}{" "}
        {(
          amountOfMoney *
          (1 +
            (indexUpPercent * indexPercent + 0.37 * (100 - indexPercent)) /
              100 /
              100)
        ).toFixed(2)}
      </Typography>
      {!isTrial && monthIndex === 11 && (
        <Typography>
          {summaryLastMonth[lan]}
          {Math.max(amountOfMoney - 45, 0).toFixed(2)}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {monthIndex !== 11 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleContinue(
                amountOfMoney *
                  (1 +
                    (indexUpPercent * indexPercent +
                      0.37 * (100 - indexPercent)) /
                      100 /
                      100)
              );
            }}
            sx={{ my: 3 }}
          >
            {next[lan]}
          </Button>
        )}
      </Box>
    </Container>
  );
}
