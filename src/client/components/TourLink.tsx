import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';

import {
  ExploreIcon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
} from '../utils/material';

const TourLink = ({ tour }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);

  const getTourRating = (id) => {
    axios
      .get(`/reviews/rating/${id}`)
      .then(({ data }) => {
        setRating(data);
      })
      .catch((err) => console.error('Could not Get AVG rating ', err));
  };

  useEffect(() => {
    getTourRating(tour.id);
  }, [tour.id]);

  return (
    <ListItem>
      <ListItemIcon
        onClick={() => navigate(`/tour/${tour.id}`)}
        sx={{
          cursor: 'pointer',
          color: theme.palette.primary.main,
          minWidth: '33px',
          alignSelf: 'stretch',
          paddingTop: '9px',
        }}
      >
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Link
            to={`/tour/${tour.id}`}
            style={{
              color: '#1F1F29',
              textDecoration: 'none',
              fontWeight: '500',
            }}
          >
            {tour.tourName}
            {rating && (
              <div>
                <Rating
                  name='read-only'
                  value={rating}
                  precision={0.25}
                  size='small'
                  sx={{ paddingTop: '.25em' }}
                  readOnly
                />
              </div>
            )}
          </Link>
        }
        secondary={tour.description}
      />
    </ListItem>
  );
};

export default TourLink;
