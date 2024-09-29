import { useState, useEffect } from "react";
import axios from "axios";
import { Tree, Loader, Text, Group, RenderTreeNodePayload } from "@mantine/core";
import { IconFolder, IconFile, IconFolderOpen, IconFolderFilled } from "@tabler/icons-react";

interface File {
  id: string;
  name: string;
  base64Content: string;
}

interface Folder {
  id: string;
  name: string;
  childrenFolders: Folder[];
  files: File[];
}

interface DataRoom {
  id: string;
  name: string;
  folders: Folder[];
}

interface DataRoomTreeViewProps {
  dataRoomId: string;
}

interface FileIconProps {
  name: string;
  isFolder: boolean;
  hasChildren: boolean;
  expanded: boolean;
}

const buildTreeItems = (item: DataRoom | Folder): any[] => {
  const folderItems =
    "folders" in item
      ? item.folders.map((folder) => buildTreeItems(folder)).flat()
      : item.childrenFolders.map((folder) => buildTreeItems(folder)).flat();

  const fileItems =
    "files" in item
      ? item.files.map((file) => ({
          value: `file-${file.id}`,
          label: file.name,
        }))
      : [];

  return [
    {
      value: item.id,
      label: item.name,
      children: [...folderItems, ...fileItems],
    },
  ];
};

function FileIcon({ isFolder, expanded, hasChildren }: FileIconProps) {
  if (!isFolder) {
    return <IconFile size={14} stroke={2.5} />;
  }

  if (expanded) {
    return <IconFolderOpen size={14} stroke={2.5} />;
  }

  if (hasChildren) {
    return <IconFolderFilled size={14} stroke={2.5} />;
  }

  return <IconFolder size={14} stroke={2.5} />;
}

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={5} {...elementProps}>
      <FileIcon name={node.value} isFolder={!node.value.includes("file-")} hasChildren={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
    </Group>
  );
}

export default function DataRoomTreeView({ dataRoomId }: DataRoomTreeViewProps) {
  const [dataRoom, setDataRoom] = useState<DataRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://playground-core.onrender.com/DataRooms/${dataRoomId}`);
        setDataRoom(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch DataRoom data. Please try again later.");
        console.error("Error fetching DataRoom:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDataRoom();
  }, [dataRoomId]);

  if (loading) {
    return <Loader size="xs" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!dataRoom) {
    return <Text>No data available.</Text>;
  }

  const treeItems = buildTreeItems(dataRoom);

  return <Tree expandOnSpace data={treeItems} renderNode={(payload) => <Leaf {...payload} />} />;
}
