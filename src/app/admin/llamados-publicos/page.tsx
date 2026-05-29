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
  publicCallSourceTypeLabels,
  type PublicCallDraftRecord,
  type PublicCallReviewEventRecord,
  type PublicCallSourceRecord,
} from "@/lib/public-calls-admin-queue";
import {
  approvePublicCallDraftAction,
  archivePublicCallDraftAction,
  createPublicCallDraftAction,
  createPublicCallSourceAction,
  publishPublicCallDraftAction,
  rejectPublicCallDraftAction,
  submitPublicCallDraftForReviewAction,
  updatePublicCallDraftAction,
  updatePublicCallSourceAction,
} from "./actions";

type QueueData = {
  drafts: PublicCallDraftRecord[];
  sources: PublicCallSourceRecord[];
  events: PublicCallReviewEventRecord[];
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
    return { drafts: [], sources: [], events: [], error: "Supabase no esta configurado para leer la cola admin." };
  }

  const [draftsResult, sourcesResult, eventsResult] = await Promise.all([
    supabase
      .from("public_call_drafts")
      .select(
        "id,source_id,title,organization,description,category,location,deadline,source_url,load_method,review_status,publication_status,license_name,review_notes,rejection_reason,created_at,updated_at,public_call_sources(name,authorization_status,robots_review_status,license_name,license_url)",
      )
      .order("updated_at", { ascending: false })
      .limit(25),
    supabase
      .from("public_call_sources")
      .select("id,name,source_type,base_url,terms_url,license_name,license_url,robots_review_status,authorization_status,notes,created_at,updated_at")
      .order("updated_at", { ascending: false })
      .limit(25),
    supabase
      .from("public_call_review_events")
      .select("id,source_id,draft_id,event_type,from_status,to_status,actor_id,notes,created_at")
      .order("created_at", { ascending: false })
      .limit(30),
  ]);

  if (draftsResult.error || sourcesResult.error || eventsResult.error) {
    return {
      drafts: [],
      sources: [],
      events: [],
      error:
        "La cola admin todavia no esta disponible en este entorno. Aplicar la migracion en Preview/Staging antes de usarla.",
    };
  }

  return {
    drafts: normalizeDraftRows(draftsResult.data),
    sources: (sourcesResult.data ?? []) as PublicCallSourceRecord[],
    events: (eventsResult.data ?? []) as PublicCallReviewEventRecord[],
    error: null,
  };
}

const noticeMessages: Record<string, string> = {
  source_created: "Fuente creada.",
  source_updated: "Fuente actualizada.",
  draft_created: "Borrador creado.",
  draft_updated: "Borrador actualizado y devuelto a revision inicial.",
  draft_submitted: "Borrador enviado a revision.",
  draft_approved: "Borrador aprobado por revision humana.",
  draft_rejected: "Borrador rechazado con motivo registrado.",
  draft_published: "Llamado publicado.",
  draft_archived: "Llamado archivado.",
};

const errorMessages: Record<string, string> = {
  AUTH_REQUIRED: "Debes iniciar sesion para operar la cola.",
  ADMIN_REQUIRED: "Solo una cuenta admin puede operar la cola.",
  REASON_REQUIRED: "La accion requiere motivo.",
  APPROVAL_REQUIRED: "Publicar requiere aprobacion humana previa.",
  LICENSE_REQUIRED: "Publicar requiere licencia o terminos registrados.",
  TERMS_REVIEW_REQUIRED: "Publicar requiere robots/terminos revisados.",
  AUTHORIZED_SOURCE_REQUIRED: "La fuente no esta autorizada para publicar.",
  FIELD_REQUIRED: "Faltan campos obligatorios.",
  HTTPS_URL_REQUIRED: "Las URL oficiales deben usar HTTPS.",
};

