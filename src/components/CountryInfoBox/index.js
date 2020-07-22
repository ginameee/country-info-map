import React from 'react';
import './index.scss';

class CountryInfoBox extends React.PureComponent {
    state = {
        isEdit: false
    };

    constructor(props) {
        super(props);
    }

    closeInfoWindow = () => {
        console.log('gg');
        this.props.closeInfoWindow(this.props.country);
    }

    setDefaultFlag() {
        const flagElem = document.querySelector(`country-flag-${this.props.country.alpha2Code}`);
        flagElem.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/5/5d/White_flag_icon.svg');
    }

    render() {
        const btnGroup = (this.state.isEdit) ?
            (<><button>저장</button><button>취소</button></>) :
            (<button onClick={this.closeInfoWindow}>닫기</button>);

        return (
            <div className="country-info-box">
                <header>
                    <img
                        id={`country-flag-${this.props.country.alpha2Code}`}
                        src={`https://mornya.github.io/images/nationflags/flat64/${this.props.country.alpha2Code}.png`}
                        onError={this.setDefaultFlag}
                    />
                    <h1 className="country-name">{this.props.country.localName}<span>({this.props.country.alpha3Code})</span></h1>
                </header>
                <section>
                    <h2 className="hide">국가정보</h2>
                    <div className="country-info-box__row">
                        <div className="country-info-box__row__title">
                            <i className="fas fa-landmark"></i>
                            <h3>수도</h3>
                        </div>
                        {this.props.country.capital}
                    </div>
                    <div className="country-info-box__row">
                        <div className="country-info-box__row__title">
                            <i className="far fa-money-bill-alt"></i>
                            <h3>통화</h3>
                        </div>
                        {this.props.country.currency}
                    </div>
                    <div className="country-info-box__row">
                        <div className="country-info-box__row__title">
                            <i className="far fa-clock"></i>
                            <h3>타임존</h3>
                        </div>
                        {this.props.country.timeZone}
                    </div>
                    <div className="country-info-box__row">
                        <div className="country-info-box__row__title">
                            <i className="far fa-sticky-note"></i>
                            <h3>메모</h3>
                        </div>
                        <textarea></textarea>
                    </div>
                </section>
                <footer>
                    {btnGroup}
                </footer>
            </div >
        )
    }
}

export default CountryInfoBox;