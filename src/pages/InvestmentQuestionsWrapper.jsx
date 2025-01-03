import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import InvestmentQuestion from "./InvestmentQuestion"; // Adjust path as necessary
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../providers/LanguageProvider";
import { approveAndContinue, month } from "../content/generalWords";

const monthsIndexUpPercent = [
  3.58, 5.24, -3.14, 4.53, -1.11, 1.31, 3.71, -5.26, 10.75, -6.58, 1.46, 1.84,
];

export default function InvestmentQuestionsWrapper() {
  const months = 12;
  const [currentMonth, setCurrentMonth] = useState(0); // Start at month 1
  const { user, setUser } = useLanguage();
  const { lan } = user;
  const [amountOfMoney, setAmountOfMoney] = useState(50);
  const [isFinished, setIsFinished] = useState(false);

  const [data, setData] = useState(
    Array(months).fill({ index: 0, riskFree: 0 })
  );
  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    setData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleNext = (newAmountOfMoney) => {
    setAmountOfMoney(newAmountOfMoney);
    if (currentMonth < months - 1) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // const handlePrevious = () => {
  //   if (currentMonth > 0) {
  //     setCurrentMonth(currentMonth - 1);
  //   }
  // };

  const handleSubmit = () => {
    console.log(data); // Handle final submission
    const obj = {};
    data.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        obj[key + (index + 1)] = item[key];
      });
    });
    setUser((prev) => ({ ...prev, ...obj }));
    navigate("/moreQuestions/?PROLIFIC_PID=" + user._id);
  };
  if (lan === "") return null;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {month[lan]} {currentMonth + 1} / {months}
      </Typography>
      <InvestmentQuestion
        month={currentMonth + 1}
        data={data[currentMonth]}
        onChange={handleChange}
        handleNext={handleNext}
        months={months}
        currentMonth={currentMonth}
        indexUpPercent={monthsIndexUpPercent[currentMonth]}
        amountOfMoney={amountOfMoney}
        isFinished={isFinished}
        setIsFinished={setIsFinished}
      />

      {currentMonth === months - 1 &&
        isFinished &&
        parseInt(data[data.length - 1].index) +
          parseInt(data[data.length - 1].riskFree) ===
          100 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            fullWidth
          >
            {approveAndContinue[lan]}
          </Button>
        )}
    </Box>
  );
}
