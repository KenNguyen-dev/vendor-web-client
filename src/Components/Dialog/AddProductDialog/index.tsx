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
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CodeIcon from "@mui/icons-material/Code";
import { styled } from "@mui/material/styles";

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

const AddProductDialog = (props: any) => {
  const [values, setValues] = useState<any>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [basic, setBasic] = useState(true);
  const [currency, setCurrency] = useState("VND");
  const [hasSet, setHasSet] = useState(false);

  const handleCurencyChange = (event: any) => {
    const { value } = event.target;
    setCurrency(value as string);
    setValues({ ...values, currency: value as string });
  };

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    if (name != "hasAttributeSet") {
      setValues({
        ...values,
        [name]: value,
      });
    } else {
      setValues({
        ...values,
        [name]: e.target.checked,
      });
      setHasSet(!hasSet);
    }
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.closeDialog()}
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle sx={{ textAlign: "center" }}>PRODUCT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <div
                  style={{
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid white",
                      borderRadius: "5px 5px",
                      width: "220px",
                      height: "220px",
                      margin: "auto",
                    }}
                  ></div>
                  <div
                    style={{
                      margin: "auto",
                      width: "fit-content",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ fontWeight: "bold", width: "220px" }}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={7}>
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
                        <ListItemText
                          primary="Tên Product: "
                          sx={{ width: "15vw", pr: 5 }}
                        />
                        <TextField
                          name="name"
                          variant="standard"
                          fullWidth
                          size="small"
                          onChange={handleInputChanges}
                        />
                      </ListItem>
                      <ListItem sx={{ pl: 4 }}>
                        <ListItemText
                          primary="Giá: "
                          sx={{ width: "15vw", pr: 5 }}
                        />
                        <TextField
                          name="price"
                          variant="standard"
                          type="number"
                          fullWidth
                          size="small"
                          onChange={handleInputChanges}
                        />
                      </ListItem>
                    </List>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Số lượng: "
                        sx={{ width: "15vw", pr: 5 }}
                      />
                      <TextField
                        name="stock"
                        variant="standard"
                        fullWidth
                        size="small"
                        type="number"
                        onChange={handleInputChanges}
                      />
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
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
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Loại Hàng: "
                        sx={{ width: "15vw", pr: 5 }}
                      />
                      <TextField
                        name="categoryName"
                        variant="standard"
                        fullWidth
                        disabled
                        value={props.categoryName}
                        size="small"
                        onChange={handleInputChanges}
                      />
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemText
                        primary="Tiền tệ: "
                        sx={{ width: "15vw", pr: 5 }}
                      />
                      <Select
                        name="unit"
                        value={currency}
                        displayEmpty
                        onChange={handleCurencyChange}
                      >
                        <MenuItem value={"VND"}>VND</MenuItem>
                        <MenuItem value={"USD"}>USD</MenuItem>
                      </Select>
                    </ListItem>
                  </Collapse>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Set Thuộc Tính: "
                      sx={{ width: "15vw", pr: 5 }}
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>No</Typography>
                      <AntSwitch
                        inputProps={{ "aria-label": "ant design" }}
                        name="hasAttributeSet"
                        onChange={handleInputChanges}
                      />
                      <Typography>Yes</Typography>
                    </Stack>
                  </ListItem>
                  <Collapse in={hasSet} timeout="auto" unmountOnExit>
                    Hello
                  </Collapse>
                </List>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProductDialog;
