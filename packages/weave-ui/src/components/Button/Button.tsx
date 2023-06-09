import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";

import type { BaseComponentProps } from "@/components/BaseComponentProps";
import Component from "@/components/Component/Component";
import TouchRipple from "@/components/TouchRipple/TouchRipple";
import useTouchRipples from "@/hooks/useTouchRipples";
import useTouchRippleTrigger from "@/hooks/useTouchRippleTrigger";
import { schemas } from "@/tokens";
import getVariant from "@/utils/getVariant";
import pick from "@/utils/pick";
import type { RecipeVariantsNames, VariantSelector } from "@/utils/Types";

import { buttonClassName, touchRippleClassName } from "./Button.css";

type ButtonVariantsSelector = VariantSelector<
  RecipeVariantsNames<typeof buttonClassName, "variant">
>;

type ButtonColorSelector = VariantSelector<
  RecipeVariantsNames<typeof buttonClassName, "color">
>;

type ButtonTypeSelector = VariantSelector<
  RecipeVariantsNames<typeof buttonClassName, "type">
>;

export type ButtonProps = BaseComponentProps &
  AriaButtonProps<"button"> &
  ButtonVariantsSelector &
  ButtonColorSelector &
  ButtonTypeSelector;

const Button: React.FC<ButtonProps> = ({
  children,
  filled,
  tonal,
  text,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  const { triggerRipple, ripples } = useTouchRipples();
  const { triggerProps } = useTouchRippleTrigger(buttonProps, triggerRipple);

  const variant = getVariant({ filled, tonal, text });
  const color = getVariant(pick(props, schemas.variants.color));
  const type = getVariant(pick(props, schemas.variants.type));

  const className = buttonClassName({ variant, color, type });

  return (
    <Component
      as="button"
      _ref={ref}
      _className={className}
      {...props}
      {...buttonProps}
      {...triggerProps}
    >
      {ripples.map(({ key, ...ripple }) => (
        <TouchRipple key={key} className={touchRippleClassName} {...ripple} />
      ))}
      {children}
    </Component>
  );
};

export default Button;