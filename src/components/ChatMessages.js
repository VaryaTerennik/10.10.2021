import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PropTypes from "prop-types";
import api from "../helpers/api.js";
import Dropzone from "./Dropzone";
import { useState } from "react";
import style from "../styles/ChatMessages.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextField, Box, Typography } from "@mui/material";

function ChatMessages({ onSubmit }) {
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const { register, handleSubmit, setValue, getValues, formState } = useForm({
    mode: "onChange",
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
    setValue("text", "");
    setValue("latitude", "");
    setValue("longitude", "");
    setValue("imageURL", "");
  };

  let result = "";

  useEffect(() => {
    register("imageURL");
    register("latitude");
    register("longitude");
  }, []);

  const [loadingProgress, setLoadingProgress] = useState(false);

  // useEffect(() => {
  //     const listener = event => {
  //       if (event.code === "Enter" || event.code === "NumpadEnter") {
  //         console.log("Enter key was pressed. Run your function.");
  //         // event.preventDefault()
  //         handleSubmit(onFormSubmit)()
  //       }
  //     };
  //     document.addEventListener("keydown", listener);
  //     return () => {
  //       document.removeEventListener("keydown", listener);
  //     };
  //   }, []);

  const handlePressKeyEnter = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      handleSubmit(onFormSubmit)();
    }
  };

  // const handleUploadFile = async(event) => {
  //         const formData = new FormData()
  //         formData.append('uploadedFile', event.target.files[0])

  //         try {
  //         const response = await api.post('/upload', formData)
  //             result = response.data.fileURL
  //             console.log(result)
  //             setValue('imageURL', result)

  //         } catch(error) {
  //             console.log(error)
  //         }
  // }

  const handleDropFile = async (files) => {
    const formData = new FormData();
    formData.append("uploadedFile", files[0]);
    setLoadingProgress(true);

    try {
      const response = await api.post("/upload", formData);
      result = response.data.fileURL;
      console.log(result);
      setValue("imageURL", result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProgress(false);
    }
  };

  const handleGetPosition = () => {
    function success(pos) {
      var crd = pos.coords;
      setValue("latitude", crd.latitude);
      setValue("longitude", crd.longitude);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  };

  // const [isCoords, setCoodrs] = useState(false);

  // useEffect(() => {
  //   if (getValues("latitude") && getValues("longitude")) {
  //     return setCoodrs[true];
  //   }
  // }, [setCoodrs]);

  // console.log(isCoords);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Box>
        <>
          <Box sx={{ width: "70%", m: "auto" }}>
            <TextField
              id="outlined-textarea"
              label="Введите ваше сообщение"
              multiline
              sx={{
                width: "100%",
                height: "60px",
                m: "20px auto 5px",
                padding: "0px",
              }}
              onKeyPress={handlePressKeyEnter}
              {...register("text", "latitude", "longitude", {
                required: true,
              })}
            ></TextField>
          </Box>
          <Box
            sx={{
              width: "70%",
              m: "0px auto",
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              padding: "0px",
            }}
            className={style.AllButtonForm}
          >
            <Box sx={{ width: "60%" }}>
              {!loadingProgress && (
                <Dropzone onFileDrop={handleDropFile}>
                  <Box sx={{ width: "100%" }}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={{ m: "auto", width: "100%" }}
                    >
                      <PhotoCamera fontSize="large" sx={{ mr: "10px" }} />
                      {getValues("imageURL") && (
                        <small>Картинка загружена</small>
                      )}
                    </IconButton>
                  </Box>
                </Dropzone>
              )}
              {loadingProgress && (
                <div>
                  <CircularProgressWithLabel value={progress} />
                </div>
              )}
            </Box>
            {/* <input type="file" onChange={handleUploadFile}/> */}

            <Box>
              <IconButton
                color="primary"
                type="button"
                onClick={handleGetPosition}
              >
                {!(getValues("latitude") && getValues("longitude")) && (
                  <AddLocationIcon fontSize="large" />
                )}
                {getValues("latitude") && getValues("longitude") && (
                  <LocationOnIcon fontSize="large" />
                )}
              </IconButton>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmit(onFormSubmit)}
              >
                Отправить
              </Button>
            </Box>
          </Box>
        </>
      </Box>
    </form>
  );
}
ChatMessages.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatMessages;
