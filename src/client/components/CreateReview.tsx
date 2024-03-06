import React, { useState } from 'react';
import axios from 'axios';

import {
  Box,
  Button,
  CancelIcon,
  TextField,
  Rating,
  SendIcon,
  Typography
} from '../utils/material';


const CreateReview = ({ tourId, handleClose }) => {
  const [value, setValue] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState<string>('');

  const postReview = () => {
    axios.post('/reviews/post', {
      feedback: reviewText,
      rating: value,
      id_tour: tourId
    })
    .catch(err => console.error('Axios post error ', err));
  };

  return (
    <div className="create-review">
      {/* <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          border: 2,
          bgcolor: 'white'
        }}
        noValidate
        autoComplete="off"
      > */}
        <Typography component="legend">Rate This Tour</Typography>
        <Rating
          name="no-value"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <br />
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          placeholder="Leave a Review"
          onChange={(event) => {
            event.preventDefault();
            setReviewText(event.target.value);
          }}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={(e) => {
            e.preventDefault();
            postReview();
            handleClose();
          }}
        >
          Send
        </Button>
        {/* <Button
          variant='outlined'
          size='small'
          color='secondary'
          startIcon={<CancelIcon />}
          onClick={handleClose}
        >
          Cancel
        </Button> */}
      {/* </Box> */}
    </div>
  );

};

export default CreateReview;