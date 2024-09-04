import { Box, Button, Typography } from "@mui/material";

interface CreateAndEditEventForm {
    onCancel: () => void;
    onDelete: () => void;
}

const DeleteEvent: React.FC<CreateAndEditEventForm> = ({ onCancel, onDelete  }) => {
    return (
        <Box>
            <Typography textAlign='center'>
                Are you sure you want to delete this event?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, width: '100%', mt: 2 }}>
                <Button 
                    variant="contained" 
                    onClick={onDelete}
                    sx={{
                        color: 'white',
                        borderRadius: 12,
                        "&:hover": { backgroundColor: "#111111" },
                        backgroundColor: "#111111"
                    }}
                >
                    Delete
                </Button>
                <Button 
                    variant="outlined" 
                    onClick={onCancel}
                    sx={{
                        color: 'black',
                        borderRadius: 12,
                        borderColor: 'black'
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default DeleteEvent;