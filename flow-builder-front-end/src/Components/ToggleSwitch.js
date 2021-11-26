import * as React from 'react';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ToggleSwitch(props) {
  const {
      checked,
      handleToggleChange
  } = props

//   const [checked, setChecked] = React.useState(true);

//   const handleToggleChange = (event) => {
//     setChecked(event.target.checked);
//   };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
        <Typography sx={{fontSize: 12}}>Technique</Typography>
        <Switch
        checked={checked}
        onChange={handleToggleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography sx={{fontSize: 12}}>Body Skills</Typography>
    </Stack>
  );
}