import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
// import User from './user.model';
// import Comments from './comments.model';
// import Likes from './likes.model';

class Event extends Model {}

Event.init(
    {
        event_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        event_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        categories: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        date_of_event: {
            type: DataTypes.DATE,
        },
        location: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        banner: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        id_user: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Event',
    },
);

// Event.belongsTo(User, { foreignKey: 'id_user' });
// Event.hasMany(Comments, { foreignKey: 'id_event' });
// Event.hasMany(Likes, { foreignKey: 'id_event' });

export default Event;
