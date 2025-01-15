import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

//const supabase = createClient("https://<project>.supabase.co", "<your-anon-key>");

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {}

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setResults([
        "Resultado 1: Informações detalhadas",
        "Resultado 2: Mais detalhes aqui",
        "Resultado 3: Outra informação relevante",
      ]);

      //const { data } = await supabase.from("countries").select();
      //setResults(data);
    } catch (error) {
      alert("Erro ao tentar buscar informações!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gradient-to-br from-teal-500 to-green-700">
      <h1 className="text-6xl font-bold text-white mb-8">MS Busca</h1>

      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md" onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="Digite sua busca..."
            className="w-full py-3 pl-4 pr-12 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-slate-200 border-opacity-75"></div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-4 w-full max-w-md">
          <h2 className="text-lg font-semibold text-teal-600 mb-4">Resultados da busca:</h2>
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-lg shadow-sm text-gray-700">
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
