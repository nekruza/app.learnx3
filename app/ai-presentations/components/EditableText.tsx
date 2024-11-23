"use client"
import { useCallback, useRef } from "react";
import { TextField, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { usePresentationStore } from "@/components/zustand";
import { updateNestedContent } from "../helpers/updateNestedContent";

const EditableText = ({ text, textStyle, path }: {
  text: string,
  textStyle?: any,
  path: string[],
}) => {
  const { presentation, setPresentation } = usePresentationStore();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = useCallback(() => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      const updatedPresentation = updateNestedContent({ path, value: newValue, presentation });
      setPresentation(updatedPresentation);
    }
  }, [path, setPresentation]);

  return isEditing ? (
    <TextField
      inputRef={inputRef}
      defaultValue={text}
      onBlur={handleBlur}
      size="small"
      sx={{
        width: 'max-content',
        minWidth: 300,
        maxWidth: 400,
        '& .MuiInputBase-input': {
          ...textStyle,
        }
      }}
    />
  ) : (
    <Typography sx={textStyle}>{text}</Typography>
  );
}

EditableText.displayName = 'EditableText';

export default EditableText;