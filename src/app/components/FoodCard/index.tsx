import { FoodApiProduct } from '../../../../types/foodApi';
import Text from '../Text';
import Price from '../Price';
import { Container, PhotoFood } from './styles';

type FoodCardProps = {
  data: FoodApiProduct;
};

export default function FoodCard({ data }: FoodCardProps) {
  return (
    <Container>
      {!!data.upload?.url && (
        <PhotoFood
          src={data.upload.url}
          height={130}
          width={130}
          alt={data.name}
        />
      )}

      <Text>{data.name}</Text>
      <Price>{data.price ?? 'sob consulta'}</Price>
    </Container>
  );
}
