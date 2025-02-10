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
import {
  allTheTime,
  approveAndContinue,
  continuously,
  difficult,
  easy,
  female,
  languages,
  male,
  never,
  notAtAll,
  opinions,
  other,
  veryDifficult,
  veryEasy,
  veryMuch,
  yesNo,
} from "../content/generalWords";

export default function PersonalQuestions({ handleNavigation }) {
  const { user, setUser } = useLanguage();
  const { lan, type } = user;
  // State setup for form data
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    stockMarketExperience: "",
    prideAsAmerican: "",
    familiarityWithIndex: "",
    easeOfPronunciationIndex: "",
    followingPerformanceIndex: "",
    processingQuestion: "",
    mustChooseSomewhatAgree: "",
    fluentSpanish: "",
    nativeLanguage: "",
  });

  // Handle input changes for all form fields
  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    setUser((prev) => ({ ...prev, ...formData }));
    window.removeEventListener("beforeunload", handleNavigation);

    window.location =
      "https://app.prolific.com/submissions/complete?cc=C1HBF9IF";
    //nav("/thankYou/?PROLIFIC_PID=" + user._id, { replace: true });
    // Further processing can be done here
  };
  if (lan === "" && type === "") return null;

  return (
    <Box sx={{ margin: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">{surveyIntroduction[lan]}</Typography>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions.processingQuestion[lan]}
        </FormLabel>
        <RadioGroup
          row
          name="processingQuestion"
          value={formData.processingQuestion}
          onChange={handleChange("processingQuestion")}
        >
          {[...Array(7)].map((_, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {index === 0 ? (
                    <span style={{ display: "block" }}>{easy[lan]}</span>
                  ) : (
                    ""
                  )}
                  {index === 6 ? (
                    <span style={{ display: "block" }}>{difficult[lan]}</span>
                  ) : (
                    ""
                  )}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

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
          {[...Array(5)].map((_, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {index === 0 ? (
                    <span style={{ display: "block" }}>{never[lan]}</span>
                  ) : (
                    ""
                  )}
                  {index === 4 ? (
                    <span style={{ display: "block" }}>{allTheTime[lan]}</span>
                  ) : (
                    ""
                  )}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

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
          {[...Array(7)].map((_, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {index === 0 ? (
                    <span style={{ display: "block" }}>{notAtAll[lan]}</span>
                  ) : (
                    ""
                  )}
                  {index === 6 ? (
                    <span style={{ display: "block" }}>{veryMuch[lan]}</span>
                  ) : (
                    ""
                  )}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

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
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {index === 0 ? (
                    <span style={{ display: "block" }}>{notAtAll[lan]}</span>
                  ) : (
                    ""
                  )}
                  {index === 6 ? (
                    <span style={{ display: "block" }}>{veryMuch[lan]}</span>
                  ) : (
                    ""
                  )}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

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
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {index === 0 ? (
                    <span style={{ display: "block" }}>
                      {veryDifficult[lan]}
                    </span>
                  ) : (
                    ""
                  )}
                  {index === 6 ? (
                    <span style={{ display: "block" }}>{veryEasy[lan]}</span>
                  ) : (
                    ""
                  )}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

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
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {index === 0 ? (
                    <span style={{ display: "block" }}>{notAtAll[lan]}</span>
                  ) : (
                    ""
                  )}
                  {index === 6 ? (
                    <span style={{ display: "block" }}>
                      {continuously[lan]}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions["mustChooseSomewhatAgree"][lan]}
        </FormLabel>
        <RadioGroup
          row
          name="mustChooseSomewhatAgree"
          value={formData.mustChooseSomewhatAgree}
          onChange={handleChange("mustChooseSomewhatAgree")}
        >
          {opinions[lan].map((opinion, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {opinion}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions["nativeLanguage"][lan]}
        </FormLabel>
        <RadioGroup
          row
          name="nativeLanguage"
          value={formData.nativeLanguage}
          onChange={handleChange("nativeLanguage")}
        >
          {languages[lan].map((option, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {option}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">
          {questions["fluentSpanish"][lan]}
        </FormLabel>
        <RadioGroup
          row
          name="fluentSpanish"
          value={formData.fluentSpanish}
          onChange={handleChange("fluentSpanish")}
        >
          {yesNo[lan].map((option, index) => (
            <FormControlLabel
              key={index}
              value={index + 1}
              control={<Radio />}
              labelPlacement="bottom"
              label={
                <span
                  style={{
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {index + 1}
                  <br />
                  {option}
                </span>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>

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
