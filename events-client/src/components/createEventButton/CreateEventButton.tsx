import { Box, Button } from "@mui/material";

interface CreateEventButtonProps {
    onOpen: () => void;
}

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ onOpen }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Button
                sx={{
                    marginLeft: 2,
                    width: 200,
                    height: 44,
                    padding: 2,
                    color: 'white',
                    borderRadius: 12,
                    "&:hover": { backgroundColor: "#111111" },
                    backgroundColor: "#111111"
                }}
                className="button-group" variant="contained" onClick={onOpen}>
                Create New Event
            </Button>
        </Box>

    )
}

export default CreateEventButton;