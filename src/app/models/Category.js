import Sequelize, { Model } from 'sequelize';

class Category extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING,
				path: Sequelize.STRING,
			// url: {
			// 		type: Sequelize.VIRTUAL,
			// 		get() {
			// 			const serverUrl = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3001';
			// 			return `${serverUrl}/category-file/${this.path}`;
			// 		},
			// 	},

			url: {
	type: Sequelize.VIRTUAL,
	get() {
		// Se o path já for um link de internet (como o do GitHub), usa ele direto!
		if (this.path && this.path.startsWith('http')) {
			return this.path;
		}
		const serverUrl = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3001';
		return `${serverUrl}/category-file/${this.path}`;
	},
},
			},
			{
				sequelize,
				tableName: 'categories',
			},
		);

		return this;
	}
}

export default Category;
