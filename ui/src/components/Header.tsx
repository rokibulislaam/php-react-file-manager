import React, { useState } from 'react';
import {
  Text,
  createStyles,
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Button,
  Anchor,
} from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import ThemeToggle from './ThemeToggle';
import { Logout } from 'tabler-icons-react';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

export default function Header() {
  const { classes } = useStyles();
  const username = useLocalStorageValue({
    key: 'user',
    defaultValue: 'Guest',
  });
  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Text> File Manager </Text>
        <Group spacing={'lg'}>
          Welcome {username}
          <ThemeToggle />
          <Anchor href="./signout.php">
            <Button variant="light" rightIcon={<Logout />}>
              Sign out
            </Button>
          </Anchor>
        </Group>
      </Container>
    </MantineHeader>
  );
}
