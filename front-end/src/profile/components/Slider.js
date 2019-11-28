import React from 'react';
import '../css/slider.css';
import { Carousel } from 'react-bootstrap';

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pics: this.props.profile.photos
        };
        //        this.saveState = this.saveState.bind(this);
    }

    renderPics() {
        const pictures = [...this.state.pics];
        if (pictures.lenth !== 0) {
            return pictures.map((picture, index) => {
                const picSrc = picture.split('/').pop();
                return <Carousel.Item key={index}> 
                            <img src={process.env.PUBLIC_URL + '/img/' + picSrc} alt={'picture'+index} className="carousel-item" />
                        </Carousel.Item>
            })
        }
        else{
            return <Carousel.Item> 
                        <img src={process.env.PUBLIC_URL + '/img/default-profile_picture.jpg'} alt='noPic' className="carousel-item" />
                    </Carousel.Item>
        }
    }

    render() {
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Photos</h4>
                    </div>
                    <Carousel>
                        {this.renderPics()}
                    </Carousel>
                </div>
            </div>
        );
    }
}
