import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useLanguage } from "../providers/LanguageProvider"; // Adjust the import path as necessary
import { pressToContinue, resultsDescription } from "../content/results";

export default function Results() {
  const navigate = useNavigate();
  const { user } = useLanguage();
  const { lan } = user;
  const handleContinue = () => {
    navigate("/moreQuestions/?PROLIFIC_PID=" + user._id);
  };
  if (lan === "") return null;

  return (
    <Box sx={{ margin: 4 }}>
      <Typography variant="h6">{resultsDescription[lan]}</Typography>
      <Button onClick={handleContinue} sx={{ marginTop: 2 }}>
        {pressToContinue[lan]}
      </Button>
    </Box>
  );
}
