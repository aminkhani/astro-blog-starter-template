// Rough reading-time estimate. Strips Markdown syntax, then assumes
// an average adult reading speed of ~200 words per minute.
export function getReadingTime(body: string): string {
	const plain = body
		.replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
		.replace(/`[^`]*`/g, ' ') // inline code
		.replace(/!\[.*?\]\(.*?\)/g, ' ') // images
		.replace(/\[(.*?)\]\(.*?\)/g, '$1') // links -> link text
		.replace(/[#>*_~-]/g, ' '); // markdown punctuation

	const words = plain.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.round(words / 200));
	return `${minutes} min read`;
}
