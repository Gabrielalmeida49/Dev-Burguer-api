// import * as Yup from 'yup';
// import Category from '../models/Category.js';

// class CategoryController {
// 	async store(request, response) {
// 		const schema = Yup.object({
// 			name: Yup.string().required(),
// 		});

// 		try {
// 			schema.validateSync(request.body, { abortEarly: false });
// 		} catch (err) {
// 			return response.status(400).json({ error: err.errors });
// 		}

// 		const { name } = request.body;
// 		const { filename } = request.file;

// 		const existingCategory = await Category.findOne({
// 			where: {
// 				name,
// 			},
// 		});

// 		if (existingCategory) {
// 			return response.status(400).json({ error: 'Category already exists' });
// 		}

// 		const newCategory = await Category.create({
// 			name,
// 			path: filename,
// 		});

// 		return response.status(201).json(newCategory);
// 	}

// 	async update(request, response) {
// 		const schema = Yup.object({
// 			name: Yup.string(),
// 		});

// 		try {
// 			schema.validateSync(request.body, { abortEarly: false });
// 		} catch (err) {
// 			return response.status(400).json({ error: err.errors });
// 		}

// 		const { name } = request.body;
// 		const { id } = request.params;

// 		let path;
// 		if (request.file) {
// 			const { filename } = request.file;
// 			path = filename;
// 		}

// 		const existingCategory = await Category.findOne({
// 			where: {
// 				name,
// 			},
// 		});

// 		if (existingCategory && existingCategory.id !== Number(id)) {
// 			return response.status(400).json({ error: 'Category already exists' });
// 		}

// 		await Category.update(
// 			{
// 				name,
// 				path,
// 			},
// 			{
// 				where: {
// 					id,
// 				},
// 			},
// 		);

// 		return response.status(201).json();
// 	}

// 	async index(_request, response) {
// 		const categories = await Category.findAll();

// 		return response.status(200).json(categories);
// 	}
// }

// export default new CategoryController();





import * as Yup from 'yup';
import Category from '../models/Category.js';
import cloudinary from '../../config/cloudinary.js';
import streamifier from 'streamifier';

class CategoryController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { name } = request.body;

		if (!request.file) {
			return response.status(400).json({ error: 'Image is required' });
		}

		const uploadFromBuffer = () =>
			new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{
						folder: 'dev-burguer/categories',
					},
					(error, result) => {
						if (error) return reject(error);
						resolve(result);
					}
				);

				streamifier.createReadStream(request.file.buffer).pipe(stream);
			});

		const result = await uploadFromBuffer();

		const newCategory = await Category.create({
			name,
			path: result.secure_url,
		});

		return response.status(201).json(newCategory);
	}

async update(request, response) {
	const schema = Yup.object({
		name: Yup.string(),
	});

	try {
		schema.validateSync(request.body, { abortEarly: false });
	} catch (err) {
		return response.status(400).json({ error: err.errors });
	}

	const { name } = request.body;
	const { id } = request.params;

	const data = { name };

	if (request.file) {
		const uploadFromBuffer = () =>
			new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{ folder: 'dev-burguer/categories' },
					(error, result) => {
						if (error) return reject(error);
						resolve(result);
					}
				);

				streamifier.createReadStream(request.file.buffer).pipe(stream);
			});

		const result = await uploadFromBuffer();
		data.path = result.secure_url;
	}

	await Category.update(data, {
		where: { id },
	});

	return response.status(200).json();
}
	async index(_request, response) {
		const categories = await Category.findAll();

		return response.status(200).json(categories);
	}
}




 export default new CategoryController();