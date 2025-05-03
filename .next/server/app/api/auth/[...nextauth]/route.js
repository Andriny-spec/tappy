/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_bbsso_OneDrive_rea_de_Trabalho_Tappy_Tappy_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\bbsso\\\\OneDrive\\\\Área de Trabalho\\\\Tappy\\\\Tappy\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_bbsso_OneDrive_rea_de_Trabalho_Tappy_Tappy_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNiYnNzbyU1Q09uZURyaXZlJTVDJUMzJTgxcmVhJTIwZGUlMjBUcmFiYWxobyU1Q1RhcHB5JTVDVGFwcHklNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2Jic3NvJTVDT25lRHJpdmUlNUMlQzMlODFyZWElMjBkZSUyMFRyYWJhbGhvJTVDVGFwcHklNUNUYXBweSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDd0Q7QUFDckk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGJic3NvXFxcXE9uZURyaXZlXFxcXMOBcmVhIGRlIFRyYWJhbGhvXFxcXFRhcHB5XFxcXFRhcHB5XFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxiYnNzb1xcXFxPbmVEcml2ZVxcXFzDgXJlYSBkZSBUcmFiYWxob1xcXFxUYXBweVxcXFxUYXBweVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credenciais\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Senha\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log('Tentativa de login para email:', credentials?.email);\n                if (!credentials?.email || !credentials?.password) {\n                    console.log('Credenciais incompletas');\n                    return null;\n                }\n                // Primeiro, tente encontrar no modelo Admin\n                const admin = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.admin.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                console.log('Admin encontrado:', admin ? 'Sim' : 'Não');\n                if (admin) {\n                    console.log('Verificando senha para admin:', admin.email);\n                    console.log('Senha fornecida (primeiros 3 caracteres):', credentials.password.substring(0, 3) + '...');\n                    console.log('Hash armazenado (primeiros 20 caracteres):', admin.password.substring(0, 20) + '...');\n                    try {\n                        const passwordMatch = await bcrypt__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, admin.password);\n                        console.log('Senha corresponde:', passwordMatch ? 'Sim' : 'Não');\n                        if (passwordMatch) {\n                            console.log('Login como admin bem-sucedido');\n                            return {\n                                id: admin.id,\n                                name: admin.name,\n                                email: admin.email,\n                                isAdmin: true,\n                                rules: admin.rules\n                            };\n                        } else {\n                            console.log('Senha incorreta para admin');\n                        }\n                    } catch (error) {\n                        console.error('Erro ao comparar senhas:', error);\n                        return null;\n                    }\n                }\n                // Se não encontrar no Admin, busque no User normal (para compatibilidade)\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                console.log('Usuário regular encontrado:', user ? 'Sim' : 'Não');\n                if (!user) {\n                    console.log('Nenhum usuário encontrado com este email');\n                    return null;\n                }\n                // Usuário normal não terá senha no modelo padrão NextAuth, \n                // então aqui você precisaria implementar sua própria lógica se desejar\n                console.log('Autenticação de usuário regular não implementada');\n                return null;\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    jwt: {\n        maxAge: 30 * 24 * 60 * 60\n    },\n    cookies: {\n        sessionToken: {\n            name: `next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\",\n                maxAge: 30 * 24 * 60 * 60 // 30 dias em segundos\n            }\n        },\n        callbackUrl: {\n            name: `next-auth.callback-url`,\n            options: {\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\",\n                maxAge: 30 * 24 * 60 * 60\n            }\n        },\n        csrfToken: {\n            name: \"next-auth.csrf-token\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.isAdmin = user.isAdmin || false;\n                token.rules = user.rules || [];\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.isAdmin = token.isAdmin;\n                session.user.rules = token.rules;\n            }\n            return session;\n        },\n        async redirect ({ url, baseUrl }) {\n            // Redireciona para dashboard após o login\n            if (url.startsWith(\"/api/auth\") || url === \"/login\" || url === baseUrl) {\n                return `${baseUrl}/dashboard`;\n            }\n            // Se a URL já for uma URL válida, retorne-a\n            if (url.startsWith(\"http\")) {\n                return url;\n            }\n            // Caso contrário, garanta uma URL absoluta válida\n            return `${baseUrl}${url.startsWith(\"/\") ? url : `/${url}`}`;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    debug: \"development\" === \"development\",\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = (0,next_auth_next__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ3FEO0FBQ2E7QUFDNUI7QUFDVjtBQUNVO0FBRS9CLE1BQU1LLGNBQStCO0lBQzFDQyxTQUFTTixtRUFBYUEsQ0FBQ0UsK0NBQU1BO0lBQzdCSyxXQUFXO1FBQ1ROLDJFQUFtQkEsQ0FBQztZQUNsQk8sTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBU0MsTUFBTTtnQkFBVztZQUMvQztZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCTSxRQUFRQyxHQUFHLENBQUMsa0NBQWtDUCxhQUFhQztnQkFFM0QsSUFBSSxDQUFDRCxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pERSxRQUFRQyxHQUFHLENBQUM7b0JBQ1osT0FBTztnQkFDVDtnQkFFQSw0Q0FBNEM7Z0JBQzVDLE1BQU1DLFFBQVEsTUFBTWYsK0NBQU1BLENBQUNlLEtBQUssQ0FBQ0MsVUFBVSxDQUFDO29CQUMxQ0MsT0FBTzt3QkFDTFQsT0FBT0QsWUFBWUMsS0FBSztvQkFDMUI7Z0JBQ0Y7Z0JBRUFLLFFBQVFDLEdBQUcsQ0FBQyxxQkFBcUJDLFFBQVEsUUFBUTtnQkFFakQsSUFBSUEsT0FBTztvQkFDVEYsUUFBUUMsR0FBRyxDQUFDLGlDQUFpQ0MsTUFBTVAsS0FBSztvQkFDeERLLFFBQVFDLEdBQUcsQ0FBQyw2Q0FBNkNQLFlBQVlJLFFBQVEsQ0FBQ08sU0FBUyxDQUFDLEdBQUcsS0FBSztvQkFDaEdMLFFBQVFDLEdBQUcsQ0FBQyw4Q0FBOENDLE1BQU1KLFFBQVEsQ0FBQ08sU0FBUyxDQUFDLEdBQUcsTUFBTTtvQkFFNUYsSUFBSTt3QkFDRixNQUFNQyxnQkFBZ0IsTUFBTWxCLHFEQUFjLENBQUNNLFlBQVlJLFFBQVEsRUFBRUksTUFBTUosUUFB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QyxTQUFTO2dCQUMxQixPQUFPRjtZQUNUO1lBQ0Esa0RBQWtEO1lBQ2xELE9BQU8sR0FBR0MsVUFBVUQsSUFBSUUsVUFBVSxDQUFDLE9BQU9GLE1BQU0sQ0FBQyxDQUFDLEVBQUVBLEtBQUssRUFBRTtRQUM3RDtJQUNGO0lBQ0FHLE9BQU87UUFDTEMsUUFBUTtRQUNSdkIsT0FBTztJQUNUO0lBQ0F3QixPQUFPWCxrQkFBeUI7SUFDaENZLFFBQVFaLFFBQVFhLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFFO0FBRUYsTUFBTUMsVUFBVWxELDBEQUFRQSxDQUFDQztBQUVrQiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxiYnNzb1xcT25lRHJpdmVcXMOBcmVhIGRlIFRyYWJhbGhvXFxUYXBweVxcVGFwcHlcXHNyY1xcYXBwXFxhcGlcXGF1dGhcXFsuLi5uZXh0YXV0aF1cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IFByaXNtYUFkYXB0ZXIgfSBmcm9tIFwiQGF1dGgvcHJpc21hLWFkYXB0ZXJcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRcIjtcbmltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoL25leHRcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSBhcyBhbnksXG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJDcmVkZW5jaWFpc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlNlbmhhXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUZW50YXRpdmEgZGUgbG9naW4gcGFyYSBlbWFpbDonLCBjcmVkZW50aWFscz8uZW1haWwpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVkZW5jaWFpcyBpbmNvbXBsZXRhcycpO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJpbWVpcm8sIHRlbnRlIGVuY29udHJhciBubyBtb2RlbG8gQWRtaW5cbiAgICAgICAgY29uc3QgYWRtaW4gPSBhd2FpdCBwcmlzbWEuYWRtaW4uZmluZFVuaXF1ZSh7XG4gICAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZygnQWRtaW4gZW5jb250cmFkbzonLCBhZG1pbiA/ICdTaW0nIDogJ07Do28nKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChhZG1pbikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdWZXJpZmljYW5kbyBzZW5oYSBwYXJhIGFkbWluOicsIGFkbWluLmVtYWlsKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnU2VuaGEgZm9ybmVjaWRhIChwcmltZWlyb3MgMyBjYXJhY3RlcmVzKTonLCBjcmVkZW50aWFscy5wYXNzd29yZC5zdWJzdHJpbmcoMCwgMykgKyAnLi4uJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0hhc2ggYXJtYXplbmFkbyAocHJpbWVpcm9zIDIwIGNhcmFjdGVyZXMpOicsIGFkbWluLnBhc3N3b3JkLnN1YnN0cmluZygwLCAyMCkgKyAnLi4uJyk7XG4gICAgICAgICAgXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgYWRtaW4ucGFzc3dvcmQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlbmhhIGNvcnJlc3BvbmRlOicsIHBhc3N3b3JkTWF0Y2ggPyAnU2ltJyA6ICdOw6NvJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwYXNzd29yZE1hdGNoKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbiBjb21vIGFkbWluIGJlbS1zdWNlZGlkbycpO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBhZG1pbi5pZCxcbiAgICAgICAgICAgICAgICBuYW1lOiBhZG1pbi5uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBhZG1pbi5lbWFpbCxcbiAgICAgICAgICAgICAgICBpc0FkbWluOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBhZG1pbi5ydWxlcyxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZW5oYSBpbmNvcnJldGEgcGFyYSBhZG1pbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIGNvbXBhcmFyIHNlbmhhczonLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZSBuw6NvIGVuY29udHJhciBubyBBZG1pbiwgYnVzcXVlIG5vIFVzZXIgbm9ybWFsIChwYXJhIGNvbXBhdGliaWxpZGFkZSlcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ1VzdcOhcmlvIHJlZ3VsYXIgZW5jb250cmFkbzonLCB1c2VyID8gJ1NpbScgOiAnTsOjbycpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ05lbmh1bSB1c3XDoXJpbyBlbmNvbnRyYWRvIGNvbSBlc3RlIGVtYWlsJyk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVc3XDoXJpbyBub3JtYWwgbsOjbyB0ZXLDoSBzZW5oYSBubyBtb2RlbG8gcGFkcsOjbyBOZXh0QXV0aCwgXG4gICAgICAgIC8vIGVudMOjbyBhcXVpIHZvY8OqIHByZWNpc2FyaWEgaW1wbGVtZW50YXIgc3VhIHByw7NwcmlhIGzDs2dpY2Egc2UgZGVzZWphclxuICAgICAgICBjb25zb2xlLmxvZygnQXV0ZW50aWNhw6fDo28gZGUgdXN1w6FyaW8gcmVndWxhciBuw6NvIGltcGxlbWVudGFkYScpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogXCJqd3RcIixcbiAgICBtYXhBZ2U6IDMwICogMjQgKiA2MCAqIDYwLCAvLyAzMCBkaWFzIGVtIHNlZ3VuZG9zXG4gIH0sXG4gIGp3dDoge1xuICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAsIC8vIDMwIGRpYXMgZW0gc2VndW5kb3NcbiAgfSxcbiAgY29va2llczoge1xuICAgIHNlc3Npb25Ub2tlbjoge1xuICAgICAgbmFtZTogYG5leHQtYXV0aC5zZXNzaW9uLXRva2VuYCxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICAgIG1heEFnZTogMzAgKiAyNCAqIDYwICogNjAgLy8gMzAgZGlhcyBlbSBzZWd1bmRvc1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FsbGJhY2tVcmw6IHtcbiAgICAgIG5hbWU6IGBuZXh0LWF1dGguY2FsbGJhY2stdXJsYCxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgc2FtZVNpdGU6IFwibGF4XCIsXG4gICAgICAgIHBhdGg6IFwiL1wiLFxuICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgICAgICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MFxuICAgICAgfVxuICAgIH0sXG4gICAgY3NyZlRva2VuOiB7XG4gICAgICBuYW1lOiBcIm5leHQtYXV0aC5jc3JmLXRva2VuXCIsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzYW1lU2l0ZTogXCJsYXhcIixcbiAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICAgIHRva2VuLmlzQWRtaW4gPSAodXNlciBhcyBhbnkpLmlzQWRtaW4gfHwgZmFsc2U7XG4gICAgICAgIHRva2VuLnJ1bGVzID0gKHVzZXIgYXMgYW55KS5ydWxlcyB8fCBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5pZCA9IHRva2VuLmlkIGFzIHN0cmluZztcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlzQWRtaW4gPSB0b2tlbi5pc0FkbWluIGFzIGJvb2xlYW47XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5ydWxlcyA9IHRva2VuLnJ1bGVzIGFzIHN0cmluZ1tdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgICBhc3luYyByZWRpcmVjdCh7IHVybCwgYmFzZVVybCB9KSB7XG4gICAgICAvLyBSZWRpcmVjaW9uYSBwYXJhIGRhc2hib2FyZCBhcMOzcyBvIGxvZ2luXG4gICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoXCIvYXBpL2F1dGhcIikgfHwgdXJsID09PSBcIi9sb2dpblwiIHx8IHVybCA9PT0gYmFzZVVybCkge1xuICAgICAgICByZXR1cm4gYCR7YmFzZVVybH0vZGFzaGJvYXJkYDtcbiAgICAgIH1cbiAgICAgIC8vIFNlIGEgVVJMIGrDoSBmb3IgdW1hIFVSTCB2w6FsaWRhLCByZXRvcm5lLWFcbiAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cbiAgICAgIC8vIENhc28gY29udHLDoXJpbywgZ2FyYW50YSB1bWEgVVJMIGFic29sdXRhIHbDoWxpZGFcbiAgICAgIHJldHVybiBgJHtiYXNlVXJsfSR7dXJsLnN0YXJ0c1dpdGgoXCIvXCIpID8gdXJsIDogYC8ke3VybH1gfWA7XG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL2xvZ2luXCIsXG4gICAgZXJyb3I6IFwiL2xvZ2luXCIsXG4gIH0sXG4gIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiLFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn07XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFBZGFwdGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsInByaXNtYSIsImJjcnlwdCIsIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsImNvbnNvbGUiLCJsb2ciLCJhZG1pbiIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInN1YnN0cmluZyIsInBhc3N3b3JkTWF0Y2giLCJjb21wYXJlIiwiaWQiLCJpc0FkbWluIiwicnVsZXMiLCJlcnJvciIsInVzZXIiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJqd3QiLCJjb29raWVzIiwic2Vzc2lvblRva2VuIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwicHJvY2VzcyIsImNhbGxiYWNrVXJsIiwiY3NyZlRva2VuIiwiY2FsbGJhY2tzIiwidG9rZW4iLCJyZWRpcmVjdCIsInVybCIsImJhc2VVcmwiLCJzdGFydHNXaXRoIiwicGFnZXMiLCJzaWduSW4iLCJkZWJ1ZyIsInNlY3JldCIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst prisma = globalThis.prisma ?? prismaClientSingleton();\nif (true) globalThis.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsd0JBQXdCO0lBQzVCLE9BQU8sSUFBSUQsd0RBQVlBO0FBQ3pCO0FBTU8sTUFBTUUsU0FBU0MsV0FBV0QsTUFBTSxJQUFJRCx3QkFBd0I7QUFFbkUsSUFBSUcsSUFBcUMsRUFBRUQsV0FBV0QsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxiYnNzb1xcT25lRHJpdmVcXMOBcmVhIGRlIFRyYWJhbGhvXFxUYXBweVxcVGFwcHlcXHNyY1xcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBwcmlzbWFDbGllbnRTaW5nbGV0b24gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJpc21hQ2xpZW50KCk7XG59O1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBwcmlzbWE6IHVuZGVmaW5lZCB8IFJldHVyblR5cGU8dHlwZW9mIHByaXNtYUNsaWVudFNpbmdsZXRvbj47XG59XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxUaGlzLnByaXNtYSA/PyBwcmlzbWFDbGllbnRTaW5nbGV0b24oKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbFRoaXMucHJpc21hID0gcHJpc21hO1xuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYUNsaWVudFNpbmdsZXRvbiIsInByaXNtYSIsImdsb2JhbFRoaXMiLCJwcm9jZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "@prisma/client/runtime/library":
/*!*************************************************!*\
  !*** external "@prisma/client/runtime/library" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client/runtime/library");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/oidc-token-hash","vendor-chunks/@auth","vendor-chunks/lru-cache","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cbbsso%5COneDrive%5C%C3%81rea%20de%20Trabalho%5CTappy%5CTappy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();