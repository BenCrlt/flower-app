export async function readJsonBody(res: Response): Promise<unknown> {
  const text = await res.text();
  const trimmed = text.trim();
  if (trimmed === "") {
    return null;
  }
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    throw new Error(
      `HelloAsso API: réponse non JSON (${res.status}): ${trimmed.slice(0, 300)}`,
    );
  }
}
