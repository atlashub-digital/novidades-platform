"use client";

type VpsVideoSource = {
  provider: "vps";
  src: string;
  poster?: string;
};

type TelegramSource = {
  provider: "telegram";
  joinUrl?: string;
  label?: string;
};

type FutureSource = {
  provider: "youtube" | "cloudflare_stream";
  providerAssetId: string;
};

export type WebPlayerSource = VpsVideoSource | TelegramSource | FutureSource;

export function WebPlayer({
  source,
  title,
  preview = false,
}: {
  source: WebPlayerSource;
  title: string;
  preview?: boolean;
}) {
  if (source.provider === "vps") {
    return (
      <section className="overflow-hidden rounded-[22px] border border-slate-200 bg-slate-950 shadow-lg">
        <div className="aspect-video bg-black">
          <video
            controls
            preload="metadata"
            poster={source.poster}
            className="h-full w-full"
            controlsList="nodownload"
            playsInline
            aria-label={title}
          >
            <source src={source.src} type="video/mp4" />
            O seu navegador não suporta reprodução de vídeo.
          </video>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-slate-300">
          <span>{title}</span>
          <span className="rounded-full bg-white/10 px-2 py-1 font-bold">
            {preview ? "AMOSTRA" : "AULA"}
          </span>
        </div>
      </section>
    );
  }

  if (source.provider === "telegram") {
    return (
      <section className="rounded-[22px] border border-blue-200 bg-blue-50 p-6 text-slate-950">
        <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">
          Continuação no Telegram
        </p>
        <h2 className="mt-2 text-xl font-black">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Esta formação usa Telegram como canal de entrega/comunidade nesta fase.
          O acesso será associado ao entitlement do produto.
        </p>
        {source.joinUrl ? (
          <a
            href={source.joinUrl}
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-blue-700 px-5 text-sm font-black text-white"
          >
            {source.label ?? "Acessar formação"}
          </a>
        ) : (
          <p className="mt-5 text-xs font-bold text-amber-700">
            Link de acesso só é disponibilizado após validação.
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="rounded-[22px] border border-slate-200 bg-white p-6 text-slate-950 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[.14em] text-slate-500">
        Provider previsto
      </p>
      <h2 className="mt-2 text-xl font-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        O WebPlayer já aceita este provider no modelo, mas a integração será
        implementada apenas quando YouTube ou Cloudflare Stream forem ativados.
      </p>
    </section>
  );
}
