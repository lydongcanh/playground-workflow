import React, { useState, useEffect } from "react";
import { Button, Container, Text, Loader, Stack, Paper } from "@mantine/core";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface File {
  id: string;
  name: string;
  mimeType: string;
}

const GoogleDriveIntegration: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
    scope: "https://www.googleapis.com/auth/drive.readonly",
  });

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get("https://www.googleapis.com/drive/v3/files", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
          params: {
            fields: "files(id, name, mimeType)",
          },
        })
        .then((res) => {
          setFiles(res.data.files);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const renderFileList = () => {
    return files.map((file) => (
      <Paper key={file.id} padding="sm" shadow="xs">
        <Text>{file.name}</Text>
        <Text size="sm" color="dimmed">
          {file.mimeType === "application/vnd.google-apps.folder" ? "Folder" : "File"}
        </Text>
      </Paper>
    ));
  };

  return (
    <Container>
      <Stack spacing="md">
        {!user ? (
          <Button onClick={() => login()}>Connect to Google Drive</Button>
        ) : (
          <>
            <Text>Connected to Google Drive</Text>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Text size="xl">Your Files and Folders:</Text>
                {renderFileList()}
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default GoogleDriveIntegration;
