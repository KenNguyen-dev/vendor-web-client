import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Products = () => {
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  return (
    <div id="header">
      <strong>Danh sách sản phẩm</strong>
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper} elevation={10}>
          <Table>
            <TableHead>
              <TableCell>ID</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Unit</TableCell>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
};

export default Products;
