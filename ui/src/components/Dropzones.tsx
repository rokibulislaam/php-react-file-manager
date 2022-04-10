import {
  FullScreenDropzone as MantineFullScreenDropzone,
  Dropzone,
  DropzoneStatus,
} from '@mantine/dropzone';

import {
  Button,
  createStyles,
  Group,
  MantineTheme,
  Modal,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { CloudUpload } from 'tabler-icons-react';
import useFileUpload from '../hooks/useFileUpload';
const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: 250,
    left: 'calc(50% - 125px)',
    bottom: -20,
  },
}));

function getActiveColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.black;
}
function dropzoneChildren(status: DropzoneStatus, theme: MantineTheme) {
  return (
    <Group position="center">
      <div style={{ pointerEvents: 'none' }}>
        <Group position="center">
          <CloudUpload size={50} color={getActiveColor(status, theme)} />
        </Group>
        <Text
          align="center"
          weight={700}
          size="lg"
          mt="xl"
          sx={{ color: getActiveColor(status, theme) }}
        >
          {status.accepted
            ? 'Drop files here'
            : status.rejected
            ? 'Files less than allowed size'
            : 'Upload resume'}
        </Text>
        <Text align="center" size="sm" mt="xs" color="dimmed">
          Drag&apos;n&apos;drop files here to upload
        </Text>
      </div>
    </Group>
  );
}
export function DropzoneButton({
  setModalOpened,
}: {
  setModalOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const openRef = useRef<() => void>();

  const [files, setFiles] = useState<File[]>();
  useFileUpload(files, setModalOpened);
  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef as any}
        onDrop={(files) => {
          setFiles(files);
        }}
        className={classes.dropzone}
        radius="md"
        onReject={(err) => {
          console.log({ err });
        }}
      >
        {(status: DropzoneStatus) => dropzoneChildren(status, theme)}
      </Dropzone>
      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
    </div>
  );
}

export function FullScreenDropzone() {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<File[]>();
  useFileUpload(files);
  return (
    <>
      <MantineFullScreenDropzone
        disabled={false}
        accept={['*']}
        onDrop={setFiles}
      >
        {(status: DropzoneStatus) => dropzoneChildren(status, theme)}
        {/* See dropzone children in previous demo */}
      </MantineFullScreenDropzone>
    </>
  );
}

export function UploadButtonModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Choose your file!"
      >
        <DropzoneButton setModalOpened={setOpened} />
      </Modal>

      <Button leftIcon={<CloudUpload />} onClick={() => setOpened(true)}>
        Upload files
      </Button>
    </>
  );
}
