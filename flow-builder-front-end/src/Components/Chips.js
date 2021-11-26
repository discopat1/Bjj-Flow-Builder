import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import dataSet from '../BaseLayout/Data'

export default function Chips() {

  const [combos, setCombos] = React.useState([])

  const handleClick = () => {
    console.info('You clicked the Chip.');
    makeArr(5)
    // makeCombos(10)
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };


// timer for each component/sequence

// user picks number of components, time for each component(countdown inside of chip), complexity of components, focus (slider) (offensive heavy, defensive heavy, balanced)
  // use stepper instead of chips


  // everything has to be combined with situation
  // scrambling has to be followed by attacking or defending

  const makeCombos = (value) => {
    // value will come from slider and will determine how complex the combos are
    const positions = dataSet.positions
    const situations = dataSet.situations
    const techniques = dataSet.techniques

    const randoSit = situations[Math.floor(Math.random()*situations.length)]
    const randoPos = positions[Math.floor(Math.random()*positions.length)]
    const randoTech = techniques[Math.floor(Math.random()*techniques.length)]

    // const sequence =  `${randoSit} ${randoPos} ${randoTech}`
    const values = {
      10: [randoSit, randoPos, randoTech],
      25: [randoSit, randoTech]
    }
    console.log (values[value])
    const sequence = values[value].join(' ')
    return sequence
  }

  const makeArr = (n) => {
    const arr = []
    for (let i = 0; i < n; i++) {
      arr.push(makeCombos(10))
    }
    setCombos(arr)
  }



  return (

    <Stack direction="row" spacing={1}>
      <Chip
              label={'click me'}
              variant="outlined"
              onClick={handleClick}
              onDelete={handleDelete}
            />
      {
        combos.map(e => {
          return (
            <Chip
              label={e}
              variant="outlined"
              onClick={handleClick}
              onDelete={handleDelete}
            />
          )
        })
      }
    </Stack>
  );
}