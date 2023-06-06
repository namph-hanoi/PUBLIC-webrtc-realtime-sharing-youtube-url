import { Box, CircularProgress } from "@mui/material"
import styles from './styles.module.css';

const LoadingBox = () => (
  <>
    <CircularProgress
      size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2
      }}
    />
    <Box className={`w-full h-full fixed ${styles.background}`} />
  </>
);

export default LoadingBox;
