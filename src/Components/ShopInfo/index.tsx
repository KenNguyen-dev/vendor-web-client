import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./index.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import StorefrontIcon from "@mui/icons-material/Storefront"; //just for testing

const ShopInfo = () => {
  const initialValues = {
    id: "",
    name: "Default Store Name",
    email: "Default Email",
    hotline: "Default Hotline",
    ownerID: "",
    isActive: "Default Status",
    desc: "Default Desc",
    logoUrl: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChanges = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div>
      <Paper
        sx={{ p: 2, margin: "auto", maxWidth: 800, flexGrow: 1 }}
        elevation={10}
      >
        <Grid container spacing={2}>
          <Grid item xs={3} md={5}>
            <StorefrontIcon sx={{ width: "15vw", height: "15vw" }} />
          </Grid>
          <Grid item xs={9} md={7} container style={{ textAlign: "left" }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {values.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {values.email}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {values.hotline}
                </Typography>
                <div
                  style={{
                    maxWidth: 300,
                    minHeight: 100,
                    wordWrap: "break-word",
                  }}
                >
                  {values.desc}
                </div>
              </Grid>
              <Grid item>
                <Typography variant="body2">ID người sở hữu</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                {values.isActive}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <div id="header">
        <strong>Cập Nhật Thông Tin</strong>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2} className="info">
          Store Name
        </Grid>
        <Grid item xs={12} md={10} className="textInput">
          <TextField
            size="small"
            label="Tên cửa hàng"
            name="name"
            onChange={handleInputChanges}
          />
        </Grid>
        <Grid item xs={12} md={2} className="info">
          Email
        </Grid>
        <Grid item xs={12} md={10} className="textInput">
          <TextField
            size="small"
            label="Email"
            name="email"
            onChange={handleInputChanges}
          />
        </Grid>
        <Grid item xs={12} md={2} className="info">
          Hotline
        </Grid>
        <Grid item xs={12} md={10} className="textInput">
          <TextField
            size="small"
            label="Hotline"
            type="number"
            name="hotline"
            onChange={handleInputChanges}
          />
        </Grid>
        <Grid item xs={12} md={2} className="info">
          Status
        </Grid>
        <Grid item xs={12} md={10} className="textInput">
          <TextField
            size="small"
            label="Tình Trạng"
            name="isActive"
            onChange={handleInputChanges}
          />
        </Grid>
        <Grid item xs={12} md={2} className="info">
          Descriptions
        </Grid>
        <Grid item xs={12} md={10} className="textInput">
          <TextareaAutosize
            minRows={3}
            style={{ width: 350 }}
            name="desc"
            onChange={handleInputChanges}
          />
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={10} className="textInput">
          <Button variant="contained">Update</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShopInfo;
