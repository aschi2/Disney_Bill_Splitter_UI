

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.bf961af2.js","_app/immutable/chunks/index.5601f6d6.js"];
export const stylesheets = ["_app/immutable/assets/0.2566cb63.css"];
export const fonts = [];
