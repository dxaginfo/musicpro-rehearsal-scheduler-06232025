const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  class User extends Model {
    // Method to generate JWT token
    generateAuthToken() {
      return jwt.sign(
        { id: this.id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
    }

    // Method to compare password
    async comparePassword(password) {
      return bcrypt.compare(password, this.password_hash);
    }

    // Hide sensitive information when converting to JSON
    toJSON() {
      const values = Object.assign({}, this.get());
      delete values.password_hash;
      return values;
    }

    // Instance method to check if user is admin of a group
    async isGroupAdmin(groupId) {
      const GroupMember = sequelize.models.GroupMember;
      const membership = await GroupMember.findOne({
        where: {
          user_id: this.id,
          group_id: groupId,
          role: 'admin'
        }
      });
      return !!membership;
    }

    // Static method to associate User with other models
    static associate(models) {
      // A user can be in many groups
      this.belongsToMany(models.Group, {
        through: models.GroupMember,
        foreignKey: 'user_id',
        as: 'groups'
      });

      // A user can create many groups
      this.hasMany(models.Group, {
        foreignKey: 'created_by',
        as: 'createdGroups'
      });

      // A user can create many rehearsals
      this.hasMany(models.Rehearsal, {
        foreignKey: 'created_by',
        as: 'createdRehearsals'
      });

      // A user can have many availabilities
      this.hasMany(models.UserAvailability, {
        foreignKey: 'user_id',
        as: 'availabilities'
      });

      // A user can have many special unavailabilities
      this.hasMany(models.SpecialUnavailability, {
        foreignKey: 'user_id',
        as: 'specialUnavailabilities'
      });

      // A user can have many attendances
      this.hasMany(models.Attendance, {
        foreignKey: 'user_id',
        as: 'attendances'
      });

      // A user can create many venues
      this.hasMany(models.Venue, {
        foreignKey: 'created_by',
        as: 'createdVenues'
      });

      // A user can upload many attachments
      this.hasMany(models.Attachment, {
        foreignKey: 'uploaded_by',
        as: 'attachments'
      });

      // A user can have many notifications
      this.hasMany(models.Notification, {
        foreignKey: 'user_id',
        as: 'notifications'
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      // Hash password before saving
      beforeCreate: async (user) => {
        if (user.password_hash) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password_hash')) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      }
    }
  });

  return User;
};