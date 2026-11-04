#!/usr/bin/env node
/* Optional authoring tool. The finished website does not need Node or a build step.
   Run from any directory with: node /path/to/build-site.mjs */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import engine from './site-engine.js';
import courses from './site-content.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const profile = engine.validateProfile(JSON.parse(fs.readFileSync(path.join(root,'business-profile.json'),'utf8')));
profile.languages = courses.map(c=>c.en.name);
profile.languagesAr = courses.map(c=>c.ar.name);
const E = engine.esc;
const pages = [];
const write = (name, content) => fs.writeFileSync(path.join(root,name),content,'utf8');
const file = (slug, lang) => (slug === 'home' ? 'index' : slug) + (lang === 'ar' ? '-ar' : '') + '.html';
const localized = (lang,en,ar) => lang === 'ar' ? ar : en;
const textLines = text => text.split('\n').map((line,i)=> i ? '<em class="text-break">'+E(line)+'</em>' : E(line)).join('');
const knownSlugs = new Set(['home','index','about','courses','contact','404','site-settings']);
for (const course of courses) {
  if (!/^[a-z][a-z0-9-]*$/.test(course.slug) || knownSlugs.has(course.slug)) throw new Error('Use a unique, lowercase course slug: '+course.slug);
  knownSlugs.add(course.slug);
  for (const lang of ['en','ar']) for (const key of ['name','title','description','short','headline','intro','sectionTitle','paragraphs','goals','question','answer','message']) {
    if (!course[lang]?.[key]) throw new Error('Missing '+lang+'.'+key+' in '+course.slug);
  }
}

const paths = {
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  external:'<path d="M7 17 17 7M7 7h10v10"/>',
  book:'<path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1m0-14c3-2 6-2 9-1v14c-3-1-6-1-9 1V6Z"/>',
  chat:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9.4 9.4 0 0 1-4-.9L3 21l1.9-5.5a9.4 9.4 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3H13a8.5 8.5 0 0 1 8 8v.5Z"/><path d="M8 11h8M8 14h5"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 13 13 0 0 0 2.8.7 2 2 0 0 1 1.8 2.1Z"/>',
  door:'<path d="M4 21h16M6 21V4h12v17M6 4l9-2v19"/><path d="M11 11h.01"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 0 0 18 17 17 0 0 0 0-18Z"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'
};
const icon = name => '<svg class="icon '+(name==='arrow'?'arrow':'')+'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+paths[name]+'</svg>';
function whatsapp(lang, course) {
  return 'https://wa.me/'+profile.whatsapp+'?text='+encodeURIComponent(course ? course[lang].message : localized(lang,'Hello Carol! I would like to ask about your language courses.','مرحباً كارول! حابب/ة أعرف أكثر عن دورات اللغات عندكم.'));
}
const button = (href,label,name='arrow',style='',external=false) => '<a class="button '+style+'" href="'+E(href)+'"'+(external?' target="_blank" rel="noopener noreferrer"':'')+'>'+E(label)+icon(name)+'</a>';
const marker = (name,content) => '<!-- CAROL:'+name+':START -->\n'+content+'\n<!-- CAROL:'+name+':END -->';

function header(page) {
  const lang = page.lang, L = (en,ar)=>localized(lang,en,ar);
  const nav = [ ['courses',L('Courses','الدورات')], ['about',L('Our center','عن المركز')], ['contact',L('Visit & contact','العنوان والتواصل')] ];
  return `<a class="skip-link" href="#main">${L('Skip to content','انتقل إلى المحتوى')}</a>
<div class="topbar"><div class="wrap"><a href="${file('contact',lang)}#location">${icon('pin')}<span>${L('Beshara Khoury St. · Tripoli, Lebanon','شارع بشارة الخوري · طرابلس، لبنان')}</span></a><a class="topbar-phone" href="tel:${profile.telephone}">${icon('phone')}<bdi>${E(profile.telephoneDisplay)}</bdi></a></div></div>
<header class="site-header"><div class="wrap header-inner">
<a class="brand" href="${file('home',lang)}" aria-label="${E(L(profile.name+' — home',profile.nameAr+' — الرئيسية'))}"><img class="brand-logo" src="logo-wordmark.webp" width="1029" height="444" alt="${E(profile.name+' — '+profile.nameAr)}" fetchpriority="high" decoding="async"></a>
<button class="nav-toggle" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="${L('Open navigation','افتح قائمة التنقّل')}" data-label-open="${L('Open navigation','افتح قائمة التنقّل')}" data-label-close="${L('Close navigation','أغلق قائمة التنقّل')}">${icon('menu')}<span>${L('Menu','القائمة')}</span></button>
<nav class="site-nav" id="site-nav" aria-label="${L('Main navigation','القائمة الرئيسية')}">${nav.map(([slug,label])=>`<a class="nav-link" href="${file(slug,lang)}"${page.kind===slug?' aria-current="page"':''}>${label}</a>`).join('')}<a class="language-switch" href="${page.versions[lang==='en'?'ar':'en']}" lang="${lang==='en'?'ar':'en'}" hreflang="${lang==='en'?'ar':'en'}" aria-label="${L('اقرأ هذه الصفحة بالعربية','Read this page in English')}">${L('العربية','English')}</a>${button(whatsapp(lang),L('Ask about a course','اسأل عن دورة'),'chat','nav-cta',true)}</nav>
</div></header>`;
}

