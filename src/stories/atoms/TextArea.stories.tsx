import type { Meta, StoryObj } from '@storybook/react-vite';

import TextArea from './TextArea';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
    rows: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Write something...',
    label: 'Comments',
    rows: 4,
  },
};

export const LargeTextArea: Story = {
  args: {
    placeholder: 'Write a detailed message...',
    label: 'Description',
    rows: 8,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot edit',
    label: 'Read Only',
    disabled: true,
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Your message',
    label: 'Message',
    error: true,
    helperText: 'Message is too short',
    rows: 4,
  },
};
