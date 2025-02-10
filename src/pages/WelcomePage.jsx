import React, { useState } from "react";
import { explanation, opening } from "../content/mainPage";
import { useLanguage } from "../providers/LanguageProvider";
import { Button, Paper, Typography } from "@mui/material";
import { next } from "../content/generalWords";
import { Navigate, useNavigate } from "react-router-dom";
import { adminData } from "../adminConfig";
import WriteDogInEnglish from "./WriteDogInEnglish";

export default function WelcomePage({ handleNavigation }) {
  const [isAskDogOpen, setIsAskDogOpen] = useState(true);
  const { user } = useLanguage();
  const { lan } = user;
  const nav = useNavigate();
  if (lan === "") return null;

  if (user._id === adminData.userId)
    return <Navigate to={"/dashboard/?PROLIFIC_PID=" + user._id} replace />;
  return (
    <Paper sx={{ p: 3 }}>
      {isAskDogOpen ? (
        <WriteDogInEnglish
          setIsAskDogOpen={setIsAskDogOpen}
          handleNavigation={handleNavigation}
        />
      ) : (
        <>
          <Typography>{opening[lan]}</Typography>
          <Typography>{explanation[lan]}</Typography>
          <Button
            onClick={() =>
              nav("/readingQuestions/?PROLIFIC_PID=" + user._id, {
                replace: true,
              })
            }
            variant="contained"
            sx={{ my: 3 }}
          >
            {next[lan]}
          </Button>
        </>
      )}
    </Paper>
  );
}
