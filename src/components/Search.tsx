import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../api/api";

const Data = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem auto;
`;

const Search = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((res) => setPosts(res.data.slice(0, 5)))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Data>
      {posts.map((item: any) => (
        <ul>
          <li key={item.id}></li>
        </ul>
      ))}
    </Data>
  );
};

export default Search;
