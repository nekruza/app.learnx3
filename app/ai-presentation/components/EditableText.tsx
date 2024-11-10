"use client"
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function EditableText({ text, textStyle }: {
  text: string,
  textStyle?: any,
}) {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const [editedText, setEditedText] = useState(text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };


  return isEditing ? (
    <TextField
      value={editedText}
      onChange={handleChange}
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
    <Typography sx={textStyle}>{editedText}</Typography>
  );
}