'use client';

import React from 'react';
import { Modal, Box, Fade } from '@mui/material';
import styles from './ModalWrapper.module.scss';

const ModalWrapper = ({ open, onClose, children }) => {
    return (
        <Modal open={open}
               onClose={onClose}
               closeAfterTransition
               BackdropProps={{
                   sx: {
                       backdropFilter: 'blur(2px)',
                       backgroundColor: 'rgba(30, 30, 30, 0.5)'},

               }}>
            <Fade in={open}>
                <Box className={styles.modalBox}>
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalWrapper;
