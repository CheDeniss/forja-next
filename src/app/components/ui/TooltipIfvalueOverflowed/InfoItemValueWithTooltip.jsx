'use client';

import React, { useRef, useState, useEffect } from "react";
import styles from "./InfoItemValueWithTooltip.module.scss";
import CustomButtonSimple from "../../../components/ui/CustomButtonSimple/CustomButtonSimple.jsx";
import { Tooltip } from "@mui/material";

const InfoItemValueWithTooltip = ({ children }) => {
    const ref = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            setIsOverflowed(el.scrollWidth > el.clientWidth);
        }
    }, [children]);

    const content = (
        <span ref={ref} className={styles.InfoItemValue}>
      {children}
    </span>
    );

    return isOverflowed ? (
        <Tooltip
            title={children}
            arrow
            placement="top"
            componentsProps={{
                tooltip: {
                    sx: {
                        backgroundColor: "#1E1E1E",
                        color: "#E2E2E2",
                        fontSize: "1vw",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        fontFamily: "Fixel Display, sans-serif",
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.4)",
                        '& .MuiTooltip-arrow': {
                            color: '#1E1E1E',
                        }
                    },
                },
            }}
        >
            {content}
        </Tooltip>
    ) : (
        content
    );
};
export default InfoItemValueWithTooltip;