import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './Content.module.css';

const Content = () => {
  return (
    <main className={styles.section}>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Content;
