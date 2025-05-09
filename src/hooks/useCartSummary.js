import { useEffect, useState } from "react";
import { getCartSummary } from "@/api/cartService";

export const useCartSummary = () => {
    const [cartData, setCartData] = useState(null);

    useEffect(() => {
        const fetchCartIndicator = async () => {
            const { data } = await getCartSummary();
            setCartData(data);
        };

        fetchCartIndicator();
        window.addEventListener("cart-updated", fetchCartIndicator);

        return () => {
            window.removeEventListener("cart-updated", fetchCartIndicator);
        };
    }, []);


    return { cartData };
};
