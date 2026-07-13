const releaseRoot = "https://github.com/taenggeu/taenggeu-releases/releases"
const latestMetadataUrl = `${releaseRoot}/latest/download/latest.json`

export const onRequestGet = async () => {
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

  const downloadRoot = `${releaseRoot}/latest/download`
  const macos = `${downloadRoot}/Taenggeu_${version}_universal.dmg`
  const windows = `${downloadRoot}/Taenggeu_${version}_x64-setup.exe`

  return Response.json(
    { version, downloads: { macos, windows } },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } },
  )
}
