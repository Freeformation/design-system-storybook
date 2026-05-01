import type { Meta, StoryObj } from '@storybook/react-vite';

import Heading from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    children: 'Main Title',
    level: 1,
  },
};

export const H2: Story = {
  args: {
    children: 'Section title',
    level: 2,
  },
};

export const H3: Story = {
  args: {
    children: 'Subsection title',
    level: 3,
  },
};

export const H4: Story = {
  args: {
    children: 'Small heading',
    level: 4,
  },
};
