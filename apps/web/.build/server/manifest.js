const manifest = (() => {
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
		client: {"start":"_app/immutable/entry/start.Z3gvx7X5.js","app":"_app/immutable/entry/app.Cr2SXwqJ.js","imports":["_app/immutable/entry/start.Z3gvx7X5.js","_app/immutable/chunks/entry.Be9f5GS3.js","_app/immutable/chunks/scheduler.DBjExAm9.js","_app/immutable/chunks/index.DKMf2fyR.js","_app/immutable/entry/app.Cr2SXwqJ.js","_app/immutable/chunks/scheduler.DBjExAm9.js","_app/immutable/chunks/index.BsTAEUn8.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-Dl_A28_K.js')),
			__memo(() => import('./chunks/1-CpFEk1wP.js')),
			__memo(() => import('./chunks/2-DvRYO26L.js'))
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
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
