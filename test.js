import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "20s", target: 50 },
    { duration: "30s", target: 150 },
    { duration: "30s", target: 300 },
    { duration: "20s", target: 0 },
  ],
};

export default function () {
  // 👀 browsing
  http.get("http://192.168.49.2:30007/products");

  // 🛒 only some buy
  if (Math.random() < 0.3) {
    http.post(
      "http://192.168.49.2:30007/order",
      JSON.stringify({ productId: 2 }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  sleep(1);
}