import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Form from './Form';
import Input from '../atoms/Input';

const meta = {
  title: 'Molecules/Form',
  component: Form,
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <Form onSubmit={(e: any) => e.preventDefault()}>
      <Input placeholder="Name" />
    </Form>
  ),
};

export const WithMultipleInputs: Story = {
  render: () => (
    <Form onSubmit={(e: any) => e.preventDefault()}>
      <Input placeholder="Full Name" />
      <Input placeholder="Email" />
      <Input placeholder="Phone" />
    </Form>
  ),
};

export const WithErrorState: Story = {
  render: () => (
    <Form onSubmit={(e: any) => e.preventDefault()}>
      <Input placeholder="Username" error helperText="This field is required" />
      <Input placeholder="Password" />
    </Form>
  ),
};

