import React, { useEffect, useState } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { Navigate } from "react-router-dom";
import { getUsers } from "../services/firestoreService";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { adminData } from "../adminConfig";

export default function Dashboard() {
  const { user } = useLanguage();
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user._id === adminData.userId && isLoggedIn) {
      const initialData = async () => {
        let result = await getUsers();
        setData(result);
      };
      initialData();
    }
  }, [user, isLoggedIn]);

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "type", headerName: "Type", width: 110 },
    { field: "gender", headerName: "Gender", width: 110 },
    { field: "age", headerName: "Age", width: 110 },
    { field: "lan", headerName: "Language", width: 130 },
    {
      field: "stockMarketExperience",
      headerName: "Stock Market Experience",
      width: 230,
    },
    {
      field: "familiarityWithIndex",
      headerName: "Familiarity with Index",
      width: 230,
    },
    {
      field: "easeOfPronunciationIndex",
      headerName: "Ease of Pronunciation Index",
      width: 260,
    },
    { field: "prideAsAmerican", headerName: "Pride as American", width: 180 },
    {
      field: "followingPerformanceIndex",
      headerName: "Following Performance Index",
      width: 260,
    },
    {
      field: "isCorrectReadingAnswer1",
      headerName: "Is Correct Reading Answer 1",
      width: 240,
    },
    { field: "readingAnswer1", headerName: "Reading Answer 1", width: 180 },
    {
      field: "isCorrectReadingAnswer2",
      headerName: "Is Correct Reading Answer 2",
      width: 240,
    },
    { field: "readingAnswer2", headerName: "Reading Answer 2", width: 180 },
    ...Array.from({ length: 12 }, (_, i) => ({
      field: `riskFree${i + 1}`,
      headerName: `Risk Free ${i + 1}`,
      width: 140,
    })),
    ...Array.from({ length: 12 }, (_, i) => ({
      field: `index${i + 1}`,
      headerName: `Index ${i + 1}`,
      width: 140,
    })),
  ];

  const exportToExcel = () => {
    // Define the column order based on your previous setup
    const columnOrder = [
      "_id",
      "type",
      "gender",
      "age",
      "lan",
      "stockMarketExperience",
      "familiarityWithIndex",
      "easeOfPronunciationIndex",
      "prideAsAmerican",
      "followingPerformanceIndex",
      "isCorrectReadingAnswer1",
      "readingAnswer1",
      "isCorrectReadingAnswer2",
      "readingAnswer2",
      ...Array.from({ length: 12 }, (_, i) => `riskFree${i + 1}`),
      ...Array.from({ length: 12 }, (_, i) => `index${i + 1}`),
    ];

    // Map data to the specified order
    const orderedData = data.map((row) => {
      const orderedRow = {};
      columnOrder.forEach((key) => {
        orderedRow[key] = row[key] || ""; // Use an empty string for undefined values
      });
      return orderedRow;
    });

    // Convert ordered JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(orderedData, {
      header: columnOrder, // Ensure headers are in the specified order
      skipHeader: false, // Don't skip the header because we want it in our Excel file
    });

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Write the workbook to a file
    XLSX.writeFile(wb, "data.xlsx");
  };

  if (user._id !== adminData.userId)
    return <Navigate replace to={"/?PROLIFIC_PID=" + user._id} />;

  return (
    <>
      {isLoggedIn ? (
        <Box>
          <Button onClick={exportToExcel} variant="contained" color="primary">
            Export to Excel
          </Button>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
          />
        </Box>
      ) : (
        <Container>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            label="Email"
            fullWidth
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            label="Password"
            type="password"
            fullWidth
          />
          <Button
            onClick={() => {
              if (
                password === adminData.userPassword &&
                email === adminData.userEmail
              ) {
                setIsLoggedIn(true);
              } else {
                setError("Invalid attempt");
              }
            }}
          >
            Log in
          </Button>
          {error && <Typography>{error}</Typography>}
        </Container>
      )}
    </>
  );
}
