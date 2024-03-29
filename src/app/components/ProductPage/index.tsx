'use client';

import { bebas_neue, poppins } from '@/app/fonts';
import {
  Container,
  FormContainer,
  ImageProductContainer,
  ImageContainer,
  SelectCategoryLabel,
  SelectContainer,
  DescriptionLabel,
  ToggleSwitchContainer,
  ToggleSwitch,
  LabelToglleSwitch,
  InputCheckBoxInToggle,
  Switch,
  FormButtonsContainer,
  ImageWithoutUpload,
  ImageWithUpload,
  ButtonsImageContainer,
} from './styles';

import Title from '@/app/components/Title';
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import useFoodFetch from '@/app/hooks/useFoodFetch';
import { EndpointFoodApiEnum } from '@/app/enums';
import {
  FoodApiCategory,
  FoodApiProduct,
  FoodApiUpload,
} from '../../../../types/foodApi';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

type ProductPageProps = {
  productId: string;
  businessId: number | string;
  mode?: 'private' | 'public';
  modePage: string;
};
export default function ProductPage({
  productId,
  modePage,
  businessId,
  mode = 'private',
}: ProductPageProps) {
  const needsToken = mode === 'private';

  const title =
    modePage === `register` ? `CADASTRO DE PRODUTO` : `EDIÇÃO DE PRODUTO`;

  const [foodTitle, setFoodTitle] = useState<string>(``);
  const textAreaMaxLength = 300;
  const [remaining, setRemaining] = useState<number>(textAreaMaxLength);
  const [checked, setChecked] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const [priceIsValid, setPriceIsValid] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [categorySelected, setCategorySelected] = useState<
    FoodApiCategory | undefined
  >(undefined);

  const [uploadName, setUploadName] = useState<string>('');
  const [isUploadedImage, setIsUploadedImage] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const emptyingValues = () => {
    setFoodTitle(``);
    setChecked(false);
    setPrice(``);
    setDescription(``);
    setCategory(``);
    setCategorySelected(undefined);
    setUploadName(``);
    setIsUploadedImage(false);
    setFile(null);
  };

  //Categories request
  const { data: categories } = useFoodFetch<FoodApiCategory[]>(
    EndpointFoodApiEnum.PRODUCT_CATEGORY,
    {
      injectProducts: true,
      hasProducts: true,
      businessId,
    },
    needsToken,
  );

  const { data: product } = useFoodFetch<FoodApiProduct>(
    EndpointFoodApiEnum.PRODUCT,
    {
      businessId,
      productId,
    },
    false,
  );

  const {
    request: requestNewProductUpload,
    loading: loadingNewProductUpload,
    data: upload,
  } = useFoodFetch<FoodApiUpload>();

  const { request: requestRegisterNewProduct, loading: newProductLoading } =
    useFoodFetch();

  const { request: requestPatchProduct } = useFoodFetch();

  function handleTextAreaLength(event: ChangeEvent<HTMLTextAreaElement>) {
    setRemaining(textAreaMaxLength - event.target.value.length);
  }

  function handleInputPrice(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (!/^[\d,]*$/.test(value)) {
      setPriceIsValid(true);
      target.value = value.replace(/[^\d,]/g, '');
    } else {
      setPriceIsValid(false);
    }
  }

  function onChangeFile(
    acceptedFiles?: File[],
    event?: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile = event?.target?.files?.[0] || acceptedFiles?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  function handleRemoveUpload() {
    setUploadName('');
    setIsUploadedImage(false);
    setFile(null);
  }

  function handleRequest() {
    if (modePage == 'edit' && businessId) {
      requestPatchProduct({
        method: 'PATCH',
        body: {
          categoryId: categorySelected?.id,
          name: foodTitle,
          price,
          description,
          uploadId: upload?.id,
          enabled: checked,
        },
        params: { businessId, productId: `x-burger` },
        endPoint: EndpointFoodApiEnum.PRODUCT,
      });
    } else {
      requestRegisterNewProduct({
        method: 'POST',
        body: {
          categoryId: categorySelected?.id,
          name: foodTitle,
          price,
          description,
          uploadId: upload?.id,
          enabled: checked,
        },
        endPoint: EndpointFoodApiEnum.PRODUCT,
      });
    }

    emptyingValues();
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    handleRequest();
  }

  useEffect(() => {
    if (categories && categories.length === 1) {
      setCategory(() => categories[0].name);
    }
    const foundCategory = categories?.find(prev => prev.name === category);

    setCategorySelected(foundCategory);
  }, [categories, category, categorySelected]);

  useEffect(() => {
    if (!file) return;

    const formData = new FormData();
    formData.append('upload', file, file.name);

    requestNewProductUpload({
      method: 'POST',
      body: formData,
      headers: {
        'Content-type': 'multipart/form-data',
      },
      endPoint: EndpointFoodApiEnum.UPLOAD,
    });
  }, [file]);

  useEffect(() => {
    if (!file && modePage === `register`) return;

    setIsUploadedImage(() => true);
    setUploadName(
      ` https://fooda.nyc3.digitaloceanspaces.com/develop/${upload?.name}`,
    );
    console.log(`upload?.name`, upload?.name);
  }, [upload]);

  //Select category
  useEffect(() => {
    if (categories && categories.length === 1) {
      setCategory(() => categories[0].name);
    }
    const foundCategory = categories?.find(prev => prev.name === category);

    setCategorySelected(foundCategory);
  }, [categories, category, categorySelected]);

  useEffect(() => {
    if (product && product.upload && imageLoaded === false) {
      setUploadName(product.upload.url);
    }
  }, [product]);

  return (
    <Container>
      <FormContainer>
        <Title>{title}</Title>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <Input
              label="TITULO"
              className={poppins.className}
              id="foodTitle"
              type="text"
              placeholder="Dê um título ao seu produto"
              onChange={e => setFoodTitle(e.target.value)}
              value={foodTitle}
            />
            {/* </FoodTitleLabel> */}

            {isUploadedImage && product?.upload ? (
              <ImageProductContainer>
                <ImageWithUpload>
                  <p className={poppins.className}>
                    Como será visualizado pelo cliente
                  </p>

                  <Dropzone
                    noKeyboard
                    onDrop={acceptedFiles => onChangeFile(acceptedFiles)}
                    noClick={true}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <ImageContainer {...getRootProps()}>
                        <AvatarEditor
                          image={uploadName}
                          height={127}
                          width={127}
                          scale={1}
                          border={0}
                        />
                        <input {...getInputProps()} />
                        EDITAR
                      </ImageContainer>
                    )}
                  </Dropzone>

                  <ButtonsImageContainer>
                    <button
                      type="button"
                      className={poppins.className}
                      onClick={handleRemoveUpload}
                    >
                      REMOVER
                    </button>

                    <button type="button" className={poppins.className}>
                      EDITAR
                      <input
                        type="file"
                        onChange={event => onChangeFile(undefined, event)}
                      />
                    </button>
                  </ButtonsImageContainer>
                </ImageWithUpload>
              </ImageProductContainer>
            ) : (
              <Dropzone
                noKeyboard
                onDrop={acceptedFiles => onChangeFile(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <ImageProductContainer {...getRootProps()}>
                    <ImageWithoutUpload>
                      <Image
                        src={'/productImage.png'}
                        alt="Imagem exemplo"
                        height={51}
                        width={51}
                      />
                      <p className={poppins.className}>Arraste uma imagem</p>
                      <div>
                        <div></div>
                        <span className={poppins.className}>ou</span>
                        <div></div>
                      </div>
                      <button className={poppins.className} type="button">
                        <input
                          onChange={event => onChangeFile(undefined, event)}
                          type="file"
                          {...getInputProps()}
                        />
                        Selecione do computador
                      </button>
                    </ImageWithoutUpload>
                  </ImageProductContainer>
                )}
              </Dropzone>
            )}

            <SelectCategoryLabel
              htmlFor="foodCategory"
              className={bebas_neue.className}
            >
              SELECIONE EM QUAL CATEGORIA ESTE PRODUTO SERA EXIBIDO
              <SelectContainer>
                <select
                  className={poppins.className}
                  value={category}
                  id="foodCategory"
                  onChange={e => setCategory(e.target.value)}
                >
                  {/*obs: testar o que realmente e necessario nesses ifs*/}
                  {businessId &&
                    categories &&
                    categories?.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
                <MdOutlineKeyboardArrowDown size={24} />
              </SelectContainer>
            </SelectCategoryLabel>
            <DescriptionLabel
              htmlFor="description"
              className={bebas_neue.className}
            >
              DESCRICAO
              <div>
                <textarea
                  value={description}
                  id="description"
                  maxLength={textAreaMaxLength}
                  className={poppins.className}
                  onInput={handleTextAreaLength}
                  onChange={event => setDescription(event.target.value)}
                  placeholder="Exemplo: 2 carnes de hamburger de angus, alface americana,
                  catupiry original, molho especial, pao da hora e queijo de
                  avestruz"
                ></textarea>

                <span className={poppins.className}>
                  Restam {remaining} caracteres
                </span>
              </div>
            </DescriptionLabel>

            <ToggleSwitchContainer>
              <ToggleSwitch>
                <p className={poppins.className}>
                  Exibir o produto no cardapio
                </p>
                <LabelToglleSwitch>
                  <InputCheckBoxInToggle
                    type="checkbox"
                    onChange={() => setChecked(!checked)}
                  />
                  <Switch />
                </LabelToglleSwitch>
              </ToggleSwitch>
            </ToggleSwitchContainer>

            <Input
              className={poppins.className}
              id="price"
              type="text"
              placeholder="Exemplo: 15,25"
              onChange={e => setPrice(e.target.value)}
              value={price}
              onInput={handleInputPrice}
            />

            {priceIsValid && (
              <span> O preco de seu prato precisa ser um número</span>
            )}
          </fieldset>

          <FormButtonsContainer>
            <Button text={`Cancelar`} />
            <Button text={`Salvar`} type="submit" />
          </FormButtonsContainer>
        </form>
      </FormContainer>
    </Container>
  );
}
