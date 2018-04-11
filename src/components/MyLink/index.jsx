import React, { Component } from "react";
import Link from "gatsby-link";

const MyLink = ({
  to,
  onClick,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onMouseOver,
  onFocus,
  style,
  className,
  children,
  external = false,
  target = "_blank",
  ...others
}) => {
  if (React.isValidElement(children)) {
    children = React.Children.map(children, child =>
      React.cloneElement(child, { ...others })
    );
  }

  if (external) {
    return (
      <a
        href={to}
        rel="external nofolow"
        style={style}
        className={className}
        target={target}
        onClick={onClick}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link
        style={{ textDecoration: "none", ...style }}
        className={className}
        to={to}
        onClick={onClick}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onFocus={onFocus}
      >
        {children}
      </Link>
    );
  }
};

export default MyLink;
