'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import styles from './Support.module.scss';

import FAQTab from './FAQTab/faqTab.jsx';
import TicketsTab from './TicketsTab/ticketsTab.jsx';

export default function SupportPage() {
    const [tab, setTab] = useState(0);

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
    };

    return (
        <Box className={styles.supportWrapper}>
            <Box className={styles.titleContainer}>
                <Typography variant='h3' sx={{ fontWeight: 500 }}>
                    Підтримка
                </Typography>
            </Box>

            <Tabs value={tab}
                  onChange={handleTabChange}
                  className={styles.supportTabs}
                  sx={{
                      borderBottom: '1px solid #333',
                      '.MuiTab-root': {
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          minWidth: 'auto',
                          padding: '8px 16px',
                          '&:hover': {
                              color: 'var(--hover-color)',
                          },
                          '&.Mui-selected': {
                              fontWeight: 500,
                              color: 'var(--active-element)',
                          },
                      },
                      '.MuiTabs-indicator': {
                          backgroundColor: 'var(--active-element)',
                          height: '1px',
                      },
                  }}
            >
                <Tab label='FAQ'/>
                <Tab label='Тікети'/>
            </Tabs>

            {tab === 0 && <FAQTab />}
            {tab === 1 && <TicketsTab />}
        </Box>
    );
}
