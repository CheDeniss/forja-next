import {apiClient} from "@/api/ClientServices/apiClient.js";

export const uploadAvatar = async (formData) => {
    return apiClient("Files/avatar", "POST", formData, {}, true);
}

export const uploadProductLogo = async (formData) => {
    return apiClient("Files/product-logo", "POST", formData, {}, true);
};

export const uploadAchievementImage = async (formData) => {
    return apiClient("Files/achievement-image", "POST", formData, {}, true);
};

export const uploadNewsArticleImage = async (formData) => {
    return apiClient("Files/news-article", "POST", formData, {}, true);
};

export const uploadMatureContentImage = async (formData) => {
    return apiClient("Files/mature-content-image", "POST", formData, {}, true);
};

export const uploadMechanicImage = async (formData) => {
    return apiClient("Files/mechanic-image", "POST", formData, {}, true);
};

export const uploadProductImage = async (formData) => {
    return apiClient("Files/product-image", "POST", formData, {}, true);
};

export const uploadProfileHatVariantImage = async (formData) => {
    return apiClient("Files/profile-hat-variant", "POST", formData, {}, true);
};

export const getPresignedImageUrl = async (path, exp = 1800) => {
    const queryParams = new URLSearchParams({
        ObjectPath: path,
        ExpirationInSeconds: exp.toString()
    });

    return apiClient(`Files/presigned-image-url?${queryParams}`, "GET", null, {}, true);
};

