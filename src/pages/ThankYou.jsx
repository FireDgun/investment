import { Paper, Typography } from "@mui/material";
import React from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { thankYouMessage } from "../content/results";

export default function ThankYou() {
  const { user } = useLanguage();
  const { lan } = user;
  if (lan === "") return null;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography>{thankYouMessage[lan]}</Typography>
    </Paper>
  );
}
