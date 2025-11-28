// controllers/baseController.js
export class BaseController {
  constructor(model) {
    this.model = model;
  }

  // Create a new document
  create = async (req, res) => {
    try {
      const document = await this.model.create(req.body);
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Get all documents with filtering, pagination, and sorting
  getAll = async (req, res) => {
    try {
      const {
        page = '1',
        limit = '10',
        sort = '-createdAt',
        search,
        ...filters
      } = req.query;

      const query = { ...filters };

      if (search && typeof search === 'string') {
        query.$text = { $search: search };
      }

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const sortBy = typeof sort === 'string' ? sort : '-createdAt';

      const documents = await this.model
        .find(query)
        .sort(sortBy)
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum)
        .exec();

      const total = await this.model.countDocuments(query).exec();

      res.json({
        data: documents,
        pagination: {
          current: pageNum,
          pages: Math.ceil(total / limitNum),
          total,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Get single document by ID
  getOne = async (req, res) => {
    try {
      const document = await this.model.findById(req.params.id).exec();
      if (!document) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Update a document by ID
  update = async (req, res) => {
    try {
      const document = await this.model
        .findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        })
        .exec();

      if (!document) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }

      res.json(document);
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Delete a document by ID
  delete = async (req, res) => {
    try {
      const document = await this.model.findByIdAndDelete(req.params.id).exec();

      if (!document) {
        res.status(404).json({ message: 'Document not found' });
        return;
      }

      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}
