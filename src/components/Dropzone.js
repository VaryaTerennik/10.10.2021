import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@mui/material";

function Dropzone({ children, onFileDrop }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFileDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // noClick: true,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <Box>Бросай файл сюда ...</Box> : <Box>{children}</Box>}
    </div>
  );
}

export default Dropzone;
