import { createFileRoute } from "@tanstack/react-router";
import { useGetEditions } from "../features/edition/hooks/useGetEditions";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isLoading, isError, error } = useGetEditions();

  return (
    <div className="h-full">
      <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
        <h1 className="text-xl font-semibold mb-4">Éditions</h1>

        {isLoading && <p className="text-muted-foreground">Chargement...</p>}

        {isError && (
          <p className="text-destructive">
            Erreur : {error.message}
          </p>
        )}

        {data && (
          <ul className="space-y-2">
            {data.editions.map((edition) => (
              <li
                key={edition.id}
                className="rounded-lg border p-3 text-sm"
              >
                <span className="font-medium">{edition.name}</span>
                <span className="ml-2 text-muted-foreground">
                  {edition.startDate}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
