import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./LocationCard.css";
export default function LocationCard(elements) {
    let location = elements.location;
    return (
        <Card className="card-location" key={location.id}>
            <Typography variant="h5">{location.nameLocation}</Typography>
            
            <CardContent>
            <Typography paragraph>
                    {location.nameLocation} - {location.type}
            </Typography>
            <Typography paragraph>
                Located in {location.dimension} dimension.
            </Typography>
            <Typography paragraph>
                In the episode reside {location.residents.length} characters.
            </Typography>
            </CardContent>
        </Card>
    )
}