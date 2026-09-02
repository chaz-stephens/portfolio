"use client";

import { useRef } from "react";
import styles from "./ImageLightbox.module.css";

interface ImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ImageLightbox({ src, alt, width, height, className }: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  };

  const close = () => {
    document.body.style.overflow = "";
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.trigger} ${className ?? ""}`}
        onClick={open}
        aria-label={`Expand screenshot: ${alt}`}
      >
        <img src={src} alt={alt} width={width} height={height} loading="lazy" className={styles.thumb} />
        <span className={styles.expandIcon} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
          </svg>
        </span>
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <img src={src} alt={alt} width={width} height={height} className={styles.full} />
        <button type="button" className={styles.closeBtn} onClick={close} aria-label="Close expanded image">
          &times;
        </button>
      </dialog>
    </>
  );
}
