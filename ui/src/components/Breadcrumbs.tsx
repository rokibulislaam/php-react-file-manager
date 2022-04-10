import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';

const items = [
  { title: 'Dir1', href: '#' },
  { title: 'Dir2', href: '#' },
  { title: 'Dir3', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

export default function Breadcrumbs() {
  return (
    <>
      <MantineBreadcrumbs>{items}</MantineBreadcrumbs>
    </>
  );
}
