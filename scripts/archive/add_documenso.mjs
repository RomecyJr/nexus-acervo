import fs from 'node:fs';

const catalogPath = new URL('../data/catalog.json', import.meta.url);
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Verifica se já existe
if (!catalog.items.find(x => x.id === 'repo-documenso')) {
  const documensoItem = {
    id: "repo-documenso",
    title: "Documenso — Assinatura Digital Open Source",
    kind: "repositório",
    segment: "Desenvolvimento",
    url: "https://github.com/documenso/documenso",
    description: "A alternativa de código aberto número 1 ao DocuSign. Plataforma moderna e segura para assinatura eletrônica de documentos e contratos.",
    tags: [
      "github",
      "assinatura",
      "pdf",
      "contratos",
      "open-source",
      "shadcn"
    ],
    status: "ativo",
    year: 2026,
    source: "Comunidade Open Source",
    addedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    license: "AGPL-3.0",
    openAccess: true,
    youtubeId: "Y0ppIQrEnZs",
    thumbnail: "https://opengraph.githubassets.com/1/documenso/documenso",
    deliverable: "Plataforma completa de assinatura eletrônica de PDFs legalmente vinculativa com trilha de auditoria, eliminando custos de SaaS e mantendo a soberania total dos dados.",
    targetAudience: "Empresas, advogados, desenvolvedores e freelancers",
    practicalExample: "Envie um contrato de prestação de serviços ou proposta comercial em PDF com campos de assinatura, rubrica e data para o cliente assinar diretamente pelo navegador com validade jurídica.",
    notes: "Construído com Next.js, Hono, Prisma, PostgreSQL, Tailwind CSS e componentes shadcn/ui. Suporta auto-hospedagem com Docker em 1 comando."
  };

  catalog.items.push(documensoItem);
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`Documenso adicionado com sucesso! Total de itens: ${catalog.items.length}`);
} else {
  console.log('Documenso já presente no catálogo.');
}
