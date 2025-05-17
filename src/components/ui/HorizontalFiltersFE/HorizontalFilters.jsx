'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IconButton, TextField, Checkbox, FormControlLabel } from '@mui/material';
import styles from './HorizontalFilters.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { getAttributes } from "@/api/ClientServices/catalogService.js";

const filtersList = [
    { label: 'Жанри', key: 'genres' },
    { label: 'Механіки', key: 'mechanics' },
    { label: 'Теги', key: 'tags' },
    { label: 'Маркер 18+', key: 'matureContents' },
];

const HorizontalFilters = ({ filters, onFiltersChange }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [filtersData, setFiltersData] = useState({});
    const [searchInput, setSearchInput] = useState(filters.search || '');
    const filtersWrapperRef = useRef(null);

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
        const handleClickOutside = (event) => {
            if (filtersWrapperRef.current && !filtersWrapperRef.current.contains(event.target)) {
                setOpenIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setSearchInput(filters.search || '');
    }, [filters.search]);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
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

    const handleRemoveFilter = (category, value) => {
        const updatedFilters = { ...filters };

        if (Array.isArray(updatedFilters[category])) {
            updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
        } else {
            updatedFilters[category] = category === 'discountOnly' ? false : '';
        }

        onFiltersChange(updatedFilters);
    };

    const clearAll = () => {
        onFiltersChange({
            genres: [],
            mechanics: [],
            tags: [],
            matureContents: [],
            search: '',
            discountOnly: false,
        });
    };

    return (
        <div className={styles.filterMainContainer}>
            {/* Список фільтрів */}
            <div ref={filtersWrapperRef} className={styles.filtersWrapper}>
                {filtersList.map((filter, index) => (
                    <div key={index} className={styles.filterBlock}>
                        <button
                            className={`${styles.filterButton} ${openIndex === index ? styles.active : ''}`}
                            data-category={filter.key}
                            onClick={() => handleToggle(index)}
                        >
                            {filter.label}
                        </button>
                        {openIndex === index && (
                            <div className={`${styles.filterContent} ${styles.open}`}>
                                {filtersData[filter.key]?.map((option) => (
                                    <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                                checked={filters[filter.key]?.includes(option)}
                                                onChange={() => handleCheckboxChange(filter.key, option)}
                                                sx={{
                                                    color: '#aaa',
                                                    '&.Mui-checked': {
                                                        color: '#8D59F6',
                                                    },
                                                }}
                                            />
                                        }
                                        label={option}
                                        sx={{ color: '#ccc' }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Пошук */}
                <div className={styles.filterBlock}>
                    <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Пошук гри..."
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearchSubmit();
                        }}
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
                            ),
                        }}
                        sx={{
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
                </div>
            </div>

            {/* Обрані фільтри */}
            <div className={styles.selectedFilters}>
                {Object.entries(filters).flatMap(([category, values]) =>
                    Array.isArray(values) && values.length > 0
                        ? values.map((value) => (
                            <span
                                key={`${category}-${value}`}
                                className={styles.filterChip}
                                data-category={category}
                            >
                                {value}
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveFilter(category, value)}
                                    disableRipple
                                >
                                    <CancelIcon fontSize="inherit" />
                                </IconButton>
                            </span>
                        ))
                        : []
                )}

                {filters.search && (
                    <span
                        className={styles.filterChip}
                        data-category="search"
                    >
                        Пошук: "{filters.search}"
                        <IconButton size="small" onClick={() => handleRemoveFilter('search', '')} disableRipple>
                            <CancelIcon fontSize="inherit" />
                        </IconButton>
                    </span>
                )}

                {(Object.values(filters).some(arr => Array.isArray(arr) && arr.length > 0) || filters.search) && (
                    <span className={styles.filterChip}>
                        Очистити всі
                        <IconButton
                            size="small"
                            onClick={clearAll}
                            disableRipple
                        >
                            <CancelIcon fontSize="inherit" />
                        </IconButton>
                    </span>
                )}
            </div>
        </div>
    );
};

export default HorizontalFilters;
