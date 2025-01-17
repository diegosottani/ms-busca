import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      // Consulta filtrada pelo nome do produto
      const { data, error } = await supabase
        .from("action_figures")
        .select()
        .ilike("produto", `%${searchTerm}%`); // Busca por qualquer parte do texto

      if (error) throw error;

      setResults(data);
    } catch (error) {
      alert("Erro ao buscar informações!", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col min-h-screen bg-gradient-to-br from-teal-500 to-green-700">
      <h1 className="text-6xl font-bold text-white my-8">MS Busca</h1>

      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md" onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            placeholder="Digite o nome do produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-3 pl-4 pr-12 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
            ) : (
              "Buscar"
            )}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white shadow-md rounded-lg p-4 transform hover:scale-105 transition-transform"
            >
              <img
                src={result.imagem}
                alt={result.produto}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{result.produto}</h3>
              <p className="text-sm text-gray-600">Marca: {result.marca}</p>
              <p className="text-gray-700 font-medium">Valor: R$ {result.valor.toFixed(2)}</p>
              <p className="text-gray-500 text-sm">
                Valor Global: R$ {result.valor_global.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
