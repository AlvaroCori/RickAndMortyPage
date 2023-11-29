import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./EpisodeCard.css";
export default function EpisodeCard(elements){
    let episode = elements.episode;
    return (
        <Card className="card-episode" key={episode.id}>
            <Typography variant="h5">{episode.nameEpisode}</Typography>
            
            <CardContent>
            <Typography paragraph>
                    {episode.episode}
            </Typography>
            <Typography paragraph>
                The episode was released on {episode.airDate}.
            </Typography>
            <Typography paragraph>
                In the episode appear {episode.characters.length} characters.
            </Typography>
            </CardContent>
        </Card>
    )
}