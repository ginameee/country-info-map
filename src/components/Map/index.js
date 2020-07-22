import React from 'react';
import { axios } from '@/utils/axios';

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import CountryInfoBox from '@/components/CountryInfoBox';

class MapContainer extends React.PureComponent {
    state = {
        countries: [],
        showingInfoWindow: false
    };

    constructor(props) {
        0
        super(props);
    }

    componentDidMount() {
        this.getAllCountriesInfo();
    }

    getAllCountriesInfo = async () => {
        const { data: { payload } } = await axios.get('/nationInfo');
        const countries = payload.map(
            (country) => {
                return {
                    ...country,
                    isPopup: false,
                    marker: null
                }
            }
        );

        this.setState({ countries });
    }

    displayMarkers = () => {
        return this.state.countries.map(
            (country) => {
                return (
                    <Marker
                        key={`${country.alpha3Code}--marker`}
                        position={{ lat: country.latitude, lng: country.longitude }}
                        onClick={this.onMarkerClick}
                        country={country}
                    />
                );
            }
        );
    };

    displayInfoWindow = () => {
        return this.state.countries.map(
            (country) => {
                if (!country.isPopup) {
                    return (<></>);
                } else {
                    return (
                        <InfoWindow
                            key={`${country.alpha3Code}--info-window`}
                            visible={country.isPopup}
                            marker={country.marker}
                        >
                            <CountryInfoBox country={country} closeInfoWindow={this.closeInfoWindow}></CountryInfoBox>
                        </InfoWindow>
                    )
                }
            }
        );
    }

    closeInfoWindow = (country) => {
        const selectedCountryIdx = this.state.countries.indexOf(country);
        const countries = [...this.state.countries];

        if (!selectedCountryIdx) return;

        countries[selectedCountryIdx].isPopup = false;
        countries[selectedCountryIdx].marker = null;

        this.setState({ countries });
    };

    onMarkerClick = (props, marker, e) => {
        const selectedCountryIdx = this.state.countries.indexOf(props.country);
        const countries = [...this.state.countries];

        if (!selectedCountryIdx) return;

        countries[selectedCountryIdx].isPopup = true;
        countries[selectedCountryIdx].marker = marker;

        this.setState({ countries });
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={5}
                initialCenter={{ lat: 37.568889, lng: 126.976667 }}
            >
                {this.displayMarkers()}
                {this.displayInfoWindow()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAP_API_KEY
})(MapContainer);