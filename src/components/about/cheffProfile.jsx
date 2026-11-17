import { Box, Typography } from '@mui/material'
import React from 'react'

const CheffProfile = ({image, name, title}) => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Box
            width={"150px"}
            height={"150px"}
            borderRadius={"50%"}
            sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            }}
        />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography fontWeight={"bold"} fontSize={"1.5rem"}>
            {name}
            </Typography>
            <Typography fontWeight={"light"}>{title}</Typography>
        </Box>
    </Box>
  )
}

export default CheffProfile