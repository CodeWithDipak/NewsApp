import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {

    const capitalized = (string) => {
        let newString = string.toLowerCase();
        return newString.charAt(0).toUpperCase() + newString.slice(1);
    }

    document.title = `${capitalized(props.category)} - NewsMonkey`;

    const [state, setState] = useState({
        results: [],
        loading: true,
        page: null
    })

    async function fetchData() {
        props.setProgress(20)
        const url = `https://newsdata.io/api/1/news?apikey=${props.apiKey}&country=${props.country}&language=en&category=${props.category}&page=${state.page}`
        let data = await fetch(url);
        let parsedData = await data.json();
        setState({
            totalResults: parsedData.totalResults,
            results: state.results.concat(parsedData.results),
            page: parsedData.nextPage
        });
        props.setProgress(100)
    }
    
    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <h1 className='text-center my-3'>NewsMonkey - Top {capitalized(props.category)} Headlines</h1>
            <InfiniteScroll
                dataLength={state.results.length}
                next={fetchData}
                hasMore={state.results.length !== state.totalResults}
                loader={<Spinner />}
            >
                <div className='container my-3' >
                    <div className='row' >
                        {state.results.map((element, index) => {
                            return (<div className='col-md-3' key={index}>
                                <NewsItems title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 225) : ""} imgUrl={element.image_url} newsUrl={element.link} date={element.pubDate} />
                            </div>)
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>

    )
}

News.defaultProp = {
    country: "in",
    category: 'entertainment'
}

News.propType = {
    country: PropTypes.string,
    category: PropTypes.string
}
