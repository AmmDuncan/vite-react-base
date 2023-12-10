import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@/components/Icon/Icon';
import { kebabToPascalCase } from '@/utils/helpers';

const iconNameOptions = Object.entries(
  import.meta.glob('../../assets/icons/*.svg', {
    eager: true,
    import: 'default',
  }),
)
  .map(([key]) => key.split('/').at(-1)?.replace('.svg', ''))
  .filter((val): val is string => Boolean(val))
  .map(kebabToPascalCase);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    name: {
      control: 'select',
      options: iconNameOptions,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Eye',
  },
};

export const SizeWithTextSixe: Story = {
  args: {
    name: 'Eye',
    style: { fontSize: '32px' },
  },
};

export const WithColor: Story = {
  args: {
    name: 'Eye',
    style: { color: 'red' },
  },
};
