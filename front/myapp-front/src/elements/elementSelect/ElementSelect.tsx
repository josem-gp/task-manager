import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ElementSelect() {
  return (
    <FormControl
      fullWidth
      sx={{
        marginBottom: { xs: "20px", lg: "40px" },
        marginTop: { xs: "20px", lg: "0" },
      }}
    >
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          background: "white",
          paddingRight: "6px",
        }}
      >
        Choose group
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={userGroups.selectedGroupId}
        label="Age"
        // onChange={chooseGroup}
      >
        {/* {groupMap} */}
        <MenuItem key="test" value="test">
          Harcoded test
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ElementSelect;
