import React from "react";
import { explanation, opening } from "../content/mainPage";
import { useLanguage } from "../providers/LanguageProvider";
import { Button, Paper, Typography } from "@mui/material";
import { next } from "../content/generalWords";
import { Navigate, useNavigate } from "react-router-dom";
import { adminData } from "../adminConfig";

export default function WelcomePage() {
  const { user } = useLanguage();
  const { lan } = user;
  const nav = useNavigate();
  if (lan === "") return null;

  if (user._id === adminData.userId)
    return <Navigate to={"/dashboard/?PROLIFIC_PID=" + user._id} />;
  return (
    <Paper sx={{ p: 3 }}>
      <Typography>{opening[lan]}</Typography>
      <Typography>{explanation[lan]}</Typography>
      <Button
        onClick={() => nav("/readingQuestions/?PROLIFIC_PID=" + user._id)}
        variant="contained"
      >
        {next[lan]}
      </Button>
    </Paper>
  );
}
