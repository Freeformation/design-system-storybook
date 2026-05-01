import type { Meta, StoryObj } from '@storybook/react-vite';

import Image from './Image';

const meta = {
  title: 'Atoms/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '/assets/avif-test-image.avif',
    alt: 'Test image',
  },
};

export const WithDimensions: Story = {
  args: {
    src: '/assets/avif-test-image.avif',
    alt: 'Test image with dimensions',
    width: 400,
    height: 300,
  },
};

export const LazyLoaded: Story = {
  args: {
    src: '/assets/avif-test-image.avif',
    alt: 'Lazy loaded image',
    loading: 'lazy',
  },
};
