export const languages = {
	en: "English",
	fa: "فارسی",
} as const;

export const defaultLang = "en" as const;

export const ui = {
	en: {
		"nav.home": "Home",
		"nav.blog": "Blog",
		"nav.projects": "Projects",
		"nav.about": "About",
		"footer.built": "Built with Astro on Cloudflare Workers",
		"project.viewGithub": "View on GitHub →",
		"blog.notTranslated":
			"This post isn't translated into Persian yet — showing the English version.",
	},
	fa: {
		"nav.home": "خانه",
		"nav.blog": "وبلاگ",
		"nav.projects": "پروژه‌ها",
		"nav.about": "درباره من",
		"footer.built": "ساخته‌شده با Astro روی Cloudflare Workers",
		"project.viewGithub": "مشاهده در گیت‌هاب ←",
		"blog.notTranslated":
			"این نوشته هنوز به فارسی ترجمه نشده — نسخه انگلیسی نمایش داده می‌شود.",
	},
} as const;
