import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
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

  const [imageFile, setImageFile] = useState("");

  const handleDropFile = async (files) => {
    if (imageFile === "") {
      const formData = new FormData();
      formData.append("uploadedFile", files[0]);
      setLoadingProgress(true);
      try {
        const response = await api.post("/upload", formData);
        result = response.data.fileURL;
        setImageFile(result);
        // setValue("imageURL", result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProgress(false);
      }
    }
  };

  const handleDeleteMessage = () => {
    if (imageFile !== "") {
      setImageFile("");
    }
  };

  useEffect(() => {
    setValue("imageURL", imageFile);
    console.log(imageFile);
  }, [imageFile]);

  const [position, setPosition] = useState("");

  const handleGetPosition = () => {
    if (position === "") {
      function success(pos) {
        var crd = pos.coords;
        setPosition(crd);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setPosition("");
    }
  };

  useEffect(() => {
    setValue("latitude", position.latitude);
    setValue("longitude", position.longitude);
  }, [position]);

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
              {...register("text", {
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
                <>
                  {!getValues("imageURL") && (
                    <>
                      <Dropzone onFileDrop={handleDropFile}>
                        <Box sx={{ width: "100%" }}>
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            sx={{ m: "auto", width: "100%" }}
                          >
                            <AddPhotoAlternateIcon
                              fontSize="large"
                              sx={{ mr: "10px" }}
                            />
                            <small>Загрузить картинку</small>
                          </IconButton>
                        </Box>
                      </Dropzone>
                    </>
                  )}
                  <Box sx={{ width: "100%" }}>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={{ m: "auto", width: "100%" }}
                      onClick={handleDeleteMessage}
                    >
                      {getValues("imageURL") && (
                        <>
                          <ImageNotSupportedIcon
                            fontSize="large"
                            sx={{ mr: "10px" }}
                          />
                          <small>Удалить картинку</small>
                        </>
                      )}
                    </IconButton>
                  </Box>
                </>
              )}
              {loadingProgress && (
                <Box sx={{ width: "100%", m: "auto" }}>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{ m: "auto", width: "100%" }}
                  >
                    <CircularProgressWithLabel
                      sx={{ m: "auto", width: "100%" }}
                      value={progress}
                    />
                  </IconButton>
                </Box>
              )}
            </Box>
            {/* <input type="file" onChange={handleUploadFile}/> */}

            <Box>
              <IconButton
                color="primary"
                type="button"
                onClick={handleGetPosition}
              >
                {position === "" && <AddLocationIcon fontSize="large" />}
                {position !== "" && <LocationOnIcon fontSize="large" />}
              </IconButton>
              <Button
                disabled={!formState.isValid}
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
