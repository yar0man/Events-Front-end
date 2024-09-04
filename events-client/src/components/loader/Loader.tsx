import { Box, CircularProgress } from "@mui/material";

const Loader: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    )
}

export default Loader;