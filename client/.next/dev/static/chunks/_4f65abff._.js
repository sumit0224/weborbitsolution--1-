(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Seo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const upsertMetaTag = (selector, attrs)=>{
    let element = document.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        Object.entries(attrs).forEach(([key, value])=>{
            element.setAttribute(key, value);
        });
        document.head.appendChild(element);
    } else {
        Object.entries(attrs).forEach(([key, value])=>{
            element.setAttribute(key, value);
        });
    }
};
const upsertLinkTag = (rel, href)=>{
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
    }
    element.href = href;
};
const upsertJsonLd = (data)=>{
    const id = 'seo-jsonld';
    const existing = document.getElementById(id);
    if (!data) {
        if (existing) {
            existing.remove();
        }
        return;
    }
    const script = existing || document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    if (!existing) {
        document.head.appendChild(script);
    }
};
const Seo = ({ title, description, path, image, type = 'website', jsonLd })=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Seo.useEffect": ()=>{
            const baseUrl = ("TURBOPACK compile-time value", "https://www.weborbitsolution.in") || window.location.origin;
            const canonicalUrl = `${baseUrl}${path === '/' ? '' : path}`;
            const existingOgImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
            const metaImage = image || ("TURBOPACK compile-time value", "https://www.weborbitsolution.in/logo-v2.png") || existingOgImage;
            document.title = title;
            upsertMetaTag('meta[name="description"]', {
                name: 'description',
                content: description
            });
            upsertMetaTag('meta[name="robots"]', {
                name: 'robots',
                content: 'index, follow'
            });
            upsertMetaTag('meta[property="og:title"]', {
                property: 'og:title',
                content: title
            });
            upsertMetaTag('meta[property="og:description"]', {
                property: 'og:description',
                content: description
            });
            upsertMetaTag('meta[property="og:type"]', {
                property: 'og:type',
                content: type
            });
            upsertMetaTag('meta[property="og:url"]', {
                property: 'og:url',
                content: canonicalUrl
            });
            if ("TURBOPACK compile-time truthy", 1) {
                upsertMetaTag('meta[property="og:image"]', {
                    property: 'og:image',
                    content: metaImage
                });
                upsertMetaTag('meta[name="twitter:image"]', {
                    name: 'twitter:image',
                    content: metaImage
                });
            }
            upsertMetaTag('meta[name="twitter:card"]', {
                name: 'twitter:card',
                content: 'summary_large_image'
            });
            upsertMetaTag('meta[name="twitter:title"]', {
                name: 'twitter:title',
                content: title
            });
            upsertMetaTag('meta[name="twitter:description"]', {
                name: 'twitter:description',
                content: description
            });
            upsertLinkTag('canonical', canonicalUrl);
            upsertJsonLd(jsonLd);
        }
    }["Seo.useEffect"], [
        title,
        description,
        path,
        image,
        type,
        jsonLd
    ]);
    return null;
};
_s(Seo, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Seo;
const __TURBOPACK__default__export__ = Seo;
var _c;
__turbopack_context__.k.register(_c, "Seo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/blog/BlogPost.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const formatDate = (date)=>new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
const BlogPost = ({ post })=>{
    _s();
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const shareUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlogPost.useMemo[shareUrl]": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return window.location.href;
        }
    }["BlogPost.useMemo[shareUrl]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogPost.useEffect": ()=>{
            const handleScroll = {
                "BlogPost.useEffect.handleScroll": ()=>{
                    const article = document.querySelector('[data-blog-article]');
                    if (!article) return;
                    const rect = article.getBoundingClientRect();
                    const total = article.offsetHeight - window.innerHeight;
                    const scrolled = window.scrollY - article.offsetTop;
                    const next = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
                    setProgress(Math.round(next * 100));
                }
            }["BlogPost.useEffect.handleScroll"];
            handleScroll();
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            window.addEventListener('resize', handleScroll);
            return ({
                "BlogPost.useEffect": ()=>{
                    window.removeEventListener('scroll', handleScroll);
                    window.removeEventListener('resize', handleScroll);
                }
            })["BlogPost.useEffect"];
        }
    }["BlogPost.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "bg-white  text-black font-body-alt",
        "data-blog-article": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 h-[3px] bg-primary z-[70] transition-all",
                style: {
                    width: `${progress}%`
                }
            }, void 0, false, {
                fileName: "[project]/components/blog/BlogPost.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "border-b border-black/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "page-container pt-28 pb-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-primary font-mono uppercase tracking-[0.35em] text-xs",
                            children: post.category
                        }, void 0, false, {
                            fileName: "[project]/components/blog/BlogPost.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-4 text-4xl md:text-6xl font-heading leading-tight",
                            children: post.title
                        }, void 0, false, {
                            fileName: "[project]/components/blog/BlogPost.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: post.author
                                }, void 0, false, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                    dateTime: post.date,
                                    children: formatDate(post.date)
                                }, void 0, false, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    children: "•"
                                }, void 0, false, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: post.readTime
                                }, void 0, false, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/blog/BlogPost.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/blog/BlogPost.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/blog/BlogPost.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "page-container py-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: post.featuredImage.src,
                    alt: post.featuredImage.alt,
                    loading: "eager",
                    decoding: "async",
                    width: 1600,
                    height: 900,
                    className: "w-full h-[320px] md:h-[480px] object-cover"
                }, void 0, false, {
                    fileName: "[project]/components/blog/BlogPost.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/blog/BlogPost.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "page-container pb-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl",
                    children: [
                        post.sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl md:text-3xl font-heading mb-4",
                                        children: section.heading
                                    }, void 0, false, {
                                        fileName: "[project]/components/blog/BlogPost.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    section.paragraphs.map((paragraph, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-lg leading-relaxed text-gray-700 mb-4",
                                            children: paragraph
                                        }, index, false, {
                                            fileName: "[project]/components/blog/BlogPost.tsx",
                                            lineNumber: 86,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    section.bullets && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-4 space-y-2 text-gray-700",
                                        children: section.bullets.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-2 h-2 w-2 rounded-full bg-primary",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/blog/BlogPost.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base leading-relaxed",
                                                        children: item
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/blog/BlogPost.tsx",
                                                        lineNumber: 95,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, item, true, {
                                                fileName: "[project]/components/blog/BlogPost.tsx",
                                                lineNumber: 93,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/components/blog/BlogPost.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, section.heading, true, {
                                fileName: "[project]/components/blog/BlogPost.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-black/10 pt-8 mt-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm uppercase tracking-[0.3em] text-gray-500",
                                    children: "Related Links"
                                }, void 0, false, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex flex-wrap gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/services",
                                            className: "text-primary font-semibold hover:underline",
                                            children: "Web Design & Development Services"
                                        }, void 0, false, {
                                            fileName: "[project]/components/blog/BlogPost.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/work",
                                            className: "text-primary font-semibold hover:underline",
                                            children: "Explore Our Portfolio"
                                        }, void 0, false, {
                                            fileName: "[project]/components/blog/BlogPost.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/contact",
                                            className: "text-primary font-semibold hover:underline",
                                            children: "Start a Project"
                                        }, void 0, false, {
                                            fileName: "[project]/components/blog/BlogPost.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/blog/BlogPost.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-10 flex flex-wrap items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm uppercase tracking-[0.3em] text-gray-500",
                                    children: "Share"
                                }, void 0, false, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-colors",
                                            children: "Twitter"
                                        }, void 0, false, {
                                            fileName: "[project]/components/blog/BlogPost.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-colors",
                                            children: "LinkedIn"
                                        }, void 0, false, {
                                            fileName: "[project]/components/blog/BlogPost.tsx",
                                            lineNumber: 129,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.3em] hover:border-primary hover:text-primary transition-colors",
                                            children: "Facebook"
                                        }, void 0, false, {
                                            fileName: "[project]/components/blog/BlogPost.tsx",
                                            lineNumber: 137,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/blog/BlogPost.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/blog/BlogPost.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/blog/BlogPost.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/blog/BlogPost.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/blog/BlogPost.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BlogPost, "t4aMGHIx2IDZ4LfaEw5f3GhaTLk=");
