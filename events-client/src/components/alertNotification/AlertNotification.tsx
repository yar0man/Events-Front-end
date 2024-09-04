import React from 'react';
import { Alert } from '@mui/material';

interface AlertNotificationProps {
    message: string;
    severity: 'success' | 'error';
    onClose: () => void;
}

const AlertNotification: React.FC<AlertNotificationProps> = ({ message, severity, onClose }) => {
    return (
        <Alert
            severity={severity}
            sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 300,
                mb: 2,
            }}
            onClose={onClose}
        >
            {message}
        </Alert>
    );
};

export default AlertNotification;