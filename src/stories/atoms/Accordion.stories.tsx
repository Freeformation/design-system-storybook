import type { Meta, StoryObj } from '@storybook/react-vite';

import Accordion from './Accordion';

const meta = {
  title: 'Atoms/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    defaultOpen: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section 1',
    defaultOpen: false,
    children: 'This is the accordion content.',
  },
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Section',
    defaultOpen: true,
    children: 'This accordion is expanded by default.',
  },
};

export const WithLongContent: Story = {
  args: {
    title: 'Detailed Information',
    defaultOpen: false,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};
