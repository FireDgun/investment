import React from "react";

export default function BoldTextWithCondition({ text, lan, stock }) {
  const substring =
    stock === "Sp500"
      ? lan === "english"
        ? "U.S stock index (S&P 500)"
        : "índice bursátil de EE.UU. (S&P 500)"
      : lan === "english"
      ? "Finland's index (OMX Helsinki 25)"
      : "índice de Finlandia (OMX Helsinki 25)";

  // Function to split text and wrap the substring with <b> tags
  const getHighlightedText = (text, substring) => {
    // Split the text on the substring using a case-insensitive regular expression
    const parts = text.split(substring);
    const partsWithSubstring = [];
    if (text.includes(substring)) {
      parts.forEach((element, index) => {
        if (index % 2 === 1) {
          partsWithSubstring.push(substring);
        }
        partsWithSubstring.push(element);
      });
    }

    return (
      <>
        {partsWithSubstring.map((part, index) =>
          // Apply bold style if the part matches the substring
          part.toLowerCase() === substring.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return <>{getHighlightedText(text, substring)}</>;
}
