import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider, createTheme } from "@mantine/core";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.tsx";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "violet",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="829238052362-bqdf19ndlargg1710v066f8gptf0bgi5.apps.googleusercontent.com">
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>{" "}
    </GoogleOAuthProvider>
  </StrictMode>
);
