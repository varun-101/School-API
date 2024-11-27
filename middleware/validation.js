import Joi from 'joi';

const schoolSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  address: Joi.string().required().min(5).max(200),
  latitude: Joi.number().required().min(-90).max(90),
  longitude: Joi.number().required().min(-180).max(180)
});

export const validateSchool = async (req, res, next) => {
  try {
    await schoolSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

export default {
  validateSchool
}; 