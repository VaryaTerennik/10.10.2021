import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ verticalAlign: "middle", textAlign: "center" }}>
      <Typography
        variant="h3"
        gutterBottom
        component="h1"
        sx={{ mt: "0px", mb: "0px", color: "#716F81" }}
      >
        О проекте{" "}
      </Typography>
    </Box>
  );
}
