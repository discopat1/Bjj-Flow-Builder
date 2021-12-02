import React, { useState, createContext, useContext } from 'react';
import clsx from 'clsx';
import { useTheme, createTheme, ThemeProvider, styled  } from '@mui/material/styles';
import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ComplexitySlider from '../Components/ComplexitySlider'
import FocusSlider from '../Components/FocusSlider';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TimerIcon from '@mui/icons-material/Timer';
import TagIcon from '@mui/icons-material/Tag';
import useStyles from './BaseLayout.style';
import SequenceStepper from '../Components/SequenceStepper'
import combinations from './Data';
import Timer from '../Components/Countdown';
import Alarm from '../static/Alarm.m4a';
import ToggleSwitch from '../Components/ToggleSwitch';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


export default function BaseLayout(props) {
  const {
      ColorModeContext
    } = props
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext);

  
  const classes = useStyles();
  // const theme = useTheme();
  const timerSound = new Audio(Alarm);

  const [open, setOpen] = useState(true);
  const [sequenceVal, setSequenceVal] = useState(1);
  const [timePerSequence, setTimePerSequence] = useState(45);
  const [complexityValue, setComplexityValue] = useState(30);
  const [focusValue, setFocusValue] = useState(10);
  const [renderStepper, setRenderStepper] = useState(false);
  const [combos, setCombos] = React.useState([]);
  const [timer, setTimer] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [checked, setChecked] = useState(true);

  console.log('active step in base: ', activeStep)
  let utterance = new SpeechSynthesisUtterance(`Sequence ${activeStep+1}`);
  const declareSequence = () => speechSynthesis.speak(utterance)

  
  const amountArr = Array.from({length: 10}, (_, index) => index + 1);
  const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  
  const timeArr = range(45, 360, 5)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNumofSeqChange = (event) => {
    setSequenceVal(event.target.value);
  };

  const handletimePerSequenceChange = (event) => {
    setTimePerSequence(event.target.value);
  };

  const handleToggleChange = (event) => {
    setChecked(event.target.checked);
  };

  const buildFlow = () => {
    console.log(`
                number of squences: ${sequenceVal}\n
                time per sequence: ${timePerSequence}\n
                complexity value: ${complexityValue}\n
                focus value: ${focusValue}
              `)
    setRenderStepper(true)
    makeArr(sequenceVal, complexityValue)
    setTimer(true)
    setOpen(false)
  }

  const makeCombos = (complexityV) => {
    // value will come from slider and will determine how complex the combos are

    // take complexity value and give it a specific number based on a range
    const roundedCompV = Math.round(complexityV / 10) * 10
    
    const positionalCombos = combinations.positionalCombos
    const techniqueCombos = combinations.techniqueCombos
    const combos1 = () => positionalCombos()+` - `+techniqueCombos()
    const combos2 = () => combos1()+` - `+positionalCombos()
    const combos3 = () => combos1()+` - `+techniqueCombos()
    const combos4 = () => combos1()+` - `+combos1()
    const combos5 = () => combos1()+` - `+combos3()

    const randomPick = (arr) => {
      const pick = arr[Math.floor(Math.random()*arr.length)]
      return pick 
    }

    const values = {
      0: randomPick([positionalCombos(),techniqueCombos()]),
      10: randomPick([positionalCombos(),techniqueCombos(),combos1()]),
      20: combos1(),
      30: randomPick([combos1(),combos2()]),
      40: randomPick([combos1(),combos2(),combos3()]),
      50: randomPick([combos1(),combos2(),combos3(),combos4()]),
      60: randomPick([combos2(),combos3(),combos4()]),
      70: randomPick([combos2(),combos3(),combos4(),combos5()]),
      80: randomPick([combos2(),combos3(),combos4(),combos5()])+` - `+combos1(),
      90: randomPick([combos4(),combos5()])+` - `+randomPick([combos2(),combos3()]),
      100: randomPick([combos4(),combos5()])+` - `+randomPick([combos4(),combos5()])
    }
    return values[roundedCompV]
  }

  const makeBodyCombos = (complexityV) => {
    // value will come from slider and will determine how complex the combos are

    // take complexity value and give it a specific number based on a range
    const roundedCompV = Math.round(complexityV / 10) * 10

    const randomPick = (arr) => {
      const pick = arr[Math.floor(Math.random()*arr.length)]
      return pick 
    }

    const bodyCombos = combinations.bodyCombos
    const combo1 = () => randomPick(entries)[1]
    // make a set here instead
    const combo = (n) => {
      // new set to add to
      const arr = []
      for (let i = 0; i < n; i++) {
        arr.push(combo1())
      } 
      return arr.join(' - ')
    }

    const entries = Object.entries(bodyCombos())
    
    const values = {
      0: combo1(),
      10: randomPick([combo1(),combo(2)]),
      20: randomPick([combo1(),combo(2)],combo(3)),
      30: randomPick([combo(2),combo(3)]),
      40: randomPick([combo(3),combo(4)],combo(2)),
      50: randomPick([combo(3),combo(4)]),
      60: randomPick([combo(3),combo(4)],combo(5)),
      70: randomPick([combo(4)],combo(5)),
      80: randomPick([combo(4),combo(5)],combo(6)),
      90: combo1(),
      100: combo1()
    }
    
    return values[roundedCompV]
  }

  const makeArr = (n, c) => {
    const arr = []
    for (let i = 0; i < n; i++) {
      checked ? arr.push(makeBodyCombos(c)) : 
      arr.push(makeCombos(c))
    }
    setCombos(arr)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setTimer(false)
    setTimeout(() => setTimer(true),1000)
  };

  // .MuiInputBase-root 

  return (
    <Box
    sx={{
      bgcolor: 'background.primary',
      color: 'text.primary',
      display: 'flex'
    }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
            <MenuIcon color="inherit"/>
          </IconButton>
          <Typography variant="h6" noWrap>
            BJJ Flow Builder
          </Typography>
          <Switch onChange={colorMode.toggleColorMode} />
          {theme.palette.mode}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        
        <List>
            <ListItem>
                <ListItemIcon style={{color: 'inherit'}}><TagIcon/></ListItemIcon>
                <FormControl >
                    <InputLabel id="demo-simple-select-label" style={{color: 'inherit'}}>Number of Sequences</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{color: 'inherit'}}
                    value={sequenceVal}
                    onChange={handleNumofSeqChange}
                    >
                    {amountArr.map(e => (
                        <MenuItem value={e}>{e}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </ListItem>
            <ListItem >
                <ListItemIcon style={{color: 'inherit'}}><TimerIcon/></ListItemIcon>
                <FormControl >
                    <InputLabel id="demo-simple-select-label" style={{color: 'inherit'}}>Time per Sequence</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{color: 'inherit'}}
                    value={timePerSequence}
                    onChange={handletimePerSequenceChange}
                    >
                    {timeArr.map(e => {
                      let c=e
                      const minute = Math.floor(e/60)
                      const seconds = e - ((minute) * 60 )
                      c = `${minute}:${seconds}`
                         return <MenuItem value={e}>{c}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </ListItem>
            <ListItem>
              <ComplexitySlider
                value={complexityValue}
                setValue={setComplexityValue}
              />
            </ListItem>
            <ListItem>
              {/* <FocusSlider
                value={focusValue}
                setValue={setFocusValue}
              /> */}
              <ToggleSwitch
              checked={checked}
              handleToggleChange={handleToggleChange}
              />
            </ListItem>
        </List>
        <Divider />
        <Button variant="contained" className={classes.startButton} endIcon={<SendIcon />} onClick={buildFlow}>
          Build Flow
        </Button>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Welcome to BJJ Flow Builder. Customize your flow by selecting from the list of options. Click 'Build my flow' and start flowing!
        </Typography>
        {renderStepper ? (
          <SequenceStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            handleNext={handleNext}
            setTimer={setTimer}
            setRenderStepper={setRenderStepper}
            combos={combos}
            timerSound={timerSound}
            declareSequence={declareSequence}
          />
        ): null}
        {
        timer ? 
        <Timer 
          handleNext={handleNext}
          timerSound={timerSound}
          setTimer={setTimer}
          timePerSequence={timePerSequence}
          combos={combos}
          activeStep={activeStep}
        /> : null}
      </main>
    </Box>
  );
}
