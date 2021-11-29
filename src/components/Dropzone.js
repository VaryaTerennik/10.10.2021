import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
      {isDragActive ? <p>Бросай файл сюда ...</p> : <>{children}</>}
    </div>
  );
}

export default Dropzone;
