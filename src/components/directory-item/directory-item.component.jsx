import { useNavigate } from "react-router";

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

export default function DirectoryItem({ category }) {
  const { title, imageUrl, route } = category;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(route);
  };

  return (
    <DirectoryItemContainer onClick={handleNavigate}>
      <BackgroundImage $imageUrl={imageUrl} />
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
