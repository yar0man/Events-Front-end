import { Images } from "@/assets";
import { Container, Typography } from "@mui/material";

const Header: React.FC = () => {
    return(
        <Container
          sx={{
            position: "relative",
            backgroundImage: `url(${Images.icBackground.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
           }}
          maxWidth={false}
        >
         <Typography
          sx={{
            fontWeight: 700,
            color: "white",
            fontSize: 40,
            textAlign: "center",
          }}
        >
          Events
        </Typography>
    </Container>
    )
}

export default Header;