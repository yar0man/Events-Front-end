import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const BackButton: React.FC = () => {
    const router = useRouter();
    const handleBackClick = () => {
        router.back();
    };

    return (
        <Box
            onClick={handleBackClick}
            sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 10,
            }}
        >
            <ArrowBackIcon />
            <Typography variant="body1" component="span" sx={{ marginLeft: 0.5 }}>
                Back
            </Typography>
        </Box>
    );
};

export default BackButton;