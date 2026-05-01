import type { Meta, StoryObj } from '@storybook/react-vite';

import FileInput from './FileInput';

const meta = {
  title: 'Atoms/FileInput',
  component: FileInput,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Upload File',
  },
};

export const ImageOnly: Story = {
  args: {
    label: 'Upload Image',
    accept: 'image/*',
  },
};

export const MultipleFiles: Story = {
  args: {
    label: 'Choose Files',
    multiple: true,
  },
};

export const PdfOnly: Story = {
  args: {
    label: 'Upload PDF',
    accept: '.pdf',
  },
};

export const Disabled: Story = {
  args: {
    label: 'File Upload (Disabled)',
    disabled: true,
  },
};
