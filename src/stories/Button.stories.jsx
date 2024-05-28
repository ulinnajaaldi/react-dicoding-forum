import { Button } from "@/components/ui/button";
import { fn } from "@storybook/test";
import { BiChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";

export default {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    variant: "default",
    size: "default",
    className: "",
    asChild: false,
    props: {},
  },
  argTypes: {
    onClick: {
      action: "clicked",
      description: "() => void",
    },
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      control: { type: "radio" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "radio" },
      description: "For icon must be used with React.FunctionComponent",
    },
    className: {
      description: "can be add/replace using tailwind utilities",
    },
    asChild: {
      description: "Render as child",
    },
    props: {
      description:
        "props for the button React.ButtonHTMLAttributes<HTMLButtonElement>",
      control: { type: "object" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Storybook for Shadcn Button Components  - [Button](https://ui.shadcn.com/docs/components/button) ",
      },
    },
  },
};

export const Playground = {
  args: {
    children: "Button",
    size: "lg",
  },
};

export const ButtonIcon = {
  args: {
    size: "icon",
    asChild: true,
    children: <BiChevronLeft size="42" />,
  },
  argTypes: {
    size: {
      options: ["icon"],
    },
  },
};

export const ButtonWithIcon = {
  args: {
    size: "default",
    children: (
      <>
        <BiChevronLeft size="24" />
        <span>Back to home</span>
      </>
    ),
  },
  argTypes: {
    size: {
      options: ["default", "sm", "lg"],
    },
  },
};

export const ButtonAsChild = {
  args: {
    asChild: true,
    children: <a href="/home">Back to home</a>,
  },
};
