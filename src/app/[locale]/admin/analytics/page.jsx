'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import styles from './AdminAnalyticsPage.module.scss';

import AuditLogTab from './components/AuditLogTab.jsx';
import SessionsTab from './components/SessionsTab.jsx';
import AggregateTab from './components/AggregateTab.jsx';

export default function Page() {
    const [tab, setTab] = useState(0);

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
    };

    return (
        <Box className={styles.analitWrapper}>
            <Typography variant="h4" className={styles.titleContainer}>
                Аналітика
            </Typography>

            <Tabs
                value={tab}
                onChange={handleTabChange}
                className={styles.tabBar}
                sx={{
                    borderBottom: '1px solid #333',
                    marginBottom: '20px',

                    '.MuiTab-root': {
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        minWidth: 'auto',
                        padding: '8px 16px',
                        '&:hover': { color: 'var(--hover-color)' },
                        '&.Mui-selected': {
                            color: 'var(--active-element)',
                            fontWeight: 600
                        }
                    },
                    '.MuiTabs-indicator': {
                        backgroundColor: 'var(--active-element)',
                        height: '1px'
                    }
                }}
            >
                <Tab label="Аудит лог" />
                <Tab label="Сесії" />
                <Tab label="Агрегація" />
            </Tabs>

            <Box className={styles.tabContent}>
                {tab === 0 && <AuditLogTab />}
                {tab === 1 && <SessionsTab />}
                {tab === 2 && <AggregateTab />}
            </Box>
        </Box>
    );
}
