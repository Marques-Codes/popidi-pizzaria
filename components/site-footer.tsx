export function SiteFooter() {
  return (
    <footer
      id="contato"
      className="scroll-mt-28 bg-[#080808] px-6 py-12 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <strong className="block text-3xl font-black text-[#f5bf24]">
            Pópidi
          </strong>

          <span className="block text-xs font-bold tracking-[0.35em] text-white">
            PIZZARIA
          </span>

          <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
            Mais que uma pizza, uma experiência que fica na memória.
          </p>
        </div>

        <div>
          <h3 className="font-black text-[#f5bf24]">Contato</h3>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>(11) 98765-4321</li>
            <li>(11) 98765-4321</li>
            <li>contato@popidipizzaria.com.br</li>
            <li>Rua das Pizzas, 123</li>
            <li>São Paulo/SP</li>
          </ul>
        </div>

        <div>
          <h3 className="font-black text-[#f5bf24]">
            Horário de Funcionamento
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Terça a Quinta: 18h às 23h</li>
            <li>Sexta e Sábado: 18h às 00h</li>
            <li>Domingo: 18h às 23h</li>
            <li>Fechado às Segundas-feiras</li>
          </ul>
        </div>

        <div>
          <h3 className="font-black text-[#f5bf24]">Siga-nos</h3>

          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-white/45">
        © 2026 Pópidi Pizzaria. Todos os direitos reservados.
      </div>
    </footer>
  );
}