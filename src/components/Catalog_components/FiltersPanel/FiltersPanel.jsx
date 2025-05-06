'use client';

import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
    TextField, IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './FiltersPanel.module.scss';
import { getAttributes } from "../../../api/catalogService.js";
import SearchIcon from '@mui/icons-material/Search';

const sectionMap = [
    { title: 'Жанри', key: 'genres' },
    { title: 'Механіки', key: 'mechanics' },
    { title: 'Теги', key: 'tags' },
    { title: 'Маркери 18+', key: 'matureContents' },
];

const FiltersPanel = ({ filters, onFiltersChange }) => {
    const [expanded, setExpanded] = useState(null);
    const [filtersData, setFiltersData] = useState({});
    const [searchInput, setSearchInput] = useState(filters.search || '');

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const data = await getAttributes();
                setFiltersData(data);
            } catch (err) {
                console.error('Помилка при завантаженні фільтрів:', err);
            }
        };

        fetchFilters();
    }, []);

    useEffect(() => {
        setSearchInput(filters.search || '');
    }, [filters.search]);


    const handleChange = (index) => (_, isExpanded) => {
        setExpanded(isExpanded ? index : null);
    };

    const handleCheckboxChange = (key, option) => {
        const current = filters[key] || [];
        const isSelected = current.includes(option);

        const updatedFilters = {
            ...filters,
            [key]: isSelected
                ? current.filter(o => o !== option)
                : [...current, option],
        };

        onFiltersChange(updatedFilters);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchSubmit = () => {
        const updatedFilters = {
            ...filters,
            search: searchInput,
        };
        onFiltersChange(updatedFilters);
    };

    const handleDiscountToggle = () => {
        const updatedFilters = {
            ...filters,
            discountOnly: !filters.discountOnly,
        };
        onFiltersChange(updatedFilters);
    };

    return (
        <div className={styles.panel}>
            {/* Тайтл і пошук */}
            <span className={styles.filtersTitle}>Фільтри</span>

            <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Пошук гри..."
                value={searchInput}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={handleSearchSubmit}
                            disableRipple
                            sx={{
                                backgroundColor: '#363636',
                                color: '#E2E2E2',
                                borderRadius: '2px',
                                '&:hover': {
                                    backgroundColor: '#8D59F6',
                                },
                                '&:active': {
                                    backgroundColor: '#006568',
                                },
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    )
                }}
                sx={{
                    my: 2,
                    backgroundColor: '#4D4D4D',
                    borderRadius: '2px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '2px',
                        paddingRight: 0,
                        '& input': {
                            paddingRight: 0,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    },
                }}
            />


            {/* Основні фільтри */}
            {sectionMap.map(({ title, key }, index) => {
                const options = filtersData[key] || [];
                const selected = filters[key] || [];

                return (
                    <Accordion
                        key={key}
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                        className={styles.accordion}
                        data-category={key}
                        disableGutters
                        elevation={0}
                        square
                    >
                        <AccordionSummary className={styles.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                            <Typography className={styles.label}>{title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={styles.accordionDetails}>
                            <FormGroup>
                                {options.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                                size="small"
                                                checked={selected.includes(option)}
                                                onChange={() => handleCheckboxChange(key, option)}
                                            />
                                        }
                                        label={option}
                                    />
                                ))}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>
                );
            })}

            {/* Додаткові фільтри */}
            <Accordion
                expanded={expanded === 'extra'}
                onChange={(_, isExpanded) => setExpanded(isExpanded ? 'extra' : null)}
                className={styles.accordion}
                disableGutters
                data-category={'other'}
                elevation={0}
                square
            >
                <AccordionSummary className={styles.accordionSummary} expandIcon={<ExpandMoreIcon />}>
                    <Typography className={styles.label}>Додаткові фільтри</Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordionDetails}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    size="small"
                                    checked={filters.discountOnly || false}
                                    onChange={handleDiscountToggle}
                                />
                            }
                            label="Тільки зі знижками"
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FiltersPanel;
