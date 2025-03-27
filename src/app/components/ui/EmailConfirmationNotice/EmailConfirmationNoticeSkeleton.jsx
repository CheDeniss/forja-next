"use client";

import { Box, Skeleton } from "@mui/material";

const EmailConfirmationNoticeSkeleton = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                padding: "12px 16px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="rounded" width={140} height={36} />
        </Box>
    );
};

export default EmailConfirmationNoticeSkeleton;
