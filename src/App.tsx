import { type ChangeEvent, useState } from "react";
import "./App.css";
import { useEthPrice } from "./libs/hooks/hooks.ts";
import { Error, Loader } from "./libs/components/components.ts";
import { type FormData } from "./libs/types/types.ts";

function App() {
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
    <main className="main">
      <form className="form">
        <label className="label">
          <span className="label-text">ETH amount:</span>
          <input
            type="number"
            placeholder="0"
            value={formData.amount}
            onChange={handleChangeAmount}
            className="amount-input"
          />
        </label>
        <label className="label">
          <span className="label-text">Action:</span>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={formData.isSell}
              onChange={handleToggleAction}
              className={`checkbox ${formData.isSell ? "active" : ""}`}
            />
            <span aria-live="assertive" className="label-text">
              {formData.isSell ? "Sell" : "Buy"}
            </span>
          </div>
        </label>
        <label className="label">
          <span className="label-text">You will receive:</span>
          <input
            type="number"
            placeholder="0"
            value={formData.receive}
            onChange={handleChangeReceive}
            className="receive-input"
          />
        </label>
      </form>
    </main>
  );
}

export default App;
