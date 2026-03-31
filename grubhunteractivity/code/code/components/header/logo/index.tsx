import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import grubhub from "../../../public/assets/grubhub.png";

export const Logo = (
    <Link href="/" aria-label="Go to homepage" className={styles.root} tabIndex={0}>
      <Image
        src={grubhub}
        alt="GrubHunter logo"
        fill
        style={{ objectFit: "contain" }}
        priority
        sizes="(min-width: 600px) 169px, 119px"
      />
    </Link>
  );
