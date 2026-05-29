import { describe, expect, it } from "vitest";
import {
  assertCanApproveDraft,
  assertCanArchiveDraft,
  assertCanPublishDraft,
  assertCanRejectDraft,
  assertCanSubmitDraftForReview,
  assertPublicCallAdmin,
  PublicCallAdminActionError,
  type PublicCallActionDraftState,
} from "@/lib/public-calls-admin-actions-policy";

const safeDraft: PublicCallActionDraftState = {
  id: "draft-1",
  review_status: "approved",
  publication_status: "not_published",
  source_url: "https://www.gub.uy/llamados-concursos-publicos",
  license_name: "Terminos gub.uy revisados",
  public_call_sources: {
    authorization_status: "manual_only",
    robots_review_status: "reviewed_allowed",
    license_name: "Terminos gub.uy revisados",
  },
};

function expectPolicyBlock(action: () => void, code: string) {
  expect(action).toThrow(PublicCallAdminActionError);
  try {
    action();
  } catch (error) {
    expect(error).toBeInstanceOf(PublicCallAdminActionError);
    expect((error as PublicCallAdminActionError).code).toBe(code);
  }
}

describe("public calls admin action policy", () => {
  it("blocks anonymous and common users from queue mutations", () => {
    expectPolicyBlock(() => assertPublicCallAdmin(null), "AUTH_REQUIRED");
    expectPolicyBlock(() => assertPublicCallAdmin({ id: "client", role: "client" }), "ADMIN_REQUIRED");
    expectPolicyBlock(() => assertPublicCallAdmin({ id: "worker", role: "worker" }), "ADMIN_REQUIRED");

    expect(() => assertPublicCallAdmin({ id: "admin", role: "admin" })).not.toThrow();
  });

  it("requires human approval and safe source review before publication", () => {
    expect(() => assertCanPublishDraft(safeDraft, "Revision humana completa")).not.toThrow();

    expectPolicyBlock(
      () => assertCanPublishDraft({ ...safeDraft, review_status: "pending_review" }, "Publicar temprano"),
      "APPROVAL_REQUIRED",
    );
    expectPolicyBlock(() => assertCanPublishDraft({ ...safeDraft, license_name: null, public_call_sources: null }, "Publicar"), "SOURCE_REQUIRED");
    expectPolicyBlock(
      () =>
        assertCanPublishDraft(
          {
            ...safeDraft,
            license_name: null,
            public_call_sources: { authorization_status: "manual_only", robots_review_status: "reviewed_allowed", license_name: null },
          },
          "Publicar",
        ),
      "LICENSE_REQUIRED",
    );
    expectPolicyBlock(
      () =>
        assertCanPublishDraft(
          {
            ...safeDraft,
            public_call_sources: { authorization_status: "permission_required", robots_review_status: "reviewed_allowed", license_name: "x" },
          },
          "Publicar",
        ),
      "AUTHORIZED_SOURCE_REQUIRED",
    );
    expectPolicyBlock(
      () =>
        assertCanPublishDraft(
          {
            ...safeDraft,
            public_call_sources: { authorization_status: "manual_only", robots_review_status: "not_reviewed", license_name: "x" },
          },
          "Publicar",
        ),
      "TERMS_REVIEW_REQUIRED",
    );
  });

  it("requires reasons for sensitive transitions", () => {
    expectPolicyBlock(() => assertCanSubmitDraftForReview({ ...safeDraft, review_status: "draft" }, ""), "REASON_REQUIRED");
    expectPolicyBlock(() => assertCanApproveDraft({ ...safeDraft, review_status: "pending_review" }, ""), "REASON_REQUIRED");
    expectPolicyBlock(() => assertCanRejectDraft({ ...safeDraft, review_status: "pending_review" }, ""), "REASON_REQUIRED");
    expectPolicyBlock(() => assertCanPublishDraft(safeDraft, ""), "REASON_REQUIRED");
    expectPolicyBlock(() => assertCanArchiveDraft({ ...safeDraft, publication_status: "published" }, ""), "REASON_REQUIRED");
  });

  it("protects review state transitions", () => {
    expect(() => assertCanSubmitDraftForReview({ ...safeDraft, review_status: "draft" }, "Listo para revisar")).not.toThrow();
    expect(() => assertCanApproveDraft({ ...safeDraft, review_status: "pending_review" }, "Cumple requisitos")).not.toThrow();
    expect(() => assertCanRejectDraft({ ...safeDraft, review_status: "pending_review" }, "Fuente insuficiente")).not.toThrow();
    expect(() => assertCanArchiveDraft({ ...safeDraft, publication_status: "published" }, "Cierre vencido")).not.toThrow();

    expectPolicyBlock(() => assertCanApproveDraft({ ...safeDraft, review_status: "draft" }, "Aprobar"), "PENDING_REVIEW_REQUIRED");
    expectPolicyBlock(() => assertCanArchiveDraft(safeDraft, "Archivar"), "PUBLISHED_REQUIRED");
  });
});
