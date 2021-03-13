import styled from "styled-components";
import Link from "next/link";
import UnstyledLink from "./styled/UnstyledLink";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "../hooks/useCart";

const Nav = styled.nav`
  background: white;
  padding: 2rem;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItems = styled.div`
  display: flex;
  align-items:center;
`;

const NavItem = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
`;

const ShoppingCart = styled(FiShoppingCart)`
  margin: 1rem;
  cursor: pointer;
  font-size: 3rem;
`;

const Navbar = () => {
  const { openCart } = useCart();

  return <Nav>
    <NavContainer>
      <NavItems>
        <NavItem>
          <Link href="/">
            <UnstyledLink>
              <img src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/51088746_2219450884981397_8151053238599155712_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=oqetLuzZbD4AX_GZeF1&_nc_ht=scontent-ort2-1.xx&oh=5e04ffb8a4455066b6f905ba30616af5&oe=6072D36C"
                   height={150} />
            </UnstyledLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/about">
            <UnstyledLink>About</UnstyledLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/contact">
            <UnstyledLink>Contact</UnstyledLink>
          </Link>
        </NavItem>
      </NavItems>
      <ShoppingCart onClick={openCart} />
    </NavContainer>
  </Nav>;
};

export default Navbar;
