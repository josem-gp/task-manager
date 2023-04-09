import React from "react";
import { TagRendererProps } from "./Card.types";
import { Grid, Typography } from "@mui/material";

function TagCard({ element }: TagRendererProps) {
  return (
    <Grid item>
      <Typography
        variant="subtitle2"
        border="2px solid #f9bb19"
        padding="2px 6px"
        borderRadius="4px"
        sx={{
          maxWidth: "fit-content",
        }}
        // onClick={() => props.handleOpenTagCard("show", tag)}
      >
        {element.slug}
      </Typography>
    </Grid>
  );
}

export default TagCard;