function FormField({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="block text-sm font-bold text-[var(--ej-text-muted)]">
      {label}
      <span className="mt-1 block">{children}</span>
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="focus-ring w-full rounded-md border border-[var(--ej-border)] bg-white/[0.06] px-3 py-2 text-sm text-white" />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="focus-ring min-h-20 w-full rounded-md border border-[var(--ej-border)] bg-white/[0.06] px-3 py-2 text-sm text-white" />;
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="focus-ring w-full rounded-md border border-[var(--ej-border)] bg-[#0f1b2d] px-3 py-2 text-sm text-white" />;
}

export default async function AdminPublicCallsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const profile = await getCurrentProfile();
  const params = searchParams ? await searchParams : {};
  const okCode = typeof params.ok === "string" ? params.ok : null;
  const errorCode = typeof params.error === "string" ? params.error : null;

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

  const { drafts, sources, events, error } = await getQueueData();
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

        {okCode ? (
          <div className="ej-card mt-6 border-emerald-400/30 p-4 text-sm font-bold text-emerald-100">
            {noticeMessages[okCode] ?? "Accion completada."}
          </div>
        ) : null}

        {errorCode ? (
          <div className="ej-card mt-6 border-red-400/30 p-4 text-sm font-bold text-red-100">
            {errorMessages[errorCode] ?? "No se pudo completar la accion."}
          </div>
        ) : null}

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <form action={createPublicCallSourceAction} className="ej-card p-5">
            <h2 className="text-xl font-black">Crear fuente</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Solo fuentes oficiales o autorizadas. No scraping ni import automatico.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <FormField label="Nombre">
                <TextInput name="name" placeholder="Ej: gub.uy llamados" required />
              </FormField>
              <FormField label="Tipo">
                <SelectInput name="source_type" required>
                  {Object.entries(publicCallSourceTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
              <FormField label="URL oficial">
                <TextInput name="base_url" placeholder="https://..." required type="url" />
              </FormField>
              <FormField label="Terminos">
                <TextInput name="terms_url" placeholder="https://..." type="url" />
              </FormField>
              <FormField label="Licencia">
                <TextInput name="license_name" placeholder="Nombre de licencia o terminos" />
              </FormField>
              <FormField label="URL licencia">
                <TextInput name="license_url" placeholder="https://..." type="url" />
              </FormField>
              <FormField label="Robots/terminos">
                <SelectInput name="robots_review_status" required>
                  {Object.entries(publicCallRobotsStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
              <FormField label="Autorizacion">
                <SelectInput name="authorization_status" required>
                  {Object.entries(publicCallAuthorizationStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
            </div>
            <FormField label="Notas">
              <TextArea name="notes" placeholder="Fuente oficial, licencia revisada, convenio o permiso pendiente." />
            </FormField>
            <button className="ej-btn mt-4" type="submit">
              Crear fuente
            </button>
          </form>

          <form action={createPublicCallDraftAction} className="ej-card p-5">
            <h2 className="text-xl font-black">Crear borrador</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">Todo borrador queda no publicado hasta revision humana.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <FormField label="Fuente">
                <SelectInput disabled={!sources.length} name="source_id" required>
                  {sources.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </SelectInput>
              </FormField>
              <FormField label="Titulo">
                <TextInput name="title" required />
              </FormField>
              <FormField label="Organismo">
                <TextInput name="organization" required />
              </FormField>
              <FormField label="Categoria">
                <TextInput name="category" required />
              </FormField>
              <FormField label="Ubicacion">
                <TextInput name="location" required />
              </FormField>
              <FormField label="Cierre">
                <TextInput name="deadline" type="date" />
              </FormField>
              <FormField label="URL oficial">
                <TextInput name="source_url" placeholder="https://..." required type="url" />
              </FormField>
              <FormField label="Licencia">
                <TextInput name="license_name" />
              </FormField>
            </div>
            <FormField label="Resumen propio">
              <TextArea name="description" required />
            </FormField>
            <FormField label="Notas de revision">
              <TextArea name="review_notes" />
            </FormField>
            <button className="ej-btn mt-4" disabled={!sources.length} type="submit">
              Crear borrador
            </button>
          </form>
        </section>

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

                      <details className="mt-4 rounded-lg border border-[var(--ej-border)] bg-black/10 p-4">
                        <summary className="cursor-pointer text-sm font-black text-white">Editar borrador</summary>
                        <form action={updatePublicCallDraftAction} className="mt-4 grid gap-3">
                          <input name="draft_id" type="hidden" value={draft.id} />
                          <div className="grid gap-3 md:grid-cols-2">
                            <FormField label="Fuente">
                              <SelectInput defaultValue={draft.source_id} name="source_id" required>
                                {sources.map((source) => (
                                  <option key={source.id} value={source.id}>
                                    {source.name}
                                  </option>
                                ))}
                              </SelectInput>
                            </FormField>
                            <FormField label="Titulo">
                              <TextInput defaultValue={draft.title} name="title" required />
                            </FormField>
                            <FormField label="Organismo">
                              <TextInput defaultValue={draft.organization} name="organization" required />
                            </FormField>
                            <FormField label="Categoria">
                              <TextInput defaultValue={draft.category} name="category" required />
                            </FormField>
                            <FormField label="Ubicacion">
                              <TextInput defaultValue={draft.location} name="location" required />
                            </FormField>
                            <FormField label="Cierre">
                              <TextInput defaultValue={draft.deadline ?? ""} name="deadline" type="date" />
                            </FormField>
                            <FormField label="URL oficial">
                              <TextInput defaultValue={draft.source_url} name="source_url" required type="url" />
                            </FormField>
                            <FormField label="Licencia">
                              <TextInput defaultValue={draft.license_name ?? ""} name="license_name" />
                            </FormField>
                          </div>
                          <FormField label="Resumen propio">
                            <TextArea defaultValue={draft.description} name="description" required />
                          </FormField>
                          <FormField label="Motivo del cambio">
                            <TextArea name="action_reason" required />
                          </FormField>
                          <button className="ej-btn-secondary w-fit" type="submit">
                            Guardar cambios
                          </button>
                        </form>
                      </details>

                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <form action={submitPublicCallDraftForReviewAction} className="rounded-lg border border-[var(--ej-border)] bg-black/10 p-3">
                          <input name="draft_id" type="hidden" value={draft.id} />
                          <FormField label="Motivo de envio">
                            <TextArea name="action_reason" required />
                          </FormField>
                          <button className="ej-btn-secondary mt-3 w-full" type="submit">
                            Enviar a revision
                          </button>
                        </form>
                        <form action={approvePublicCallDraftAction} className="rounded-lg border border-[var(--ej-border)] bg-black/10 p-3">
                          <input name="draft_id" type="hidden" value={draft.id} />
                          <FormField label="Motivo de aprobacion">
                            <TextArea name="action_reason" required />
                          </FormField>
                          <button className="ej-btn-secondary mt-3 w-full" type="submit">
                            Aprobar
                          </button>
                        </form>
                        <form action={rejectPublicCallDraftAction} className="rounded-lg border border-[var(--ej-border)] bg-black/10 p-3">
                          <input name="draft_id" type="hidden" value={draft.id} />
                          <FormField label="Motivo de rechazo">
                            <TextArea name="action_reason" required />
                          </FormField>
                          <button className="ej-btn-secondary mt-3 w-full" type="submit">
                            Rechazar
                          </button>
                        </form>
                        <form action={publishPublicCallDraftAction} className="rounded-lg border border-[var(--ej-border)] bg-black/10 p-3">
                          <input name="draft_id" type="hidden" value={draft.id} />
                          <FormField label="Motivo de publicacion">
                            <TextArea name="action_reason" required />
                          </FormField>
                          <button className="ej-btn-secondary mt-3 w-full" type="submit">
                            Publicar
                          </button>
                        </form>
                        <form action={archivePublicCallDraftAction} className="rounded-lg border border-[var(--ej-border)] bg-black/10 p-3 md:col-span-2">
                          <input name="draft_id" type="hidden" value={draft.id} />
                          <FormField label="Motivo de archivo">
                            <TextArea name="action_reason" required />
                          </FormField>
                          <button className="ej-btn-secondary mt-3 w-full" type="submit">
                            Archivar / despublicar
                          </button>
                        </form>
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
                      <details className="mt-3 rounded-lg border border-[var(--ej-border)] bg-black/10 p-3">
                        <summary className="cursor-pointer text-sm font-black text-white">Editar fuente</summary>
                        <form action={updatePublicCallSourceAction} className="mt-3 grid gap-3">
                          <input name="source_id" type="hidden" value={source.id} />
                          <FormField label="Nombre">
                            <TextInput defaultValue={source.name} name="name" required />
                          </FormField>
                          <FormField label="Tipo">
                            <SelectInput defaultValue={source.source_type} name="source_type" required>
                              {Object.entries(publicCallSourceTypeLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </SelectInput>
                          </FormField>
                          <FormField label="URL oficial">
                            <TextInput defaultValue={source.base_url} name="base_url" required type="url" />
                          </FormField>
                          <FormField label="Terminos">
                            <TextInput defaultValue={source.terms_url ?? ""} name="terms_url" type="url" />
                          </FormField>
                          <FormField label="Licencia">
                            <TextInput defaultValue={source.license_name ?? ""} name="license_name" />
                          </FormField>
                          <FormField label="URL licencia">
                            <TextInput defaultValue={source.license_url ?? ""} name="license_url" type="url" />
                          </FormField>
                          <FormField label="Robots/terminos">
                            <SelectInput defaultValue={source.robots_review_status} name="robots_review_status" required>
                              {Object.entries(publicCallRobotsStatusLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </SelectInput>
                          </FormField>
                          <FormField label="Autorizacion">
                            <SelectInput defaultValue={source.authorization_status} name="authorization_status" required>
                              {Object.entries(publicCallAuthorizationStatusLabels).map(([value, label]) => (
                                <option key={value} value={value}>
                                  {label}
                                </option>
                              ))}
                            </SelectInput>
                          </FormField>
                          <FormField label="Motivo">
                            <TextArea name="action_reason" required />
                          </FormField>
                          <button className="ej-btn-secondary" type="submit">
                            Actualizar fuente
                          </button>
                        </form>
                      </details>
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

            <section className="ej-card p-5">
              <h2 className="text-xl font-black">Historial de auditoria</h2>
              <div className="mt-4 space-y-3">
                {events.length ? (
                  events.map((event) => (
                    <article className="rounded-lg border border-[var(--ej-border)] bg-white/[0.04] p-3 text-sm" key={event.id}>
                      <p className="font-black text-white">{event.event_type}</p>
                      <p className="mt-1 text-[var(--muted)]">
                        {event.from_status ?? "inicio"} → {event.to_status ?? "sin cambio"}
                      </p>
                      {event.notes ? <p className="mt-2 text-[var(--muted)]">{event.notes}</p> : null}
                      <p className="mt-2 text-xs font-bold text-[var(--ej-text-soft)]">{event.created_at}</p>
                    </article>
                  ))
                ) : (
                  <EmptyState title="Sin eventos" text="Las acciones admin auditadas apareceran aca cuando existan." />
                )}
              </div>
            </section>
          </aside>
        </section>
      </main>
    </AppShell>
  );
}
