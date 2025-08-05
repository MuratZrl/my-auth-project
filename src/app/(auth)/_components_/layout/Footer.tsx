import { Box, Typography } from "@mui/material";

export default function Footer () {

  return(
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} >

      <Typography
        variant="subtitle2"

        color="white"
        fontWeight={600}
        gutterBottom
      >
        © 2025 Updated. All rights reserved. | Terms of Service | Privacy Policy
      </Typography>

    </Box>
  );
}