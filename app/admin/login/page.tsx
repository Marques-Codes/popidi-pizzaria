type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

function getLoginErrorMessage(error?: string) {
  if (error === "invalid" || error === "1") {
    return "Usuário ou senha incorretos. Tente novamente.";
  }

  if (error === "server") {
    return "As variáveis de login não estão configuradas corretamente no servidor.";
  }

  return null;
}

function getSafeNextPath(nextPath?: string) {
  if (!nextPath) {
    return "/admin";
  }

  if (!nextPath.startsWith("/")) {
    return "/admin";
  }

  if (nextPath.startsWith("//")) {
    return "/admin";
  }

  return nextPath;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  const errorMessage = getLoginErrorMessage(params.error);
  const nextPath = getSafeNextPath(params.next);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7ed] px-6">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Popidi Pizzaria
          </p>

          <h1 className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
            Painel administrativo
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#76524a]">
            Entre com seu usuário e senha para gerenciar o site.
          </p>
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMessage}
          </div>
        )}

        <form action="/api/admin/login" method="post" className="mt-8 space-y-5">
          <input type="hidden" name="next" value={nextPath} />

          <div>
            <label
              htmlFor="username"
              className="text-sm font-bold text-[#3a0a0f]"
            >
              Usuário
            </label>

            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
              placeholder="Digite o usuário"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-bold text-[#3a0a0f]"
            >
              Senha
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
              placeholder="Digite a senha"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#6f1018] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#8f1721]"
          >
            Entrar no painel
          </button>
        </form>
      </section>
    </main>
  );
}