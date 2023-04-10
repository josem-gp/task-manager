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
  name,
  elements,
  elementId,
  setElementId,
}: ElementSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    // The MUI component needs to be controlled so we set
    setElementId(event.target.value);
  };

  // Map over elements and render each one
  const elementsRender = elements?.map((el) => {
    if ("name" in el) {
      const group = el;
      return (
        <MenuItem key={group.id} value={group.id}>
          {group.name}
        </MenuItem>
      );
    } else if ("user" in el) {
      const userObject = el;
      return (
        <MenuItem key={userObject.user.id} value={userObject.user.id}>
          {userObject.user.username}
        </MenuItem>
      );
    } else {
      return null;
    }
  });

  return (
    <FormControl
      fullWidth
      sx={{
        marginBottom: { xs: "20px", md: "0px" },
        marginTop: { xs: "20px", lg: "0" },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: `${colors.primary} !important`,
        },
      }}
    >
      <InputLabel
        sx={{
          background: "white",
          paddingRight: "6px",
          "&.Mui-focused": {
            color: colors.primary,
            fontWeight: "bold",
          },
        }}
      >
        {name}
      </InputLabel>
      <Select
        value={elementId}
        onChange={handleChange}
        sx={{
          color: colors.textDark,
        }}
      >
        {elementsRender}
      </Select>
    </FormControl>
  );
}
