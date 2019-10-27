import React from 'react';
import '../css/slider.css';
import { Carousel } from 'react-bootstrap';

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
//        this.saveState = this.saveState.bind(this);
    }



    render() {
        return (
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">Photos</h4>
                    </div>
                    <Carousel>
                        <Carousel.Item>
                            <img className='carousel-item' src="http://www.rgeahosa.org/wp-content/uploads/2015/01/placehold-600x600-600x400.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="http://www.rgeahosa.org/wp-content/uploads/2015/01/placehold-600x600-600x400.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="http://www.rgeahosa.org/wp-content/uploads/2015/01/placehold-600x600-600x400.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="http://www.rgeahosa.org/wp-content/uploads/2015/01/placehold-600x600-600x400.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="http://www.rgeahosa.org/wp-content/uploads/2015/01/placehold-600x600-600x400.jpg" alt="" />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    }
}
