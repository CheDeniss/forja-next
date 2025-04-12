import { apiClient } from "./apiClient";

export const getCart = async () => {
    const response = await apiClient("cart", "GET", null, {}, true);
    const cartId = response.id;
    if (cartId) {
        localStorage.setItem("cartId", cartId);
    }
    return response;
};

export const addToCart = async (productId) => {
    let cartId = localStorage.getItem("cartId");

    if (!cartId) {
        const cart = await getCart();
        cartId = cart.id;
    }

    const payload = {
        cartId,
        productId
    };

    return apiClient("Cart/items", "POST", payload, {}, true);
};

export const getCartItems = async (cartId) => {
    return apiClient(`Cart/${cartId}`, "GET", null, {}, true);
}