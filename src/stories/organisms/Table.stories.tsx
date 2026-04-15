import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Table from './Table';

const columns = [{ key: 'name', title: 'Name' }, { key: 'age', title: 'Age' }];
const basicData = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

const extendedData = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
  { name: 'Diana', age: 28 },
  { name: 'Eve', age: 32 },
];

const meta = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: 'object' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { rows: basicData },
  render: (args) => <Table columns={columns} data={args.rows || basicData} />,
};

export const WithMoreRows: Story = {
  args: { rows: extendedData },
  render: (args) => <Table columns={columns} data={args.rows || extendedData} />,
};

export const LargeTable: Story = {
  args: {
    rows: [
      { name: 'User 1', age: 20 },
      { name: 'User 2', age: 21 },
      { name: 'User 3', age: 22 },
      { name: 'User 4', age: 23 },
      { name: 'User 5', age: 24 },
      { name: 'User 6', age: 25 },
      { name: 'User 7', age: 26 },
      { name: 'User 8', age: 27 },
    ],
  },
  render: (args) => <Table columns={columns} data={args.rows} />,
};

