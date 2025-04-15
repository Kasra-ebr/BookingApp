import React from "react";

interface IForm {
  children: React.ReactNode;
}
function FormInput({ children, ...rest }: IForm) {
  return <form {...rest}>{children}</form>;
}

export default FormInput;
