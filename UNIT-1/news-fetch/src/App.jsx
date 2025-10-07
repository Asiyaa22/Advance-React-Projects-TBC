import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewsRequest } from "../src/actions/newsAction";
import "./App.css";

export default function App() {
  const { articles, loading, error } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>News Fetcher (Redux Saga)</h1>
      <button
        onClick={() => dispatch(fetchNewsRequest())}
        style={{ padding: "10px", marginBottom: "20px" }}
      >
        Fetch News
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <strong>{article.title}</strong>
            <br />
            <small>{article.source.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
