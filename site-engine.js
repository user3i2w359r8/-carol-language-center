/* Shared by the optional builder and the offline settings tool. No dependencies. */
(function (root, factory) {
  const engine = factory();
  if (typeof module === 'object' && module.exports) module.exports = engine;
  else root.CarolSite = engine;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const json = value => JSON.stringify(value, null, 2).replace(/</g, '\\u003c');

  function normalizeBaseUrl(value) {
    if (!String(value || '').trim()) return '';
    let url;
    try { url = new URL(String(value).trim()); } catch { throw new Error('Enter a complete HTTPS website address, including https://.'); }
    if (url.protocol !== 'https:' || !url.hostname.includes('.') || url.username || url.password || url.search || url.hash)
      throw new Error('Use a public HTTPS website address without a query, fragment or login details.');
    if (/\.(html?|xml|json)$/i.test(url.pathname)) throw new Error('Enter the website folder address, without index.html or another filename.');
    if (/(^|\.)example\.(com|org|net)$|(^|\.)localhost$|\.invalid$|\.test$/i.test(url.hostname))
      throw new Error('Enter your real published website address, not a sample address.');
    url.pathname = url.pathname.replace(/\/+$/, '') + '/';
    return url.href;
  }

  function validateProfile(profile) {
    if (profile.id !== 'carol-language-courses-tripoli') throw new Error('This folder is not the Carol website.');
    const clean = {...profile, baseUrl: normalizeBaseUrl(profile.baseUrl), email: String(profile.email || '').trim(), facebook: String(profile.facebook || '').trim()};
    if (clean.email && (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(clean.email) || /[\r\n]/.test(clean.email)))
      throw new Error('Check the email address, or leave it blank until the mailbox exists.');
    if (clean.facebook) {
      let url;
      try { url = new URL(clean.facebook); } catch { throw new Error('Use the complete Facebook page link, or leave it blank.'); }
      if (url.protocol !== 'https:' || !/(^|\.)facebook\.com$/.test(url.hostname) || url.username || url.password)
        throw new Error('The Facebook page link must start with https://www.facebook.com/.');
      clean.facebook = url.href;
    }
    if (!/^\+\d{8,15}$/.test(clean.telephone) || !/^\d{8,15}$/.test(clean.whatsapp)) throw new Error('Check the international phone and WhatsApp numbers in business-profile.json.');
    return clean;
  }

  function pageUrl(profile, file) {
    if (!profile.baseUrl) return '';
    return new URL(file === 'index.html' ? './' : file, profile.baseUrl).href;
  }

  function languageList(profile, lang = 'en') {
    const values = lang === 'ar' ? profile.languagesAr : profile.languages;
    if (!values || !values.length) return '';
    if (lang === 'ar') return values.join('، ');
    return values.length === 1 ? values[0] : values.slice(0, -1).join(', ') + ' and ' + values.at(-1);
  }

  function organization(profile, lang) {
    const ar = lang === 'ar';
    const value = {
      '@type': ['EducationalOrganization', 'LocalBusiness'],
      name: profile.name,
      alternateName: profile.nameAr,
      description: ar ? 'مركز لتعليم '+languageList(profile,'ar')+' في طرابلس، لبنان.' : 'A language center offering '+languageList(profile)+' in Tripoli, Lebanon.',
      telephone: profile.telephone,
      address: {'@type':'PostalAddress',streetAddress:profile.streetAddress,addressLocality:profile.city,addressCountry:profile.countryCode},
      geo: {'@type':'GeoCoordinates',latitude:profile.latitude,longitude:profile.longitude},
      hasMap: profile.mapUrl,
      areaServed: {'@type':'City',name:profile.city+', '+profile.country},
      sameAs: [profile.instagram, profile.facebook].filter(Boolean)
    };
    if (profile.email) value.email = profile.email;
    if (profile.landline) value.contactPoint = {'@type':'ContactPoint',telephone:profile.landline,contactType:'course enquiries'};
    if (profile.baseUrl) Object.assign(value, {'@id':profile.baseUrl+'#center', url:profile.baseUrl, logo:new URL('logo-wordmark.webp',profile.baseUrl).href});
    return value;
  }

  function metadata(page, profile) {
    const ar = page.lang === 'ar';
    const org = organization(profile, page.lang);
    const lines = [
      '<meta name="robots" content="' + (page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large') + '">',
      '<meta property="og:type" content="website">',
      '<meta property="og:site_name" content="' + esc(profile.name) + '">',
      '<meta property="og:title" content="' + esc(page.title) + '">',
      '<meta property="og:description" content="' + esc(page.description) + '">',
      '<meta property="og:locale" content="' + (ar ? 'ar_LB' : 'en_US') + '">',
      '<meta property="og:locale:alternate" content="' + (ar ? 'en_US' : 'ar_LB') + '">',
      '<meta name="twitter:card" content="summary_large_image">'
    ];
    if (profile.baseUrl && !page.noindex) {
      lines.push('<link rel="canonical" href="' + esc(pageUrl(profile,page.file)) + '">');
      for (const code of ['en','ar']) lines.push('<link rel="alternate" hreflang="' + code + '" href="' + esc(pageUrl(profile,page.versions[code])) + '">');
      lines.push('<link rel="alternate" hreflang="x-default" href="' + esc(pageUrl(profile,page.versions.en)) + '">');
      lines.push('<meta property="og:url" content="' + esc(pageUrl(profile,page.file)) + '">');
      const shareImage = new URL('social-preview.jpg',profile.baseUrl).href;
      const imageAlt = ar ? profile.nameAr+' — طرابلس، لبنان' : profile.name+' — Tripoli, Lebanon';
      lines.push('<meta property="og:image" content="'+esc(shareImage)+'">',
        '<meta property="og:image:type" content="image/jpeg">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:image:alt" content="'+esc(imageAlt)+'">',
        '<meta name="twitter:image" content="'+esc(shareImage)+'">',
        '<meta name="twitter:image:alt" content="'+esc(imageAlt)+'">');
    }
    if (page.noindex) return lines.join('\n');
    const webPage = {'@type':page.kind === 'contact' ? 'ContactPage' : page.kind === 'about' ? 'AboutPage' : 'WebPage', name:page.title, description:page.description, inLanguage:page.lang};
    if (profile.baseUrl) Object.assign(webPage, {'@id':pageUrl(profile,page.file)+'#page',url:pageUrl(profile,page.file),about:{'@id':profile.baseUrl+'#center'},isPartOf:{'@id':profile.baseUrl+'#website'}});
    else webPage.about = {'@type':'EducationalOrganization',name:profile.name};
    const graph = [org, webPage];
    if (profile.baseUrl) graph.push({'@type':'WebSite','@id':profile.baseUrl+'#website',url:profile.baseUrl,name:profile.name,inLanguage:['en','ar'],publisher:{'@id':profile.baseUrl+'#center'}});
    if (page.course) {
      const course = {'@type':'Course',name:page.course.name,description:page.course.description,provider:profile.baseUrl ? {'@id':profile.baseUrl+'#center'} : {'@type':'EducationalOrganization',name:profile.name}};
      if (page.course.language) course.teaches = page.course.language+' language';
      if (profile.baseUrl) Object.assign(course, {'@id':pageUrl(profile,page.file)+'#course',url:pageUrl(profile,page.file)});
      graph.push(course);
    }
    if (profile.baseUrl && page.courseIndex) {
      const list = {'@type':'ItemList','@id':pageUrl(profile,page.file)+'#courses',name:ar?'دورات اللغات في كارول':'Language courses at Carol',numberOfItems:page.courseIndex.length,itemListElement:page.courseIndex.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,url:pageUrl(profile,item.file)}))};
      graph.push(list);
      webPage.mainEntity = {'@id':list['@id']};
    }
    if (profile.baseUrl && page.crumbs && page.crumbs.length > 1) graph.push({'@type':'BreadcrumbList',itemListElement:page.crumbs.map((item,i)=>({'@type':'ListItem',position:i+1,name:item.name,item:pageUrl(profile,item.file)}))});
    lines.push('<script type="application/ld+json">\n' + json({'@context':'https://schema.org','@graph':graph}) + '\n</script>');
    return lines.join('\n');
  }

  function optionalContacts(profile, lang) {
    const links = [];
    if (profile.email) links.push('<a href="mailto:' + esc(profile.email) + '" dir="ltr">' + esc(profile.email) + '</a>');
    if (profile.facebook) links.push('<a href="' + esc(profile.facebook) + '" target="_blank" rel="noopener noreferrer">' + (lang === 'ar' ? 'فيسبوك' : 'Facebook') + ' <span aria-hidden="true">↗</span></a>');
    return links.join('\n');
  }

  function replaceBlock(html, name, content) {
    const start = '<!-- CAROL:' + name + ':START -->';
    const end = '<!-- CAROL:' + name + ':END -->';
    if (!html.includes(start) || !html.includes(end)) throw new Error('An editable marker is missing: ' + name + '. Restore the original file before changing settings.');
    const pattern = new RegExp(start + '[\\s\\S]*?' + end, 'g');
    return html.replace(pattern, () => start + '\n' + content + '\n' + end);
  }

  function patchPage(html, page, profile) {
    let result = replaceBlock(html, 'META', metadata(page, profile));
    result = replaceBlock(result, 'OPTIONAL-CONTACTS', optionalContacts(profile,page.lang));
    if (page.file === '404.html') result = replaceBlock(result, '404-BASE', base404(profile));
    return result;
  }

  function base404(profile) {
    return profile.baseUrl ? '<base href="'+esc(profile.baseUrl)+'">' : "<script>(function(){if(location.protocol==='file:')return;var p=location.pathname.split('/').filter(Boolean);var b=document.createElement('base');b.href=location.origin+(location.hostname.endsWith('.github.io')&&p.length>1?'/'+p[0]+'/':'/');document.head.appendChild(b);}());</script>";
  }

  function sitemap(pages, profile) {
    const items = profile.baseUrl ? pages.filter(p=>!p.noindex).map(page=>'  <url>\n    <loc>'+esc(pageUrl(profile,page.file))+'</loc>\n'+['en','ar','x-default'].map(code=>'    <xhtml:link rel="alternate" hreflang="'+code+'" href="'+esc(pageUrl(profile,page.versions[code==='x-default'?'en':code]))+'"/>').join('\n')+'\n  </url>') : [];
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + (items.length ? items.join('\n') : '  <!-- Set the real website address with site-settings.html to generate public URLs. -->') + '\n</urlset>\n';
  }

  function robots(profile) {
    return 'User-agent: *\nAllow: /\n' + (profile.baseUrl ? '\nSitemap: '+new URL('sitemap.xml',profile.baseUrl).href+'\n' : '\n# Add the final website address with site-settings.html before launch.\n');
  }

  function llms(pages, profile) {
    const lines = ['# '+profile.name,'','> Language tutoring center in Tripoli, Lebanon.','','## Business information','- Languages: '+profile.languages.join(', ')+'.','- Address: '+profile.streetAddress+', '+profile.city+', '+profile.country+'.','- Phone: '+profile.telephoneDisplay,'- [Directions on Google Maps]('+profile.mapUrl+')','- [Instagram]('+profile.instagram+')'];
    if (profile.email) lines.push('- Email: '+profile.email);
    lines.push('','## English pages');
    for (const p of pages.filter(p=>p.lang==='en' && !p.noindex)) lines.push('- ['+p.label+']('+(pageUrl(profile,p.file)||p.file)+'): '+p.description);
    lines.push('','## الصفحات العربية');
    for (const p of pages.filter(p=>p.lang==='ar' && !p.noindex)) lines.push('- ['+p.label+']('+(pageUrl(profile,p.file)||p.file)+'): '+p.description);
    return lines.join('\n')+'\n';
  }

  function manifest(profile) {
    return json({name:profile.name,short_name:'Carol',description:languageList(profile)+' in Tripoli, Lebanon.',lang:'en',start_url:'./',scope:'./',display:'browser',background_color:'#FCF7EF',theme_color:'#2C2925',icons:[{src:'icon-192.png',sizes:'192x192',type:'image/png'},{src:'icon-512.png',sizes:'512x512',type:'image/png'}]})+'\n';
  }
  return {esc,json,normalizeBaseUrl,validateProfile,pageUrl,languageList,metadata,optionalContacts,patchPage,base404,sitemap,robots,llms,manifest};
});
