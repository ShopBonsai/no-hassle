import * as Joi from 'joi';

export const productSchema = Joi.object({
  public_id: Joi.string()
    .example('1234asfsdfhwadasd2v')
    .description('Brand public identifier.')
    .required(),

  name: Joi.string().example('Virgin Club').description('Brand name.').required(),

  description: Joi.string()
    .example('This brand is amazing.')
    .description('Description of the brand.')
    .allow('', null),

  country: Joi.string().example('US').description('Country code.'),

  logo: Joi.string()
    .example(
      'http://images.ctfassets.net/hhq3zxylfx2l/H5laGR7EAeMQEeYqEmyGm/06a443581102ea4e52ea8294f8723790/Bonsai_image.jpg',
    )
    .description('Brand logo image.')
    .allow(null),
}).meta({ definition: 'universalBrand' });
