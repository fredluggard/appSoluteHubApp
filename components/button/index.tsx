import Link from "next/link";
import React from "react";
import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  url: string;
}

const LinkButton = ({ url, text }: ButtonProps) => {
  return (
    <>
      <Link href={url} className={styles.learn}>
        <span>{text}</span>
      </Link>
    </>
  );
};

export default LinkButton;
