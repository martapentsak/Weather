import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type Props = {
  value: number;
  max: number;
};

export const WeatherSlider = ({ value, max }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        size="small"
        defaultValue={value}
        max={max}
        aria-label="Small"
        valueLabelDisplay="auto"
        disabled
      />
    </Box>
  );
};
