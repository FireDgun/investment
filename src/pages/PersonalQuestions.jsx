import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { surveyIntroduction, questions } from "../content/results"; // Update the path to your content objects
import { useLanguage } from "../providers/LanguageProvider"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import {
  allTheTime,
  approveAndContinue,
  continuously,
  female,
  male,
  never,
  notAtAll,
  other,
  veryDifficult,
  veryEasy,
  veryMuch,
} from "../content/generalWords";

export default function PersonalQuestions() {
  const { user, setUser } = useLanguage();
  const { lan, type } = user;
  const nav = useNavigate();
  // State setup for form data
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    stockMarketExperience: "",
    prideAsAmerican: "",
    familiarityWithIndex: "",
    easeOfPronunciationIndex: "",
    followingPerformanceIndex: "",
  });

  // Handle input changes for all form fields
  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    setUser((prev) => ({ ...prev, ...formData }));
    nav("/thankYou/?PROLIFIC_PID=" + user._id);
    // Further processing can be done here
  };
  if (lan === "" && type === "") return null;

  return (
    <Box sx={{ margin: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">{surveyIntroduction[lan]}</Typography>

      {/* Gender Question */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">{questions.gender[lan]}</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange("gender")}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={male[lan]}
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={female[lan]}
          />
          <FormControlLabel
            value="other"
            control={<Radio />}
            label={other[lan]}
          />
        </RadioGroup>
      </FormControl>

      {/* Age Question */}
      <TextField
        label={questions.age[lan]}
        value={formData.age}
        onChange={handleChange("age")}
        type="number"
        fullWidth
        sx={{ mt: 2 }}
      />

      {/* Stock Market Experience Question */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions.stockMarketExperience[lan]}
        </FormLabel>
        <RadioGroup
          row
          name="stockMarketExperience"
          value={formData.stockMarketExperience}
          onChange={handleChange("stockMarketExperience")}
        >
          <FormControlLabel value="1" control={<Radio />} label={never[lan]} />
          <FormControlLabel value="2" control={<Radio />} />
          <FormControlLabel value="3" control={<Radio />} />
          <FormControlLabel value="4" control={<Radio />} />
          <FormControlLabel
            value="5"
            control={<Radio />}
            label={allTheTime[lan]}
          />
        </RadioGroup>
      </FormControl>

      {/* Pride as an American Question */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions.prideAsAmerican[lan]}
        </FormLabel>
        <RadioGroup
          row
          name="prideAsAmerican"
          value={formData.prideAsAmerican}
          onChange={handleChange("prideAsAmerican")}
        >
          {/* Generate radio buttons for options 1 to 7 */}
          {[...Array(7)].map((_, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              label={
                index +
                1 +
                " " +
                (index === 0 ? notAtAll[lan] : "") +
                (index === 6 ? veryMuch[lan] : "")
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Familiarity with S&P 500 Question */}
      <FormControl component="fieldset">
        <FormLabel component="legend">
          {questions["familiarityWith" + type][lan]}
        </FormLabel>
        <RadioGroup
          row
          name="familiarityWithIndex"
          value={formData.familiarityWithIndex}
          onChange={handleChange("familiarityWithIndex")}
        >
          {[...Array(7)].map((_, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              label={
                index +
                1 +
                " " +
                (index === 0 ? notAtAll[lan] : "") +
                (index === 6 ? veryMuch[lan] : "")
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Ease of Pronunciation S&P 500 Question */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions["easeOfPronunciation" + type][lan]}
        </FormLabel>
        <RadioGroup
          row
          name="easeOfPronunciationIndex"
          value={formData.easeOfPronunciationIndex}
          onChange={handleChange("easeOfPronunciationIndex")}
        >
          {[...Array(7)].map((_, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              label={
                index +
                1 +
                " " +
                (index === 0 ? veryDifficult[lan] : "") +
                (index === 6 ? veryEasy[lan] : "")
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Following S&P 500 Performance Question */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions["followingPerformance" + type][lan]}
        </FormLabel>
        <RadioGroup
          row
          name="followingPerformanceIndex"
          value={formData.followingPerformanceIndex}
          onChange={handleChange("followingPerformanceIndex")}
        >
          {[...Array(7)].map((_, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              label={
                index +
                1 +
                " " +
                (index === 0 ? notAtAll[lan] : "") +
                (index === 6 ? continuously[lan] : "")
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Submit Button */}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={
            formData.gender === "" ||
            formData.age === "" ||
            formData.stockMarketExperience === "" ||
            formData.prideAsAmerican === "" ||
            formData.familiarityWithIndex === "" ||
            formData.easeOfPronunciationIndex === "" ||
            formData.followingPerformanceIndex === ""
          }
        >
          {approveAndContinue[lan]}
        </Button>
      </Box>
    </Box>
  );
}
