import React, { useState, Fragment, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
  Grid,
  Button,
  TableFooter,
  Rating,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { red } from "@mui/material/colors";
import CSS from "csstype";
import "./index.css";
import axios from "axios";
import { PRODUCTS_URL } from "../../url";
import ProductDialog from "../Dialog/ProductDialog";

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

const Row = (props: { row: any; categoryName: string }) => {
  const { row, categoryName } = props;
  const [open, setOpen] = useState(false);
  const image = (url: string) => {
    try {
      return (
        <img
          src={url}
          style={{ margin: "1px", width: "20vw", height: "15vw" }}
        />
      );
    } catch {
      <img
        src="https://via.placeholder.com/150"
        style={{ margin: "1px", width: 300, height: 175 }}
      />;
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const updateProduct = () => {
    setOpenDialog(!openDialog);
  };

  const closeDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Fragment>
      {openDialog && (
        <ProductDialog
          open={openDialog}
          closeDialog={closeDialog}
          categoryName={categoryName}
          categoryId={row.id}
          productId={row.id}
        />
      )}
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          {row.price.amount}/{row.price.unit}
        </TableCell>
        <TableCell>{row.stock}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="warning"
            style={updateButtonStyle}
            onClick={() => updateProduct()}
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
          <Collapse in={open} timeout="auto">
            <Box sx={{ margin: 1 }}>
              <div>
                <div style={{ fontSize: "10px", color: "gray" }}>
                  ID: {row.id}
                </div>
              </div>
              <br />
              <Grid container spacing={2} style={{ textAlign: "center" }}>
                <Grid item xs={12} md={5}>
                  {image(row.images[0]?.url)}
                </Grid>
                <Grid item xs={12} md={2}>
                  <p>Lượt Review: {row.review.numberOfReviews}</p>
                  <Rating value={row.review.rating} precision={0.5} readOnly />
                </Grid>
                <Grid item xs={12} md={5}>
                  {row.briefDescription}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const Products = (props: any) => {
  const { row } = props.location.state;
  const categoryName = row.name;
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const addProduct = () => {
    setOpenDialog(!openDialog);
  };

  const closeDialog = () => {
    setOpenDialog(!openDialog);
  };

  const getProducts = async () => {
    await axios
      .get(`${PRODUCTS_URL}?limit=10&offset=0&categoryId=${row.id}&unit=vnd`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, [row]);

  const logo = (url: string) => {
    return <img src={url} style={{ margin: "1px", width: 100, height: 100 }} />;
  };

  const darkTheme = createTheme({ palette: { mode: "dark" } });
  return (
    <div>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <div id="header">
          <strong>Danh sách sản phẩm : {row.name}</strong>
          <ThemeProvider theme={darkTheme}>
            {openDialog && (
              <ProductDialog
                open={openDialog}
                closeDialog={closeDialog}
                categoryName={categoryName}
                categoryId={row.id}
                productId={undefined}
              />
            )}

            <TableContainer component={Paper} elevation={10}>
              <Table size="small">
                <TableHead>
                  <TableCell>Tên</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Thêm thông tin</TableCell>
                </TableHead>
                <TableBody>
                  {products.data.map((row: any) => (
                    <Row row={row} key={row.id} categoryName={categoryName} />
                  ))}
                </TableBody>
                <TableFooter>
                  <TableCell
                    colSpan={8}
                    sx={{ textAlign: "center", padding: 0.5 }}
                  >
                    <div id="outerBorder">
                      <div id="innerBorder" onClick={() => addProduct()}>
                        <ControlPointIcon
                          sx={{ fontSize: "1.5vw", pr: "5px" }}
                        />
                        Add new product
                      </div>
                    </div>
                  </TableCell>
                </TableFooter>
              </Table>
            </TableContainer>
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default Products;
