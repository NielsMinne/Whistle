/**
 * Report class for sending a message in relation to harrasment
 */

import sgMail from '@sendgrid/mail';
import { QSELECT, MELDET_EMAIL } from '../consts';

class Report {
  constructor(
    title,
    adress,
    description,
    category,
  ) {
    this.title = title;
    this.adress = adress;
    this.description = description;
    this.category = category;
  }

  /**
   * @returns gets the information the user inputs out of the form
   */
  getInformation() {
    const form = new FormData(QSELECT('form'));
    this.title = form.get('title');
    this.adress = form.get('adress');
    this.description = form.get('descriptionMeldet');
    this.category = form.get('category');
    console.log(this.title, this.adress, this.description, this.category);
  }

  /**
   * @returns Submits the report and sends the email to the application host (MELDET_EMAIL in const)
   */
  SubmitReport() {
    sgMail.setApiKey('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');

    const form = new FormData(QSELECT('form'));
    const title = form.get('title');
    const adress = form.get('adress');
    const description = form.get('descriptionMeldet');
    const category = form.get('category');

    const msg = {
      to: MELDET_EMAIL,
      from: JSON.parse(localStorage.getItem('user')).email,
      category,
      subject: title,
      adress,
      text: description,
    };

    sgMail.send(msg).then(() => {
      console.log('email sent');
      console.log(`From: ${msg.from} \nTo: ${msg.to} \nAdress: ${msg.adress}\nCategory: ${msg.category}\nSubject: ${msg.subject}\nDescription: ${msg.text}`);
    }).catch((error) => {
      console.error(error);
    });
  }
}

export default Report;
