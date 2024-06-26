import { useState } from "react";
import { Card, CardMedia, Menu, MenuItem, Typography } from "@mui/material";

const CardComponent = ({ picture, minerId, claimPassId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.id === "claimPass") {
      window.open(
        `https://opensea.io/assets/ethereum/0xae351b8ae55b69a5007618e598dde89d0a092c37/${claimPassId}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (e.target.id === "lostMiners") {
      window.open(
        `https://opensea.io/assets/ethereum/0x3bcacb18f4d60c8cba68cd95860daf3e32bebcb6/${minerId}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <>
      <Card onClick={handleClick}>
        <CardMedia
          component="img"
          height="95"
          image={picture}
          alt="Could not load Miner"
        />
        <Typography
          sx={{
            fontSize: 12,
            textAlign: "center",
            marginTop: "1px",
            backgroundColor: "#0c111a",
            fontWeight: "bold",
          }}
        >
          #{minerId}
        </Typography>
      </Card>
      <Menu
        id="collections-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ marginTop: "1rem" }}
      >
        {claimPassId && (
          <MenuItem onClick={handleClose} id="claimPass">
            Lost Miners Claim Passes
          </MenuItem>
        )}
        {minerId && (
          <MenuItem onClick={handleClose} id="lostMiners">
            Lost Miners of the Ether
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default CardComponent;
