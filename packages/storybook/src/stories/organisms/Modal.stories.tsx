import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from './Modal';
import Button from '../atoms/Button';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: any) => {
  const [open, setOpen] = useState(args.open ?? false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ minWidth: 300 }}>{args.children ?? 'Modal content'}</div>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  args: { open: false, children: 'This is a modal dialog.' },
  render: (args) => <ModalWrapper {...args} />,
};

export const AlertModal: Story = {
  args: {
    open: false,
    children: 'Alert: This is an important message!',
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const ConfirmationModal: Story = {
  args: {
    open: false,
    children: 'Are you sure you want to proceed?',
  },
  render: (args) => <ModalWrapper {...args} />,
};

export const LargeContentModal: Story = {
  args: {
    open: false,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
  },
  render: (args) => <ModalWrapper {...args} />,
};

