import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import FeedbackIcon from '@material-ui/icons/Feedback';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './style.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, character, score, updateScore }) {
  let challengeComplete = score === 3;
  const handleClose = () => {
    setOpen(false);
    updateScore(0);
  };

  return (
    <div>
      <Dialog
        className="modal"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            textAlign: 'center',
            color: challengeComplete ? 'rgb(23,105,170)' : 'rgb(206, 119, 38)',
          }}
          id="alert-dialog-slide-title"
        >
          {challengeComplete ? (
            <>
              {'Challenge Completed'} <CheckCircleIcon />
            </>
          ) : (
            <>
              {'Sorry'} <FeedbackIcon />
            </>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            style={{ color: '#ccc', textAlign: 'center' }}
            id="alert-dialog-slide-description"
          >
            {challengeComplete ? (
              <>{'All twelve characters were clicked just once'}</>
            ) : (
              <>{`${character} was clicked more than once`}</>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ margin: '0 auto' }}
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleClose}
          >
            {challengeComplete ? 'Play Again' : 'Try Again'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
