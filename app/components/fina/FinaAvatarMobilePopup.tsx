import * as React from "react"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import { DialogContent } from "@mui/material"
import Fina from "@/fina/Fina"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	zIndex: 9999,
	"& .MuiDialogContent-root": {
		padding: theme.spacing(0),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(0),
	},
}))

export const FinaAvatarMobilePopup: React.FC<{
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = React.memo(({ open, setOpen }) => {
	return (
		<BootstrapDialog fullWidth fullScreen maxWidth="md" open={open} sx={{ zIndex: 999 }}>
			<DialogContent dividers sx={{ background: "#271f4d" }}>
				<Fina handleClose={() => setOpen(false)} />
			</DialogContent>
		</BootstrapDialog>
	)
})
