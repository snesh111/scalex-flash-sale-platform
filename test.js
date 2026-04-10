import http from "k6/http";

export default function () {
  http.post("http://localhost:3003/order", JSON.stringify({
    productId: 1
  }), {
    headers: { "Content-Type": "application/json" },
  });
}