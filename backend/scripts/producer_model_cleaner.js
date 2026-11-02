
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const db = require('../models');
const Producer = db.producer;

const updateProducerUnderscores = async (producerId) => {
  try {
    // 1. Find producer by ID
    const producer = await Producer.findByPk(producerId);

    if (!producer) {
      console.log(`Producer with ID ${producerId} not found.`);
      return;
    }

    // 2. Print the old object
    console.log('\n========== OLD PRODUCER OBJECT ==========\n');
    console.log(JSON.stringify(producer.toJSON(), null, 2));

    // 3. Fields that should NOT be modified
    const excludedFields = [
      'id',
      'verification_status',
      'status',
      'source',
      'created_by',
      'data_status',
      'organization_type'
    ];

    let updatedFields = [];

    // 4. Loop through all model attributes
    for (const field of Object.keys(Producer.rawAttributes)) {

      // Skip system-controlled fields
      if (excludedFields.includes(field)) {
        continue;
      }

      const value = producer.getDataValue(field);

      // Handle normal STRING fields
      if (typeof value === 'string') {

        const newValue = value.replace(/_+/g, ' ');

        if (newValue !== value) {
          producer.setDataValue(field, newValue);
          updatedFields.push(field);
        }
      }

      // Handle ARRAY(STRING) fields
      else if (Array.isArray(value)) {

        const newValue = value.map(item =>
          typeof item === 'string'
            ? item.replace(/_+/g, ' ')
            : item
        );

        if (JSON.stringify(newValue) !== JSON.stringify(value)) {
          producer.setDataValue(field, newValue);
          updatedFields.push(field);
        }
      }
    }

    // 5. Print modified fields
    console.log('\n========== MODIFIED FIELDS ==========\n');
    console.log(updatedFields);

    // 6. Save changes without Sequelize validation
    await producer.save({ validate: false });

    // 7. Retrieve the saved object from database
    const updatedProducer = await Producer.findByPk(producerId);

    // 8. Print the new object
    console.log('\n========== NEW PRODUCER OBJECT ==========\n');
    console.log(JSON.stringify(updatedProducer.toJSON(), null, 2));

    console.log(`\nProducer ID ${producerId} updated successfully.`);

  } catch (error) {
    console.error('Error updating producer:', error);
  }
};

// Execute
updateProducerUnderscores(1); // Replace 1 with actual producer ID
