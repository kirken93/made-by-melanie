import styled from "styled-components";
import Link from "next/link";
import UnstyledLink from "./styled/UnstyledLink";

const Nav = styled.nav`
  background: white;
  padding: 2rem;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

const Navbar = () => {
  return <Nav>
    <NavContainer>
      <Link href="/">
        <UnstyledLink>
          <img src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/51088746_2219450884981397_8151053238599155712_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=oqetLuzZbD4AX_GZeF1&_nc_ht=scontent-ort2-1.xx&oh=5e04ffb8a4455066b6f905ba30616af5&oe=6072D36C"
               height={250} />
        </UnstyledLink>
      </Link>
    </NavContainer>
  </Nav>;
};

export default Navbar;