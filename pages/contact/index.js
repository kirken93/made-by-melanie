import Page from "../../components/styled/Page";

const Contact = () => {
  return <Page>
    <h2>Contact Me</h2>
    <form name="contact" method="POST" data-netlify={true} action="/contact/success">
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label htmlFor="name">Your Name:</label>
        <input type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="email">Your Email:</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea name="message" id="message" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </Page>;
};

export default Contact;