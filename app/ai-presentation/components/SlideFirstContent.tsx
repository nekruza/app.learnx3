import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Typography, TextField } from "@mui/material";

export const SlideFirstContent = ({ content }: { content: string }) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const [editedParagraph, setEditedParagraph] = useState(content

  );
  return <Typography paragraph>
    {isEditing ? (
      <TextField
        value={editedParagraph}
        onChange={(e) => setEditedParagraph(e.target.value)}
        size="small"
        sx={{ width: 'max-content', minWidth: 500, }}
      />
    ) : content}
  </Typography>
}