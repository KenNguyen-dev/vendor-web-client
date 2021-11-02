import React, { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  ListItemIcon,
  Collapse,
  TextField,
  Switch,
  Stack,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Autocomplete,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { styled } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const AddDiscountDialog = (props: any) => {
  const initialValues = {
    id: "1",
    discountName: "",
    description: "",
    priority: 0,
    allowedUses: 0,
    modifier: 0,
    discountRule: 0,
    startDate: "",
    endDate: "",
    isFlatAmount: false,
    isActive: false,
    product: [],
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [basic, setBasic] = useState(true);
  const [advance, setAdvance] = useState(false);
  const [discountList, setDiscountList] = useState(true);
  const [values, setValues] = useState(initialValues);
  const [startDate, setStartDate] = useState(new Date("2020-01-01T21:11:54"));
  const [endDate, setEndDate] = useState(new Date("2020-01-01T21:11:54"));
  const [addedProducts, setAddedProducts] = useState<any>([]);
  const [productValues, setProductValues] =
    useState<IDiscountProducts | null>();

  useEffect(() => {
    setValues((prevState) => ({ ...prevState, product: addedProducts }));
  }, [addedProducts]);
  //test Data
  const options = [
    { name: "The Godfather", id: 1 },
    { name: "Pulp Fiction", id: 2 },
  ];

  interface IDiscountProducts {
    name: string;
    id: number;
  }

  const defaultProps = {
    options: options,
    getOptionLabel: (option: any) => option.name,
  };

  const handleProductChange = (event: any, value: IDiscountProducts | null) => {
    setProductValues(value);
  };

  const addToList = () => {
    let duplicate = addedProducts.find(
      (p: IDiscountProducts) => p.id == productValues?.id
    );
    if (duplicate == undefined) {
      setAddedProducts((oldArray: any) => [...oldArray, productValues]);
    }
  };

  const handleRemoveItem = (id: any) => {
    setAddedProducts(
      addedProducts.filter((item: IDiscountProducts) => item.id !== id)
    );
  };

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    if (name != "isFlatAmount") {
      setValues({
        ...values,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: e.target.checked,
      });
    }
  };

  const checkEmpty = () => {
    for (const [key, value] of Object.entries(values)) {
      if (value === "") {
        return true;
      }
    }
  };

  const createNewDiscount = () => {
    var utc = new Date();
    if (checkEmpty()) {
      window.alert("Vui lòng nhập đủ thông tin");
    } else if (values.product.length == 0) {
      console.log(values.product.length);
      window.alert("Vui lòng thêm sản phẩm");
    } else if (startDate > endDate || endDate < utc) {
      window.alert("Vui lòng kiểm tra lại ngày");
    } else {
      window.alert("send me");
    }
  };

  const handleStartDate = (newDate: any) => {
    setStartDate(newDate);
    setValues((prevState) => ({
      ...prevState,
      startDate: newDate._d,
    }));
  };
  const handleEndDate = (newDate: any) => {
    setEndDate(newDate);
    setValues((prevState) => ({
      ...prevState,
      endDate: newDate._d,
    }));
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.closeDialog()}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: "center" }}>DISCOUNT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <List
              sx={{
                width: "100%",
                bgcolor: "none",
              }}
            >
              <ListItemButton onClick={() => setBasic(!basic)}>
                <ListItemIcon>
                  <BookmarkIcon />
                </ListItemIcon>
                <ListItemText primary="Basic settings" />
                {basic ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={basic} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary="Tên Discount: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <TextField
                      name="discountName"
                      variant="standard"
                      fullWidth
                      size="small"
                      onChange={handleInputChanges}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary="Thứ tự ưu tiên: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <TextField
                      name="priority"
                      variant="standard"
                      type="number"
                      fullWidth
                      size="small"
                      onChange={handleInputChanges}
                    />
                  </ListItem>
                </List>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary="Số lần sử dụng: "
                    sx={{ width: "15vw", pr: 5 }}
                  />
                  <TextField
                    name="allowedUses"
                    variant="standard"
                    fullWidth
                    size="small"
                    type="number"
                    onChange={handleInputChanges}
                  />
                </ListItem>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary="Ngày bắt đầu: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <MobileDatePicker
                      value={startDate}
                      onChange={handleStartDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary="Ngày kết thúc: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <MobileDatePicker
                      value={endDate}
                      onChange={handleEndDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </ListItem>
                </LocalizationProvider>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    primary="Chú thích: "
                    sx={{ width: "15vw", pr: 5 }}
                  />
                  <TextField
                    name="description"
                    variant="standard"
                    fullWidth
                    size="small"
                    onChange={handleInputChanges}
                  />
                </ListItem>
              </Collapse>
              <ListItemButton onClick={() => setDiscountList(!discountList)}>
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Add Products" />
                {discountList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={discountList} timeout="auto" unmountOnExit>
                <div style={{ marginLeft: 70 }}>
                  <Stack direction="row" spacing={1}>
                    <Autocomplete
                      sx={{ minWidth: 350 }}
                      {...defaultProps}
                      id="auto-select"
                      autoSelect
                      onChange={handleProductChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Chọn Products"
                          variant="outlined"
                        />
                      )}
                    />
                    <IconButton onClick={() => addToList()}>
                      <AddBoxIcon sx={{ fontSize: 45 }} />
                    </IconButton>
                  </Stack>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 100 }} size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="center">Tên</TableCell>
                          <TableCell align="center">Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {addedProducts.map((row: IDiscountProducts) => {
                          return (
                            <TableRow>
                              <TableCell>{row.id}</TableCell>
                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">
                                <IconButton
                                  onClick={() => handleRemoveItem(row.id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Collapse>
              <ListItemButton onClick={() => setAdvance(!advance)}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Advance settings" />
                {advance ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={advance} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary="Discount Rule: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <TextField
                      name="discountRule"
                      variant="standard"
                      fullWidth
                      type="number"
                      size="small"
                      onChange={handleInputChanges}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary="Modifier: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <TextField
                      name="modifier"
                      variant="standard"
                      fullWidth
                      type="number"
                      size="small"
                      onChange={handleInputChanges}
                    />
                  </ListItem>
                  <ListItem sx={{ pl: 4 }}>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primary="Flat Amount: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>No</Typography>
                      <AntSwitch
                        inputProps={{ "aria-label": "ant design" }}
                        name="isFlatAmount"
                        onChange={handleInputChanges}
                      />
                      <Typography>Yes</Typography>
                    </Stack>
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => createNewDiscount()}>CREATE</Button>
          {/* <Button onClick={() => props.closeDialog()}>CANCLE</Button> */}

          <Button onClick={() => console.log(values)}>CANCLE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDiscountDialog;
