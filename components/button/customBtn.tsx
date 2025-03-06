import Link from "next/link";
import React from "react";
import styles from "./button.module.css";
import Image from "next/image";

interface ButtonProps {
  text: string;
  bgColor: string;
  url: string;
  img?: string;
}

const CustomBtn = ({ url, bgColor, text, img }: ButtonProps) => {
  const style = {
    width: "14rem",
    height: "3.5rem",
    display: "flex",
    gap: "10px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    backgroundColor: bgColor,
    borderRadius: "100px",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "700",
  };

  return (
    <>
      <Link href={url} className={styles.learn} style={style}>
        {img && <Image src={img} alt="" width={30} height={30} />}
        <span>{text}</span>
      </Link>
    </>
  );
};

export default CustomBtn;
