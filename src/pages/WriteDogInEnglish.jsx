import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useLanguage } from "../providers/LanguageProvider";

function WriteDogInEnglish({ setIsAskDogOpen }) {
  const [inputValue, setInputValue] = useState("");
  const { setUser } = useLanguage();

  const handleSubmit = () => {
    // Handle the submit action here
    console.log("User input:", inputValue);
    setUser((prev) => ({
      ...prev,
      writeDogInEnglish: inputValue,
    }));
    setIsAskDogOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="body1">
        Para asegurarnos de que entiendes español, por favor escribe la palabra
        "dog" (en inglés).
      </Typography>

      <TextField
        label="Escribe aquí"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  );
}

export default WriteDogInEnglish;
