import React, { useContext, useState } from 'react';
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  LoadingOverlay,
  Anchor,
  Button,
} from '@mantine/core';
import {
  FileIcon,
  defaultStyles as fileIconDefaultStyles,
  DefaultExtensionType,
} from 'react-file-icon';
import { ArrowBack, Folder } from 'tabler-icons-react';
import FileActionsMenu from './FileActionMenu';

import { useGetFiles } from '../hooks/queryHooks';
const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function FileList() {
  const [currentPath, setCurrentPath] = useState('');
  const { data, isLoading, error, refetch } = useGetFiles(currentPath);
  console.log({ currentPath });
  const files = data?.items;

  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['']);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => {
      if (files) {
        return current.length === files?.length
          ? []
          : files.map((item) => item.name);
      }
      return [''];
    });

  const rows = files
    ?.sort((firstItem, secondItem) =>
      firstItem.name > secondItem.name ? 1 : -1
    )
    .map((item) => {
      const selected = selection.includes(item.name);
      const fileExtension = (item.name.split('.').pop() ||
        'folder') as DefaultExtensionType;

      return (
        <tr key={item.name} className={cx({ [classes.rowSelected]: selected })}>
          <td>
            {item.type !== 'back' && (
              <Checkbox
                checked={selection.includes(item.name)}
                onChange={() => toggleRow(item.name)}
                transitionDuration={0}
              />
            )}
          </td>
          <td>
            <Group spacing="sm">
              <Avatar p={3} size={30}>
                {item.type == 'file' ? (
                  <FileIcon
                    extension={fileExtension}
                    {...fileIconDefaultStyles[fileExtension]}
                  />
                ) : item.type == 'back' ? (
                  <Button onClick={() => setCurrentPath(item.path)}>
                    <ArrowBack />
                  </Button>
                ) : (
                  <Folder />
                )}
              </Avatar>
              {item.type === 'dir' ? (
                <Anchor onClick={() => setCurrentPath(item.path)}>
                  <Text size="sm" weight={500}>
                    {item.name}
                  </Text>
                </Anchor>
              ) : (
                <Text size="sm" weight={500}>
                  {item.name}
                </Text>
              )}
            </Group>
          </td>
          <td>{item.size}</td>
          <td>{item.time}</td>
          <td width={20}>
            {item.type !== 'back' && (
              <FileActionsMenu
                filename={item.name}
                path={item.path}
                type={item.type}
                basePath={data?.location}
              />
            )}
          </td>
        </tr>
      );
    });
  return (
    <ScrollArea>
      <div style={{ minHeight: 400 }}>
        <LoadingOverlay visible={isLoading} />
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === files?.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== files?.length
                  }
                  transitionDuration={0}
                />
              </th>
              <th>Name</th>
              <th>Size</th>
              <th>Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </ScrollArea>
  );
}
