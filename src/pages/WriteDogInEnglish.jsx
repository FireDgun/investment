import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useLanguage } from "../providers/LanguageProvider";

function WriteDogInEnglish({ setIsAskDogOpen, handleNavigation }) {
  const [inputValue, setInputValue] = useState("");
  const [iDontSpeakSpanish, setIDontSpeakSpanish] = useState(false);

  const { setUser } = useLanguage();

  const handleSubmit = () => {
    console.log("User input:", inputValue);
    console.log("Checkbox value:", iDontSpeakSpanish);
    setUser((prev) => ({
      ...prev,
      writeDogInEnglish: inputValue,
      iDontSpeakSpanish, // store checkbox state as well
      startTime:
        new Date().toLocaleDateString() + "|" + new Date().toLocaleTimeString(),
    }));
    if (iDontSpeakSpanish || inputValue.trim() !== "dog") {
      window.removeEventListener("beforeunload", handleNavigation);

      window.location =
        "https://app.prolific.com/submissions/complete?cc=C1338ELP";
    } else {
      setIsAskDogOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body1">
        Traducir la palabra "perro" al inglés.
      </Typography>

      <TextField
        label="Escribe aquí"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* New checkbox in English */}
      <FormControlLabel
        control={
          <Checkbox
            checked={iDontSpeakSpanish}
            onChange={(e) => setIDontSpeakSpanish(e.target.checked)}
            color="primary"
          />
        }
        label="I don’t speak Spanish"
      />

      <Button variant="contained" onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  );
}

export default WriteDogInEnglish;
