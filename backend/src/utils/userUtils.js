export const convertToUserPublic = (user) => {
    const {password:_, ...publicUser} = user
    return publicUser
}