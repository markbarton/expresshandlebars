const logger = require("../../logger");
const request = require("request");
const uuidv4 = require("uuid/v4");
const dotenv = require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const { exec } = require("child_process");

module.exports = function(req, res, next) {
  logger.debug(`Starting PDF Generation for ${req.params.id}`);

    //Build GET URL
    const html_url = `${process.env.HOSTNAME}:${process.env.PORT}/html/invoice/${
      req.params.id
    }`;

    logger.debug(`PDF generation calling URL ${html_url}`);

    const pdf_filename = `${uuidv4()}.pdf`;
  const pdf_location = "public\\invoices";

  const pdf4ml_command = `java -Xmx512m -cp ${process.env.PDF4ML_JAR_LOCATION} Pd4Cmd "${html_url}" 850 -out ${pdf_location}\\${pdf_filename} -insets 5,5,5,5,pt -bgimage "${process.env.HOSTNAME}:${process.env.PORT}/images/watermark.png"`;
 
  exec(pdf4ml_command, {maxBuffer: 1024 * 1000}, function(error, stdout, stderr) {
    if (error !== null) {
      logger.error("exec error: " + error);
      return;
    }
    logger.debug(
      `PDF Generation finish - PDF saved to ${pdf_location}\\${pdf_filename}`
    );

    request
    .get({
      url: `${process.env.HOSTNAME}:${
        process.env.PORT
      }/invoices/${pdf_filename}`
    })
    .pipe(res)
    .on("finish", function() {
      // delete temp PDF
      fs.unlinkSync(`${pdf_location}\\${pdf_filename}`);
    });
});

};
