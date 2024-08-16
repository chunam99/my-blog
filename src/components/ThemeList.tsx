import { CopyX } from "lucide-react";

import Theme from "@/models/Theme";
import ThemeCard from "./ThemeItem";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";
import { search } from "@/services/Service";
import { useContext, useEffect, useState } from "react";

export default function ThemeList() {
  const [themes, setThemes] = useState<Theme[]>([]);

  const navigate = useNavigate();

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    async function searchThemes() {
      try {
        await search("/temas", setThemes, {
          headers: { Authorization: token },
        });
      } catch (error: unknown) {
        if (error instanceof Error && error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
          handleLogout();
        }
      }
    }

    searchThemes();
  }, [handleLogout, themes.length, setThemes, token]);

  return (
    <section className="max-w-[1000px] mx-auto">
      <h1 className="text-3xl text-gray-200 mb-6">Temas</h1>

      <div className="flex gap-2 flex-wrap">
        {themes.length == 0 ? (
          <div className="flex gap-2 justify-center items-center text-xl text-gray-500 py-6 px-8 border border-gray-700 rounded-md w-full">
            <p>Nenhum tema adicionado</p>
            <CopyX />
          </div>
        ) : (
          themes.map((theme) => <ThemeCard key={theme.id} theme={theme} />)
        )}
      </div>
    </section>
  );
}
