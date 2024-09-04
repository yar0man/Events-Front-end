import React from "react";
import { Modal, Box } from "@mui/material";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const EventModal: React.FC<EventModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: "400px",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default EventModal;