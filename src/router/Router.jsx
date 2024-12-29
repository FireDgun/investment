import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import WelcomePage from "../pages/WelcomePage";
import ReadingQuestions from "../pages/ReadingQuestions";
import InvestmentInstructions from "../pages/InvestmentInstructions";
import InvestmentQuestion from "../pages/InvestmentQuestion";
import InvestmentQuestionsWrapper from "../pages/InvestmentQuestionsWrapper";
import Results from "../pages/Results";
import PersonalQuestions from "../pages/PersonalQuestions";
import ThankYou from "../pages/ThankYou";
import { useLanguage } from "../providers/LanguageProvider";
import Dashboard from "../pages/Dashboard";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/readingQuestions" element={<ReadingQuestions />} />
      <Route
        path="/investmentInstructions"
        element={<InvestmentInstructions />}
      />
      <Route
        path="/investmentQuestion"
        element={<InvestmentQuestionsWrapper />}
      />

      <Route path="/results" element={<Results />} />
      <Route path="/moreQuestions" element={<PersonalQuestions />} />
      <Route path="/thankYou" element={<ThankYou />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
