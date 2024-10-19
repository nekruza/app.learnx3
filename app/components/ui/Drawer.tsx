import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fina from '@/fina/page';
import FinaAvatar from '../fina/FinaAvatar';


export default function DrawerComponent() {
  const [state, setState] = React.useState(false);

  return (
    <div>
      {(
        <React.Fragment key="left">
          <FinaAvatar handleFinaClick={() => setState(true)} />
          <Drawer
            anchor="right"
            open={state}
            onClose={() => setState(false)}
          >
            <Box sx={{ width: "100%" }}>
              <Fina handleClose={() => setState(false)} />
            </Box>
          </Drawer>
        </React.Fragment>
      )}
    </div>
  );
}