_c = BlogPost;
const __TURBOPACK__default__export__ = BlogPost;
var _c;
__turbopack_context__.k.register(_c, "BlogPost");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/blogPosts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blogPosts",
    ()=>blogPosts
]);
const blogPosts = [
    {
        slug: 'best-seo-digital-marketing-agency-guide',
        title: 'Best SEO and Digital Marketing Agency: A 2026 Selection Guide',
        excerpt: 'How to choose the best SEO and digital marketing agency based on outcomes, proof, and performance — not just promises.',
        date: '2026-02-10',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'SEO',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Marketing team reviewing SEO and performance dashboards'
        },
        sections: [
            {
                heading: 'Start With Outcomes, Not Buzzwords',
                paragraphs: [
                    'The best SEO and digital marketing agency is the one that shows clear outcomes: higher qualified traffic, better conversion rates, and measurable leads.',
                    'If you are comparing a local SEO and marketing agency or a global team, ask how they define success and how they report it.'
                ]
            },
            {
                heading: 'Questions That Reveal Real Capability',
                paragraphs: [
                    'Ask about their technical SEO process, content strategy, and how they handle analytics. This separates real operators from resellers.'
                ],
                bullets: [
                    'How do you structure a site for SEO and content marketing?',
                    'Which Core Web Vitals targets do you commit to?',
                    'How do you prove ROI from SEO and PPC?'
                ]
            },
            {
                heading: 'How to Read Reviews the Right Way',
                paragraphs: [
                    'If you see searches like “ppc ads and seo agency Brampton reviews,” use reviews as a signal, not a decision. Look for case studies and live results.'
                ]
            }
        ],
        metaTitle: 'Best SEO and Digital Marketing Agency Selection Guide',
        metaDescription: 'A practical guide to choosing the best SEO and digital marketing agency using outcomes, proof, and performance benchmarks.'
    },
    {
        slug: 'seo-content-marketing-agency-playbook',
        title: 'SEO and Content Marketing Agency Playbook: Strategy That Compounds',
        excerpt: 'A modern playbook for choosing an SEO and content marketing agency that drives compounding traffic and leads.',
        date: '2026-02-08',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'Content',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Content strategy notes and SEO planning on a desk'
        },
        sections: [
            {
                heading: 'Why SEO + Content Must Be Integrated',
                paragraphs: [
                    'An SEO and content marketing agency should connect keyword research to editorial strategy, not treat them as separate tasks.',
                    'This alignment improves rankings, time on page, and conversions across the entire funnel.'
                ]
            },
            {
                heading: 'What a Strong Editorial System Looks Like',
                paragraphs: [
                    'Look for topic clusters, internal linking plans, and a content cadence tied to business goals.'
                ],
                bullets: [
                    'Pillar pages mapped to buyer intent',
                    'Supporting blogs for long-tail queries',
                    'On-page optimization baked into every draft'
                ]
            },
            {
                heading: 'KPIs That Matter',
                paragraphs: [
                    'Traffic is only one metric. Lead quality, conversion rate, and retention signal real growth.'
                ]
            }
        ],
        metaTitle: 'SEO and Content Marketing Agency Playbook',
        metaDescription: 'Learn how an SEO and content marketing agency builds compounding growth with keyword strategy, editorial systems, and performance metrics.'
    },
    {
        slug: 'affordable-seo-marketing-agency-pricing',
        title: 'Affordable SEO and Marketing Agency: Pricing, Deliverables, Red Flags',
        excerpt: 'What “affordable SEO and marketing agency” really means, and how to avoid cheap packages that hurt rankings.',
        date: '2026-02-06',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'Pricing',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Budget planning for SEO and marketing services'
        },
        sections: [
            {
                heading: 'What Affordable Should Include',
                paragraphs: [
                    'An affordable SEO and marketing agency should still cover technical audits, on-page optimization, and content support.',
                    'If you only get backlinks and reports, it is not a full SEO and marketing agency engagement.'
                ],
                bullets: [
                    'Technical fixes and performance improvements',
                    'Keyword-aligned content updates',
                    'Reporting that ties traffic to leads'
                ]
            },
            {
                heading: 'Starter Packages That Work',
                paragraphs: [
                    'For early-stage teams, a focused package on 1-2 services pages plus a blog series can move rankings without overspending.'
                ]
            },
            {
                heading: 'Red Flags',
                paragraphs: [
                    'Be cautious if the agency guarantees #1 rankings or avoids showing recent results.'
                ]
            }
        ],
        metaTitle: 'Affordable SEO and Marketing Agency Pricing',
        metaDescription: 'Understand what affordable SEO and marketing agency packages should include and how to avoid low-quality services.'
    },
    {
        slug: 'seo-agency-wordpress-themes-roundup',
        title: 'SEO & Digital Marketing Agency WordPress Themes: 2026 Roundup',
        excerpt: 'A quick guide to choosing a SEO and digital marketing agency WordPress theme, including Seoland, Seocify, Ewebot, Score, Digon, and Artistic.',
        date: '2026-02-04',
        readTime: '7 min read',
        author: 'WebOrbit Studio',
        category: 'WordPress',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'WordPress theme layouts for SEO agencies on a screen'
        },
        sections: [
            {
                heading: 'What to Look for in an SEO Agency Theme',
                paragraphs: [
                    'A SEO and digital marketing agency WordPress theme should prioritize speed, clear CTAs, and SEO-ready structure.',
                    'Popular options include Seoland, Seocify, Ewebot, Score, Digon, and Artistic — but the best choice depends on your goals.'
                ],
                bullets: [
                    'Mobile-first layouts with fast loading times',
                    'Flexible case study and service templates',
                    'Built-in schema and clean HTML output'
                ]
            },
            {
                heading: 'WordPress Theme vs HTML Template',
                paragraphs: [
                    'If you see an “artistic digital marketing agency and SEO HTML template,” note that HTML templates need more dev support for updates and SEO tooling.'
                ]
            },
            {
                heading: 'When Custom Beats Templates',
                paragraphs: [
                    'If your agency differentiates on strategy, custom design will convert better than a generic template.'
                ]
            }
        ],
        metaTitle: 'SEO Agency WordPress Themes 2026',
        metaDescription: 'Compare top SEO and digital marketing agency WordPress themes like Seoland, Seocify, Ewebot, Score, Digon, and Artistic.'
    },
    {
        slug: 'avoid-nulled-seo-agency-themes',
        title: 'Avoid Nulled WordPress Themes for SEO Agencies',
        excerpt: 'Nulled themes are risky. Here is why SEO and digital marketing agencies should avoid nulled WordPress themes and choose secure options.',
        date: '2026-02-02',
        readTime: '5 min read',
        author: 'WebOrbit Studio',
        category: 'Security',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Website security warning on a laptop'
        },
        sections: [
            {
                heading: 'Why Nulled Themes Hurt SEO',
                paragraphs: [
                    'Nulled themes often contain hidden scripts, poor updates, and security vulnerabilities that can damage rankings.',
                    'If you search for “SEO and digital marketing agency WordPress theme nulled,” treat it as a warning sign, not a shortcut.'
                ]
            },
            {
                heading: 'Better Alternatives',
                paragraphs: [
                    'Use licensed themes or invest in a custom build. It is safer, faster, and better for long-term growth.'
                ],
                bullets: [
                    'Official theme marketplaces with updates',
                    'Verified performance optimization',
                    'Clean code for better Core Web Vitals'
                ]
            }
        ],
        metaTitle: 'Avoid Nulled SEO Agency WordPress Themes',
        metaDescription: 'Learn why nulled WordPress themes are a bad idea for SEO agencies and what secure alternatives to choose.'
    },
    {
        slug: 'local-seo-marketing-agency-reviews',
        title: 'Local SEO and Marketing Agency: How to Evaluate Reviews, Photos, and Proof',
        excerpt: 'A checklist for hiring a local SEO and marketing agency, including how to interpret reviews and case study photos.',
        date: '2026-01-30',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'Local SEO',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Local marketing team reviewing client case studies'
        },
        sections: [
            {
                heading: 'Reviews Are Context, Not Proof',
                paragraphs: [
                    'A local SEO and marketing agency should show live results, not just testimonials. Reviews help, but case studies prove impact.'
                ]
            },
            {
                heading: 'What to Look for in Case Study Photos',
                paragraphs: [
                    'Photos should explain outcomes — improved UX, better conversions, or faster load times — not just pretty screens.'
                ],
                bullets: [
                    'Before/after performance numbers',
                    'Clear explanation of strategy',
                    'Local intent keywords and maps visibility'
                ]
            },
            {
                heading: 'Decision Checklist',
                paragraphs: [
                    'Choose teams that align business goals, SEO fundamentals, and transparent reporting.'
                ]
            }
        ],
        metaTitle: 'Local SEO and Marketing Agency Reviews Checklist',
        metaDescription: 'How to evaluate a local SEO and marketing agency using reviews, photos, and real performance proof.'
    },
    {
        slug: 'best-website-solutions-small-business-india',
        title: 'Best Website Solutions for Small Business in India (2026 Playbook)',
        excerpt: 'A practical guide to the best website solutions for small business owners in India, from affordable website builders to custom website development for startups.',
        date: '2026-02-11',
        readTime: '7 min read',
        author: 'WebOrbit Studio',
        category: 'Growth',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Small business team reviewing website growth metrics'
        },
        sections: [
            {
                heading: 'What “Best” Actually Means for Small Businesses',
                paragraphs: [
                    'For most founders, the best website solutions for small business are the ones that generate leads fast, explain your offer clearly, and load quickly on mobile.',
                    'That usually means business website solutions that are simple, conversion-focused, and supported by affordable website design services instead of bloated features.'
                ]
            },
            {
                heading: 'Affordable Website Builders vs Custom Builds',
                paragraphs: [
                    'Affordable website builders are great when you need to launch fast with minimal budget, but they often limit SEO, performance, and custom UX.',
                    'Custom website development for startups wins when you need higher conversion, faster load times, or a unique product narrative.'
                ],
                bullets: [
                    'Use builders for MVPs, events, or short-term campaigns.',
                    'Go custom when SEO, speed, or brand differentiation matters.'
                ]
            },
            {
                heading: 'How to Pick a Website Development Company in India',
                paragraphs: [
                    'Shortlist teams that show performance benchmarks, UX case studies, and SEO-ready delivery. Ask for timelines and clear milestones.'
                ],
                bullets: [
                    'Ask for live examples of high-performing websites',
                    'Confirm handoff, hosting support, and maintenance options',
                    'Validate that they offer SEO and analytics setup'
                ]
            }
        ],
        metaTitle: 'Best Website Solutions for Small Business in India',
        metaDescription: 'Compare affordable website builders vs custom builds and learn how to choose a website development company in India for small business growth.'
    },
    {
        slug: 'choose-website-solution-provider',
        title: 'How to Choose a Website Solution Provider: 10-Point Checklist',
        excerpt: 'If you are searching “website solutions near me” or “website solutions UK,” use this checklist to pick the right team and avoid costly rebuilds.',
        date: '2026-02-09',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'Strategy',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Team comparing website solution providers on a screen'
        },
        sections: [
            {
                heading: 'Define the Website Solution You Actually Need',
                paragraphs: [
                    'The best way to answer “how to choose website solution” is to map goals to outcomes: leads, bookings, ecommerce sales, or support.',
                    'If you are comparing corporate website solutions to more agile startup builds, align your scope with audience expectations and budget.'
                ]
            },
            {
                heading: 'Use This 10-Point Checklist',
                paragraphs: [
                    'Whether you are searching for website solutions near me or evaluating website solutions UK providers, the same criteria apply.'
                ],
                bullets: [
                    'Clear process: discovery, design, development, launch',
                    'Live examples with measurable results',
                    'SEO-ready structure and metadata',
                    'Mobile-first UX and accessibility basics',
                    'Performance benchmarks for speed',
                    'Transparent scope and change management',
                    'Hosting, maintenance, and analytics support',
                    'Content and copy guidance',
                    'Pricing tied to outcomes, not just pages',
                    'Post-launch optimization plan'
                ]
            },
            {
                heading: 'Red Flags to Avoid',
                paragraphs: [
                    'Avoid teams that overpromise “innovative website solutions” without showing proof or that skip testing for speed and SEO.'
                ]
            }
        ],
        metaTitle: 'How to Choose a Website Solution Provider',
        metaDescription: 'A 10-point checklist to choose the right website solution provider, whether you need corporate or small business website solutions.'
    },
    {
        slug: 'affordable-website-builders-vs-custom',
        title: 'Affordable Website Builders vs Custom Development: What Wins in 2026?',
        excerpt: 'Affordable website builders are tempting, but custom development often wins on speed, SEO, and conversions. Here is how to decide.',
        date: '2026-02-07',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'Web Development',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Developer comparing website builder templates with custom code'
        },
        sections: [
            {
                heading: 'When Affordable Website Builders Work',
                paragraphs: [
                    'Builders are a solid fit for simple brochure sites, quick promos, or early experiments when time and budget are tight.'
                ],
                bullets: [
                    'Low upfront cost',
                    'Fast launch with templates',
                    'Limited control over speed and SEO'
                ]
            },
            {
                heading: 'When Custom Development Is the Smarter Investment',
                paragraphs: [
                    'Custom builds unlock performance, stronger SEO, and tailored UX. They are ideal for startups seeking long-term growth.',
                    'If you need custom website development for startups, invest in a scalable system instead of a rigid template.'
                ]
            },
            {
                heading: 'Decision Framework',
                paragraphs: [
                    'If your website is a growth engine, custom beats templates. If it is a placeholder, builders are enough.'
                ],
                bullets: [
                    'Choose builders for speed and low risk',
                    'Choose custom for differentiation and conversion',
                    'Pair with affordable website design services for faster ROI'
                ]
            }
        ],
        metaTitle: 'Affordable Website Builders vs Custom Development',
        metaDescription: 'Compare affordable website builders with custom development and learn when each option is right for your business.'
    },
    {
        slug: 'ecommerce-website-development-company-guide',
        title: 'Ecommerce Website Development Company Guide: Payments, Hosting, and Scale',
        excerpt: 'A practical guide to hiring an ecommerce website development company, including website payment solutions, hosting, and performance.',
        date: '2026-02-05',
        readTime: '7 min read',
        author: 'WebOrbit Studio',
        category: 'Ecommerce',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Ecommerce team planning checkout and hosting flow'
        },
        sections: [
            {
                heading: 'Website Payment Solutions That Convert',
                paragraphs: [
                    'Checkout drop-off is a revenue killer. The right website payment solutions reduce friction with local methods, wallets, and clear trust signals.'
                ],
                bullets: [
                    'Offer UPI, cards, wallets, and BNPL when relevant',
                    'Use clean error handling and clear fee messaging',
                    'Optimize checkout for mobile'
                ]
            },
            {
                heading: 'Website Hosting Solutions and Performance',
                paragraphs: [
                    'Choose website hosting solutions that scale during traffic spikes. Your ecommerce website development company should plan for speed and reliability.',
                    'If you sell internationally, pick regions close to customers, including website solutions UK hosting zones when your audience is in the UK.'
                ]
            },
            {
                heading: 'Build a Website Solutions Network',
                paragraphs: [
                    'A real website solutions network includes CDN, caching, security, and monitoring — not just a server.'
                ],
                bullets: [
                    'CDN for global speed',
                    'WAF and SSL for security',
                    'Uptime monitoring and backups'
                ]
            }
        ],
        metaTitle: 'Ecommerce Website Development Company Guide',
        metaDescription: 'Learn how to choose an ecommerce website development company with the right website payment solutions and hosting stack.'
    },
    {
        slug: 'seo-and-website-development-company',
        title: 'SEO and Website Development Company: Why One Team Beats Two',
        excerpt: 'When SEO and development live together, you avoid rework and rank faster. Here is how an integrated team delivers.',
        date: '2026-02-03',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'SEO',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'SEO strategist and developer reviewing website performance'
        },
        sections: [
            {
                heading: 'SEO Must Start Before Design',
                paragraphs: [
                    'Most ranking issues happen at the architecture stage. A true SEO and website development company plans the site map, schema, and internal links early.'
                ]
            },
            {
                heading: 'What Integrated Teams Deliver',
                paragraphs: [
                    'When designers, developers, and SEO strategists work together, you get faster sites, cleaner metadata, and better conversions.'
                ],
                bullets: [
                    'Keyword-aligned page structure',
                    'Optimized Core Web Vitals',
                    'Cleaner tracking and analytics setup'
                ]
            },
            {
                heading: 'Questions to Ask Before You Hire',
                paragraphs: [
                    'Ask if they handle technical SEO, content support, and performance optimization in the same workflow.'
                ]
            }
        ],
        metaTitle: 'SEO and Website Development Company Guide',
        metaDescription: 'Discover why hiring an SEO and website development company leads to faster rankings and fewer rebuilds.'
    },
    {
        slug: 'creative-website-solutions-that-convert',
        title: 'Creative Website Solutions That Convert: A UX Playbook',
        excerpt: 'Innovative website solutions should feel bold and still be simple to use. This playbook blends creative website solutions with performance.',
        date: '2026-02-01',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'Design',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Designer sketching creative website solutions on a tablet'
        },
        sections: [
            {
                heading: 'Innovative Website Solutions That Stay Usable',
                paragraphs: [
                    'Creative website solutions only work when they improve clarity, not when they distract. Start with a strong UX flow.'
                ],
                bullets: [
                    'Clear hierarchy before visual flair',
                    'Fast loading animations',
                    'Accessible contrast and type sizes'
                ]
            },
            {
                heading: 'Corporate Website Solutions Without the Corporate Feel',
                paragraphs: [
                    'Corporate website solutions can still feel human. Use authentic visuals, strong messaging, and proof-driven layouts.'
                ]
            },
            {
                heading: 'Social Proof and Brand Reach',
                paragraphs: [
                    'If you share case studies on social, tie them to your site with consistent language and hashtags like #websitesolutions.'
                ]
            }
        ],
        metaTitle: 'Creative Website Solutions That Convert',
        metaDescription: 'A UX playbook for innovative and creative website solutions that convert without hurting usability.'
    },
    {
        slug: 'web-design-cost-in-india',
        title: 'Web Design Cost in India: A Practical 2026 Guide',
        excerpt: 'A clear breakdown of pricing ranges, what impacts cost, and how to choose the right scope for a high-performance website in India.',
        date: '2026-01-12',
        readTime: '6 min read',
        author: 'WebOrbit Studio',
        category: 'Web Design',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Modern web design workspace with design tools on a desk'
        },
        sections: [
            {
                heading: 'Typical Web Design Cost Ranges',
                paragraphs: [
                    'In India, a professional web design project typically ranges from INR 40,000 to INR 4,00,000+, depending on complexity, content depth, and functionality.',
                    'Single-page or small business websites are generally at the lower end, while multi-page marketing sites, brand systems, and custom UI/UX sit at the higher end.'
                ],
                bullets: [
                    'Starter websites: INR 40,000–90,000',
                    'Growth marketing sites: INR 1,00,000–2,50,000',
                    'Premium brand + performance builds: INR 2,50,000+'
                ]
            },
            {
                heading: 'What Drives the Final Price',
                paragraphs: [
                    'Cost is most affected by discovery, design depth, custom components, and the number of unique page templates.',
                    'If you want motion design, faster load times, or a conversion-focused UX, expect a higher investment.'
                ],
                bullets: [
                    'Information architecture and UX complexity',
                    'Custom illustrations or 3D assets',
                    'SEO-ready content and copy support',
                    'Speed, accessibility, and performance optimization'
                ]
            },
            {
                heading: 'How to Scope Smartly',
                paragraphs: [
                    'Start with a tight page set and a scalable design system. You can expand content once the core experience is validated.',
                    'Focus on conversion-first UX for services like web design, development, branding, and SEO to see ROI faster.'
                ]
            }
        ]
    },
    {
        slug: 'seo-ready-website-checklist',
        title: 'SEO-Ready Website Checklist for Modern Brands',
        excerpt: 'A tactical checklist to make sure your website is crawlable, fast, and built for rankings without sacrificing design quality.',
        date: '2026-01-03',
        readTime: '5 min read',
        author: 'WebOrbit Studio',
        category: 'SEO',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Analytics dashboard showing SEO performance metrics'
        },
        sections: [
            {
                heading: 'Technical Foundations',
                paragraphs: [
                    'Your site must be indexable, fast, and stable. That means clean HTML structure, optimized assets, and correct metadata.'
                ],
                bullets: [
                    'Single H1 per page with a clear primary keyword',
                    'XML sitemap and robots.txt submitted in GSC',
                    'Canonical tags on every indexable page',
                    'WebP images with lazy loading and set dimensions'
                ]
            },
            {
                heading: 'On-Page Signals',
                paragraphs: [
                    'Each page should target a core keyword and support it with related phrases naturally. Avoid stuffing.',
                    'Use internal links to services, portfolio, and contact pages to strengthen topical relevance.'
                ]
            },
            {
                heading: 'Performance and UX',
                paragraphs: [
                    'A fast, readable page is a ranking advantage. Prioritize mobile readability and clean layouts.'
                ],
                bullets: [
                    'Optimize LCP by compressing hero images',
                    'Reduce CLS with fixed image dimensions',
                    'Keep interactions lightweight for strong INP'
                ]
            }
        ]
    },
    {
        slug: 'brand-identity-for-saas',
        title: 'Brand Identity for SaaS: From Strategy to UI',
        excerpt: 'A modern approach to SaaS branding that connects positioning, visual identity, and product UI into one system.',
        date: '2025-12-18',
        readTime: '7 min read',
        author: 'WebOrbit Studio',
        category: 'Branding',
        featuredImage: {
            src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&h=900&fm=webp&q=80',
            alt: 'Team collaborating on brand strategy and design systems'
        },
        sections: [
            {
                heading: 'Start With Positioning',
                paragraphs: [
                    'Great SaaS brands start with a sharp positioning statement. It informs tone, design choices, and the way your product communicates value.'
                ]
            },
            {
                heading: 'Design a Scalable Visual System',
                paragraphs: [
                    'Create a component library that can scale with product updates. Typography, color, and UI patterns should work across marketing and product surfaces.'
                ],
                bullets: [
                    'Define a strong primary accent color and supporting neutrals',
                    'Standardize typography for headings, body, and UI labels',
                    'Document spacing, grid, and motion rules'
                ]
            },
            {
                heading: 'Unify Brand and Product UX',
                paragraphs: [
                    'The best SaaS brands feel consistent from landing page to onboarding. Align microcopy and UI feedback to your brand voice.'
                ]
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/NotFound.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
const NotFound = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-black text-white pt-32 pb-24 flex flex-col items-center text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-primary font-mono uppercase tracking-[0.35em] text-xs",
                children: "404"
            }, void 0, false, {
                fileName: "[project]/pages/NotFound.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "font-body font-black text-6xl md:text-8xl uppercase tracking-tighter mt-4",
                children: "Lost In Orbit"
            }, void 0, false, {
                fileName: "[project]/pages/NotFound.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-400 text-lg md:text-xl max-w-xl mt-6",
                children: "The page you are looking for does not exist. Let’s get you back to the main station."
            }, void 0, false, {
                fileName: "[project]/pages/NotFound.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "mt-8 inline-flex items-center gap-2 border border-white/20 px-6 py-3 uppercase tracking-[0.3em] text-xs hover:border-primary hover:text-primary transition-colors",
                children: "Back to Home"
            }, void 0, false, {
                fileName: "[project]/pages/NotFound.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/pages/NotFound.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = NotFound;
const __TURBOPACK__default__export__ = NotFound;
var _c;
__turbopack_context__.k.register(_c, "NotFound");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/BlogPostPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Seo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Seo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$blog$2f$BlogPost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/blog/BlogPost.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/blogPosts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$NotFound$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/NotFound.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const BlogPostPage = ()=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const slugParam = params?.slug;
    const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const [post, setPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('loading');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogPostPage.useEffect": ()=>{
            const fetchPost = {
                "BlogPostPage.useEffect.fetchPost": async ()=>{
                    if (!slug) return;
                    try {
                        setStatus('loading');
                        const baseUrl = ("TURBOPACK compile-time value", "http://localhost:4000") || '';
                        const response = await fetch(`${baseUrl}/api/blog/posts/${slug}`);
                        const data = await response.json();
                        if (response.ok && data?.post) {
                            setPost(data.post);
                            setStatus('ready');
                            return;
                        }
                        const fallback = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogPosts"].find({
                            "BlogPostPage.useEffect.fetchPost.fallback": (item)=>item.slug === slug
                        }["BlogPostPage.useEffect.fetchPost.fallback"]);
                        if (fallback) {
                            setPost(fallback);
                            setStatus('ready');
                            return;
                        }
                        throw new Error(data?.error || 'Post not found.');
                    } catch (error) {
                        const fallback = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogPosts"].find({
                            "BlogPostPage.useEffect.fetchPost.fallback": (item)=>item.slug === slug
                        }["BlogPostPage.useEffect.fetchPost.fallback"]);
                        if (fallback) {
                            setPost(fallback);
                            setStatus('ready');
                        } else {
                            setStatus('error');
                        }
                    }
                }
            }["BlogPostPage.useEffect.fetchPost"];
            fetchPost();
        }
    }["BlogPostPage.useEffect"], [
        slug
    ]);
    if (status === 'error') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$NotFound$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/pages/BlogPostPage.tsx",
            lineNumber: 54,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (status !== 'ready' || !post) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "bg-white text-black pt-32 pb-20 font-body-alt",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "page-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 uppercase tracking-[0.3em] text-xs",
                        children: "Loading"
                    }, void 0, false, {
                        fileName: "[project]/pages/BlogPostPage.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-4 text-3xl md:text-5xl font-heading",
                        children: "Loading article..."
                    }, void 0, false, {
                        fileName: "[project]/pages/BlogPostPage.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/pages/BlogPostPage.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/pages/BlogPostPage.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const baseUrl = ("TURBOPACK compile-time value", "https://www.weborbitsolution.in") || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : window.location.origin);
    const blogJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        image: [
            post.featuredImage.src
        ],
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Organization',
            name: post.author
        },
        publisher: {
            '@type': 'Organization',
            name: 'WebOrbitSolution',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/favicon.png`
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/blog/${post.slug}`
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Seo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: post.metaTitle ? `${post.metaTitle} | WebOrbitSolution` : `${post.title} | WebOrbitSolution`,
                description: post.metaDescription || post.excerpt,
                path: `/blog/${post.slug}`,
                image: post.featuredImage.src,
                type: "article",
                jsonLd: blogJsonLd
            }, void 0, false, {
                fileName: "[project]/pages/BlogPostPage.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$blog$2f$BlogPost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                post: post
            }, void 0, false, {
                fileName: "[project]/pages/BlogPostPage.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(BlogPostPage, "hPLUsGDqLfsXiCsB8wRvCnKNxxg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = BlogPostPage;
const __TURBOPACK__default__export__ = BlogPostPage;
var _c;
__turbopack_context__.k.register(_c, "BlogPostPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_4f65abff._.js.map