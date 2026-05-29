import { AppShell } from "@/components/app-shell";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { getCurrentProfile, getServerSupabaseClient } from "@/lib/account";
import {
  getPublicCallRiskFlags,
  publicCallAuthorizationStatusLabels,
  publicCallPublicationStatusLabels,
  publicCallReviewStatusLabels,
  publicCallRobotsStatusLabels,
  type PublicCallDraftRecord,
  type PublicCallSourceRecord,
} from "@/lib/public-calls-admin-queue";

type QueueData = {
  drafts: PublicCallDraftRecord[];
  sources: PublicCallSourceRecord[];
  error: string | null;
};

type RawDraftRecord = Omit<PublicCallDraftRecord, "public_call_sources"> & {
  public_call_sources?: PublicCallDraftRecord["public_call_sources"] | PublicCallDraftRecord["public_call_sources"][];
};

function normalizeDraftRows(rows: unknown): PublicCallDraftRecord[] {
  if (!Array.isArray(rows)) {
    return [];
  }

  return (rows as RawDraftRecord[]).map((row) => ({
    ...row,
    public_call_sources: Array.isArray(row.public_call_sources)
      ? (row.public_call_sources[0] ?? null)
      : (row.public_call_sources ?? null),
  }));
}

async function getQueueData(): Promise<QueueData> {
  const supabase = await getServerSupabaseClient();

  if (!supabase) {
    return { drafts: [], sources: [], error: "Supabase no esta configurado para leer la cola admin." };
  }

  const [draftsResult, sourcesResult] = await Promise.all([
    supabase
      .from("public_call_drafts")
      .select(
        "id,title,organization,category,location,deadline,source_url,review_status,publication_status,license_name,review_notes,rejection_reason,created_at,updated_at,public_call_sources(name,authorization_status,robots_review_status,license_name,license_url)",
      )
      .order("updated_at", { ascending: false })
      .limit(25),
    supabase
      .from("public_call_sources")
      .select("id,name,source_type,base_url,terms_url,license_name,license_url,robots_review_status,authorization_status,notes,created_at,updated_at")
      .order("updated_at", { ascending: false })
      .limit(25),
  ]);

  if (draftsResult.error || sourcesResult.error) {
    return {
      drafts: [],
      sources: [],
      error:
        "La cola admin todavia no esta disponible en este entorno. Aplicar la migracion en Preview/Staging antes de usarla.",
    };
  }

  return {
    drafts: normalizeDraftRows(draftsResult.data),
    sources: (sourcesResult.data ?? []) as PublicCallSourceRecord[],
    error: null,
  };
}

