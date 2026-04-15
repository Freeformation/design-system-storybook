import type { Meta, StoryObj } from '@storybook/react-vite';

import Link from './Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Click here',
  },
};

export const Primary: Story = {
  args: {
    href: '#',
    children: 'Primary link',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    href: '#',
    children: 'Secondary link',
    color: 'secondary',
  },
};

export const NoUnderline: Story = {
  args: {
    href: '#',
    children: 'Link without underline',
    underline: 'none',
  },
};
