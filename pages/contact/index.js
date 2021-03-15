import styled from "styled-components";
import { FiFacebook, FiMail, FiPhone } from "react-icons/fi";
import Head from "next/head";
import UnstyledLink from "../../components/styled/UnstyledLink";
import Page from "../../components/styled/Page";

const InputContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Submit = styled.button`
  background: linear-gradient(to right, #faaca8, #ddd6f3);
  outline: none;
  border: none;
  font-size: 2rem;
  width: 200px;
  padding: 1rem;
  color: white;

  &:hover{
    cursor: pointer;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 3rem;
  margin-top: 2rem;
`;

const NAME_ID = "name";
const EMAIL_ID = "email";
const MESSAGE_ID = "message";

const Contact = () => (
  <Page>
    <Head>
      <title>Contact Made by Melanie</title>
    </Head>
    <h2>Contact Me</h2>
    <form name="contact" method="POST" data-netlify action="/contact/success">
      <input type="hidden" name="form-name" value="contact" />
      <InputContainer>
        <label htmlFor={NAME_ID}>
          Your Name:
          <input type="text" name="name" id={NAME_ID} />
        </label>
      </InputContainer>
      <InputContainer>
        <label htmlFor={EMAIL_ID}>
          Your Email:
          <input type="email" name="email" id={EMAIL_ID} />
        </label>
      </InputContainer>
      <InputContainer>
        <label htmlFor={MESSAGE_ID}>
          Message:
          <textarea name="message" id={MESSAGE_ID} />
        </label>

      </InputContainer>
      <SubmitContainer>
        <Submit type="submit">Submit</Submit>
      </SubmitContainer>
    </form>
    <IconContainer>
      <UnstyledLink href="https://www.facebook.com/craftsmadebymelanie" target="_blank">
        <FiFacebook />
      </UnstyledLink>
      <UnstyledLink href="mailto:madebymelanie19@gmail.com" target="_blank">
        <FiMail />
      </UnstyledLink>
      <UnstyledLink href="tel:574-329-3339" target="_blank">
        <FiPhone />
      </UnstyledLink>
    </IconContainer>
  </Page>
);

export default Contact;
