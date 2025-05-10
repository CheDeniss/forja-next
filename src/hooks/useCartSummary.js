import { useEffect, useState } from "react";
import { getCartSummary } from "@/api/cartService";

export const useCartSummary = () => {
    const [cartData, setCartData] = useState(null);

    const fetchCartIndicator = async () => {
        try {
            const data = await getCartSummary();
            setCartData(data);
            console.log("Cart data fetched:", data);
        } catch (e) {
            console.warn("Не вдалося отримати cart summary", e);
        }
    };

    useEffect(() => {
        fetchCartIndicator();
        window.addEventListener("cart-updated", fetchCartIndicator);

        return () => {
            window.removeEventListener("cart-updated", fetchCartIndicator);
        };
    }, []);

    return { cartData };
};
