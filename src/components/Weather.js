import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { message } from 'antd';

const Weather = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [bgImgDesc, setBgImgDesc] = useState('')
    const [bGGif, setBGGif] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=92f6b9b763e149631c7c3116b63381e5`

    const searchLocation = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            await axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data.weather[0].main)
                setBgImgDesc(response.data.weather[0].main)
            })
        } catch (error) {
            console.log(error)
            if (error.response.data.message === 'city not found') {
                message.error("Error! City not found.")
            }
        }
        setIsLoading(false)
        setLocation('')
    }

    useEffect(() => {
        const main = bgImgDesc;
        console.log(main)
        switch (main) {
            case "Snow":
                setBGGif(
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')"
                );
                break;
            case "Clouds":
                setBGGif(
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')"
                );
                break;
            case "Fog":
                setBGGif(
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')"
                );
                break;
            case "Rain":
                setBGGif(
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')"
                );
                break;
            case "Clear":
                setBGGif(
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
                );
                break;
            case "Thunderstorm":
                setBGGif(
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')"
                );
                break;
            default:
                setBGGif(
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
                );
                break;
        }
    }, [bgImgDesc])

    return (
        <div className='main' style={{backgroundImage: bGGif, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div className="search">
                <form onSubmit={searchLocation}>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder='Enter Location' />
                    <button className='mx-2 text-light my-2' type='submit'>Search</button>
                </form>
            </div>
            {isLoading
                ? <div className='mx-auto my-auto'><div className="spinner-border"></div></div>
                : <>
                    <div className="container">
                        <div className="top">
                            <div className="location">
                                <p>{data.name}</p>
                            </div>
                            <div className="temp">
                                {data.main ? <h1>{data.main.temp.toFixed()} &deg;C</h1> : null}
                            </div>
                            <div className="description">
                                {data.weather ? <p>{data.weather[0].main}</p> : null}
                            </div>
                        </div>

                        {data.name !== undefined &&
                            <div className="bottom m-0 py-2">
                                <div className="feels m-0">
                                    {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} &deg;C</p> : null}
                                    <p className='m-0 p-0'>Feels Like</p>
                                </div>
                                <div className="humidity m-0">
                                    {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
                                    <p className='m-0 p-0'>Humidity</p>
                                </div>
                                <div className="wind m-0">
                                    {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
                                    <p className='m-0 p-0 fs-sm-6'>Wind Speed</p>
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default Weather