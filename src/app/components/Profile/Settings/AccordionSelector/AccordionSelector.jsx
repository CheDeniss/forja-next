'use client';

import React from 'react';
import styles from './AccordionSelector.module.scss';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";

const AccordionSelector = ({ title, children, onClick, isActive }) => {
    return (
        <Accordion
            className={styles.accordion}
            expanded={isActive} // Контролюється зовні
            onChange={onClick} // Клік по заголовку
        >
            <AccordionSummary
                className={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography className={styles.label}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default AccordionSelector;
