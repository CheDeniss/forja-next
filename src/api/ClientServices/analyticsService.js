import { apiClient } from "./apiClient.js";


export const getAnalyticsAggregate = async ({ eventType, startDate, endDate }) => {
    const query = new URLSearchParams({
        eventType,
        startDate,
        endDate
    }).toString();

    return apiClient(`AnalyticsAggregate/events?${query}`, "GET");
};

export const getAuditLogs = async ({ userId, entityType, actionType, startDate, endDate }) => {
    const query = new URLSearchParams();

    if (userId) query.append("userId", userId);
    if (entityType !== '' && entityType !== null && entityType !== undefined) query.append("entityType", entityType);
    if (actionType !== '' && actionType !== null && actionType !== undefined) query.append("actionType", actionType);
    if (startDate) query.append("startDate", startDate);
    if (endDate) query.append("endDate", endDate);

    return apiClient(`AuditLog/filter?${query.toString()}`, "GET", null, {}, true);
};

export const getSessions = async () => {
    return apiClient(`AnalyticsSession`, "GET", null, {}, true);
}

export const getSessionByUserId = async (userId) => {
    return apiClient(`AnalyticsSession/user/${userId}`, "GET", null, {}, true);
}