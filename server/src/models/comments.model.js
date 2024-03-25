import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database.js';
// import Event from './event.model';
// import User from './user.model';

class Comments extends Model {}

Comments.init(
    {
        comment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        // id_event: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
        // id_user: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
    },
    {
        sequelize,
        modelName: 'Comments',
    },
);

// Comments.belongsTo(Event, { foreignKey: 'id_event' });
// Comments.belongsTo(User, { foreignKey: 'id_user' });

export default Comments;
