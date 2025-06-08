import * as React from "react";
import { cn } from "../lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", //Esto permite que el componente tenga sus estilos base,
          className //pero que también puedas pasar clases extra desde afuera si lo necesitás (className).
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
