export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({
      error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
    });
  }

  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    'Content-Type': 'application/json'
  };

  try {
    if (req.method === 'GET') {
      const query = new URLSearchParams({
        select: 'id,name,type,url,created_at',
        order: 'created_at.asc'
      });

      const response = await fetch(`${supabaseUrl}/rest/v1/media?${query.toString()}`, {
        headers,
        method: 'GET'
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          error: data?.message || 'Failed to load shared media.'
        });
      }

      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { name, type, url } = req.body || {};

      if (!name || !type || !url) {
        return res.status(400).json({ error: 'Missing required media fields.' });
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/media`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, type, url })
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({
          error: data?.message || 'Failed to save shared media.'
        });
      }

      return res.status(200).json(Array.isArray(data) ? data : [data]);
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id;

      if (!id) {
        return res.status(400).json({ error: 'Missing media id.' });
      }

      const deleteUrl = new URL(`${supabaseUrl}/rest/v1/media`);
      deleteUrl.searchParams.set('id', `eq.${id}`);

      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers
      });

      if (!response.ok) {
        const data = await response.text();
        return res.status(response.status).json({
          error: data || 'Failed to delete shared media.'
        });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected server error.'
    });
  }
}
