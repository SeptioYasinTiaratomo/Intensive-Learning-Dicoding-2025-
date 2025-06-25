import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    setDarkMode(checkDarkMode());

    // Optional: listen changes kalau nanti mau support toggle secara realtime
    const observer = new MutationObserver(() => {
      setDarkMode(checkDarkMode());
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  const style = {
    container: {
      textAlign: "center",
      padding: "4em 1em",
      color: darkMode ? "#ccc" : "#555",
      backgroundColor: darkMode ? "#222" : "#fff",
      minHeight: "80vh",
      transition: "all 0.3s ease",
    },
    title: {
      fontSize: "4em",
      marginBottom: "0.5em",
      color: darkMode ? "#eee" : "#333",
    },
    message: {
      fontSize: "1.2em",
      marginBottom: "2em",
    },
    link: {
      textDecoration: "none",
      color: darkMode ? "#66aaff" : "#007BFF",
      fontWeight: "bold",
    },
  };

  return (
    <div style={style.container}>
      <h1 style={style.title}>404</h1>
      <p style={style.message}>Oops! Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/" style={style.link}>
        ← Kembali ke Beranda
      </Link>
    </div>
  );
}
