import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import VideoUploadModal from "../react-webcam/VideoUpload";
import TextField from "@mui/material/TextField";
import UploadIcon from "@mui/icons-material/Upload";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import "./EditProfile.css";

const EditProfile = () => {
  const inputRef = useRef(null);
  const videoInputRef = useRef(null);

  const [inputFields, setInputFields] = useState([{ value: "" }]);
  const [editIndex, setEditIndex] = useState(-1);
  const [disabledLang, setDisabledLang] = useState([true]);
  const [disabledProfile, setDisabledProfile] = useState(true);
  const [hideButton, setHideButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openWebCam, setOpenWebCam] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState("");

  const handleAddField = () => {
    const newFields = [...inputFields, { value: "" }];
    setInputFields(newFields);
  };

  const handleInputChange = (index, event) => {
    const newFields = [...inputFields];
    newFields[index].value = event.target.value;
    setInputFields(newFields);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const newDisabledStates = [...disabledLang];
    newDisabledStates[index] = false;
    setDisabledLang(newDisabledStates);
  };

  const handleEditProfileClick = () => {
    setDisabledProfile(false);
    setHideButton(true);
    setIsOpen(false);
  };

  const handleDelete = (index) => {
    const newFields = [...inputFields];
    newFields.splice(index, 1);
    setInputFields(newFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { inputs: inputFields.map((field) => field.value) };
  };
  const handleFileSelect = (event) => {
    setSelectedProfile(event.target.files[0]);
  };
  const handleUploadVideo = () => {
    if (!disabledProfile) {
      videoInputRef.current.click();
    }
  };
  const handleVideoChange = (event) => {
    const videoFile = event.target.files[0];
    mediaBlobUrl(videoFile?.name);
  };

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <Typography className="candidate-form-heading2">
        Add Video Profile
      </Typography>
      <Box className="candidate-add-vdo-cont cdt-inpt-mt">
        <TextField
          type="text"
          id="videoLink"
          name="videoLink"
          label="Video"
          variant="outlined"
          className="video-input full-width"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <UploadIcon
                  className="upload-icon"
                  onClick={handleUploadVideo}
                />
                <CameraAltOutlinedIcon
                  onClick={() => {
                    setOpenWebCam(!openWebCam);
                    handleOpen();
                    setMediaBlobUrl("");
                  }}
                  className="cam-icon"
                />
                <VideoUploadModal
                  openWebCam={openWebCam}
                  setOpenWebCam={setOpenWebCam}
                  isOpen={isOpen}
                  disabledProfile={disabledProfile}
                  setIsOpen={setIsOpen}
                  mediaBlobUrl={mediaBlobUrl}
                  setMediaBlobUrl={setMediaBlobUrl}
                />
                <input
                  type="file"
                  id="videoLink"
                  name="videoLink"
                  ref={videoInputRef}
                  style={{ display: "none" }}
                  onChange={handleVideoChange}
                />
              </InputAdornment>
            ),
          }}
          disabled={disabledProfile}
        />
      </Box>
      <Box className="bottom-border cdt-inpt-mt"></Box>
    </>
  );
};

export default EditProfile;
