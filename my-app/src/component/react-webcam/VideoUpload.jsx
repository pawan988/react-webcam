import { Box, Modal, Typography } from "@mui/material";
import { ReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import React, { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
const VideoUploadModal = ({
  isOpen,
  setIsOpen,
  setOpenWebCam,
  mediaBlobUrl,
  setMediaBlobUrl,
}) => {
  console.log("mediablobUrl ===>>>", mediaBlobUrl);
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);

  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleClose = () => setIsOpen(false);

  const onData = (blob) => {
    setMediaBlobUrl(URL.createObjectURL(blob));
  };

  const onStop = (blob) => {
    if (blob) {
      setMediaBlobUrl(blob);
      setDownloadUrl(blob);
    }
    setRecording(false);
  };

  const downloadVideo = () => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "my_video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const render = ({ status, startRecording, stopRecording }) => {
    return (
      <div className="recording-btn">
        <div className="stop-rec-btn">
          {!mediaBlobUrl ? (
            status === "recording" && recording === true ? (
              <button
                type="button"
                onClick={() => {
                  stopRecording();
                  setRecording(false);
                  setOpenWebCam(false);
                }}
                className="webcan-button"
              >
                Stop Recording
              </button>
            ) : (
              <button
                type="button"
                className="webcan-button"
                onClick={() => {
                  startRecording();
                  setRecording(true);
                }}
              >
                Start Recording
              </button>
            )
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <Box className="candidate-project-main-cont">
        <Modal open={isOpen} onClose={handleClose}>
          <Box className="webcam-dialog-box">
            <Box className="webcame-title">
              <Typography className="candidate-project-heading1">
                {recording ? "Recording video" : "Record video"}
              </Typography>
              <Typography onClick={() => setIsOpen(false)}>
                <CloseIcon className="close-webcame-modal" />
              </Typography>
            </Box>

            <Box className="webcam-container">
              <div className="pre-video">
                <div style={{ width: "100%" }}>
                  {!mediaBlobUrl ? (
                    <Webcam
                      ref={webcamRef}
                      style={{ width: "100%" }}
                      height={500}
                    />
                  ) : (
                    ""
                  )}

                  <ReactMediaRecorder
                    video
                    audio
                    render={render}
                    onStop={onStop}
                    onData={onData}
                    style={{ width: "100%" }}
                  />
                  {mediaBlobUrl ? (
                    <Box className="reacorded-video">
                      <video src={mediaBlobUrl} controls ref={videoRef} />
                    </Box>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {mediaBlobUrl && (
                <Box className="webcam-btn-cont">
                  <button
                    className="webcan-button"
                    type="button"
                    onClick={downloadVideo}
                  >
                    Download Video
                  </button>
                  <button
                    className="webcan-button"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Next
                  </button>
                </Box>
              )}
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default VideoUploadModal;
