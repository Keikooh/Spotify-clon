import ColorThief from 'colorthief';
import type {Image} from "../interfaces/common"

export const getCoverImage = ( images:Image[] ) => {
    return images ? images[0].url : "/images/placeholder.png"
}

export const getCoverImageDominantColor = (image:HTMLImageElement):number[] => {
    const colorThief = new ColorThief();
    return colorThief.getColor(image);// Return dominant color
}