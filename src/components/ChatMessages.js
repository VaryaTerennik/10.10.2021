import { useForm } from "react-hook-form";
import { useEffect } from "react";
import PropTypes from "prop-types";
import api from "../helpers/api.js";
import Dropzone from "./Dropzone";
import { useState } from "react";
import style from "../styles/ChatMessages.module.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextField, Box } from "@mui/material";

function ChatMessages({ onSubmit }) {
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
      console.log("Enter key was pressed. Run your function.");
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

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Box>
        {!loadingProgress && (
          <Dropzone onFileDrop={handleDropFile}>
            <Box sx={{ width: "780px", m: "auto" }}>
              <TextField
                sx={{
                  width: "760px",
                  height: "60px",
                  m: "auto",
                  padding: "10px",
                }}
                placeholder="Введите ваше сообщение"
                onKeyPress={handlePressKeyEnter}
                {...register("text", "latitude", "longitude", {
                  required: true,
                })}
              ></TextField>
            </Box>
            <Box
              sx={{
                width: "760px",
                m: "auto",
                display: "flex",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                padding: "10px",
              }}
              className={style.AllButtonForm}
            >
              <p>Перетащи сюда картинку</p>
              {/* <input type="file" onChange={handleUploadFile}/> */}
              {getValues("imageURL")}
              <Box>
                <Button type="button" onClick={handleGetPosition}>
                  🌍
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSubmit(onFormSubmit)}
                >
                  Отправить
                </Button>
              </Box>
            </Box>
          </Dropzone>
        )}
        {loadingProgress && <div>Загрузка...</div>}
      </Box>
    </form>
  );
}
ChatMessages.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatMessages;
