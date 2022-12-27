import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({city, desc, routeLink, isEvent}) {
  return (
    <Card sx={{ maxWidth: 500, minHeight: 200, margin: 4, backgroundColor: 'whitesmoke' }}>
      {!isEvent ? <CardMedia
              sx={{ height: 240, objectFit: 'fill' }}
              component="img"        
              image={`./${city}.jpg`}
              title={city}
      /> : null}    
  
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{textTransform: 'uppercase'}}>
          {`Events in ${city}`}
        </Typography>
        <Typography variant="body2" color="text.primary">
                  {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{padding: '16px'}}>
        <Button size="large" variant='contained' href={routeLink}>Explore</Button>
      </CardActions>
    </Card>
  );
}