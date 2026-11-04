# Carol website — SEO and launch notes

## Implemented

- **20 public static HTML pages:** home, courses, six individual courses, about and contact, each in English and Arabic. French and Turkish were added; Spanish remains included.
- **Flat structure:** descriptive .html URLs, relative links and local assets support GitHub Pages user sites, repository subpaths and custom domains. No client-rendered router or backend.
- **Readable content:** unique titles, descriptions, clear headings, course introductions, goals, FAQs and local contact information. No hidden keyword blocks or invented commercial claims.
- **Bilingual pages:** explicit language/direction and switches to the matching English/Arabic page. Core course content works without JavaScript.
- **Internal discovery:** ordinary navigation, course cards, directories, related courses, breadcrumbs and footer links.
- **Structured data:** the educational organization/local business, address, coordinates, supplied phone numbers, Maps and Instagram. Each course has Course data and its taught language. With the final URL configured, the home/directory pages include a six-course ItemList and URL-based breadcrumbs.
- **Brand assets:** the uploaded wordmark, matching icons and a local 1200 × 630 JPEG sharing image, with Open Graph/Twitter image URLs generated during final-URL setup.
- **Performance/access:** system fonts, small local scripts, optimized assets, explicit image dimensions, lazy map loading, visible focus, skip links, semantic controls and reduced-motion styles.
- **Course enquiries:** links carry the chosen course into the WhatsApp draft composer. The visitor sends the draft in WhatsApp.
- **Maintainability:** the course data also drives language lists and the manifest description, avoiding outdated four-language text.

## Set the final public URL

No GitHub username/repository URL or domain was supplied. No address has been guessed. The initial package therefore omits URL-dependent canonical/hreflang/sharing-image fields and contains an intentionally empty sitemap.

Open `site-settings.html` locally, choose the extracted folder, enter the full HTTPS website base URL, download the updated ZIP, then publish those files. Include the repository path for a GitHub project site. This writes the following into the static files:

1. A self-canonical for each public page. English home uses the base folder URL; Arabic home uses `index-ar.html`.
2. Reciprocal `en`, `ar` and `x-default` alternates for each matching page pair.
3. Absolute page, organization, website, course, breadcrumb and sharing-image URLs.
4. All 20 public URLs with their language alternates in the XML sitemap. The 404 and owner tool are excluded.
5. A robots sitemap reference and updated factual `llms.txt` directory.

The same tool updates these fields after a domain change. GitHub settings and DNS are configured separately. A robots.txt under a project subpath is not the origin-root robots.txt; submit the full sitemap URL through Search Console and check origin-level restrictions separately.

## Validation

The finished package is checked for JavaScript syntax, internal file/fragment targets, single H1 headings, unique metadata, bilingual page pairs and valid JSON-LD. The offline export is exercised using an isolated GitHub-style repository URL to verify canonical paths, reciprocal alternates, 20 sitemap entries, sharing images and a valid flat ZIP. Browser checks cover desktop branding, mobile navigation, narrow English/Arabic layouts and course enquiry selection.

Temporary preview/test pages are excluded from the download. The actual GitHub deployment and third-party destinations need a live check after publishing. This is not a Lighthouse score or a promise of indexing.

## After publishing

1. Open the live homepage, courses, images and sitemap over HTTPS.
2. Confirm both phone numbers, WhatsApp, Maps pin and Instagram with the owner.
3. Verify the website in Google Search Console, submit the sitemap and inspect representative English/Arabic pages.
4. Add the live URL to the correct Google Business Profile and Instagram.
5. Keep the business identity and courses consistent across profiles. Add hours, fees, schedules, credentials or exam services only when supplied by the owner.

`llms.txt` is an optional factual directory, not a Google requirement or a special ranking mechanism. Structured data describes the real content; rich results, rankings and AI recommendations are not guaranteed.

## Official references

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Localized pages and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Building and submitting sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
