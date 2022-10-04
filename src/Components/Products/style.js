import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0),
  },
  productGrid: {
    width: '90%',
    position: 'absolute',
    left: '5%',
    top: '25%'

  },

  mainHeading: {
    padding: '20px',
  },

  root: {
    flexGrow: 1,
  },
}));