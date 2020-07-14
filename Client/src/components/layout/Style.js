import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    root: {
      width: '100%',
    },
    whiteBackground: {
      background:'white',
    },
    button: {
      margin: theme.spacing(1),
    },
    media: {
      height: 170
  },
  cardContent:{
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  }
  }));

  export const  useNoUnderLineStyles = makeStyles({
    underline: {
      "&&&:before": {
        borderBottom: "none"
      },
      "&&:after": {
        borderBottom: "none"
      }
    }
  });