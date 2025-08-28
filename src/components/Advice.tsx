import { useState } from "react";
import { fetchAdvice } from "../api/fetchAdvice";

export default function Advice() {
  const [query, setQuery] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const result = await fetchAdvice(query);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Business Advisor</h1>

      <input
        className="w-full p-3 border rounded-xl mb-4"
        placeholder="Ask for business advice..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={handleFetch}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        {loading ? "Fetching..." : "Get Advice"}
      </button>

      {advice && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <h2 className="text-lg font-semibold">Advice:</h2>
          <p className="mt-2 text-gray-700">{advice}</p>
        </div>
      )}
    </div>
  );
}
