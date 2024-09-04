import { HandleErrorProps, HandleSuccessProps } from '@/types/response';

export const handleError = ({ setAlert, errorMessage }: HandleErrorProps) => {
    setAlert({ message: errorMessage, severity: 'error' });
    setTimeout(() => {
        setAlert(null);
    }, 3000);
};

export const handleSuccess = ({ setAlert, successMessage }: HandleSuccessProps) => {
    setAlert({ message: successMessage, severity: 'success' });
    setTimeout(() => {
        setAlert(null);
    }, 3000);
};