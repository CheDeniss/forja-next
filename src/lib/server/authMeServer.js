import { cookies } from 'next/headers';

export const getUserDataFromServer = async () => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if (!accessToken && !refreshToken) return null;

        const res = await fetch('https://localhost:7052/api/User/self-profile', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
            },
            cache: 'no-store',
        });

        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
};
