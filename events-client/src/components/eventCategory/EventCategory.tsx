import { CATEGORIES } from "@/constants/constants";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface EventCategoryProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}


const EventCategory: React.FC<EventCategoryProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {

  return (
      <FormControl sx={{ width: 321}}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory || ''}
          label="Category"
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default EventCategory;