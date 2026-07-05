// import * as Yup from 'yup';
// import Category from '../models/Category.js';
// import Product from '../models/Product.js';

// class ProductController {
// 	async store(request, response) {
// 		const schema = Yup.object({
// 			name: Yup.string().required(),
// 			price: Yup.number().required(),
// 			category_id: Yup.number().required(),
// 			offer: Yup.boolean(),
// 		});

// 		try {
// 			schema.validateSync(request.body, { abortEarly: false });
// 		} catch (err) {
// 			return response.status(400).json({ error: err.errors });
// 		}
// 		const { name, price, category_id, offer } = request.body;
// 		const { filename } = request.file;

// 		const newProduct = await Product.create({
// 			name,
// 			price,
// 			category_id,
// 			path: filename,
// 			offer,
// 		});
// 		return response.status(201).json(newProduct);
// 	}

// 	async update(request, response) {
// 		const schema = Yup.object({
// 			name: Yup.string(),
// 			price: Yup.number(),
// 			category_id: Yup.number(),
// 			offer: Yup.boolean(),
// 		});

// 		try {
// 			schema.validateSync(request.body, { abortEarly: false });
// 		} catch (err) {
// 			return response.status(400).json({ error: err.errors });
// 		}

// 		const { name, price, category_id, offer } = request.body;
// 		const { id } = request.params;

// 		let path;
// 		if (request.file) {
// 			const { filename } = request.file;
// 			path = filename;
// 		}

// 		await Product.update(
// 			{
// 				name,
// 				price,
// 				category_id,
// 				path,
// 				offer,
// 			},
// 			{
// 				where: {
// 					id,
// 				},
// 			},
// 		);
// 		return response.status(200).json();
// 	}
// 	async index(_request, response) {
// 		const products = await Product.findAll({
// 			include: {
// 				model: Category,
// 				as: 'category',
// 				attributes: ['id', 'name'],
// 			},
// 		});

// 		return response.status(200).json(products);
// 	}
// }

// export default new ProductController();





import cloudinary from '../../config/cloudinary.js';

import streamifier from 'streamifier';

import * as Yup from 'yup';



import Category from '../models/Category.js';

import Product from '../models/Product.js';



class ProductController {
	async store(request, response) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { name, price, category_id, offer } = request.body;

		if (!request.file) {
			return response.status(400).json({ error: 'Image is required' });
		}

		// Upload para Cloudinary (stream)
		const uploadFromBuffer = () =>
			new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{
						folder: 'dev-burguer/products',
					},
					(error, result) => {
						if (error) return reject(error);
						resolve(result);
					}
				);

				streamifier.createReadStream(request.file.buffer).pipe(stream);
			});

		const result = await uploadFromBuffer();

		const newProduct = await Product.create({
			name,
			price,
			category_id,
			offer,
			path: result.secure_url, // 👈 AGORA É URL
		});

		return response.status(201).json(newProduct);
	}

	async update(request, response) {
		const schema = Yup.object({
			name: Yup.string(),
			price: Yup.number(),
			category_id: Yup.number(),
			offer: Yup.boolean(),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}

		const { id } = request.params;
		const { name, price, category_id, offer } = request.body;

		let path;

		if (request.file) {
			const uploadFromBuffer = () =>
				new Promise((resolve, reject) => {
					const stream = cloudinary.uploader.upload_stream(
						{
							folder: 'dev-burguer/products',
						},
						(error, result) => {
							if (error) return reject(error);
							resolve(result);
						}
					);

					streamifier.createReadStream(request.file.buffer).pipe(stream);
				});

			const result = await uploadFromBuffer();
			path = result.secure_url;
		}

		await Product.update(
			{
				name,
				price,
				category_id,
				offer,
				path,
			},
			{
				where: { id },
			}
		);

		return response.status(200).json();
	}

	async index(_request, response) {
		const products = await Product.findAll({
			include: {
				model: Category,
				as: 'category',
				attributes: ['id', 'name'],
			},
		});

		return response.status(200).json(products);
	}
}


export default new ProductController();


