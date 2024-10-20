import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import UpgradeToPro from './UpgradeToPro';
import ButtonX from '../ui/ButtonX';
import CloseIcon from '@mui/icons-material/Close';


export default function PricingModal({ buttonText }: { buttonText: string, }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonX onClick={handleClickOpen} text={buttonText} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogActions sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}>
          <Button onClick={handleClose} sx={{ minWidth: 'auto', p: 1 }}>
            <CloseIcon sx={{ color: "grey" }} />
          </Button>
        </DialogActions>
        <DialogContent sx={{ p: 0 }}>
          <UpgradeToPro onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
