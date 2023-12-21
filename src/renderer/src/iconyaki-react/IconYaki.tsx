import styles from "./iconyaki.module.css";

interface IconYakiProps {
  iconStr: string;
  viewBox: string;
}

export interface IconProps {
  size?: number;
  className?: string;
  role?: string;
}

const withIconYaki = ({ iconStr, viewBox }: IconYakiProps) => {
  return function Icon({ size, className = "iconyaki", role = "iconyaki", ...rest }: IconProps) {
    return (
      <span className={styles.iconyaki} {...rest}>
        <svg
          role={role}
          className={className}
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
