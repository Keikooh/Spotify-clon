export const getCoverImage = (images) => {
    return images ? images[0].url : "/images/placeholder.png"
}