export default async function AdminPublicCallsPage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    return (
      <AppShell>
        <main className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-3xl font-black">Llamados publicos</h1>
          <p className="ej-muted mt-2 text-sm leading-6">Cola admin protegida para revisar fuentes y borradores.</p>
          <div className="mt-6">
            <ErrorState message="Debes iniciar sesion con una cuenta admin para ver la cola de revision." />
          </div>
        </main>
      </AppShell>
    );
  }

  if (profile.role !== "admin") {
    return (
      <AppShell>
        <main className="mx-auto max-w-4xl px-4 py-10">
          <h1 className="text-3xl font-black">Llamados publicos</h1>
          <p className="ej-muted mt-2 text-sm leading-6">Cola admin protegida para revisar fuentes y borradores.</p>
          <div className="mt-6">
            <ErrorState message="Tu cuenta no tiene permiso admin. Esta ruta no muestra fuentes ni borradores a usuarios comunes." />
          </div>
        </main>
      </AppShell>
    );
  }

  const { drafts, sources, error } = await getQueueData();
  const pendingCount = drafts.filter((draft) => draft.review_status === "pending_review").length;
  const publishedCount = drafts.filter((draft) => draft.publication_status === "published").length;
  const blockedSourceCount = sources.filter((source) => source.authorization_status === "blocked").length;

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="ej-pill w-fit">Revision humana obligatoria</p>
            <h1 className="mt-4 text-3xl font-black">Cola admin de llamados publicos</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted)]">
              Preparacion segura para cargar llamados manuales o de fuentes autorizadas. Esta pantalla no importa datos,
              no scrapea y no publica nada sin aprobacion humana.
            </p>
          </div>
          <a className="ej-btn-secondary" href="/llamados-publicos">
            Ver radar publico
          </a>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <article className="ej-card p-5">
            <p className="ej-soft text-sm font-bold">Borradores</p>
            <p className="mt-1 text-3xl font-black">{drafts.length}</p>
          </article>
          <article className="ej-card p-5">
            <p className="ej-soft text-sm font-bold">Revision pendiente</p>
            <p className="mt-1 text-3xl font-black">{pendingCount}</p>
          </article>
          <article className="ej-card p-5">
            <p className="ej-soft text-sm font-bold">Publicados</p>
            <p className="mt-1 text-3xl font-black">{publishedCount}</p>
          </article>
          <article className="ej-card p-5">
            <p className="ej-soft text-sm font-bold">Fuentes bloqueadas</p>
            <p className="mt-1 text-3xl font-black">{blockedSourceCount}</p>
          </article>
        </section>

        {error ? (
          <section className="ej-card mt-6 p-5">
            <ErrorState message={error} />
          </section>
        ) : null}

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className="ej-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">Borradores de llamados</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">Aprobar o publicar requiere fuente, licencia y revision humana.</p>
              </div>
              <span className="ej-warning-badge">Sin import automatico</span>
            </div>

            <div className="mt-5 space-y-4">
              {drafts.length ? (
                drafts.map((draft) => {
                  const riskFlags = getPublicCallRiskFlags(draft);

                  return (
                    <article className="rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-4" key={draft.id}>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--ej-text-soft)]">
                            {draft.organization} · {draft.category}
                          </p>
                          <h3 className="mt-1 text-lg font-black">{draft.title}</h3>
                          <p className="mt-2 text-sm text-[var(--muted)]">
                            {draft.location}
                            {draft.deadline ? ` · Cierre ${draft.deadline}` : " · Cierre a verificar"}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="ej-pill">{publicCallReviewStatusLabels[draft.review_status]}</span>
                          <span className="ej-pill">{publicCallPublicationStatusLabels[draft.publication_status]}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                        <p>
                          <span className="font-bold text-white">Fuente: </span>
                          <a className="underline decoration-[var(--brand)] underline-offset-4" href={draft.source_url} rel="noreferrer" target="_blank">
                            abrir origen
                          </a>
                        </p>
                        <p>
                          <span className="font-bold text-white">Licencia: </span>
                          {draft.license_name ?? draft.public_call_sources?.license_name ?? "pendiente"}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {riskFlags.length ? (
                          riskFlags.map((risk) => (
                            <span className="ej-warning-badge" key={risk}>
                              {risk}
                            </span>
                          ))
                        ) : (
                          <span className="ej-badge">Sin riesgos visibles</span>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button className="ej-btn-secondary opacity-60" disabled type="button">
                          Aprobar
                        </button>
                        <button className="ej-btn-secondary opacity-60" disabled type="button">
                          Rechazar
                        </button>
                        <button className="ej-btn-secondary opacity-60" disabled type="button">
                          Publicar
                        </button>
                        <span className="text-xs font-bold text-[var(--muted)]">
                          Acciones bloqueadas en V1: requieren server action auditada y migracion aplicada en staging.
                        </span>
                      </div>
                    </article>
                  );
                })
              ) : (
                <EmptyState
                  title="Sin borradores"
                  text="Cuando exista una fuente autorizada, los llamados entraran aca como borradores antes de publicarse."
                />
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <section className="ej-card p-5">
              <h2 className="text-xl font-black">Fuentes registradas</h2>
              <div className="mt-4 space-y-3">
                {sources.length ? (
                  sources.map((source) => (
                    <article className="rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-4" key={source.id}>
                      <h3 className="font-black">{source.name}</h3>
                      <a className="mt-2 block text-sm underline decoration-[var(--brand)] underline-offset-4" href={source.base_url} rel="noreferrer" target="_blank">
                        Fuente oficial
                      </a>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="ej-pill">{publicCallAuthorizationStatusLabels[source.authorization_status]}</span>
                        <span className="ej-pill">{publicCallRobotsStatusLabels[source.robots_review_status]}</span>
                      </div>
                    </article>
                  ))
                ) : (
                  <EmptyState
                    title="Sin fuentes"
                    text="Registrar fuentes exige URL oficial, terminos/licencia y revision de autorizacion."
                  />
                )}
              </div>
            </section>

            <section className="ej-card p-5">
              <h2 className="text-xl font-black">Reglas de publicacion</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                <li>Fuente oficial o autorizada visible.</li>
                <li>Terminos, licencia y robots revisados.</li>
                <li>Resumen propio, sin copiar bases completas.</li>
                <li>Revision humana antes de publicar.</li>
                <li>Auditoria de creador, revisor, publicador y fechas.</li>
              </ul>
            </section>
          </aside>
        </section>
      </main>
    </AppShell>
  );
}
