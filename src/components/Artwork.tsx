import styled from "styled-components";
import KaKaoShareButton from "./KaKaoShareButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem auto;
`;

const Button = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  justify-content: center;
  margin: 0 auto;
`;

const Artwork = () => {
  return (
    <>
      <Container>Artwork</Container>
      <Button>
        <KaKaoShareButton />
      </Button>
    </>
  );
};

export default Artwork;
