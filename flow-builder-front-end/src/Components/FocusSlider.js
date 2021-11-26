import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';

export default function FocusSlider(props) {
  const {
      value,
      setValue
  } = props

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Box sx={{ width: 200 }}>
        <Typography>Focus</Typography>
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <Grid container justifyContent="space-between">
            <Grid item>
                Offensive
            </Grid>
            <Grid item>
                Defensive
            </Grid>
        </Grid>
    </Box>
  );
}