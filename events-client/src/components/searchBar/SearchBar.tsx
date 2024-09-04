import { Box, InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    placeholder: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearchChange, searchQuery}) => {
    return (
        <Box>
            <TextField
                value={searchQuery}
                placeholder={`Search by ${placeholder}`}
                variant="outlined"
                onChange={onSearchChange}
                sx={{
                    width: "300px",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        height: "56px",
                        "& fieldset": {
                            borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                            borderColor: "#888",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#3f51b5",
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default SearchBar