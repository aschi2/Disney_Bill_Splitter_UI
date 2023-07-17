

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1ee7f627.js","_app/immutable/chunks/index.5601f6d6.js","_app/immutable/chunks/singletons.af2ed20c.js","_app/immutable/chunks/index.02ff5f97.js"];
export const stylesheets = [];
export const fonts = [];
