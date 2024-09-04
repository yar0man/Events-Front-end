import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTheme, useMediaQuery } from '@mui/material';
import SearchBar from "../searchBar/SearchBar";
import { CATEGORIES, SORTOPTIONS } from "@/constants/constants";

interface FilterAndSortContainerProps {
    selectedCategory: string;
    onCategoryChange: (event: SelectChangeEvent<string>) => void;
    sortOption: string;
    onSortChange: (event: SelectChangeEvent<string>) => void;
    onClearFilters: () => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchQuery: string;
}

const FilterAndSortContainer: React.FC<FilterAndSortContainerProps> = ({
    selectedCategory,
    onCategoryChange,
    sortOption,
    onSortChange,
    onClearFilters,
    onSearchChange,
    searchQuery,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box
            sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: 2,
                marginLeft: isMobile ? 0 : 2,
                marginRight: isMobile ? 0 : 2,
            }}
        >
            <FormControl sx={{ width: isMobile ? '100%' : 300 }}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    value={selectedCategory}
                    label="Category"
                    onChange={onCategoryChange}
                >
                    <MenuItem value="All">All</MenuItem>
                    {CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <SearchBar placeholder="event name" onSearchChange={onSearchChange} searchQuery={searchQuery} />

            <FormControl sx={{ width: isMobile ? '100%' : 300 }}>
                <InputLabel id="sort-select-label">Sort by date:</InputLabel>
                <Select
                    labelId="sort-select-label"
                    value={sortOption}
                    label="Sort by date:"
                    onChange={onSortChange}
                >
                    {SORTOPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button 
                onClick={onClearFilters} 
                variant="outlined" 
                sx={{
                    color: 'black',
                    borderColor: 'black',
                    alignSelf: 'center' 
                }}>
                Clear Filters
            </Button>
        </Box>
    )
}

export default FilterAndSortContainer;