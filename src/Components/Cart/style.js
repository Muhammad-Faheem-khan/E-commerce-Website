import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  
  

  title: {
    marginTop: '10%',
    '@media (max-Width: 767px)':{
      paddingTop: '10%'
    }
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  
  container: {
    width: '75%',
    position: 'relative',
 
    left: '12.5%',
  },
  cartBottomElements: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

  },
  cartButtons: {
 marginTop: '15px',
 marginBottom: '20px'
  },
  cartDetails: {
    marginTop: '30px',
  },

  
  
}));