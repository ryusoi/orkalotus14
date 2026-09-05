import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ImagePlus, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

const MAX_SIZE = 8 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export default function Assets() {
  const { user, loading } = useAuth({ redirectOnUnauthenticated: true, redirectPath: "/assets" });
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState("");
  const [published, setPublished] = useState(false);
  const assetsQuery = trpc.assets.list.useQuery(undefined, { enabled: user?.role === "admin" });
  const uploadMutation = trpc.assets.upload.useMutation({
    onSuccess: async () => {
      setFile(null);
      setLabel("");
      setPublished(false);
      await assetsQuery.refetch();
      toast.success("Asset uploaded to managed storage");
    },
    onError: (error) => toast.error(error.message),
  });

  const isAdmin = user?.role === "admin";
  const uploadReady = useMemo(() => Boolean(file && isAdmin && !uploadMutation.isPending), [file, isAdmin, uploadMutation.isPending]);

  async function upload() {
    if (!file || !uploadReady) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Please choose a JPG, PNG, WEBP or GIF image.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Images must be 8 MB or smaller.");
      return;
    }
    try {
      const dataBase64 = await fileToBase64(file);
      await uploadMutation.mutateAsync({
        fileName: file.name,
        contentType: file.type,
        sizeBytes: file.size,
        label: label.trim() || undefined,
        published,
        dataBase64,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-background px-6 py-20 text-foreground">Loading your asset library…</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background px-6 py-20 text-foreground">
        <div className="mx-auto max-w-xl space-y-5">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">ORKA LOTUS BEACH · STAFF AREA</p>
          <h1 className="font-serif text-5xl">Asset library access is reserved for hotel administrators.</h1>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"><ArrowLeft size={16} /> Return to guest guide</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-7">
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"><ArrowLeft size={15} /> Guest guide</Link>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">ORKA LOTUS BEACH · CONTENT DESK</p>
            <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">Hotel asset library</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">Upload approved resort photography to managed storage. Files are stored separately from the app and can be connected to the guest guide’s content model.</p>
          </div>
          <div className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Admin only · 8 MB max</div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground"><ImagePlus size={18} /></span><h2 className="font-serif text-3xl">Add a visual</h2></div>
            <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 text-center transition hover:border-primary">
              <UploadCloud size={26} className="mb-3 text-primary" />
              <span className="text-sm font-semibold">{file ? file.name : "Choose a resort image"}</span>
              <span className="mt-2 text-xs text-muted-foreground">JPG, PNG, WEBP or GIF · up to 8 MB</span>
              <input className="sr-only" type="file" accept={ACCEPTED_TYPES.join(",")} onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            </label>
            <label className="mt-5 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Editorial label
              <input value={label} onChange={(event) => setLabel(event.target.value)} maxLength={160} placeholder="e.g. Sunrise beach arrival" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm normal-case tracking-normal outline-none ring-offset-background focus:ring-2 focus:ring-ring" />
            </label>
            <label className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"><input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} className="h-4 w-4 accent-primary" /> Publish this approved visual to the guest guide</label>
            <button type="button" onClick={upload} disabled={!uploadReady} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              {uploadMutation.isPending ? <><Loader2 size={16} className="animate-spin" /> Uploading</> : <><UploadCloud size={16} /> Upload to storage</>}
            </button>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-3xl">Stored visuals</h2><span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{assetsQuery.data?.length ?? 0} files</span></div>
            {assetsQuery.isLoading ? <p className="text-sm text-muted-foreground">Loading stored visuals…</p> : assetsQuery.data?.length ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {assetsQuery.data.map((asset) => <figure key={asset.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"><img src={asset.url} alt={asset.label || asset.fileName} className="aspect-[4/3] w-full object-cover" /><figcaption className="space-y-1 p-4"><p className="text-sm font-semibold">{asset.label || asset.fileName}</p><p className="text-xs text-muted-foreground">{asset.contentType} · {(asset.sizeBytes / 1024 / 1024).toFixed(2)} MB</p></figcaption></figure>)}
              </div>
            ) : <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground">No hotel visuals have been uploaded yet.</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
