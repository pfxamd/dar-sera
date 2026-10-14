/** Resolve internal navigation against Astro's deployment base, including fragments and queries. */
export function sitePath(path: string) {
 const base=import.meta.env.BASE_URL.replace(/\/$/,'');
 return `${base}/${path.replace(/^\//,'')}`;
}
