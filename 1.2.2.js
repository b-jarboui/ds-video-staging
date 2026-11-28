const ID = "1.2.2", T = "Relative Frequency Explained Simply | Statistics for Beginners", D = "What is relative frequency? Learn to turn a count into a share or percentage of the whole group, so groups of different sizes compare fairly.\n\nIn this lesson:\n0:00 Is three customers a lot?\n0:31 Shares of a bar\n0:58 Writing shares as percents\n1:45 Count divided by total\n3:25 Comparing two groups\n3:55 Trap: always check the total\n\nLesson 1.2.2 of a free, complete data science course for beginners, no maths background needed: statistics, probability, machine learning, deep learning and large language models, one small step at a time, with clear animations and everyday examples.\nNext lesson: 1.2.3\n\nInteractive version with a 'Try it' simulation for every lesson: https://b-jarboui.github.io/data-science-course/\n\n#Statistics #RelativeFrequency #DataScience", PL = 'Chapter 1.2 ', TAGS = ["relative frequency", "relative frequency table", "how to calculate relative frequency", "percentage frequency", "frequency vs relative frequency", "statistics for beginners"];
const sleep = ms => new Promise(r => setTimeout(r, ms)); const log = [];
const base = 'https://b-jarboui.github.io/ds-video-staging/';
const man = await (await fetch(base + ID + '.json', { cache: 'no-store' })).json();
const blobs = []; for (const p of man.parts) { const r = await fetch(base + p, { cache: 'no-store' }); if (!r.ok) throw new Error('part ' + p + ' ' + r.status); blobs.push(await r.blob()); }
const file = new File(blobs, ID + '.mp4', { type: 'video/mp4' }); if (file.size !== man.size) throw new Error('size mismatch');
const input = document.querySelector('input[type="file"]'); if (!input) throw new Error('open the upload dialog first');
const dt = new DataTransfer(); dt.items.add(file); input.files = dt.files; input.dispatchEvent(new Event('change', { bubbles: true }));
for (let i = 0; i < 60 && !document.querySelector('ytcp-uploads-dialog #textbox'); i++) await sleep(500);
await sleep(3000);
const boxes = [...document.querySelectorAll('ytcp-uploads-dialog #textbox')];
const setBox = (el, txt) => { el.focus(); document.execCommand('selectAll', false, null); document.execCommand('insertText', false, txt); };
setBox(boxes[0], T); await sleep(400); setBox(boxes[1], D); await sleep(400);
document.querySelector('ytcp-video-metadata-playlists ytcp-dropdown-trigger, ytcp-video-metadata-playlists [role="button"]')?.click(); await sleep(1500);
const cb = [...document.querySelectorAll('tp-yt-paper-dialog [role="checkbox"], tp-yt-paper-dialog ytcp-checkbox-lit')].find(e => ((e.closest('label, li, ytcp-ve')||e.parentElement).innerText + ' ').includes(PL));
log.push('playlist:' + !!cb); if (cb && cb.getAttribute('aria-checked') !== 'true') cb.click(); await sleep(500);
[...document.querySelectorAll('tp-yt-paper-dialog ytcp-button, tp-yt-paper-dialog button')].find(b => /^(OK|Done|Terminé)$/i.test(b.innerText.trim()) && b.offsetParent)?.click(); await sleep(800);
document.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]')?.click(); await sleep(500);
document.querySelector('ytcp-uploads-dialog #toggle-button')?.click(); await sleep(1500);
const ti = document.querySelector('#tags-container input');
if (ti && TAGS.length) { ti.focus(); ti.value = TAGS.join(', ') + ','; ti.dispatchEvent(new Event('input', { bubbles: true })); await sleep(300); ti.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true })); await sleep(800); }
log.push('tags:' + !!ti);
for (let k = 0; k < 3; k++) { document.querySelector('#next-button')?.click(); await sleep(2000); }
document.querySelector('tp-yt-paper-radio-button[name="PUBLIC"]')?.click(); await sleep(1000);
const link = (document.body.innerText.match(/https:\/\/youtu\.be\/\S+/)||[''])[0];
for (let i = 0; i < 300 && /Importation|Uploading/.test(document.querySelector('ytcp-video-upload-progress')?.innerText || ''); i++) await sleep(2000);
document.querySelector('#done-button')?.click(); await sleep(5000);
[...document.querySelectorAll('tp-yt-paper-dialog ytcp-button, tp-yt-paper-dialog button')].find(b => /^(Fermer|Close)$/i.test(b.innerText.trim()) && b.offsetParent)?.click();
return (cb ? 'OK ' : 'CHECK ') + ID + ' ' + link + ' | ' + log.join(' ')