// resubmit-kobo.js
// Run with: node resubmit-kobo.js

const KOBO_BASE_URL = 'https://kf.kobotoolbox.org';   // EU: https://eu.kobotoolbox.org
const KOBO_TOKEN = 'efcbe55609323fae7442cad564a90d4e57ba7f2a';
const FORM_UID      = 'a3cfYtYiAW5BnDJ7TreKeU';      // your form's asset UID

const YOUR_API_URL  = 'https://nutrimap.telabs.co.tz/api/producers/';
const YOUR_API_TOKEN = process.env.MY_API_TOKEN;     // if your API needs auth

async function fetchAllKoboSubmissions() {
  const submissions = [];
  let nextUrl = `${KOBO_BASE_URL}/api/v2/assets/${FORM_UID}/data/?format=json&page_size=1000`;

  while (nextUrl) {
    console.log(`Fetching: ${nextUrl}`);

    const res = await fetch(nextUrl, {
      headers: {
        Authorization: `Token ${KOBO_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Kobo API ${res.status}: ${body.slice(0, 200)}`);
    }

    const page = await res.json();

    // Kobo v2 returns either an array or { results: [...] } depending on endpoint
    const batch = Array.isArray(page) ? page : page.results ?? [];
    submissions.push(...batch);

    // Follow pagination. Kobo now returns a `next` cursor; stop when null.
    nextUrl = page.next ?? null;

    console.log(`  got ${batch.length} (total ${submissions.length})`);
  }

  return submissions;
}

async function postToMyApi(submission) {
  const res = await fetch(YOUR_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(YOUR_API_TOKEN ? { Authorization: `Bearer ${YOUR_API_TOKEN}` } : {}),
    },
    body: JSON.stringify(submission),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`My API ${res.status}: ${body.slice(0, 200)}`);
  }

  return res.status === 204 ? null : res.json().catch(() => null);
}

(async () => {
  if (!KOBO_TOKEN) {
    console.error('KOBO_API_TOKEN is not set. Add it to your environment first.');
    process.exit(1);
  }

  try {
    const submissions = await fetchAllKoboSubmissions();
    console.log(`Total submissions to resubmit: ${submissions.length}`);

    let ok = 0;
    let failed = 0;

    for (const sub of submissions) {
      const id = sub._id ?? sub._uuid ?? '(unknown)';
      try {
        await postToMyApi(sub);
        ok++;
        console.log(`✅ ${id}`);
      } catch (err) {
        failed++;
        console.error(`❌ ${id}: ${err.message}`);
      }
    }

    console.log(`\nDone. Success: ${ok}, Failed: ${failed}`);
  } catch (err) {
    console.error('Fatal:', err.message);
    process.exit(1);
  }
})();