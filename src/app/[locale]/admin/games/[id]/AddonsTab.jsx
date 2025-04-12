'use client';

import React from 'react';
import styles from './AddonsTab.module.scss';
import { Box, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AddonsTab = ({ addons, editMode, onDeleteAddon }) => {
    return (
        <Box className={styles.tabSection}>
            <Typography variant="h5" gutterBottom>
                Доповнення
            </Typography>

            {!addons.length && (
                <Typography variant="body1">У гри наразі немає доповнень.</Typography>
            )}

            <ul className={styles.addonsList}>
                {addons.map((addon) => (
                    <li key={addon.id} className={styles.addonItem}>
                        <img src={addon.logoUrl} alt={addon.title} className={styles.addonImage} />
                        <div className={styles.addonInfo}>
                            <Typography variant="subtitle1">{addon.title}</Typography>
                            <Typography variant="body2">{addon.shortDescription}</Typography>
                            <Typography variant="body2" color="secondary">Ціна: ${addon.price}</Typography>
                        </div>

                        {editMode && (
                            <IconButton
                                color="error"
                                onClick={() => onDeleteAddon(addon.id)}
                                aria-label="Видалити аддон"
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </li>
                ))}
            </ul>

            {editMode && (
                <Button variant="outlined" sx={{ mt: 2 }}>
                    Додати доповнення
                </Button>
            )}
        </Box>
    );
};

export default AddonsTab;
