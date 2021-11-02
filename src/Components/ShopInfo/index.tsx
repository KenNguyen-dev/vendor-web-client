import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import "./index.css";
import StorefrontIcon from "@mui/icons-material/Storefront"; //just for testing
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { VENDOR_URL } from "../../url";
import { useAuth0 } from "@auth0/auth0-react";
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
          <Grid item xs={3} md={5}>
            {image(vendors.logoUrl)}
          </Grid>
          <Grid item xs={9} md={7} container style={{ textAlign: "left" }}>
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
  const { user } = useAuth0();

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
  const [values, setValues] = useState(initialValues);
  const [vendorList, setVendorList] = useState<typeof initialValues[]>([]);
  const [loading, setLoading] = useState(true);

  const getVendorInfo = async () => {
    const response = await axios.get(`${VENDOR_URL}?ownerId=${user?.sub}`);
    setVendorList(response.data);
    setLoading(false);
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
    console.log(vendor);
    setValues(vendor);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <Button variant="contained">Update</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShopInfo;
