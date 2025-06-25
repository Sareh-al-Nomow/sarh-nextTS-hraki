export async function getSettings(locale: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings?lang?${locale}`,
    { next: { revalidate: 60 * 60 * 24 } }
  );

  if (!res.ok) return null;

  return res.json();
}
