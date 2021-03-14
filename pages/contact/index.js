import Page from "../../components/styled/Page";
import styled from "styled-components";
import { FiFacebook, FiMail, FiPhone } from "react-icons/fi";
import UnstyledLink from "../../components/styled/UnstyledLink";

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

const Contact = () => {
  return <Page>
    <h2>Contact Me</h2>
    <form name="contact" method="POST" data-netlify={true} action="/contact/success">
      <input type="hidden" name="form-name" value="contact" />
      <InputContainer>
        <label htmlFor="name">Your Name:</label>
        <input type="text" name="name" id="name" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="email">Your Email:</label>
        <input type="email" name="email" id="email" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="message">Message:</label>
        <textarea name="message" id="message" />
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
  </Page>;
};

export default Contact;