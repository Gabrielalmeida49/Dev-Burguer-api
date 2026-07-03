import Sequelize, { Model } from 'sequelize';

class Product extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				price: Sequelize.INTEGER,
				path: Sequelize.STRING,
				offer: Sequelize.BOOLEAN,
			// url: {
			// 		type: Sequelize.VIRTUAL,
			// 		get() {
			// 			const serverUrl = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3001';
			// 			return `${serverUrl}/product-file/${this.path}`;
			// 		},
			// 	},

			url: {
	type: Sequelize.VIRTUAL,
	get() {
		// Se o path já for um link de internet, usa ele direto!
		if (this.path && this.path.startsWith('http')) {
			return this.path;
		}
		const serverUrl = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3001';
		return `${serverUrl}/product-file/${this.path}`;
	},
},
			},
			{
				sequelize,
				tableName: 'products',
			},
		);
		return this;
	}
	static associate(models) {
		this.belongsTo(models.Category, {
			foreignKey: 'category_id',
			as: 'category',
		});
	}
}

export default Product;
