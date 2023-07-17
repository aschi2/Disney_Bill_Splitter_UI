export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.bc5dfc40.js","app":"_app/immutable/entry/app.01075baa.js","imports":["_app/immutable/entry/start.bc5dfc40.js","_app/immutable/chunks/index.5601f6d6.js","_app/immutable/chunks/singletons.af2ed20c.js","_app/immutable/chunks/index.02ff5f97.js","_app/immutable/entry/app.01075baa.js","_app/immutable/chunks/index.5601f6d6.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

export const prerendered = new Set([]);
