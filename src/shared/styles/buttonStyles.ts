const filled = "rounded-full p-3 text-sm shadow-xl";
const hidden = "hidden absolute hover:flex group-hover:flex"
const notHidden = "flex justify-center items-center gap-x-2";

export const buttonVariants = {
  filledGray: `${filled} bg-gray-900 hover:bg-gray-700`,
  filledWhite: `${notHidden} rounded-full p-1 text-xl bg-white hover:bg-gray-100 text-gray-900`,
  pill: `${notHidden} px-4 py-1 rounded-full bg-gray-900 hover:bg-gray-700 text-md`,
  transparent: "text-4xl",
};

export const buttonPlayVariants = {
  filledGreen: `${filled} ${notHidden} bg-green-500 hover:bg-green-300 text-gray-900`,
  HiddenTransparent: `${hidden} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`,
  HiddenFilledGreen: `${filled} ${hidden} bg-green-500 hover:bg-green-300 text-gray-900`
}