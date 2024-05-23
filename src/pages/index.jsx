import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ marginRight: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick("/forgottens")}
          disabled={loading && loadingButton !== "/forgottens"} // Disable if loading and not the loading button
        >
          {loading && loadingButton === "/forgottens" ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Go to Forgottens"
          )}
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleButtonClick("/holdback")}
          disabled={loading && loadingButton !== "/holdback"} // Disable if loading and not the loading button
        >
          {loading && loadingButton === "/holdback" ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Go to Holdback"
          )}
        </Button>
      </div>
    </div>
  );
}
