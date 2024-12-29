import React, { useEffect, useState } from "react";
import { Typography, TextField, Box, Button } from "@mui/material";
import { useLanguage } from "../providers/LanguageProvider";
import {
  investmentQuestionTitle,
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
} from "../content/generalWords";

export default function InvestmentQuestion({
  month,
  data,
  onChange,
  handleNext,
  handlePrevious,
  currentMonth,
  months,
}) {
  const { user } = useLanguage();
  const { lan, type } = user;
  const { spIndex, riskFree } = data;
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(true);

  const handleValueChange = (event) => {
    onChange(month - 1, event.target.name, event.target.value);

    let newTotal =
      event.target.name === "spIndex"
        ? (parseInt(event.target.value) || 0) + (parseInt(riskFree) || 0)
        : (parseInt(spIndex) || 0) + (parseInt(event.target.value) || 0);

    setTotal(newTotal);
  };

  useEffect(() => {
    if (riskFree !== "" || spIndex !== "") {
      setError(total !== 100);
    }
  }, [total]);

  useEffect(() => {
    setTotal((parseInt(riskFree) || 0) + (parseInt(spIndex) || 0));
  }, [currentMonth]);

  if (lan === "" && type === "") return null;

  return (
    <Box sx={{ padding: 3, margin: "auto", maxWidth: 400 }}>
      <Typography variant="h6">
        {monthText[lan]} {month}: {investmentQuestionTitle[lan]}
      </Typography>
      <Typography variant="body1">
        {type === "Sp500"
          ? investmentQuestionRequestSp500[lan]
          : investmentQuestionRequestOmx25[lan]}
      </Typography>
      <TextField
        fullWidth
        name="spIndex"
        label={
          type === "Sp500"
            ? investmentQuestionFirstPartSp500[lan]
            : investmentQuestionFirstPartOmx25[lan]
        }
        value={spIndex}
        onChange={handleValueChange}
        type="number"
        margin="normal"
      />
      <TextField
        fullWidth
        name="riskFree"
        label={investmentQuestionSecondPart[lan]}
        value={riskFree}
        onChange={handleValueChange}
        type="number"
        margin="normal"
      />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {totalWord[lan]}: {total || 0}%
      </Typography>
      <Typography variant="body2" color={error ? "error" : "inherit"}>
        {error && errorTotal100[lan]}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            handlePrevious();
          }}
          disabled={currentMonth === 0 || error || total === 0}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleNext();
          }}
          disabled={currentMonth === months - 1 || error || total === 0}
        >
          {next[lan]}
        </Button>
      </Box>
    </Box>
  );
}
