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
                            <img className='carousel-item' src="https://prd-static-default-1.sf-cdn.com/resources/images/store/2018/global/980x470/Mobileapp-page/xapp-prints-980x470-uk-20180417.jpg.pagespeed.ic.Izckg84Qeh.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="https://prd-static-default-1.sf-cdn.com/resources/images/store/2018/global/980x470/Mobileapp-page/xapp-canvas2-980x470-uk-20180417.jpg.pagespeed.ic.bL60Rc_EY6.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="https://prd-static-default-2.sf-cdn.com/resources/images/store/2018/global/980x470/Mobileapp-page/xapp-canvas-980x470-uk-20180417.jpg.pagespeed.ic.Vo5DTPF_8N.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="https://prd-static-default-2.sf-cdn.com/resources/images/store/2018/global/980x470/Mobileapp-page/xapp-mugs2-980x470-uk-20180417.jpg.pagespeed.ic.GXIG5CVSZe.jpg" alt="" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='carousel-item' src="https://prd-static-default-2.sf-cdn.com/resources/images/store/2018/global/980x470/Mobileapp-page/xapp-mug-980x470-uk-20180417.jpg.pagespeed.ic.zs4-i3ll9n.jpg" alt="" />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    }
}
