import styles from "./styles.module.css";
import { type ChangeEvent, useState } from "react";
import { Error, Loader } from "~/libs/components/components.ts";
import { useEthPrice } from "./libs/hooks/hooks.ts";
import { type FormData } from "./libs/types/types.ts";

function EthUsdtForm() {
  const { ethPrice, loading, error } = useEthPrice();
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    isSell: false,
    receive: "",
  });

  function handleChangeAmount(event: ChangeEvent) {
    const { value } = event.target as HTMLInputElement;
    const amount = Number(value);
    const receive = amount * ethPrice;
    setFormData(previousData => ({
      ...previousData,
      amount: String(amount),
      receive: String(receive),
    }));
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
  }

  function handleToggleAction() {
    setFormData(previousData => ({
      ...previousData,
      isSell: !previousData.isSell,
    }));
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <label className={styles.label}>
          <span className={styles["label-text"]}>ETH amount:</span>
          <input
            type="number"
            placeholder="0"
            value={formData.amount}
            onChange={handleChangeAmount}
            className={styles["amount-input"]}
          />
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
            className={styles["receive-input"]}
          />
        </label>
      </form>
    </main>
  );
}

export { EthUsdtForm };
