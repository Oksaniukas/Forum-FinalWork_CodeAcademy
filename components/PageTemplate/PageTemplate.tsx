import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  
  return (
    <div className={styles.wrapper}>
      <Header  />
      <div className={styles.main}>{children}</div>
      <Footer  />
    </div>
  );
};

export default PageTemplate;
