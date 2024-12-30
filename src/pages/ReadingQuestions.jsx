import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Paper,
  Box,
} from "@mui/material";
import {
  text,
  question1,
  question1Answers,
  question2,
  question2Answers,
} from "../content/readingQuestions";
import { useLanguage } from "../providers/LanguageProvider";
import { useNavigate } from "react-router-dom";
import { approveAndContinue } from "../content/generalWords";

export default function ReadingQuestions() {
  const [selectedAnswer1, setSelectedAnswer1] = useState("");
  const [selectedAnswer2, setSelectedAnswer2] = useState("");
  const { user, setUser } = useLanguage();
  const lan = "spanish";
  const nav = useNavigate();
  const handleRadioChange1 = (event) => {
    setSelectedAnswer1(event.target.value);
  };

  const handleRadioChange2 = (event) => {
    setSelectedAnswer2(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect1 = parseInt(selectedAnswer1) === question1Answers.correct;
    const isCorrect2 = parseInt(selectedAnswer2) === question2Answers.correct;
    // You can handle the user response here, perhaps by displaying a message
    setUser((prev) => ({
      ...prev,
      readingAnswer1: selectedAnswer1,
      readingAnswer2: selectedAnswer2,
      isCorrectReadingAnswer1: isCorrect1,
      isCorrectReadingAnswer2: isCorrect2,
    }));
    nav("/investmentInstructions/?PROLIFIC_PID=" + user._id);
  };
  if (lan === "") return null;

  return (
    <Paper sx={{ p: 3 }}>
      <h3>{text[lan]}</h3>
      <Box sx={{ display: "flex" }}>
        <FormControl component="fieldset" sx={{ mr: 5 }}>
          <FormLabel component="legend">{question1[lan]}</FormLabel>
          <RadioGroup
            name="question1"
            value={selectedAnswer1}
            onChange={handleRadioChange1}
          >
            {question1Answers[lan].map((answer, index) => (
              <FormControlLabel
                value={index.toString()}
                control={<Radio />}
                label={answer}
                key={index}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">{question2[lan]}</FormLabel>
          <RadioGroup
            name="question2"
            value={selectedAnswer2}
            onChange={handleRadioChange2}
          >
            {question2Answers[lan].map((answer, index) => (
              <FormControlLabel
                value={index.toString()}
                control={<Radio />}
                label={answer}
                key={index}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={selectedAnswer2 === "" && selectedAnswer1 === ""}
      >
        {approveAndContinue[lan]}
      </Button>
    </Paper>
  );
}
