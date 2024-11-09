import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import { brandColors } from '@/components/utils/brandColors';

interface FullScreenSlideModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullScreenSlideModal = ({ open, onClose, children }: FullScreenSlideModalProps) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
    >
      <DialogContent sx={{ p: 0, background: '#eeeeff', position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 50,
            top: 45,
            color: brandColors.grey,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenSlideModal; 