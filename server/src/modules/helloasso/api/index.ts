import z from "zod";
import {
  getFormInfoResponse,
  getFormItemsResponse,
  getTokenResponse,
  helloAssoItemSchema,
} from "./types.js";
import { readJsonBody } from "./utils.js";

export class HelloAssoApi {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly organizationSlug: string;
  private refreshToken: string | null = null;
  private accessToken: string | null = null;

  constructor() {
    this.clientId = process.env.HELLO_ASSO_CLIENT_ID!;
    this.clientSecret = process.env.HELLO_ASSO_CLIENT_SECRET!;
    this.organizationSlug = process.env.HELLO_ASSO_ORGANIZATION_SLUG!;
  }

  private async getToken(): Promise<z.infer<typeof getTokenResponse>> {
    const body = this.refreshToken
      ? new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
        })
      : new URLSearchParams({
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret,
        });

    const res = await fetch("https://api.helloasso.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const raw = await readJsonBody(res);

    if (!res.ok) {
      throw new Error(
        `HelloAsso API: échec OAuth (${res.status}) — ${JSON.stringify(raw)}`,
      );
    }

    if (raw === null) {
      throw new Error("HelloAsso API: réponse OAuth vide");
    }

    const responseParsed = getTokenResponse.safeParse(raw);

    if (!responseParsed.success) {
      throw new Error("HelloAsso API: Failed to parse GetToken response");
    }

    this.refreshToken = responseParsed.data.refresh_token;
    this.accessToken = responseParsed.data.access_token;

    return responseParsed.data;
  }

  private async fetchJson<T>(
    url: string,
    options: RequestInit,
    retryAfterUnauthorized = false,
  ): Promise<T> {
    if (this.accessToken === null) {
      await this.getToken();
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        ...options.headers,
      },
    });

    const body = await readJsonBody(res);

    if (res.status === 401 && !retryAfterUnauthorized) {
      await this.getToken();
      return this.fetchJson<T>(url, options, true);
    }

    if (!res.ok) {
      throw new Error(
        `HelloAsso API: ${res.status} ${res.statusText} — ${JSON.stringify(body)}`,
      );
    }

    if (body === null) {
      throw new Error(`HelloAsso API: corps de réponse vide (${res.status})`);
    }

    return body as T;
  }

  public async getFormItems(
    formSlug: string,
    from: string,
    to: string,
    continuationToken?: string,
  ): Promise<z.infer<typeof helloAssoItemSchema>[]> {
    const url = new URL(
      `https://api.helloasso.com/v5/organizations/${this.organizationSlug}/forms/Event/${formSlug}/items`,
    );
    url.searchParams.set("withDetails", "false");
    url.searchParams.set("from", from);
    url.searchParams.set("to", to);
    url.searchParams.set("itemStates", "Processed");
    if (continuationToken) {
      url.searchParams.set("continuationToken", continuationToken);
    }

    const response = await this.fetchJson<unknown>(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseParsed = getFormItemsResponse.safeParse(response);

    if (!responseParsed.success) {
      throw new Error("HelloAsso API: Failed to parse getFormItems response");
    }

    const formItems = responseParsed.data.data;
    const nextContinuationToken =
      responseParsed.data.pagination.continuationToken;

    if (nextContinuationToken && continuationToken !== nextContinuationToken) {
      const nextItems = await this.getFormItems(
        formSlug,
        from,
        to,
        nextContinuationToken,
      );
      return formItems.concat(nextItems);
    }

    return formItems;
  }

  public async getFormInfo(
    formSlug: string,
  ): Promise<z.infer<typeof getFormInfoResponse>> {
    const url = new URL(
      `https://api.helloasso.com/v5/organizations/${this.organizationSlug}/forms/Event/${formSlug}/public`,
    );
    const response = await this.fetchJson<unknown>(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseParsed = getFormInfoResponse.safeParse(response);
    if (!responseParsed.success) {
      console.error(responseParsed.error);
      throw new Error("HelloAsso API: Failed to parse getFormInfo response");
    }
    return responseParsed.data;
  }
}
