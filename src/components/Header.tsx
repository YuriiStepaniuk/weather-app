import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { WbSunny, Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  borderRadius: "0 0 15px 15px",
  padding: theme.spacing(1),
}));

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <WbSunny fontSize="large" sx={{ mr: 1 }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Weather App
          </Typography>
        </Box>
        <Box sx={{ width: 40 }} /> {/* Spacer for balance */}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
