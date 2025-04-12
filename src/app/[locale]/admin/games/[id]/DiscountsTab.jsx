'use client';

import React from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './DiscountTab.module.scss';

const DiscountsTab = ({ editMode, formData, setFormData }) => {
    const discounts = formData.discounts || [];

    const handleDiscountChange = (index, field, value) => {
        const updated = [...discounts];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, discounts: updated });
    };

    const handleAddDiscount = () => {
        const newDiscount = { percent: 0, startDate: '', endDate: '' };
        setFormData({ ...formData, discounts: [...discounts, newDiscount] });
    };

    const handleDeleteDiscount = (index) => {
        const updated = discounts.filter((_, i) => i !== index);
        setFormData({ ...formData, discounts: updated });
    };

    return (
        <Box className={styles.tabSection}>
            <Typography variant="h5" gutterBottom>
                Знижки
            </Typography>

            {!discounts.length && <Typography>Немає активних знижок.</Typography>}

            {discounts.map((discount, index) => (
                <Box key={index} className={styles.discountItem}>
                    <TextField
                        label="Відсоток"
                        type="number"
                        name="percent"
                        value={discount.percent}
                        onChange={(e) => handleDiscountChange(index, 'percent', e.target.value)}
                        disabled={!editMode}
                    />
                    <TextField
                        label="Початок"
                        type="date"
                        value={discount.startDate?.slice(0, 10) || ''}
                        onChange={(e) => handleDiscountChange(index, 'startDate', e.target.value)}
                        disabled={!editMode}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Кінець"
                        type="date"
                        value={discount.endDate?.slice(0, 10) || ''}
                        onChange={(e) => handleDiscountChange(index, 'endDate', e.target.value)}
                        disabled={!editMode}
                        InputLabelProps={{ shrink: true }}
                    />

                    {editMode && (
                        <IconButton onClick={() => handleDeleteDiscount(index)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}

            {editMode && (
                <Button variant="outlined" onClick={handleAddDiscount} sx={{ mt: 2 }}>
                    Додати знижку
                </Button>
            )}
        </Box>
    );
};

export default DiscountsTab;
