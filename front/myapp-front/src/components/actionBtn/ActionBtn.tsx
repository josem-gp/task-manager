import { Button } from "@mui/material";

function ActionBtn() {
  return (
    <Button
      variant="outlined"
      sx={{
        color: "#f9bb19",
        fontWeight: "bold",
        border: "1px solid #f9bb19",
        "&:hover": {
          backgroundColor: "rgba(255, 182, 0, 0.05);",
          border: "1px solid #f9bb19",
        },
      }}
      // onClick={handleSearchClear}
    >
      Hardcoded
    </Button>
  );
}

export default ActionBtn;
