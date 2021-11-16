import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Paper,
} from "@mui/material";
import "./index.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { VENDOR_URL } from "../../url";
import axios from "axios";

const VendorList = (props: { vendors: any; selectedVendor: any }) => {
  const { vendors, selectedVendor } = props;

  const image = (url: string) => {
    if (url == undefined || url == "")
      return (
        <img
          src="https://via.placeholder.com/150"
          style={{ margin: "1px", width: "5vw", height: "5vw" }}
        />
      );
    return (
      <img src={url} style={{ margin: "1px", width: "5vw", height: "5vw" }} />
    );
  };

  return (
    <div onClick={() => selectedVendor(vendors)} className="vendorCard">
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 400,
          flexGrow: 1,
          mb: 2,
        }}
        elevation={3}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={2}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image(vendors.logoUrl)}
          </Grid>
          <Grid item xs={10} md={8} container style={{ textAlign: "left" }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {vendors.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {vendors.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {vendors.hotline}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {vendors.isActive ? (
                  <CheckCircleIcon sx={{ color: "green" }} />
                ) : (
                  <OfflineBoltIcon sx={{ color: "red" }} />
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const ShopInfo = () => {
  const initialValues = {
    id: "",
    name: "",
    email: "",
    hotline: "",
    ownerID: "",
    isActive: false,
    introduction: "",
    logoUrl: "",
  };
  const vendor: any = useSelector((state: State) => state.vendor);
  const [values, setValues] = useState(initialValues);
  const [vendorList, setVendorList] = useState<typeof initialValues[]>([]);
  const [enabled, setEnabled] = useState(true);

  const getVendorInfo = () => {
    setVendorList(vendor);
  };

  useEffect(() => {
    getVendorInfo();
  }, []);

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const vendorClick = (vendor: typeof initialValues) => {
    setValues(vendor);
    setEnabled(false);
  };

  //update vendor
  const updateVendor = () => {
    // axios.put(`${VENDOR_URL}/${values.id}`, values).then((res) => {
    //   getVendorInfo();
    //   setValues(initialValues);
    //   setEnabled(true);
    // });
  };

  //delete vendor
  const deleteVendor = () => {
    axios.delete(`${VENDOR_URL}/${values.id}`).then((res) => {
      getVendorInfo();
      setValues(initialValues);
      setEnabled(true);
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {vendorList.map((vendor: any) => (
            <VendorList vendors={vendor} selectedVendor={vendorClick} />
          ))}
        </Grid>
        <Grid item xs={12} md={8}>
          <div id="header">
            <strong>Cập Nhật Thông Tin</strong>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} className="info">
              Tên cửa hàng
            </Grid>
            <Grid item xs={12} md={9} className="textInput">
              <TextField
                size="small"
                name="name"
                value={values.name}
                onChange={handleInputChanges}
              />
            </Grid>
            <Grid item xs={12} md={3} className="info">
              Email
            </Grid>
            <Grid item xs={12} md={9} className="textInput">
              <TextField
                size="small"
                name="email"
                value={values.email}
                onChange={handleInputChanges}
              />
            </Grid>
            <Grid item xs={12} md={3} className="info">
              Hotline
            </Grid>
            <Grid item xs={12} md={9} className="textInput">
              <TextField
                size="small"
                name="hotline"
                value={values.hotline}
                onChange={handleInputChanges}
              />
            </Grid>
            <Grid item xs={12} md={3} className="info">
              Tóm tắt
            </Grid>
            <Grid item xs={12} md={9} className="textInput">
              <TextareaAutosize
                minRows={3}
                style={{ width: 350 }}
                name="introduction"
                value={values.introduction}
                onChange={handleInputChanges}
              />
            </Grid>
            <Grid item xs={12} md={3}></Grid>
            <Grid item xs={12} md={9} className="textInput">
              <Button
                variant="contained"
                disabled={enabled}
                onClick={() => updateVendor()}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShopInfo;
