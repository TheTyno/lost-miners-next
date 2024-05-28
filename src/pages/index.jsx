import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null); // Store the loading button
  const router = useRouter();

  const handleButtonClick = async (route) => {
    setLoadingButton(route); // Set the loading button when clicked
    setLoading(true); // Set loading to true
    await router.push(route); // Navigate to the corresponding route
    setLoading(false); // Set loading to false after navigation
    setLoadingButton(null); // Clear the loading button
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Lost Miners of the Ether
      </Typography>
      <img
        src="https://pbs.twimg.com/profile_images/1580935024081354754/p9Lz1R3h_400x400.jpg"
        alt="Lost Miners of the Ether"
        style={{
          width: "50%",
          maxWidth: "200px",
          height: "auto",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      />
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick("/forgottens")}
          disabled={loading && loadingButton !== "/forgottens"} // Disable if loading and not the loading button
          sx={{ fontWeight: "bold" }}
        >
          {loading && loadingButton === "/forgottens" ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Go to Forgottens"
          )}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleButtonClick("/holdbacks")}
          disabled={loading && loadingButton !== "/holdbacks"} // Disable if loading and not the loading button
          sx={{ fontWeight: "bold" }}
        >
          {loading && loadingButton === "/holdbacks" ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Go to Holdback"
          )}
        </Button>
      </div>
    </div>
  );
}
