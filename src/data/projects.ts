// Add your own projects here — each one renders as a card in the
// "Selected work" section on the home page and on the /projects page.
export interface Project {
	name: string;
	description: string;
	tags: string[];
	url: string;
	status?: string;
	language?: string;
	icon: 'shield' | 'blog' | 'bot' | 'helm' | 'brain' | 'recipe';
	from: string;
	to: string;
	featured?: boolean;
}

export const PROJECTS: Project[] = [
	{
		name: 'SECAP',
		description:
			'Security Compliance & Audit Platform — open-source, cross-platform system hardening framework that automates OpenSCAP/Nessus audits and guided remediation for Linux & Windows fleets, aligned with CIS Benchmarks and DISA STIG.',
		tags: ['Python', 'Django', 'Docker', 'Celery'],
		url: 'https://github.com/aminkhani/secap',
		status: 'Active',
		language: 'Shell',
		icon: 'shield',
		from: '#1e4fd8',
		to: '#0c8f8d',
		featured: true,
	},
	{
		name: 'Resume Blog',
		description:
			'Personal site and writing on Django backend development, security engineering, and DevSecOps — built with Astro and deployed on Cloudflare Workers.',
		tags: ['Astro', 'Cloudflare Workers'],
		url: 'https://github.com/aminkhani/astro-blog-starter-template',
		status: 'Active',
		language: 'Astro',
		icon: 'blog',
		from: '#7c3aed',
		to: '#1e4fd8',
		featured: true,
	},
	{
		name: 'Caloriban',
		description:
			"A Persian-language Telegram bot that collects a user's stats \u2014 name, weight, height, age, activity level \u2014 then calculates daily calorie needs (BMR + TDEE) and generates a personalized diet plan.",
		tags: ['TypeScript', 'Telegram Bot', 'Cloudflare AI'],
		url: 'https://github.com/aminkhani/caloriban',
		status: 'Active',
		language: 'TypeScript',
		icon: 'bot',
		from: '#0c8f8d',
		to: '#22c55e',
		featured: true,
	},
	{
		name: 'Recipe App API',
		description:
			'A recipe management REST API built with Django REST Framework \u2014 user auth, recipe CRUD, tags, ingredients, and image uploads, developed test-first.',
		tags: ['Python', 'Django REST Framework', 'Docker'],
		url: 'https://github.com/aminkhani/recipe-app-api',
		language: 'Python',
		icon: 'recipe',
		from: '#e08b2f',
		to: '#c4382f',
	},
	{
		name: 'Kubernetes Notes',
		description:
			'Class notes and hands-on exercises from a Kubernetes course \u2014 deployments, services, ingress, and cluster operations, documented as a learning reference.',
		tags: ['Kubernetes', 'DevOps', 'Notes'],
		url: 'https://github.com/aminkhani/kubernetes',
		language: 'Shell',
		icon: 'helm',
		from: '#1e4fd8',
		to: '#5b8def',
	},
	{
		name: 'Deep-RL',
		description:
			'Reference implementations of reinforcement learning algorithms and environments, alongside a curated list of books, papers, and courses for the field.',
		tags: ['Python', 'TensorFlow', 'OpenAI Gym'],
		url: 'https://github.com/aminkhani/Deep-RL',
		language: 'Jupyter Notebook',
		icon: 'brain',
		from: '#7c3aed',
		to: '#c4382f',
	},
];
