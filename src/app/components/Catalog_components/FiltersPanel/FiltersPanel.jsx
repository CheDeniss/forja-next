'use client';

import React, {useState} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FiltersPanel.module.scss';

const filterData = [
    {
        title: 'Genre',
        options: ['RPG', 'Action', 'Strategy', 'Simulation'],
    },
    {
        title: 'Platform',
        options: ['Windows', 'macOS', 'Linux'],
    },
];

const FiltersPanel = () => {
    const [expanded, setExpanded] = useState(null); // index або null

    const handleChange = (panelIndex) => (_, isExpanded) => {
        setExpanded(isExpanded ? panelIndex : null);
    };

    return (
        <div className={styles.panel}>
            {filterData.map(({ title, options }, index) => (
                <Accordion
                    key={title}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    className={styles.accordion}
                    disableGutters
                    elevation={0}
                    square
                >
                    <AccordionSummary className={styles.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                        <Typography className={styles.label}>{title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles.accordionDetails}>
                        <FormGroup>
                            {options.map((opt) => (
                                <FormControlLabel
                                    key={opt}
                                    control={<Checkbox size="small" />}
                                    label={opt}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FiltersPanel;