import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from "./directory-item.styles";

export default function DirectoryItem({ category }) {
  const { title, imageUrl } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage $imageUrl={imageUrl} />
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
