import React, { ReactNode, MouseEventHandler } from "react";
import classNames from "classnames/bind";
import Styles from "./Button.module.scss";
import Link from "next/link";

const cx = classNames.bind(Styles);

// Define prop types for Button component
interface ButtonProps {
  to?: string;
  href?: string;
  ref?: React.Ref<HTMLAnchorElement | HTMLButtonElement>; // Ref can be for Link or button
  NavLink?: boolean;
  toggleMenu?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  active?: boolean;
  barButton?: boolean;
  collapse?: boolean;
  directionLink?: boolean;
  research_information?: boolean;
  active_research?: boolean;
  className?: string;
  leftIcon?: ReactNode;
  isInformation?: boolean;
  rightIcon?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>; // Click handler for both Link and button
  [key: string]: any; // To capture any other props
}

const Button: React.FC<ButtonProps> = ({
  to,
  href,
  ref,
  NavLink,
  toggleMenu,
  rounded,
  barButton,
  disabled = false,
  active = false,
  collapse,
  directionLink,
  className,
  research_information,
  active_research,
  leftIcon,
  rightIcon,
  children,
  onClick,
  ...passProps
}) => {
  let Comp: React.ElementType = "button";
  let _props: { [key: string]: any } = { onClick, ...passProps };

  // Remove event handlers when button is disabled
  if (disabled) {
    Object.keys(_props).forEach((key) => {
      // Ensure key is a valid keyof _props and that it is a function
      if (
        key.startsWith("on") &&
        typeof _props[key as keyof typeof _props] === "function"
      ) {
        delete _props[key as keyof typeof _props];
      }
    });
  }

  // Use Link if "to" prop is provided
  if (to) {
    _props.href = to;
    Comp = Link;
  } else if (href) {
    _props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    active,
    NavLink,
    toggleMenu,
    rounded,
    barButton,
    research_information,
    directionLink,
    active_research,
    collapse,
    [className as string]: className, // Ensure className is treated as string
  });

  return (
    <Comp className={classes} {..._props}>
      {leftIcon && <span className={cx("icon_left")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {rightIcon && <span className={cx("icon_right")}>{rightIcon}</span>}
    </Comp>
  );
};

export default Button;
