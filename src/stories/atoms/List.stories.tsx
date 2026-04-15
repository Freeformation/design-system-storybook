import type { Meta, StoryObj } from '@storybook/react-vite';

import List from './List';

const meta = {
  title: 'Atoms/List',
  component: List,
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const ShorterList: Story = {
  args: {
    items: ['Apple', 'Banana'],
  },
};

export const LongerList: Story = {
  args: {
    items: [
      'First item',
      'Second item',
      'Third item',
      'Fourth item',
      'Fifth item',
      'Sixth item',
    ],
  },
};
