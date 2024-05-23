import {useState} from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import type { CardFields } from '../types/types'



const CardComponent = ({picture, minerId, claimPassId}: CardFields) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: any) => {
    setAnchorEl(null);
    if(e.target.id === "claimPass"){
      window.open(`https://opensea.io/assets/ethereum/0xae351b8ae55b69a5007618e598dde89d0a092c37/${claimPassId}`, '_blank', 'noopener,noreferrer');
    }else if(e.target.id === "lostMiners"){
      window.open(`https://opensea.io/assets/ethereum/0x3bcacb18f4d60c8cba68cd95860daf3e32bebcb6/${minerId}`, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <>
      <Card onClick={handleClick} sx={{transform: open ? "scale(1.30)" : "scale(1)", transition:"all .2s ease-in-out", margin: "1em",width: "5em", height: "7em", borderRadius: "5px" ,boxShadow: "0 16px 16px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 1)" }}>
        <CardMedia
          component="img"
          height="95"
          image={picture}
          alt="Could not load Miner"
        />
        <Box sx={{fontSize:9, textAlign: "center", marginTop: "5px"}}>#{minerId}</Box>
      </Card>
      <Menu
        id="collections-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{marginTop: "1rem"}}
      >
        {claimPassId && <MenuItem onClick={handleClose} id="claimPass">Lost Miners Claim Passes</MenuItem>}
        {minerId && <MenuItem onClick={handleClose} id="lostMiners">Lost Miners of the Ether</MenuItem>}
      </Menu>
    </>
  );
}

export default CardComponent