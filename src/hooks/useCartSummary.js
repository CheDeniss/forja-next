import { useEffect, useState } from "react";
import { getCartSummary } from "@/api/ClientServices/cartService.js";
import { useAuth } from "@/context/AuthContext.js";

export const useCartSummary = () => {
    const [cartData, setCartData] = useState(null);
    const { user } = useAuth();

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
        if (!user) return;

        fetchCartIndicator();
        window.addEventListener("cart-updated", fetchCartIndicator);

        return () => {
            window.removeEventListener("cart-updated", fetchCartIndicator);
        };
    }, [user]);

    return { cartData };
};
