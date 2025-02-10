import { Routes, Route } from "react-router-dom";

import React from "react";
import WelcomePage from "../pages/WelcomePage";
import ReadingQuestions from "../pages/ReadingQuestions";
import InvestmentInstructions from "../pages/InvestmentInstructions";
import InvestmentQuestionsWrapper from "../pages/InvestmentQuestionsWrapper";
import Results from "../pages/Results";
import PersonalQuestions from "../pages/PersonalQuestions";
import ThankYou from "../pages/ThankYou";
import Dashboard from "../pages/Dashboard";
import InvestmentTrial from "../pages/InvestmentTrial";
import useConfirmNavigation from "../hooks/useConfirmNavigation";
export default function Router() {
  const { handleNavigation } = useConfirmNavigation();

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route
        path="/readingQuestions"
        element={<ReadingQuestions handleNavigation={handleNavigation} />}
      />
      <Route
        path="/investmentInstructions"
        element={<InvestmentInstructions />}
      />
      <Route path="/investmentQuestionTrial" element={<InvestmentTrial />} />
      <Route
        path="/investmentQuestion"
        element={<InvestmentQuestionsWrapper />}
      />

      <Route path="/results" element={<Results />} />
      <Route
        path="/moreQuestions"
        element={<PersonalQuestions handleNavigation={handleNavigation} />}
      />
      <Route path="/thankYou" element={<ThankYou />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
