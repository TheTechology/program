import { buildMetadata } from "@/lib/seo";
import { db } from "@/lib/db";

export const metadata = buildMetadata({
  title: "Calendar Evenimente",
  description: "Webinarii gratuite și sesiuni demo.",
  path: "/calendar"
});

export default async function CalendarPage() {
  const sessions = await db.liveSession.findMany({
    where: { startAt: { gte: new Date() }, visibility: "PUBLIC" },
    include: { course: true },
    orderBy: { startAt: "asc" }
  });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl font-bold">Calendar Public</h1>
      <p className="text-muted-foreground">Evenimente demo și webinarii gratuite.</p>
      <div className="space-y-3">
        {sessions.length === 0 && <p className="rounded-xl border p-5 text-sm text-muted-foreground">Nu sunt evenimente publice momentan.</p>}
        {sessions.map((session) => (
          <article key={session.id} className="rounded-xl border bg-white p-5">
            <p className="font-semibold">{session.title}</p>
            <p className="text-sm text-muted-foreground">Curs: {session.course.title}</p>
            <p className="text-sm">{new Date(session.startAt).toLocaleString("ro-RO")} • {session.durationMin} min</p>
          </article>
        ))}
      </div>
    </div>
  );
}
