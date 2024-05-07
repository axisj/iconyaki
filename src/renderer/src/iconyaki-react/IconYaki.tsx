import React from "react";
import styles from "./iconyaki.module.css";

interface IconYakiProps {
  iconStr: string;
  viewBox: string;
}

export interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  role?: string;
}

const withIconYaki = ({ iconStr, viewBox }: IconYakiProps) => {
  return function Icon({ size, className = "iconyaki", role = "iconyaki", ...rest }: IconProps) {
    return (
      <span role={role} className={`${styles.iconyaki} ${className}`} {...rest}>
        <svg
          viewBox={viewBox}
          style={{ fontSize: size }}
          strokeWidth={0}
          dangerouslySetInnerHTML={{ __html: iconStr }}
        />
      </span>
    );
  };
};

export default withIconYaki;
