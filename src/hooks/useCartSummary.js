import { useEffect, useState } from "react";
import { getCartSummary } from "@/api/cartService";

export const useCartSummary = () => {
    const [hasItems, setHasItems] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            const { hasItems } = await getCartSummary();
            setHasItems(hasItems);
        };

        fetchCart();
        window.addEventListener("cart-updated", fetchCart);

        return () => {
            window.removeEventListener("cart-updated", fetchCart);
        };
    }, []);


    return { hasItems };
};
