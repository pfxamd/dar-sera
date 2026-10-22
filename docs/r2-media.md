# DAR SERA media library

Production media lives under `https://media.pfxamd.com/pfxamd/concepts/dar-sera/`:

- `originals/`: 28 byte-identical supplied WebP files.
- `responsive/`: 168 variants from the existing Astro picture pipeline (AVIF/WebP at the existing sizes).
- `favicon.svg`: original favicon.

`r2-media-manifest.json` maps generated paths to R2 keys, sizes and SHA-256. `r2-media-verification.json` records successful public HTTPS downloads and exact hash/size comparisons for all 197 objects before switching links.

The build retains the existing Photo component and responsive picture attributes, then rewrites only media URLs in generated HTML and removes those generated media copies from `dist`. Source images, screenshots and documentation stay in GitHub and are not part of the Pages artifact. Fonts, CSS and JavaScript remain part of the application deployment.

When images change, upload and verify the new originals and variants and update both manifests before publishing. The publication step rejects changed originals, missing expected outputs, unverified records and unknown image outputs. Never reuse an immutable R2 filename for different bytes. No Cloudflare credentials are needed by the build or stored in GitHub.

Deploy through the existing push-to-main Pages workflow. Do not manually dispatch Actions for this migration.