function footer(page, band=true) {
  const lang=page.lang, L=(en,ar)=>localized(lang,en,ar);
  const centerName=L(profile.name,profile.nameAr);
  return `${band?`<section class="contact-band" aria-labelledby="contact-heading"><div class="wrap"><div><h2 id="contact-heading">${L('Your next word starts here.','كلمتك الجديدة تبدأ من هنا.')}</h2><p>${L('Tell us which language you have in mind. We’ll take it from there.','احكِ لنا أيّ لغة ببالك، ولنبدأ من هناك.')}</p></div><div class="button-row">${button(whatsapp(lang),L('Talk to Carol on WhatsApp','تواصل مع كارول عبر واتساب'),'chat','light',true)}${button('tel:'+profile.telephone,L('Give us a call','اتّصل بنا'),'phone','outline-light')}</div></div></section>`:''}
<footer class="site-footer"><div class="wrap"><div class="footer-grid">
<div><a class="footer-brand" href="${file('home',lang)}" aria-label="${E(centerName)}"><img src="logo-wordmark.webp" width="1029" height="444" alt="${E(profile.name+' — '+profile.nameAr)}" loading="lazy" decoding="async"></a><p class="footer-intro">${L('Languages bring us closer. A welcoming place to begin, in the heart of Tripoli.','اللغات بتقرّبنا. مكان دافئ لبداية جديدة، في قلب طرابلس.')}</p></div>
<div><p class="footer-heading">${L('Our languages','لغاتنا')}</p><nav class="footer-links" aria-label="${L('Language courses','دورات اللغات')}">${courses.map(c=>`<a href="${file(c.slug,lang)}">${E(c[lang].name)}</a>`).join('')}</nav></div>
<div><p class="footer-heading">${L('Get in touch','تواصل معنا')}</p><div class="footer-links"><a href="tel:${profile.telephone}" dir="ltr">${E(profile.telephoneDisplay)}</a><a href="${E(whatsapp(lang))}" target="_blank" rel="noopener noreferrer">${L('WhatsApp','واتساب')} ↗</a><a href="${E(profile.instagram)}" target="_blank" rel="noopener noreferrer">${L('Instagram','إنستغرام')} ↗</a>${marker('OPTIONAL-CONTACTS',engine.optionalContacts(profile,lang))}</div></div>
<div><p class="footer-heading">${L('Visit the center','زوروا المركز')}</p><address class="footer-address">${E(L('Beshara Khoury Street','شارع بشارة الخوري'))}<br>${L('Next to KFC, same building as Boulevard Pharmacy.','بجانب KFC، في مبنى صيدلية بولفار.')}<br>${L('Tripoli, Lebanon','طرابلس، لبنان')}</address><div class="footer-links" style="margin-top:12px"><a href="${file('contact',lang)}#location">${L('Find us on the map','موقعنا على الخريطة')} <span aria-hidden="true">↗</span></a></div></div>
</div><div class="footer-base"><span>© ${E(centerName)}. ${L('All rights reserved.','جميع الحقوق محفوظة.')}</span><span><a href="${file('about',lang)}">${L('Our center','عن المركز')}</a> · <a href="${file('contact',lang)}">${L('Contact & directions','التواصل والعنوان')}</a> · <a href="${page.versions[lang==='en'?'ar':'en']}" lang="${lang==='en'?'ar':'en'}">${L('العربية','English')}</a></span></div></div></footer>
<nav class="mobile-contact" aria-label="${L('Quick contact','روابط سريعة')}"><a href="${file('courses',lang)}">${icon('book')}${L('Courses','الدورات')}</a><a href="tel:${profile.telephone}">${icon('phone')}${L('Call','اتّصال')}</a><a class="mobile-whatsapp" href="${E(whatsapp(lang))}" target="_blank" rel="noopener noreferrer">${icon('chat')}${L('WhatsApp','واتساب')}</a></nav>`;
}

function breadcrumb(page) {
  return '<nav class="wrap breadcrumb" aria-label="'+(page.lang==='ar'?'مسار الصفحة':'Breadcrumb')+'">'+page.crumbs.map((c,i)=> (i?'<span class="crumb-separator" aria-hidden="true">/</span>':'')+(i===page.crumbs.length-1?'<span aria-current="page">'+E(c.name)+'</span>':'<a href="'+c.file+'">'+E(c.name)+'</a>')).join('')+'</nav>';
}

function layout(page,body,band=true) {
  return `<!doctype html>
<html lang="${page.lang}" dir="${page.lang==='ar'?'rtl':'ltr'}" data-carol-site="carol-language-courses-tripoli">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${E(page.title)}</title>
<meta name="description" content="${E(page.description)}">
<meta name="theme-color" content="#2C2925">
<meta name="color-scheme" content="light">
${marker('META',engine.metadata(page,profile))}
<link rel="icon" href="favicon.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="apple-touch-icon.png" sizes="180x180">
<link rel="manifest" href="site.webmanifest">
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
</head>
<body>
${header(page)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(page,band)}
</body>
</html>
`;
}

function courseCards(lang, excluded) {
  return '<div class="course-grid'+(excluded?' related-courses':'')+'">'+courses.filter(c=>c.slug!==excluded).map(c=>`<article class="course-card" data-language="${c.slug}"><div class="course-card-top"><span class="course-code" aria-hidden="true">${c.code}</span><span class="course-native" lang="${c.greetingLang}">${E(c.native)}</span></div><h3><a href="${file(c.slug,lang)}">${E(c[lang].name)}</a></h3><p>${E(c[lang].short)}</p><span class="card-bottom" aria-hidden="true">${localized(lang,'Explore '+c.en.name,'تعرّف على الدورة')}${icon('arrow')}</span></article>`).join('')+'</div>';
}

function faq(lang, items) {
  return '<div class="faq-list">'+items.map(([q,a])=>'<details><summary>'+E(q)+'</summary><p>'+E(a)+'</p></details>').join('')+'</div>';
}

