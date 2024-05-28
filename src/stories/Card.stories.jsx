import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default {
  title: "Example/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "can be add/replace using tailwind utilities",
    },
    CardHeader: {
      description: "The header of the card. ",
      control: { type: "object" },
    },
    CardFooter: {
      description: "The footer of the card.",
      control: { type: "object" },
    },
    CardTitle: {
      description: "The title of the card.",
      control: { type: "object" },
    },
    CardDescription: {
      description: "The description of the card.",
      control: { type: "object" },
    },
    CardContent: {
      description: "The content of the card.",
      control: { type: "object" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Storybook for Shadcn Card Components  - [Card](https://ui.shadcn.com/docs/components/card) ",
      },
    },
  },
};

export const Playground = {
  args: {
    className: "",
    children: (
      <>
        <CardHeader>
          <CardTitle className="text-2xl">Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <p>This is a card content</p>
        </CardContent>
        <CardFooter>Card Footer</CardFooter>
      </>
    ),
  },
};
