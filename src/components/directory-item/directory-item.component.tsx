import { useNavigate } from "react-router";

import type { DirectoryCategoryType } from "../directory/directory.component";

import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

type DirectoryItemProps = {
  category: DirectoryCategoryType;
};

export default function DirectoryItem({ category }: DirectoryItemProps) {
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
