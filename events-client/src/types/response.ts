export interface HandleSuccessProps {
    setAlert: (alert: { message: string; severity: 'success' | 'error' } | null) => void;
    successMessage: string;
}

export interface HandleErrorProps {
    setAlert: (alert: { message: string; severity: 'success' | 'error' } | null) => void;
    errorMessage: string;
}