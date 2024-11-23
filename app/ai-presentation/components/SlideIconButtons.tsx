import { IconButton } from "@mui/material";
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
import { LoadingSpinners } from "@/components/constants/loadingSpinners";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";

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

  const savePresentationOnFirebase = (updatedPresentation: any) => {

  }

  const toggleEditing = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isEditing) {
      params.delete('edit');
      savePresentation()
    } else {
      params.set('edit', 'true');
    }
    router.push(`?${params.toString()}`);
  };

  if (isLoadingSave) {
    return <SpinningCircles />
  }

  if (isErrorSave) {
    return <p>Error saving presentation</p>
  }

  return (
    <>
      {fullscreenSlide === null && (
        <IconButton
          onClick={() => setFullscreenSlide(index)}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          <FullscreenIcon />
        </IconButton>
      )}
      {isAdminOrTeacher(userInfo) && (
        isEditing ? (
          <>
            <IconButton
              onClick={toggleEditing}
              sx={{
                position: 'absolute',
                right: 80,
                top: 10,
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              onClick={toggleEditing}
              sx={{
                position: 'absolute',
                right: 50,
                top: 10,
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
              position: 'absolute',
              right: 50,
              top: 10,
              color: 'rgba(0, 0, 0, 0.6)',
            }}
          >
            <EditIcon />
          </IconButton>
        )
      )}
    </>
  );
} 