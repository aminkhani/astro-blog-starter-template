import { ui, defaultLang } from "./ui";

export type Lang = keyof typeof ui;

const locales = Object.keys(ui) as Lang[];

/** Detect the active locale from a URL's pathname (e.g. /fa/about -> "fa"). */
export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split("/");
	if ((locales as string[]).includes(maybeLang)) {
		return maybeLang as Lang;
	}
	return defaultLang;
}

/** Get a `t(key)` translator bound to a given locale, falling back to the default. */
export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Strip a locale prefix off a pathname, always returning a path starting with "/". */
export function stripLocale(pathname: string): string {
	const currentLang = locales.find(
		(l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
	);
	if (!currentLang) return pathname;
	const rest = pathname.slice(`/${currentLang}`.length);
	return rest === "" ? "/" : rest;
}

/**
 * Build the equivalent URL path in another locale, preserving the current page.
 * e.g. getLangSwitchPath(new URL("https://x/fa/about"), "en") -> "/about"
 */
export function getLangSwitchPath(url: URL, lang: Lang): string {
	const rest = stripLocale(url.pathname);
	if (lang === defaultLang) return rest;
	return rest === "/" ? `/${lang}` : `/${lang}${rest}`;
}

/** Prefix a root-relative path with the given locale (default locale gets no prefix). */
export function localizePath(lang: Lang, path: string): string {
	const clean = path.startsWith("/") ? path : `/${path}`;
	if (lang === defaultLang) return clean;
	return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}
