import React, { ComponentProps } from "react";

type IButton = ComponentProps<"button">
function Button({ children, ...rest }:IButton) {
  return <button {...rest}>{children}</button>;
}

export default Button;
