/* =====================================================================
   Durva outreach template · engine
   Reads window.SITE (see /template/index.html) and builds the whole page.
   Only company + contact + role are required. Every other section has a
   default written with {tokens}, so it reads personal out of the box;
   add your own array/object for any section to override it.
   Tokens: {company} {short} {first} {full} {role} {industry} {audience} {city}
   ===================================================================== */
(() => {
  const S = window.SITE || {};
  const C = S.company || {}, P = S.contact || {}, R = S.role || {};

  /* ---------------- Durva (same on every site) ---------------- */
  const DURVA = {
    name: 'Durva Thakkar', first: 'Durva',
    email: 'durvathakker7@gmail.com',
    linkedin: 'https://www.linkedin.com/in/durvathakkar/',
    site: 'https://durvathakkar.com',
    photo: '/assets/durva-avatar.jpg',
    journey: [
      ['Customer Service Specialist', 'The Home Depot Canada', 'Dec 2025 – now', '#f59e5b'],
      ['Customer Experience Associate', 'TD', 'Jul – Nov 2025', '#4caf72'],
      ['Outreach Specialist', 'Bsquaree · Toronto', 'Dec 2024 – May 2025', '#8f6cf0'],
      ['Content Writer', 'Missive Digital · India', 'May – Jul 2024', '#5b7cfa'],
      ['Sales & Marketing Intern', 'Rewynd Snacks · India', 'May – Jul 2023', '#ef6aa8'],
    ],
    school: [
      ['PG, Information Systems Business Analysis', 'George Brown Polytechnic', '2026'],
      ['PG Certificate, Digital & Content Marketing', 'York University', '2025'],
      ['BBA, Entrepreneurship', 'GLS University', '2024'],
    ],
  };

  /* ---------------- tokens ---------------- */
  const tok = {
    company: C.name || 'your company',
    short: C.short || C.name || 'you',
    first: P.first || (P.full || 'there').split(' ')[0],
    full: P.full || P.first || '',
    role: R.title || 'Marketing Coordinator',
    industry: C.industry || 'your industry',
    audience: C.audience || 'your customers',
    city: C.city || 'Canada',
  };
  const fill = s => String(s ?? '').replace(/\{(\w+)\}/g, (m, k) => (k in tok ? tok[k] : m));
  // fill tokens, then tidy: no "Co.." when a name ends in a period, and titles start with a capital
  const t = s => fill(s).replace(/(?<!\.)\.\.(?!\.)/g, '.');
  const cap = s => { const x = t(s); return x.charAt(0).toUpperCase() + x.slice(1); };
  const initials = s => String(s || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const pic = (src, name, cls = '') => src
    ? `<img class="${cls}" src="${src}" alt="" loading="lazy" onerror="this.outerHTML='<div class=&quot;mono ${cls}&quot;>${initials(name)}</div>'">`
    : `<div class="mono ${cls}">${initials(name)}</div>`;
  const logo = () => C.logo ? `<img src="${C.logo}" alt="">` : `<div class="mono">${initials(C.short || C.name)}</div>`;
  const handle = (C.handle || (C.short || C.name || 'brand')).toLowerCase().replace(/[^a-z0-9]+/g, '');

  /* ---------------- brand colours ---------------- */
  const col = C.colors || {};
  const root = document.documentElement.style;
  const lum = hex => { const h = hex.replace('#', ''); const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h; const [r, g, b] = [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4)); return .2126 * r + .7152 * g + .0722 * b; };
  if (col.primary) root.setProperty('--brand', col.primary);
  if (col.secondary) root.setProperty('--brand-2', col.secondary);
  try { root.setProperty('--brand-ink', col.onPrimary || (lum(col.primary || '#2f7a4f') > .45 ? '#121211' : '#ffffff')); } catch (e) {}

  document.title = t(S.title || 'Durva × {company}');
  const setMeta = (sel, attr, val) => { let m = document.querySelector(sel); if (!m) { m = document.createElement('meta'); m.setAttribute(attr.split('=')[0], attr.split('=')[1]); document.head.appendChild(m); } m.content = val; };
  setMeta('meta[name="description"]', 'name=description', t(S.description || 'A personalised hello for {first} at {company}, from Durva Thakkar.'));
  setMeta('meta[property="og:title"]', 'property=og:title', document.title);

  /* ---------------- default content (override any of these in SITE) ---------------- */
  const DEF = {
    note: [
      "I came across {company} and couldn't stop thinking about what I'd do with a brand like yours. A regular cover letter felt way too boring for that, so I built you this instead.",
      "It's a small preview of how I'd show up for the {role} role: the plan, the ideas, and some sample work in your colours. You're the main character.",
    ],
    noticed: [
      ['💬', 'Your story deserves a louder mic', "{company} already has a clear point of view. I'd make sure it sounds the same on LinkedIn, Instagram, email and in person, every single week.", '#dfe7ff'],
      ['🧑‍🤝‍🧑', 'Your people are the content', "The team behind {company} is the most believable story you have. Faces, wins and behind-the-scenes moments earn trust faster than any ad.", '#fde3d3'],
      ['🎯', '{audience} want proof', "Real customer stories, clear answers and useful tips turn followers into leads. I'd build a steady rhythm of content that proves it, not just says it.", '#e3f3d9'],
    ],
    fit: [
      ['Create content', 'Content across every channel', "<b>I write fast, in your voice.</b> At Missive Digital I turned client briefs into SEO content strategies and wrote the posts, blogs and pages to match."],
      ['Plan', 'Keep the calendar full and on time', "<b>I love a good content calendar.</b> I built and ran one at Rewynd Snacks so campaigns went out on schedule, across teams."],
      ['Customers', 'Understand what {audience} need', "<b>I've been on the front line.</b> At TD and The Home Depot I listen to real customers every day and spot the patterns behind their questions."],
      ['Growth', 'Support leads and sales', "<b>I've done the outreach.</b> At Bsquaree I researched audiences, ran discovery calls and used what I heard to shape our messaging."],
      ['Measure', 'Know what is working', "<b>I speak data.</b> My postgrad in Information Systems Business Analysis means GA4, UTMs and simple dashboards, with a report you'll actually read."],
      ['Team', 'Work well with everyone', "<b>I'm the easy one to work with.</b> Calm when priorities shift, clear in writing, and happy to own the details so the team can move."],
    ],
    plan: [
      { days: 'Days 1–30', title: 'Listen & learn', text: "Get to know {company}, the team, and {audience} before touching a single post.", pct: 33, items: [
        ['Meet the team', 'Sit with marketing, sales and leadership to learn goals, wins and pain points.'],
        ['Audit the channels', 'Review what has worked on LinkedIn, Instagram, email and the website.'],
        ['Talk to customers', 'Interview a handful of {audience} to hear their words, not ours.'],
        ['Set up tracking', 'UTMs, GA4 goals and one simple dashboard, so every idea is measurable.'],
        ['Ship quick wins', 'Two or three easy posts or fixes to build momentum in week two.'],
      ] },
      { days: 'Days 31–60', title: 'Build the engine', text: 'Turn what I learned into a rhythm the team can count on.', pct: 66, items: [
        ['Four-week calendar', 'A shared content calendar across every channel, planned a month ahead.'],
        ['LinkedIn rhythm', 'A weekly cadence for the company page and the leaders who want to post.'],
        ['First customer story', 'One strong case study, cut into a post, a carousel and an email.'],
        ['Email refresh', 'A monthly newsletter {audience} look forward to opening.'],
        ['Report v1', 'A one-page monthly report: what worked, what we learned, what is next.'],
      ] },
      { days: 'Days 61–90', title: 'Scale what works', text: 'Double down on the winners and plan the next quarter.', pct: 100, items: [
        ['Double down', 'More of the formats that performed, less of the ones that did not.'],
        ['Launch a campaign', 'One integrated campaign around a key moment in {industry}.'],
        ['Repurpose', 'Turn the best pieces into short video, carousels and blog posts.'],
        ['Next-quarter plan', 'A clear plan with goals, budget asks and the ideas I would test next.'],
      ] },
    ],
    ideas: [
      { ch: 'LinkedIn', e: '🎤', title: 'The people behind {short}', text: 'A weekly series spotlighting one person at {company}: what they do, what they love, one tip.', why: 'People trust people. Team stories make the brand feel human and give employees something to share.', measure: 'Reach, employee reshares and profile visits.', c: '#dfe7ff' },
      { ch: 'Instagram', e: '🎬', title: 'A day at {short}', text: 'Short behind-the-scenes reels: the prep, the process, the small moments customers never see.', why: 'Behind-the-scenes content is easy to make, feels authentic and keeps the feed alive between big launches.', measure: 'Saves, shares and follower growth.', c: '#fde3ec' },
      { ch: 'Email', e: '☕', title: 'The 5-minute {industry} brief', text: 'A monthly newsletter for {audience}: one insight, one tip, one thing we are proud of.', why: 'Email is the channel you own. A short, useful letter builds a habit and a warm list for sales.', measure: 'Open rate, clicks and replies.', c: '#fff1c9' },
      { ch: 'Blog / SEO', e: '🔎', title: 'Answer the real questions', text: 'A helpful hub that answers the questions {audience} ask every week, in plain language.', why: 'Every answer is a search result, a sales asset and a post waiting to happen.', measure: 'Organic traffic, time on page and leads from content.', c: '#e3f3d9' },
      { ch: 'Case study', e: '🏆', title: 'Before & after, for real', text: 'One customer, one problem, one result, told as a story with their own words.', why: 'Proof beats promises. One good story can fuel a month of content and give sales something to send.', measure: 'Downloads, sales usage and deals influenced.', c: '#efe7ff' },
      { ch: 'Events', e: '🤝', title: 'Coffee & conversations', text: 'A small, recurring meetup for {audience} in {city}, hosted by the {short} team.', why: 'Offline builds trust faster than anything online, and every event creates a week of content.', measure: 'Sign-ups, attendance and follow-up meetings.', c: '#ffe3d1' },
    ],
    samples: {
      linkedin: {
        text: "Behind every project at {company} is a person who cares a little too much about getting it right. ✨\n\nSo we're starting something new: every week, one person from our team, what they do, and the one thing they wish more {audience} knew.\n\nFirst up next week. Any guesses who? 👀\n\n#TeamSpotlight #{handle}",
        kicker: 'New weekly series', headline: 'The people behind <em>{short}</em>', foot: 'Meet the team →',
      },
      instagram: {
        caption: "3 things {audience} ask us every week, answered in 30 seconds. Save this one for later 📌",
        slides: [
          { k: 'Swipe →', h: '3 questions <em>{audience}</em> ask us every week' },
          { k: '01 / 03', list: ['Where do I start?', 'What does it really cost?', 'How fast will I see results?'] },
          { k: 'Your turn', h: 'Got a question? <em>Drop it below.</em>' },
        ],
      },
      email: {
        subject: 'The 5-minute {industry} brief ☕',
        preview: 'One insight, one tip, and one thing we are proud of this month.',
        headline: 'This month at {short}',
        body: ["Hi there,", "Here's your five-minute catch-up from the {company} team:"],
        list: ['<b>The insight:</b> what we learned from our customers this month.', '<b>The tip:</b> one small change you can make this week.', '<b>The proud moment:</b> a win from the team, with a face behind it.'],
        cta: 'Read the full brief',
      },
      blog: {
        title: 'Five questions {audience} ask about {industry}, answered',
        dek: 'Plain-language answers to the questions we hear every week, from the people who answer them.',
        outline: ['Where should I start?', 'What does it actually cost?', 'How long does it take?', 'What should I avoid?', 'Who can I ask for help?'],
        read: '6 min read',
      },
    },
    process: [
      ['☕', '20-minute chat', "We talk about {company}'s goals and what the {role} role needs to deliver.", 'Week 0'],
      ['🔍', 'Quick look-around', 'I review your channels and come back with three things I would do first.', 'Week 1'],
      ['🗺️', 'A clear plan', 'We agree on a 90-day plan, the rhythm, and how we will measure it.', 'Week 2'],
      ['🚀', 'Ship & measure', 'Content goes out, we learn what works, and we do more of it every month.', 'Ongoing'],
    ],
    closing: "Would love 20 minutes to hear what you're building at {company} and how I could help. Coffee's on me ☕",
  };
  const pick = (k) => (S[k] !== undefined ? S[k] : DEF[k]);
  const samples = Object.assign({}, DEF.samples, S.samples || {});

  /* ---------------- tools (icon paths from simple-icons, CC0) ---------------- */
  const ICON = {
    hubspot: 'M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z',
    canva: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z',
    figma: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    instagram: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077',
    googleanalytics: 'M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z',
    wordpress: 'M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0',
  };
  const TOOLS = [['hubspot', 'HubSpot', '#FF7A59', '#ffe4da'], ['canva', 'Canva', '#00C4CC', '#d6f6f7'], ['figma', 'Figma', '#F24E1E', '#fde2d8'], ['linkedin', 'LinkedIn', '#0A66C2', '#dbe9f8'], ['instagram', 'Instagram', '#E4405F', '#fde0e6'], ['googleanalytics', 'Google Analytics', '#E37400', '#ffecd2'], ['wordpress', 'WordPress', '#21759B', '#dcebf2']];

  /* ---------------- sections ---------------- */
  const head = (tag, h, p, c) => `<div class="t-head rv"><span class="t-tag" ${c ? `style="--c:${c}"` : ''}><i></i>${t(tag)}</span><h2 class="t-h2">${t(h)}</h2>${p ? `<p>${t(p)}</p>` : ''}</div>`;
  const on = k => S.sections?.[k] !== false;
  const NAV = [];
  const out = [];

  // hero
  const note = pick('note');
  out.push(`
  <header class="t-hero" id="top">
    <span class="t-blob clay" style="--t:7s; width:90px; height:90px; left:4%; top:18%; background: var(--brand-2)"></span>
    <span class="t-blob clay" style="--t:6s; width:54px; height:54px; left:46%; top:14%; background: var(--lime)"></span>
    <span class="t-blob clay" style="--t:8s; width:120px; height:120px; right:-30px; bottom:12%; background: var(--brand)"></span>
    <div class="wrap t-hero-in">
      <div>
        <span class="t-kick fade" style="--d:.1s"><span class="av">${pic(P.photo, P.full || tok.first)}</span>${t(S.kicker || 'Made for {first} · {company}')}</span>
        <h1>
          <span class="ln"><span style="--d:.15s">${t(S.headline?.[0] || 'I could tell you.')}</span></span>
          <span class="ln"><span class="hl" style="--d:.3s">${t(S.headline?.[1] || 'Or I could')}</span></span>
          <span class="ln"><span class="hl" style="--d:.45s">${t(S.headline?.[2] || 'show you.')}</span></span>
        </h1>
        <p class="lead fade" style="--d:.8s"><b>Hey ${t('{first}')} 👋</b> ${t(note[0])}</p>
        ${note.slice(1).map((n, i) => `<p class="lead fade" style="--d:${.9 + i * .1}s">${t(n)}</p>`).join('')}
        <div class="cta fade" style="--d:1.1s">
          <a class="t-btn brand" href="#plan">See the plan ↓</a>
          <a class="t-btn white" href="#chat">Let's chat ☕</a>
        </div>
      </div>
      <div class="t-duo" id="look">
        <span class="lbl a">${t('{first}')} · P1</span>
        <div class="card them">${pic(P.photo, P.full || tok.first)}</div>
        <div class="card me" role="img" aria-label="Durva, turning to follow your cursor"><div class="lk-layer"></div><div class="lk-layer"></div></div>
        <span class="lbl b">Durva · P2</span>
        <span class="heart" aria-hidden="true">🤝</span>
      </div>
    </div>
  </header>`);

  // reel
  if (on('reel')) {
    NAV.push(['reel', 'Reel']);
    out.push(`<section class="t-sec wrap t-reel" id="reel">
      ${head('Now showing', 'When the to-do list <span class="hl">piles up…</span>', 'A tiny 8-bit story, starring you (and me as backup).', 'var(--brand-2)')}
      <div class="screen rv"><canvas id="reelCv" width="960" height="480" role="img" aria-label="${t('Pixel animation: photos of {first} and Durva turn into 8-bit characters. {first} is swarmed by tasks, Durva runs in saying I got you, clears them, and they cheer together.')}"></canvas><span class="rec">Starring ${t('{first}')}</span><button class="t-btn white replay" type="button" id="replay">↻ Replay</button></div>
    </section>`);
  }

  // noticed
  if (on('noticed')) {
    NAV.push(['noticed', `Why ${tok.short}`]);
    out.push(`<section class="t-sec wrap" id="noticed">
      ${head('Why {short}', 'What I would <span class="hl">lean into</span> at {company}.', 'Three things that excite me about the brand, and where I think the biggest wins are.')}
      <div class="t-three">${pick('noticed').map(([e, h, p, c], i) => `<article class="t-note clay rv" style="--c:${c || 'var(--brand-soft)'}; --d:${i * .08}s"><div class="n">${e}</div><h3>${cap(h)}</h3><p>${t(p)}</p></article>`).join('')}</div>
    </section>`);
  }

  // fit
  if (on('fit')) {
    NAV.push(['fit', 'The role']);
    out.push(`<section class="t-sec wrap" id="fit"><div class="t-fit"><div class="glow"></div>
      ${head('The role, mapped', 'What the {role} role needs. <span class="hl">What I bring.</span>', R.url ? `Straight from <a href="${R.url}" target="_blank" rel="noopener">the job post</a>, matched to things I have actually done.` : 'Straight from the job post, matched to things I have actually done.', 'var(--lime)')}
      <div class="t-rows">${pick('fit').map(([k, need, how], i) => `<div class="t-row rv" style="--d:${i * .05}s"><div class="need"><small>${t(k)}</small>${t(need)}</div><span class="arrow">→</span><div class="how">${t(how)}</div></div>`).join('')}</div>
    </div></section>`);
  }

  // plan
  if (on('plan')) {
    NAV.push(['plan', 'Plan']);
    const plan = pick('plan');
    out.push(`<section class="t-sec wrap" id="plan">
      ${head('The plan', 'My first <span class="hl">90 days</span> at {short}.', 'Listen first, build a rhythm, then scale what works. Tap through each phase.', 'var(--brand-2)')}
      <div class="t-tabs rv" role="tablist">${plan.map((p, i) => `<button role="tab" aria-selected="${i === 0}" data-ph="${i}">${t(p.days)}</button>`).join('')}</div>
      ${plan.map((p, i) => `<div class="t-phase ${i === 0 ? 'on' : ''}" data-phase="${i}" role="tabpanel">
        <div class="big clay"><div><div class="days">${t(p.days)}</div><h3 style="margin-top:10px">${t(p.title)}</h3></div><p>${t(p.text)}</p><div class="meter"><b style="--w:${p.pct || Math.round((i + 1) / plan.length * 100)}%"></b></div></div>
        <ul>${p.items.map(([b, s], j) => `<li data-n="${String(j + 1).padStart(2, '0')}" style="--i:${j}"><b>${t(b)}</b><span>${t(s)}</span></li>`).join('')}</ul>
      </div>`).join('')}
    </section>`);
  }

  // ideas
  if (on('ideas')) {
    NAV.push(['ideas', 'Ideas']);
    const ideas = pick('ideas');
    const chans = [...new Set(ideas.map(x => x.ch))];
    out.push(`<section class="t-sec wrap" id="ideas">
      ${head('Ideas', 'Ideas I would pitch <span class="hl">on day one.</span>', 'Tap a card to flip it: why it works, and how we would measure it.', '#f59bbd')}
      <div class="t-filter rv"><button aria-pressed="true" data-f="*">All</button>${chans.map(c => `<button aria-pressed="false" data-f="${c}">${c}</button>`).join('')}</div>
      <div class="t-ideas">${ideas.map((x, i) => `<button class="t-idea rv" type="button" data-ch="${x.ch}" style="--c:${x.c || 'var(--brand-soft)'}; --d:${(i % 3) * .07}s" aria-label="${t(x.title)}: flip for details">
        <div class="in">
          <div class="face front clay"><div class="ch"><span>${x.ch}</span><em>${x.e || '✨'}</em></div><h3>${cap(x.title)}</h3><p>${t(x.text)}</p><span class="turn"><i>↻</i>Why it works</span></div>
          <div class="face back"><b>Why it works</b><p>${t(x.why)}</p><b>How we'd measure it</b><p>${t(x.measure)}</p><span class="turn"><i>↻</i>Flip back</span></div>
        </div></button>`).join('')}</div>
    </section>`);
  }

  // samples
  if (on('samples')) {
    NAV.push(['samples', 'Samples']);
    const li = samples.linkedin, ig = samples.instagram, em = samples.email, bl = samples.blog;
    const gfx = (k, h, f, cls = '') => `<div class="gfx ${cls}"><span class="g-blob" style="width:46cqi;height:46cqi;right:-12cqi;top:-10cqi"></span><span class="g-blob" style="width:18cqi;height:18cqi;right:22cqi;top:26cqi;opacity:.6"></span><div class="g-in"><div class="g-k">${t(k)}</div><div class="g-h">${cap(h)}</div><div class="g-f"><span>${t('{company}')}</span><span>${t(f || '{short} →')}</span></div></div></div>`;
    const slide = (s, i) => s.list
      ? `<div class="gfx paper"><div class="g-in"><div class="g-k">${t(s.k)}</div><div class="g-list">${s.list.map((q, j) => `<div><i>${j + 1}</i>${t(q)}</div>`).join('')}</div><div class="g-f"><span>@${handle}</span><span>Save 📌</span></div></div></div>`
      : gfx(s.k, s.h, i === 0 ? 'Swipe →' : 'Comment 💬', i === 0 ? 'alt' : '');
    out.push(`<section class="t-sec wrap" id="samples">
      ${head('Sample work', 'I already made <span class="hl">a few for you.</span>', 'Drafted in your colours and dropped into each platform, so you can picture it live.', 'var(--brand)')}
      <div class="t-work">
        <div class="rv"><p class="t-mock-label"><i style="background:#0A66C2">in</i>LinkedIn · company page</p>
          <article class="t-mock">
            <div class="li-top"><div class="lg">${logo()}</div><div><b>${t('{company}')}</b><span>${C.followers ? C.followers + ' followers' : cap('{industry}') + ' · ' + t('{city}')}</span><span>Now · 🌐</span></div></div>
            <div class="li-text short" id="liText">${t(li.text)}</div><div class="li-text" style="padding-top:0"><span class="more" id="liMore">…see more</span></div>
            ${gfx(li.kicker, li.headline, li.foot)}
            <div class="li-stats"><span>👍❤️👏 248</span><span>31 comments · 12 reposts</span></div>
            <div class="li-bar"><span>👍 Like</span><span>💬 Comment</span><span>🔁 Repost</span><span>➤ Send</span></div>
          </article>
        </div>
        <div class="rv" style="--d:.08s"><p class="t-mock-label"><i style="background:linear-gradient(45deg,#feda75,#d62976,#4f5bd5)">◎</i>Instagram · carousel</p>
          <article class="t-mock">
            <div class="ig-top"><div class="lg">${logo()}</div><b>${handle}</b></div>
            <div class="ig-slides"><div class="ig-track" id="igTrack">${ig.slides.map(slide).join('')}</div><button class="ig-nav p" type="button" aria-label="Previous slide">‹</button><button class="ig-nav n" type="button" aria-label="Next slide">›</button></div>
            <div class="ig-dots" id="igDots">${ig.slides.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div>
            <div class="ig-icons">♡ 💬 ➤</div>
            <p class="ig-cap"><b>${handle}</b>${t(ig.caption)}</p>
          </article>
        </div>
        <div class="rv"><p class="t-mock-label"><i style="background:var(--ink)">✉</i>Email · monthly newsletter</p>
          <article class="t-mock">
            <div class="em-top"><i></i><i></i><i></i></div>
            <div class="em-head"><b>${t(em.subject)}</b><span>From: ${t('{company}')} · ${t(em.preview)}</span></div>
            <div class="em-body">
              <div class="em-hero"><small>${t('{company}')}</small><h4>${t(em.headline)}</h4></div>
              ${em.body.map(p => `<p>${t(p)}</p>`).join('')}
              <ol>${em.list.map(l => `<li>${t(l)}</li>`).join('')}</ol>
              <a class="em-cta" href="#samples">${t(em.cta)} →</a>
            </div>
          </article>
        </div>
        <div class="rv" style="--d:.08s"><p class="t-mock-label"><i style="background:var(--brand)">¶</i>Blog · SEO article</p>
          <article class="t-mock">
            <div class="bl-hero"><span class="g-blob clay" style="width:34cqi;height:34cqi;right:-6cqi;top:-8cqi;background:var(--brand)"></span><span class="g-blob clay" style="width:16cqi;height:16cqi;right:26cqi;bottom:10cqi;background:var(--brand-2)"></span><div class="gh">${t(bl.title).replace(/(\w+)$/, '<em>$1</em>')}</div></div>
            <div class="bl-body"><div class="meta">${t('{company}')} blog · ${t(bl.read)}</div><h4>${t(bl.title)}</h4><p>${t(bl.dek)}</p><ol>${bl.outline.map(o => `<li>${t(o)}</li>`).join('')}</ol></div>
          </article>
        </div>
      </div>
    </section>`);
  }

  // people (optional)
  if (S.people?.length) {
    NAV.push(['people', 'People']);
    out.push(`<section class="t-sec wrap" id="people">
      ${head('People', 'Leaders I would <span class="hl">love to help.</span>', 'The people whose voices could carry {company} further. Tap anyone for the post ideas I would bring them.', '#8fb0ff')}
      <div class="t-people">${S.people.map((x, i) => `<button class="t-person clay rv" type="button" data-person="${i}" style="--d:${(i % 4) * .06}s"><div class="ph">${pic(x.photo, x.name)}</div><div><b>${x.name}</b><span>${t(x.role)}</span></div><span class="go">${(x.ideas || []).length} post ideas →</span></button>`).join('')}</div>
    </section>`);
  }

  // brand voices (optional)
  if (S.voices?.length) {
    NAV.push(['voice', 'Voice']);
    out.push(`<section class="t-sec wrap" id="voice">
      ${head('Brand voice', 'One brand, <span class="hl">a few voices.</span>', 'How I would flex the tone for each audience while it still sounds like {short}.', 'var(--brand-2)')}
      <div class="t-voices">${S.voices.map((v, i) => `<article class="t-voice clay rv" style="background:${v.c || 'var(--brand-soft)'}; --d:${i * .08}s"><h3>${t(v.name)}</h3><div class="q">"${t(v.sample)}"</div><p>${t(v.text)}</p></article>`).join('')}</div>
    </section>`);
  }

  // process
  if (on('process')) {
    NAV.push(['process', 'Next steps']);
    out.push(`<section class="t-sec wrap" id="process">
      ${head('How we would work', 'From hello to <span class="hl">first results.</span>', 'No big-bang overhaul. A simple, steady path that starts with a conversation.', 'var(--lime)')}
      <div class="t-steps">${pick('process').map(([e, h, p, w], i) => `<article class="t-step clay rv" style="--d:${i * .07}s"><div class="e">${e}</div><h3>${t(h)}</h3><p>${t(p)}</p><span class="when">${t(w)}</span></article>`).join('')}</div>
    </section>`);
  }

  // about
  if (on('about')) {
    NAV.push(['about', 'About me']);
    out.push(`<section class="t-sec wrap" id="about">
      ${head('About me', 'Hi, I\'m Durva. <span class="hl">Nice to meet you.</span>', null, '#d8e46c')}
      <div class="t-about">
        <article class="t-me clay rv">
          <div class="pic"><img src="${DURVA.photo}" alt="Durva Thakkar"></div>
          <h3>A marketer who makes brands feel human.</h3>
          <p>${t(S.aboutLine || "Content, outreach and customer experience across India and Canada, and a fresh postgrad in Information Systems Business Analysis. I say yes to the coffee chat, I write like people talk, and I care a lot about the customer on the other side.")}</p>
          <div class="links"><a class="t-btn dark" href="${DURVA.site}" target="_blank" rel="noopener">My site & stories ↗</a><a class="t-btn white" href="${DURVA.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div>
        </article>
        <article class="t-journey clay rv" style="--d:.08s">
          <h4>Where I've been</h4>
          <ol>${DURVA.journey.map(([r, co, w, c]) => `<li><i style="--c:${c}"></i><div><b>${r}</b><span>${co}</span></div><em>${w}</em></li>`).join('')}</ol>
          <h4 style="margin-top:22px">Where I learned</h4>
          <ol>${DURVA.school.map(([d, s, y]) => `<li><i style="--c:var(--lime)"></i><div><b>${s}</b><span>${d}</span></div><em>${y}</em></li>`).join('')}</ol>
          <div class="t-tools">${TOOLS.map(([k, n, c, bg]) => `<span class="t-tool" style="--tc:${c}; --tb:${bg}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICON[k]}"/></svg>${n}</span>`).join('')}<span class="t-tool" style="--tb:#ecebe6">🤖 ChatGPT & Claude</span></div>
        </article>
      </div>
    </section>`);
  }

  // final
  NAV.push(['chat', "Let's chat"]);
  const meet = S.meeting || {};
  out.push(`<section class="wrap" id="chat">
    <div class="t-final clay rv">
      <span class="t-blob clay" style="--t:6s; width:90px; height:90px; left:6%; top:12%; background: var(--brand-2)"></span>
      <span class="t-blob clay" style="--t:7.5s; width:60px; height:60px; right:9%; top:18%; background: var(--lime)"></span>
      <span class="t-blob clay" style="--t:5s; width:130px; height:130px; right:4%; bottom:-40px; background: #fff; opacity:.35"></span>
      <h2>Let's chat, ${t('{first}')}? <span class="hand">👋</span></h2>
      <p>${t(pick('closing'))}</p>
      <div class="cta">
        <a class="t-btn white" href="${meet.url || DURVA.linkedin}" target="_blank" rel="noopener">${t(meet.label || 'Message me on LinkedIn')}</a>
        <a class="t-btn dark" href="mailto:${DURVA.email}?subject=${encodeURIComponent(t('Hi Durva, from {company}'))}">✉ ${DURVA.email}</a>
      </div>
      <p class="sign">All the best,<b>Durva</b></p>
    </div>
  </section>
  <footer class="wrap t-foot"><span>Made for ${t('{first}')} at ${t('{company}')} by Durva Thakkar</span><span>A little different from a cover letter ✨</span></footer>`);

  /* ---------------- mount ---------------- */
  const app = document.getElementById('app');
  app.innerHTML = `<div class="t-prog" id="prog"></div>
  <nav class="t-nav" aria-label="Sections"><a class="t-logo" href="#top"><span class="dots"><b></b><b></b></span>Durva × ${t('{short}')}</a>
    <ul>${NAV.filter(n => n[0] !== 'chat').slice(0, 7).map(([id, l]) => `<li><a href="#${id}" data-nav="${id}">${l}</a></li>`).join('')}</ul>
    <a class="t-btn dark" href="#chat">Let's chat ☕</a></nav>` + out.join('') + `
  <dialog class="t-dlg" id="dlg"><div class="top"><b id="dlgT"></b><button class="x" type="button" data-close aria-label="Close">×</button></div><div class="body" id="dlgB"></div></dialog>`;

  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  /* reveal */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.rv').forEach(el => io.observe(el));

  /* nav highlight + progress */
  const navIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach(s => navIO.observe(s));
  const prog = $('#prog');
  addEventListener('scroll', () => { const h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; }, { passive: true });

  /* dialog */
  const dlg = $('#dlg');
  const openDlg = (title, html) => { $('#dlgT').textContent = title; $('#dlgB').innerHTML = html; dlg.showModal(); };
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });

  /* plan tabs */
  $$('.t-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.t-tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
    $$('.t-phase').forEach(p => p.classList.toggle('on', p.dataset.phase === b.dataset.ph));
  }));

  /* ideas: flip + filter */
  $$('.t-idea').forEach(c => c.addEventListener('click', () => c.classList.toggle('flip')));
  $$('.t-filter button').forEach(b => b.addEventListener('click', () => {
    $$('.t-filter button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('.t-idea').forEach(c => { c.hidden = b.dataset.f !== '*' && c.dataset.ch !== b.dataset.f; if (!c.hidden) c.classList.add('in'); });
  }));

  /* linkedin see more */
  $('#liMore')?.addEventListener('click', e => { $('#liText').classList.remove('short'); e.target.remove(); });

  /* instagram carousel */
  const track = $('#igTrack');
  if (track) {
    let i = 0; const n = track.children.length;
    const go = d => { i = (i + d + n) % n; track.style.transform = `translateX(${-i * 100}%)`; $$('#igDots i').forEach((dot, k) => dot.classList.toggle('on', k === i)); };
    $('.ig-nav.p').addEventListener('click', () => go(-1)); $('.ig-nav.n').addEventListener('click', () => go(1));
    let sx = null; track.addEventListener('pointerdown', e => sx = e.clientX); track.addEventListener('pointerup', e => { if (sx !== null && Math.abs(e.clientX - sx) > 40) go(e.clientX < sx ? 1 : -1); sx = null; });
  }

  /* people */
  $$('[data-person]').forEach(b => b.addEventListener('click', () => {
    const x = S.people[+b.dataset.person];
    openDlg(`${x.name} · ${t(x.role)}`, (x.why ? `<p>${t(x.why)}</p>` : '') + (x.ideas || []).map(id => typeof id === 'string' ? `<div class="idea"><b>${t(id)}</b></div>` : `<div class="idea"><b>${t(id[0])}</b><span>${t(id[1])}</span></div>`).join(''));
  }));

  /* ---------------- portrait that follows the cursor ---------------- */
  (() => {
    const wrap = $('#look'), card = wrap?.querySelector('.card.me'); if (!card) return;
    const FRAMES = 21, MID = (FRAMES - 1) / 2, FOLLOW = 7, RETURN = 2.6;
    const [base, blend] = card.querySelectorAll('.lk-layer');
    let cur = MID, tgt = MID, rate = RETURN, raf = 0, last = 0;
    const pos = f => (f / (FRAMES - 1)) * 100 + '% 0';
    const paint = () => { const lo = Math.floor(cur), hi = Math.min(FRAMES - 1, lo + 1); base.style.backgroundPosition = pos(lo); blend.style.backgroundPosition = pos(hi); blend.style.opacity = (cur - lo).toFixed(3); };
    const tick = now => { const dt = Math.min(.05, (now - last) / 1000); last = now; cur += (tgt - cur) * (1 - Math.exp(-rate * dt)); if (Math.abs(tgt - cur) < .002) { cur = tgt; raf = 0; paint(); return; } paint(); raf = requestAnimationFrame(tick); };
    const go = (f, r) => { tgt = Math.max(0, Math.min(FRAMES - 1, f)); rate = r; if (still.matches) { cur = tgt = MID; paint(); return; } if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const aim = x => { const r = card.getBoundingClientRect(), cx = r.left + r.width / 2, room = x < cx ? cx : innerWidth - cx; const k = Math.max(-1, Math.min(1, (x - cx) / Math.max(room, 1))); go(MID + Math.sign(k) * (1 - Math.pow(1 - Math.abs(k), 2)) * MID, FOLLOW); };
    const home = () => go(MID, RETURN);
    addEventListener('pointermove', e => { if (e.pointerType === 'mouse' || e.buttons) aim(e.clientX); }, { passive: true });
    addEventListener('pointerdown', e => aim(e.clientX), { passive: true });
    addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') home(); });
    addEventListener('pointercancel', home);
    document.documentElement.addEventListener('mouseleave', home);
    addEventListener('blur', home);
    paint();
  })();

  /* ---------------- pixel reel ---------------- */
  (() => {
    const cv = $('#reelCv'); if (!cv) return;
    const g = cv.getContext('2d');
    const SC = 3, W = 320, H = 160, GY = 132, KX = 150, DX = 70;
    const px = S.contact?.pixel || {};
    const brand = (col.primary || '#2f7a4f');
    /* ---- tiny sprite kit (same characters as the other pages) ---- */
    const pad = rows => rows.map(r => r.padEnd(14, '.').slice(0, 14));
    const TOP = pad(["....HHHHHH....", "..HHHHHHHHHH..", ".HHHHHHHHHHHH.", ".HHHHSSSSSSH..", ".HHHSSSESSES..", ".HHHSSSSSSSS..", ".HHHSSSSSMMS..", ".HHHHSSSSSS...", ".HHHHHTTTT....", ".HHHTTTTTTT...", ".HHTTTTTTTTT..", ".HHTTTTTTTTT..", ".HHTTTTTTTTT..", "..HTTTTTTTT...", "...TTTTTTTT...", "...TTTTTTTT...", "...BBBBBBBB..."]);
    const TOP_SHORT = pad(["...HHHHHHH....", "..HHHHHHHHHH..", "..HHHHHHHHHH..", "..HHSSSSSSHH..", "..HSSSESSESS..", "...SSSSSSSSS..", "...SSSSSMMSS..", "....SSSSSS....", ".....TTTT.....", "...TTTTTTTT...", "..TTTTTTTTTT..", "..TTTTTTTTTT..", "..TTTTTTTTTT..", "..TTTTTTTTTT..", "...TTTTTTTT...", "...TTTTTTTT...", "...BBBBBBBB..."]);
    const TOP_D = pad(["...HHHhHHH....", "..HHhHHHHHHH..", ".HHHHHHHHhHHH.", ".HhHHSSSSSSHH.", ".HHHSGGGSGGG..", ".HHHSGEGSGEG..", ".HHhSSSSSMMS..", "HHHHHSSSSSSH..", "HhHHHWWWWHHhH.", "HHHTTTWWTTTHH.", ".HTTTTTWTTTTH.", "..TTTTTTTTTT..", "..TtTTTTTTtT..", "...TTTTtTTTT..", "...TTTTTTTT...", "...TTTTTTTT...", "...tttttttt..."]);
    const LEGS = {
      stand: pad(["...PPPPPPPP...", "...PPPPPPPP...", "...PPPppPPP...", "..PPPPppPPPP..", "..PPPPppPPPP..", "..PPPP..PPPP..", "..PPPP..PPPP..", ".PPPPP..PPPPP.", ".PPPPP..PPPPP.", ".PPPPP..PPPPP.", "..FFF....FFF.."]),
      run1: pad(["...PPPPPPPP...", "...PPPPPPPP...", "..PPPPppPPPP..", "..PPPP..PPPPP.", ".PPPP....PPPP.", ".PPPP....PPPP.", "PPPP......PPPP", "PPPP......PPPP", "PPP........PPP", "FFF........FFF", ".............."]),
      run2: pad(["...PPPPPPPP...", "...PPPPPPPP...", "...PPPPPPPP...", "...PPPPPPP....", "...PPPPPPP....", "..PPPPPPPPP...", "..PPPPPPPPP...", "..PPPPPPPPP...", "..PPPPPPPPP...", "..FFFF.FFF....", ".............."]),
    };
    const PAL = {
      K: { top: px.hairStyle === 'short' ? TOP_SHORT : TOP, H: px.hair || '#2a1a14', S: px.skin || '#f2cdb4', E: px.eyes || '#2f2a26', M: '#c9565e', T: px.top || brand, B: px.top2 || 'rgba(0,0,0,.35)', P: px.pants || '#2a2a33', p: '#20202a', F: '#1a1a1a' },
      D: { top: TOP_D, H: '#1c1310', h: '#3b2a22', S: '#d9a47e', G: '#111111', E: '#2a1a10', M: '#b0525a', W: '#151515', T: '#e9e1d3', t: '#cfc4b2', P: '#2a2a33', p: '#20202a', F: '#1a1a1a' },
    };
    const LEGMAP = { stand: 'stand', runA: 'run1', runB: 'run2', windup: 'stand', throw: 'run1', jump: 'run2', wave: 'stand', cheer: 'stand' };
    const HANDS = { stand: [[9, 17]], runA: [[12, 15]], runB: [[3, 16]], windup: [[5, -3]], throw: [[15, 9]], jump: [[11, -4]], wave: [[13, 0]], cheer: [[14, -4], [-1, -3]] };
    const Rr = (x, y, w, h, c) => { g.fillStyle = c; g.fillRect(Math.round(x), Math.round(y), w, h); };
    const F = { A: '010101111101101', B: '110101110101110', C: '011100100100011', D: '110101101101110', E: '111100110100111', F: '111100110100100', G: '011100101101011', H: '101101111101101', I: '111010010010111', J: '001001001101010', K: '101101110101101', L: '100100100100111', M: '101111111101101', N: '110101101101101', O: '010101101101010', P: '110101110100100', Q: '010101101110011', R: '110101110101101', S: '011100010001110', T: '111010010010010', U: '101101101101111', V: '101101101101010', W: '101101111111101', X: '101101010101101', Y: '101101010010010', Z: '111001010100111', '0': '111101101101111', '1': '010110010010111', '2': '110001010100111', '3': '110001010001110', '4': '101101111001001', '5': '111100110001110', '6': '011100111101111', '7': '111001010010010', '8': '111101111101111', '9': '111101111001110', '+': '000010111010000', '!': '010010010000010', '-': '000000111000000', '.': '000000000000010', ',': '000000000010100', "'": '010010000000000', '?': '110001010000010', ':': '000010000010000', '&': '010101010101011', ' ': '000000000000000' };
    const text = (s, x, y, c, sc = 1, al = 'l') => { s = String(s).toUpperCase(); const w = s.length * 4 * sc - sc; if (al === 'c') x -= w / 2; x = Math.round(x); y = Math.round(y); g.fillStyle = c; for (let i = 0; i < s.length; i++) { const gl = F[s[i]]; if (!gl) continue; for (let k = 0; k < 15; k++) if (gl[k] === '1') g.fillRect(x + i * 4 * sc + (k % 3) * sc, y + Math.floor(k / 3) * sc, sc, sc); } return w; };
    const stext = (s, x, y, c, sc = 1, al = 'l') => { text(s, x + sc, y + sc, '#000', sc, al); text(s, x, y, c, sc, al); };
    const line = (x0, y0, x1, y1, c) => { x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1); const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let e = dx + dy; g.fillStyle = c; for (let n = 0; n < 200; n++) { g.fillRect(x0, y0, 2, 2); if (x0 === x1 && y0 === y1) break; const e2 = 2 * e; if (e2 >= dy) { e += dy; x0 += sx; } if (e2 <= dx) { e += dx; y0 += sy; } } };
    function actor(pal, ax, feet, pose, t) {
      g.save(); g.translate(Math.round(ax), Math.round(feet)); g.scale(2, 2);
      const top = -28;
      Rr(2, -1, 10, 1, 'rgba(0,0,0,.3)');
      const hands = HANDS[pose].map(([hx, hy]) => [hx + (pose === 'wave' ? Math.round(Math.sin(t * 14)) : 0), hy]);
      const sh = [[9, 10], [3, 10]], behind = hands[0][1] < 8;
      const arms = () => hands.forEach(([hx, hy], i) => { line(sh[i][0], top + sh[i][1], hx, top + hy, pal.T); Rr(hx, top + hy, 2, 2, pal.S); });
      if (behind) arms();
      pal.top.forEach((row, r) => { for (let i = 0; i < 14; i++) { const ch = row[i]; if (ch !== '.' && pal[ch]) Rr(i, top + r, 1, 1, pal[ch]); } });
      LEGS[LEGMAP[pose]].forEach((row, r) => { for (let i = 0; i < 14; i++) { const ch = row[i]; if (ch !== '.') Rr(i, top + 17 + r, 1, 1, pal[ch]); } });
      if (!behind) arms();
      g.restore();
    }
    /* ---- photos for the intro ---- */
    const load = src => new Promise(res => { if (!src) return res(null); const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
    let photos = [null, null];
    Promise.all([load(P.photo), load(DURVA.photo)]).then(p => photos = p);
    const small = document.createElement('canvas'), sg = small.getContext('2d');
    function photo(im, name, cx, cy, size, block, alpha) {
      g.save(); g.globalAlpha = alpha; g.setTransform(1, 0, 0, 1, 0, 0);
      const x = cx * SC - size / 2, y = cy * SC - size / 2;
      g.fillStyle = '#fff'; g.fillRect(x - 8, y - 8, size + 16, size + 16);
      if (im) {
        const s = Math.min(im.naturalWidth, im.naturalHeight), sx = (im.naturalWidth - s) / 2, sy = (im.naturalHeight - s) / 4;
        const n = Math.max(4, Math.round(size / block));
        small.width = small.height = n; sg.imageSmoothingEnabled = true; sg.drawImage(im, sx, sy, s, s, 0, 0, n, n);
        g.imageSmoothingEnabled = false; g.drawImage(small, 0, 0, n, n, x, y, size, size);
      } else {
        g.fillStyle = brand; g.fillRect(x, y, size, size); g.fillStyle = '#fff'; g.font = `700 ${size * .38}px Geist, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(initials(name), x + size / 2, y + size / 2); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
      }
      g.restore();
    }
    /* ---- scene ---- */
    const bg = t => {
      const sky = g.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#5c7cff'); sky.addColorStop(1, '#a7bcff'); g.fillStyle = sky; g.fillRect(0, 0, W, H);
      for (let i = 0; i < 4; i++) { const x = ((i * 110 - t * 6) % 400 + 400) % 400 - 40, y = 16 + (i % 2) * 18; Rr(x + 6, y, 18, 6, '#fff'); Rr(x, y + 5, 30, 7, '#fff'); }
      g.fillStyle = '#3aa35a'; g.beginPath(); g.ellipse(50, GY + 2, 60, 34, 0, Math.PI, 0); g.fill(); g.beginPath(); g.ellipse(270, GY + 2, 50, 26, 0, Math.PI, 0); g.fill();
      for (let x = 0; x < W; x += 16) { Rr(x, GY, 16, 28, '#c8773a'); Rr(x, GY, 16, 1, '#f0a868'); Rr(x, GY + 9, 16, 1, '#8f4a1c'); Rr(x, GY + 18, 16, 1, '#8f4a1c'); Rr(x + 8, GY + 1, 1, 8, '#8f4a1c'); Rr(x + 3, GY + 10, 1, 8, '#8f4a1c'); Rr(x + 15, GY, 1, 28, '#8f4a1c'); }
    };
    const TASKS = [0.2, 0.6, 1.0, 1.4, 1.8].map((t0, i) => ({ t0, x0: 330 + i * 26, stop: 194 + i * 24 }));
    const HIT = [4.4, 4.9, 5.4, 5.9, 6.4];
    const ease = u => 1 - Math.pow(1 - Math.min(1, Math.max(0, u)), 2);
    const task = (x, t) => { g.save(); g.translate(Math.round(x), GY - 22); g.scale(2, 2); const st = Math.floor(t * 6) % 2; Rr(0, 0, 12, 11, '#fbfbf6'); Rr(8, 0, 4, 4, '#cfd6e6'); Rr(0, 0, 12, 1, '#999'); Rr(0, 0, 1, 11, '#999'); Rr(11, 3, 1, 8, '#999'); Rr(2, 6, 8, 1, brand); Rr(3, 3, 2, 2, '#1c1512'); Rr(7, 3, 2, 2, '#1c1512'); Rr(2, 2, 3, 1, '#1c1512'); Rr(7, 2, 3, 1, '#1c1512'); Rr(st ? 1 : 2, 11, 3, 1, '#1c1512'); Rr(st ? 8 : 7, 11, 3, 1, '#1c1512'); g.restore(); };
    const bubble = (s, x, y, c) => { const w = s.length * 4 + 10; Rr(x - w / 2, y - 13, w, 13, '#1c1512'); Rr(x - w / 2 + 1, y - 12, w - 2, 11, '#fff'); Rr(x - 2, y, 4, 3, '#1c1512'); text(s, x, y - 9, c, 1, 'c'); };
    const who = (tok.first || 'YOU').toUpperCase().slice(0, 10);
    const INTRO = 3.6, LOOP = INTRO + 11;
    function frame(T) {
      const all = T % LOOP;
      g.setTransform(SC, 0, 0, SC, 0, 0); g.imageSmoothingEnabled = false;
      if (all < INTRO) {
        bg(T);
        Rr(0, 0, W, H, 'rgba(18,18,17,.55)');
        stext('STARRING', W / 2, 12, '#fff', 2, 'c');
        const block = all < 1.8 ? 1 : 1 + Math.pow((all - 1.8) / 1.2, 2) * 24;
        const a = all < 3 ? 1 : Math.max(0, 1 - (all - 3) / .4);
        photo(photos[0], P.full || who, KX + 14, 70, 170, block, a);
        photo(photos[1], 'Durva', DX + 14, 70, 170, block, a);
        g.setTransform(SC, 0, 0, SC, 0, 0);
        if (all < 3) { stext(who, KX + 14, 104, '#FFC83D', 1, 'c'); stext('DURVA', DX + 14, 104, '#FFC83D', 1, 'c'); }
        if (all > 2.9) { actor(PAL.K, KX, GY, 'stand', all); actor(PAL.D, DX, GY, 'wave', all); }
        return;
      }
      const t = all - INTRO;
      bg(T);
      TASKS.forEach((k, i) => {
        if (t < HIT[i]) { const x = k.x0 + (k.stop - k.x0) * ease((t - k.t0) / 1.4); if (t >= k.t0) task(x, t); }
        else if (t < HIT[i] + .8) { const u = (t - HIT[i]) / .8; for (let a = 0; a < 8; a++) Rr(k.stop + 12 + Math.cos(a * Math.PI / 4) * u * 20, GY - 12 + Math.sin(a * Math.PI / 4) * u * 20, 3, 3, a % 2 ? '#FFC83D' : '#fff'); stext('+100', k.stop + 12, GY - 36 - u * 12, '#fff', 1, 'c'); }
      });
      let kp = 'stand', ky = 0;
      if (t > 1.4 && t < 3.6) kp = Math.floor(t * 4) % 2 ? 'wave' : 'stand';
      if (t >= 7) { kp = 'cheer'; ky = -Math.abs(Math.sin(t * 6)) * 6; }
      actor(PAL.K, KX, GY + ky, kp, t);
      let dx = -40, dp = 'stand', dy = 0;
      if (t < .6) { dx = DX; dp = 'wave'; }
      else if (t < 1.2) { dx = DX - (DX + 40) * ease((t - .6) / .6); dp = Math.floor(t * 10) % 2 ? 'runA' : 'runB'; }
      else if (t >= 3) { const u = Math.min(1, (t - 3) / .8); dx = -40 + (DX + 40) * u; dp = u < 1 ? (Math.floor(t * 10) % 2 ? 'runA' : 'runB') : 'stand'; }
      if (t >= 3.8 && t < 4.2) { dy = -Math.sin((t - 3.8) / .4 * Math.PI) * 14; dp = 'jump'; }
      HIT.forEach(h => { if (t >= h - .45 && t < h - .25) dp = 'windup'; else if (t >= h - .25 && t < h - .05) dp = 'throw'; });
      if (t >= 7) { dp = 'cheer'; dy = -Math.abs(Math.sin(t * 6 + 1)) * 6; }
      if (t < 1.2 || t >= 3) actor(PAL.D, dx, GY + dy, dp, t);
      HIT.forEach((h, i) => { const u = (t - (h - .25)) / .25; if (u < 0 || u >= 1) return; const sx = DX + 30, sy = GY - 38, ex = TASKS[i].stop + 10, ey = GY - 14; const x = sx + (ex - sx) * u, y = sy + (ey - sy) * u - Math.sin(u * Math.PI) * 24; g.save(); g.translate(Math.round(x), Math.round(y)); g.rotate(u * Math.PI * 4); Rr(-5, -1, 10, 3, '#FFC83D'); Rr(-5, -1, 3, 3, '#fff'); g.restore(); });
      if (t > 1.6 && t < 3.4) bubble('SO MANY TASKS!', KX + 14, GY - 64, '#1c1512');
      if (t > 3.4 && t < 5.2) bubble('I GOT YOU!', DX + 14, GY - 64, brand);
      if (t >= 7 && t < 9.4) { stext('TEAM!', W / 2, 30, Math.floor(t * 6) % 2 ? '#FFC83D' : '#fff', 4, 'c'); }
      if (t >= 9.4) { Rr(0, 0, W, H, 'rgba(18,18,17,.75)'); stext('BETTER TOGETHER.', W / 2, 62, '#fff', 2, 'c'); stext(who + ' + DURVA', W / 2, 84, '#FFC83D', 1, 'c'); }
    }
    let visible = false, t0 = performance.now();
    new IntersectionObserver(es => es.forEach(e => { const was = visible; visible = e.isIntersecting; if (visible && !was && !still.matches) t0 = performance.now(); })).observe(cv);
    $('#replay')?.addEventListener('click', () => { t0 = performance.now(); if (still.matches) frame(0); });
    (function loop(now) {
      if (still.matches) { frame(INTRO + 7.6); setTimeout(() => requestAnimationFrame(loop), 500); return; }
      if (visible) frame((now - t0) / 1000);
      requestAnimationFrame(loop);
    })(performance.now());
    frame(0);
  })();

  /* ---------------- intro splash (once per visit) ---------------- */
  (() => {
    if (S.intro === false || still.matches) return;
    const key = 'tpl_intro:' + location.pathname;
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1'); } catch (e) {}
    const el = document.createElement('div'); el.className = 't-intro'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Intro');
    el.innerHTML = `<div class="grid">${Array.from({ length: 96 }, () => `<span style="--dl:${(Math.random() * .45).toFixed(2)}s"></span>`).join('')}</div>
      <button class="skip" type="button">Skip →</button>
      <div class="stage"><div class="pair"><div class="stk a">${pic(P.photo, P.full || tok.first)}</div><span class="x">×</span><div class="stk b"><img src="${DURVA.photo}" alt=""></div></div>
      <h1>Hey ${t('{first}')}, <span>I made you something.</span></h1><p>${t('A little website for {company}. Takes 3 minutes.')}</p>
      <button class="t-btn white go" type="button">Open it ▶</button></div>`;
    document.body.appendChild(el); document.body.classList.add('t-lock');
    let done = false;
    const open = () => { if (done) return; done = true; el.classList.add('open'); document.body.classList.remove('t-lock'); setTimeout(() => el.remove(), 1100); };
    el.querySelector('.go').addEventListener('click', open); el.querySelector('.skip').addEventListener('click', open);
    addEventListener('keydown', e => { if (e.key === 'Escape' || e.key === 'Enter') open(); }, { once: true });
    setTimeout(open, 7000);
  })();

  /* ---------------- template guide (demo only) ---------------- */
  if (S.guide) {
    const fab = document.createElement('button'); fab.className = 't-guide-fab'; fab.type = 'button'; fab.textContent = '⚙ How to use this template';
    document.body.appendChild(fab);
    fab.addEventListener('click', () => { dlg.classList.add('t-guide'); openDlg('Make a new one in 3 minutes', S.guide); });
    dlg.addEventListener('close', () => dlg.classList.remove('t-guide'));
  }

  /* ---------------- visit notifications (EmailJS) ----------------
     Page + interaction data only: no IP, geolocation or ISP lookups.
     INACTIVE until SITE.tracking has all three keys. ?notrack mutes your own browser. */
  (() => {
    const T = S.tracking || {};
    const configured = Boolean(T.publicKey && T.serviceId && T.templateId);
    const qs = new URLSearchParams(location.search);
    const store = fn => { try { return fn(); } catch (e) { return null; } };
    if (qs.has('notrack')) store(() => localStorage.setItem('dt_notrack', '1'));
    if (qs.has('track')) store(() => localStorage.removeItem('dt_notrack'));
    const muted = store(() => localStorage.getItem('dt_notrack')) === '1';
    const isLocal = /^(localhost|127\.0\.0\.1|)$/.test(location.hostname) || location.protocol === 'file:';
    if (configured && !isLocal) { const sdk = document.createElement('script'); sdk.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'; sdk.onload = () => window.emailjs && emailjs.init({ publicKey: T.publicKey }); document.head.appendChild(sdk); }
    function send(event_type, extra = {}) {
      if (muted) return;
      const params = { event_type, page_url: location.href, page_title: document.title, company: tok.company, contact: tok.full || tok.first, visit_time: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, referrer: document.referrer || 'Direct / no referrer', button_clicked: '', section: '', ...extra };
      if (isLocal || !configured) { console.info('[visit notification · not sent: ' + (isLocal ? 'local preview' : 'keys not set') + ']', params); return; }
      if (window.emailjs) emailjs.send(T.serviceId, T.templateId, params).catch(() => {});
    }
    const openKey = 'dt_opened:' + location.pathname;
    if (!store(() => sessionStorage.getItem(openKey))) { store(() => sessionStorage.setItem(openKey, '1')); send('Page Opened'); }
    const recent = new Map(); let sent = 0;
    document.addEventListener('click', e => {
      const el = e.target.closest('button, a'); if (!el) return;
      const label = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
      const now = Date.now(); if (!label || now - (recent.get(label) || 0) < 30000 || sent >= 25) return;
      recent.set(label, now); sent++;
      const sec = el.closest('section[id], header, footer');
      send('Button Clicked', { button_clicked: label, section: sec?.id || '' });
    }, true);
  })();
})();
