import { IconButton } from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { isAdminOrTeacher } from "@/components/hooks/userRoles";
import { useStoreUser } from "@/components/zustand";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CancelIcon from '@mui/icons-material/Cancel';

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';

  const toggleEditing = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isEditing) {
      params.delete('edit');
    } else {
      params.set('edit', 'true');
    }
    router.push(`?${params.toString()}`);
  };

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