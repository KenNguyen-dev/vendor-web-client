import React, { useState, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import CSS from "csstype";
import "./index.css";
import Button from "@mui/material/Button";

interface IProducts {
  id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  images: {
    imageUrl: string;
    order: number;
  };
  categoryName: string;
  unit: string;
  brand: {
    id: string;
    name: string;
    logoUrl: string;
  };
}

const deleteButtonStyle: CSS.Properties = {
  fontSize: "1.5vmin",
  color: "white",
  fontWeight: "bold",
  marginBottom: "1vw",
};
const updateButtonStyle = { ...deleteButtonStyle, marginRight: "1vw" };

const Products = () => {
  //this is dummy data
  const rows: IProducts[] = [
    {
      id: "1", //
      name: "Áo trắng", //
      description: "This is áo trắng",
      price: 50000, //
      active: true,
      images: {
        imageUrl:
          "https://ae01.alicdn.com/kf/HTB1I1zGQFXXXXaHXVXXq6xXFXXXk/2017-Summer-white-shirt-men-comfort-linen-shirts-men-long-sleeve-casual-men-shirt-brand-clothes.jpg_Q90.jpg_.webp",
        order: 5,
      },
      categoryName: "Quần áo", //
      unit: "45", //
      brand: {
        id: "Brand ID",
        name: "Adidas",
        logoUrl:
          "https://i.pinimg.com/474x/90/5d/53/905d53cb87333d26e54c9b08cc6083c1--adidas-logo-adidas-brand.jpg",
      },
    },
    {
      id: "2",
      name: "Quần trắng",
      description: "This is quần trắng",
      price: 25000,
      active: false,
      images: {
        imageUrl:
          "https://slyclothing.vn/wp-content/uploads/2021/07/PANT-LAUREL-WHITE-3.jpg",
        order: 3,
      },
      categoryName: "Quần áo",
      unit: "25",
      brand: {
        id: "Brand ID",
        name: "Louis Vuiton",
        logoUrl:
          "data:image/png;base64,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",
      },
    },
  ];

  const image = (url: string) => {
    return <img src={url} style={{ margin: "1px", width: 150, height: 175 }} />;
  };
  const logo = (url: string) => {
    return <img src={url} style={{ margin: "1px", width: 100, height: 100 }} />;
  };

  const Row = (props: { row: IProducts }) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow key={row.id}>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.categoryName}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.price}</TableCell>
          <TableCell>{row.unit}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="warning"
              style={updateButtonStyle}
            >
              Update
            </Button>
            <Button variant="contained" color="error" style={deleteButtonStyle}>
              Delete
            </Button>
          </TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div>
                  <div id="productStatus">Trạng thái: </div>
                  {row.active ? (
                    <CircleIcon color="success" sx={{ fontSize: 10 }} />
                  ) : (
                    <CircleIcon sx={{ color: red[900], fontSize: 10 }} />
                  )}
                </div>
                <br />
                <Grid container spacing={2} style={{ textAlign: "center" }}>
                  <Grid item xs={12} md={3}>
                    {image(row.images.imageUrl)}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {logo(row.brand.logoUrl)}
                    <p>Brand : {row.brand.name}</p>
                    <p>ID : {row.brand.id}</p>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {row.description}
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  };

  const darkTheme = createTheme({ palette: { mode: "dark" } });
  return (
    <div id="header">
      <strong>Danh sách sản phẩm</strong>
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper} elevation={10}>
          <Table size="small">
            <TableHead>
              <TableCell>ID</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Thêm thông tin</TableCell>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row row={row} key={row.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
};

export default Products;
