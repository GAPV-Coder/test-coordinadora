import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database.js';
import HandlerError from '../utils/handlerError.js';
// import User from './user.model';
// import Comments from './comments.model';
// import Likes from './likes.model';

const validCategories = [
    'Música',
    'Deportes',
    'Entretenimiento',
    'Salud',
    'Relogión',
];

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
            type: DataTypes.ARRAY(DataTypes.STRING(20)),
            allowNull: false,
            validate: {
                isValidCategory(value) {
                    if (!Array.isArray(value)) {
                        throw new Error('Categories must be an array');
                    }
                    for (const category of value) {
                        if (!validCategories.includes(category)) {
                            throw new Error(`Invalid category: ${category}`);
                        }
                    }
                },
            },
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        date_of_event: {
            type: DataTypes.DATEONLY,
            get() {
                const date = this.getDataValue('date_of_event');
                if (!date) {
                    return null;
                }
                if (!(date instanceof Date)) {
                    return date;
                }
                return date ? date.toLocaleDateString('es-ES') : null;
            },
            set(value) {
                const [day, month, year] = value.split('/');
                const formattedDate = `${year}-${month}-${day}`;
                this.setDataValue('date_of_event', formattedDate);
            },
        },
        location: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        banner: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        // id_user: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        // },
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
