import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { DigitalCheckout } from "@/components/digital/digital-checkout";
import { getPublicListingBySlug } from "@/lib/commerce-db";
import { formatMoney } from "@/lib/format";

type Props = {
  params: Promise<{ category: string; product: string }>;
};

const DIGITAL_DETAILS: Record<
  string,
  {
    intro: string;
    deliverables: string[];
    highlights: Array<{ title: string; body: string }>;
    checkoutMicrocopy?: string;
  }
> = {
  "conversion-growth-suite": {
    intro:
      "Bundle para transformar estratégia de mensagem em execução de página: Conversion Content OS + Sales Page Blueprint num único acesso, com os workbooks, libraries, wireframes, auditorias e ferramentas dos dois produtos.",
    deliverables: [
      "Conversion Content OS - pacote completo",
      "Sales Page Blueprint - pacote completo",
      "Hook Library - 300 Structures",
      "Prompt Library - 36 prompts",
      "CTA & Offer Swipe File",
      "Wireframe Library",
      "Claims & Proof Audit",
      "Sales Page Audit Scorecard XLSX",
      "Content Repurposing Matrix",
      "Developer Implementation Spec",
    ],
    highlights: [
      {
        title: "Bundle sem duplicação",
        body: "Um checkout concede acesso aos dois produtos e respetivos assets privados.",
      },
      {
        title: "Valor combinado",
        body: "Produtos separados: R$ 164. Suite: R$ 139 em pagamento único.",
      },
      {
        title: "Fluxo completo",
        body: "Briefing, mensagem, proof map, hooks, conteúdo, página, checkout continuity e release QA.",
      },
    ],
    checkoutMicrocopy:
      "Inclui CCOS + Sales Page Blueprint · pagamento único · sem assinatura.",
  },
  "conversion-content-os": {
    intro:
      "Toolkit operacional para estruturar mensagem, prova, hooks, conteúdo, CTAs, adaptação multicanal e testes. Não promete receita, crescimento ou taxa de conversão.",
    deliverables: [
      "Conversion Content OS - Guide",
      "Conversion Workbook",
      "Hook Library - 300 Structures",
      "Prompt Library - 36 prompts",
      "CTA & Offer Swipe File",
      "Content Repurposing Matrix",
      "Quick Start & Activation Guide",
      "Customer License & Terms",
    ],
    highlights: [
      {
        title: "Uso prático",
        body: "Para projetos próprios, empresas e trabalho de cliente.",
      },
      {
        title: "Entrega protegida",
        body: "Downloads privados com URLs assinadas e de curta duração.",
      },
      {
        title: "Guardrails",
        body: "Sem testemunhos inventados, falsa urgência ou prova fabricada.",
      },
    ],
  },
  "financeos-mei-2026": {
    intro:
      "Planilha gerencial para centralizar receitas, despesas, taxas, compromissos, precificação, projeção e monitoramento do teto anual. Não substitui contador, Receita Federal, Portal do Empreendedor ou PGMEI.",
    deliverables: [
      "FinanceOS MEI 2026 - XLSX editável",
      "Dashboard financeiro",
      "Transações e Resumo Mensal",
      "Monitor do teto MEI",
      "Compromissos",
      "Precificação & Margem",
      "Quick Start",
      "Customer License & Terms",
    ],
    highlights: [
      {
        title: "Referência anual",
        body: "Parâmetros 2026 documentados e centralizados para facilitar revisão.",
      },
      {
        title: "Entrega protegida",
        body: "XLSX e materiais auxiliares por URLs assinadas e temporárias.",
      },
      {
        title: "Limite de uso",
        body: "Apoio gerencial e educacional; não realiza apuração fiscal oficial.",
      },
    ],
    checkoutMicrocopy:
      "XLSX editável · ferramenta gerencial · sem assinatura.",
  },
  "sales-page-blueprint": {
    intro:
      "Sistema moderno para transformar páginas de venda em interfaces de decisão: hero, mecanismo, prova, offer stack, termos, checkout, upsell, success e QA mobile.",
    deliverables: [
      "Quick Start",
      "Sales Page Blueprint Guide",
      "Wireframe Library",
      "Claims & Proof Audit",
      "Mobile & Funnel QA",
      "Developer Implementation Spec",
      "Sales Page Audit Scorecard XLSX",
      "Customer License & Terms",
    ],
    highlights: [
      {
        title: "Wireframes operacionais",
        body: "Sales, pre-sell, lead capture, checkout, upsell e success.",
      },
      {
        title: "Proof governance",
        body: "Classifique facts, demonstrations, customer evidence, hypotheses e unsupported claims.",
      },
      {
        title: "Release gate",
        body: "Scorecard para mobile, checkout continuity, proof e entrega.",
      },
    ],
    checkoutMicrocopy:
      "Bundle ZIP + scorecard XLSX · pagamento único · sem assinatura.",
  },
  "email-conversion-kit": {
    intro:
      "Sistema de lifecycle email para welcome, nurture, checkout recovery, launch, post-purchase e reactivation, com governança de claims, consentimento/base legal e stopping rules.",
    deliverables: [
      "Email Conversion Playbook",
      "Welcome Sequence - 5 emails",
      "Lead Nurture - 5 emails",
      "Checkout Recovery - 3 emails",
      "Launch Sequence - 5 emails",
      "Post-purchase Activation - 4 emails",
      "Subject Line & CTA Library",
      "Email Campaign Planner XLSX",
    ],
    highlights: [
      {
        title: "Lifecycle, não spam",
        body: "Sequências ligadas a eventos reais, finalidade definida e stopping conditions.",
      },
      {
        title: "QA operacional",
        body: "Guardrails para claims, CTA continuity, dados necessários e mensagens não essenciais.",
      },
      {
        title: "Execução editável",
        body: "Planner XLSX para briefing, sequência, QA e aprendizagem por campanha.",
      },
    ],
    checkoutMicrocopy:
      "Playbook + libraries + Campaign Planner XLSX · pagamento único · sem assinatura.",
  },
  "digital-product-launch-kit": {
    intro:
      "Sistema de release para transformar um produto digital num lançamento operacional: direitos, packaging, proof, sales surface, checkout, delivery, activation e aprendizagem.",
    deliverables: [
      "Digital Product Launch Playbook",
      "Funnel Map & Release Gates",
      "Launch Workspace XLSX",
      "30-Day Launch Plan",
      "Asset Tracker",
      "Release QA",
      "Quick Start",
      "Customer License & Terms",
    ],
    highlights: [
      {
        title: "Release system",
        body: "VALIDATE → PACKAGE → PROVE → PUBLISH → SELL → DELIVER → LEARN.",
      },
      {
        title: "Delivery-first",
        body: "O produto só fica READY quando checkout, entitlement e acesso foram testados.",
      },
      {
        title: "Workspace prático",
        body: "Dashboard, asset tracker, 30-day plan e QA gate numa planilha editável.",
      },
    ],
    checkoutMicrocopy:
      "Playbook + Funnel Map + Launch Workspace · pagamento único · sem assinatura.",
  },
  "creator-prompt-library": {
    intro:
      "Biblioteca original de 50 prompts estruturados para research, messaging, sales pages, email, social, ecommerce, operations, analytics e AI workflow design.",
    deliverables: [
      "Creator Prompt Library - 50 prompts",
      "Prompt Quality & Safety Guide",
      "Prompt Builder Workbook XLSX",
      "Output QA",
      "Strategy & Briefing prompts",
      "Research & Synthesis prompts",
      "Marketing & Ecommerce prompts",
      "Operations, Analytics & AI Workflow prompts",
    ],
    highlights: [
      {
        title: "Estrutura repetível",
        body: "ROLE → CONTEXT → TASK → CONSTRAINTS → OUTPUT → EVIDENCE RULE → QUALITY CHECK.",
      },
      {
        title: "Evidence-first",
        body: "Os prompts instruem a não inventar facts, metrics, testimonials ou source support.",
      },
      {
        title: "Prompt Builder",
        body: "Workbook para montar prompts reutilizáveis e auditar a saída antes de uso.",
      },
    ],
    checkoutMicrocopy:
      "50 prompts + Prompt Builder XLSX + Quality Guide · pagamento único.",
  },
  "creator-growth-suite": {
    intro:
      "Suite para creators, ecommerce e equipas pequenas que liga mensagem, sales pages, lifecycle email, prompts e lançamento num único sistema de trabalho.",
    deliverables: [
      "Conversion Content OS - pacote completo",
      "Social Content OS - pacote completo",
      "Sales Page Blueprint - pacote completo",
      "Email Conversion Kit - pacote completo",
      "Digital Product Launch Kit - pacote completo",
      "Creator Prompt Library - pacote completo",
      "Workbooks e scorecards incluídos",
      "Bibliotecas de hooks, prompts e CTAs",
      "Acesso único aos seis produtos",
    ],
    highlights: [
      {
        title: "6 produtos num acesso",
        body: "Entitlement do bundle libera automaticamente todos os SKUs incluídos.",
      },
      {
        title: "Valor separado R$ 362",
        body: "Suite por R$ 219 em pagamento único com os seis produtos atuais incluídos.",
      },
      {
        title: "Do briefing à entrega",
        body: "Mensagem, social, página, email, IA assistida, release, checkout e activation.",
      },
    ],
    checkoutMicrocopy:
      "6 produtos · valor separado R$ 362 · suite R$ 219 · sem assinatura.",
  },
  "primeiro-filhote-90-dias": {
    intro:
      "Companheiro prático para organizar os primeiros 90 dias com um filhote: rotina, aprendizagem baseada em recompensa, socialização, trackers, regras da família e preparação de perguntas ao veterinário. Não substitui avaliação veterinária ou comportamental individual.",
    deliverables: [
      "Guia Primeiro Filhote - 90 Dias",
      "Planner 90 Dias - XLSX editável",
      "Planner 90 Dias - versão imprimível",
      "Checklist Casa & Primeiras 72 Horas",
      "Trackers de eliminação e treino",
      "Diário de Socialização & Exposição",
      "Veterinário & Quando Pedir Ajuda",
      "Regras da Família",
      "Customer License & Terms",
      "Notas de Fontes & Segurança",
    ],
    highlights: [
      {
        title: "Rotina sem promessas mágicas",
        body: "Ajuda a descobrir padrões reais do filhote sem prometer treino perfeito em prazo fixo.",
      },
      {
        title: "Abordagem baseada em recompensa",
        body: "Conteúdo alinhado a orientação atual de comportamento animal, sem métodos de medo, dor ou intimidação.",
      },
      {
        title: "Saúde com limite claro",
        body: "Organiza observações e perguntas, mas vacinação, medicação, nutrição e tratamento ficam com o médico-veterinário.",
      },
    ],
    checkoutMicrocopy:
      "Guia + planner + checklists · produto educativo e organizacional · pagamento único.",
  },
  "social-content-os": {
    intro:
      "Sistema multicanal 30/60/90 dias para transformar ideias verificadas em conteúdo com funções claras: attract, educate, demonstrate, de-risk, convert e activate.",
    deliverables: [
      "Social Content OS Playbook",
      "90-Day Social Content Planner XLSX",
      "Channel Adaptation Matrix",
      "Creative Brief Library",
      "Repurposing Matrix",
      "Learning Log",
      "Quick Start",
      "Customer License & Terms",
    ],
    highlights: [
      {
        title: "Content jobs",
        body: "Planeie pela função do conteúdo antes de escolher formato ou canal.",
      },
      {
        title: "Repurposing com contexto",
        body: "Adapte entrada, densidade e formato sem remover qualifiers da claim original.",
      },
      {
        title: "90-day planner",
        body: "Calendar, creative briefs, repurposing e learning loop num XLSX editável.",
      },
    ],
    checkoutMicrocopy:
      "Playbook + 90-Day Planner + matrices + briefs · pagamento único.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, product } = await params;
  const listing = await getPublicListingBySlug(category, product);

  if (!listing) return { title: "Produto não encontrado" };

  const canonical =
    "https://novidades.store/" + category + "/" + product;

  return {
    title: listing.title,
    description: listing.description || listing.subtitle,
    alternates: { canonical },
    openGraph: {
      title: listing.title,
      description: listing.description || listing.subtitle,
      url: canonical,
      type: "website",
      images: listing.image ? [{ url: listing.image }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { category, product } = await params;
  const listing = await getPublicListingBySlug(category, product);

  if (!listing || listing.priceCents === null || listing.fulfillmentType !== "digital") notFound();

  const price = listing.priceCents / 100;
  const funnelUrl = listing.funnelUrl;
  const isDigital = listing.fulfillmentType === "digital";
  const detail = isDigital ? DIGITAL_DETAILS[listing.slug] : undefined;
  const canonicalUrl =
    "https://novidades.store/" + category + "/" + product;
  const offerActive = Boolean(funnelUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    image: [listing.image, ...listing.gallery].filter(Boolean),
    sku: listing.slug,
    ...(offerActive
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: listing.currency,
            price: price.toFixed(2),
            availability: "https://schema.org/InStock",
            url: canonicalUrl,
          },
        }
      : {}),
  };

  return (
    <article className="bg-[#f7f7f5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6 md:py-10 lg:px-8">
        <nav className="mb-5 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/conteudos-digitais" className="hover:text-foreground">
            {listing.categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{listing.title}</span>
        </nav>

        <div className="grid gap-6 rounded-[22px] border border-border bg-white p-4 shadow-card md:grid-cols-[1.02fr_.98fr] md:p-7 lg:gap-10 lg:p-10">
          <section>
            <div className="relative aspect-square overflow-hidden rounded-[18px] bg-soft">
              <Image
                src={listing.image}
                alt={listing.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </section>

          <section className="flex flex-col justify-center">
            <p className="text-[11px] font-bold tracking-[0.14em] text-brand-dark uppercase">
              {listing.categoryName}
            </p>
            <h1 className="mt-2 font-editorial text-4xl font-semibold leading-[1.02] tracking-[-0.04em] md:text-5xl">
              {listing.title}
            </h1>
            {listing.subtitle ? (
              <p className="mt-3 text-lg font-semibold text-[#7a6546]">
                {listing.subtitle}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-[15px]">
              {listing.description}
            </p>

            <div className="mt-7 border-y border-border py-5">
              <span className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                {isDigital ? "Acesso por" : "A partir de"}
              </span>
              <strong className="mt-1 block text-3xl tracking-tight">
                {formatMoney(price, listing.currency)}
              </strong>
              {listing.currency === "BRL" ? (
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="h-4 w-4 text-brand" aria-hidden="true" />
                  Checkout comercial em migração para ARO
                </p>
              ) : null}
              {isDigital ? (
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Download className="h-4 w-4 text-brand" aria-hidden="true" />
                  Produto digital - sem frete ou entrega física
                </p>
              ) : null}
            </div>

            {isDigital ? (
              <DigitalCheckout
                productSlug={listing.slug}
                priceLabel={formatMoney(price, listing.currency)}
                microcopy={detail?.checkoutMicrocopy}
              />
            ) : funnelUrl ? (
              <a
                href={funnelUrl}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-brand px-6 text-sm font-extrabold text-white transition hover:bg-brand-dark"
              >
                Ver oferta completa
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <div className="mt-6 rounded-xl bg-soft p-4 text-sm text-muted-foreground">
                Esta oferta ainda não está disponível para compra.
              </div>
            )}

            <div className="mt-4 grid gap-2 rounded-xl bg-soft p-4 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" aria-hidden="true" />
                Vendedor, total, entrega e políticas identificados antes do pagamento.
              </p>
              <p>
                {isDigital
                  ? "Acesso liberado após confirmação de pagamento por entitlement protegido e links temporários."
                  : "Uma experiência Novidades.store."}
              </p>
            </div>
          </section>
        </div>

        {isDigital && detail ? (
          <section className="mt-8 rounded-[22px] border border-border bg-white p-5 shadow-card md:p-8">
            <p className="text-[11px] font-bold tracking-[0.14em] text-brand-dark uppercase">
              Release 1.0
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">
              O que está incluído no pacote
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
              {detail.intro}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {detail.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-border bg-soft/60 p-4 text-sm font-semibold"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 rounded-xl bg-[#0b1220] p-5 text-sm text-slate-300 md:grid-cols-3">
              {detail.highlights.map((item) => (
                <p key={item.title}>
                  <strong className="block text-white">{item.title}</strong>
                  {item.body}
                </p>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
