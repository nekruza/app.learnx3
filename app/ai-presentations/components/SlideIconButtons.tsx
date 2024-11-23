import { Box, IconButton } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { isAdminOrTeacher } from "@/components/hooks/userRoles";
import { usePresentationStore, useStoreUser } from "@/components/zustand";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CancelIcon from '@mui/icons-material/Cancel';
import ApiServices from "@/api/ApiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { generatePDF } from "./ConverToPDF";
import DownloadIcon from '@mui/icons-material/Download';

interface SlideIconButtonsProps {
  fullscreenSlide: number | null;
  index: number;
  setFullscreenSlide: (index: number) => void;
}

export function SlideIconButtons({
  fullscreenSlide,
  index,
  setFullscreenSlide,
}: SlideIconButtonsProps) {
  const { userInfo } = useStoreUser();
  const queryClient = useQueryClient()
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const { presentation } = usePresentationStore();

  const params = useParams()

  const { apiRequest } = ApiServices()
  const id = params.id

  // Save Presentation
  const {
    mutate: savePresentation,
    isLoading: isLoadingSave,
    isError: isErrorSave,
  } = useMutation(
    () => apiRequest("PUT", presentation, { collectionName: "presentations", uid: id as string }),
    {
      onSuccess: () => queryClient.invalidateQueries([`presentation-${id}`]),
    }
  )

  // Notify
  const notify = () => toast.success("Presentation successfully edited!");

  // Toggle Editing
  const toggleEditing = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isEditing) {
      params.delete('edit');
      savePresentation()
      notify()
    } else {
      params.set('edit', 'true');
    }
    router.push(`?${params.toString()}`);
  };

  // Cancel Editing
  const cancelEditing = () => {
    router.push(`?${params.toString()}`);
  }

  if (isLoadingSave) {
    return <SpinningCircles />
  }

  if (isErrorSave) {
    return <p>Error saving presentation</p>
  }

  return (
    <Box sx={{ position: 'absolute', right: fullscreenSlide === null ? 10 : 60, top: 10, width: 'fit-content' }}>
      {isAdminOrTeacher(userInfo) && (
        isEditing ? (
          <>
            <IconButton
              onClick={toggleEditing}
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                cancelEditing()
              }}
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <IconButton
            onClick={toggleEditing}
            sx={{
              color: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <EditIcon />
          </IconButton>
        )
      )}

      {fullscreenSlide === null ? (
        <IconButton
          onClick={() => setFullscreenSlide(index)}
          sx={{
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          <FullscreenIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => generatePDF("presentation-container")}
          sx={{
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          <DownloadIcon sx={{ fontSize: 27 }} />
        </IconButton>
      )}
    </Box>
  );
} 