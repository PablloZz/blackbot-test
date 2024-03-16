import styles from "./styles.module.css";
import { type ChangeEvent, useState } from "react";
import { Error, Loader } from "~/libs/components/components.ts";
import { useEthPrice } from "./libs/hooks/hooks.ts";
import { type FormData } from "./libs/types/types.ts";
import { FormValidationMessage } from "./libs/enums/enums.ts";
import {
  INITIAL_FORM_VALUES,
  OUT_OF_MIN_RANGE_PRICE,
} from "./libs/constants/constants.ts";

function EthUsdtForm() {
  const { ethPrice, loading, error } = useEthPrice();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_VALUES);
  const [validationMessage, setValidationMessage] = useState<string>(
    FormValidationMessage.NO_ERROR
  );

  function handleChangeAmount(event: ChangeEvent) {
    const { value } = event.target as HTMLInputElement;
    const amount = Number(value);
    const receive = amount * ethPrice;
    setFormData(previousData => ({
      ...previousData,
      amount: String(amount),
      receive: String(receive),
    }));

    if (
      validationMessage !== FormValidationMessage.NO_ERROR &&
      amount > OUT_OF_MIN_RANGE_PRICE
    ) {
      setValidationMessage(FormValidationMessage.NO_ERROR);
    }
  }

  function handleChangeReceive(event: ChangeEvent) {
    const { value } = event.target as HTMLInputElement;
    const receive = Number(value);
    const amount = receive / ethPrice;
    setFormData(previousData => ({
      ...previousData,
      amount: String(amount),
      receive: String(receive),
    }));

    if (
      validationMessage !== FormValidationMessage.NO_ERROR &&
      amount > OUT_OF_MIN_RANGE_PRICE
    ) {
      setValidationMessage(FormValidationMessage.NO_ERROR);
    }
  }

  function handleToggleAction() {
    setFormData(previousData => ({
      ...previousData,
      isSell: !previousData.isSell,
    }));
  }

  function handleValidateForm() {
    if (Number(formData.amount) <= OUT_OF_MIN_RANGE_PRICE) {
      return setValidationMessage(FormValidationMessage.MIN_AMOUNT_ERROR);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <form className={styles.form}>
      <label className={styles.label}>
        <span className={styles["label-text"]}>ETH amount:</span>
        <input
          type="number"
          placeholder="0"
          value={formData.amount}
          onChange={handleChangeAmount}
          onBlur={handleValidateForm}
          className={styles["amount-input"]}
        />
        <span className={`${validationMessage ? styles.error : ""}`}>
          {validationMessage}
        </span>
      </label>
      <label className={styles.label}>
        <span className={styles["label-text"]}>Action:</span>
        <div className={styles["checkbox-wrapper"]}>
          <input
            type="checkbox"
            checked={formData.isSell}
            onChange={handleToggleAction}
            className={`${styles.checkbox} ${
              formData.isSell ? styles.active : ""
            }`}
          />
          <span aria-live="assertive" className={styles["label-text"]}>
            {formData.isSell ? "Sell" : "Buy"}
          </span>
        </div>
      </label>
      <label className={styles.label}>
        <span className={styles["label-text"]}>You will receive:</span>
        <input
          type="number"
          placeholder="0"
          value={formData.receive}
          onChange={handleChangeReceive}
          onBlur={handleValidateForm}
          className={styles["receive-input"]}
        />
        <span className={`${validationMessage ? styles.error : ""}`}>
          {validationMessage}
        </span>
      </label>
    </form>
  );
}

export { EthUsdtForm };
