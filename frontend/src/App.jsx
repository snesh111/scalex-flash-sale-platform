import { useState } from "react";

const API = "/api";

function App() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setMessage("Failed to load products");
    }
  };

  const buyProduct = async (id) => {
    try {
      const res = await fetch(`${API}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });

      const data = await res.json();

      if (res.ok && !data.error) {
        setMessage("Order successful !!");
      } else {
        setMessage("noo" + data.error ||"order failed");
      }

      loadProducts();
    } catch (err) {
      setMessage(" Request failed");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚡ ScaleX Store</h1>

      <button style={styles.loadBtn} onClick={loadProducts}>
        Load Products
      </button>

      {message && <h3 style={styles.message}>{message}</h3>}

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.card}>
            <h2>{p.name}</h2>
            <p>₹ {p.price}</p>
            <p>
              Stock:{" "}
              <span style={{ color: p.stock > 0 ? "lime" : "red" }}>
                {p.stock}
              </span>
            </p>

            <button
              style={{
                ...styles.buyBtn,
                backgroundColor: p.stock > 0 ? "#00c853" : "gray",
                cursor: p.stock > 0 ? "pointer" : "not-allowed",
              }}
              disabled={p.stock === 0}
              onClick={() => buyProduct(p.id)}
            >
              {p.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  loadBtn: {
    display: "block",
    margin: "0 auto 20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  message: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
  buyBtn: {
    marginTop: "10px",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    color: "white",
  },
};

export default App;