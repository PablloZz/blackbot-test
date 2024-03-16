import { useEffect, useState } from "react";
import { Endpoint } from "~/libs/enums/enums.ts";
import { SubscriptionMethod } from "./libs/enums/enums.ts";
import {
  INITIAL_ETH_PRICE,
  SUBSCRIPTION_ID,
  SUBSCRIPTION_PARAMETERS,
} from "./libs/constants/constants.ts";

function useEthPrice() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState<number>(INITIAL_ETH_PRICE);
  const socket = new WebSocket(Endpoint.WEBSOCKET_MARKET_STREAM);

  function handleSubscribe() {
    const subscribeData = JSON.stringify({
      method: SubscriptionMethod.SUBSCRIBE,
      params: SUBSCRIPTION_PARAMETERS,
      id: SUBSCRIPTION_ID,
    });

    socket.send(subscribeData);
  }

  function handleSetPrice(event: MessageEvent) {
    const { p: price } = JSON.parse(event.data);

    if (price === undefined) {
      return;
    }

    if (price && loading) {
      setLoading(false);
    }

    setEthPrice(Number(price));
  }

  function handleUnsubscribe() {
    const unsubscribeData = JSON.stringify({
      method: SubscriptionMethod.UNSUBSCRIBE,
      params: SUBSCRIPTION_PARAMETERS,
      id: SUBSCRIPTION_ID,
    });

    socket.send(unsubscribeData);
  }

  function handleError() {
    setError(true);
    setLoading(false);
  }

  useEffect(() => {
    socket.addEventListener("close", handleUnsubscribe);
    socket.addEventListener("open", handleSubscribe);
    socket.addEventListener("message", handleSetPrice);
    socket.addEventListener("error", handleError);

    return () => {
      socket.removeEventListener("close", handleUnsubscribe);
      socket.removeEventListener("open", handleSubscribe);
      socket.removeEventListener("message", handleSetPrice);
      socket.removeEventListener("error", handleError);
    };
  }, []);

  return { ethPrice, loading, error };
}

export { useEthPrice };
