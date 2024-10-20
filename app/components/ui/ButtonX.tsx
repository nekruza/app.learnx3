import { Button } from "@mui/material";

export default function ButtonX({ text, onClick, style }: { text: string, onClick: () => void, style?: React.CSSProperties }) {
  return <Button onClick={onClick} size="small" sx={{
    background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))",
    color: 'white',
    fontWeight: 600,
    padding: "5px 10px",
    transition: "transform 0.3s ease-in-out",
    '&:hover': {
      transform: "scale(1.02)",
      boxShadow: "0 4px 17px rgba(0,0,0,.08)",
    },
    ...style,
  }}>{text}</Button>;
}