function generalFaq(lang) {
  return lang==='en' ? [
    ['Which languages can I learn at Carol?', 'Carol for Language Courses offers '+engine.languageList(profile)+'. Explore each language page, or contact the center if you would like help choosing where to begin.'],
    ['Where is the center?', 'You can find Carol on Beshara Khoury Street in Tripoli, Lebanon, next to KFC, in the same building as Boulevard Pharmacy. The map and directions link below show the location.'],
    ['How do I ask about a course?', 'Send a WhatsApp message to +961 78 957 735 or call the center. Mention the language you want to learn, any previous experience and your goal. Carol will explain the available options.'],
    ['What should I do before visiting?', 'Contact the center before making the trip so you can arrange a suitable time and confirm the visiting details.'],
    ['What are the course fees and schedules?', 'Fees and schedules depend on the course options currently available. Ask Carol directly about your chosen language, starting point, timetable and total cost before registering.']
  ] : [
    ['ما هي اللغات التي يمكنني تعلّمها في كارول؟','يقدّم كارول لتعليم اللغات دورات في '+engine.languageList(profile,'ar')+'. تعرّف على كلّ لغة في صفحتها، أو تواصل مع المركز إذا كنت تريد المساعدة في اختيار البداية.'],
    ['أين يقع المركز؟','يقع كارول في شارع بشارة الخوري بطرابلس، لبنان، بجانب KFC، في مبنى صيدلية بولفار. يمكنك استخدام الخريطة ورابط الاتجاهات لمعرفة الموقع.'],
    ['كيف أسأل عن دورة؟','أرسل رسالة واتساب إلى الرقم +961 78 957 735 أو اتّصل بالمركز. اذكر اللغة التي تريد تعلّمها، وتجربتك السابقة إن وجدت، وهدفك من التعلّم. بعدها يوضّح لك المركز الخيارات المتاحة.'],
    ['ماذا أفعل قبل زيارة المركز؟','تواصل معنا قبل الحضور لترتيب وقت مناسب والتأكّد من تفاصيل الزيارة.'],
    ['ما هي رسوم الدورات ومواعيدها؟','تختلف الرسوم والمواعيد بحسب خيارات الدورات المتاحة حالياً. اسأل كارول مباشرةً عن اللغة التي تهمّك ونقطة بدايتك والمواعيد والتكلفة الكاملة قبل التسجيل.']
  ];
}

