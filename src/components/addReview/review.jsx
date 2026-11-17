import {
  Box,
  Button,
  Link,
  Rating,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductWorker from "../../utils/productWorker";
import theme from "../../theme";
import FetchWorker from "../../utils/fetchWorker";
import { navigate } from "gatsby";
import MenuItemReview from "../product/review";

const ItemReview = ({ user, reviewItem, currency, setStatus }) => {
  const fetchWorker = new FetchWorker();
  const productWorker = new ProductWorker();
  const [isEdit, setIsEdit] = useState(false);
  const [review, setReview] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!user.isFetching && reviewItem) {
      setReview(
        reviewItem.reviews.find((review) =>
          user.data.reviews.includes(review.id)
        )
      );
    }
  }, [user, reviewItem]);

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (review && !isEdit) {
      setIsEdit(true);
      setForm(review);
    } else {
      setIsEdit(false);
      setStatus({ on: true, type: "LOADING", message: "posting review" });
      fetchWorker
        .postReview(form)
        .then((res) => {
          setStatus({
            on: true,
            type: "SUCCESS",
            message: `Review posted`,
            action: () => {
              navigate(window.location.pathname);
            },
            actionTitle: "Review other items",
          });
          console.log(res);
        })
        .catch((err) => {
          setStatus({
            on: true,
            type: "ERROR",
            message: err.message,
            action: () => {},
          });
        });
    }
  };

  const handleCancel = () => {
    if (review && isEdit) {
      setIsEdit(false);
    } else {
      navigate(window.location.pathname);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {reviewItem ? (
        <Link
          href={`/menu-item/${reviewItem.id}`}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <Box
            display={"flex"}
            gap={"20px"}
            padding={"10px"}
            border={`1px solid ${theme.palette.grey[400]}`}
            sx={{
              transition: "0.3s",
              ":hover": {
                border: `1px solid ${theme.palette.primary.main}`,
                bgcolor: theme.palette.grey[200],
              },
            }}
          >
            <img
              alt={`reciept item-${reviewItem.name}`}
              src={reviewItem.image}
              loading="lazy"
              style={{ width: "50px", height: "50px" }}
            />
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>{reviewItem.name}</Typography>
              <Rating value={reviewItem.rating.score} readOnly size="small" />
              <Typography fontWeight={"light"}>
                {currency.symbol}
                {reviewItem.unitPrice}
              </Typography>
            </Box>
          </Box>
        </Link>
      ) : (
        <Skeleton width={"100%)"} height={"50px"} />
      )}
      {review && !isEdit ? (
        <>
          <MenuItemReview review={review} />
        </>
      ) : (
        <>
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Typography fontWeight={"bold"}>Rating</Typography>
            <Rating name="rating" value={form.rating} onChange={handleChange} />
            {form.rating && (
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                  color: theme.palette.status.rating[form.rating],
                }}
              >
                {productWorker.ratingTitles[form.rating]}
              </Typography>
            )}
          </Box>
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Typography fontWeight={"bold"}>Title</Typography>
            <TextField
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Box>
          <Typography fontWeight={"bold"}>Comment</Typography>
          <TextField
            multiline
            placeholder="Type your comment"
            name="comment"
            value={form.comment}
            onChange={handleChange}
            helperText={`${form.comment?.length || 0}/200`}
            inputProps={{ maxLength: 200 }}
            minRows={4}
            maxRows={5}
          />
        </>
      )}
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button variant="outlined" onClick={handleCancel}>
          back
        </Button>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disabled={!review && !isEdit && !form.rating}
        >
          {review && !isEdit ? "Edit" : "Post"}
        </Button>
      </Box>
    </form>
  );
};

export default ItemReview;
