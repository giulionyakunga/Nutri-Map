const service = require('./producers.service');
const { getPagination } = require('../../utils/pagination');

async function list(req, res, next) {
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
  try {
    const producer = await service.create(req.body, req.user.sub);
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
