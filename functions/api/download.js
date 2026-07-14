const releaseRoot = "https://github.com/taenggeu/taenggeu-releases/releases"
const latestMetadataUrl = `${releaseRoot}/latest/download/latest.json`

export const onRequestGet = async ({ request }) => {
  const platform = new URL(request.url).searchParams.get("platform")
  if (platform !== "macos" && platform !== "windows") {
    return Response.json({ error: "Unsupported platform" }, { status: 400 })
  }

  const metadataResponse = await fetch(latestMetadataUrl, {
    headers: { Accept: "application/json" },
  })

  if (!metadataResponse.ok) {
    return Response.json({ error: "Latest release metadata is unavailable" }, { status: 502 })
  }

  const metadata = await metadataResponse.json()
  const version = String(metadata.version ?? "")
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    return Response.json({ error: "Latest release metadata is invalid" }, { status: 502 })
  }

  const filename = platform === "windows"
    ? `Taenggeu_${version}_x64-setup.exe`
    : `Taenggeu_${version}_universal.dmg`

  return new Response(null, {
    status: 302,
    headers: {
      "Cache-Control": "no-store",
      Location: `${releaseRoot}/latest/download/${filename}`,
    },
  })
}
