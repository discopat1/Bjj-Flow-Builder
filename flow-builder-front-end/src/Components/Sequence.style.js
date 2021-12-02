import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '&.MuiStepper-root': {
            [theme.breakpoints.down('md')]: {
            flexDirection: 'column'
        },
        }
      },
  }));

  export default useStyles