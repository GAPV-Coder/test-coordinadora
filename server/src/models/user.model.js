import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database.js';
// import Event from './event.model';
// import Comments from './comments.model';
// import Likes from './likes.model';

class User extends Model {}

User.init(
    {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(23),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
    },
);

// User.hasMany(Event, { foreignKey: 'id_user' });
// User.hasMany(Comments, { foreignKey: 'id_user' });
// User.hasMany(Likes, { foreignKey: 'id_user' });

export default User;
