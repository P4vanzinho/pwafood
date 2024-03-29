'use client';

import useFoodFetch from '@/app/hooks/useFoodFetch';
import { EndpointFoodApiEnum } from '@/app/enums';
import { Container } from './styles';
import { FoodApiCategory } from '../../../../types/foodApi';
import ProductList from '../ProductList';
import Title from '../Title';

type CategoryListProps = {
  businessId: number | string;
  mode?: 'private' | 'public';
};

export default function CategoryList({
  businessId,
  mode = 'public',
}: CategoryListProps) {
  const needsToken = mode === 'private';

  const { data: categories, loading: _categoriesLoading } = useFoodFetch(
    EndpointFoodApiEnum.PRODUCT_CATEGORY,
    {
      injectProducts: true,
      hasProducts: true,
      businessId,
    },
    needsToken,
  ) as { data: FoodApiCategory[]; loading: any };

  return (
    <Container>
      {!!categories?.length &&
        categories.map(category => (
          <>
            <Title>{category.name}</Title>
            <ProductList
              key={category.id}
              products={category.product}
              mode={mode}
            />
          </>
        ))}
    </Container>
  );
}
