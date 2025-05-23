const mapUserToUpdateDto = (user, updatedFields = {}) => ({
    id: user.id,
    keycloakUserId: user.keycloakUserId,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    birthDate: user.birthDate,
    gender: user.gender,
    country: user.country,
    city: user.city,
    selfDescription: user.selfDescription,
    showPersonalInfo: user.showPersonalInfo,
    modifiedAt: new Date().toISOString(),
    customUrl: user.customUrl,
    profileHatVariant: user.profileHatVariant,
    ...updatedFields
});
