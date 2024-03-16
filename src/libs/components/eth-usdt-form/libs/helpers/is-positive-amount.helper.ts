import { OUT_OF_MIN_RANGE_PRICE } from "../constants/constants.ts";

function isPositiveAmount(amount: string) {
  return Number(amount) > OUT_OF_MIN_RANGE_PRICE;
}

export { isPositiveAmount };
