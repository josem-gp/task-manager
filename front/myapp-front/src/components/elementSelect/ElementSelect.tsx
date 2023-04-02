import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ElementSelectProps } from "./ElementSelect.types";
import { colors } from "../../utils/colors";

export function ElementSelect({ name }: ElementSelectProps) {
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
        // value={userGroups.selectedGroupId}
        // onChange={chooseGroup}
        sx={{
          color: colors.textDark,
        }}
      >
        {/* {groupMap} */}
        <MenuItem
          key="test"
          value="test"
          sx={{
            color: colors.textLight,
          }}
        >
          Harcoded test
        </MenuItem>
      </Select>
    </FormControl>
  );
}
