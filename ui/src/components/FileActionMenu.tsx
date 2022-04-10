import { Button, Divider, Group, Input, Menu, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { CheckIcon } from '@modulz/radix-icons';
import React, { useState } from 'react';

import { FileZip, Link, Pencil, Trash } from 'tabler-icons-react';
import api from '../api';

function RenameModal({
  renameModalStats,
  filename,
  renameData,
}: {
  filename: string;
  renameModalStats: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  renameData: {
    operation: 'rename';
    path: string;
    basePath?: string;
  };
}) {
  const [newName, setNewName] = useState(filename);

  return (
    <Modal
      opened={renameModalStats[0]}
      onClose={() => renameModalStats[1](false)}
      title="Please enter new name"
    >
      <Group spacing={'xs'} position="apart">
        <Input
          value={newName}
          width={'100%'}
          placeholder={'Enter new name for the file ' + filename}
          style={{ flexGrow: 1 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewName(e.target.value);
          }}
        />
        <Button
          size="xs"
          variant="filled"
          onClick={() => {
            api.rename({ ...renameData, newName }).then(() => {
              renameModalStats[1](false);

              showNotification({
                id: 'rename' + filename,
                title: 'Renaming file',
                message: `The file: ${filename} has been renamed successfully`,
                autoClose: true,
                icon: <CheckIcon />,
              });
            });
          }}
        >
          Rename
        </Button>
      </Group>
    </Modal>
  );
}

export default function FileActionsMenu({
  filename,
  path,
  type,
  basePath,
}: {
  filename: string;
  path: string;
  type: 'file' | 'dir' | 'back';
  basePath?: string;
}) {
  const renameModalStats = useState(false);

  return (
    <>
      <Menu>
        <Menu.Label>Choose an action</Menu.Label>
        <Menu.Item
          onClick={() => {
            renameModalStats[1](true);
          }}
          icon={<Pencil size={14} />}
        >
          Rename
        </Menu.Item>
        <Menu.Item icon={<FileZip size={14} />}>Zip archive</Menu.Item>
        <Menu.Item icon={<Link size={14} />}>Direct link</Menu.Item>

        <Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          onClick={() => {
            api.deleteFile(path, type).then(() => {
              showNotification({
                id: 'delete' + filename,
                title: 'Uploading File',
                message: `The file: ${filename} has been deleted successfully`,
                autoClose: true,
                icon: <CheckIcon />,
              });
            });
          }}
          color="red"
          icon={<Trash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu>
      <RenameModal
        renameData={{ operation: 'rename', path, basePath }}
        renameModalStats={renameModalStats}
        filename={filename}
      />
    </>
  );
}
