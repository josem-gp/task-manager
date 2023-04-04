import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ElementSelectProps } from "./ElementSelect.types";
import { colors } from "../../utils/colors";

export function ElementSelect({
  elements,
  elementId,
  setElementId,
}: ElementSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    // The MUI component needs to be controlled so we set
    setElementId(event.target.value);
  };

  // Map over user Groups and render each one
  const userGroups = elements?.map((group) => (
    <MenuItem key={group.id} value={group.id}>
      {group.name}
    </MenuItem>
  ));

  return (
    <FormControl
      fullWidth
      sx={{
        marginBottom: { xs: "20px", lg: "40px" },
        marginTop: { xs: "20px", lg: "0" },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: `${colors.primary} !important`,
        },
      }}
    >
      <Select
        value={elementId}
        onChange={handleChange}
        sx={{
          color: colors.textDark,
        }}
      >
        {userGroups}
      </Select>
    </FormControl>
  );
}
