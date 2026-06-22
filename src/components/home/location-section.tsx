import {
  MapPin,
  Phone,
  Route,
  Store,
} from "lucide-react";

const address = "R. Uirapuru, 1423 - Centro, Arapongas - PR, 86700-130";
const phone = "(43) 3055-3535";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=R.%20Uirapuru%2C%201423%20-%20Centro%2C%20Arapongas%20-%20PR%2C%2086700-130";

const mapEmbedUrl =
  "https://www.google.com/maps?q=R.%20Uirapuru%2C%201423%20-%20Centro%2C%20Arapongas%20-%20PR%2C%2086700-130&output=embed";

export function LocationSection() {
  return (
    <section id="contato" className="bg-[#d8bfc1] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Onde estamos
          </p>

          <h2 className="mt-5 font-serif text-5xl font-bold tracking-tight text-[#3a0a0f] md:text-6xl">
            Venha conhecer a Popidi
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#76524a]">
            Estamos em Arapongas, Paraná, com um espaço informal, alegre e
            perfeito para aproveitar uma boa pizza.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-[#fff7ed] p-8 shadow-sm ring-1 ring-[#6f1018]/10 md:p-10">
            <div className="inline-flex rounded-full bg-[#6f1018]/10 p-4">
              <Store className="h-9 w-9 text-[#b51f2b]" />
            </div>

            <h3 className="mt-7 font-serif text-4xl font-bold tracking-tight text-[#3a0a0f]">
              Popidi Pizzaria
            </h3>

            <p className="mt-5 text-base leading-8 text-[#76524a]">
              Cardápio e rodízio de pizzas, além de esfihas, em um ambiente
              informal e alegre com varanda e serviço de delivery.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-[#b51f2b]" />

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b51f2b]">
                    Endereço
                  </p>

                  <p className="mt-1 text-base leading-7 text-[#4f3034]">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-[#b51f2b]" />

                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b51f2b]">
                    Telefone
                  </p>

                  <p className="mt-1 text-base leading-7 text-[#4f3034]">
                    {phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e5393f] px-6 py-4 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
              >
                <Route className="h-5 w-5" />
                Ver rota
              </a>

              <a
                href="tel:+554330553535"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#b51f2b]/30 px-6 py-4 text-sm font-bold text-[#b51f2b] transition hover:bg-[#b51f2b] hover:text-white"
              >
                <Phone className="h-5 w-5" />
                Ligar agora
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#fff7ed] shadow-sm ring-1 ring-[#6f1018]/10">
            <iframe
              src={mapEmbedUrl}
              title="Mapa da Popidi Pizzaria em Arapongas"
              className="h-[420px] w-full border-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}