'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Tabs from '@/components/Library/Tabs/Tabs.jsx';
import AllGames from '@/components/Library/AllGames/AllGames.jsx';
import Wishlist from '@/components/Library/Wishlist/Wishlist.jsx';
import styles from './LibraryPage.module.scss';

const LibraryPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get('tab');

    useEffect(() => {
        if (!activeTab) {
            const params = new URLSearchParams(searchParams);
            params.set('tab', 'all');
            router.replace(`?${params.toString()}`);
        }
    }, [activeTab, searchParams, router]);

    return (
        <div className={styles.container}>
            <Tabs/>

            {activeTab === 'all' && <AllGames />}
            {activeTab === 'wishlist' && <Wishlist />}
        </div>
    );
};

export default LibraryPage;
