import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetch("http://localhost:3000/products"); // ✅ changed
    const data = await res.json();
    setProducts(data);
  };

  const buyProduct = async (id) => {
    const res = await fetch("http://localhost:3000/order", { // ✅ changed
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const data = await res.json();

    if (data.message) {
      setMessage("✅ Order successful");
    } else {
      setMessage("❌ " + data.error);
    }

    loadProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚡ ScaleX Store</h1>

      <button onClick={loadProducts}>Load Products</button>

      <h3>{message}</h3>

      {products.map((p) => (
        <div key={p.id} style={{ margin: "10px 0" }}>
          <b>{p.name}</b> | Stock: {p.stock} | ₹{p.price}
          <button onClick={() => buyProduct(p.id)} style={{ marginLeft: "10px" }}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;