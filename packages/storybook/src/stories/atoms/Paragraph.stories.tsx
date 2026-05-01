import type { Meta, StoryObj } from '@storybook/react-vite';

import Paragraph from './Paragraph';

const meta = {
  title: 'Atoms/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default paragraph with some example text.',
  },
};

export const LongParagraph: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
};

export const ShortParagraph: Story = {
  args: {
    children: 'Short text.',
  },
};
