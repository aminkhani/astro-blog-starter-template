// Add your own projects here — each one renders as a card in the
// "Selected work" section on the home page.
export interface Project {
	name: string;
	description: string;
	tags: string[];
	url: string;
	status?: string;
}

export const PROJECTS: Project[] = [
	{
		name: 'SECAP',
		description:
			'Open-source, cross-platform system hardening framework that automates security audits and baseline enforcement on Windows and Linux, aligned with CIS Benchmarks and DISA STIG.',
		tags: ['Python', 'Security', 'CIS/STIG'],
		url: 'https://github.com/aminkhani/secap',
		status: 'Active',
	},
	{
		name: 'This Blog',
		description:
			'Personal site and writing on Django backend development, security engineering, and DevSecOps — built with Astro and deployed on Cloudflare Workers.',
		tags: ['Astro', 'Cloudflare Workers'],
		url: 'https://github.com/aminkhani/astro-blog-starter-template',
		status: 'Active',
	},
];
