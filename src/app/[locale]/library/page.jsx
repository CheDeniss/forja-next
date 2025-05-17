'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Tabs from '@/components/Library/Tabs/Tabs.jsx';
import AllGames from '@/components/Library/AllGames/AllGames.jsx';
import Wishlist from '@/components/Library/Wishlist/Wishlist.jsx';
import HorizontalFilters from "@/components/ui/HorizontalFiltersFE/HorizontalFilters.jsx";
import styles from './LibraryPage.module.scss';

const LibraryPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeTab = searchParams.get('tab');

    const [selectedFilters, setSelectedFilters] = useState({
        genres: [],
        mechanics: [],
        tags: [],
        matureContents: [],
        search: '',
    });

    useEffect(() => {
        if (!activeTab) {
            const params = new URLSearchParams(searchParams);
            params.set('tab', 'all');
            router.replace(`?${params.toString()}`);
        }
    }, [activeTab, searchParams, router]);

    const handleFiltersChange = (newFilters) => {
        setSelectedFilters(newFilters);
    };

    return (
        <div className={styles.container}>
            <Tabs />
            <HorizontalFilters filters={selectedFilters} onFiltersChange={handleFiltersChange} />
            {activeTab === 'all' && <AllGames filters={selectedFilters} />}
            {activeTab === 'wishlist' && <Wishlist filters={selectedFilters} />}
        </div>
    );
};

export default LibraryPage;
