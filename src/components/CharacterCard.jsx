import * as React from 'react';
import { useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './CharacterCard.css';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {DialogFooter,DialogButton} from '@material/react-dialog';



export default function CharacterCard(elements) {
    const character = elements.character;
    let [state, setState] = useState(false);
    return (
        <Card className="card-character" key={character.id}>
            <CardMedia
                component="img"
                height="194"
                image={character.image}
                alt="Paella dish"
            />
            <Typography variant="h5">{character.nameCharacter}</Typography>
            <div className="state">
                <div className="circle  backgroundColor:{}?)"
                    style={{
                        backgroundColor: character.statusCharacter=='Alive'? 'green' : (character.statusCharacter=='Dead'?'red':'grey')
                    }}>
                </div>
                <div>
                    <p>{character.statusCharacter}</p>
                </div>
            </div>
            <CardContent>
                <Typography paragraph>
                    The character is {character.statusCharacter}.
                </Typography>
                <Typography paragraph>
                    {character.type}
                </Typography>
            </CardContent>
            <Button onClick={(e) => { setState(!state) }}>
                VER MAS    
            </Button>
            <Dialog
                className="dialog-character"
                onClose={() => { setState(!state) }}
                open={state}>
                <div className='dialog-container'>
                    <DialogTitle className='title-dialog'>{character.nameCharacter}</DialogTitle>
                    <img src={character.image}/>
                    <div className='body-dialog'>
                        <div>STATE OF CHARACTER:</div>
                        <div className="state-dialog">
                            <div className="circle-dialog"
                                style={{
                                    backgroundColor: character.statusCharacter=='Alive'? 'green' : (character.statusCharacter=='Dead'?'red':'grey')
                                }}>
                            </div>
                            <div>
                                <p>{character.statusCharacter}</p>
                            </div>
                        </div>
                        <div>TYPE:</div>
                        <div>
                            <p>{character.type}</p>
                        </div>
                        <div>GENDER:</div>
                        <div>
                            <p style={{
                                backgroundColor: character.gender=='Male'? 'blue' : (character.gender=='Female'?'pink':(character.gender=='Genderless'?'purple':'grey'))
                                }}>
                            {character.gender}</p>
                        </div>
                        <div>SPECIE:</div>
                        <div>
                            <p>{character.species}</p>
                        </div>
                        <div>PLACE ORIGIN:</div>
                        <div>
                            <p>{character.originName}</p>
                        </div>
                        <div>LOCATION:</div>
                        <div>
                            <p>{character.locationName}</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogButton action="accept" isDefault onClick={(e) => { setState(!state) }}>
                                VOLVER
                        </DialogButton>
                    </DialogFooter>
                </div>
            </Dialog>
        </Card>
    )
}