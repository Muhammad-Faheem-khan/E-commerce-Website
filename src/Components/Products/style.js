import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0),
  },
  productGrid: {
    width: '100%',
   display: 'flex',
   alignSelf: 'center',
   paddingTop: '20px',
   paddingLeft: theme.spacing(4)


  },

  mainHeading: {
    padding: '20px',
  },

  root: {
    flexGrow: 1,
  },
}));