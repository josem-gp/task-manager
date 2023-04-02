import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ElementSelect from "../elementSelect/ElementSelect";
import ActionBtn from "../actionBtn/ActionBtn";

function FilterBar() {
  return (
    <>
      <Stack
        width="100%"
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={1}
      >
        <TextField
          // onChange={handleSearchInput}
          // value={searchInput}
          variant="standard"
          sx={{ ml: 1, flex: 1, maxWidth: "400px" }}
          placeholder="Search tasks..."
          InputProps={{
            sx: { background: "#F4F4F4", padding: "12px", borderRadius: "4px" },
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="search tasks"
                  // onClick={handleSearchSubmit}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <ActionBtn />
      </Stack>
      <Typography
        variant="h6"
        fontSize={14}
        borderBottom="2px solid #f9bb19"
        padding="2px 0px"
        width="fit-content"
        sx={{
          marginLeft: "8px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Filter by
      </Typography>
      <Stack
        width="100%"
        alignItems="center"
        direction="row"
        spacing={1}
        marginLeft="8px"
      >
        <ElementSelect />
      </Stack>
    </>
  );
}

export default FilterBar;
