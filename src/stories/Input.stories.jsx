import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default {
  title: "Example/Input",
  component: Input,
  tags: ["autodocs"],

  args: {
    className: "",
    placeholder: "Input",
  },
  argTypes: {
    className: {
      description: "can be add/replace using tailwind utilities",
    },
    props: {
      description:
        "props for the input React.InputHTMLAttributes<HTMLInputElement>",
      control: { type: "object" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Storybook for Shadcn Input Components  - [Input](https://ui.shadcn.com/docs/components/input)",
      },
    },
  },
};

export const Default = {
  component: Input,
  args: {
    className: "",
  },
};

export const InputDisabled = {
  component: Input,
  args: {
    className: "",
    disabled: true,
  },
};
