const db = require("../../config/config");
const fs = require('fs');
const csv = require('csv-parser');
exports.uploadProductCSV = async (req, res) => {
  try {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        const variationArray = data.variation.split(',')

        data.variation = variationArray;
        
        // Capitalize the first letter of product_name and product_category
        data.product_name = data.product_name.charAt(0).toUpperCase() + data.product_name.slice(1);
        data.product_category = data.product_category.charAt(0).toUpperCase() + data.product_category.slice(1);
        results.push(data);
      })
      .on('end', async () => {
        try {
          await db.dbproducts.bulkCreate(results);

          const { last_name, first_name, user_id } = req.user;
          const productNames = results.map(result => result.product_name).join(", ");
          const userlog = await db.dbuserlogs.create({
            user_id,
            first_name,
            last_name,
            activity: `${first_name} ${last_name} added new products: ${productNames}`,
            date: new Date(),
            time: new Date()
          });
          console.log(userlog);

          fs.unlinkSync(req.file.path); // delete the uploaded file
          res.send('File uploaded successfully!');
          
        } catch (error) {
          console.error(error);
          res.status(500).send({
            error
          });
        }
      });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      error
    })
  }
}