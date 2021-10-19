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
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import "./index.css";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IOrders, { OrderState } from "./interfaces";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { dialogAction } from "../../state/index";
import OrderDialog from "../OrderDialog";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const deleteButtonStyle: CSS.Properties = {
  fontSize: "1.5vmin",
  color: "white",
  fontWeight: "bold",
  marginBottom: "1vw",
};
const updateButtonStyle = { ...deleteButtonStyle, marginRight: "1vw" };
//#region Table | table thôi mà dài chết đi dc

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: any, newPage: number) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const { count, page, rowsPerPage, onPageChange } = props;
  const theme = useTheme();

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
};

const Row = (props: { row: IOrders }) => {
  const { row } = props;
  const [customerOpen, setCustomerOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();
  const { openDialog } = bindActionCreators(dialogAction, dispatch);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropdownMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem>APPROVED</MenuItem>
      <MenuItem>COMPLETED</MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <TableRow
        onDoubleClick={() => openDialog(row)}
        style={{ cursor: "pointer" }}
      >
        <TableCell>
          {row.customer.fullName}
          <IconButton
            size="small"
            onClick={() => setCustomerOpen(!customerOpen)}
          >
            {customerOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {row.items.length}
          <IconButton size="small" onClick={() => setItemOpen(!itemOpen)}>
            {itemOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.createdAt.toDateString()}</TableCell>
        <TableCell>{row.updatedAt.toDateString()}</TableCell>
        <TableCell>{row.deletedAt.toDateString()}</TableCell>
        <TableCell>{row.totalPrice.amount}</TableCell>
        <TableCell>
          {row.address.district}
          <IconButton size="small" onClick={() => setAddressOpen(!addressOpen)}>
            {addressOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Button variant="contained" onClick={(e) => handleClick(e)}>
            CREATED <ExpandMore />
          </Button>
          {dropdownMenu}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}>
          <Collapse in={customerOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div>
                <h2>Khách Hàng: </h2>
                <p>Tên: {row.customer.fullName}</p>
                <p>Email: {row.customer.email}</p>
                <p>SDT: {row.customer.phoneNumber}</p>
              </div>
            </Box>
          </Collapse>
        </TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={itemOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <h3>Danh sách sản phẩm</h3>
              <Table size="small">
                <TableHead>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Tổng Tiền</TableCell>
                  <TableCell>Thương Hiệu</TableCell>
                  <TableCell>Ảnh Minh Họa</TableCell>
                  <TableCell>Xóa</TableCell>
                </TableHead>
                <TableBody>
                  {row.items.slice(page * 3, page * 3 + 3).map((item) => {
                    return (
                      <TableRow>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {item.price.amount}/{item.price.unit}
                        </TableCell>
                        <TableCell>
                          {item.totalPrice.amount}/{item.totalPrice.unit}
                        </TableCell>
                        <TableCell>{item.vendorName}</TableCell>
                        <TableCell>{item.imageUrl}</TableCell>
                        <TableCell>
                          <IconButton>
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[3]}
                    count={row.items.length}
                    rowsPerPage={3}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={addressOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div>
                <strong>Địa chỉ giao hàng</strong> : {row.address.street},{" "}
                {row.address.ward}, {row.address.district},{" "}
                {row.address.country}
                <p>Note: {row.address.details}</p>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

//#endregion

const Orders = () => {
  //đây là data mẫu
  const rows: IOrders[] = [
    {
      customer: {
        email: "test@emailc.com",
        phoneNumber: "0721379123",
        fullName: "Tom",
      },
      address: {
        id: 1,
        country: "Viet Nam",
        city: "Ho Chi Minh",
        district: "Q.10",
        ward: "P.10",
        street: "Ly Thai to",
        details: "Detail",
      },
      notes: "This is note",
      state: OrderState.APPROVED,
      createdAt: new Date(2021, 10, 27),
      updatedAt: new Date(2021, 10, 27),
      deletedAt: new Date(2021, 10, 27),
      totalPrice: {
        amount: 20000,
        unit: "VND",
      },
      items: [
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 10000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 20000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 30000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 40000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 50000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 60000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 70000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
      ],
      id: "73",
    },
    {
      customer: {
        email: "test@email",
        phoneNumber: "732013710",
        fullName: "John",
      },
      address: {
        id: 1,
        country: "Viet Nam",
        city: "Ho Chi Minh",
        district: "Q.10",
        ward: "P.10",
        street: "Ly Thai to",
        details: "Detail",
      },
      notes: "This is note",
      state: OrderState.APPROVED,
      createdAt: new Date(2021, 10, 27),
      updatedAt: new Date(2021, 10, 27),
      deletedAt: new Date(2021, 10, 27),
      totalPrice: {
        amount: 20000,
        unit: "VND",
      },
      items: [
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 10000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 20000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 30000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 40000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 50000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 60000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
        {
          imageUrl: "Image Logo",
          vendorName: "Vendor name",
          productId: "27",
          price: { amount: 70000, unit: "VND" },
          quantity: 56,
          name: "Áo thun",
          totalPrice: { amount: 50000, unit: "VND" },
          id: 1,
        },
      ],
      id: "65",
    },
  ];

  const darkTheme = createTheme({ palette: { mode: "dark" } });
  return (
    <div id="header">
      <strong>Danh sách orders:</strong>
      <ThemeProvider theme={darkTheme}>
        <OrderDialog />
        <TableContainer component={Paper} elevation={10}>
          <Table size="small">
            <TableHead>
              <TableCell>Tên Khách Hàng</TableCell>
              <TableCell>Số Lượng Hàng</TableCell>
              <TableCell>Ngày Đặt</TableCell>
              <TableCell>Ngày Cập Nhật</TableCell>
              <TableCell>Ngày Xóa</TableCell>
              <TableCell>Tổng Tiền</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Trạng Thái</TableCell>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
};

export default Orders;
