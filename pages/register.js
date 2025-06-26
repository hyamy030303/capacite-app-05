import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    // Stocker l'utilisateur temporairement dans localStorage (pour test uniquement)
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow max-w-xs w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Créer un compte</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          S'inscrire
        </button>
      </form>
    </div>
  );
}