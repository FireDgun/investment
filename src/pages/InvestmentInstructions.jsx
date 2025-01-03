import React from "react";
import {
  Typography,
  Box,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Container,
  Button,
} from "@mui/material";
import {
  explanationStart,
  explanationMiddleBold,
  explanationEnd,
  forEample,
  example1,
  example2,
  partAStart,
  partAMiddleBoldSp500,
  partAMiddleBoldOmx25,
  tableTitleSp500,
  tableTitleOmx25,
  graphTitleSp500,
  graphTitleOmx25,
  underTheGraphStartSp500,
  underTheGraphStartOmx25,
  underTheGraphMiddleBoldSp500,
  underTheGraphMiddleBoldOmx25,
  underTheGraphEnd,
  partAEndSp500,
  partAEndOmx25,
} from "../content/investmentInstructions"; // Adjust the path as necessary
import { useLanguage } from "../providers/LanguageProvider";
import { useNavigate } from "react-router-dom";
import { next, statistic, value } from "../content/generalWords";

export default function InvestmentInstructions() {
  const { user } = useLanguage();
  const { lan, type } = user;
  const nav = useNavigate();
  const statisticsData = {
    MeanAnnualReturn: "14.22%",
    AnnualStandardDeviation: "18.26%",
    MaximumMonthlyReturn: "12.68%",
    MinimumMonthlyReturn: "-12.51%",
  };
  if (lan === "" && type === "") return null;
  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5">{explanationStart[lan]}</Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {explanationMiddleBold[lan]}
        </Typography>
        <Typography variant="body1">{explanationEnd[lan]}</Typography>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="h6">{forEample[lan]}</Typography>
        <Typography variant="body1">{example1[lan]}</Typography>
        <Typography variant="body1">{example2[lan]}</Typography>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="body1">{partAStart[lan]}</Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {type === "Sp500"
            ? partAMiddleBoldSp500[lan]
            : partAMiddleBoldOmx25[lan]}
        </Typography>
        <Typography variant="body1">
          {type === "Sp500" ? partAEndSp500[lan] : partAEndOmx25[lan]}
        </Typography>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="subtitle1">
          {type === "Sp500" ? tableTitleSp500[lan] : tableTitleOmx25[lan]}
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{statistic[lan]}</TableCell>
                <TableCell align="right">{value[lan]}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(statisticsData).map(([key, value]) => (
                <TableRow
                  key={key}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {key.replace(/([A-Z])/g, " $1").trim()}{" "}
                    {/* Add spaces before capital letters */}
                  </TableCell>
                  <TableCell align="right">{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ margin: "20px 0" }} />
        <Typography variant="subtitle2">
          {type === "Sp500" ? graphTitleSp500[lan] : graphTitleOmx25[lan]}
        </Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/graph.png" />
        </Container>
        <Typography variant="body1">
          {type === "Sp500"
            ? underTheGraphStartSp500[lan]
            : underTheGraphStartOmx25[lan]}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {type === "Sp500"
            ? underTheGraphMiddleBoldSp500[lan]
            : underTheGraphMiddleBoldOmx25[lan]}
        </Typography>
        <Typography variant="body1">{underTheGraphEnd[lan]}</Typography>
        <Button
          onClick={() =>
            nav("/investmentQuestionTrial/?PROLIFIC_PID=" + user._id)
          }
          variant="contained"
          sx={{ my: 3 }}
        >
          {next[lan]}
        </Button>
      </Paper>
    </Box>
  );
}
