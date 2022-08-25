import React from 'react';
import styles from './SidebarModal.module.css';

const portalEl = document.getElementById('overlays');

const Modal = ({ children }) => {
  return <div className={styles.sidebar}></div>;
};

const SidebarModal = () => {
  return <>{ReactDOM.createPortal(<Modal />)}</>;
};

export default SidebarModal;
