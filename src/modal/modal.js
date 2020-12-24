import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '40vw'
    },
    input: {
        width: '100%',
        margin: '30px 0'
    },
    timePicker: {
        width: '40%',
        margin: '0 10px 5% 5%'
    },
    button: {
        margin: '0 10px'
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    const today = new Date()

    const [eventData, setEventData] = useState({
        title: "",
        isEvent: 0,
        description: "",
        startTime: today.getHours() + ':' + today.getMinutes(),
        endTime: ""
    })


  


    const handleOnChnage = (e) => {
        const data = eventData
        const { name } = e.target
        data[name] = e.target.value
        setEventData(data);
        // console.log(data)
    }

    console.log(eventData.startTime)


    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <TextField className={classes.input} id="standard-basic" name="title"  label="Title" onChange={(e) => handleOnChnage(e)} />
                        <RadioGroup row aria-label="position" name="isEvent" defaultValue="top" onChange={e => handleOnChnage(e)}>

                            <FormControlLabel
                                value="0"
                                control={<Radio color="primary" />}
                                label="Event"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="Remainder"
                                labelPlacement="start"

                            />
                        </RadioGroup>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            className={classes.input}
                            variant="outlined"
                            onChange={e => handleOnChnage(e)}
                        />
                        <div>
                            <TextField
                                id="time"
                                label="Start Time"
                                name="startTime"
                                type="time"
                                defaultValue={eventData.startTime}
                                className={classes.timePicker}
                                onChange={e => handleOnChnage(e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <TextField
                                id="time"
                                label="End Time"
                                name="endTime"
                                type="time"
                                defaultValue={eventData.endTime}
                                className={classes.timePicker}
                                onChange={e => handleOnChnage(e)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </div>
                        <div className="modal-buttons">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={() => props.handleSave(eventData)}
                            >
                                Save
      </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
