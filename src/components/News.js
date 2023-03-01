import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

    static defaultProp = {
        country: "in",
        category: 'entertainment'
    }

    static propType = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    capitalized = (string) => {
        let newString = string.toLowerCase();
        return newString.charAt(0).toUpperCase() + newString.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading: true,
            page: ``
        }
        document.title = `${this.capitalized(this.props.category)} - NewsMonkey`;
    }

    componentDidMount = async () => {
        this.props.setProgress(20)
        const url = `https://newsdata.io/api/1/news?apikey=${this.props.apiKey}&country=${this.props.country}&language=en&category=${this.props.category}&page=${this.state.page} `
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            totalResults: parsedData.totalResults,
            results: this.state.results.concat(parsedData.results),
            page : parsedData.nextPage
        });
        this.props.setProgress(100)
    }

    render() {
        return (
            <>
                <h1 className='text-center my-3'>NewsMonkey - Top {this.capitalized(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.results.length}
                    next={this.componentDidMount}
                    hasMore={this.state.results.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className='container my-3' >
                        <div className='row' >
                            {this.state.results.map((element,index) => {
                                return (<div className='col-md-3' key={index}>
                                    <NewsItems title={element.title ? element.title.slice(0,55) : ""} description={element.description ? element.description.slice(0,225) : ""} imgUrl={element.image_url} newsUrl={element.link} date={element.pubDate}/>
                                </div>)
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>

        )
    }
}
