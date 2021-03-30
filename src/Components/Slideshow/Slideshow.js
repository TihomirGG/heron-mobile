import React, { Component } from 'react';
import './Slideshow.scss';

class Slideshow extends Component {
    constructor(props) {
        super(props);
        this.firstPhotoRef = React.createRef();
        this.secondPhotoRef = React.createRef();
        this.thridPhotoRef = React.createRef();
        this.allSlides = React.createRef();
        this.index = 0;
        this.clientWidth = 0;
    }

    startSlide = () => {
        if (this.index !== 2) {
            this.index++;
            console.log(this.index);
            this.allSlides.current.children[this.index].style.transform = `translateX(${
                -this.clientWidth * this.index
            }px)`;
            this.allSlides.current.children[this.index].style.transition = '0.8s';
        }
    };

    componentDidMount() {
        
        this.clientWidth = this.firstPhotoRef.current.clientWidth;
        console.log(this.clientWidth);
        this.interval = setInterval(this.startSlide.bind(this), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
          clearTimeout(this.secondTimeOut);
          clearTimeout(this.firstTimeOut);
          clearTimeout(this.thirdTimeOut);
        this.index = 0;
    }

    transitionEndHandler = e => {
        this.clientWidth = this.firstPhotoRef.current.clientWidth;
        console.log(this.allSlides);
        if (this.index === 2) {
            this.firstTimeOut = setTimeout(() => {
                this.allSlides.current.children[1].style.transition = '0.5s';
                this.allSlides.current.children[1].style.transform = `translateX(${+this.clientWidth * 1}px)`;
            }, 4000);
            this.secondTimeOut =setTimeout(() => {
                this.allSlides.current.children[2].style.transition = '0.5s';

                this.allSlides.current.children[2].style.transform = `translateX(${+this.clientWidth * 2}px)`;
            }, 3000);
            this.thirdTimeOut = setTimeout(() => {
                this.index = 0;
            }, 10000);
        }
    };

    render() {
        return (
            <div className="slides-container">
                <div
                    ref={this.allSlides}
                    onTransitionEnd={e => this.transitionEndHandler(e)}
                    className="slides-container__slides"
                >
                    <div ref={this.firstPhotoRef} className="slides-container__slide">
                        <img
                            src={`${process.env.PUBLIC_URL}/slideshow-images/firstPhoto.png`}
                            alt="slide-img"
                            className="slides-container__img"
                        ></img>
                    </div>
                    <div ref={this.secondPhotoRef} className="slides-container__slide">
                        <img
                            src={`${process.env.PUBLIC_URL}/slideshow-images/secondPhoto.jpg`}
                            alt="slide-img"
                            className="slides-container__img"
                        ></img>
                    </div>
                    <div ref={this.thridPhotoRef} className="slides-container__slide">
                        <img
                            src={`${process.env.PUBLIC_URL}/slideshow-images/thirdPhoto.jpg`}
                            alt="slide-img"
                            className="slides-container__img"
                        ></img>
                    </div>
                </div>
                <div className="slides-container__controls">
                    <button className="slides-container__slide-btn">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="slides-container__slide-btn">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Slideshow;