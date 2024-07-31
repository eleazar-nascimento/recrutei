import "../../index.css";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/dnd/card";

const meta = {
  title: "Component/Card",
  component: Card,

  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Nova Vaga",
    description: "Tudo sobre essa nova vaga",
    responsibles: [
      {
        label: "Eleazar Nascimento",
        value: "Eleazar Nascimento",
      },
    ],
    status: "backlog",
    id: "1",
    deadline: "2024-07-22",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardPrimary: Story = {
  args: {},
};
