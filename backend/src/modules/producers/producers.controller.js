const service = require('./producers.service');
const { getPagination } = require('../../utils/pagination');

// async function list(req, res, next) {
//   try {
//     const { page, limit, offset } = getPagination(req.query);
//     const filters = {
//       regionId: req.query.regionId,
//       districtId: req.query.districtId,
//       wardId: req.query.wardId,
//       status: req.query.status,
//       verificationStatus: req.query.verificationStatus,
//       search: req.query.search,
//       bbox: req.query.bbox
//     };
//     res.json(await service.list({ page, limit, offset, filters }));
//   } catch (err) {
//     next(err);
//   }
// }

const UAParser = require('ua-parser-js');

async function list(req, res, next) {

    // Get client information
    const parser = new UAParser(req.headers['user-agent']);
    const client = parser.getResult();

    console.log('authorization: ', req.headers['authorization'])
    console.log('authorization2: ', req.headers.authorization)
    
    const content_type = req.headers['content-type'];
    const x_api_key = req.headers['x-api-key'];
    const x_client_id = req.headers['x-client-id'];
    const x_client_secret = req.headers['x-client-secret'];
    
    console.log('X-API-Key: ', x_api_key)
    console.log('X-Client-Secret: ', x_client_secret)
    console.log('X-Client-Id: ', x_client_id)
    console.log('Content-Type: ', content_type)

    if( (x_api_key !== 'KmKLj8h6kyhr76845hdfjkDlp78jDvcSW45yfwq') || (x_client_secret !== '1f405763b1b74b1aa12588838f9c9d26') 
      || (x_client_id !== '7fc0f750e0k419c4b469ef197fe3Lc430f01') || (content_type !== 'application/json')) {

      console.log({ error: 'Missing Required Headers'});

      return res.status(403).json({
        success: false,
        message: 'Access denied!'
      });

      // return;
    } else {
      console.log({ error: 'Has Required Headers'});
    }

    console.log('Client Information:', {
      ip: req.ip,
      browser: client.browser.name,
      version: client.browser.version,
      os: client.os.name,
      device: client.device.type || 'Desktop',
      userAgent: req.headers['user-agent']
    });

    const header = req.headers.authorization || '';
    console.log('headers.authorization: ', header)
    console.log('headers: ', req.headers)
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      // return res.status(401).json({ error: 'Missing bearer token' });
      console.log({ error: 'Missing  X-API-Key'});
      // return res.status(401).json({ error: 'Missing  X-API-Key'});
    }

    // Allow only Firefox, Edge, and Chrome
    const allowedBrowsers = ['Firefox', 'Edge', 'Chrome'];

    if (!client.browser.name.includes('Firefox') && !client.browser.name.includes('Edge') && !client.browser.name.includes('Chrome') && !client.browser.name.includes('Safari') && !client.browser.name.includes('Samsung')) {
      return res.status(403).json({
        success: false,
        message: 'Access denied!'
      });
      // return;
    }

    try {
        const { page, limit, offset } = getPagination(req.query);

        const filters = {
            regionId: req.query.regionId,
            districtId: req.query.districtId,
            wardId: req.query.wardId,
            status: req.query.status,
            verificationStatus: req.query.verificationStatus,
            search: req.query.search,
            bbox: req.query.bbox
        };

        res.json(await service.list({ page, limit, offset, filters }));

    } catch (err) {
        next(err);
    }
}

// npm install ua-parser-js

async function geojson(req, res, next) {
  try {
    res.json(
      await service.listAsGeoJson({
        bbox: req.query.bbox,
        status: req.query.status,
        regionId: req.query.regionId,
        districtId: req.query.districtId,
        wardId: req.query.wardId,
        verificationStatus: req.query.verificationStatus
      })
    );
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const producer = await service.getById(req.params.id);
    if (!producer) return res.status(404).json({ error: 'Producer not found' });
    res.json(producer);
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    const profile = await service.getFullProfile(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Producer not found' });
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  console.log('Kobo submission:', req.body);
  return res.status(403).json({
    success: false,
    message: 'Access denied!'
  });

  try {
    // const producer = await service.create(req.body, req.user.sub);
    const producer = await service.create(req.body, 5);
    res.status(201).json(producer);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const producer = await service.update(req.params.id, req.body);
    if (!producer) return res.status(404).json({ error: 'Producer not found' });
    res.json(producer);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Producer not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, geojson, getOne, getProfile, create, update, remove };
