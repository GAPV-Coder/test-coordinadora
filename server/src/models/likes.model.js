import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database.js';
import Event from './event.model.js';
import User from './user.model.js';

class Likes extends Model {}

Likes.init(
    {
        like_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_user: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id_event: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Likes',
    },
);

Likes.belongsTo(Event, { foreignKey: 'id_event' });
Likes.belongsTo(User, { foreignKey: 'id_user' });

export default Likes;
