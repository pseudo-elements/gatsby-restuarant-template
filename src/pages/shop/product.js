import {
  Box,
  Button,
  IconButton,
  Rating,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FetchWorker from "../../utils/fetchWorker";
import SkeletonGroup from "../../components/skeletonGroup";
import {
  AddShoppingCart,
  ChevronLeft,
  ChevronRight,
  Edit,
  ExpandCircleDown,
  Favorite,
  PersonOff,
  Search,
  Share,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";
import ProductWorker from "../../utils/productWorker";
import { useDispatch, useSelector } from "react-redux";
import { Link, navigate } from "gatsby";
import { setSnackbar } from "../../state/snackBar";
import { updateUser } from "../../state/user";
import EditModal from "../../components/modals/edit";
import CustomizeProduct from "../../components/product/customizeProduct";
import ProductReview from "../../components/product/review";
import ProductCard from "../../components/shop/productCard";
import SearchWorker from "../../utils/searchWorker";

const ShopProductPage = ({ location, setConfirmationModal }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const currency = useSelector((state) => state.currency);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const productWorker = new ProductWorker();
  const [isLiked, setIsLiked] = useState(false);
  const [offers, setOffers] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [customizeProduct, setCustomizeProduct] = useState({
    on: false,
    title: (isInCart || isLiked) && "Edit your prefrences",
  });

  const back = () => {
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };

  const next = () => {
    if (imageIndex < product.images.length - 1) {
      setImageIndex((prev) => prev + 1);
    } else {
      setImageIndex(0);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: back,
  });

  useEffect(() => {
    const [id] = location.pathname.split("/").slice(-1);
    const fetchWorker = new FetchWorker();
    Promise.all([fetchWorker.fetchOffers(), fetchWorker.fetchProduct(id)])
      .then((res) => {
        setOffers(res[0]);
        setProduct(res[1]);
        const searchWorker = new SearchWorker();
        searchWorker.searchProducts(res[1].category).then((items) => {
          setSimilarProducts(items);
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        dispatch(
          setSnackbar({
            on: true,
            type: "ERROR",
            message: `Error fetching info: ${err}`,
          })
        );
      });
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      setIsLiked(Boolean(user.data.favourites[product.id]));
      setIsInCart(Boolean(user.data.cart.items[product.id]));
    } else {
      setIsLiked(false);
      setIsInCart(false);
    }
  }, [user, product]);

  const handleFavourite = () => {
    if (isLiked) {
      handleDelete();
    } else {
      changeCustomizeProduct("favourites", "ADD");
    }
  };

  const handleShare = () => {};

  const handleDelete = (path = "favourites") => {
    setConfirmationModal({
      on: true,
      message: `Are you sure you want to remove '${product.name}' from your ${path}`,
      onCancel: () => {},
      onConfirm: () =>
        dispatch(
          updateUser({
            path,
            action: "DELETE",
            data: { productId: product.id },
          })
        ),
    });
  };

  const changeCustomizeProduct = (path, action) => {
    if (user.isLoggedIn) {
      setCustomizeProduct((prev) => ({ ...prev, on: true, path, action }));
    } else {
      navigate(`/auth/login?tab=${location.pathname}`);
    }
  };

  console.log(product);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      {!isLoading && (
        <EditModal
          isEdit={customizeProduct.on}
          width={"min(700px, 90%)"}
          handleClose={() => setCustomizeProduct({ on: false })}
        >
          <CustomizeProduct
            {...{
              user,
              offers,
              product,
              currency,
              customizeProduct,
              setCustomizeProduct,
            }}
          />
        </EditModal>
      )}
      <Box
        width={isNotPhone ? "70%" : "90%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"30px"}
      >
        <Box height={"60vh"} display={"flex"} gap={"20px"}>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
          >
            {isLoading ? (
              <Skeleton width={"100%"} height={"100%"} variant="rounded" />
            ) : (
              <Box
                {...swipeHandlers}
                width={"100%"}
                height={"100%"}
                overflow={"hidden"}
                position={"relative"}
              >
                <Box
                  width={"100%"}
                  height={"100%"}
                  position={"absolute"}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  zIndex={1}
                >
                  <IconButton
                    onClick={back}
                    sx={{ color: "white" }}
                    disabled={imageIndex <= 0}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <IconButton
                    onClick={next}
                    sx={{ color: "white" }}
                    disabled={imageIndex >= product.images.length - 1}
                  >
                    <ChevronRight />
                  </IconButton>
                </Box>
                <Box
                  zIndex={-1}
                  width={"100%"}
                  height={"100%"}
                  whiteSpace={"nowrap"}
                  sx={{
                    transition: "transform 0.3s",
                    transform: `translateX(-${imageIndex * 100}%)`,
                  }}
                >
                  {product.images.map((image) => (
                    <Box
                      width={"100%"}
                      height={"100%"}
                      display={"inline-block"}
                      position={"relative"}
                    >
                      <Box
                        position={"absolute"}
                        width={"100%"}
                        height={"100%"}
                        sx={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            <Box display={"flex"} gap={"10px"}>
              {isLoading ? (
                <SkeletonGroup
                  count={3}
                  width={"clamp(50px, 10vw, 100px)"}
                  height={"clamp(50px, 10vw, 100px)"}
                  flexDirection="row"
                />
              ) : (
                product.images.map((image, index) => (
                  <button
                    onClick={() => setImageIndex(index)}
                    style={{
                      padding: "0px",
                      width: "clamp(50px, 10vw, 100px)",
                      height: "clamp(50px, 10vw, 100px)",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        imageIndex === index
                          ? `4px solid ${theme.palette.primary.main}`
                          : "none",
                    }}
                  >
                    <Box
                      width={"100%"}
                      height={"100%"}
                      sx={{
                        transition: "transform 0.3s",
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        ":hover": { transform: "scale(1.1)" },
                      }}
                    />
                  </button>
                ))
              )}
            </Box>
          </Box>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-evenly"}
          >
            <Box
              display={"flex"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {isLoading ? (
                <Skeleton width={"100%"} variant="rounded" />
              ) : (
                <Typography
                  fontWeight={"bold"}
                  fontSize={"clamp(1rem, 5vw, 2.4rem)"}
                >
                  {product.name}
                </Typography>
              )}
              <Tooltip
                title={isLiked ? "remove from favourites" : "add to favourites"}
              >
                <IconButton
                  sx={{ color: isLiked && "primary.main" }}
                  disabled={isLoading}
                  onClick={handleFavourite}
                >
                  <Favorite />
                </IconButton>
              </Tooltip>
            </Box>
            {isLoading ? (
              <SkeletonGroup count={6} width="100%" height={"30px"} />
            ) : (
              <>
                <Typography>{product.description}</Typography>
                <Typography color={theme.palette.status.product[product.state]}>
                  {product.state}
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <Typography fontWeight={"bold"} fontSize={"1.3rem"}>
                    {currency.symbol}{" "}
                    {offers[product.id]
                      ? productWorker.getDiscount(
                          offers[product.id],
                          product.unitPrice
                        )
                      : product.unitPrice}
                  </Typography>
                  {offers[product.id] && (
                    <Typography
                      sx={{
                        color: "text.secondary",
                        textDecoration: "line-through",
                      }}
                    >
                      {currency.symbol} {product.unitPrice}
                    </Typography>
                  )}
                </Box>
              </>
            )}
            {isNotPhone && (
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"20px"}
              >
                <Tooltip title="share">
                  <IconButton onClick={handleShare} disabled={isLoading}>
                    <Share />
                  </IconButton>
                </Tooltip>
                {isLoading ? (
                  <Skeleton width={"100%"} variant="rounded" />
                ) : isInCart ? (
                  <Box width={"100%"} display={"flex"} gap={"20px"}>
                    <Button
                      onClick={() => changeCustomizeProduct("cart", "EDIT")}
                      startIcon={<Edit />}
                      variant="outlined"
                    >
                      edit
                    </Button>
                    <Link href="/cart" width={"100%"}>
                      <Button
                        fullWidth
                        disableElevation
                        startIcon={<ShoppingCartCheckout />}
                        variant="contained"
                      >
                        go to cart
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    disableElevation
                    disabled={isLoading}
                    sx={{ height: "50px" }}
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={() => changeCustomizeProduct("cart", "ADD")}
                  >
                    add to cart
                  </Button>
                )}
              </Box>
            )}

            {!isNotPhone && (
              <Box
                position={"fixed"}
                bottom={0}
                width={"100%"}
                height={"80px"}
                display={"flex"}
                padding={"20px"}
                gap={"20px"}
                alignItems={"center"}
                bgcolor={"white"}
                zIndex={1}
                boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
              >
                <IconButton onClick={handleShare} disabled={isLoading}>
                  <Share />
                </IconButton>
                {isLoading ? (
                  <Skeleton width={"100%"} variant="rounded" />
                ) : isInCart ? (
                  <Box width={"100%"} display={"flex"} gap={"20px"}>
                    <Button
                      onClick={() => changeCustomizeProduct("cart", "EDIT")}
                      startIcon={<Edit />}
                      variant="outlined"
                    >
                      edit
                    </Button>
                    <Link href="/cart" width={"100%"}>
                      <Button
                        fullWidth
                        disableElevation
                        startIcon={<ShoppingCartCheckout />}
                        variant="contained"
                      >
                        go to cart
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    disableElevation
                    disabled={isLoading}
                    sx={{ height: "50px" }}
                    variant="contained"
                    startIcon={<AddShoppingCart />}
                    onClick={() => changeCustomizeProduct("cart", "ADD")}
                  >
                    add to cart
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Box>
        <Typography
          padding={"30px"}
          sx={{
            typography: "secondaryFont",
            color: "primary.main",
            fontSize: "clamp(1rem, 10vw, 3rem)",
            textAlign: "center",
          }}
        >
          Reviews
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          border={`1px solid ${theme.palette.grey[400]}`}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={"20px"}
            borderBottom={`1px solid ${theme.palette.grey[400]}`}
            position={"relative"}
          >
            {isLoading ? (
              <SkeletonGroup
                count={3}
                width={"100px"}
                height={"40px"}
                flexDirection="row"
              />
            ) : (
              <>
                <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
                  {Number(product.reviews.length).toLocaleString("US")} review
                  {product.reviews.length === 1 ? "" : "s"}
                </Typography>
                {product.rating.score && (
                  <Box display={"flex"} gap={"10px"}>
                    <Rating value={product.rating.score} readOnly />
                    <Box display={"flex"} gap={"5px"}>
                      <Typography fontWeight={"bold"}>
                        {product.rating.score}/5
                      </Typography>
                      <Typography fontWeight={"light"}>
                        (
                        {Number(product.rating.votes.length).toLocaleString(
                          "US"
                        )}{" "}
                        vote
                        {product.rating.votes.length === 1 ? "" : "s"})
                      </Typography>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
          {isLoading ? (
            <Skeleton width={"100%"} height={"60vh"} variant="rounded" />
          ) : (
            <Box
              height={"60vh"}
              sx={{
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  bgcolor: "transparent",
                  width: "7px",
                },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: theme.palette.grey[300],
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  cursor: "pointer",
                  bgcolor: theme.palette.grey[400],
                },
              }}
            >
              {product.reviews.length ? (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={"20px"}
                  padding={"20px"}
                >
                  {product.reviews.map((review) => (
                    <ProductReview {...{ review }} />
                  ))}
                </Box>
              ) : (
                <Box
                  width={"100%"}
                  height={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <PersonOff />
                  <Typography>No reviews yet</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
        {Boolean(similarProducts.length) && (
          <Typography
            fontWeight={"bold"}
            sx={{
              fontSize: "1.4rem",
            }}
          >
            More in{" "}
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Typography>
        )}
        <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
          {similarProducts.map((product) => (
            <ProductCard {...{ product, currency }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ShopProductPage;