function steps(lang) {
  const L=(en,ar)=>localized(lang,en,ar);
  const items=[
    [L('Choose your language','اختر لغتك'),L('Choose from '+engine.languageList(profile)+'. Start with the language that speaks to your goals.','تعرّف على '+engine.languageList(profile,'ar')+'، وابدأ باللغة الأقرب إلى هدفك.')],
    [L('Tell us a little about you','احكِ لنا عن هدفك'),L('Share why you want to learn and whether you have studied the language before.','شاركنا سبب رغبتك في التعلّم، وأخبرنا إن كنت قد درست اللغة من قبل.')],
    [L('Find your next step','تعرّف على الخطوة التالية'),L('Contact Carol to discuss the available course options and arrange your visit.','تواصل مع كارول لمعرفة خيارات الدورات المتاحة وترتيب زيارتك.')]
  ];
  return `<section class="section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">${L('A simple beginning','بداية بسيطة')}</p><h2>${L('Start with a conversation.','ابدأ بمحادثة.')}</h2></div><p>${L('You don’t need to have it all figured out. A language and a reason to learn are a good start.','لا تحتاج إلى خطّة كاملة. لغة تهمّك وسبب يشجّعك على تعلّمها، وهكذا تبدأ الحكاية.')}</p></div><div class="step-grid">${items.map(([title,copy],i)=>`<article class="step"><span class="step-number" aria-hidden="true">0${i+1}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>`;
}

function visit(lang) {
  const L=(en,ar)=>localized(lang,en,ar);
  return `<section class="section" id="location"><div class="wrap visit-grid"><div><p class="eyebrow">${L('Here in Tripoli','هنا في طرابلس')}</p><h2>${L('A place to learn.<br>A place to belong.','مكان للتعلّم.<br>ومكان تشعر فيه بالألفة.')}</h2><address class="address"><strong>${E(L(profile.name,profile.nameAr))}</strong>${L('Beshara Khoury Street','شارع بشارة الخوري')}<br>${L('Tripoli, Lebanon','طرابلس، لبنان')}<span class="landmark">${L('Next to KFC, in the same building as Boulevard Pharmacy.','بجانب KFC، في مبنى صيدلية بولفار.')}</span></address><div class="button-row">${button(profile.mapUrl,L('Get directions','الاتجاهات إلى المركز'),'external','secondary',true)}</div><p class="visit-note">${L('Please contact us before visiting to arrange a suitable time.','تواصل معنا قبل الحضور لترتيب وقت مناسب للزيارة.')}</p></div><div><div class="map-frame"><iframe src="${E(profile.mapEmbedUrl)}" title="${E(L('Map: Carol for Language Courses, Beshara Khoury Street, Tripoli, Lebanon','خريطة كارول لتعليم اللغات، شارع بشارة الخوري، طرابلس، لبنان'))}" width="640" height="370" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div><p class="map-caption">${L('Map provided by Google.','الخريطة مقدّمة من Google.')} <a href="${E(profile.mapUrl)}" target="_blank" rel="noopener noreferrer">${L('Open full map','افتح الخريطة الكاملة')}</a></p></div></div></section>`;
}

function home(page) {
  const lang=page.lang,L=(en,ar)=>localized(lang,en,ar);
  return `<section class="wrap hero"><div class="hero-copy"><p class="eyebrow">${L('Language learning in Tripoli, Lebanon','تعلّم اللغات في طرابلس، لبنان')}</p><h1>${L('Learn a language.<em class="text-break">Open a new chapter.</em>','تعلّم لغة جديدة.<em class="text-break">وافتح صفحة جديدة.</em>')}</h1><p class="lead">${L(''+engine.languageList(profile)+' at Carol for Language Courses. A welcoming center in Tripoli, where your next chapter begins with a conversation.',''+engine.languageList(profile,'ar')+' في كارول لتعليم اللغات. مركز دافئ وقريب منك في طرابلس، تبدأ فيه حكايتك الجديدة بمحادثة.')}</p><div class="button-row">${button(file('courses',lang),L('Explore the courses','اكتشف الدورات'))}${button(whatsapp(lang),L('Talk to Carol','احكِ مع كارول'),'chat','secondary',true)}</div><p class="hero-note">${icon('pin')}${L('Beshara Khoury Street · Tripoli','شارع بشارة الخوري · طرابلس')}</p></div>
<div class="hello-studio"><p class="studio-kicker">${L('Every new chapter starts with a hello','كلّ بداية جديدة تبدأ بتحيّة')}</p><ul class="hello-list">${courses.map(c=>`<li><a href="${file(c.slug,lang)}" aria-label="${E(L('Explore '+c.en.name+' lessons','تعرّف على دورة '+c.ar.name))}"><span class="hello-word" lang="${c.greetingLang}">${E(c.greeting)}</span><span class="hello-code" lang="en">${E(c.code)} <span aria-hidden="true">↗</span></span></a></li>`).join('')}</ul><div class="studio-bottom"><span>${L('Different languages.<br>A familiar welcome.','لغات مختلفة.<br>وترحيب بتعرفه.')}</span><img src="logo-mark.webp" width="45" height="45" alt="" aria-hidden="true"></div></div></section>
<div class="language-ribbon"><div class="wrap"><span class="ribbon-label">${L('Choose where your story goes','اختر لغة حكايتك القادمة')}</span><nav class="ribbon-links" aria-label="${L('Explore languages','اكتشف اللغات')}">${courses.map(c=>`<a href="${file(c.slug,lang)}" lang="${c.greetingLang}">${E(c.native)}</a>`).join('')}</nav></div></div>
<section class="section" id="courses" aria-labelledby="courses-heading"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">${L('Our language courses','دورات اللغات')}</p><h2 id="courses-heading">${L(courses.length+' languages.<br><em>Where will you begin?</em>',courses.length+' لغات.<br><em>بأيّ لغة تبدأ؟</em>')}</h2></div><p>${L('For curiosity, connection or a goal close to your heart. Explore a language, then talk to us about getting started.','للفضول، للتواصل، أو لهدف قريب من قلبك. تعرّف على اللغة التي تهمّك، ثم احكِ معنا عن البداية.')}</p></div>${courseCards(lang)}<p class="section-foot">${L('Not sure where to start?','لست متأكّداً من أين تبدأ؟')} <a href="${file('contact',lang)}">${L('Let’s talk about your goals.','احكِ معنا عن هدفك.')}</a></p></div></section>
<section class="section center-section"><div class="wrap center-grid"><div class="identity-panel"><img class="identity-mark" src="logo-mark.webp" width="185" height="185" alt="" loading="lazy"><p class="display-serif">${L('A new language.<br>A familiar feeling.','لغة جديدة.<br>وشعور بالألفة.')}</p><span class="identity-caption">${L('Carol for Language Courses · Tripoli','كارول لتعليم اللغات · طرابلس')}</span></div><div class="center-copy"><p class="eyebrow">${L('A little about Carol','تعرّف على كارول')}</p><h2>${L('Learning is personal.<br><em>So is the welcome.</em>','التعلّم تجربة شخصية.<br><em>والترحيب من القلب.</em>')}</h2><p class="lead">${L('A language brings people closer. That same sense of connection is at the heart of Carol: a center that feels familiar, welcoming and human.','اللغة تقرّب الناس من بعضهم. وهذا الشعور هو روح كارول: مركز قريب، مرحّب، وتشعر فيه بالألفة.')}</p><ul class="values-list"><li>${icon('heart')}<div><strong>${L('A warm, personal welcome','ترحيب دافئ وقريب')}</strong><p>${L('Come with your questions, your interests and your own reason to learn.','تعال بأسئلتك واهتماماتك وبالسبب الذي يشجّعك على التعلّم.')}</p></div></li><li>${icon('pin')}<div><strong>${L('Part of your city','جزء من مدينتك')}</strong><p>${L('Find the center on Beshara Khoury Street in Tripoli.','تجد المركز في شارع بشارة الخوري بطرابلس.')}</p></div></li><li>${icon('chat')}<div><strong>${L('A conversation comes first','المحادثة هي البداية')}</strong><p>${L('Speak directly with Carol about the language you have in mind.','تواصل مباشرةً مع كارول حول اللغة التي تفكّر بتعلّمها.')}</p></div></li></ul><a class="text-link" href="${file('about',lang)}">${L('Meet the center','تعرّف على المركز')}${icon('arrow')}</a></div></div></section>
${steps(lang)}
<section class="section faq-section"><div class="wrap faq-grid"><div class="faq-intro"><p class="eyebrow">${L('Good questions','أسئلة بتهمّك')}</p><h2>${L('A little clarity<br>before you begin.','صورة أوضح<br>قبل البداية.')}</h2><p>${L('Have a question of your own? You can reach us directly on WhatsApp.','عندك سؤال آخر؟ تواصل معنا مباشرةً عبر واتساب.')}</p><a class="text-link" href="${E(whatsapp(lang))}" target="_blank" rel="noopener noreferrer">${L('Ask Carol','اسأل كارول')}${icon('arrow')}</a></div>${faq(lang,generalFaq(lang))}</div></section>
${visit(lang)}`;
}

function directory(page) {
  const lang=page.lang,L=(en,ar)=>localized(lang,en,ar);
  return `${breadcrumb(page)}<section class="page-hero"><div class="wrap"><p class="eyebrow">${L('Languages at Carol','اللغات في كارول')}</p><h1>${L('Language courses<br><em>in Tripoli.</em>','دورات لغات<br><em>في طرابلس.</em>')}</h1><p class="lead">${L('Explore '+engine.languageList(profile)+' at our language center in Tripoli, Lebanon. Each language has its own page, so you can go straight to what interests you.','تعرّف على '+engine.languageList(profile,'ar')+' في مركزنا بطرابلس، لبنان. لكلّ لغة صفحتها، حتى تصل مباشرةً إلى ما يهمّك.')}</p></div></section>
<section class="section"><div class="wrap"><div class="course-directory">${courses.map(c=>`<article class="directory-row"><span class="course-code" aria-hidden="true">${c.code}</span><div class="directory-name"><h2><a href="${file(c.slug,lang)}">${E(c[lang].name)}</a></h2><small lang="${c.greetingLang}">${E(c.native)}</small></div><p>${E(c[lang].short)} ${L('Find out more and ask Carol about the course.','تعرّف على اللغة واسأل كارول عن الدورة.')}</p><span class="directory-arrow" aria-hidden="true">${icon('arrow')}</span></article>`).join('')}</div><p class="section-foot">${L('Have a particular learning goal in mind?','لديك هدف معيّن من التعلّم؟')} <a href="${file('contact',lang)}">${L('Tell us about it.','احكِ لنا عنه.')}</a></p></div></section>
<section class="section center-section"><div class="wrap content-grid"><div class="prose"><p class="eyebrow">${L('Choosing a course','اختيار الدورة')}</p><h2>${L('Your reason is<br><em>a good place to start.</em>','السبب الذي يشجّعك<br><em>هو أفضل بداية.</em>')}</h2><p>${L('You might want to connect with people, follow an interest, support your studies or feel more comfortable with a language you have already met. Bring that reason with you when you contact Carol.','قد ترغب في التواصل مع الآخرين، أو متابعة اهتمام، أو دعم دراستك، أو الشعور براحة أكبر مع لغة تعرفها قليلاً. ابدأ بهذا السبب عندما تتواصل مع كارول.')}</p><p>${L('Tell us which language interests you and whether you have studied it before. Course options and visiting arrangements are discussed directly with the center, so you can get an answer that fits your enquiry.','أخبرنا باللغة التي تهمّك وما إذا كنت قد درستها من قبل. يمكنك مناقشة خيارات الدورات وترتيب الزيارة مباشرةً مع المركز، لتحصل على جواب يناسب سؤالك.')}</p></div>${enquiryAside(lang)}</div></section>${steps(lang)}`;
}

function enquiryAside(lang,course) {
  const L=(en,ar)=>localized(lang,en,ar);
  return `<aside class="enquiry-aside"><p class="eyebrow">${L('Your first message','رسالتك الأولى')}</p><h3>${L('A little context goes a long way.','تفاصيل بسيطة، وبداية أوضح.')}</h3><p>${L('When you contact Carol, it helps to include:','عندما تتواصل مع كارول، من المفيد أن تذكر:')}</p><ol><li>${L('The language you want to learn.','اللغة التي تريد تعلّمها.')}</li><li>${L('Any experience you already have.','تجربتك السابقة مع اللغة، إن وجدت.')}</li><li>${L('What you would like to use it for.','الهدف الذي تريد استخدام اللغة من أجله.')}</li></ol>${button(whatsapp(lang,course),L(course?'Ask about '+course.en.name:'Message Carol',course?'اسأل عن '+course.ar.name:'راسل كارول'),'chat','',true)}<p class="form-note">${L('Your message opens in WhatsApp. You choose when to send it.','تفتح الرسالة في واتساب، وتختار أنت متى ترسلها.')}</p></aside>`;
}

function courseBody(page,course) {
  const lang=page.lang,L=(en,ar)=>localized(lang,en,ar),copy=course[lang];
  return `${breadcrumb(page)}<section class="wrap course-hero"><div><p class="eyebrow">${L(course.en.name+' lessons in Tripoli, Lebanon','دورات '+course.ar.name+' في طرابلس، لبنان')}</p><h1>${textLines(L(course.en.name+' courses\nin Tripoli.','دورات '+course.ar.name+'\nفي طرابلس.'))}</h1><p class="lead">${E(copy.intro)}</p><div class="button-row">${button(whatsapp(lang,course),L('Ask about '+course.en.name,'اسأل عن '+course.ar.name),'chat','',true)}${button(file('contact',lang)+'?language='+course.slug+'#course-enquiry',L('Plan your first message','حضّر رسالتك الأولى'),'arrow','secondary')}</div></div><div class="course-poster"><span class="course-code" aria-hidden="true">${course.code}</span><p class="poster-word" lang="${course.greetingLang}">${E(course.greeting)}</p><p class="poster-native" lang="${course.greetingLang}">${E(course.native)}</p><img class="poster-mark" src="logo-mark.webp" width="45" height="45" alt="" aria-hidden="true"></div></section>
<div class="course-facts"><div class="wrap"><p>${icon('book')}${E(L(course.en.name+' at Carol',course.ar.name+' في كارول'))}</p><p>${icon('pin')}${L('Tripoli, Lebanon','طرابلس، لبنان')}</p><p>${icon('chat')}${L('Course enquiries directly with the center','الاستفسار عن الدورات مباشرةً مع المركز')}</p></div></div>
<section class="section"><div class="wrap content-grid"><div class="prose"><p class="eyebrow">${L('Your language, your reason','لغتك، والسبب يخصّك')}</p><h2>${E(copy.sectionTitle)}</h2>${copy.paragraphs.map(p=>'<p>'+E(p)+'</p>').join('')}</div>${enquiryAside(lang,course)}</div></section>
<section class="section center-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">${L('Think about your goals','فكّر بهدفك')}</p><h2>${L('What would you like<br><em>to make possible?</em>','ما الذي تتمنّى<br><em>أن يصبح ممكناً؟</em>')}</h2></div><p>${L('These are starting points for your enquiry. Tell us which situations matter to you.','هذه أفكار تساعدك على صياغة سؤالك. احكِ لنا عن المواقف التي تهمّك.')}</p></div><div class="goal-grid">${copy.goals.map(([title,body],i)=>`<article class="goal-item">${icon(['chat','book','globe'][i%3])}<h3>${E(title)}</h3><p>${E(body)}</p></article>`).join('')}</div></div></section>
<section class="section"><div class="wrap faq-grid"><div class="faq-intro"><p class="eyebrow">${L('Before you begin','قبل البداية')}</p><h2>${L('A few useful<br>answers.','أجوبة<br>بتفيدك.')}</h2></div>${faq(lang,[[copy.question,copy.answer],...generalFaq(lang).filter((item,i)=>i===1||i===4)])}</div></section>
<section class="section faq-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">${L('Keep exploring','اكتشف المزيد')}</p><h2>${L('Another language in mind?','ببالك لغة أخرى؟')}</h2></div></div>${courseCards(lang,course.slug)}</div></section>`;
}

function about(page) {
  const lang=page.lang,L=(en,ar)=>localized(lang,en,ar);
  const values=[
    ['heart',L('A sense of belonging','شعور بالألفة'),L('We want Carol to feel like a place you can walk into with your questions and your own story. That familiar, family feeling is part of who we are.','نريد أن يكون كارول مكاناً تأتي إليه بأسئلتك وحكايتك. الشعور بالألفة والجوّ العائلي جزء من هويّتنا.')],
    ['chat',L('A human connection','تواصل قريب'),L('Behind every language is a reason to learn it. Tell us yours, and speak directly with the center about your next step.','وراء كلّ لغة سبب يدفعك إلى تعلّمها. احكِ لنا عن سببك وتواصل مباشرةً مع المركز حول خطوتك التالية.')],
    ['pin',L('A place in Tripoli','مكان في طرابلس'),L('Carol is based on Beshara Khoury Street, next to KFC, in the same building as Boulevard Pharmacy. Find us, contact us and arrange a visit.','يقع كارول في شارع بشارة الخوري، بجانب KFC، في مبنى صيدلية بولفار. تعرّف على موقعنا، تواصل معنا ورتّب زيارتك.')]
  ];
  return `${breadcrumb(page)}<section class="page-hero"><div class="wrap"><p class="eyebrow">${L('About Carol for Language Courses','عن كارول لتعليم اللغات')}</p><h1>${L('A language center.<br><em>A personal welcome.</em>','مركز لتعليم اللغات.<br><em>وترحيب من القلب.</em>')}</h1><p class="lead">${L('A language tutoring center in Tripoli, Lebanon, with a simple belief: learning starts with connection.','مركز لتعليم اللغات في طرابلس، لبنان، يؤمن بفكرة بسيطة: التعلّم يبدأ بالتواصل.')}</p></div></section>
<section class="section"><div class="wrap about-intro"><div class="prose"><p class="eyebrow">${L('Welcome to Carol','أهلاً بك في كارول')}</p><h2>${L('Bring your curiosity.<br><em>Be yourself.</em>','تعال بفضولك.<br><em>وكن على طبيعتك.</em>')}</h2><p>${L('Carol for Language Courses offers '+engine.languageList(profile)+' in Tripoli. At the center is a warm, familiar atmosphere: the kind of place where learning a new language can begin with simply feeling welcome.','يقدّم كارول لتعليم اللغات دورات في '+engine.languageList(profile,'ar')+' بطرابلس. ما يميّز أجواء المركز هو الدفء والألفة، لتبدأ علاقتك بلغة جديدة بشعور بالترحيب.')}</p><p>${L('Your reason to learn may be personal, practical or still taking shape. A conversation about your interests and experience is the starting point for finding out what the center can offer you.','قد يكون سبب تعلّمك شخصياً، أو عملياً، أو فكرة ما زالت تتّضح. الحديث عن اهتماماتك وتجربتك هو البداية لمعرفة ما يمكن أن يقدّمه لك المركز.')}</p><a class="text-link" href="${file('courses',lang)}">${L('Explore our languages','تعرّف على لغاتنا')}${icon('arrow')}</a></div><div class="about-wordmark"><img src="logo-wordmark.webp" width="1029" height="444" alt="${E(L('Carol for Language Courses — كارول لتعليم اللغات','كارول لتعليم اللغات — Carol for Language Courses'))}" loading="lazy"><p class="brand-caption">${L('A welcoming place for a new chapter.','مكان دافئ لصفحة جديدة.')}</p></div></div></section>
<section class="section center-section"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">${L('What feels like Carol','روح كارول')}</p><h2>${L('The welcome matters.','الترحيب يصنع فرقاً.')}</h2></div></div><div class="values-grid">${values.map(([symbol,title,copy])=>`<article class="value-block">${icon(symbol)}<h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>
${visit(lang)}`;
}

function contact(page) {
  const lang=page.lang,L=(en,ar)=>localized(lang,en,ar);
  return `${breadcrumb(page)}<section class="page-hero"><div class="wrap"><p class="eyebrow">${L('Contact & directions','التواصل والعنوان')}</p><h1>${L('Contact Carol.<br><em>Let’s talk languages.</em>','تواصل مع كارول.<br><em>ولنبدأ الحديث.</em>')}</h1><p class="lead">${L('Ask about a language, tell us your goal or arrange a visit to Carol for Language Courses in Tripoli.','اسأل عن لغة، احكِ لنا عن هدفك، أو رتّب زيارة إلى كارول لتعليم اللغات بطرابلس.')}</p></div></section>
<section class="section"><div class="wrap contact-layout"><div><p class="eyebrow">${L('Speak with Carol','احكِ مع كارول')}</p><h2>${L('Let’s find your<br><em>next step.</em>','لنتعرّف معاً<br><em>على خطوتك التالية.</em>')}</h2><p class="lead">${L('Choose the way that suits you. For a course enquiry, mention the language you are interested in and any previous experience.','اختر الطريقة التي تناسبك. عند السؤال عن دورة، اذكر اللغة التي تهمّك وتجربتك السابقة معها، إن وجدت.')}</p><div class="contact-methods"><a class="contact-method" href="${E(whatsapp(lang))}" target="_blank" rel="noopener noreferrer">${icon('chat')}<span><span class="contact-title">${L('Message on WhatsApp','راسلنا عبر واتساب')}</span><small><bdi>${E(profile.telephoneDisplay)}</bdi></small></span>${icon('external')}</a><a class="contact-method" href="tel:${profile.telephone}">${icon('phone')}<span><span class="contact-title">${L('Call the center','اتّصل بالمركز')}</span><small><bdi>${E(profile.telephoneDisplay)}</bdi></small></span>${icon('arrow')}</a><a class="contact-method" href="${E(profile.instagram)}" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span><span class="contact-title">${L('Find us on Instagram','تابعنا على إنستغرام')}</span><small lang="en" dir="ltr">@carol_for_language_courses_</small></span>${icon('external')}</a></div><div class="contact-extra"><a href="tel:${profile.landline}">${L('Landline','الهاتف الأرضي')}: <bdi>${E(profile.landlineDisplay)}</bdi></a>${marker('OPTIONAL-CONTACTS',engine.optionalContacts(profile,lang))}</div></div>
<div id="course-enquiry"><form class="enquiry-box" id="enquiry-form" action="https://wa.me/${profile.whatsapp}" method="get" data-whatsapp="${profile.whatsapp}" hidden><p class="eyebrow">${L('Make your first message easy','رسالتك الأولى، بكلّ سهولة')}</p><h2>${L('What’s on your mind?','أيّ لغة ببالك؟')}</h2><p>${L('Choose a language and, if you like, tell us a little about your goal. Your message opens in WhatsApp for you to review and send.','اختر لغة وأضف، إذا أحببت، تفاصيل عن هدفك. تفتح الرسالة في واتساب لتراجعها وترسلها بنفسك.')}</p><div class="form-field"><label for="enquiry-language">${L('I am interested in','أنا مهتمّ/ة بـ')}</label><select id="enquiry-language" name="language"><option value="">${L('Help choosing a language','المساعدة في اختيار لغة')}</option>${courses.map(c=>`<option value="${E(c[lang].name)}" data-slug="${c.slug}">${E(c[lang].name)}</option>`).join('')}</select></div><div class="form-field"><label for="enquiry-goal">${L('My goal or question','هدفي أو سؤالي')} <span>${L('(optional)','(اختياري)')}</span></label><textarea id="enquiry-goal" name="goal" rows="4" maxlength="500" placeholder="${E(L('For example: I have studied a little before and would like to start again.','مثلاً: درست اللغة قليلاً من قبل، وحابب/ة أرجع أبدأ من جديد.'))}"></textarea></div><button class="button" type="submit">${L('Continue in WhatsApp','أكمل في واتساب')}${icon('chat')}</button><p class="form-note">${L('Nothing is sent from this website. WhatsApp opens your message; you decide when to send it.','لا يُرسل أيّ شيء من هذا الموقع. تفتح رسالتك في واتساب، وتقرّر أنت متى ترسلها.')}</p></form><div id="enquiry-fallback">${enquiryAside(lang)}</div><p class="notice">${L('Planning to stop by? Contact us first to arrange a suitable time.','ناوي تزورنا؟ تواصل معنا أوّلاً لترتيب وقت مناسب.')}</p></div></div></section>
${visit(lang)}
<section class="section faq-section"><div class="wrap faq-grid"><div><p class="eyebrow">${L('Before you get in touch','قبل التواصل')}</p><h2>${L('A few useful details.','تفاصيل بتفيدك.')}</h2></div>${faq(lang,generalFaq(lang).filter((q,i)=>i!==1))}</div></section>`;
}

const generic = {
  home: {
    en:['Language courses in Tripoli | Carol for Language Courses','Explore '+engine.languageList(profile)+' courses at Carol in Tripoli, Lebanon. Find your language and contact us on WhatsApp.','Home'],
    ar:['دورات لغات في طرابلس | كارول لتعليم اللغات','تعلّم '+engine.languageList(profile,'ar')+' في كارول لتعليم اللغات بطرابلس، لبنان. تعرّف على الدورات وتواصل معنا عبر واتساب واعرف موقع المركز.','الرئيسية']
  },
  courses: {
    en:['Language courses in Tripoli, Lebanon | Carol','Discover '+engine.languageList(profile)+' at Carol in Tripoli, Lebanon. Explore each course and enquire directly with the center.','Courses'],
    ar:['دورات لغات في طرابلس، لبنان | كارول','اكتشف دورات اللغات في كارول بطرابلس، لبنان. لكلّ من '+engine.languageList(profile,'ar')+' صفحة خاصة لتعرف المزيد وتتواصل مع المركز.','الدورات']
  },
  about: {
    en:['About our language center in Tripoli | Carol','Meet Carol for Language Courses, a welcoming language tutoring center on Beshara Khoury Street in Tripoli, Lebanon. Discover our center and its languages.','Our center'],
    ar:['عن مركز كارول في طرابلس | كارول لتعليم اللغات','تعرّف على كارول لتعليم اللغات، مركز بأجواء دافئة وعائلية في شارع بشارة الخوري بطرابلس، لبنان. اكتشف المركز واللغات التي يقدّمها.','عن المركز']
  },
  contact: {
    en:['Contact & directions in Tripoli | Carol for Language Courses','Contact Carol for Language Courses on +961 78 957 735. Find us on Beshara Khoury Street in Tripoli, next to KFC, in the Boulevard Pharmacy building.','Visit & contact'],
    ar:['التواصل والعنوان في طرابلس | كارول لتعليم اللغات','تواصل مع كارول لتعليم اللغات على +961 78 957 735. موقعنا في شارع بشارة الخوري بطرابلس، بجانب KFC، في مبنى صيدلية بولفار.','العنوان والتواصل']
  }
};

for (const lang of ['en','ar']) {
  const homeCrumb = {name:generic.home[lang][2],file:file('home',lang)};
  for (const slug of ['home','courses',...courses.map(c=>c.slug),'about','contact']) {
    const c = courses.find(c=>c.slug===slug), info = c ? [c[lang].title,c[lang].description,c[lang].name] : generic[slug][lang];
    const page = {file:file(slug,lang),lang,kind:c?'course':slug,title:info[0],description:info[1],label:info[2],versions:{en:file(slug,'en'),ar:file(slug,'ar')},crumbs:[homeCrumb]};
    if (c) { page.crumbs.push({name:generic.courses[lang][2],file:file('courses',lang)}); page.course={name:localized(lang,c.en.name+' courses at Carol','دورة '+c.ar.name+' في كارول'),description:c[lang].intro,language:c.en.name}; }
    if (slug==='home' || slug==='courses') page.courseIndex=courses.map(item=>({name:item[lang].name,file:file(item.slug,lang)}));
    if (slug!=='home') page.crumbs.push({name:page.label,file:page.file});
    pages.push(page);
    const body = c ? courseBody(page,c) : ({home,directory,about,contact}[slug==='courses'?'directory':slug])(page);
    write(page.file,layout(page,body));
  }
}

const missing={file:'404.html',lang:'en',kind:'404',title:'Page not found | Carol for Language Courses',description:'Find your way back to the language courses and contact details at Carol in Tripoli, Lebanon.',label:'Page not found',versions:{en:'index.html',ar:'index-ar.html'},crumbs:[],noindex:true};
let missingHtml=layout(missing,`<section class="wrap not-found"><img src="logo-mark.webp" width="95" height="95" alt=""><p class="eyebrow" style="justify-content:center">404 · Carol for Language Courses</p><h1>Let’s find your way back.</h1><p class="lead">This page could not be found. Our language courses are a good place to begin.</p><div class="button-row">${button('index.html','Go to the homepage')}${button('courses.html','Explore courses','book','secondary')}</div><p lang="ar" dir="rtl" style="margin-top:30px">لم نجد هذه الصفحة. <a href="index-ar.html">العودة إلى الصفحة الرئيسية بالعربية</a></p></section>`,false);
// GitHub can serve 404.html for nested missing routes. Give its links a stable base.
// At launch, the settings tool writes an absolute <base>. Before that, the inline
// bootstrap uses the project root on github.io and / on a custom domain.
missingHtml=missingHtml.replace('<meta charset="utf-8">','<meta charset="utf-8">\n'+marker('404-BASE',engine.base404(profile)));
pages.push(missing); write('404.html',missingHtml);
write('page-index.json',engine.json(pages)+'\n');
write('business-profile.json',engine.json(profile)+'\n');
write('sitemap.xml',engine.sitemap(pages,profile));
write('robots.txt',engine.robots(profile));
write('llms.txt',engine.llms(pages,profile));
write('site.webmanifest',engine.manifest(profile));
write('.nojekyll','');
const customDomain = engine.cname(profile);
if (customDomain) write('CNAME',customDomain);
else if (fs.existsSync(path.join(root,'CNAME'))) fs.unlinkSync(path.join(root,'CNAME'));
const files = [...pages.map(p=>p.file),'style.css','script.js','logo-mark.webp','logo-wordmark.webp','favicon.png','apple-touch-icon.png','icon-192.png','icon-512.png','social-preview.jpg','site.webmanifest','robots.txt','sitemap.xml','llms.txt','.nojekyll','business-profile.json','page-index.json','site-files.json','site-settings.html','site-settings.css','site-settings.js','site-engine.js','site-content.js','build-site.mjs','README.txt','SEO-NOTES.md'];
if (customDomain) files.push('CNAME');
files.push('SECURITY-AND-RECOVERY.txt');
write('site-files.json',engine.json({id:profile.id,files:files.sort()})+'\n');
console.log('Built '+pages.filter(p=>!p.noindex).length+' public pages, a 404 page, and SEO files.');
console.log(profile.baseUrl?'Public base URL: '+profile.baseUrl:'Domain not set. Open site-settings.html when the real URL is available.');
