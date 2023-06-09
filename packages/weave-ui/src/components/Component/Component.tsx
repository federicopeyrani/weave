import { assignInlineVars } from "@vanilla-extract/dynamic";
import { cx } from "classix";
import {
  ComponentProps as ReactComponentProps,
  createElement,
  ReactDOM,
} from "react";

import type { BaseComponentProps } from "@/components/BaseComponentProps";
import asArray from "@/utils/asArray";

type ComponentArguments<Type extends keyof ReactDOM> = {
  as: Type;
  _ref?: ReactComponentProps<Type>["ref"];
  _className?: BaseComponentProps["className"];
  _styles?: BaseComponentProps["styles"];
};

export type ComponentProps<Type extends keyof ReactDOM> = Omit<
  ReactComponentProps<Type>,
  "ref" | "className"
> &
  BaseComponentProps &
  ComponentArguments<Type>;

export const Component = <Type extends keyof ReactDOM>({
  as,
  _ref,
  _className,
  className,
  _styles,
  styles,
  style,
  ...props
}: ComponentProps<Type>) =>
  createElement(as, {
    ref: _ref,
    className: cx(...asArray(_className), ...asArray(className)),
    style:
      _styles || styles
        ? {
            ...assignInlineVars({
              ...(styles || {}),
              ...(_styles || {}),
            }),
            ...style,
          }
        : style,
    ...props,
  });

export default Component;