import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
    return (
        <div>
            <Button variant="warning">Seoul</Button>
            <Button variant="warning">Paris</Button>
            <Button variant="warning">New York</Button>
            <Button variant="warning">Beijing</Button>
            <Button variant="warning">Tokyo</Button>
        </div>
    )
}

export default WeatherButton
