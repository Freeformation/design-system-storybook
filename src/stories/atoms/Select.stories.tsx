import type { Meta, StoryObj } from '@storybook/react-vite';

import Select from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    helperText: { control: 'text' },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose Option',
    options: [
      { value: 'one', label: 'Option One' },
      { value: 'two', label: 'Option Two' },
      { value: 'three', label: 'Option Three' },
    ],
  },
};

export const WithValue: Story = {
  args: {
    label: 'Selected',
    value: 'two',
    options: [
      { value: 'one', label: 'Option One' },
      { value: 'two', label: 'Option Two' },
      { value: 'three', label: 'Option Three' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    options: [
      { value: 'one', label: 'Option One' },
      { value: 'two', label: 'Option Two' },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: 'Invalid Selection',
    error: true,
    helperText: 'Please select a valid option',
    options: [
      { value: 'one', label: 'Option One' },
      { value: 'two', label: 'Option Two' },
    ],
  },
};
