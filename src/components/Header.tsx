import { AppBar, Toolbar, Typography } from "@mui/material";
import { WbSunny } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { ROUTE } from "../route";

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
        <Link
          to={ROUTE.HOME}
          style={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
        </Link>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
