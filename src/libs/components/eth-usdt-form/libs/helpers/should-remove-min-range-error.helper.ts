import { OUT_OF_MIN_RANGE_PRICE } from "../constants/constants.ts";
import { FormValidationMessage } from "../enums/enums.ts";

function shouldRemoveMinRangeError(validationMessage: string, amount: number) {
  return (
    validationMessage !== FormValidationMessage.NO_ERROR &&
    amount > OUT_OF_MIN_RANGE_PRICE
  );
}

export { shouldRemoveMinRangeError };
